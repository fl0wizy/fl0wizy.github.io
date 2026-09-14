---
id: "net-browser-deep-01-desync"
title: "네트워크 및 브라우저 성장기 (심화 01) – desync의 해부"
titleEn: "Growing Up with Networks and Browsers (Deep 01) – Anatomy of Desync"
description: "CL.TE부터 CL.0과 client-side desync까지 변형을 하나의 축으로 정리하고, 악용 불가로 여겨지던 0.CL의 교착이 2025년에 깨진 방식을 본다."
descriptionEn: "Organizing the variants from CL.TE to CL.0 and client-side desync on one axis, and how the 0.CL deadlock long considered unexploitable was broken in 2025."
date: "2026-09-16 09:10"
category: "web-security"
tags: ["RequestSmuggling", "Desync", "HTTP", "Research", "DeepDive"]
published: true
---

이 글에서는 6편에서 개괄한 요청 스머글링을 변형별로 해부한다. 이름이 여러 개라 목록으로 외우기 쉬운데, 실제로는 축이 하나다. **연결이 재사용되고, 그 위에서 "메시지의 끝"에 대한 판단이 둘로 갈린다.** 나머지는 어느 쪽이 무엇을 따르느냐의 조합이다.

내용은 전부 공개된 연구를 정리한 것이고, 실제 점검은 인가된 범위에서만 해야 한다. 이 기법들은 **다른 사용자의 실제 요청을 망가뜨릴 수 있다.** 뒤쪽에 그 이유와 안전한 탐지 방법을 따로 적었다.

![desync 변형 분류](/images/net-browser/deep-01-desync.svg)

---

## 1. 이름 읽는 법

관례는 `[프론트엔드가 따르는 것].[백엔드가 따르는 것]`이다.

| 변형 | 프론트엔드 | 백엔드 | 성립의 성격 |
|---|---|---|---|
| CL.TE | `Content-Length` | `Transfer-Encoding` | 프론트가 규격에서 벗어남 |
| TE.CL | `Transfer-Encoding` | `Content-Length` | 백엔드가 규격에서 벗어남 |
| TE.TE | TE 인식 | 난독화된 TE를 미인식 | 헤더 파싱 허용 범위의 차이 |
| CL.0 | `Content-Length` | 본문을 아예 읽지 않음 | **규격을 지킨 요청으로 성립** |
| 0.CL | 본문 없음으로 판단 | `Content-Length` | 교착 때문에 오래 악용 불가로 취급 |

6편에서 인용한 RFC 9112의 규칙을 기준으로 보면, CL.TE에서 규격을 어기는 쪽은 프론트엔드다. `Transfer-Encoding`이 `Content-Length`를 덮어써야 하기 때문이다. 이 사실이 실무에서 갖는 의미는, **어느 한쪽이 버그가 있는 것이 아니라 조합이 문제**라는 점이다. 각 구성요소를 따로 감사하면 아무것도 발견되지 않는다.

TE.TE는 난독화가 핵심이다. 두 구현이 모두 `Transfer-Encoding`을 처리하지만, 헤더 값의 어느 변형까지 유효하게 볼지에 대한 관용도가 다르다. 한쪽이 인식하고 다른 쪽이 무시하면 결과적으로 CL.TE나 TE.CL이 된다. 1편에서 본 관대한 파싱 문화의 직접적 산물이다.

---

## 2. CL.0 — 규격을 지킨 요청으로 성립한다

CL.0은 성격이 다르다. 백엔드가 `Content-Length`를 무시하는, 즉 본문을 아예 읽지 않는 상황을 노린다. PortSwigger의 연구는 이런 상황이 왜 흔한지를 이렇게 정리한다.

> "First, the server must ignore the request's Content-Length (CL). This typically happens because the request either triggered a server error, or the server simply wasn't expecting a POST request to the chosen endpoint."

여기에 정적 파일 경로와 서버 레벨 리다이렉트가 추가된다. 공통점은 **애플리케이션 코드에 도달하기 전에 처리가 끝나는 경로**라는 것이다. 요청 본문을 읽을 이유가 없으므로 읽지 않는다.

```
프론트엔드: Content-Length 만큼 전달한다  →  [요청 1][접두사]
백엔드    : 본문을 0바이트 소비한다        →  요청 1 처리, [접두사]는 버퍼에 남음
다음 요청 : [접두사] + [피해자 요청] 이 하나로 파싱된다
```

여기서 결정적인 차이가 나온다. CL.TE나 TE.CL은 두 헤더가 함께 있거나 난독화된 값이 필요해서 **비정상적인 요청**을 만들어야 한다. CL.0은 그렇지 않다. 연구자의 표현대로 "완전히 유효하고 규격을 준수하는 HTTP 요청"이다.

그 결과가 다음 절이다.

---

## 3. client-side desync — 브라우저의 연결을 오염시킨다

규격을 지킨 평범한 POST로 성립한다면, **브라우저가 그 요청을 보낼 수 있다.**

브라우저도 같은 출처에 대한 TCP 연결을 풀에 담아 재사용한다(3편). 읽히지 않은 바이트가 그 연결에 남으면, 피해자 브라우저가 다음에 같은 연결로 보내는 요청 앞에 그 바이트가 붙는다. 오염되는 것이 서버 쪽 연결 풀이 아니라 **피해자 자신의 연결 풀**이다.

성립 조건은 세 가지다.

- **쿠키가 붙는 연결 풀을 표적으로 삼아야 한다.** 교차 도메인 `fetch`를 `credentials: 'include'`로 보내면 그 조건이 맞는다.
- **대상이 HTTP/2를 지원하지 않아야 한다.** 브라우저는 가능하면 HTTP/2를 쓰고, HTTP/2에서는 이 재사용 악용 경로가 닫힌다. 7편에서 본 바이너리 프레이밍의 방어 효과가 여기서도 나타난다.
- **서버가 오류 응답 후에도 연결을 닫지 않아야 한다.**

이 변형의 파급은 표적 범위에 있다. 고전적 스머글링은 프론트엔드와 백엔드가 분리된 구성을 전제한다. CSD는 그 전제가 필요 없다. **프록시가 없는 단일 서버 사이트도 표적이 되고, 내부망의 서비스까지 사정권에 들어온다.**

---

## 4. 0.CL과 교착, 그리고 2025년

0.CL은 프론트엔드가 본문이 없다고 판단하고 백엔드가 `Content-Length`를 따르는 조합이다. 직관적으로는 강력해 보이는데, 실제로는 교착에 빠진다.

```
프론트엔드: 요청을 다 보냈다고 보고 응답을 기다린다
백엔드    : Content-Length 만큼의 본문이 더 올 때까지 기다린다
→ 양쪽이 서로를 기다린다. 타임아웃까지 아무 일도 일어나지 않는다.
```

이 때문에 0.CL은 오랫동안 악용 불가로 분류됐다. 2025년 연구가 이 교착을 깬 방법은 다음 한 줄로 요약된다.

> "The key to escaping the 0.CL deadlock is to find an early-response gadget."

**early-response gadget**은 본문이 도착하기 전에 백엔드가 응답을 내놓게 만드는 경로다. 예를 들어 일부 서버에서 예약된 파일명을 가리키는 경로는 본문을 기다리지 않고 즉시 오류를 반환한다. 그 응답이 나오면 교착이 풀리고, 이후 double-desync라 불리는 변형을 통해 악용 가능한 CL.0 상태로 전환된다.

같은 연구는 `Expect: 100-continue` 처리에서도 새 불일치를 찾았다. 이 헤더는 "본문을 보내도 되는지 먼저 확인한다"는 의미인데, 리버스 프록시가 이를 처리하는 방식이 구현마다 다르다. 평범한 형태와 난독화된 형태 모두 주요 CDN에서 desync를 유발했다.

규모는 6편에서 인용한 대로다. Cloudflare의 H2.0 desync 하나가 약 2,400만 사이트를, Akamai의 난독화된 `Expect` 취약점이 74건 221,000달러의 바운티를 만들었다.

여기서 읽을 것은 개별 기법이 아니라 **연구가 진행되는 방식**이다. "이 조합은 교착이라 악용 불가"라는 판정은 사실 "현재 알려진 방법으로는 교착을 깰 수 없다"였다. 불가능 판정은 대개 그런 형태이고, 전제를 하나 바꾸면 뒤집힌다.

---

## 5. pause-based desync

타임아웃 구현이 잘못된 서버에서 나타나는 변형이다. 헤더만 보내고 서버의 타임아웃보다 오래 멈춘 뒤 나머지를 이어 보내면, 서버가 부분 요청에 응답하면서도 연결을 닫지 않는 경우 **이어 보낸 바이트가 새 요청으로 해석된다.**

앞의 변형들이 헤더 해석의 차이를 쓰는 것과 달리, 이것은 **시간 축**을 쓴다. 같은 바이트열이라도 언제 도착하느냐에 따라 경계가 달라지는 것이고, 3편에서 본 "세그먼트 경계는 보내는 쪽이 조작할 수 있다"는 성질의 응용이다.

---

## 6. 탐지와 안전 수칙

이 기법들은 **성공하면 다른 사용자의 요청을 망가뜨린다.** 접두사가 남은 연결에 무관한 사용자의 요청이 도착하면 그 사용자는 깨진 응답을 받거나 요청이 실패한다. 운영 중인 서비스에서 부주의하게 시도하면 실제 장애를 만든다.

그래서 탐지는 두 단계로 나뉜다.

**1단계 — 타이밍 기반 프로브.** 서버가 본문을 기다리는지 여부를 응답 지연으로 판별한다. 백엔드가 더 올 본문을 기다린다면 응답이 눈에 띄게 늦어진다. 이 방식은 연결에 접두사를 남기지 않으므로 다른 사용자에게 영향이 없다. 취약 가능성만 확인하는 단계다.

**2단계 — 확인.** 실제로 요청을 주입해 보는 단계이고, 여기서부터는 영향이 생긴다. 인가된 점검에서만, 가능하면 트래픽이 적은 시간에, 자기 자신의 후속 요청으로 확인하는 방식을 쓴다. Burp Suite의 HTTP Request Smuggler 같은 도구가 이 절차를 구현하고 있다.

---

## 7. 방어

우선순위 순으로 정리하면 이렇다.

1. **업스트림을 HTTP/2로.** 프레임 헤더에 길이가 명시되므로 해석 여지가 사라진다. 2025년 연구의 결론이기도 하다.
2. **프론트엔드에서 정규화하거나 거부.** `Transfer-Encoding`과 `Content-Length`가 함께 온 요청을 전달하지 않는다. RFC 9112는 전달하기로 했다면 `Content-Length`를 먼저 제거하라고 요구한다.
3. **모호한 요청에는 연결을 닫는다.** 규격이 "응답 후 반드시 연결을 닫으라"고 한 이유가 이것이다. 연결이 닫히면 접두사가 남을 자리가 없다.
4. **오류 응답 후 연결 종료.** CL.0과 CSD의 성립 조건 하나를 직접 제거한다.
5. **백엔드도 엄격하게.** 프론트엔드가 걸러 줄 것이라는 가정을 두지 않는다. 방어가 한쪽에만 있으면 그 한쪽이 교체될 때 사라진다.

---

### 참고

- [HTTP Desync Attacks: Request Smuggling Reborn](https://portswigger.net/research/http-desync-attacks-request-smuggling-reborn) (2019)
- [Browser-Powered Desync Attacks](https://portswigger.net/research/browser-powered-desync-attacks) (2022) — CL.0, client-side desync
- [HTTP/1.1 must die: the desync endgame](https://portswigger.net/research/http1-must-die) (2025) — 0.CL, Expect 기반
- [RFC 9112 §6.3](https://www.rfc-editor.org/rfc/rfc9112.html#name-message-body-length) — 본문 길이 결정 규칙
