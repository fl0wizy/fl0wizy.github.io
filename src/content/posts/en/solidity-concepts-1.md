# Solidity Concepts 1: EVM, File Structure, ABI

These are notes on the fundamentals put together while studying Solidity.
This piece runs in one pass through how Solidity operates on top of the EVM, what structure a Solidity source file is written in, and what the ABI is.

---

## 1. The relationship between Solidity and the EVM

Solidity is the high-level language used to write smart contracts on Ethereum.
The key point here is that Solidity code is not executed directly: **the compiled bytecode is what runs on the EVM.**

### What is the EVM?

The EVM (Ethereum Virtual Machine) is the virtual execution environment shared by the entire Ethereum network.

- It executes smart contracts.
- It guarantees that every node produces the same result for the same input.
- It is not a physical computer but an abstract model of computation.

Which is to say, Solidity is the language easy for people to read, and the EVM is the environment the machine executes in.

### The execution flow

```text
Solidity 소스코드
-> 컴파일
-> EVM 바이트코드
-> 이더리움에 배포
-> EVM이 바이트코드 실행
```

Understanding this relationship makes it naturally clear why "Solidity syntax" and "EVM behaviour" have to be studied separately.

---

## 2. Solidity is a statically typed language

Solidity is a **statically typed language**.
That is, a variable's type is decided at compile time and type checking finishes before execution.

For example, the following code is allowed.

```solidity
uint256 count = 10;
```

Whereas the code below does not compile.

```solidity
uint256 count = 10;
// count = "hello"; // 컴파일 에러
```

The advantages of a statically typed language:

- Type errors can be found before execution.
- Unexpected conversion bugs are reduced.
- Compiler optimization becomes easier.

Considering that Solidity is a language handling assets directly, the static type system can be seen not as a mere syntactic feature but as a design directly tied to safety.

---

## 3. The basic layout of a Solidity source file

A Solidity file can contain many elements, and the following order is commonly used.

1. SPDX license identifier
2. pragma
3. import
4. contract / interface / library declarations
5. state variables
6. events
7. modifiers
8. constructor
9. functions

An example:

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

This order is not enforced syntactically, and it makes reading and reviewing the code far easier.

---

## 4. The SPDX license identifier

A Solidity file usually begins with a comment like this.

```solidity
// SPDX-License-Identifier: MIT
```

This string is **an identifier stating the licence information so that tools and the compiler, rather than people, can read it.**
The compiler can include it in the bytecode metadata.

In practice MIT, GPL-3.0 and UNLICENSED are seen often.

---

## 5. What pragma is

`pragma` is a statement conveying a particular directive to the Solidity compiler.
The one seen most is the **version pragma**.

```solidity
pragma solidity ^0.8.20;
```

This statement means "this file must be compiled by a compiler at 0.8.20 or above and below 0.9.0."

The important point is that a pragma **does not change the compiler version**;
it makes the current compiler check whether it meets the requirement.

### Why is it needed?

- Syntax and behaviour can differ by version.
- Security-related changes are sometimes incorporated.
- It prevents compilation on an unintended version.

### Version expressions seen often

```solidity
pragma solidity ^0.8.20;
pragma solidity >=0.8.0 <0.9.0;
```

`^0.8.20` is commonly called a **floating pragma**.
It allows patch versions flexibly while restricting the range of major compatibility.

---

## 6. What import brings in

`import` is the directive that brings code from another Solidity file into the current file.

```solidity
import "@openzeppelin/contracts/access/Ownable.sol";
```

What is mainly imported:

- contracts
- interfaces
- libraries

For example, components such as `IERC20`, `Ownable` and `ECDSA` can be brought in and reused.

---

## 7. What the ABI is

The ABI (Application Binary Interface) is the standard defining the format in which a smart contract and the outside world exchange data.

The EVM does not understand strings or structs as they are.
So function call information and arguments have to be **encoded into byte arrays according to fixed rules.**

### ABI encoder / decoder

- ABI encoder: turns human-readable values into the byte format the EVM reads.
- ABI decoder: interprets byte responses back into human-readable values.

### The basic structure of function call data

```text
[ 4바이트 함수 selector ]
[ 32바이트 인자 1 ]
[ 32바이트 인자 2 ]
...
```

For example, when calling `transfer(address,uint256)`:

```text
keccak256("transfer(address,uint256)")
-> 앞 4바이트 = 함수 selector
```

And the arguments follow, aligned in 32-byte units.

### Why it matters

- You can understand how function calls are made.
- It helps with analysing `msg.data`, selectors and low-level calls.
- It is the starting point for debugging and security analysis.

---

## 8. ABI encoding by example

Suppose the following function is called.

```solidity
transfer(address,uint256)
```

The function selector is obtained like this.

```text
keccak256("transfer(address,uint256)")[:4]
```

The address and amount are then encoded into 32 bytes each and appended.

```text
0xa9059cbb
000000000000000000000000ab8483f64d9c6d1ecf9b849ae677dd3315835cb2
00000000000000000000000000000000000000000000000000000000000003e8
```

Which is to say, the first four bytes of the call data are always **the selector identifying which function to call**,
followed by argument data conforming to the ABI rules.

---

## 9. NatSpec comments

NatSpec is the standard format for Solidity documentation.
It is written directly above a function or contract like this.

```solidity
/// @notice 사용자 잔액을 반환합니다.
/// @param user 조회할 주소
/// @return balance 사용자 잔액
function getBalance(address user) external view returns (uint256 balance) {
    return balances[user];
}
```

Writing NatSpec well means:

- developer documentation gets organized.
- descriptions are easy to show in a frontend or in tools.
- code intent is easy to convey in audits and collaboration.

---

## 10. What SMTChecker does

SMTChecker is a **formal verification tool** included in the Solidity compiler.
Without executing the code, it analyses the possible paths mathematically and attempts to find possibilities of logical error.

It can help check problems such as:

- possible `assert` violations
- invariant violations
- logic errors occurring only on particular branches
- possible arithmetic errors

For example:

```solidity
/// @custom:invariant sum <= 100
contract Test {
    uint256 sum;

    function add(uint256 x) public {
        sum += x;
    }
}
```

In this case the verification tool explores "under which inputs can `sum <= 100` break?"

SMTChecker alone cannot guarantee all security in practice,
and it is meaningful for quickly finding clear logical violations.

---

## 11. What a contract is in Solidity

In Solidity, `contract` is the basic unit of composition.
Deployed to the blockchain, it becomes **a program behaving like an account with its own address.**

One contract usually has the following elements.

- state variables
- functions
- events
- modifiers
- constructor
- struct / enum
- mapping

Which is to say, it is easiest to understand a contract as a blockchain object holding "code + state + address" together.

---

## Wrapping up

This piece organized the foundational concepts to grasp first when studying Solidity.

- Solidity code is not executed directly but converted into EVM bytecode.
- pragma and import are important file-level directives.
- The ABI is the core rule for function calls and data exchange.
- NatSpec and SMTChecker are meaningful on the documentation and verification side.

The next piece will go on to organize Solidity's types and data model – state variables, visibility, struct, enum and the static type system.
