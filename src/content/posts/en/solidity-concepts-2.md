# Solidity Concepts 2: State Variables, the Type System, Mappings and Arrays

This piece organizes things around Solidity's data model.
It bundles together state variable visibility, `constant` and `immutable`, `struct`, `enum`, value and reference types, and mappings and array slices.

---

## 1. Visibility specifiers on state variables

State variables can carry visibility such as `public`, `internal` or `private`.

### public

```solidity
uint256 public totalSupply;
```

- Readable from outside.
- A getter function is generated automatically.
- Accessible from inside the contract too.

So `public` means "a read interface returning that variable's value is created automatically."

### internal

- Accessible only inside the current contract and contracts inheriting from it.
- Not exposed in the external interface.

### private

- Accessible only inside the contract where the variable is defined.
- Inheriting contracts cannot access it directly either.

But there is a misunderstanding that frequently arises here.

### private is not really secret

`private` is only **an access restriction at the Solidity code level.**
The value stored on the blockchain is not itself encrypted.

Which is to say:

- Another contract cannot access it directly as `a.secret`.
- But knowing the storage slot, the value can be read with a node, RPC or tooling.

So `private` should be understood not as "outsiders can never know" but as "other Solidity code cannot reference it directly."

---

## 2. constant and immutable

Solidity lets unchangeable values be declared in two ways.

| | `constant` | `immutable` |
|------|------------|-------------|
| When set | compile time | deployment time |
| Changeability | never | once, in the constructor |
| How stored | embedded directly in the code | the value is written into the code at deployment |
| Typical use | mathematical constants, ratios, units | the deployer's address, initial settings |

### constant

```solidity
uint256 constant MAX_SUPPLY = 1_000_000 ether;
```

- The value has to be fixed at declaration.
- The compiler puts the value itself directly into the code.
- Runtime values such as `msg.sender` and `block.timestamp` cannot be used.

### immutable

```solidity
address immutable owner;

constructor() {
    owner = msg.sender;
}
```

- Can be set once, in the constructor.
- Dynamic information at deployment time can be reflected.
- It can never be changed afterwards.

Both differ from the notion of being stored in a storage slot like an ordinary state variable.
Neither is a complete secret, though: the values can be revealed by bytecode analysis.

---

## 3. struct: the type that bundles several values into one

`struct` lets data of different types be handled as one logical bundle.

```solidity
struct User {
    address wallet;
    uint256 balance;
    string name;
}
```

Such a structure is useful when handling several values together, as with user profiles, order information and position state.

### Example of use

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

### Characteristics of struct

- It can contain other structs.
- It can be used in arrays, mappings, function parameters and so on.
- When used as an actual variable, `storage`, `memory` or `calldata` often has to be stated.

---

## 4. enum: the type expressing a restricted set of states

`enum` is the type that expresses related states bundled by name.

```solidity
enum Status {
    Pending,
    Active,
    Closed
}
```

Internally it is represented like an integer starting from 0,
and in code it can be handled with state names far more readable than numbers.

```solidity
Status public status = Status.Pending;
```

### Why use enum

- State representation becomes clear.
- Meaningless magic numbers are reduced.
- It is easy to read in code review and audits.

### What to watch

- Do not mix enum values directly with ordinary integers without an explicit conversion.
- Converting a wrong integer value into an enum can cause a runtime error.

---

## 5. The static type system from the execution point of view

Because Solidity is a statically typed language:

- Types are settled at compile time.
- Type mismatches are filtered out before execution.
- The compiler can optimize more easily.

For example:

```solidity
uint256 public count;

function setCount(uint256 newCount) external {
    count = newCount;
}
```

Here code such as `count = "hello"` does not even run.
This property matters especially in a language handling assets directly.

---

## 6. Value types and reference types

Solidity's types divide broadly into **value types** and **reference types**.

### Value types

Types passed by copying.

- `bool`
- `int`, `uint`
- `address`
- fixed-size `bytes`
- `enum`

### Reference types

Types referring to an actual data area, such as arrays and structs.

- `array`
- `bytes`
- `string`
- `struct`
- `mapping`

For reference types, which data area they sit in matters.

- `storage`: permanent storage
- `memory`: temporary storage during function execution
- `calldata`: external call data, read-only

---

## 7. Default values

Variables declared in Solidity automatically have a zero-based default value.

For example:

- `bool` -> `false`
- `uint` / `int` -> `0`
- `address` -> `address(0)`
- `string` -> `""`
- dynamic array -> an empty array
- enum -> the first member

This is exactly why reading an uninitialized state variable still gives a value.

---

## 8. Scope

A variable declared inside a block is valid only within that block.

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

Here `y` cannot be accessed outside the `if` block.

Top-level declarations such as state variables, functions and contract declarations, on the other hand, sit outside code blocks and so have a wider scope.

---

## 9. bool and short-circuit evaluation

Solidity's `&&` and `||` short-circuit.

For example:

```solidity
if (isAdmin || expensiveCheck()) {
    // ...
}
```

Here if `isAdmin` is already `true`, `expensiveCheck()` is not executed.

Which means:

- unnecessary external calls can be reduced
- gas can be saved
- execution of functions with side effects can be prevented

So short-circuiting is not mere syntactic convenience but has a direct effect on the flow of execution.

---

## 10. Array slices

An array slice is a view onto a contiguous part of an array.

```solidity
function sliceExample(bytes calldata data) external pure {
    bytes calldata a = data[0:4];
    bytes calldata b = data[4:];
}
```

### The core rules

- `start` is inclusive
- `end` is exclusive
- the form is `x[start:end]`

### Important constraints

- Used only on calldata arrays.
- It does not generally have a separate type name of its own.
- Usually useful for preprocessing before ABI decoding and the like.

For example:

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

## 11. Mappings

A mapping is a data structure storing key-value pairs.

```solidity
mapping(address => uint256) public balances;
```

### Characteristics

- Reading a key that does not exist gives the default value.
- Iteration is impossible.
- It is meaningful only in storage.
- If a list of keys is needed, it has to be tracked with a separate array.

### Why iteration is impossible

A mapping internally uses a structure of "the storage location obtained by hashing the key,"
so the notion of "enumerate every key in it" fundamentally does not exist.

Which is why the pattern of using an auxiliary array alongside appears often.

```solidity
mapping(address => uint256) public balances;
address[] public users;
```

---

## 12. The delete operator

`delete` does not "remove" a value but is **the operation returning it to that type's default value.**

For example:

```solidity
uint256 x = 42;
delete x; // x = 0
```

### Behaviour on arrays

- `delete` on a whole dynamic array -> an empty array
- `delete` on a whole fixed array -> each element at its default value
- `delete` on a particular element -> that element at its default, with the length kept

### Behaviour on mappings

```solidity
delete balances[msg.sender];
```

This resets a particular key's value.
But there is no notion of erasing a whole mapping at once.

### What to watch when combining struct and mapping

When a struct contains a mapping, doing `delete structVar`
does not "iterate and delete all" the mapping's internal keys.
Because a mapping fundamentally cannot be enumerated in full.

---

## 13. Implicit and explicit conversion

### Implicit conversion

The compiler converts automatically where it judges it safe.

```solidity
uint8 a = 100;
uint16 b = a; // OK
```

### Explicit conversion

The developer forces it by writing the conversion directly.

```solidity
uint256 large = 300;
uint8 small = uint8(large); // 44
```

In this case the upper bits are cut off, so care is needed.

### Why it is dangerous

- Values can be truncated when out of range.
- Signed / unsigned conversion can produce results contrary to expectation.
- Bytes type conversion also requires knowing the left/right truncation and padding rules.

For conversions, what matters is not "the syntax passed, so it is safe" but
"I understand the result at the bit level."

---

## 14. The relation between literals and types

Numeric and string literals are converted according to the type context.

For example:

```solidity
uint8 a = 255; // OK
// uint8 b = 256; // 컴파일 에러
```

Length matters when putting a string literal into a fixed-size bytes too.

```solidity
bytes4 tag = "ABCD";
```

Literals are convenient, and the habit of always checking they match the type size exactly is necessary.

---

## Wrapping up

This piece organized things around Solidity's data model.

- `public`, `internal` and `private` are code-level access control.
- `constant` and `immutable` are both immutable, and differ in when they are set.
- `struct`, `enum` and `mapping` are the core tools of state modelling.
- Value types and reference types differ in storage location and how they are copied.
- Detailed rules such as `delete`, conversion and slices readily become bugs and audit points.

The next piece will organize the execution-flow side: functions, modifiers, visibility, calldata/memory/storage, receive/fallback and exception handling.
