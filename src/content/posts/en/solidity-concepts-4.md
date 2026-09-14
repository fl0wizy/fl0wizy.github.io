# Solidity Concepts 4: Events, Hashing, selfdestruct, Style Guide

This piece gathers the topics most often looked up again in practice while studying Solidity.
It goes on through events and EVM logs, Ether and time units, hashing and signatures, `selfdestruct`, the `type()` keyword, control structures and the style guide.

---

## 1. An event is a log, not state

An event is Solidity's abstraction over the EVM's logging feature.
It is recorded into the transaction log with the `emit` keyword.

```solidity
event Deposit(address indexed user, uint256 amount);

function deposit() external payable {
    emit Deposit(msg.sender, msg.value);
}
```

### Characteristics of events

- Recorded into the blockchain log.
- Not a value readable like internal contract state.
- Good for external applications to subscribe to and search.
- Considerably cheaper than writing to storage.

Which is to say, an event is rightly understood not as "storing state" but as **a record announcing something to the outside world.**

---

## 2. indexed and topics

Attaching `indexed` to an event parameter stores it in the topic area, making filtering easy.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

In this case:

- `from`, `to` -> topics
- `value` -> data

A log roughly has this structure.

```text
address: 컨트랙트 주소
topics:
  [0] 이벤트 시그니처 해시
  [1] indexed 인자 1
  [2] indexed 인자 2
data:
  non-indexed 인자들의 ABI 인코딩
```

This is exactly why event search speed matters.

---

## 3. Why an event cannot be read with SLOAD

An event is not stored in the EVM's **storage** but left in the **log area**.
So it cannot be read with `SLOAD`.

To put it in order:

- state variables -> storage -> `SLOAD`, `SSTORE`
- events -> logs -> `LOG0` to `LOG4`

Which is to say, an event is not state that can be referred to again inside the EVM but
a record for external observation, attached to the transaction result.

Because of this, work such as "read the event emitted earlier" from inside a contract is impossible.

---

## 4. What LOG0 to LOG4 are

The EVM uses the opcodes `LOG0` through `LOG4` when handling events.

| Opcode | Meaning |
|--------|------|
| `LOG0` | no topics |
| `LOG1` | 1 topic |
| `LOG2` | 2 topics |
| `LOG3` | 3 topics |
| `LOG4` | 4 topics |

For example:

```solidity
event MyEvent(address indexed from, uint256 amount);
```

This event generally uses two topics:

- the event signature hash
- `from`

so it can be thought of as a `LOG2` form.

The reasons for going down to the opcode level in practice:

- to understand event gas computation
- for debugging and tracing
- to confirm bytecode-level behaviour

---

## 5. Ether units

Solidity provides suffixes so Ether units can be written readably.

```solidity
1 wei
1 gwei
1 ether
```

For example:

```solidity
uint256 minimum = 0.1 ether;
uint256 gasPrice = 20 gwei;
```

Such expressions are far safer and more readable than writing the numbers directly.

### What to watch

Solidity does not support floating point.
So there are cases that have to be expressed with integer arithmetic rather than `0.5 ether`.

```solidity
uint256 half = 1 ether / 2;
```

---

## 6. Time units

Time-related suffixes are provided too.

```solidity
1 minutes
1 hours
1 days
1 weeks
```

For example:

```solidity
uint256 unlockTime = block.timestamp + 7 days;
```

But this is only syntax making second-based arithmetic easy.
It does not handle calendar computation itself accurately.

So things such as:

- leap years
- differing month lengths
- precise calendar computation

are better left to separate logic or an external system.

---

## 7. Block, message and transaction properties

Solidity provides global variables reading the current execution environment.

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

### The security-important points

- `msg.sender` can change every time an external call goes one level in.
- `tx.origin` is generally not used as the basis for permission checks.
- Randomness based on `block.timestamp` or `blockhash` always has to be considered manipulable.

---

## 8. Hash functions and cryptographic functions

Solidity provides several built-in hash functions.

```solidity
keccak256(...)
sha256(...)
ripemd160(...)
```

The one seen most on Ethereum is `keccak256`.

```solidity
bytes32 hash = keccak256(abi.encodePacked(user, amount));
```

Modular arithmetic functions are provided too.

```solidity
addmod(a, b, m);
mulmod(a, b, m);
```

These functions are meaningful in terms of overflow handling rather than simple arithmetic.

---

## 9. ecrecover and signature verification

`ecrecover` can be used for signature verification.

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

In practice, though, OpenZeppelin's `ECDSA` library is used more often.

The reasons:

- signature malleability can be handled more safely
- return value validation on failure can be made explicit

For signature verification, always remember that "the function may look short, and it is a security-sensitive part."

---

## 10. selfdestruct can no longer be thought of as before

`selfdestruct` used to be regarded as an instruction that effectively removes a contract.

```solidity
selfdestruct(payable(beneficiary));
```

This instruction:

- sends the contract's balance to a particular address.
- does not call the recipient's `receive()`.

But after recent Ethereum upgrades,
**it must not be understood as the general "contract deletion" tool it used to be.**

### The important change

Since Cancun (EIP-6780) the meaning of `selfdestruct` has been greatly restricted.

- Do not expect to erase an existing contract as freely as before.
- By design, it is safer to look only at the balance-movement side rather than "deletion."
- Old patterns such as CREATE2 + selfdestruct redeployment must no longer be viewed on the same assumptions.

Which is to say, rather than putting `selfdestruct` into a design as "the feature that will one day cleanly remove the contract,"
it now has to be handled very conservatively on the basis of current chain behaviour.

---

## 11. The type() keyword

`type(X)` is used to access type information.

For example:

```solidity
type(uint256).max
type(uint256).min
```

It can be used to get an integer type's range, or to read interface IDs, contract names and bytecode information.

A typical example:

```solidity
uint256 maxValue = type(uint256).max;
```

This keyword is quite useful when meta information is needed.

---

## 12. Control structures and Solidity style

Solidity supports the usual control statements such as `if`, `for`, `while`, `do-while`, `break`, `continue` and `return`.

There are differences from C, though.

- Numeric conditions such as `if (1)` are not allowed.
- Do not expect implicit bool conversion.
- The condition must be explicitly `bool`.

For example:

```solidity
if (count > 0) {
    // ...
}
```

---

## 13. Why the style guide matters

The style guide is not syntax, and it matters quite a lot in practice.

The main rules:

- four-space indentation
- imports at the top of the file
- function order: constructor -> receive -> fallback -> external -> public -> internal -> private
- contracts, structs and events in `CapWords`
- functions, variables and modifiers in `mixedCase`
- constants in `UPPER_CASE`

Not keeping the style still compiles.
Not keeping it creates these problems, though.

- reduced readability
- increased difficulty of review and audit
- reduced quality of collaboration
- conflicts with automatic formatters and linters

From a security audit standpoint in particular, "readable code" is itself a large advantage.

---

## 14. Points to remember in practice

Finally, summarizing what this piece covered from a practical standpoint:

- An event is a log for external observation, not state.
- `indexed` connects directly to searchability.
- Ether and time unit suffixes greatly improve readability.
- Hashing and signature verification look short and are highly security-sensitive.
- `selfdestruct` has to be understood very conservatively on current network behaviour.
- The style guide is not mere taste but affects maintainability and audit efficiency.

---

## Wrapping up the series

That covers the fundamentals of Solidity, organized across four pieces.

1. The EVM, file structure and the ABI
2. The type system and the state model
3. Functions, the memory model and exception handling
4. Events, hashing, selfdestruct and the style guide

This series focused less on "memorizing syntax"
than on "understanding what model Solidity code actually runs on."

Next, going on to more practical topics such as inheritance, libraries, interfaces, ERC standards, delegatecall, proxies and storage layout
would make a natural move to the next stage.
