This instalment receives, at the single layer of TCP, **the four guarantees IP gave up** that Part 2 named and handed on. TCP recovers three of them, leaves one abandoned, and as the price of that recovery pushes one new property up to the layer above. **A byte stream has no message boundaries.**

![The TCP handshake and the byte stream](/images/net-browser/en/03-tcp-stream.svg)

---

## 1. The work TCP took on

As seen in Part 2, IP gave up order, arrival, absence of duplicates and constant delay entirely. TCP recovers the first three and leaves the fourth abandoned.

| What IP gave up | How TCP recovers it |
|---|---|
| order | reassembly by sequence number |
| arrival | retransmission when no ACK comes |
| no duplicates | discarding duplicates by sequence number |
| constant delay | not recovered – it bounces more, because of retransmission |

The fourth row determines TCP's character. **Reliability is bought with delay.** When a single packet is lost, perfectly good data that arrived after it cannot be delivered to the application either, and waits. Because order has to be guaranteed. This is head-of-line blocking at the TCP layer, and the reason HTTP/2 could never solve it and HTTP/3 ended up leaving TCP (Part 7).

---

## 2. What the three-way handshake prevents

Knowing the handshake's purpose as "confirming the connection" does not explain why it is three times rather than two. [RFC 9293](https://www.rfc-editor.org/rfc/rfc9293.html) writes the reason in a single sentence.

> "The principal reason for the three-way handshake is to prevent old duplicate connection initiations from causing confusion."

**Old duplicate SYNs** are the problem. On a packet-switched network a packet can wander the paths and arrive much later (Part 2). The receiving side has no way to tell whether an arriving SYN is one just sent or the debris of a connection that died three minutes ago. The third ACK is proof that "I just sent that SYN, and I actually saw your response." Without that proof, the server holds a connection open, spending resources, with a client that does not exist.

### The initial sequence number (ISN) and its randomization

In the handshake the two sides exchange their ISNs. If the ISN is predictable, an attacker who cannot see the connection can still forge a valid segment and insert it. RFC 9293 states this risk explicitly and prescribes how to generate it.

```
ISN = M + F(localip, localport, remoteip, remoteport, secretkey)

 M : a monotonically increasing timer – so it does not overlap an old connection on the same 4-tuple
 F : a function that must not be computable from outside – to prevent prediction
```

> "F() MUST NOT be computable from the outside, or an attacker could still guess at sequence numbers from the ISN used for some other connection."

It is a structure that demands a time component and a secret-key component at once. Either alone will not do. Monotonic increase alone is predictable; pure randomness alone can collide with the numbers of a previous connection's debris on the same 4-tuple.

### The cost is itself the attack surface

The handshake spends 1 RTT as a fixed cost and creates state on the server side. Both become targets as they are.

- **SYN flood** – sending only SYNs and never the third ACK fills the server's half-open state table. The standard countermeasure is SYN cookies, which, instead of storing state, encode the information into the ISN itself and restore it when the third ACK arrives. A way of defeating a state-exhaustion attack by removing the state.
- **RTT cost** – adding a TLS handshake on top of TCP's 1 RTT puts 2–3 RTTs before the first byte. The pressure to reduce this cost creates the whole lineage running HTTP keep-alive → HTTP/2 multiplexing → QUIC's 0-RTT.
- **Connection reuse** – because it is expensive, it gets reused. A reverse proxy holds the connections to its backend in a pool and passes them around across many users' requests. **The structure in which many users time-share a single TCP connection** arises here.

---

## 3. The 1986 congestion collapse

TCP's retransmission has an obvious trap. Packets are lost because the network is congested, and when a sender that sees the loss retransmits, the network gets more congested. Early TCP had no mechanism to break this feedback.

In October 1986 the result was observed. Throughput from Lawrence Berkeley Laboratory (LBL) to UC Berkeley fell **from 32 Kbps to 40 bps**. The physical distance between the two points was 400 yards, across three routers. An 800-fold degradation. This was the first congestion collapse, and the same phenomenon recurred afterwards.

[Congestion Avoidance and Control](https://ee.lbl.gov/papers/congavoid.pdf), which Van Jacobson and Michael Karels presented at ACM SIGCOMM in August 1988, is the answer to this problem. The core insight is **reading packet loss as a signal rather than an error**. On wired networks the main reason a packet disappears is not a bit error but overflow of a router queue, so loss is a report that "the network cannot take this."

The machinery that came out of it still runs today.

- **slow start** – begin a connection with a small transmission volume and increase it exponentially as each ACK returns. Measurement instead of guesswork, in a state of not knowing the network's capacity.
- **congestion window** – separate from the window the receiver advertises (how much the other side can take), this is the "amount the network seems likely to accept" that the sender maintains for itself. The actual send volume is the smaller of the two.
- **AIMD** – increase a little when things go well (additive increase), halve on seeing loss (multiplicative decrease). The justification for this rule is that when many senders each follow it, bandwidth divides roughly fairly.

The modern default algorithm is Linux's CUBIC, and BBR, which estimates bandwidth and RTT directly instead of using loss, is also widely used. But the structure – "congestion control is voluntary cooperation by the end hosts" – is unchanged. Which also means an implementation that does not keep the rules takes more bandwidth.

---

## 4. The absence of boundaries in a byte stream

This is the core of this instalment. TCP is a byte-stream protocol. How many times the application called `send()` **is not conveyed.**

```c
// the sending side
send(fd, "GET /a", 6, 0);
send(fd, " HTTP/1.1", 9, 0);
send(fd, "\r\n\r\n", 4, 0);

// the receiving side – it can arrive in one go like this
recv(fd, buf, 4096, 0);   // "GET /a HTTP/1.1\r\n\r\n"  (19 bytes)

// and it can arrive split like this
recv(fd, buf, 4096, 0);   // "GET /a HT"              (9 bytes)
recv(fd, buf, 4096, 0);   // "TP/1.1\r\n\r\n"          (10 bytes)
```

Which of the two it will be is decided by the kernel buffer situation, the MTU, the Nagle setting and the congestion along the path. The application cannot control this.

So **the application has to create message boundaries itself.** There are fundamentally only two methods.

1. **Delimiters** – when a particular byte sequence appears, one message ends there. The advantage is not needing to know the length in advance; the disadvantage is breaking when that byte sequence appears in the body.
2. **Length prefixes** – write the length in front and read exactly that much. The advantage is independence from the body's content; the disadvantage is needing to know the length in advance.

HTTP/1.1 **uses both.** The end of the headers is decided by a delimiter (a blank line, `CRLF CRLF`), and the end of the body by a length (`Content-Length`) or chunk lengths (`Transfer-Encoding: chunked`). It is a structure in which three ways of deciding boundaries coexist inside one protocol, and Part 6's request smuggling occurs when those three give different answers. What to remember now is that this is not a mistake by HTTP's designers but **work unavoidably taken on because TCP does not give boundaries**.

---

## 5. Nagle – the delay where two optimizations overlap

Nagle, which appeared by name in the previous section as a factor blurring boundaries, is itself an optimization. Sending many small packets means severe header overhead. The Nagle algorithm reduces this with "if there is data not yet ACKed, hold small data together and send it later." Separately, delayed ACK reduces packet count with "do not send an ACK on its own; wait a moment (usually 40–200 ms) and put it on top of data you are about to send."

Both are reasonable, and turning them on together creates something close to deadlock.

```
sender:   has small data → waits for the previous ACK (Nagle)
receiver: has no data to send → delays the ACK (delayed ACK)
result:   both wait for the other, wasting tens to hundreds of ms
```

In protocols that exchange short request-response pairs, this combination shows up as delay with no apparent cause. The field's response is to turn Nagle off with `TCP_NODELAY`, and today nearly every HTTP server and database client has it off by default. As a case of **two individually optimal policies becoming the worst when combined**, this structure appears repeatedly when looking at interactions between layers.

---

## 6. Where vulnerabilities live at this layer

Where vulnerabilities live at this layer is not a defect but a property. **What TCP guaranteed and what it did not become the material of attacks as they are.** Most attacks aim at application logic, but there are techniques that use TCP's physical properties directly as a primitive.

The **single-packet attack** (James Kettle, 2023) solves the precision problem of race-condition attacks with TCP. When trying to land two requests on a server simultaneously, arrival times usually spread apart by several milliseconds because of network jitter. If the attack window is narrower than that, it fails.

The technique works like this. Over HTTP/2, **send all of several requests in advance except their last frame**, then gather the remaining last pieces into a single TCP packet and send them at once. Because they are inside one packet, every request reaches the server at the same instant whatever the network delay. With the spread in arrival times removed, an attack window that was on the order of milliseconds narrows to microseconds.

The reason this technique works is not a protocol detail but the property seen in §4. **Segment boundaries are the sender's to choose.**

Written as cause and effect, the sections above connect like this.

```
a byte stream with no boundaries → the application makes the boundary rules → several rules coexist inside one protocol → two interpreters give different answers
the handshake creates state on the server → state exhaustion (SYN flood)
connections are expensive → they get reused → many users time-share one connection
the sender chooses segment boundaries → the spread in arrival times disappears (single-packet attack)
congestion control is voluntary cooperation by the ends → implementations that do not keep the rules take more bandwidth
```

This form – the layer below not giving you boundaries – is archetype A, boundary discrepancy, in Part 15.

---

## What is handed to the next layer

Every layer we have descended through so far deals only with addresses. The deficit this instalment could not touch is **turning a name into an address**, and as long as what the browser receives in the address bar is a name, somebody has to be responsible for that translation. The layer that took on that job is what Part 4 looks at.

---

### References

- [RFC 9293: Transmission Control Protocol](https://www.rfc-editor.org/rfc/rfc9293.html) – the handshake and the ISN rules
- [Congestion Avoidance and Control (Jacobson & Karels, 1988)](https://ee.lbl.gov/papers/congavoid.pdf) – the original paper, PDF
- [Smashing the state machine: the true potential of web race conditions](https://portswigger.net/research/smashing-the-state-machine) – the single-packet attack
