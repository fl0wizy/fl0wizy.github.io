The deficit Part 12 handed on is **the window that opens between a read and a write**, and the authority to close that window lies not with the app but with the layer where the data actually sits. This instalment opens that layer, back-calculating why the machinery responsible for storage and retrieval set into its present shape. **Disks are slow, and requests arrive at the same time.**

![The data layer](/images/net-browser/en/13-database.svg)

---

## 1. The physical form of an index

Finding rows matching a condition without an index means reading the whole table. With a million rows, a million comparisons. An index turns this into a sorted structure and reduces the number of probes to logarithmic scale.

A natural question arises here. If it is a sorted search structure, a binary search tree would do – so why do databases use a **B+ tree**?

The answer is that the thing being optimized differs. For an in-memory data structure the goal is reducing **the number of comparisons**, but on disk **the number of block accesses** is almost the entire cost. Disks do not read byte by byte but block by block. The time to read one block overwhelmingly exceeds the time to compare hundreds of keys inside that block.

So nodes are made as wide as a block. Put hundreds of keys in one node and fan-out grows and tree height falls to around 3–4. **Three or four disk accesses reach the desired row out of hundreds of millions.**

Another property of the B+ tree is that it keeps the actual data only in the leaves and **links the leaves to one another as a linked list**. Because of this, range queries become sequential reads rather than descending the tree again. It is why `BETWEEN`, `ORDER BY` and pagination get faster with an index.

### Why indexes are not free

- **Write cost** – inserting one row means updating every index on that table. The more indexes, the slower writes get.
- **Selectivity** – an index on a column with few distinct values (true/false, say) cannot filter out most rows and is useless. The optimizer ignores it and chooses a full scan.
- **Column order in a composite index** – an `(a, b)` index is used for conditions on `a` but not when querying by `b` alone. The same as being unable to find someone by given name alone in a directory sorted by surname.
- **Covering** – if every column the query needs is inside the index, the table body need not be read. The justification for making indexes wide.

Which index to use is decided by the optimizer from statistics. When statistics diverge from the real distribution, the plan diverges. A good share of "a query that was fast until yesterday is slow today" comes from here.

---

## 2. What isolation levels agree to permit

When transactions run concurrently, each other's intermediate states can become visible. The anomalies are of a fixed set of kinds.

- **dirty read** – reading a value not yet committed.
- **non-repeatable read** – reading the same row twice and getting different values.
- **phantom** – querying by the same condition twice and getting a different number of rows.

Isolation levels are the grades of which of these to prevent.

| Level | dirty | non-repeatable | phantom |
|---|---|---|---|
| READ UNCOMMITTED | allowed | allowed | allowed |
| READ COMMITTED | blocked | allowed | allowed |
| REPEATABLE READ | blocked | blocked | varies by implementation |
| SERIALIZABLE | blocked | blocked | blocked |

The default is not the highest level because of cost. Raising isolation widens locking scope or increases the burden of maintaining snapshots, and retries from conflicts multiply. Most modern databases use MVCC so that reads do not block writes, but pay instead **the cost of maintaining a snapshot of the same instant**.

### What isolation levels do not prevent

This is where Part 12's race conditions are met. The following pattern breaks at the application logic level regardless of how high the isolation level goes.

```sql
-- T1                          -- T2
SELECT balance FROM acct ...   SELECT balance FROM acct ...   -- both read 1000
-- the application computes 1000-100
UPDATE acct SET balance = 900  UPDATE acct SET balance = 900  -- result: only 100 came out
```

This is **lost update**. Each transaction is entirely normal from its own point of view. The fix is closing the window between read and write on the database side.

```sql
-- ① merge read-modify-write into one statement (atomic update)
UPDATE acct SET balance = balance - 100 WHERE id = ? AND balance >= 100;

-- ② lock while reading
SELECT balance FROM acct WHERE id = ? FOR UPDATE;
```

Or use optimistic locking: keep a version column, update with `WHERE version = ?`, and retry on failure. What Part 3's single-packet attack targets is precisely this window.

---

## 3. The cost a cache layer bears separately

**Redis** is closer to a data structure server than a key-value store. Lists, sets, sorted sets and hashes can be manipulated atomically, so it is used for rate limiting, queues, session stores and distributed locks. Because commands are processed on a single thread, each command being atomic is the justification for these uses. For the same reason, one long-running command stops everything. It is why commands such as `KEYS` on large keysets are taboo in production.

Introducing a cache brings consistency problems along. If the source changed while the cache remains, a stale value goes out, and **caching authorization results** in particular creates situations where a user whose permission was revoked keeps getting access. Omit the user identifier from the cache key and another user's response is delivered. Exactly the same form as the web cache problems seen in Part 6, repeated at the application layer.

---

## 4. What separating syntax from data does and does not prevent

The cause of SQL injection is not string concatenation itself but **syntax (code) and data arriving at the parser mixed into the same string**. A prepared statement sends the syntax to the parser first and fixes the execution plan, then delivers values on a separate channel. Whatever the value, it cannot change the already-fixed syntactic structure.

The limit follows from that same principle. What can be bound as a parameter is **values** only.

```sql
-- safe: the value goes as a parameter
SELECT * FROM posts WHERE author = ?

-- places that cannot be expressed as a parameter
SELECT * FROM posts ORDER BY <column name> <direction>
SELECT * FROM <table name> ...
```

Sort column, sort direction, and table and column names are part of the syntax and cannot be parameters. Put user input in these places and injection holds even with prepared statements. The only defence is an **allow list**. Map the input to a predefined set of column names and reject anything not on the list.

### Operator injection in document NoSQL

In **document NoSQL** the shape of injection differs. Because the query is a structured object rather than a string, the method is not breaking the syntax but **injecting an operator**.

```js
// intended: { username: "admin", password: "the input" }
// if the input is parsed as an object: { username: "admin", password: { "$ne": null } }
```

An operator object enters where a value should be and the condition's meaning changes. The defence is type validation. Reject an object arriving where a string is required.

### The queries an ORM hides

An ORM maps tables to objects, translates object manipulation into SQL, and manages things so that only one object is made per row. What is gained is the removal of repetitive code. The price is **not seeing the queries that get generated**.

- **N+1** – fetch a list of 100 and then access each item's associated object and 101 queries go out. In the code it looks like a single loop. It does not show up until logging is turned on.
- **Unintended full loads** – one lazy-loading setting brings a huge associated table wholesale into memory.
- **Filter conditions assembled from user input** – pass keys and operators to the ORM's filter API as user input and the query conditions are manipulated even though no SQL string was built. Values are bound safely as parameters, but **which column is compared with which operator** is manipulated.

---

## 5. Where vulnerabilities live at this layer

```
failure to separate syntax and data     → SQL injection
places that cannot be parameterized     → sort/identifier injection (allow lists are the only defence)
an operator entering where a value goes → NoSQL injection
the time between read and write         → lost update, race conditions
mismatch between authorization result and cache key → another user's data exposed
differences in response time and error messages     → blind / time-based extraction
```

The last line is this layer's signature. Even when data cannot be read directly, observing **the time difference between a query that uses an index and one that full-scans** is enough to recover a value one bit at a time. In that performance characteristics become an information channel as-is, it is the same class as Part 5's padding oracle and Part 7's HPACK story.

This form is organized in Part 15 as archetype D – side-effect observation.

---

## What is handed to the next layer

This layer closed the insides of queries and transactions, but did not open what machine the database and the app sit on, or which intermediate legs they cross to reach each other. The boundary of the execution environment is the deficit this layer hands on, and Part 14 deals with that boundary.

The physical behaviour of indexes and the inside of snapshot isolation, which this instalment folded into a line, and the blind / time-based channel of §5's last line, are unfolded in [Deep Dive 03](/post/net-browser-deep-03-database).

---

### References

- [PostgreSQL: Transaction Isolation](https://www.postgresql.org/docs/current/transaction-iso.html) – actual behaviour per isolation level
- [SQL Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html) – OWASP, including where allow lists are required
