---
id: "solidity-concepts-3"
title: "Solidity 개념 정리 3: 함수, 가시성, 메모리 모델, 예외 처리"
description: "함수 정의, modifier, 함수 가시성, calldata-memory-storage, receive/fallback, ABI encode/decode, require/assert/revert까지 실행 관점에서 정리합니다."
date: "2026-04-04 19:30"
category: "study-dev-security"
tags: ["Solidity", "Function", "Calldata", "Fallback", "Exception"]
published: true
---

# Solidity 개념 정리 3: 함수, 가시성, 메모리 모델, 예외 처리

이번 글에서는 Solidity가 실제로 어떻게 호출되고 실행되는지를 중심으로 정리한다.  
함수와 modifier, 함수 가시성, `calldata / memory / storage`, `receive / fallback`, ABI 인코딩, 예외 처리까지 런타임 관점에서 연결해보자.

---

## 1. 함수의 기본 개념

Solidity에서 함수는 컨트랙트 내부의 실행 가능한 코드 블록이다.  
상태를 읽거나 수정하고, 값을 반환할 수 있다.

```solidity
function getSum(uint256 a, uint256 b) public pure returns (uint256) {
    return a + b;
}
```

함수는 보통 컨트랙트 안에 정의하지만, 라이브러리나 free function 형태로도 존재할 수 있다.

---

## 2. 매개변수와 반환값

매개변수는 함수 내부에서 지역 변수처럼 사용된다.

```solidity
function add(uint256 a, uint256 b) public pure returns (uint256) {
    return a + b;
}
```

반환 방식은 두 가지를 자주 본다.

### 이름 있는 반환값

```solidity
function add(uint256 a, uint256 b)
    public
    pure
    returns (uint256 sum)
{
    sum = a + b;
}
```

### 이름 없는 반환값

```solidity
function add(uint256 a, uint256 b)
    public
    pure
    returns (uint256)
{
    return a + b;
}
```

또한 Solidity는 복수 반환도 지원한다.

```solidity
function info() public pure returns (uint256, bool) {
    return (42, true);
}
```

---

## 3. modifier는 함수에 로직을 씌우는 장치

modifier는 함수 실행 전후에 공통 로직을 삽입하거나, 아예 실행을 막는 데 사용한다.

```solidity
modifier onlyOwner() {
    require(msg.sender == owner, "Not owner");
    _;
}
```

여기서 `_`는 "원래 함수 본문이 들어갈 위치"다.

```solidity
function changeOwner(address newOwner) public onlyOwner {
    owner = newOwner;
}
```

이 함수는 실제로 `onlyOwner`의 `require`를 먼저 통과한 뒤 본문이 실행된다.

### modifier의 대표 용도

- 접근 제어
- 사전 조건 검증
- pause 여부 확인
- 재진입 방지

---

## 4. 함수 가시성 지정자

Solidity 함수의 가시성은 `public`, `external`, `internal`, `private` 네 가지가 핵심이다.

| 가시성 | 외부 호출 | 내부 직접 호출 | 상속 컨트랙트 |
|--------|-----------|----------------|---------------|
| `public` | 가능 | 가능 | 가능 |
| `external` | 가능 | 직접은 불가 | 가능 |
| `internal` | 불가 | 가능 | 가능 |
| `private` | 불가 | 가능 | 불가 |

### public

- 내부와 외부 모두에서 쓸 수 있다.
- ABI에 포함된다.

### external

- 외부 호출 전용으로 설계된다.
- 내부에서 `f()`처럼 직접 부를 수는 없고 `this.f()`처럼 외부 호출 방식으로만 가능하다.

이 차이는 단순 문법 차이가 아니라 실제 실행 방식 차이다.

- `f()` -> 내부 점프
- `this.f()` -> 외부 CALL

따라서 `external`은 특히 큰 calldata를 받는 진입 함수에서 자주 사용된다.

### internal / private

- 둘 다 ABI에 포함되지 않는다.
- 즉 외부에서 selector 기반으로 직접 호출할 수 없다.
- 다만 컴파일된 코드 내부에는 구현이 존재한다.

---

## 5. calldata, memory, storage

이 세 개는 Solidity를 공부할 때 가장 헷갈리지만, 가장 중요하다.

| 구분 | 지속성 | 수정 가능 | 대표 용도 |
|------|--------|-----------|-----------|
| `calldata` | 호출 중 임시 | 읽기 전용 | 외부 함수 입력 |
| `memory` | 호출 중 임시 | 가능 | 함수 내부 계산 |
| `storage` | 영구 | 가능 | 상태 변수 |

### calldata

- 외부 호출 데이터가 담기는 영역이다.
- 읽기 전용이다.
- 복사 비용이 없어서 효율적이다.

```solidity
function setData(uint256[] calldata input) external {
    uint256 first = input[0];
}
```

### memory

- 함수 실행 중 사용하는 임시 메모리다.
- 수정 가능하지만 함수가 끝나면 사라진다.

```solidity
function copyData(uint256[] memory input) public pure returns (uint256) {
    input[0] = 100;
    return input[0];
}
```

### storage

- 블록체인에 영구 저장된다.
- 가장 비싸고, 가장 신중하게 다뤄야 한다.

```solidity
uint256[] public data;
```

---

## 6. 왜 external + calldata가 가스에 유리한가

외부 함수가 큰 배열이나 문자열을 받을 때 `calldata`를 직접 참조하면,  
`memory`로 복사하는 비용을 줄일 수 있다.

```solidity
function foo(uint256[] calldata input) external {
    uint256 x = input[0];
}
```

반면 `public` 함수의 참조형 파라미터는 내부 사용 과정에서 메모리 복사가 개입하기 쉽다.  
이 때문에 외부 진입점에서는 `external` + `calldata` 조합이 자주 보인다.

---

## 7. 메모리와 calldata를 저수준으로 보면

### calldata 기본 구조

함수 호출 데이터는 보통 이렇게 생긴다.

```text
[ 4바이트 selector ][ 인자 1 ][ 인자 2 ] ...
```

예:

```text
foo(uint256 x, uint256 y)
```

이때:

- `msg.data[0:4]` -> selector
- 그 뒤 32바이트 단위 -> 인자

### 관련 opcode

- `calldataload(offset)` -> calldata 읽기
- `mload(offset)` -> memory 읽기
- `mstore(offset, value)` -> memory 쓰기
- `sload(slot)` -> storage 읽기
- `sstore(slot, value)` -> storage 쓰기

이걸 이해하면 ABI, 함수 selector, low-level 디버깅이 훨씬 선명해진다.

---

## 8. receive와 fallback

Solidity에는 일반 함수와 달리 특별한 두 함수가 있다.

### receive

```solidity
receive() external payable {
    emit Received(msg.sender, msg.value);
}
```

특징:

- 이름이 없다.
- `external payable`만 가능하다.
- 빈 calldata로 Ether를 받을 때 실행된다.

### fallback

```solidity
fallback() external payable {
    emit FallbackCalled(msg.sender, msg.data);
}
```

특징:

- 존재하지 않는 함수 호출 처리에 사용된다.
- 데이터가 있는데 일치하는 함수가 없을 때 실행된다.
- 필요하면 `payable`로 Ether도 받을 수 있다.

### 실행 우선순위

대략 다음처럼 이해하면 된다.

1. calldata가 비어 있나?
2. 비어 있으면 `receive` 확인
3. 아니면 selector 일치 함수 확인
4. 없으면 `fallback` 확인
5. 둘 다 없으면 revert

---

## 9. 강제 Ether 수신과 balance 의존성

중요한 점 하나는 **컨트랙트가 원하지 않아도 Ether를 받을 수 있다**는 것이다.

대표적으로:

- `selfdestruct`의 대상
- 프로토콜 레벨 강제 잔액 이동

이 경우:

- `receive()`가 실행되지 않을 수 있다.
- 내부 카운터와 `address(this).balance`가 어긋날 수 있다.

따라서 아래처럼 "내가 기록한 입금 합계 == 실제 잔액"에 강하게 의존하는 로직은 조심해야 한다.

```solidity
require(address(this).balance == accountedBalance, "Mismatch");
```

실무에서는 "알려진 잔액"과 "예상치 못한 잔액"을 분리해 생각하는 편이 안전하다.

---

## 10. ABI encode / decode

Solidity는 ABI 인코딩/디코딩 함수들을 제공한다.

### encode

```solidity
bytes memory data = abi.encode(123, "hello", true);
```

표준 ABI 규칙대로 32바이트 단위 정렬을 사용한다.

### encodePacked

```solidity
bytes memory packed = abi.encodePacked("ab", "cd");
```

압축 인코딩이지만, 동적 타입과 섞이면 모호성이 생길 수 있다.  
해시 입력으로 쓸 때는 충돌 가능성을 꼭 생각해야 한다.

### encodeWithSelector / encodeWithSignature

```solidity
abi.encodeWithSignature("transfer(address,uint256)", to, amount);
```

low-level call 데이터를 만들 때 자주 쓴다.

### decode

```solidity
(uint256 amount, address to) = abi.decode(data, (uint256, address));
```

인코딩과 디코딩은 selector, calldata, low-level call 분석과 직접 연결된다.

---

## 11. 블록 / 트랜잭션 전역 변수

Solidity에서는 실행 환경 정보를 다음 전역 변수들로 읽을 수 있다.

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

특히 `msg.sender`와 `tx.origin`을 혼동하면 보안 문제가 생길 수 있다.  
실무에서는 권한 확인에 `tx.origin`을 쓰지 않는 것이 일반적이다.

또한 `block.timestamp`, `blockhash` 등은 완전한 무작위성 원천으로 쓰면 안 된다.

---

## 12. 예외 처리: require, assert, revert

### require

입력 검증, 외부 조건 검사에 사용한다.

```solidity
require(amount > 0, "Amount must be positive");
```

### assert

절대 깨지면 안 되는 내부 불변식 확인에 쓴다.

```solidity
assert(totalSupply >= balance);
```

### revert

직접 실행을 중단하고 싶을 때 사용한다.

```solidity
revert("Transfer failed");
```

실무 감각으로 보면:

- 사용자 입력 검증 -> `require`
- 내부 논리 오류 검출 -> `assert`
- 명시적 중단 -> `revert`

---

## 13. 예외는 어떻게 전파되는가

일반 함수 호출에서 하위 호출이 revert되면 예외는 상위 호출로 전파된다.  
하지만 저수준 함수는 다르다.

```solidity
(bool success, bytes memory data) = addr.call(payload);
```

이 경우 실패해도 자동으로 예외가 버블업되지 않고:

- `success == false`
- `data`에 revert 데이터가 들어올 수 있다

즉, low-level call은 반드시 직접 검사해야 한다.

```solidity
require(success, "Low-level call failed");
```

또한 코드가 없는 주소를 call해도 EVM 설계상 성공으로 보일 수 있으므로,  
호출 대상 검증이 필요할 때는 추가 체크가 필요하다.

---

## 14. try / catch

외부 함수 호출이나 컨트랙트 생성에서 예외를 잡고 싶다면 `try/catch`를 사용한다.

```solidity
try other.someFunction() returns (uint256 result) {
    // 성공
} catch Error(string memory reason) {
    // require/revert(string)
} catch Panic(uint256 code) {
    // assert, 산술 오류 등
} catch {
    // 기타 예외
}
```

주의할 점은 `try/catch`가 **외부 호출에만 적용**된다는 것이다.  
내부 표현식에서 나는 오류를 전부 잡는 범용 예외 문법은 아니다.

---

## 15. 컴파일 타임과 런타임

Solidity 실행을 이해하려면 컴파일 타임과 런타임을 분리해서 보는 것이 좋다.

### 컴파일 타임

- 문법 검사
- 타입 검사
- 최적화
- 바이트코드 생성
- ABI 생성

### 런타임

- selector 매칭
- calldata 디코딩
- opcode 실행
- gas 차감
- storage 변경
- 이벤트 생성
- 반환값 인코딩

즉, 정적 타입은 컴파일 타임의 안정성을 주고,  
EVM은 런타임에 실제 상태 변경과 가스 계산을 담당한다.

---

## 마무리

이번 글에서는 Solidity의 "실행되는 쪽" 개념을 정리했다.

- 함수와 modifier는 실행 흐름을 조직하는 핵심 도구다.
- 함수 가시성은 ABI 노출과 내부 호출 방식에 직접 연결된다.
- `calldata`, `memory`, `storage`는 가스와 보안의 핵심이다.
- `receive`와 `fallback`은 Ether 수신과 알 수 없는 호출 처리에 중요하다.
- `require`, `assert`, `revert`, `try/catch`는 예외 모델을 구성한다.

다음 글에서는 이벤트, LOG opcode, Ether/시간 단위, 해시/서명, `selfdestruct`, 스타일 가이드처럼 실전에서 자주 맞닥뜨리는 개념들을 묶어 정리해보겠다.
