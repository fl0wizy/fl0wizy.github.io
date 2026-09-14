This instalment opens, one layer down, **what happens along the path** that Part 1 named and handed on. What packet switching gave up in guarantees, and the machinery stacked on top to fill that place. **A packet does not prove where it came from.**

![Encapsulation and per-hop rewriting](/images/net-browser/en/02-encapsulation-nat.svg)

---

## 1. Why packets rather than circuits

The telephone network's method is circuit switching. When a call starts, a dedicated path is taken between the two ends and held until the call ends. Because the path is reserved, delay is constant and order is guaranteed. In exchange, if one point along the path dies, the call dies too.

In August 1964, Paul Baran of RAND writes an eleven-volume report for the US Air Force, *On Distributed Communications*. The requirement was clear: **a communications system that does not collapse when one node is destroyed.** Circuit switching cannot satisfy this in principle, because the very notion of a dedicated path is a dependency on particular intermediate nodes.

Baran's answer was a distributed structure. Do not have any important central component at all; chop the message finely and let each piece find its path independently. In 1965 Donald Davies at the UK's National Physical Laboratory designed the same structure independently, and gave it the name **packet**. Without knowing of each other's work, the two even agreed on setting the packet size at 1024 bits.

What packet switching paid for this is **the abandonment of guarantees**.

```
What circuit switching guaranteed    Status under packet switching
─────────────────────────────────────────────────────────────────
order                                may be reversed (normal)
arrival                              may be lost (normal)
no duplicates                        may arrive duplicated (normal)
constant delay                       may differ per packet (normal)
```

The four lines on the right are not bugs; they are the IP layer's specification. IP "does its best to deliver but promises nothing" (best-effort).

---

## 2. The criterion that fixed the number of layers

Textbooks teach the OSI seven layers and real implementations run on four or five. This mismatch makes the layer model feel like something to be memorized for form's sake, but what layers mean in practice reduces to one thing: **which layer knows what, and which layer does not.**

| Layer | Unit handled | What it knows | What it does not know |
|---|---|---|---|
| Link (Ethernet, Wi-Fi) | frame | the MAC address of the device right next to it | the final destination |
| Internet (IP) | packet | the final destination IP, the next hop | which application's data this is |
| Transport (TCP, UDP) | segment | ports, sequence numbers | what the bytes mean |
| Application (HTTP) | message | the meaning of method, headers, body | what happened along the path |

The last column is the one that matters for security. No layer can know what happened at the layer beneath it. An application server is **structurally unable** to know how many proxies the byte sequence it received passed through, or where the original source was, and has no choice but to believe what an upper layer wrote into the body for it (headers such as `X-Forwarded-For`). Bodies can be forged. This asymmetry creates one of the fixed patterns of access-control bypass.

---

## 3. Where the number 1500 comes from

Ethernet's maximum transmission unit (MTU) is 1500 bytes. There is no formula behind that number. It is a value compromised between several physical constraints when the DIX Ethernet specification was made in 1980.

- **Occupancy time on shared media** – Ethernet then had every device sharing a single coaxial cable. While one device sends a long frame, all the rest wait. The larger the frame, the better the header overhead ratio, but the longer the other devices wait.
- **Babble protection** – a transceiver treated transmission by one device beyond roughly 1.25 ms as a fault and isolated that device from the network. This time limit sets an upper bound on frame size.
- **The detection power of the CRC** – the error-detecting capability of the frame check sequence (FCS) falls as the frame grows. Too large, and errors pass silently.
- **Hardware memory** – early NICs had small buffers.

Under these four constraints, 1500 was chosen somewhat arbitrarily as "a size large enough to hold most shapes of data of the day without making everyone else wait too long." The shared cable is gone and buffers became cheap, but the number stayed. Compatibility is why. Plenty of equipment supports jumbo frames (usually 9000 bytes), but if **any single device** along the path accepts only 1500 the whole path drops to 1500, so the default for traffic crossing the internet is still 1500.

**What this number created:** IP packets above 1500 are fragmented. In a fragmented packet, the TCP header exists only in the first fragment. Which is to say, looking at the second fragment alone tells you nothing about which port it is going to or what it is. Firewalls and intrusion detection devices that judge by port were bypassed for years because of this property. Modern stacks try to avoid fragmentation altogether with path MTU discovery (PMTUD), but PMTUD depends on ICMP messages and many networks block ICMP wholesale. The result is the black-hole phenomenon where "the handshake works but only large responses stall," and the field's countermeasure is TCP MSS clamping.

---

## 4. NAT – what IPv4 exhaustion broke

There are about 4.3 billion IPv4 addresses. Exhaustion was already foreseen in the mid-1990s, and IPv6, the fundamental fix, deployed slowly. NAT was the stopgap in between.

NAT's operation is itself simple. Several devices on a private network share one public IP, and the router **rewrites the source address and port** of outgoing packets, then writes that correspondence into a table. Returning packets are looked up in the table in reverse and sent back to the original device.

This simple operation broke one of the internet's design principles. **The end-to-end principle** – that the middle of the network only carries bits and that meaningful processing happens at the two ends. NAT edits packet contents in the middle. The consequences chain.

- **Incoming connections do not establish.** An externally initiated connection with no entry in the table has nowhere to be returned to. This is why P2P protocols acquired machinery such as STUN, TURN and hole punching, and it is also why the internet effectively set into a client-server shape.
- **Protocols that write addresses into the body break.** FTP's active mode writes the IP and port to be used for the data connection into the **body** of the command channel. If NAT fixes only the header, the address in the body stays a private IP and the connection fails. Because of this, routers acquired an ALG (Application Layer Gateway) that looks into and edits FTP bodies. One of the first cases of network equipment beginning to parse application protocols – and soon a vulnerability.
- **Connections acquire a lifetime.** Entries in the NAT table are deleted after a period without traffic. A state is created in which both ends believe they are alive while the table in the middle has been erased, which is why long-lived connections (WebSocket, database connection pools) have to send empty packets periodically.

**What remains, security-wise:** many users share one public IP. IP-based blocking, rate limiting and "is this the same person" judgements all become inaccurate. Conversely, the private address ranges (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) and the link-local range (`169.254.0.0/16`) came to exist universally, and inducing a server to send a request to an arbitrary URL can reach those ranges. That the cloud metadata address `169.254.169.254` is SSRF's signature target is a direct consequence of this structure.

---

## 5. Where vulnerabilities live at this layer

The "no central control" of the 1989 CERN proposal and the "survivability" of the 1964 RAND report started from different motives but demanded systems of the same shape. The web was not laid on top of that by coincidence; it is the next storey of the same design philosophy.

Compressed into one sentence, this instalment says: **no layer can see what happened at the layer below it, and the layer above accepts as fact the values the layer below has rewritten.**

```
the client IP is ─┬─ changed once at NAT
                  ├─ changed again at the load balancer
                  └─ changed again at the reverse proxy
   what the app server sees = the last proxy's IP
   to know the real address? → nothing to do but believe a header → headers get forged
```

The problem that the translation from name to address can differ over time (DNS rebinding) comes from the same root.

This form – an address being rewritten at every layer – is archetype B, identity discrepancy, in Part 15.

---

## What is handed to the next layer

What this layer does not repair and passes straight on is **the four guarantees IP gave up**. Order, arrival, absence of duplicates and constant delay: nobody here is responsible for any of them. Who takes on that debt and at what price is what Part 3 looks at.

---

### References

- [Paul Baran and the Origins of the Internet](https://www.rand.org/pubs/articles/2018/paul-baran-and-the-origins-of-the-internet.html) – RAND
- [How 1500 bytes became the MTU of the internet](https://blog.benjojo.co.uk/post/why-is-ethernet-mtu-1500) – tracing how the MTU was decided
- [RFC 791: Internet Protocol](https://www.rfc-editor.org/rfc/rfc791.html) – best-effort in the original
- [RFC 3022: Traditional IP Network Address Translator](https://www.rfc-editor.org/rfc/rfc3022.html) – the NAT specification
