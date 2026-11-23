---
id: "ai-foundations-15-rnn"
title: "13장. RNN: 순서와 기억을 다루는 신경망"
titleEn: "Chapter 13. RNNs: Sequence and Memory"
description: "순환 구조와 시간에 따른 역전파를 살펴보고 LSTM과 GRU가 기억을 유지하는 방식을 정리한다."
descriptionEn: "Study recurrent connections and backpropagation through time, then examine memory in LSTMs and GRUs."
date: "2026-11-24 00:00"
category: "ai"
tags: ["AI", "RNN", "LSTM"]
series: "ai-foundations"
seriesOrder: 15
cover: "/images/covers/ai-foundations-15-rnn.svg"
published: true
---

## 1. 공간의 이웃을 보았다면, 이제 시간의 앞뒤를 보자

앞 장: [합성곱 신경망 - 12장](/post/ai-foundations-14-cnn)

12장의 CNN은 가까운 픽셀을 묶어 보고 같은 필터를 이미지 여러 위치에서 사용했다. 이번에는 입력이 사진 한 장이 아니라 시간에 따라 들어오는 기록이라고 생각해 보자. 접속 시도, 로그인 실패, 권한 변경이 어떤 순서로 일어났는지에 따라 같은 사건들의 의미가 달라질 수 있다. 문장도 “좋다”와 “좋지 않다”가 다르듯 앞뒤 순서가 중요하다.

8장부터 11장까지 배운 가중합·활성화·역전파는 그대로 사용한다. 바뀌는 것은 **현재 입력을 계산할 때 이전 시점의 정보를 함께 넣는 연결**이다. 이 구조가 순환 신경망, RNN(Recurrent Neural Network)이다.

![순환 신경망 - 13장 — 1번 그림](/images/ai-study/cf6c2f1ef59f7a7cc6c6.png)

![순환 신경망 - 13장 — 2번 그림](/images/ai-study/f8134d44649d54c0469d.png)

완전연결망은 입력 사이의 일반적인 관계를 배우고, CNN은 공간의 이웃 관계를 구조에 넣었다. RNN은 여기에 시간 방향의 정보 전달을 넣는다. 피드포워드 신경망도 여러 시점의 값을 묶은 고정 길이 입력으로 시계열 문제를 풀 수 있다. 다만 길이가 달라지는 시퀀스를 같은 계산 규칙으로 처리하고 이전 요약을 이어 가려면 별도의 구조가 필요하다.

**시퀀스(sequence)**는 순서가 있는 항목들의 나열이다. 시계열(time series)은 각 시간 단계에 하나 이상의 측정값이 있는 시퀀스다. 온도·풍속, 주가, 음성 신호, 자동차 이동 경로가 예다. 문장의 토큰도 시퀀스이지만, 각 위치가 반드시 실제 시계의 시간을 뜻하지는 않는다. 아래의 시점 t는 “이번 입력 위치”로 읽어도 된다.

## 2. 순환이라는 말은 출력의 일부를 다음 계산에 다시 쓴다는 뜻이다

![순환 신경망 - 13장 — 3번 그림](/images/ai-study/43d8e25ac0755560bb46.png)

현재 입력 xₜ를 받으면 RNN은 은닉 상태 hₜ를 만든다. **은닉 상태(hidden state)**는 지금까지 받은 입력에서 다음 계산에 필요한 정보를 담는 숫자 벡터다. 벡터는 숫자를 여러 개 모아 놓은 한 줄의 배열이다. hₜ는 이번 계산의 결과이면서 다음 시점의 재료가 된다.

![순환 신경망 - 13장 — 4번 그림](/images/ai-study/4dc4f2a3f4007c446e53.png)

이 식은 행벡터 표기를 사용한다. xₜWₓ는 현재 입력을 반영하는 계산이고, hₜ₋₁Wₕ는 이전 상태를 반영하는 계산이다. 두 결과와 편향 b를 더한 뒤 tanh를 통과시켜 새로운 상태를 만든다. 첫 시점의 h₀ 또는 h₋₁은 시작 인덱스 관례에 따라 이름이 다르며, 흔히 0 벡터로 초기화한다.

여기서 Wₓ와 Wₕ는 학습된 매개변수다. hₜ는 입력에 따라 매 시점 달라지는 중간 계산값이다. **상태가 바뀐다고 매번 가중치를 학습한 것은 아니다.** 예측할 때에도 hₜ는 바뀌지만, 일반적인 추론에서는 Wₓ와 Wₕ를 그대로 사용한다. 이는 “프롬프트를 넣으면 모델의 가중치도 즉시 바뀌는가?”라는 질문과도 연결된다.

RNN 그림의 h를 출력이라고 부르는 경우가 있지만, h가 바로 최종 정답인 것은 아니다. 감성 분류라면 h를 Dense와 sigmoid 또는 Softmax에 넣어 분류하고, 다음 값 예측이라면 Dense를 통해 필요한 출력 차원으로 바꾼다.

## 3. 고리 모양을 펼치면 같은 셀이 반복되는 계산 그래프가 보인다

![순환 신경망 - 13장 — 5번 그림](/images/ai-study/c4183258e49e3527d3df.png)

왼쪽의 순환 화살표를 시간 방향으로 펼치면 오른쪽처럼 된다. x₁을 보고 h₁을 만들고, x₂와 h₁을 함께 보고 h₂를 만든다. x₃에서는 x₃와 h₂를 사용한다. 미래 값을 미리 받아오는 구조가 아니다.

중요한 점은 각 상자가 서로 다른 가중치를 갖는 별도 모델이 아니라는 것이다. **모든 시점에서 같은 Wₓ, Wₕ, b를 사용**한다. CNN이 공간 위치마다 같은 필터를 썼다면, RNN은 시간 위치마다 같은 상태 갱신 규칙을 쓴다. 입력과 상태는 달라지지만 규칙은 공유된다.

![순환 신경망 - 13장 — 6번 그림](/images/ai-study/c96e5c5a30f8d152f74d.png)

이 그림은 상태를 h 대신 Y, 활성화 함수를 tanh 대신 일반 기호 φ로 쓴 표현이다. Y₍ₜ₋₁₎Wᵧ와 hₜ₋₁Wₕ는 이 문맥에서 같은 역할이다. 기호가 바뀌어도 “이전 상태의 가중합 + 현재 입력의 가중합 + 편향”이라는 구조를 보면 된다.

예를 들어 입력과 상태가 숫자 하나이고 Wₓ=1, Wₕ=0.5, b=0, 시작 상태=0이라고 하자. 첫 입력 1을 받으면 h₁=tanh(1)≈0.7616이다. 다음 입력이 0이어도 h₂=tanh(0.5×0.7616)≈0.3634로 0이 아니다. 현재 입력에 없는 이전 정보가 상태를 통해 남았기 때문이다. 단순 RNN의 기억은 원문을 그대로 저장한 목록이 아니라, 계속 갱신되는 압축 표현이다.

## 4. 입력·상태·가중치의 차원을 맞춰 보기

미니배치 크기를 N, 각 시점의 입력 특성 수를 D, 은닉 상태의 크기를 H라고 하자. 한 시점의 입력 Xₜ는 N × D, 이전 상태 Hₜ₋₁은 N × H이다. Wₓ는 D × H, Wₕ는 H × H, 편향 b는 H개 값이다.

![순환 신경망 - 13장 — 7번 그림](/images/ai-study/219db942b1a1220a1786.png)

행렬곱에서는 가운데 차원이 같아야 한다. (N × D)와 (D × H)를 곱하면 N × H가 되고, (N × H)와 (H × H)를 곱해도 N × H가 된다. 두 결과를 더할 수 있으며, 편향을 각 행에 더하고 tanh를 적용해 다음 상태 N × H를 얻는다. 그림의 크기 비교는 이 가중합을 설명하며, 최종 상태를 만들 때 활성화 함수가 들어간다.

한 시퀀스 전체를 배치로 모으면 입력은 **(배치 크기, 시점 개수, 시점별 특성 수)**라는 3차원 배열이다. 온도와 풍속 두 값이 있는 10개 시점의 기록을 5개 묶으면 (5, 10, 2)이다. 뉴런 32개의 RNN에서 모든 시점의 상태를 반환하면 (5, 10, 32), 마지막 상태만 반환하면 (5, 32)이다.

특성 수 2가 입력의 정보 종류라면, 상태 크기 32는 모델이 사용할 내부 요약 공간의 크기다. 시점이 10개라고 서로 다른 가중치가 10세트 생기지 않는다. SimpleRNN의 매개변수 수는 D×H + H×H + H이다. D=2, H=32라면 64+1,024+32=1,120개다. 시퀀스가 길어지면 계산량과 저장할 중간값은 늘지만 이 매개변수 수는 그대로다.

## 5. 시간 방향으로 펼치는 것과 층을 깊게 쌓는 것은 다르다

![순환 신경망 - 13장 — 8번 그림](/images/ai-study/9959e00a9a9d9cad4630.png)

가로로 이어지는 상자는 시간의 흐름이다. 세로로 쌓인 상자는 여러 RNN 층이다. 첫 층은 각 시점의 입력으로 상태를 만들고, 두 번째 층은 첫 층의 시점별 상태를 입력으로 받는다. 각 층은 자기 가중치를 가지며, 그 층의 가중치는 시간 방향으로 공유된다.

![순환 신경망 - 13장 — 9번 그림](/images/ai-study/8e20f7aad60b35681d41.png)

따라서 단일 RNN 층을 시간 방향으로 열 번 펼쳤다고 10층짜리 Deep RNN이 되는 것은 아니다. 여러 RNN 층을 세로로 쌓았을 때 깊은 RNN이라고 한다. 아래의 Keras 코드에서 return\_sequences가 필요한 이유도 위층에 시간별 상태를 전달해야 하기 때문이다.

## 6. SimpleRNN을 만들고 출력 형태를 확인하기

```py
import numpy as np
import tensorflow as tf
from tensorflow import keras

inputs = np.random.random((32, 10, 8)).astype(np.float32)

last_state = keras.layers.SimpleRNN(4)(inputs)
whole_sequence = keras.layers.SimpleRNN(
    4, return_sequences=True
)(inputs)

print(last_state.shape)       # (32, 4)
print(whole_sequence.shape)   # (32, 10, 4)
```

units=4는 은닉 상태에 숫자 4개를 쓴다는 뜻이다. 기본값 return\_sequences=False에서는 마지막 시점의 상태만 반환한다. True이면 각 시점의 상태를 모두 반환한다. 과거 시점을 계산하지 않는다는 뜻이 아니라, **계산한 결과 중 무엇을 바깥으로 내보낼지**가 달라진다.

한 시퀀스에서 숫자 하나를 예측하는 기본 모델은 다음과 같다.

```py
model = keras.Sequential([
    keras.Input(shape=(None, 1)),
    keras.layers.SimpleRNN(32, activation="tanh"),
    keras.layers.Dense(1),
])
```

Input의 None은 시점 개수를 고정하지 않겠다는 뜻이고, 1은 각 시점의 입력 특성 수다. 배치 축은 이 shape에 쓰지 않는다. 이 모델은 RNN 한 층과 출력 Dense 한 층이다. 깊은 RNN을 만들려면 실제로 RNN 층을 여러 개 쌓아야 한다.

길이가 다른 시퀀스를 다룰 수 있다는 말도 한 배치의 직사각형 배열에 임의 길이를 그대로 섞을 수 있다는 뜻은 아니다. 보통 짧은 시퀀스에 패딩을 넣고, 그 위치를 무시하도록 마스크를 전달하거나 길이별로 묶는다. 매우 긴 시퀀스는 계산·메모리 한계도 받는다.

### SimpleRNN의 전체 인자를 역할별로 읽기

```py
tf.keras.layers.SimpleRNN(
    units, activation="tanh", use_bias=True,
    kernel_initializer="glorot_uniform",
    recurrent_initializer="orthogonal", bias_initializer="zeros",
    kernel_regularizer=None, recurrent_regularizer=None,
    bias_regularizer=None, activity_regularizer=None,
    kernel_constraint=None, recurrent_constraint=None,
    bias_constraint=None, dropout=0.0, recurrent_dropout=0.0,
    return_sequences=False, return_state=False,
    go_backwards=False, stateful=False, unroll=False, **kwargs
)
```

| 인자 | 의미 |
| --- | --- |
| units | 상태 벡터의 크기 H |
| activation, use\_bias | 상태를 만드는 활성화 함수와 편향 사용 여부 |
| kernel\_initializer | 입력 가중치 Wₓ의 초기값 |
| recurrent\_initializer | 순환 가중치 Wₕ의 초기값. orthogonal은 직교 행렬 기반 초기화 |
| bias\_initializer | 편향의 초기값 |
| kernel/recurrent/bias\_regularizer | 각각 입력 가중치·순환 가중치·편향에 적용할 손실 벌점 |
| activity\_regularizer | 출력 활성화에 적용할 손실 벌점 |
| kernel/recurrent/bias\_constraint | 갱신된 해당 매개변수에 적용할 제약 |
| dropout | 입력 쪽 연결에 적용하는 드롭아웃 비율 |
| recurrent\_dropout | 순환 상태 쪽 연결에 적용하는 드롭아웃 비율 |
| return\_sequences | 모든 시점의 출력을 반환할지 결정 |
| return\_state | 마지막 상태를 별도 반환값으로도 받을지 결정 |
| go\_backwards | 입력을 거꾸로 처리할지 결정. 이것만으로 양방향 RNN이 되는 것은 아님 |
| stateful | 한 배치의 마지막 상태를 다음 배치의 대응 샘플에 이어 사용할지 결정. 샘플 순서와 초기화 관리 필요 |
| unroll | 반복 계산을 명시적으로 펼칠지 결정. 짧은 시퀀스에 유용할 수 있으나 메모리 부담이 커질 수 있음 |
| kwargs | name 등 공통 층 설정 |

공식 동작은 [Keras SimpleRNN](https://keras.io/api/layers/recurrent_layers/simple_rnn/)과 [RNN 공통 층 문서](https://keras.io/api/layers/recurrent_layers/rnn/)를 기준으로 확인할 수 있다.

## 7. 무엇을 입력하고 무엇을 출력할 것인가

![순환 신경망 - 13장 — 10번 그림](/images/ai-study/e6df8de448aa3cda530b.png)

RNN의 상태 계산은 같아도 작업에 따라 출력 연결이 달라진다. 위 그림의 회색 출력은 계산 자체가 없다는 뜻이 아니라, 그 작업의 최종 출력으로 사용하지 않는다는 뜻이다.

| 형태 | 입력과 출력 | 예와 해석 |
| --- | --- | --- |
| Sequence-to-Sequence | 시퀀스를 받아 시점별 결과 반환 | 매 시점의 다음 주가·날씨를 예측하거나 각 단어에 태그를 붙임 |
| Sequence-to-Vector | 시퀀스를 받아 결과 하나 반환 | 리뷰 전체를 읽은 뒤 긍정·부정 분류 |
| Vector-to-Sequence | 벡터 하나를 조건으로 시퀀스 생성 | 이미지 특징 벡터를 조건으로 캡션 생성 |
| Encoder-Decoder | 입력 시퀀스를 표현으로 바꾼 뒤 새 시퀀스 생성 | 영어 문장을 읽고 다른 길이의 번역 문장 생성 |

이 표의 첫 번째는 각 입력 시점에 대응하는 출력을 만드는 형태다. Encoder-Decoder도 넓게는 sequence-to-sequence지만, 입력과 출력 길이가 달라도 되는 두 단계 구조를 강조해 따로 표시했다.

인코더는 입력을 내부 표현으로 바꾸는 부분이고, 디코더는 그 표현을 이용해 출력을 만드는 부분이다. 단순한 RNN 번역 모델에서는 인코더의 마지막 상태에 입력 문장을 요약해 디코더로 넘긴다. 긴 문장의 정보를 벡터 하나에 담아야 한다는 병목은 다음 장 어텐션의 출발점이 된다.

### 시퀀스 전체에서 결과 하나를 내는 깊은 RNN

```py
sequence_to_vector = keras.Sequential([
    keras.Input(shape=(None, 1)),
    keras.layers.SimpleRNN(20, return_sequences=True),
    keras.layers.SimpleRNN(20),
    keras.layers.Dense(1),
])
```

첫 층은 위층에 시간별 상태를 전달해야 하므로 True다. 마지막 RNN은 전체 시퀀스를 요약한 상태만 내므로 기본값 False를 사용한다. 중간 층이 False이면 시간 축이 사라져 다음 RNN이 기대하는 3차원 입력과 맞지 않는다.

### 각 시점마다 결과를 내는 깊은 RNN

```py
sequence_to_sequence = keras.Sequential([
    keras.Input(shape=(None, 1)),
    keras.layers.SimpleRNN(20, return_sequences=True),
    keras.layers.SimpleRNN(20, return_sequences=True),
    keras.layers.TimeDistributed(keras.layers.Dense(10)),
])
```

모든 RNN 층이 시간 축을 유지한다. TimeDistributed는 같은 Dense를 각 시점에 적용한다. 입력이 (N, T, 1)이면 출력은 (N, T, 10)이다. 출력 10은 각 시점에 예측할 숫자가 10개라는 뜻이며, 반드시 10개 클래스 확률이라는 뜻은 아니다. 이 코드의 Dense에는 Softmax가 없으므로 확률 분포로 해석하면 안 된다.

## 8. BPTT는 역전파를 시간 방향으로 펼친 것이다

![순환 신경망 - 13장 — 11번 그림](/images/ai-study/d06ed7a063b2a7f75f80.png)

11장에서 층을 거슬러 올라가며 미분을 곱했다. RNN은 시간 방향으로 펼치면 같은 계산 셀이 이어져 있으므로, 뒤 시점의 손실에서 앞 시점의 상태까지 미분을 전달할 수 있다. 이를 **BPTT(Backpropagation Through Time), 시간 방향 역전파**라고 한다. 새로운 미분 원리가 생긴 것이 아니라 같은 연쇄 법칙을 시간에 걸친 계산 그래프에 적용한다.

![순환 신경망 - 13장 — 12번 그림](/images/ai-study/eb0dfd4616278af8f7b1.png)

마지막 시점에서만 손실을 구해도 앞 시점이 마지막 상태에 영향을 주었다면 기울기가 전달된다. 여러 시점에서 손실을 구하면 해당 손실들의 기여가 합쳐진다. 같은 Wₕ와 Wₓ가 모든 시점에 쓰였으므로 매개변수 기울기도 시점별 기여를 더해야 한다. CNN에서 공유 필터의 사용처별 기울기를 더했던 원리와 같다.

순전파는 앞에서 뒤로 실제 상태를 계산한다. 역전파는 뒤에서 앞으로 손실의 민감도를 계산한다. 이전 입력을 복원하는 역함수가 아니다. 이 둘을 구분해야 아래 코드의 h와 dh를 혼동하지 않는다.

## 9. RNN 셀 하나를 코드로 열어 보기

![순환 신경망 - 13장 — 13번 그림](/images/ai-study/f7a48fad71f5c6ab30a0.png)

한 시점의 계산은 두 행렬곱, 덧셈, tanh로 나뉜다. 붉은 선의 dh\_next는 다음 상태 자체가 아니라 그 상태에 대한 손실의 기울기다. 순전파 때의 x, h\_prev, h\_next를 저장해 두어야 역전파에서 다시 사용할 수 있다.

```py
import numpy as np

class RNN:
    def __init__(self, Wx, Wh, b):
        self.params = [Wx, Wh, b]
        self.grads = [np.zeros_like(Wx), np.zeros_like(Wh),
                      np.zeros_like(b)]
        self.cache = None

    def forward(self, x, h_prev):
        Wx, Wh, b = self.params
        t = np.matmul(h_prev, Wh) + np.matmul(x, Wx) + b
        h_next = np.tanh(t)
        self.cache = (x, h_prev, h_next)
        return h_next

    def backward(self, dh_next):
        Wx, Wh, b = self.params
        x, h_prev, h_next = self.cache
        dt = dh_next * (1 - h_next ** 2)
        db = np.sum(dt, axis=0)
        dWh = np.matmul(h_prev.T, dt)
        dh_prev = np.matmul(dt, Wh.T)
        dWx = np.matmul(x.T, dt)
        dx = np.matmul(dt, Wx.T)
        self.grads[0][...] = dWx
        self.grads[1][...] = dWh
        self.grads[2][...] = db
        return dx, dh_prev
```

forward의 t는 시간 인덱스가 아니라 활성화 이전의 가중합을 담은 지역 변수다. 혼동하지 않도록 식에서는 이 가중합을 zₜ라고 생각하면 된다. tanh의 미분은 1−tanh(z)²이므로, 저장해 둔 h\_next를 이용하면 1−h\_next²로 계산할 수 있다.

dt는 현재 가중합에 대한 손실의 기울기다. db에서 axis=0으로 더하는 이유는 편향 하나가 배치의 모든 샘플에 공유되기 때문이다. dWx와 dWh는 가중치에 대한 기울기, dx와 dh\_prev는 입력과 이전 상태로 돌려보낼 기울기다. .T는 행과 열을 바꾸는 전치이며, 행렬곱의 미분에서 방향과 차원을 맞춘다.

예를 들어 dt가 N × H이고 x가 N × D이면 x.T와 dt의 곱은 D × H이다. 원래 Wₓ의 모양과 같다. dh\_prev는 N × H이므로 이전 시점의 상태에 대한 기울기로 전달할 수 있다. **학습 대상의 기울기는 그 학습 대상과 같은 모양**이라는 사실이 코드를 검토하는 기준이 된다.

이 클래스는 셀 한 시점의 구현이다. 같은 객체로 여러 시점을 forward한 뒤 마지막 cache 하나만 두고 역전파하면 앞 시점의 정보가 덮어써진다. 전체 BPTT에서는 시점별 cache를 따로 보관하고, 가중치 배열은 공유하며, 각 시점의 매개변수 기울기를 합쳐야 한다. backward 자체가 가중치를 바꾸는 것은 아니다. 갱신은 별도의 최적화 단계다.

## 10. 시퀀스가 길어지면 왜 앞부분을 배우기 어려운가

![순환 신경망 - 13장 — 14번 그림](/images/ai-study/ee8cf3f4d6bb8b5bb603.png)

언어 모델이 뒤 단어를 예측할 때 멀리 앞의 이름이나 주어가 필요할 수 있다. 이것을 **장기 의존 관계**라고 한다. 단순 RNN에서는 그 정보가 중간의 많은 상태 갱신을 거쳐야 하고, 학습 기울기도 같은 긴 경로를 거슬러 가야 한다.

![순환 신경망 - 13장 — 15번 그림](/images/ai-study/7c299b66c3b768b0cf22.png)

![순환 신경망 - 13장 — 16번 그림](/images/ai-study/c6d3aa87ba1ad5bb8094.png)

tanh는 입력을 −1과 1 사이로 바꾼다. 입력의 절댓값이 크면 출력이 양 끝에 가까워지고 곡선이 평평해진다. 미분은 1−tanh(z)²이며 0과 1 사이에 있다. 이 작은 값과 순환 가중치 행렬의 효과가 시간마다 곱해진다.

단순히 매 단계의 유효 배율이 0.5라고 가정하면 20단계를 지난 값은 0.5²⁰≈0.000000954이다. 이런 상황에서는 앞 시점의 가중치를 어떻게 바꿔야 할지 알려 주는 기울기가 거의 남지 않는다. 이것이 기울기 소실이다. 실제 RNN에서는 숫자 하나가 아니라 행렬과 활성화 미분이 함께 곱해지므로 tanh 하나만 보고 결과를 단정할 수는 없다.

![순환 신경망 - 13장 — 17번 그림](/images/ai-study/002aae80c23f2123450c.png)

반대로 유효 배율이 1보다 큰 방향이 반복되면 기울기가 지나치게 커질 수 있다. 예를 들어 1.5²⁰은 약 3,325이다. 이것이 기울기 폭발이다. 과거 입력을 현재까지 전달하는 어려움과, 과거 계산에 충분한 학습 신호를 보내는 어려움이 서로 연결되어 있다. 긴 시퀀스는 중간 상태를 더 많이 저장해야 하므로 계산 시간과 메모리 부담도 커진다.

## 11. 기울기 클리핑은 폭발을 막는 크기 제한이다

모든 매개변수의 기울기를 한 벡터 g로 모았다고 하자. 그 전체 크기인 L2 노름은 각 성분을 제곱해 더하고 제곱근을 취한 값이다. 이 크기가 threshold, 즉 허용 한도를 넘으면 전체 벡터를 같은 비율로 줄인다.

![순환 신경망 - 13장 — 18번 그림](/images/ai-study/6ed0baf45df70fd5180a.png)

예를 들어 기울기가 (3, 4)이면 크기는 5이다. 한도가 2라면 2/5를 곱해 (1.2, 1.6)으로 바꾼다. 방향은 유지하고 크기만 2로 줄인다. 각 성분을 개별 범위로 자르는 value clipping과는 다른, 전체 노름 기준 클리핑이다.

```py
def clip_grads(grads, max_norm):
    total_norm = np.sqrt(sum(np.sum(g * g) for g in grads))
    if total_norm > max_norm:
        scale = max_norm / (total_norm + 1e-12)
        for g in grads:
            g *= scale
```

클리핑은 너무 큰 갱신을 억제한다. 이미 작아진 기울기를 복원해 장기 기억 문제를 해결하는 방법은 아니다. 긴 계산 그래프를 일정 구간씩 끊어 학습하는 truncated BPTT도 메모리 부담을 줄이는 선택이지만, 끊은 경계 너머까지 동일한 학습 기울기를 전달하는 것은 아니다. 더 오래 정보를 유지하도록 셀 구조 자체를 바꾸는 방법이 LSTM이다.

## 12. LSTM은 상태를 덮어쓰기만 하지 않고, 남길 것과 추가할 것을 나눈다

LSTM(Long Short-Term Memory)은 RNN의 한 종류다. 단순 RNN의 상태 h 외에 **셀 상태 c**라는 별도 통로를 두고, 정보를 얼마나 남기고 추가하고 꺼낼지를 게이트로 조절한다.

![순환 신경망 - 13장 — 19번 그림](/images/ai-study/718c7413ea4e3920366a.png)

그림 위를 가로지르는 c 통로가 셀 상태다. 아래에서 만드는 h는 다른 층이나 출력 계산에 전달되는 은닉 상태다. 흔히 c를 장기 상태, h를 단기 상태라고 부르지만 “c는 반드시 오래 기억하고 h는 반드시 금방 잊는다”는 절대 구분은 아니다. 둘 다 학습된 계산에 따라 바뀐다.

셀 상태는 같은 LSTM 층의 다음 시점으로 전달된다. 여러 LSTM 층을 쌓으면 보통 위층에는 h의 시퀀스를 넘기고, 각 층은 자기 c를 따로 유지한다. API로 c를 별도 반환받는 것은 가능하므로, “층 내부에서 주고받는다”는 설명은 일반적인 연결 방식을 말한다.

**게이트(gate)**는 0과 1 사이의 숫자를 만들어 정보에 원소별로 곱하는 장치다. 0에 가까우면 약하게, 1에 가까우면 강하게 통과시킨다. 현재 입력과 이전 은닉 상태의 가중합에 sigmoid를 적용해 이 값을 만든다. 사람이 매번 열고 닫는 스위치가 아니라, 가중치가 학습되면서 입력에 따라 열림 정도가 달라진다.

이제 그림을 실제 계산 순서대로 읽어 보자. f는 남길 비율, g는 새 후보 내용, i는 후보를 쓸 비율, o는 밖으로 보여 줄 비율이다. ⊙는 같은 위치끼리 곱하는 원소별 곱, 또는 Hadamard 곱이다. 행렬곱과 다르다.

## 13. 삭제 게이트는 이전 기억에서 얼마를 남길지 정한다

![순환 신경망 - 13장 — 20번 그림](/images/ai-study/0e0e5ff48e7ef5e617c5.png)

![순환 신경망 - 13장 — 21번 그림](/images/ai-study/49fb4994fae19297d0dc.png)

forget gate의 f는 sigmoid를 통과해 0과 1 사이가 된다. 이전 셀 상태 cₜ₋₁에 f를 원소별로 곱한다. f가 0이면 해당 성분을 지우고, 1이면 그대로 남긴다. f가 0.8이면 이전 성분의 80%가 직접 통로에 남는다.

이 단계만 따로 보면 f ⊙ cₜ₋₁이다. **이것만으로 최종 cₜ가 완성되는 것은 아니다.** 새로 추가할 기억이 뒤에 더해진다. “삭제 게이트”라는 이름 때문에 f가 크면 더 많이 삭제한다고 읽기 쉽지만, 이 식에서는 f가 클수록 많이 남긴다.

## 14. 새로운 내용과 그것을 쓸 정도는 따로 계산한다

![순환 신경망 - 13장 — 22번 그림](/images/ai-study/82f13464305e86db35e7.png)

![순환 신경망 - 13장 — 23번 그림](/images/ai-study/b73a1fd1087ef760f21d.png)

g는 현재 입력과 이전 은닉 상태로부터 만든 **새 기억 후보**다. tanh를 사용하므로 −1과 1 사이의 값을 가진다. g가 무엇을 써 넣을지 나타낸다면, 다음 입력 게이트 i는 그 후보를 얼마나 반영할지 정한다.

![순환 신경망 - 13장 — 24번 그림](/images/ai-study/020e30dcafd087142d90.png)

![순환 신경망 - 13장 — 25번 그림](/images/ai-study/e658bd508947abd3e45e.png)

i는 sigmoid 출력이므로 0과 1 사이이다. 새로 더할 값은 i ⊙ g다. 따라서 최종 셀 상태는 “남겨 둔 이전 기억 + 선택한 새 기억”으로 계산한다.

![순환 신경망 - 13장 — 26번 그림](/images/ai-study/51a4b84e734a7b75a434.png)

예를 들어 한 성분의 이전 기억이 0.8, f=0.9, g=−0.5, i=0.2라면 새 셀 상태는 0.9×0.8 + 0.2×(−0.5) = 0.62이다. 새 후보가 음수라고 틀린 기억인 것은 아니다. 기존 표현을 줄이거나 다른 방향으로 조정하는 값일 수 있다.

## 15. 출력 게이트는 기억 중 무엇을 밖으로 보여 줄지 정한다

![순환 신경망 - 13장 — 27번 그림](/images/ai-study/7f5f2503ad86d2dfcbba.png)

![순환 신경망 - 13장 — 28번 그림](/images/ai-study/b2970a96f31b1e34d135.png)

출력 게이트 o도 현재 입력과 이전 은닉 상태로부터 sigmoid를 통해 계산한다. 새 셀 상태 cₜ를 tanh로 변환하고 o를 곱하면 은닉 상태 hₜ가 된다.

![순환 신경망 - 13장 — 29번 그림](/images/ai-study/cfd51be8a3c6ec63f651.png)

앞의 숫자 예에서 cₜ=0.62이고 o=0.7이면 hₜ=0.7×tanh(0.62)≈0.386이다. 셀 안에 남긴 값과 바깥으로 전달하는 값이 다르다. 어떤 정보를 내부에는 보존하면서 현재 출력에는 적게 드러내는 구조가 가능해진다.

네 계산을 한꺼번에 모으면 다음과 같다. 위첨자 f, g, i, o는 각각의 계산이 자기 가중치를 가진다는 구분이며 거듭제곱이 아니다.

![순환 신경망 - 13장 — 30번 그림](/images/ai-study/c041f58f2f40b99da4b7.png)

| 값 | 활성화 | 역할 |
| --- | --- | --- |
| f | sigmoid | 이전 셀 상태를 얼마나 남길지 |
| g | tanh | 새로 넣을 후보 내용 |
| i | sigmoid | 후보를 얼마나 쓸지 |
| o | sigmoid | 새 셀 상태를 얼마나 출력할지 |
| cₜ | 가중된 이전 상태와 후보의 합 | 다음 시점으로 이어질 셀 상태 |
| hₜ | o ⊙ tanh(cₜ) | 다른 층·출력 계산과 다음 시점에 전달할 은닉 상태 |

## 16. LSTM은 왜 기울기 소실을 완화하는가

![순환 신경망 - 13장 — 31번 그림](/images/ai-study/6887dc2d877ce10d59bf.png)

10장에서 덧셈 노드의 국소 미분은 1이었다. LSTM의 셀 상태에는 이전 상태에 새 내용을 더하는 경로가 있다. 이 직접 경로를 따라 보면 cₜ₋₁에서 cₜ로 가는 미분은 fₜ이다. 여러 시점을 거슬러 갈 때 이 경로의 효과는 각 시점의 f를 곱한 형태가 된다.

![순환 신경망 - 13장 — 32번 그림](/images/ai-study/ebc0209123cae33b05ae.png)

**시점마다 게이트 값이 달라져도 곱셈은 누적된다.** f가 매번 0.5이면 여전히 빠르게 작아진다. 중요한 정보에 대해 f가 1에 가깝게 유지되도록 학습할 수 있다는 점이 핵심이다. 매 단계 같은 순환 행렬과 tanh를 통과하는 단순 RNN보다 정보를 오래 보존할 수 있는 직접 통로를 제공한다.

이 설명은 셀 상태의 직접 경로를 떼어 본 것이다. 전체 미분에는 게이트가 이전 상태에 의존하면서 생기는 다른 경로도 있다. 따라서 LSTM이 기울기 소실·폭발을 완전히 없애거나 무한히 긴 정보를 정확히 기억한다고 보면 안 된다. 장기 의존 관계를 배우기 쉽게 만드는 구조다.

## 17. LSTM 두 층으로 시퀀스를 요약하기

```py
lstm_model = keras.Sequential([
    keras.Input(shape=(None, 5)),
    keras.layers.LSTM(64, return_sequences=True),
    keras.layers.LSTM(32),
    keras.layers.Dense(1),
])
```

각 시점의 특성은 5개이다. 첫 층은 각 시점마다 64차원 h를 반환하므로 출력은 (N, T, 64)다. 둘째 층은 마지막 32차원 h만 반환해 (N, 32)가 되고, Dense가 (N, 1)로 바꾼다. 셀 상태 c도 각 층 내부에서 계산되지만 return\_sequences=True가 c를 반환한다는 뜻은 아니다. [Keras LSTM 문서](https://keras.io/api/layers/recurrent_layers/lstm/)에서 별도 상태 반환 옵션을 확인할 수 있다.

일반적인 편향 한 세트의 LSTM은 네 개의 가중합을 만들므로 매개변수 수가 4(DH+H²+H)이다. 첫 층은 4(5×64+64²+64)=17,920개, 둘째는 4(64×32+32²+32)=12,416개, Dense는 33개로 전체 30,369개다. 같은 상태 크기의 단순 RNN보다 계산이 많아지는 이유가 여기에 있다.

## 18. GRU는 게이트를 줄이고 상태를 하나로 합친다

![순환 신경망 - 13장 — 33번 그림](/images/ai-study/2f902a995286943c8341.png)

GRU(Gated Recurrent Unit)는 LSTM의 별도 셀 상태 c를 없애고 h 하나로 정보를 이어 간다. reset gate와 update gate 두 개를 사용한다. 장기 정보를 다루는 능력을 유지하면서 구조와 매개변수를 줄이려는 선택이다. 같은 크기라면 보통 LSTM보다 매개변수가 적지만, 실제 속도나 정확도는 구현·하드웨어·문제에 따라 달라진다.

![순환 신경망 - 13장 — 34번 그림](/images/ai-study/bc675325b685d76d2b50.png)

![순환 신경망 - 13장 — 35번 그림](/images/ai-study/1630d461e53cbce1f13d.png)

이 식에서 r은 새 후보를 만들 때 이전 상태를 얼마나 참고할지 정한다. r이 0이면 후보 h̃를 만드는 계산에서 이전 상태의 영향이 사라져 현재 입력과 편향으로 후보를 만든다. 다만 **최종 hₜ에서도 과거가 완전히 사라진다는 뜻은 아니다.** 이전 hₜ₋₁이 update gate의 혼합 경로로 따로 전달될 수 있다.

그림의 z는 새 후보를 얼마나 반영할지 정한다. 최종 상태는 (1−z) ⊙ hₜ₋₁ + z ⊙ h̃이다. z가 0이면 이전 상태를 유지하고, z가 1이면 새 후보를 사용한다. 1−라는 노드는 입력을 1에서 뺀다. LSTM이 이전 기억을 남길 비율 f와 새 후보를 쓸 비율 i를 별도로 정했다면, 이 표기의 GRU는 두 비율을 1−z와 z로 묶는다.

예를 들어 이전 상태가 0.8, 후보가 −0.2, z=0.25라면 새 상태는 0.75×0.8+0.25×(−0.2)=0.55이다. r은 후보를 만드는 과정에, z는 최종 혼합에 쓰인다는 차이를 기억하면 된다.

![순환 신경망 - 13장 — 36번 그림](/images/ai-study/654078ffb89d0e848769.png)

GRU 그림과 구현을 비교할 때는 기호 관례를 확인해야 한다. 어떤 자료는 z를 **이전 상태를 유지하는 비율**로 정의해 hₜ=z⊙hₜ₋₁+(1−z)⊙h̃라고 쓴다. 이름은 같지만 보완 비율을 사용하므로 “z가 크면 무엇이 커지는가”는 식을 보고 판단해야 한다. 또한 reset을 행렬곱 전에 적용하는지 뒤에 적용하는지에 따라 변형이 있다. [Keras GRU](https://keras.io/api/layers/recurrent_layers/gru/)의 기본 reset\_after=True는 이 차이를 나타내며, 위의 reset-before 교육용 식과 모든 세부 계산이 같지는 않다.

```py
gru_model = keras.Sequential([
    keras.Input(shape=(None, 5)),
    keras.layers.GRU(64, return_sequences=True),
    keras.layers.GRU(32),
    keras.layers.Dense(1),
])
```

출력 모양은 앞의 LSTM 예와 같지만 내부 상태 갱신 계산은 다르다. 편향을 한 세트 쓰는 기본 GRU 식에서는 3(DH+H²+H)개 매개변수가 필요하다. Keras 기본 reset\_after=True에서는 입력·순환 편향을 나눠 3H(D+H+2)개가 된다. 이 코드의 첫 GRU는 13,632개, 둘째는 9,408개, Dense는 33개로 전체 23,073개다. 단순히 “항상 LSTM의 정확히 3/4”이라고 계산하면 편향 구현 차이를 놓칠 수 있다.

## 19. 상태를 넘기는 방법을 바꾸어도 남는 문제가 있다

| 구조 | 이어 가는 상태 | 정보 조절 방식 | 주된 부담 |
| --- | --- | --- | --- |
| SimpleRNN | h | 이전 상태와 입력을 가중합한 뒤 활성화 | 긴 경로의 기울기 소실·폭발, 압축 기억의 한계 |
| LSTM | h와 c | 이전 기억 유지, 새 후보 쓰기, 출력 조절 | 네 가중합과 두 상태, 순차 계산 |
| GRU | h | 후보를 만들 때 reset, 이전 상태와 후보를 update로 혼합 | 순차 계산과 유한한 상태 용량은 남음 |

세 구조 모두 앞 시점의 상태가 있어야 다음 상태를 계산한다. LSTM과 GRU는 무엇을 오래 남길지 더 잘 조절하지만, 문장 전체의 필요한 정보를 상태에 계속 담아 전달해야 한다. 단순한 인코더-디코더에서는 입력을 하나의 마지막 상태로 요약하는 병목도 남는다.

여기까지 공부한 위치는 분명하다. CNN은 **공간에서 어떤 입력들을 함께 볼지**를 정했고, RNN은 **시간을 따라 어떤 정보를 넘길지**를 정했다. 이제 “필요한 순간에 앞의 모든 상태를 직접 다시 참고하면 안 될까?”라는 질문이 나온다. 다음 장의 [어텐션과 Transformer 구조 - 14장](/post/ai-foundations-16-transformer)은 그 질문에서 출발하고, Transformer는 그 직접 참조를 중심으로 시퀀스 처리 구조를 다시 만든다.

### 그림·예제의 출처와 구현 확인 자료

원래 그림과 코드의 기반은 제공된 「13\_순환 신경망」 강의 자료이며, 자료에는 『Hands-On Machine Learning, 2nd Edition』과 『밑바닥부터 시작하는 딥러닝』이 명시되어 있다. 셀 단위 NumPy 구현은 원래 순전파·역전파 계산을 유지해 하나의 클래스로 연결했다. LSTM 게이트 곱의 누적, GRU의 두 표기 관례, Keras 편향 구조는 혼동하지 않도록 구분했다.

- [Keras SimpleRNN](https://keras.io/api/layers/recurrent_layers/simple_rnn/)
- [Keras LSTM](https://keras.io/api/layers/recurrent_layers/lstm/)
- [Keras GRU](https://keras.io/api/layers/recurrent_layers/gru/)
- [GRU가 제안된 RNN Encoder-Decoder 연구, 2014](https://arxiv.org/abs/1406.1078)
