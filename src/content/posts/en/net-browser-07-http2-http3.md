The deficit Part 6 left is the room for interpretation that remains as long as boundaries are written as text. HTTP/2 erased that room by nailing it down as a number in a fixed position in the frame header, and because blocking still remained after that, HTTP/3 replaced the transport layer itself. **Blocking does not disappear; it descends one layer at a time, and every mechanism used to push it down leaves a new discrepancy.**

![The path blocking moved along](/images/net-browser/en/07-h2-h3.svg)

---

## 1. A revision sixteen years later

HTTP/1.1 came out in 1997 and its wire format was unchanged until 2015. In between, web pages went from documents to applications, and a single page came to request dozens or hundreds of resources. As seen in Part 6 §3, responses can only come out in order on one connection, so browsers opened about six connections per domain to imitate parallelism. On the developer side, workarounds became standard practice: sprites that merge images into one, script bundling, domain sharding that scatters resources across several domains. **The state of things was that applications were papering over the protocol's limits with tricks.**

Google offered an alternative in 2009 with an experimental protocol, SPDY, and this went through standardization to become HTTP/2 (RFC 7540) in 2015. It was updated to RFC 9113 in the June 2022 restructuring.

---

## 2. Binary framing – clarity before performance

HTTP/2 abandoning text for binary was not only about saving bandwidth. In a text protocol, implementations have to judge "where does the message end" by string rules, and there is room for that judgement to diverge (Part 6 §2).

HTTP/2's unit is the **frame**, and every frame begins with a fixed header.

```
+-----------------------------------------------+
| Length (24)                                   |   the body length is stated here
+---------------+---------------+---------------+
| Type (8)      | Flags (8)     |
+-+-------------+---------------+---------------+
|R| Stream Identifier (31)                      |   which stream it belongs to
+=+=============================================+
| Frame Payload                                 |
+-----------------------------------------------+
```

The length sits as a number in a fixed position in the header. There is no room to agonize over whether to follow `Content-Length` or `Transfer-Encoding`. This structure is the grounds on which the 2025 research quoted in Part 6 §5 recommends "change the upstream to HTTP/2."

The main frame types divide like this.

| Frame | Role |
|---|---|
| `HEADERS` | request/response headers (compressed with HPACK) |
| `DATA` | body |
| `SETTINGS` | negotiating connection parameters (concurrent stream count and so on) |
| `WINDOW_UPDATE` | flow control |
| `RST_STREAM` | cancelling a single stream |
| `GOAWAY` | advance notice of connection close |

Because every frame carries a stream ID, frames of several requests can be transmitted interleaved and the receiving side can reassemble them. This is multiplexing, and HTTP/1.1's response-order constraint disappears here.

---

## 3. The priority tree – complexity that was never implemented

RFC 7540 designed stream priority as a dependency tree. Each stream could depend on another and carried a weight, and the tree was dynamically restructured. Its expressive power was high.

In practice each implementation interpreted it differently, few implemented it properly, and results varied by browser-server combination. RFC 9113 **deprecated** the scheme, and RFC 9218 replaced it with a far simpler `Priority` header (two values: urgency and whether rendering is incremental). The tree was thrown away.

One trace remains incidentally. Because each client composed the priority tree differently, that pattern itself is used as a **client fingerprint**. It is put to use identifying automation tools impersonating browsers. A case of an observable difference created by a feature outliving the feature's deprecation.

---

## 4. HPACK – compression made to avoid a vulnerability that compression created

HTTP headers repeat nearly the same content on every request. Cookies, `User-Agent`, `Accept` and the like go again at hundreds of bytes each time. SPDY compressed this with standard DEFLATE (zlib).

In the summer of 2012 the **CRIME** attack broke that approach. The principle uses a property of compression directly. DEFLATE replaces parts overlapping with strings seen earlier by references, so **the closer a guessed value is to the real one, the shorter the compressed result.** If an attacker can control part of the request, they can recover a secret value (a session cookie, say) one character at a time just by changing the guess one character at a time and observing the compressed length. A search that should be exponential time becomes linear.

HPACK (RFC 7541) was designed to avoid this problem. The core is **not letting information leak from partial matches**. Header names and values are registered in static and dynamic tables and referenced by index, but matching happens at the granularity of the **whole** header value. The attack path of confirming one character at a time is closed. Sensitive headers can also be designated not to enter the dynamic table.

To be precise, HPACK **mitigates** CRIME-class attacks rather than eliminating them in principle. As long as compression is used, the property that length carries information about content remains. This form belongs to the modern research lineage of "using a side channel as a first-class attack primitive," and several items in the web-hacking tree Part 16 organizes share the same root.

---

## 5. Rapid Reset – when a legitimate feature becomes a resource asymmetry

`RST_STREAM` is a useful feature by design. In HTTP/1.1, cancelling one request meant cutting the whole connection; in HTTP/2 a single stream can be cancelled. It is the behaviour needed when a user navigates quickly away from a page.

Between August and October 2023 an attack using this feature was observed, and it was published as **CVE-2023-44487**.

The operation is simple. The server announces an upper bound on concurrent streams with `SETTINGS` (usually around 100). The attacker opens a stream and **immediately** sends `RST_STREAM`. A cancelled stream drops out of the concurrent stream counter and so does not hit the bound. Yet on the server side request processing has already begun and backend work has been incurred.

```
attacker's cost: two frames (HEADERS + RST_STREAM), no state
server's cost  : request parsing + routing + starting a backend call
                 the concurrent stream bound is bypassed
```

The asymmetry of cost is the whole attack. The resulting scale far exceeded previous records.

| Target | Peak request rate observed |
|---|---|
| Google | 398 million requests per second |
| Cloudflare | 201 million requests per second |
| Amazon | 155 million requests per second |

Effectively every server implementing HTTP/2 was affected. What is worth reading in this incident is not the patch but the structure. **Not because vulnerable code existed, but because a combination of normal behaviours the specification permits created a resource asymmetry.** Flaws like this are not found by code review or fuzzing; they become visible only when you ask, at the protocol level, "who bears the cost of this behaviour."

---

## 6. Downgrade conversion – boundary ambiguity coming back to life

The ambiguity binary framing removed is valid only within one leg. It is common for a frontend to receive HTTP/2 and send HTTP/1.1 down to the backend, and in this **downgrade conversion** HTTP/2's unambiguous length information is translated back into HTTP/1.1's ambiguous headers. The Cloudflare case in Part 6 §5 was this shape.

---

## 7. HTTP/3 – why it left the transport layer

HTTP/2 removed blocking at the application layer, but could not touch blocking one layer down.

TCP guarantees order (Part 3). When frames of several streams ride on one TCP connection, if any one packet is lost, **data of other streams that arrived perfectly fine behind it** cannot be delivered to the application either. Because TCP does not know those bytes belong to mutually independent streams. Making streams independent requires the transport layer to know about streams, and TCP cannot.

QUIC's decision was **to leave TCP rather than fix it**. [RFC 9000](https://www.rfc-editor.org/rfc/rfc9000.html) is the result.

### Why it was built on UDP

QUIC packets are carried in UDP datagrams. The reason the specification gives is not performance.

> "carried in UDP datagrams to better facilitate deployment in existing systems and networks"

Use an entirely new IP protocol number and the firewalls, NATs and middleboxes along the path discard it as a protocol they do not know. Transport protocols such as SCTP in fact failed at internet-scale deployment for this reason. The internet is optimized for and set around what has long been used (ossification), and a new protocol has to be able to pass through that set terrain. UDP already passes everywhere, for DNS, games and video calls.

### What was gained

- **Stream independence** – order and retransmission are managed separately per stream. Loss in one stream does not block another.
- **Connection ID** – a connection is identified not by the source/destination 4-tuple but by a **connection ID**. Per the specification, "connection IDs are independently selected by endpoints." Thanks to this design a connection survives switching from Wi-Fi to LTE with a different IP. A direct answer to NAT's address rewriting and timeout problems seen in Part 2.
- **Integrated TLS 1.3** – the transport handshake and the cryptographic handshake merge into one. Not TCP 1 RTT + TLS 1 RTT but 1 RTT from the start.

Header compression changes to QPACK. HPACK's dynamic table assumes headers arrive in order, and in QUIC that assumption breaks because streams are independent. QPACK is a design that gives up some compression efficiency to remove the order dependency. A pattern that repeats whenever a layer is changed: **solve one thing and something that depended on it breaks.**

### What remains

- **0-RTT replay** – the property seen in Part 5 is inherited as-is. QUIC's 0-RTT data is not guaranteed against replay either.
- **UDP blocking** – some networks block UDP, so a fallback (to HTTP/2) is needed.
- **Implementation cost** – TCP is in the kernel while QUIC is usually in user space. Per-packet processing cost is high, which becomes a CPU usage problem at large services.
- **A new parser = new bugs** – QUIC and HTTP/3 are newly implemented, large state machines. Attack surfaces such as race conditions using stream concurrency and state confusion in frame handling are open, and 2025 research reported a technique using concurrent closure of QUIC streams. Part 6 §2's CL/TE discrepancy does not repeat, but it is closer to **the place where discrepancy lives having moved**.

---

## 8. Where vulnerabilities live at this layer

**This layer's flaws come not from bugs in the specification but from combinations the specification permitted.** Laying out what the previous six sections created as cause and effect:

- the frame header nails the length down → ambiguity comes back to life in the leg that retranslates that length into HTTP/1.1
- the specification is too complex to implement → the priority tree is deprecated, and implementation variance leaves a client fingerprint
- compressed length responds to content → CRIME, and HPACK's retreat to whole-value matching
- a combination of normal behaviours the specification permits → Rapid Reset, the asymmetry of two frames against one backend cycle
- the transport layer is newly built → races and state confusion in a new state machine, and 0-RTT replay inherited as-is

Where vulnerabilities live at this layer folds into two forms. The gradient between the cost of sending and the cost of processing is archetype E (resource asymmetry) in Part 15, and the point where boundaries are carried from one format to another is archetype A (boundary discrepancy).

---

## What is handed to the next part

### Part I summary

That is the protocol layers. Moved onto one page, the structure running through this part looks like this.

```
IP        gives up guarantees                       (Part 2)
TCP       recovers three and gives no boundaries    (Part 3)
DNS       name→address, varying over time           (Part 4)
TLS       verifies the other side but ends midway   (Part 5)
HTTP/1.1  makes boundaries itself, by three methods (Part 6)
HTTP/2,3  makes boundaries clear and pushes blocking down (Part 7)

each layer's vulnerabilities = the discrepancy from making for itself what the layer below does not give
```

The deficit this part hands on unresolved is **the extent of loss after compromise**. Protocols decide only where a byte sequence ends; they do not decide what is lost when the code parsing that byte sequence falls.

Part 8 – Part II, the Browser – begins at that spot.

---

### References

- [RFC 9113: HTTP/2](https://www.rfc-editor.org/rfc/rfc9113.html)
- [RFC 9000: QUIC](https://www.rfc-editor.org/rfc/rfc9000.html) · [RFC 9114: HTTP/3](https://www.rfc-editor.org/rfc/rfc9114.html)
- [RFC 7541: HPACK](https://httpwg.org/specs/rfc7541.html) – the design that answers CRIME
- [HTTP/2 Rapid Reset: deconstructing the record-breaking attack](https://blog.cloudflare.com/technical-breakdown-http2-rapid-reset-ddos-attack/) – Cloudflare
