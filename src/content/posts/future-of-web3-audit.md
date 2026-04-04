---
id: "future-of-web3-audit"
title: "Web3 Audit의 미래: 코드에서 금융 시스템으로, 그리고 다시 신뢰로"
description: "Web3 보안은 더 이상 코드만의 문제가 아니다. FTX, Drift, Resolv, Aave-CoW 사례를 통해 시스템 레벨 보안과 조합 위험의 중요성을 정리한다."
date: "2026-04-04 19:50"
category: "research-article"
tags: ["Web3", "Audit", "DeFi", "Security", "Research"]
published: true
---

# Web3 Audit의 미래: 코드에서 금융 시스템으로, 그리고 다시 “신뢰”로

Web3는 한때 단순한 약속 위에서 출발했다.

> “코드를 신뢰하라 (Don’t trust, verify)”

스마트 컨트랙트가 모든 규칙을 자동으로 실행하고,  
중앙화된 신뢰를 제거하며,  
투명성과 불변성을 통해 금융을 재구성한다는 이상.

그러나 이 이상은 시간이 지날수록 점점 다른 질문으로 바뀌고 있다.

> “정말 우리는 더 이상 신뢰하지 않아도 되는가?”

---

## FTX: Web3가 가장 먼저 무너진 이유

FTX의 붕괴는 단순한 기업 파산이 아니었다.  
그것은 Web3가 해결하려 했던 문제, 즉 “신뢰”가 여전히 남아 있다는 사실을 보여준 사건이었다.

FTX는 고객 자산을 안전하게 보관하는 것처럼 보였지만,  
실제로는 고객 자금을 내부 트레이딩 회사인 Alameda Research에 유용했고,  
약 80억 달러 규모의 자금 공백이 드러나며 붕괴했다 ([Investopedia][1]).

더 중요한 문제는 따로 있다.

FTX는 기술적으로 복잡한 시스템이 아니었다.  
오히려 문제는 전통 금융에서 이미 해결되었어야 할 영역,  
즉 **custody, 내부 통제, 회계, 리스크 관리**가 존재하지 않았다는 점이다.

관련 보고서는 FTX가 기본적인 보안 조직, 리스크 관리 체계, 내부 통제조차 제대로 갖추지 못했다고 지적한다 ([Investopedia][2]).

즉,

> FTX는 “블록체인 문제”가 아니라  
> **“금융 시스템 실패”였다.**

---

## “비수탁이면 안전하다”는 착각

FTX 이후 Web3는 이렇게 말한다.

> “그래서 우리는 비수탁(non-custodial)으로 간다”

하지만 이 역시 완전한 해답은 아니다.

비수탁은 단지  
“자산을 누가 들고 있느냐”의 문제를 해결할 뿐,  
“무엇을 실행하느냐”의 문제는 해결하지 못한다.

사용자는 여전히:

- 프론트엔드를 통해 트랜잭션을 생성하고
- 스마트 컨트랙트와 상호작용하며
- 서명을 통해 권한을 위임한다

이 과정에서:

- UI가 조작되거나
- 악성 로직이 숨겨져 있거나
- `delegatecall`과 같은 메커니즘이 상태를 변조하면

사용자는 스스로 자산을 넘겨주게 된다.

즉,

> custody는 제거되었지만,  
> **신뢰는 여전히 존재한다. 단지 형태만 바뀌었을 뿐이다.**

---

## Drift, Resolv, Aave–CoW: 코드가 아니라 시스템이 무너진다

최근의 사건들은 이 변화를 더욱 명확하게 보여준다.

Drift Protocol 사건은 단순한 코드 취약점이 아니었다.  
관리자 키, 사전 서명된 트랜잭션, 타임락 부재, 오라클 신뢰 구조가 결합되면서  
공격자는 시스템의 “운영 권한”을 이용해 자산을 탈취했다.

Resolv 역시 온체인 로직 자체보다는  
**오프체인 키 관리와 신뢰 구조의 붕괴**가 핵심 원인이었다.

Aave–CoW 사건은 더 흥미롭다.  
여기에는 전통적인 의미의 코드 버그가 없었다.

하지만 다음 요소들이 결합되며 대규모 손실이 발생했다.

- 유동성 부족
- 라우팅 실패
- 주문 실행 구조
- UI 설계

이 세 사건이 공통적으로 보여주는 것은 단 하나다.

> 공격은 더 이상 “코드 내부”에서만 발생하지 않는다.  
> **공격은 시스템 전체에서 발생한다.**

---

## Web3는 이미 “금융 시스템”이다

오늘날 하나의 DeFi 프로토콜은 더 이상 단일 컨트랙트가 아니다.

그것은 다음 요소들의 집합이다.

- 스마트 컨트랙트
- 프론트엔드
- 오프체인 봇 및 솔버
- 키 관리 시스템
- 오라클 / 브리지
- 거버넌스
- 유동성 구조
- 비상 대응 체계

이 중 하나만 무너져도 손실이 발생한다.

즉,

> “Contract is secure” ≠ “System is secure”

---

## Audit의 붕괴: 왜 더 이상 충분하지 않은가

기존의 audit은 다음 전제 위에 존재했다.

> “코드에 취약점이 없으면 안전하다”

하지만 현실의 공격은 훨씬 복합적인 방식으로 발생한다.

- 계약 A는 안전하다
- 계약 B도 안전하다
- 오프체인 시스템도 정상이다
- UI도 문제없다

그런데 이들이 결합되면  
**예상하지 못한 공격 경로가 생성된다.**

이것이 바로 Web3의 핵심 리스크,  
즉 **조합 위험(compositional risk)**이다.

Web3의 강점이었던 composability는  
이제 가장 큰 공격 surface가 되었다.

---

## 공격의 본질이 바뀌고 있다

과거의 공격은 코드 중심이었다.

- reentrancy
- overflow

하지만 지금의 공격은 시스템 중심이다.

- key compromise
- governance hijack
- oracle manipulation
- MEV exploitation
- liquidity attack
- UI deception

FTX는 “custody 실패”였고,  
Drift는 “운영 권한 실패”였으며,  
Aave–CoW는 “시장 구조 실패”였다.

이것은 더 이상 단순한 해킹이 아니라,

> **금융 시스템 공격(financial system attack)**이다.

---

## Audit의 미래: System-Level Security

따라서 audit은 근본적으로 바뀌어야 한다.

앞으로의 audit은 단순 코드 검수가 아니라  
다음 영역을 함께 포함해야 한다.

- Code Security
- Key / Permission Structure
- Execution Layer (solver, routing)
- Market & Liquidity Risk
- Dependency Risk (oracle, bridge)
- Operational Security
- User Interaction

즉,

> Audit은 “코드 리뷰”에서  
> **“금융 시스템 리스크 분석”으로 진화해야 한다.**

---

## 다시, 신뢰의 문제

Web3는 “신뢰를 제거하겠다”는 목표로 시작했다.

하지만 현실은 다르다.

- FTX에서는 중앙화된 신뢰가 무너졌고
- DeFi에서는 분산된 신뢰가 복잡하게 얽혀 있다

그리고 우리는 지금 새로운 질문 앞에 서 있다.

> “우리는 무엇을 신뢰하고 있는가?”

코드인가,  
키 관리인가,  
오라클인가,  
UI인가,  
혹은 그 모든 것의 조합인가.

---

## 결론

Web3는 더 이상 코드가 아니다.  
이미 하나의 금융 시스템이다.

따라서 우리가 던져야 할 질문은 바뀌어야 한다.

> “이 컨트랙트는 안전한가?”가 아니라  
> **“이 시스템 전체는 어디에서 무너질 수 있는가?”**

그리고 이 질문에 답할 수 있는 사람이  
앞으로의 Web3 보안, 그리고 금융 보안의 핵심이 될 것이다.

[1]: https://www.investopedia.com/what-went-wrong-with-ftx-6828447?utm_source=chatgpt.com "FTX Crypto Exchange Collapse: Causes, Consequences, and Lessons"
[2]: https://www.investopedia.com/hubris-incompetence-greed-caused-ftx-collapse-7377716?utm_source=chatgpt.com "'Hubris, Incompetence, and Greed' Plagued Failed Cryptocurrency Exchange FTX"
