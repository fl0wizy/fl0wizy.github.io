Part 13 folded the physical form of indexes and isolation levels into one line each, in §1 and §2. The inside of those two lines is this piece's scope. **Pages are fixed in size, and reads do not block writes.**

![Inside indexes and concurrency](/images/net-browser/en/deep-03-db.svg)

---

## 1. How key insertion order changes write cost

A B+ tree's nodes (pages) are fixed in size. When one more key arrives in a range whose page is full, a **page split** happens. The page is cut in two with half the contents each, and a new entry is added to the parent node.

Insertion order makes a decisive difference here.

**Sequential keys** – with auto-incrementing integers or identifiers sorted in time order, new keys always go to the rightmost page. Splits barely happen, and even when they do the left page stays full. Because pages fill densely, fewer pages are needed to hold the same data.

**Random keys** – use a random UUID as the primary key and insertion positions scatter across the whole tree. Middle pages split continually, and split pages end up roughly half full. Three consequences:

- Index size grows. More pages are used for the same row count.
- Cache hit rate falls. With more pages, not all of them fit in memory.
- Write amplification appears. Inserting one row modifies several pages.

This property is why time-ordered UUID variants (the UUIDv7 family) appeared. They keep the randomness while **making the leading part a timestamp so that insertion positions cluster at the right end.** A case of an application-level decision – identifier design – being back-calculated from the storage engine's physical structure.

In Part 15's classification, the cell this instalment stands in is where A (boundary discrepancy) on the cause side overlaps with D (side-effect observation) on the extraction side.

---

## 2. How primary key size propagates into every index

Table storage differs by engine, and that difference changes what an index means.

In the **clustered index approach**, the table itself is stored in primary key order. The leaves of the primary key index are the whole rows. And the leaves of secondary indexes hold **the primary key value**, not the row's physical location.

```
secondary index:  [email] → [primary key]
clustered:        [primary key] → [whole row]
```

Two things follow.

- **A large primary key makes every secondary index grow with it.** Use a 36-character string UUID as primary key and those 36 bytes are replicated into every entry of every secondary index.
- **A secondary index lookup happens twice.** Find the primary key in the secondary index, then find the row in the clustered index. If every needed column is inside the secondary index (a covering index), the second lookup is skipped.

In the **heap storage approach**, the table accumulates in insertion order and index leaves point at physical locations. In exchange, the problem arises that when a row is updated and its location changes, the indexes have to be updated in step. Rather than one being better, what matters is that **index design changes depending on which structure your engine uses**.

---

## 3. The cost of MVCC

Most modern databases use multi-version concurrency control. An update does not overwrite the existing row but **makes a new version**, and each transaction reads the version visible at its own instant. Thanks to this, reads do not block writes.

The price is the lifetime of the old versions. **While someone is looking at an old instant, the versions visible at that instant cannot be cleaned up.**

```
09:00  a long analytic query starts (transaction open)
09:00~12:00  millions of updates occur on the same table
             → every old version created has to stay alive
12:00  the analytic query ends → only then can cleanup happen
```

For three hours the table swells, and meanwhile every query scans the bloated data. This is the real basis of the advice to "keep transactions short." Code that calls an external API while holding a connection, or waits for user input inside a transaction, creates this problem.

The cleanup work is itself a cost. The periodic cleanup process creates load, and when cleanup falls behind, a feedback loop of worsening query performance appears.

---

## 4. What snapshot isolation does not prevent

Part 13 covered lost update, and there is one more, subtler form. **Write skew.**

Suppose there is a rule: "at least one doctor must remain on call." Two are currently on call, and both request to come off call at the same time.

```
T1: query on-call count → 2   "there is one besides me, so I can drop out"
T2: query on-call count → 2   "there is one besides me, so I can drop out"
T1: drops its own on-call
T2: drops its own on-call
result: 0 on call
```

Each transaction checked the rule, and at the moment it checked, the rule held. The two transactions **modified different rows**, so it is not an update conflict either. Snapshot isolation looks at whether the rows it read changed later; it does not look at whether **the whole condition** its judgement rested on is still true.

There are three fixes.

1. **Use a serializable isolation level.** Engines implementing serializable snapshot isolation track such read-write dependencies and fail one side on conflict. The application has to receive the failure and retry.
2. **Lock the basis of the judgement explicitly.** Attach `FOR UPDATE` to the query to lock the rows read, or lock a single row that represents the rule itself.
3. **Leave it to the database as a constraint.** For expressible rules, a unique or check constraint is surest.

What generalizes here is that the actual guarantee is narrower than the impression the isolation level's name gives. The name `REPEATABLE READ` means "reading repeatedly gives the same thing," not "my judgement stays valid." Phantom handling also differs by engine. In some engines phantoms do not appear thanks to snapshots; in others they are blocked with gap locks. **Without checking your own engine's documentation, you will read the standard table and reach a wrong conclusion.**

---

## 5. How the same structure becomes an information channel

This makes concrete what Part 13 pointed out at the end. The performance structures seen so far become the attack surface as-is.

The procedure by which blind SQL injection recovers a value one bit at a time from response delay alone is in Part 13 §5. One request gives one bit, so the number of requests to recover the whole value is linear in the value's length, and the angle this instalment adds is where that delay is made.

It is commonly known as using a delay function (the `sleep` family), and even where that is blocked the channel remains. Make the condition **take an expensive path** only when true.

- the execution time difference between a condition that uses an index and one that triggers a full scan
- a Cartesian product against a large table
- catastrophic backtracking in regular expression matching

All of them are the structure seen in the first half of this deep dive. The difference between having an index and not, the difference in the number of page accesses, is a difference in time.

---

## 6. Defences and their limits

**Hiding error messages is not a defence.** It blocks error-based extraction only, and time-based extraction remains as it is. Adding delay to responses to blur timing is the same: repeat the measurement and the distribution emerges, so the channel itself does not close. The real defence is exactly as organized in Part 13. Separate syntax from data with prepared statements, and fix the identifier positions that cannot be parameterized with an allow list.

```
the physical structure of indexes → comes back as identifier design and schema decisions
MVCC's version management         → one long transaction drags down overall performance
the names of isolation levels     → the actual guarantee is narrower; check the engine docs
```

Understanding indexes and understanding timing channels are two directions of the same knowledge. What you need to know for performance and what you need to know for security almost coincide at this layer.

---

## Where to go back to

The places to go back to are [Part 13 §1](/post/net-browser-13-database), which set up the physical form of indexes, §2 of the same instalment, which organized the agreement that is isolation levels, and §5 of the same instalment, which left this channel as a line.

As side appendices there are [Deep Dive 01](/post/net-browser-deep-01-desync), which dissects boundary discrepancy variant by variant, and [Deep Dive 02](/post/net-browser-deep-02-pipeline), which saw the same observation channel at the rendering layer.

This series' appendices end here.

---

### References

- [PostgreSQL: Transaction Isolation](https://www.postgresql.org/docs/current/transaction-iso.html) – serializable snapshot isolation and write skew
- [MySQL: InnoDB Index Types](https://dev.mysql.com/doc/refman/8.4/en/innodb-index-types.html) – the clustered index structure
- [Blind SQL injection](https://portswigger.net/web-security/sql-injection/blind) – time-based extraction
