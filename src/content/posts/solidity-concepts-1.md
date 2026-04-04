---
id: "solidity-concepts-1"
title: "Solidity 개념 정리 1: EVM, 파일 구조, ABI"
description: "Solidity와 EVM의 관계, 소스 파일 레이아웃, pragma, ABI, NatSpec, SMTChecker까지 기초 개념을 한 번에 정리합니다."
date: "2026-04-04 19:10"
category: "study-dev-security"
tags: ["Solidity", "EVM", "ABI", "Pragma", "NatSpec"]
published: true
---

# Solidity 개념 정리 1: EVM, 파일 구조, ABI

이 글은 Solidity를 공부하며 정리한 기초 개념 노트다.  
이번 글에서는 Solidity가 EVM 위에서 어떻게 동작하는지, Solidity 소스 파일을 어떤 구조로 작성하는지, 그리고 ABI가 무엇인지까지 한 번에 훑어본다.

---

## 1. Solidity와 EVM의 관계

Solidity는 이더리움에서 스마트 컨트랙트를 작성하기 위해 사용하는 고급 언어다.  
여기서 핵심은 Solidity 코드가 직접 실행되는 것이 아니라, **컴파일된 바이트코드가 EVM에서 실행된다는 점**이다.

### EVM이란?

EVM(Ethereum Virtual Machine)은 이더리움 네트워크 전체가 공유하는 가상 실행 환경이다.

- 스마트 컨트랙트를 실행한다.
- 모든 노드가 같은 입력에 대해 같은 결과를 내도록 보장한다.
- 실제 물리 컴퓨터가 아니라, 추상적인 계산 모델이다.

즉, Solidity는 사람이 읽기 쉬운 언어이고, EVM은 기계가 실행하는 환경이다.

### 실행 흐름

```text
Solidity 소스코드
-> 컴파일
-> EVM 바이트코드
-> 이더리움에 배포
-> EVM이 바이트코드 실행
```

이 관계를 이해하면 "Solidity 문법"과 "EVM 동작"을 따로 공부해야 하는 이유도 자연스럽게 보인다.

---

## 2. Solidity는 정적 타입 언어다

Solidity는 **정적 타입 언어**다.  
즉, 변수의 타입이 컴파일 시점에 결정되고, 실행 전에 타입 검사가 끝난다.

예를 들어 다음 코드는 허용된다.

```solidity
uint256 count = 10;
```

반면 아래 코드는 컴파일되지 않는다.

```solidity
uint256 count = 10;
// count = "hello"; // 컴파일 에러
```

정적 타입 언어의 장점은 다음과 같다.

- 타입 오류를 실행 전에 발견할 수 있다.
- 예상치 못한 형변환 버그를 줄일 수 있다.
- 컴파일러 최적화가 쉬워진다.

Solidity가 자산을 직접 다루는 언어라는 점을 생각하면, 정적 타입 시스템은 단순한 문법 특징이 아니라 안정성과 직결되는 설계라고 볼 수 있다.

---

## 3. Solidity 소스 파일의 기본 레이아웃

Solidity 파일에는 여러 요소가 들어갈 수 있지만, 일반적으로 다음 순서를 많이 사용한다.

1. SPDX 라이선스 식별자
2. pragma
3. import
4. contract / interface / library 선언
5. 상태 변수
6. 이벤트
7. modifier
8. constructor
9. 함수

예시는 다음과 같다.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is Ownable {
    uint256 public totalSupply;

    event Mint(address indexed to, uint256 amount);

    modifier onlyPositive(uint256 amount) {
        require(amount > 0, "Must be > 0");
        _;
    }

    constructor() {
        totalSupply = 0;
    }

    function mint(address to, uint256 amount)
        public
        onlyOwner
        onlyPositive(amount)
    {
        totalSupply += amount;
        emit Mint(to, amount);
    }
}
```

이 순서가 문법적으로 강제되는 것은 아니지만, 코드를 읽고 리뷰할 때 훨씬 편하다.

---

## 4. SPDX 라이선스 식별자

Solidity 파일은 보통 다음과 같은 주석으로 시작한다.

```solidity
// SPDX-License-Identifier: MIT
```

이 문자열은 라이선스 정보를 사람이 아니라 **도구와 컴파일러가 읽을 수 있도록 명시하는 식별자**다.  
컴파일러는 이를 바이트코드 메타데이터에 포함시킬 수 있다.

실무에서는 MIT, GPL-3.0, UNLICENSED 등을 자주 본다.

---

## 5. pragma란 무엇인가

`pragma`는 Solidity 컴파일러에게 특정 지시를 전달하는 문장이다.  
가장 많이 보는 것은 **버전 pragma**다.

```solidity
pragma solidity ^0.8.20;
```

이 문장은 "이 파일은 0.8.20 이상, 0.9.0 미만의 컴파일러로 컴파일되어야 한다"는 의미다.

중요한 점은 pragma가 **컴파일러 버전을 바꿔주는 것이 아니라**,  
현재 컴파일러가 요구 조건에 맞는지 검사하게 만든다는 점이다.

### 왜 필요한가?

- 버전마다 문법과 동작이 달라질 수 있다.
- 보안 관련 변경사항이 반영되기도 한다.
- 의도하지 않은 버전에서 컴파일되는 것을 막아준다.

### 자주 보는 버전 표현

```solidity
pragma solidity ^0.8.20;
pragma solidity >=0.8.0 <0.9.0;
```

`^0.8.20`은 흔히 **플로팅 프라그마**라고 부른다.  
패치 버전은 유연하게 허용하면서 메이저 호환성 범위는 제한한다.

---

## 6. import는 무엇을 가져오는가

`import`는 다른 Solidity 파일의 코드를 현재 파일에 가져오는 지시어다.

```solidity
import "@openzeppelin/contracts/access/Ownable.sol";
```

주로 가져오는 대상은 다음과 같다.

- 컨트랙트
- 인터페이스
- 라이브러리

예를 들어 `IERC20`, `Ownable`, `ECDSA` 같은 구성 요소를 불러와 재사용할 수 있다.

---

## 7. ABI란 무엇인가

ABI(Application Binary Interface)는 스마트 컨트랙트와 외부 세계가 데이터를 주고받는 형식을 정의한 표준이다.

EVM은 문자열이나 구조체를 그대로 이해하지 못한다.  
그래서 함수 호출 정보와 인자는 **정해진 규칙에 따라 바이트 배열로 인코딩**되어야 한다.

### ABI 인코더 / 디코더

- ABI 인코더: 사람이 읽는 값을 EVM이 읽는 바이트 형식으로 바꾼다.
- ABI 디코더: 바이트 응답을 사람이 읽는 값으로 해석한다.

### 함수 호출 데이터의 기본 구조

```text
[ 4바이트 함수 selector ]
[ 32바이트 인자 1 ]
[ 32바이트 인자 2 ]
...
```

예를 들어 `transfer(address,uint256)`를 호출할 때:

```text
keccak256("transfer(address,uint256)")
-> 앞 4바이트 = 함수 selector
```

그리고 인자들은 32바이트 단위로 정렬되어 붙는다.

### 왜 중요한가?

- 함수 호출이 어떻게 이루어지는지 이해할 수 있다.
- `msg.data`, selector, low-level call 분석에 도움이 된다.
- 디버깅과 보안 분석의 출발점이 된다.

---

## 8. ABI 인코딩을 예시로 보기

예를 들어 다음 함수를 호출한다고 하자.

```solidity
transfer(address,uint256)
```

함수 selector는 다음처럼 얻는다.

```text
keccak256("transfer(address,uint256)")[:4]
```

이후 주소와 수량이 각각 32바이트로 인코딩되어 이어진다.

```text
0xa9059cbb
000000000000000000000000ab8483f64d9c6d1ecf9b849ae677dd3315835cb2
00000000000000000000000000000000000000000000000000000000000003e8
```

즉, 호출 데이터 맨 앞 4바이트는 항상 **어떤 함수를 부를지 식별하는 selector**이고,  
그 뒤에는 ABI 규칙에 맞는 인자 데이터가 온다.

---

## 9. NatSpec 주석

NatSpec은 Solidity 문서를 위한 표준 형식이다.  
함수나 컨트랙트 바로 위에 다음처럼 작성한다.

```solidity
/// @notice 사용자 잔액을 반환합니다.
/// @param user 조회할 주소
/// @return balance 사용자 잔액
function getBalance(address user) external view returns (uint256 balance) {
    return balances[user];
}
```

NatSpec을 잘 써두면:

- 개발자용 문서가 정리된다.
- 프론트엔드나 도구에서 설명을 보여주기 좋다.
- 감사와 협업 시 코드 의도를 전달하기 쉽다.

---

## 10. SMTChecker는 무엇을 하는가

SMTChecker는 Solidity 컴파일러에 포함된 **형식 검증 도구**다.  
코드를 실행하지 않고, 가능한 경로를 수학적으로 분석해서 논리적 오류 가능성을 찾으려고 시도한다.

대표적으로 다음과 같은 문제를 확인하는 데 도움을 줄 수 있다.

- `assert` 위반 가능성
- 불변 조건 위반
- 특정 분기에서만 발생하는 논리 오류
- 산술 오류 가능성

예를 들어:

```solidity
/// @custom:invariant sum <= 100
contract Test {
    uint256 sum;

    function add(uint256 x) public {
        sum += x;
    }
}
```

이 경우 검증 도구는 "어떤 입력에서 `sum <= 100`이 깨질 수 있는가?"를 탐색한다.

실무에서 SMTChecker 하나로 모든 보안성을 보장할 수는 없지만,  
명백한 논리 위반을 빠르게 찾는 데는 의미가 있다.

---

## 11. Solidity에서 contract란 무엇인가

Solidity에서 `contract`는 기본 구성 단위다.  
블록체인에 배포되면 **고유한 주소를 가진 계정처럼 동작하는 프로그램**이 된다.

하나의 컨트랙트는 보통 다음 요소를 가진다.

- 상태 변수
- 함수
- 이벤트
- modifier
- constructor
- struct / enum
- mapping

즉, contract는 "코드 + 상태 + 주소"를 함께 가지는 블록체인 객체라고 이해하면 편하다.

---

## 마무리

이번 글에서는 Solidity를 공부할 때 가장 먼저 잡아야 하는 기반 개념을 정리했다.

- Solidity 코드는 직접 실행되지 않고 EVM 바이트코드로 변환된다.
- pragma와 import는 파일 수준의 중요한 지시어다.
- ABI는 함수 호출과 데이터 교환의 핵심 규칙이다.
- NatSpec과 SMTChecker는 문서화와 검증 측면에서 의미가 있다.

다음 글에서는 상태 변수, 가시성, struct, enum, 정적 타입 시스템 같은 Solidity의 타입과 데이터 모델을 이어서 정리해보겠다.
