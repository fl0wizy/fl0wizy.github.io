# Solidity Concepts 3: Functions, Visibility, the Memory Model, Exception Handling

This piece organizes things around how Solidity is actually called and executed.
Let us connect functions and modifiers, function visibility, `calldata / memory / storage`, `receive / fallback`, ABI encoding and exception handling from a runtime standpoint.

---

## 1. The basic concept of a function

In Solidity a function is an executable block of code inside a contract.
It can read or modify state and return values.

```solidity
function getSum(uint256 a, uint256 b) public pure returns (uint256) {
    return a + b;
}
```

Functions are usually defined inside a contract, and can also exist in a library or as a free function.

---

## 2. Parameters and return values

Parameters are used inside the function like local variables.

```solidity
function add(uint256 a, uint256 b) public pure returns (uint256) {
    return a + b;
}
```

Two return styles are seen often.

### Named return values

```solidity
function add(uint256 a, uint256 b)
    public
    pure
    returns (uint256 sum)
{
    sum = a + b;
}
```

### Unnamed return values

```solidity
function add(uint256 a, uint256 b)
    public
    pure
    returns (uint256)
{
    return a + b;
}
```

Solidity supports multiple returns as well.

```solidity
function info() public pure returns (uint256, bool) {
    return (42, true);
}
```

---

## 3. A modifier is a device that wraps logic around a function

A modifier is used to insert common logic before and after a function's execution, or to block execution entirely.

```solidity
modifier onlyOwner() {
    require(msg.sender == owner, "Not owner");
    _;
}
```

Here `_` is "where the original function body goes."

```solidity
function changeOwner(address newOwner) public onlyOwner {
    owner = newOwner;
}
```

This function in fact passes `onlyOwner`'s `require` first, and then the body executes.

### Typical uses of a modifier

- access control
- precondition validation
- checking whether paused
- reentrancy prevention

---

## 4. Function visibility specifiers

The visibility of a Solidity function comes down to four: `public`, `external`, `internal` and `private`.

| Visibility | External call | Direct internal call | Inheriting contracts |
|--------|-----------|----------------|---------------|
| `public` | yes | yes | yes |
| `external` | yes | not directly | yes |
| `internal` | no | yes | yes |
| `private` | no | yes | no |

### public

- Usable both internally and externally.
- Included in the ABI.

### external

- Designed for external calls only.
- Cannot be called directly internally as `f()`; only as an external call, as `this.f()`.

This difference is not mere syntax but a difference in how execution actually happens.

- `f()` -> an internal jump
- `this.f()` -> an external CALL

So `external` is used often in entry functions taking large calldata in particular.

### internal / private

- Neither is included in the ABI.
- That is, they cannot be called directly from outside by selector.
- The implementations do exist inside the compiled code, though.

---

## 5. calldata, memory, storage

These three are the most confusing when studying Solidity, and the most important.

| | Persistence | Modifiable | Typical use |
|------|--------|-----------|-----------|
| `calldata` | temporary, during the call | read-only | external function input |
| `memory` | temporary, during the call | yes | computation inside a function |
| `storage` | permanent | yes | state variables |

### calldata

- The area holding external call data.
- Read-only.
- Efficient, because there is no copying cost.

```solidity
function setData(uint256[] calldata input) external {
    uint256 first = input[0];
}
```

### memory

- Temporary memory used during function execution.
- Modifiable, and gone when the function ends.

```solidity
function copyData(uint256[] memory input) public pure returns (uint256) {
    input[0] = 100;
    return input[0];
}
```

### storage

- Stored permanently on the blockchain.
- The most expensive, and to be handled most carefully.

```solidity
uint256[] public data;
```

---

## 6. Why external + calldata is favourable for gas

When an external function takes a large array or string, referring to `calldata` directly
reduces the cost of copying into `memory`.

```solidity
function foo(uint256[] calldata input) external {
    uint256 x = input[0];
}
```

Reference-type parameters of a `public` function, by contrast, readily involve memory copying in the course of internal use.
This is why the `external` + `calldata` combination is seen often at external entry points.

---

## 7. Memory and calldata seen at a low level

### The basic structure of calldata

Function call data usually looks like this.

```text
[ 4바이트 selector ][ 인자 1 ][ 인자 2 ] ...
```

For example:

```text
foo(uint256 x, uint256 y)
```

Here:

- `msg.data[0:4]` -> the selector
- the 32-byte units after it -> the arguments

### Related opcodes

- `calldataload(offset)` -> read calldata
- `mload(offset)` -> read memory
- `mstore(offset, value)` -> write memory
- `sload(slot)` -> read storage
- `sstore(slot, value)` -> write storage

Understanding this makes the ABI, function selectors and low-level debugging far clearer.

---

## 8. receive and fallback

Solidity has two special functions unlike ordinary ones.

### receive

```solidity
receive() external payable {
    emit Received(msg.sender, msg.value);
}
```

Characteristics:

- It has no name.
- Only `external payable` is possible.
- It runs when Ether is received with empty calldata.

### fallback

```solidity
fallback() external payable {
    emit FallbackCalled(msg.sender, msg.data);
}
```

Characteristics:

- Used for handling calls to functions that do not exist.
- Runs when there is data and no matching function.
- Can receive Ether too if made `payable`.

### Execution priority

It can roughly be understood like this.

1. Is the calldata empty?
2. If empty, check for `receive`
3. Otherwise check for a function matching the selector
4. If none, check for `fallback`
5. If neither exists, revert

---

## 9. Forced Ether receipt and balance dependence

One important point is that **a contract can receive Ether even when it does not want to.**

Typically:

- as the target of `selfdestruct`
- protocol-level forced balance movement

In these cases:

- `receive()` may not run.
- An internal counter and `address(this).balance` can diverge.

So logic depending strongly on "the deposit total I recorded == the actual balance," as below, needs care.

```solidity
require(address(this).balance == accountedBalance, "Mismatch");
```

In practice it is safer to think of "known balance" and "unexpected balance" separately.

---

## 10. ABI encode / decode

Solidity provides ABI encoding and decoding functions.

### encode

```solidity
bytes memory data = abi.encode(123, "hello", true);
```

It uses 32-byte alignment according to the standard ABI rules.

### encodePacked

```solidity
bytes memory packed = abi.encodePacked("ab", "cd");
```

Compact encoding, and ambiguity can arise when dynamic types are mixed in.
When using it as hash input, the possibility of collisions has to be considered.

### encodeWithSelector / encodeWithSignature

```solidity
abi.encodeWithSignature("transfer(address,uint256)", to, amount);
```

Used often when building low-level call data.

### decode

```solidity
(uint256 amount, address to) = abi.decode(data, (uint256, address));
```

Encoding and decoding connect directly to analysing selectors, calldata and low-level calls.

---

## 11. Block and transaction global variables

Solidity lets execution environment information be read through these global variables.

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

Confusing `msg.sender` and `tx.origin` in particular can create security problems.
In practice it is usual not to use `tx.origin` for permission checks.

Also, `block.timestamp`, `blockhash` and the like must not be used as a complete source of randomness.

---

## 12. Exception handling: require, assert, revert

### require

Used for input validation and checking external conditions.

```solidity
require(amount > 0, "Amount must be positive");
```

### assert

Used to check internal invariants that must never break.

```solidity
assert(totalSupply >= balance);
```

### revert

Used when you want to halt execution directly.

```solidity
revert("Transfer failed");
```

In practical terms:

- validating user input -> `require`
- detecting internal logic errors -> `assert`
- explicit halting -> `revert`

---

## 13. How exceptions propagate

In an ordinary function call, when a sub-call reverts the exception propagates to the caller.
Low-level functions are different, though.

```solidity
(bool success, bytes memory data) = addr.call(payload);
```

Here, on failure the exception does not automatically bubble up; instead:

- `success == false`
- revert data may come back in `data`

Which is to say, low-level calls must always be checked directly.

```solidity
require(success, "Low-level call failed");
```

And because calling an address with no code can appear to succeed by EVM design,
additional checks are needed when the call target has to be validated.

---

## 14. try / catch

To catch exceptions from external function calls or contract creation, use `try/catch`.

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

What to watch is that `try/catch` **applies only to external calls.**
It is not a general exception syntax catching every error arising in internal expressions.

---

## 15. Compile time and runtime

To understand Solidity execution it helps to look at compile time and runtime separately.

### Compile time

- syntax checking
- type checking
- optimization
- bytecode generation
- ABI generation

### Runtime

- selector matching
- calldata decoding
- opcode execution
- gas deduction
- storage changes
- event emission
- return value encoding

Which is to say, static typing gives compile-time safety,
and the EVM is responsible for actual state changes and gas computation at runtime.

---

## Wrapping up

This piece organized the "executing side" of Solidity.

- Functions and modifiers are the core tools organizing the flow of execution.
- Function visibility connects directly to ABI exposure and the manner of internal calls.
- `calldata`, `memory` and `storage` are core to gas and security.
- `receive` and `fallback` matter for receiving Ether and handling unknown calls.
- `require`, `assert`, `revert` and `try/catch` compose the exception model.

The next piece will bundle together concepts frequently met in practice – events, the LOG opcode, Ether and time units, hashing and signatures, `selfdestruct` and the style guide.
