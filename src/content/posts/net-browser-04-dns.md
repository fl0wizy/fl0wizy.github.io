---
id: "net-browser-04-dns"
title: "네트워크 및 브라우저 성장기 (04) – 이름 해석, DNS"
titleEn: "Growing Up with Networks and Browsers (04) – Name Resolution and DNS"
description: "한 파일로 관리하던 이름표가 제곱으로 늘어난 배포 비용에 무너진 과정, TTL이라는 타협, 그리고 이름과 주소의 기준이 갈라질 때 브라우저 보안 모델이 뚫리는 경로."
descriptionEn: "How a single hosts file collapsed under distribution cost growing with the square of hosts, the TTL tradeoff, and how the split between name-based and address-based trust breaks the browser security model."
date: "2026-09-14 13:40"
category: "web-security"
tags: ["DNS", "Network", "TTL", "DNSRebinding", "DoH", "SubdomainTakeover"]
published: true
---

3편의 TCP는 주소를 받아야 연결을 열 수 있었고, 그 주소를 어디서 얻는지는 답하지 않은 채 남겼다. 이 편이 그 자리에 놓는 것은 위임과 캐시로 쪼개진 분산 데이터베이스, 곧 DNS다. **이름과 주소의 대응은 고정된 사실이 아니라 수명이 붙은 답이다.**

![DNS 해석 경로와 rebinding](/images/net-browser/04-dns.svg)

---

## 1. HOSTS.TXT가 무너진 방식

초기 ARPANET에서 이름과 주소의 대응은 파일 하나였다. `HOSTS.TXT`를 NIC(Network Information Center)가 관리하고, 모든 호스트가 주기적으로 그 파일을 통째로 내려받았다. 호스트가 수백 대일 때는 동작한다.

[RFC 1034](https://www.rfc-editor.org/rfc/rfc1034.html)가 이 방식이 무너진 이유를 정확한 문장으로 적어 두었다.

> "The total network bandwidth consumed in distributing a new version by this scheme is proportional to the square of the number of hosts in the network."

**제곱**인 이유는 두 항이 동시에 커지기 때문이다. 호스트가 늘면 파일이 커지고(N에 비례), 그 파일을 받아야 하는 대상도 늘어난다(N에 비례). N배 커진 파일을 N배 많은 호스트가 받으므로 총 비용은 N제곱이다. 호스트 수의 "폭발적 증가"가 예견된 상황에서 이 기울기는 끝이 정해져 있었다.

규모 문제만도 아니었다. 조직은 자기 이름을 바꾸려 해도 "NIC이 `HOSTS.TXT`를 고쳐 줄 때까지 기다려야" 했다. 기술적 병목이 아니라 행정적 병목이고, 이것은 1편에서 본 웹의 설계 요구("중앙 통제 없이")와 정확히 같은 문제다.

DNS의 설계 목표는 그래서 이렇게 정리됐다.

| 목표 | RFC 1034의 표현 | 구현된 형태 |
|---|---|---|
| 일관된 이름 공간 | "a consistent name space which will be used for referring to resources" | 점으로 구분되는 계층적 도메인 |
| 분산 관리 | "maintained in a distributed manner, with local caching" | 위임(delegation) + 리졸버 캐시 |
| 확장성 | "host addresses, mailbox data, and other as yet undetermined information" | 레코드 타입 (A, MX, TXT, SVCB …) |
| 전송 독립 | "independent of the communications system that carries them" | UDP·TCP·DoT·DoH 어디로든 |

---

## 2. 위임이라는 장치

DNS가 중앙 파일을 없앤 방법은 데이터를 복제하는 대신 **책임을 쪼개는 것**이다. 루트 서버는 `example.com`의 주소를 모른다. 아는 것은 "`.com`에 대한 답은 저 네임서버들이 안다"는 사실 하나다.

```
브라우저(stub) ─재귀 질의→ 재귀 리졸버
                              │  ┌─질의→ 루트   → "com은 저기"
                              ├──┼─질의→ .com   → "example은 저기"
                              │  └─질의→ ns.example.com → A 203.0.113.10
                              └─답(A + TTL)→ 브라우저
```

브라우저는 **재귀 질의** 하나를 던지고 최종 답을 받는다. 리졸버는 **반복 질의**를 여러 번 던지며 위임 사슬을 따라 내려간다. 이 분업이 중요한 이유는 **캐시가 리졸버에만 있기 때문**이다. 루트와 TLD가 세계의 모든 질의를 감당하지 않아도 되는 것은 리졸버가 대부분을 캐시에서 답하기 때문이다.

레코드 타입 중 실무에서 자주 만나는 것들과, 그 타입이 왜 따로 있어야 했는지는 다음과 같다.

- **A / AAAA** – 이름에서 IPv4 / IPv6 주소로.
- **CNAME** – 이름에서 다른 이름으로. CDN과 SaaS가 "우리 쪽을 가리키세요"라고 할 때 쓰는 것이 이것이고, 뒤에 나올 서브도메인 탈취가 정확히 이 레코드에서 발생한다.
- **NS** – 위임 자체를 표현하는 레코드. 이 도메인 아래의 답은 이 네임서버가 가진다는 선언.
- **MX / TXT** – 메일 라우팅과 임의 문자열. SPF·DKIM·DMARC 같은 메일 인증이 전부 TXT에 얹혀 있다. 원래 용도가 없던 칸이 인증 인프라가 된 사례다.
- **SVCB / HTTPS** – 비교적 최근에 추가된 타입으로, 접속 전에 필요한 정보(지원 프로토콜, 대체 포트, ECH 설정)를 미리 알려 준다. 5편의 ECH가 동작하려면 이 레코드가 있어야 한다.

---

## 3. TTL – 신선도와 부하의 타협

모든 레코드에는 TTL(Time To Live)이 붙는다. 리졸버가 이 답을 몇 초 동안 캐시해도 되는지를 권한 있는 서버가 지정하는 값이다.

```
TTL 길게 (예: 86400)          TTL 짧게 (예: 30)
────────────────────────────────────────────────
질의 수 ↓ · 상위 서버 부하 ↓   질의 수 ↑ · 부하 ↑
장애 시 캐시가 버텨 줌         장애가 즉시 전파됨
서버 교체가 느리게 반영        서버 교체가 즉시 반영
                              공격자도 답을 자주 바꿀 수 있음
```

CDN과 로드밸런서가 TTL을 짧게 잡는 이유는 마지막에서 두 번째 줄 때문이다. 트래픽을 다른 리전으로 즉시 옮기려면 옛 답이 오래 살아 있으면 안 된다. 그런데 같은 성질이 마지막 줄, 즉 DNS rebinding의 전제가 된다. "답을 자주 바꿀 수 있다"는 성질에는 소유자의 의도가 적혀 있지 않다.

---

## 4. 이름 해석을 겨냥한 공격들

### 캐시 포이즈닝

리졸버가 가짜 답을 캐시하게 만들면, 그 리졸버를 쓰는 모든 사용자가 공격자의 주소로 간다. 고전적 DNS는 UDP 위에서 16비트 질의 ID만으로 응답을 식별했기 때문에, 공격자가 진짜 응답보다 먼저 도착하는 위조 응답을 충분히 많이 쏘면 맞출 수 있었다. 2008년 댄 카민스키가 이 공격의 성공률을 실용적인 수준으로 끌어올리는 방법을 공개하면서 전면적인 완화 조치가 이뤄졌다.

대응은 **추측해야 할 비트를 늘리는 방향**으로 갔다. 출발지 포트 난수화(16비트 추가), 질의 이름의 대소문자를 무작위로 섞어 응답에서 그대로 돌아오는지 확인하는 0x20 인코딩이 그것이다. 근본 해법인 DNSSEC은 응답에 서명을 붙이지만, 배포 복잡도 때문에 보급률이 여전히 낮다.

### 서브도메인 탈취

`blog.example.com`이 CNAME으로 어떤 SaaS를 가리키는데, 그 SaaS 쪽 자원은 해지됐고 DNS 레코드만 남은 상태를 생각하면 된다. 공격자가 그 SaaS에서 같은 이름을 다시 점유하면, `blog.example.com`은 공격자의 콘텐츠를 서빙하게 된다.

영향이 커지는 지점은 콘텐츠 자체가 아니다. 그 이름이 **쿠키 도메인, CORS 허용 목록, CSP 허용 출처, OAuth redirect_uri 화이트리스트**에 들어 있는 경우다. 조직이 자기 서브도메인을 신뢰하도록 설정해 둔 모든 곳이 동시에 뚫린다.

---

## 5. DoT·DoH – 전송 암호화가 옮기는 가시성

DNS 질의는 평문이었다. 경로상의 누구나 사용자가 어떤 이름을 묻는지 볼 수 있다. DoT(TLS 위의 DNS)와 DoH(HTTPS 위의 DNS)가 이를 덮는다.

여기에는 정직하게 적어 둘 만한 대가가 있다. DoH는 DNS 트래픽을 일반 HTTPS 트래픽과 구분되지 않게 만들고, 브라우저가 OS 설정을 우회해 자체 리졸버를 쓸 수 있게 한다. 사용자 프라이버시는 올라가지만, 기업망의 DNS 기반 필터링·악성 도메인 차단·사고 조사용 로그는 동시에 무력화된다. **프라이버시와 가시성이 같은 축의 양 끝**이라는 점이 이 논쟁의 실체다.

---

## 6. 이 계층에서 취약점이 사는 자리

**이름으로 판정하고 주소로 연결하는 한, 그 둘이 같은 것을 가리킨다는 보장은 어디에도 없다.**

DNS rebinding이 그 틈을 쓴다. 브라우저의 동일 출처 정책(SOP)은 **이름**을 기준으로 판단한다. `https://evil.com`에서 실행된 스크립트는 `https://evil.com`의 자원에만 접근할 수 있다. 그런데 실제 소켓 연결은 **주소**를 기준으로 이뤄진다. 그리고 이름에서 주소로 가는 변환의 답에는 §3의 TTL이 붙어 있다.

```
t=0   evil.com → 203.0.113.9 (공격자)   TTL 1초
      브라우저: 출처 evil.com 으로 JS 실행

t=2   evil.com → 192.168.0.1 (내부망)
      JS는 여전히 출처 evil.com → SOP 통과
      소켓은 192.168.0.1 로 연결 → 내부 서비스에 도달
```

방어가 한 곳에 모이지 않고 층마다 나뉘는 것이 이 문제의 특징이다.

- **브라우저** – DNS pinning. 한 번 해석한 주소를 출처 수명 동안 고정한다. 다만 브라우저는 자기 캐시만 통제할 수 있어 완전하지 않다.
- **리졸버** – 외부 도메인에 대한 응답이 사설 대역(2편 §4)을 가리키면 버린다. 공용 리졸버 다수가 기본 제공하는 기능이다.
- **서버** – `Host` 헤더를 화이트리스트로 검증한다. 도착한 연결이 어느 주소로 왔는지가 아니라, **어느 이름으로 자기를 부르고 있는지**를 확인하는 것이다.
- **내부 서비스** – 인증을 네트워크 위치에 의존하지 않는다. "사설망에서 온 요청이니 신뢰한다"는 전제 자체를 없애면 rebinding의 가치가 사라진다.

마지막 항목이 근본 해법이다. rebinding이 위력을 갖는 이유는 내부망에 인증 없는 관리 인터페이스가 흔하기 때문이지, DNS가 특별히 취약해서가 아니다.

원인과 결과로 적으면 이 계층의 취약점은 세 줄이다.

- 응답을 16비트 질의 ID만으로 식별 → 캐시 포이즈닝
- 가리키던 자원은 해지되고 CNAME만 잔존 → 서브도메인 탈취, 그 이름을 신뢰하던 설정의 동시 우회
- 판정은 이름으로, 연결은 주소로 → DNS rebinding

세 줄 모두 하나의 대상을 두 주체가 서로 다른 기준으로 식별한다. 이 형태가 15편의 원형 B, 정체성 불일치다.

---

## 다음 층에 넘기는 것

이 계층은 이름을 주소로 바꿔 주지만, 그 주소 끝에 선 상대가 자기가 주장하는 그 상대인지는 확인하지 않는다. 이름이 가리키는 대상의 신원, 이것이 이 계층이 풀지 못한 결손이고 5편이 받는다.

---

### 참고

- [RFC 1034: Domain Names - Concepts and Facilities](https://www.rfc-editor.org/rfc/rfc1034.html) – HOSTS.TXT 붕괴와 설계 목표
- [RFC 9460: Service Binding and Parameter Specification via the DNS](https://www.rfc-editor.org/rfc/rfc9460.html) – SVCB / HTTPS 레코드
- [OWASP: Server Side Request Forgery Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html) – 사설 대역 필터링 실무
