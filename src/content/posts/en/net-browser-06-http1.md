Part 5 set the connection up safely and handed it on without deciding where the bytes flowing inside break into one message. HTTP/1.1 makes those boundaries itself, and the ways of making them were never consolidated into one: three coexist. **The moment two implementations break the same byte sequence differently, that difference does not disappear – it is delivered to the next user.**

![The structure of request smuggling](/images/net-browser/en/06-desync.svg)

---

## 1. Why it stayed a text protocol, and what that cost

An HTTP/1.1 request is human-readable.

```http
GET /index.html HTTP/1.1
Host: example.com
User-Agent: curl/8.5.0

```

This choice had clear advantages. You can connect with `telnet` and type it by hand, read a packet capture as it is, and implement it easily. In the 1990s this was a factor that decided adoption.

The price is that **parsing becomes string handling**. In a binary protocol, positions are fixed – "the next 4 bytes are the length" – but in a text protocol each implementation decides for itself where a header name ends, how many spaces to allow, and whether the line break is `\r\n` or `\n`. With the culture of lenient parsing seen in Part 1 laid on top, **room was made for implementations to reach different conclusions about the same byte sequence.**

In June 2022, restructuring the HTTP specifications, the IETF expressed its position on this problem as structure.

| RFC | Scope | Content |
|---|---|---|
| 9110 | semantics (version-independent) | what methods, status codes and headers mean |
| 9111 | caching | what may be stored and until when |
| 9112 | HTTP/1.1 syntax | how bytes are arranged |
| 9113 / 9114 | HTTP/2 / HTTP/3 syntax | how frames are arranged |

Semantics are gathered in one place and each version defines only its wire syntax. What `404` means is written exactly once and every version borrows it. A structural measure aimed at reducing differences in interpretation.

---

## 2. The three rules that decide where a body ends

The reason making boundaries came down to this layer is that TCP hands over only a byte stream and gives no place where a message breaks (Part 3). RFC 9112 §6.3 lists, in order, the rules that determine a message body's length. The markers that actually decide the end of a body are three – `Transfer-Encoding`, `Content-Length`, and the case with no marker at all – and the remaining items are either premises filtered out before reaching those three, or the precedence when two of the three overlap. In order:

1. If the response has a status code that cannot carry a body (`1xx`, `204`, `304`), there is no body.
2. If it is a successful `CONNECT` response, what follows is a tunnel.
3. **If both `Transfer-Encoding` and `Content-Length` are present, `Transfer-Encoding` takes precedence.**
4. With `Transfer-Encoding: chunked`, the body runs until a chunk length of 0 appears.
5. With only `Content-Length`, the body is that many bytes. If there are several values and they are all identical, that value is used; if they differ, it is an unrecoverable framing error.
6. If a request has no marker at all, the body length is 0.

The case where two of the three markers arrive together in one message – that is, rule 3 – is this instalment's axis. The specification's own words:

> "If a message is received with both a Transfer-Encoding and a Content-Length header field, the Transfer-Encoding overrides the Content-Length."

The specification adds a warning here. This state "might indicate an attempt to perform request smuggling or response splitting and ought to be handled as an error." If a relay decides to forward this message, it **must remove `Content-Length` first**, and a server **must close the connection** after responding to such a request.

The rules are already written clearly. The problem is not an absence of rules but the fact that the implementations deployed in the world keep them to wildly varying degrees.

---

## 3. Connection reuse as a delivery path

HTTP/1.0 opened a new TCP connection per request. As seen in Part 3, one connection spends 1 RTT, and more with TLS on top. HTTP/1.1 keeps connections and reuses them (`keep-alive`). It was a necessary choice for performance.

Pipelining (sending requests back to back without waiting for responses) was in the specification too, and failed. Responses can only come back in the order sent, so one slow request ahead blocks everything behind it. Head-of-line blocking at the application level, and most browsers eventually disabled it by default.

**Here the structure completes.** A reverse proxy keeps connections to its backend in a pool and passes them around across many users' requests. Many users' requests line up in time order on one TCP connection. In this state, if the frontend and the backend give different answers to "where does request 1 end," the leftover bytes do not disappear – they **attach to the front of the next user's request.**

```
frontend's judgement: request 1 = [A]              leftover [B] is "the next request"
backend's judgement : request 1 = [part of A]      leftover [B] waits in the buffer

→ the victim's request V arrives
→ what the backend actually parses: [B] + [V]
→ the victim's cookie attaches to the headers the attacker wrote in [B]
```

The variants are named by which side follows which header. **CL.TE** (frontend uses `Content-Length`, backend uses `Transfer-Encoding`), **TE.CL** (the reverse), **TE.TE** (both look at `Transfer-Encoding` but one fails to recognize an obfuscated value). Since 2022, **CL.0**, which targets the case where the backend does not read the body at all, and **client-side desync**, which departs from the victim's own browser, have been added.

The three conditions for the attack to hold have all been seen in earlier instalments: a byte stream with no boundaries (Part 3), a party in the middle of the path that reads and rewrites messages (Parts 2 and 5), and a connection shared by many users (this section).

---

## 4. Other criteria that decide a request's identity

### Caching

The core concept of caching, which [RFC 9111](https://www.rfc-editor.org/rfc/rfc9111.html) covers, is the **cache key**. A cache makes a key from part of the request (usually method + URL + the headers listed in `Vary`) and returns the stored response for requests with the same key.

One structural risk arises here. **If an input not included in the key affects the response contents**, an attacker can poison the response with that input and have it delivered to other users. This is web cache poisoning. In the other direction, crafting a URL that looks like a static file so that an authenticated user's private response gets stored in the cache is web cache deception. Both are problems of a mismatch between "the request identity the cache sees" and "the input the server actually used when making the response," and another instance of the discrepancy structure running through this whole instalment.

### Cookies

HTTP is stateless. Each request is independent and the server does not remember previous ones. Maintaining something like a login state means carrying state somewhere, and cookies are what was bolted on later as that mechanism.

That they were bolted on explains their character. Cookies are sent on the basis of **domain and path, not origin**. They use a different criterion from the origin, which is the basic unit of the browser security model, and this mismatch is why attributes such as `Secure`, `HttpOnly`, `SameSite` and the `__Host-` prefix have been added one per era. `SameSite` in particular, which puts "which site the request departed from" into the conditions for sending a cookie, is a mechanism aimed directly at CSRF's premise.

---

## 5. The state of things in 2025

Research from 2025 shows this is not an old story. The argument of [HTTP/1.1 must die](https://portswigger.net/research/http1-must-die), presented by PortSwigger's James Kettle, is not an individual bug report but a verdict on the protocol itself.

> "Upstream HTTP/1.1 is inherently insecure and regularly exposes millions of websites to hostile takeover."

Two of the newly organized techniques stand out.

- **0.CL desync** – the combination where the frontend sees the body length as 0 while the backend follows `Content-Length`. Until then it had been considered unexploitable, both sides falling into deadlock waiting for each other. Kettle breaks the deadlock by finding an **early-response gadget**, a path that makes the backend emit a response before the body arrives (for example IIS's reserved filename `/con`). He then converts 0.CL into an exploitable CL.0 with a double-desync variant.
- **`Expect` header based** – the complexity of handling `Expect: 100-continue` at reverse proxies creates new discrepancies. Both the plain and the obfuscated forms induced 0.CL and CL.0 desync at major CDNs.

Scale backs this research's point. A single Cloudflare H2.0 desync exposed roughly **24 million** sites to full takeover, a single obfuscated `Expect` vulnerability at Akamai paid out 74 bounties totalling **$221,000**, and the whole two-week research effort produced more than **$350,000**.

The recommendation is not an individual patch. It is to **change the upstream (the leg from proxy to backend) to HTTP/2**. HTTP/2 is a binary protocol and message length is stated in the frame header, so there is structurally no room to interpret "where does the body end."

> "HTTP/2+ solves this threat… If we want a secure web, HTTP/1.1 must die."

Binary framing is, before it is a performance improvement, **a measure that removes ambiguity from parsing**.

---

## 6. Where vulnerabilities live at this layer

Where vulnerabilities live in HTTP/1.1 reduces to one sentence. **There are several ways to decide a message's identity, and no party to forcibly reconcile the discrepancies between them.**

- three ways to decide where a body ends → request smuggling
- the request identity the cache sees differs from the input the server uses → cache poisoning and deception
- the criterion for sending cookies differs from the criterion of origin → CSRF

Grasping that this whole list is one form is faster, when meeting a new technique, than memorizing individual techniques. That form is archetype A, boundary discrepancy, in Part 15.

---

## What is handed to the next layer

What this layer could never remove is the room for interpretation that remains as long as boundaries are written as text. The attempt to remove that room structurally, by nailing the length into a fixed position in a frame header, is Part 7.

To organize the desync variants along a single axis and follow how 0.CL's deadlock was broken in 2025, go to [Deep Dive 01](/post/net-browser-deep-01-desync).

---

### References

- [RFC 9112: HTTP/1.1](https://www.rfc-editor.org/rfc/rfc9112.html) – the body length rules are §6.3
- [RFC 9111: HTTP Caching](https://www.rfc-editor.org/rfc/rfc9111.html)
- [HTTP/1.1 must die: the desync endgame (2025)](https://portswigger.net/research/http1-must-die) – 0.CL and `Expect`-based desync
- [HTTP Desync Attacks: Request Smuggling Reborn (2019)](https://portswigger.net/research/http-desync-attacks-request-smuggling-reborn) – the starting point of this research lineage
