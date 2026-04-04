---
id: "solidity-concepts-4"
title: "Solidity 개념 정리 4: 이벤트, 해시, selfdestruct, 스타일 가이드"
description: "이벤트와 LOG opcode, Ether와 시간 단위, 암호화 함수, selfdestruct 변화, type() 키워드, 제어 구조와 스타일 가이드까지 실전 중심으로 정리합니다."
date: "2026-04-04 19:40"
category: "study-dev-security"
tags: ["Solidity", "Event", "LOG", "ECDSA", "selfdestruct"]
published: true
---

# Solidity 개념 정리 4: 이벤트, 해시, selfdestruct, 스타일 가이드

이번 글은 Solidity를 공부하면서 실무에서 자주 다시 찾게 되는 주제들을 모아 정리한 글이다.  
이벤트와 EVM 로그, Ether/시간 단위, 해시와 서명, `selfdestruct`, `type()` 키워드, 제어 구조, 그리고 스타일 가이드까지 이어서 살펴본다.

---

## 1. 이벤트(Event)는 상태가 아니라 로그다

이벤트는 Solidity가 제공하는 EVM 로그 기능의 추상화다.  
`emit` 키워드로 트랜잭션 로그에 기록된다.

```solidity
event Deposit(address indexed user, uint256 amount);

function deposit() external payable {
    emit Deposit(msg.sender, msg.value);
}
```

### 이벤트의 특징

- 블록체인 로그에 기록된다.
- 컨트랙트 내부 상태처럼 읽을 수 있는 값은 아니다.
- 외부 애플리케이션이 구독하고 검색하기 좋다.
- storage에 쓰는 것보다 훨씬 저렴한 편이다.

즉, 이벤트는 "상태 저장"이 아니라 **외부 세계에 알리는 기록**으로 이해하는 것이 맞다.

---

## 2. indexed와 topic

이벤트 파라미터에 `indexed`를 붙이면 topic 영역에 저장되어 필터링이 쉬워진다.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

이 경우:

- `from`, `to` -> topic
- `value` -> data

로그는 대략 다음 구조를 가진다.

```text
address: 컨트랙트 주소
topics:
  [0] 이벤트 시그니처 해시
  [1] indexed 인자 1
  [2] indexed 인자 2
data:
  non-indexed 인자들의 ABI 인코딩
```

이벤트 검색 속도가 중요한 이유가 바로 여기에 있다.

---

## 3. 이벤트는 왜 SLOAD로 읽을 수 없는가

이벤트는 EVM의 **storage**에 저장되는 것이 아니라 **log 영역**에 남는다.  
그래서 `SLOAD`로 읽을 수 없다.

정리하면:

- 상태 변수 -> storage -> `SLOAD`, `SSTORE`
- 이벤트 -> logs -> `LOG0 ~ LOG4`

즉, 이벤트는 EVM 내부에서 다시 참조할 수 있는 상태가 아니라  
트랜잭션 결과에 붙는 외부 관찰용 기록이다.

이 때문에 컨트랙트 내부에서 "예전에 emit한 이벤트를 읽어와라" 같은 작업은 불가능하다.

---

## 4. LOG0 ~ LOG4는 무엇인가

EVM은 이벤트를 처리할 때 `LOG0`부터 `LOG4`까지의 opcode를 사용한다.

| Opcode | 의미 |
|--------|------|
| `LOG0` | topic 없음 |
| `LOG1` | topic 1개 |
| `LOG2` | topic 2개 |
| `LOG3` | topic 3개 |
| `LOG4` | topic 4개 |

예를 들어:

```solidity
event MyEvent(address indexed from, uint256 amount);
```

이 이벤트는 대개:

- 이벤트 시그니처 해시
- `from`

두 개의 topic을 사용하므로 `LOG2` 형태로 생각할 수 있다.

실무에서 opcode까지 내려가 보는 이유는:

- 이벤트 가스 계산을 이해하기 위해
- 디버깅과 트레이싱을 위해
- 바이트코드 레벨 동작을 확인하기 위해서다

---

## 5. Ether 단위

Solidity는 Ether 단위를 읽기 쉽게 쓰도록 접미사를 제공한다.

```solidity
1 wei
1 gwei
1 ether
```

예를 들어:

```solidity
uint256 minimum = 0.1 ether;
uint256 gasPrice = 20 gwei;
```

이런 표현은 숫자를 직접 쓰는 것보다 훨씬 안전하고 읽기 쉽다.

### 주의할 점

Solidity는 부동소수점을 지원하지 않는다.  
그래서 `0.5 ether`가 아니라 정수 연산으로 표현해야 하는 경우가 있다.

```solidity
uint256 half = 1 ether / 2;
```

---

## 6. 시간 단위

시간 관련 접미사도 제공한다.

```solidity
1 minutes
1 hours
1 days
1 weeks
```

예:

```solidity
uint256 unlockTime = block.timestamp + 7 days;
```

다만 이것은 어디까지나 초 단위 계산을 쉽게 하는 문법이다.  
달력 계산 자체를 정확하게 처리해주는 것은 아니다.

따라서:

- 윤년
- 월 길이 차이
- 정교한 캘린더 계산

같은 것은 별도 로직이나 외부 시스템에 맡기는 편이 낫다.

---

## 7. 블록 / 메시지 / 트랜잭션 속성

Solidity는 현재 실행 환경을 읽는 전역 변수를 제공한다.

### block

- `block.number`
- `block.timestamp`
- `block.chainid`
- `block.coinbase`
- `block.gaslimit`

### msg

- `msg.sender`
- `msg.value`
- `msg.data`
- `msg.sig`

### tx

- `tx.gasprice`
- `tx.origin`

### 보안적으로 중요한 포인트

- `msg.sender`는 외부 호출이 한 단계 들어갈 때마다 바뀔 수 있다.
- `tx.origin`은 권한 검증 기준으로 쓰지 않는 것이 일반적이다.
- `block.timestamp`, `blockhash` 기반 무작위성은 조작 가능성을 항상 고려해야 한다.

---

## 8. 해시 함수와 암호학 함수

Solidity는 여러 내장 해시 함수를 제공한다.

```solidity
keccak256(...)
sha256(...)
ripemd160(...)
```

이더리움에서 가장 많이 보는 것은 `keccak256`이다.

```solidity
bytes32 hash = keccak256(abi.encodePacked(user, amount));
```

또한 모듈러 연산 함수도 제공한다.

```solidity
addmod(a, b, m);
mulmod(a, b, m);
```

이 함수들은 단순 산술보다 overflow 처리 측면에서 의미가 있다.

---

## 9. ecrecover와 서명 검증

서명 검증에는 `ecrecover`를 사용할 수 있다.

```solidity
function recoverSigner(
    bytes32 hash,
    uint8 v,
    bytes32 r,
    bytes32 s
) public pure returns (address) {
    return ecrecover(hash, v, r, s);
}
```

다만 실무에서는 OpenZeppelin의 `ECDSA` 라이브러리를 더 자주 쓴다.

이유는:

- 서명 가변성 문제를 더 안전하게 처리할 수 있고
- 실패 시 반환값 검증을 명확히 할 수 있기 때문이다

서명 검증은 "함수는 짧아 보여도 보안적으로는 민감한 부분"이라는 점을 항상 기억해야 한다.

---

## 10. selfdestruct는 이제 예전처럼 생각하면 안 된다

예전에는 `selfdestruct`가 컨트랙트를 사실상 제거하는 명령처럼 여겨졌다.

```solidity
selfdestruct(payable(beneficiary));
```

이 명령은:

- 컨트랙트 잔액을 특정 주소로 보낸다.
- 수신자의 `receive()`를 호출하지 않는다.

하지만 최근 이더리움 업그레이드 이후에는  
**예전처럼 일반적인 "컨트랙트 삭제" 도구로 이해하면 안 된다.**

### 중요한 변화

Cancun 이후(EIP-6780)에는 `selfdestruct`의 의미가 크게 제한되었다.

- 기존 컨트랙트를 과거처럼 자유롭게 지우는 용도로 기대하면 안 된다.
- 설계상 "삭제"보다 잔액 이동 측면만 보는 편이 안전하다.
- CREATE2 + selfdestruct 재배포 같은 오래된 패턴도 더 이상 예전과 같은 가정으로 보면 안 된다.

즉, 지금은 `selfdestruct`를 "언젠가 컨트랙트를 깔끔히 없애는 기능"으로 설계에 넣기보다  
최신 체인 동작을 기준으로 매우 보수적으로 다뤄야 한다.

---

## 11. type() 키워드

`type(X)`는 타입 정보에 접근할 때 사용한다.

예를 들면:

```solidity
type(uint256).max
type(uint256).min
```

정수 타입의 범위를 가져오거나, 인터페이스 ID, 계약 이름, 바이트코드 정보를 읽는 데 쓸 수 있다.

대표 예시는 다음과 같다.

```solidity
uint256 maxValue = type(uint256).max;
```

이 키워드는 메타 정보가 필요할 때 꽤 유용하다.

---

## 12. 제어 구조와 Solidity 스타일

Solidity는 `if`, `for`, `while`, `do-while`, `break`, `continue`, `return` 같은 일반적인 제어문을 지원한다.

다만 C와 다른 점도 있다.

- `if (1)` 같은 숫자 조건은 허용되지 않는다.
- 암시적 bool 변환을 기대하면 안 된다.
- 조건은 명시적으로 `bool`이어야 한다.

예:

```solidity
if (count > 0) {
    // ...
}
```

---

## 13. 스타일 가이드는 왜 중요한가

스타일 가이드는 문법은 아니지만, 실무에서는 꽤 중요하다.

대표 규칙은 다음과 같다.

- 공백 4칸 들여쓰기
- import는 파일 상단
- 함수 순서는 생성자 -> receive -> fallback -> external -> public -> internal -> private
- contract / struct / event는 `CapWords`
- 함수 / 변수 / modifier는 `mixedCase`
- 상수는 `UPPER_CASE`

스타일을 지키지 않아도 컴파일은 된다.  
하지만 지키지 않으면 다음 문제가 생긴다.

- 가독성 저하
- 리뷰와 감사 난이도 증가
- 협업 품질 저하
- 자동 포맷터 / 린터와 충돌

특히 보안 감사 관점에서는 "읽기 쉬운 코드" 자체가 큰 장점이다.

---

## 14. 실전에서 기억할 포인트

마지막으로 이 글에서 다룬 내용을 실전 관점에서 다시 요약해보면 다음과 같다.

- 이벤트는 상태가 아니라 외부 관찰용 로그다.
- `indexed`는 검색성과 직결된다.
- Ether와 시간 단위 접미사는 가독성을 크게 높여준다.
- 해시와 서명 검증은 짧아 보여도 보안 민감도가 높다.
- `selfdestruct`는 최신 네트워크 기준으로 매우 보수적으로 이해해야 한다.
- 스타일 가이드는 단순 취향이 아니라 유지보수성과 감사 효율에 영향을 준다.

---

## 시리즈 마무리

여기까지 Solidity의 기초 개념을 4편으로 나눠 정리해봤다.

1. EVM과 파일 구조, ABI
2. 타입 시스템과 상태 모델
3. 함수, 메모리 모델, 예외 처리
4. 이벤트, 해시, selfdestruct, 스타일 가이드

이 시리즈는 "문법을 외우는 것"보다  
"Solidity 코드가 실제로 어떤 모델 위에서 돌아가는지 이해하는 것"에 초점을 맞췄다.

다음에는 상속, 라이브러리, 인터페이스, ERC 표준, delegatecall, proxy, storage layout처럼  
더 실전적인 주제로 이어가면 자연스럽게 다음 단계로 넘어갈 수 있을 것 같다.
