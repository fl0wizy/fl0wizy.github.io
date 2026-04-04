---
id: "solidity-concepts-2"
title: "Solidity 개념 정리 2: 상태 변수, 타입 시스템, 매핑과 배열"
description: "상태 변수 가시성, constant와 immutable, struct, enum, 값 타입과 참조 타입, 배열 슬라이스와 매핑까지 Solidity의 데이터 모델을 정리합니다."
date: "2026-04-04 19:20"
category: "study-dev-security"
tags: ["Solidity", "Storage", "Struct", "Mapping", "Type System"]
published: true
---

# Solidity 개념 정리 2: 상태 변수, 타입 시스템, 매핑과 배열

이번 글에서는 Solidity의 데이터 모델을 중심으로 정리한다.  
상태 변수의 가시성, `constant`와 `immutable`, `struct`, `enum`, 값 타입과 참조 타입, 매핑과 배열 슬라이스까지 한 번에 묶어서 보는 글이다.

---

## 1. 상태 변수의 가시성 지정자

상태 변수에는 `public`, `internal`, `private` 같은 가시성을 붙일 수 있다.

### public

```solidity
uint256 public totalSupply;
```

- 외부에서 읽을 수 있다.
- 자동 getter 함수가 생성된다.
- 컨트랙트 내부에서도 접근 가능하다.

즉 `public`은 "그 변수 값을 반환하는 읽기 인터페이스가 자동으로 생긴다"는 의미다.

### internal

- 현재 컨트랙트와 상속받은 컨트랙트 내부에서만 접근 가능하다.
- 외부 인터페이스에는 노출되지 않는다.

### private

- 해당 변수가 정의된 컨트랙트 내부에서만 접근 가능하다.
- 상속받은 컨트랙트도 직접 접근할 수 없다.

하지만 여기서 자주 생기는 오해가 있다.

### private는 진짜 비밀이 아니다

`private`은 **Solidity 코드 레벨에서의 접근 제한**일 뿐이다.  
블록체인에 저장된 값 자체가 암호화되는 것은 아니다.

즉:

- 다른 컨트랙트에서 `a.secret`처럼 직접 접근은 못 한다.
- 하지만 스토리지 슬롯을 안다면 노드, RPC, 도구로 값을 읽을 수 있다.

그래서 `private`은 "외부인이 절대 모른다"가 아니라  
"다른 Solidity 코드가 직접 참조하지 못한다" 정도로 이해해야 한다.

---

## 2. constant와 immutable

Solidity에서는 변경 불가능한 값을 두 가지 방식으로 선언할 수 있다.

| 구분 | `constant` | `immutable` |
|------|------------|-------------|
| 설정 시점 | 컴파일 타임 | 배포 시점 |
| 변경 가능성 | 절대 불가 | 생성자에서 한 번만 가능 |
| 저장 방식 | 코드에 직접 포함 | 배포 시 값이 코드에 반영 |
| 대표 사용처 | 수학 상수, 비율, 단위 | 배포자 주소, 초기 설정값 |

### constant

```solidity
uint256 constant MAX_SUPPLY = 1_000_000 ether;
```

- 선언과 동시에 값을 정해야 한다.
- 컴파일러가 값 자체를 코드에 직접 넣는다.
- `msg.sender`, `block.timestamp` 같은 런타임 값은 사용할 수 없다.

### immutable

```solidity
address immutable owner;

constructor() {
    owner = msg.sender;
}
```

- 생성자에서 한 번만 설정 가능하다.
- 배포 시점의 동적 정보 반영이 가능하다.
- 이후에는 절대 바꿀 수 없다.

둘 다 storage slot에 일반 상태 변수처럼 저장되는 개념과는 다르다.  
다만 둘 다 완전한 비밀은 아니고, 바이트코드 분석으로 값이 드러날 수 있다.

---

## 3. struct: 여러 값을 하나로 묶는 타입

`struct`는 서로 다른 타입의 데이터를 하나의 논리적 묶음으로 다루게 해준다.

```solidity
struct User {
    address wallet;
    uint256 balance;
    string name;
}
```

이런 구조는 사용자 프로필, 주문 정보, 포지션 상태처럼 여러 값을 함께 다룰 때 유용하다.

### 사용 예시

```solidity
contract Example {
    struct User {
        address wallet;
        uint256 balance;
        string name;
    }

    User public user;

    function setUser(
        address _wallet,
        uint256 _balance,
        string memory _name
    ) public {
        user = User(_wallet, _balance, _name);
    }
}
```

### struct의 특징

- 다른 struct를 포함할 수 있다.
- 배열, 매핑, 함수 파라미터 등에도 사용할 수 있다.
- 실제 변수로 사용할 때는 `storage`, `memory`, `calldata`를 명시해야 하는 경우가 많다.

---

## 4. enum: 제한된 상태 집합을 표현하는 타입

`enum`은 서로 관련된 상태를 이름으로 묶어 표현하는 타입이다.

```solidity
enum Status {
    Pending,
    Active,
    Closed
}
```

내부적으로는 0부터 시작하는 정수처럼 표현되지만,  
코드에서는 숫자보다 훨씬 읽기 쉬운 상태 이름으로 다룰 수 있다.

```solidity
Status public status = Status.Pending;
```

### enum을 쓰는 이유

- 상태 표현이 명확해진다.
- 의미 없는 매직 넘버를 줄일 수 있다.
- 코드 리뷰와 감사 시 읽기 쉽다.

### 주의할 점

- enum 값은 명시적 형변환 없이 일반 정수와 바로 섞어 쓰지 않는다.
- 잘못된 정수 값을 enum으로 변환하면 런타임 오류가 날 수 있다.

---

## 5. 정적 타입 시스템과 Solidity 실행 관점

Solidity는 정적 타입 언어이기 때문에:

- 컴파일 시점에 타입이 확정된다.
- 타입 불일치가 실행 전에 걸러진다.
- 컴파일러가 최적화를 수행하기 쉽다.

예를 들어:

```solidity
uint256 public count;

function setCount(uint256 newCount) external {
    count = newCount;
}
```

여기서 `count = "hello"` 같은 코드는 실행조차 되지 않는다.  
이런 성질은 자산을 직접 다루는 언어에서 특히 중요하다.

---

## 6. 값 타입과 참조 타입

Solidity의 타입은 크게 **값 타입**과 **참조 타입**으로 나뉜다.

### 값 타입

복사되어 전달되는 타입이다.

- `bool`
- `int`, `uint`
- `address`
- 고정 크기 `bytes`
- `enum`

### 참조 타입

배열, 구조체처럼 실제 데이터 영역을 참조하는 타입이다.

- `array`
- `bytes`
- `string`
- `struct`
- `mapping`

참조 타입은 어느 데이터 영역에 놓이느냐가 중요하다.

- `storage`: 영구 저장
- `memory`: 함수 실행 중 임시 저장
- `calldata`: 외부 호출 데이터, 읽기 전용

---

## 7. 기본값(Default Values)

Solidity에서 선언된 변수는 자동으로 0 기반 기본값을 가진다.

예를 들면:

- `bool` -> `false`
- `uint` / `int` -> `0`
- `address` -> `address(0)`
- `string` -> `""`
- 동적 배열 -> 빈 배열
- enum -> 첫 번째 멤버

초기화하지 않은 상태 변수를 읽었는데 값이 나오는 이유가 바로 이것이다.

---

## 8. 범위(Scope)

블록 내부에서 선언된 변수는 그 블록 안에서만 유효하다.

```solidity
function example() external pure returns (uint256) {
    uint256 x = 10;

    if (x > 0) {
        uint256 y = 20;
        return x + y;
    }

    return x;
}
```

여기서 `y`는 `if` 블록 밖에서 접근할 수 없다.

반면 상태 변수, 함수, contract 선언 같은 최상위 선언은 코드 블록 바깥에 있기 때문에 더 넓은 범위를 가진다.

---

## 9. bool과 단락 평가(short-circuit)

Solidity의 `&&`, `||`는 단락 평가를 한다.

예를 들어:

```solidity
if (isAdmin || expensiveCheck()) {
    // ...
}
```

여기서 `isAdmin`이 이미 `true`라면 `expensiveCheck()`는 실행되지 않는다.

이 말은 곧:

- 불필요한 외부 호출을 줄일 수 있고
- 가스를 절약할 수 있으며
- 부작용이 있는 함수의 실행을 막을 수 있다는 뜻이다

즉, 단락 평가는 단순한 문법 편의가 아니라 실행 흐름에 직접 영향을 준다.

---

## 10. 배열 슬라이스(Array Slices)

배열 슬라이스는 배열의 연속된 일부를 바라보는 뷰다.

```solidity
function sliceExample(bytes calldata data) external pure {
    bytes calldata a = data[0:4];
    bytes calldata b = data[4:];
}
```

### 핵심 규칙

- `start`는 포함
- `end`는 미포함
- `x[start:end]` 형태

### 중요한 제약

- calldata 배열에서만 사용된다.
- 일반적인 별도 타입 이름을 갖는 것은 아니다.
- 보통 ABI 디코딩 전처리 등에 유용하다.

예를 들어:

```solidity
function decode(bytes calldata data)
    external
    pure
    returns (uint256)
{
    return abi.decode(data[:32], (uint256));
}
```

---

## 11. 매핑(Mapping)

매핑은 키-값 쌍을 저장하는 자료구조다.

```solidity
mapping(address => uint256) public balances;
```

### 특징

- 존재하지 않는 키를 읽으면 기본값이 나온다.
- 순회(iteration)가 불가능하다.
- storage에서만 의미 있게 사용된다.
- 키 목록이 필요하면 별도 배열로 추적해야 한다.

### 왜 반복이 안 되는가?

매핑은 내부적으로 "키를 해시한 스토리지 위치"를 이용하는 구조라서  
"들어 있는 모든 키를 나열한다"는 개념이 기본적으로 없다.

그래서 아래처럼 보조 배열을 함께 쓰는 패턴이 자주 나온다.

```solidity
mapping(address => uint256) public balances;
address[] public users;
```

---

## 12. delete 연산자

`delete`는 값을 "없애는" 것이 아니라 **해당 타입의 기본값으로 되돌리는 연산**이다.

예를 들면:

```solidity
uint256 x = 42;
delete x; // x = 0
```

### 배열에서의 동작

- 동적 배열 전체에 `delete` -> 빈 배열
- 고정 배열 전체에 `delete` -> 각 요소가 기본값
- 특정 요소에 `delete` -> 그 요소만 기본값, 길이는 유지

### 매핑에서의 동작

```solidity
delete balances[msg.sender];
```

이렇게 특정 키의 값을 초기화할 수 있다.  
하지만 매핑 전체를 한 번에 지우는 개념은 없다.

### struct와 mapping의 조합에서 주의

struct 안에 mapping이 있을 때 `delete structVar`를 해도  
mapping 내부 키들이 "순회되어 모두 삭제"되는 것은 아니다.  
매핑은 기본적으로 전체 열거가 불가능하기 때문이다.

---

## 13. 암시적 변환과 명시적 변환

### 암시적 변환

컴파일러가 안전하다고 판단한 경우 자동 변환한다.

```solidity
uint8 a = 100;
uint16 b = a; // OK
```

### 명시적 변환

개발자가 직접 형변환을 써서 강제한다.

```solidity
uint256 large = 300;
uint8 small = uint8(large); // 44
```

이 경우 상위 비트가 잘려나가므로 주의가 필요하다.

### 왜 위험한가?

- 범위를 벗어나면 값이 잘릴 수 있다.
- signed / unsigned 전환은 예상과 다른 결과를 만들 수 있다.
- bytes 타입 변환도 왼쪽/오른쪽 잘림과 패딩 규칙을 알아야 한다.

형변환은 "문법이 통과했으니 안전하다"가 아니라  
"내가 비트 수준 결과를 이해하고 있다"가 중요하다.

---

## 14. 리터럴과 타입 간의 관계

숫자 리터럴이나 문자열 리터럴은 타입 문맥에 따라 변환된다.

예를 들어:

```solidity
uint8 a = 255; // OK
// uint8 b = 256; // 컴파일 에러
```

문자열 리터럴을 고정 크기 bytes에 넣을 때도 길이가 중요하다.

```solidity
bytes4 tag = "ABCD";
```

리터럴은 편리하지만, 타입 크기와 정확히 맞는지 항상 확인하는 습관이 필요하다.

---

## 마무리

이번 글에서는 Solidity의 데이터 모델을 중심으로 정리했다.

- `public`, `internal`, `private`은 코드 레벨 접근 제어다.
- `constant`와 `immutable`은 둘 다 불변이지만 설정 시점이 다르다.
- `struct`, `enum`, `mapping`은 상태 모델링의 핵심 도구다.
- 값 타입과 참조 타입은 저장 위치와 복사 방식에서 차이가 난다.
- `delete`, 형변환, 슬라이스 같은 세부 규칙은 버그와 감사 포인트가 되기 쉽다.

다음 글에서는 함수, modifier, 가시성, calldata/memory/storage, receive/fallback, 예외 처리 같은 실행 흐름 쪽 개념을 정리해보겠다.
