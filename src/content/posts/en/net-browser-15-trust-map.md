The previous fourteen instalments each left one debt per layer, and those debts ended scattered instalment by instalment. Part IV – Map and Record. Gathering the "where vulnerabilities live at this layer" written at the end of each instalment into one place produces **not a list but five shapes**.

![The five archetypes of web vulnerabilities](/images/net-browser/15-map.svg)

---

## 1. The debts the layers left

First, the conclusions of Parts I through III, restated one line each.

```
IP         gives up order, arrival, no-duplicates and constant delay      (Part 02)
TCP        recovers the first three but gives no message boundaries       (Part 03)
DNS        turns names into addresses, and the answer varies over time    (Part 04)
TLS        verifies the other side but ends midway along the path         (Part 05)
HTTP/1.1   makes boundaries itself, by three methods                      (Part 06)
HTTP/2,3   makes boundaries clear and pushes blocking downward            (Part 07)
browser    takes the process as a boundary, and blocks only reads         (Parts 08, 10)
frontend   moves the place of rendering, and the trust boundary with it   (Part 11)
backend    where state is kept decides the kinds of bug                   (Part 12)
DB         separates syntax from data, and handles concurrency by agreement (Part 13)
infra      creates the point where a header is accepted as fact           (Part 14)
```

The latter half of each line is the debt. **What one layer does not give, the layer above has to make for itself, and vulnerabilities come out at that spot.** Folded by shape, this chain leaves five.

---

## 2. The five archetypes

### A. Boundary discrepancy

Two interpreters read the same byte sequence differently. Answers diverge on how far one message, or one value, extends.

- request smuggling (`Content-Length` vs `Transfer-Encoding`)
- web cache poisoning and deception (mismatch between the cache key and the inputs that actually determine the response)
- reverse proxy path normalization bypass (proxy and app unescape `..%2f` differently)
- mXSS (the sanitizer's parser and the browser's parser)
- Unicode normalization differences, email and URL parser differences

The structure seen in Part 1 is this archetype's root. With no central control, implementations exist separately per organization, and there is no party to forcibly reconcile differences in interpretation.

**The shape of the defence is to reduce the number of interpreters, or to reject ambiguity.** The 2025 research saying "change the upstream to HTTP/2" is the former; RFC 9112 saying "when both headers arrive, treat it as an error and close the connection" is the latter.

### B. Identity discrepancy

The criterion that decides access differs from the criterion that actually operates.

| The deciding criterion | The operating criterion | Result |
|---|---|---|
| the cookie's domain+path | SOP's origin | CSRF |
| the name (the origin string) | the address (the socket connection) | DNS rebinding |
| the socket's source IP | the IP written in a header | XFF forgery, IP-based control bypass |
| the verification key the server fixed | the key the token dictates (`kid`, `jku`) | JWT forgery |
| the name on the allow list | that name's current owner | subdomain takeover |

As seen in Part 10, there are three criteria inside the browser alone (origin, site, cookie domain). Without checking which criterion a given defence operates on, you place the real boundary wrongly.

**The shape of the defence is to fix the judging criterion as one, and to keep input from changing that criterion.**

### C. Missing privilege check

The simplest and the most common. There is a structural reason: **authentication once, authorization every time.**

Checking whether someone is logged in ends in one place in middleware, but "does this object belong to this user" has to be written per handler. With 200 endpoints it has to be written 200 times, and missing it in one place is enough. In a structure with many places it can be forgotten, it eventually is.

**The shape of the defence is to remove the places where it can be forgotten.** Push authorization down into the data access layer and make the default deny, so that a query with no owner condition attached is impossible in the first place. Get out of the structure where each handler has to remember.

### D. Side-effect observation

The data itself is blocked but differences in response remain. A shape that appeared repeatedly in this series.

- Part 5 – padding oracle: the difference in the **reason** decryption failed
- Part 7 – CRIME: the difference in compressed **length**
- Part 8 – Spectre: memory contents via cache state
- Part 9 – XS-Leaks: render time and frame count
- Part 13 – blind SQLi: differences in response time

That the centre of gravity of 2020s research has moved this way matters. Side channels are used not as an auxiliary means but as a **first-class attack primitive**. A technique that amplifies blind SSRF from differences in redirect behaviour alone is one example.

**The shape of the defence is to make the responses the same, or to block the observation itself.** Constant-time comparison and uniform error messages are the former; process isolation and lowering timer precision are the latter.

### E. Resource asymmetry

It holds even with no vulnerable code. A combination of normal behaviours the specification permits creates **a gradient between the cost of sending and the cost of processing**.

Part 7's Rapid Reset is the archetype. At the cost of sending two frames it consumed one cycle of the server's request processing, and the concurrent stream bound was bypassed. Catastrophic backtracking in regular expressions (ReDoS), abuse of GraphQL nesting and aliases, XML bombs and compression bombs are the same class.

**The shape of the defence is to put a ceiling on processing cost, and to charge the requester a cost too for expensive operations.**

---

## 3. Laying the web-hacking tree on these coordinates

Attaching which archetype each section of the classification tree belongs to organizes the terrain into five cells even with more than a hundred items.

| Tree section | Main archetype |
|---|---|
| Injection (SQL, command, SSTI, XXE) | C + A |
| SSRF | B (+ the premise of internal address ranges) |
| XSS · CSRF · clickjacking | B (+ A: mXSS) |
| Authentication / sessions | B |
| Access control (IDOR, BOLA) | C |
| File handling · path traversal | A (differences in path interpretation) |
| Deserialization | C (failure to separate syntax and data) |
| HTTP protocol layer (desync, cache) | A |
| Business logic · races | C + E |
| API security (including GraphQL) | C + E |
| Client-side (prototype pollution, DOM clobbering) | B + C |
| Infrastructure-adjacent (subdomain takeover, supply chain) | B |
| Cryptographic flaws | D |
| Side channels · XS-Leaks | D |

Cells with two archetypes written in exist because real attacks are usually chains. Reach the inside with SSRF (B), then use an internal service's missing authorization (C). Seeing this way of combining lasts longer than memorizing individual items.

---

## 4. Where a new technique sits

New techniques come out every year. Names and details keep changing, but the five cells above do not change easily. So fixing the items you check first when reading new research makes digestion fast.

1. **The two components whose interpretation diverged** – and what it diverged about.
2. **The two criteria that split** – the deciding criterion and the operating criterion.
3. **The one missing check** – and why that is a place it is easy to miss.
4. **The signal observed** – what leaked out instead of the blocked data.
5. **Which side paid** – the cost ratio between requester and processor.

When the five items fill in, that technique is a variation on a shape you already know; when they do not, that is when it is genuinely new. The latter is rare.

---

## 5. The cells this map left empty

The five archetypes are the result of folding problems that arise in the gaps between code and specification. What stands outside those gaps does not sit on these coordinates. Social engineering aimed at people, an organization's operational procedures, physical access, and boundaries enforced only by contract and law are like that. The terrain was organized into five cells, and this is the area cut away in exchange.

Inside the cells there are also three spots folded into a line each, and three deep dives unfold them. Deep Dive 01 reopens Part 6's request smuggling, Deep Dive 02 Part 9's rendering pipeline, and Deep Dive 03 Part 13's data layer, at one instalment's length each. They are offshoots of the main line and do not replace it.

Separately from what the three deep dives unfold, one cell that Part 9 ultimately left empty remains. It covered only where the JavaScript engine sits and why it was needed, and handed on what happens inside the engine. That cell is the next series' scope.

### The order in which to read this map

This series is arranged bottom-up. It starts at the physical layer and proceeds through protocols, browser, application and infrastructure. It is an order that follows the dependency of concepts, and without knowing Part 3's "no boundaries," Part 6's smuggling becomes memorization.

In actual study it is better to mix in the opposite direction. Reproduce one concrete vulnerability, then follow downward why it is possible. Understanding sticks where the two directions meet.

---

## What is handed on next

The deficit this instalment did not resolve is **a record of having deployed the coordinates**. Part 16 takes on that record.

---

### References

- [PortSwigger Research](https://portswigger.net/research) – the annual Top 10 web hacking techniques list
- [OWASP Top 10](https://owasp.org/Top10/) · [OWASP API Security Top 10](https://owasp.org/API-Security/editions/2023/en/0x11-t10/)
- [CWE](https://cwe.mitre.org/) – the classification system for weakness types
