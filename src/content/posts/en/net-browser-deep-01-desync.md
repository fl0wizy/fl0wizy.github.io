This unfolds the variants Part 6 §2 folded into a line. With several names it is easy to memorize them as a list, while in fact there is one axis. **The connection is reused, and on top of it the judgement about "where the message ends" splits in two.**

![Classification of desync variants](/images/net-browser/en/deep-01-desync.svg)

---

## 1. The classification of variants, and its limits

The convention is `[what the frontend follows].[what the backend follows]`.

| Variant | Frontend | Backend | Character of how it holds |
|---|---|---|---|
| CL.TE | `Content-Length` | `Transfer-Encoding` | the frontend departs from the specification |
| TE.CL | `Transfer-Encoding` | `Content-Length` | the backend departs from the specification |
| TE.TE | recognizes TE | fails to recognize obfuscated TE | a difference in header parsing tolerance |
| CL.0 | `Content-Length` | does not read the body at all | **holds with a specification-conforming request** |
| 0.CL | judges there is no body | `Content-Length` | long treated as unexploitable because of deadlock |

What the table holds is the five combinations in which frontend and backend break the message differently; the client-side desync and pause-based desync seen later do not divide along these two columns.

Judged by the RFC 9112 rule quoted in Part 6, the side violating the specification in CL.TE is the frontend. Because `Transfer-Encoding` has to override `Content-Length`. What this fact means in practice is that **it is not that one side has a bug but that the combination is the problem.** Audit each component separately and nothing is found.

Obfuscation is the core of TE.TE. Both implementations handle `Transfer-Encoding`, but their tolerance for which variations of the header value count as valid differs. One recognizing it and the other ignoring it results in CL.TE or TE.CL. A direct product of the lenient parsing culture seen in Part 1.

In Part 15's classification, this whole instalment is the purest case of archetype A (boundary discrepancy).

---

## 2. CL.0 – the variant with a specification-conforming request

CL.0, the table's fourth row, is different in character. It targets the situation where the backend ignores `Content-Length`, that is, does not read the body at all. PortSwigger's research sets out why such situations are common:

> "First, the server must ignore the request's Content-Length (CL). This typically happens because the request either triggered a server error, or the server simply wasn't expecting a POST request to the chosen endpoint."

Static file paths and server-level redirects can be added to this. What they have in common is that they are **paths where processing finishes before reaching application code**. There is no reason to read the request body, so it is not read.

```
frontend    : forwards as much as Content-Length says  →  [request 1][prefix]
backend     : consumes 0 bytes of body                 →  processes request 1, [prefix] stays in the buffer
next request: [prefix] + [victim's request] are parsed as one
```

A decisive difference emerges here. CL.TE and TE.CL need both headers present or an obfuscated value, so **an abnormal request** has to be made. CL.0 does not. In the researcher's words, it is a "completely valid and specification-compliant HTTP request."

The consequence is the next section.

---

## 3. client-side desync – poisoning the browser's connections

If it holds with an ordinary, specification-conforming POST, then **the browser can send that request.**

Browsers also pool and reuse TCP connections to the same origin (Part 3). If unread bytes remain on that connection, they attach in front of the request the victim's browser next sends on the same connection. What gets poisoned is not a server-side connection pool but **the victim's own connection pool**.

There are three conditions.

- **The target has to be a connection pool that carries cookies.** Sending a cross-domain `fetch` with `credentials: 'include'` meets that condition.
- **The target must not support HTTP/2.** Browsers use HTTP/2 where they can, and this reuse-abuse path is closed under HTTP/2. The defensive effect of the binary framing seen in Part 7 shows up here too.
- **The server must not close the connection even after an error response.**

This variant's reach lies in the range of targets. Classical smuggling presupposes a configuration with a separated frontend and backend. CSD does not need that premise. **A single-server site with no proxy becomes a target too, and services on internal networks come into range.**

---

## 4. 0.CL – the early response that broke the deadlock

0.CL is the combination where the frontend judges there is no body and the backend follows `Content-Length`. It looks powerful intuitively, and in practice falls into deadlock.

```
frontend: considers the request fully sent and waits for a response
backend : waits for as much body as Content-Length says
→ both wait for each other. Nothing happens until timeout.
```

Because of this, 0.CL was long classified as unexploitable. How the 2025 research broke this deadlock is summed up in one line:

> "The key to escaping the 0.CL deadlock is to find an early-response gadget."

An **early-response gadget** is a path that makes the backend emit a response before the body arrives. For example, on some servers a path pointing at a reserved filename returns an error immediately without waiting for a body. Once that response comes out the deadlock is broken, and a variant called double-desync then converts it into the exploitable CL.0 state (§2).

The same research also found new discrepancies in `Expect: 100-continue` handling. This header means "check first whether the body may be sent," and how reverse proxies handle it differs by implementation. Both the plain and the obfuscated forms induced desync at major CDNs.

The scale is as quoted in Part 6. A single Cloudflare H2.0 desync affected roughly 24 million sites, and Akamai's obfuscated `Expect` vulnerability produced 74 bounties totalling $221,000.

What to read here is not the individual techniques but **how research proceeds**. The verdict "this combination deadlocks, so it is unexploitable" was in fact "the deadlock cannot be broken by currently known methods." Verdicts of impossibility are usually of that shape, and change one premise and they flip.

---

## 5. pause-based desync

A variant that appears on servers with badly implemented timeouts. Send only the headers, pause for longer than the server's timeout, then send the rest, and where the server responds to the partial request without closing the connection, **the bytes sent afterwards are interpreted as a new request.**

Unlike the preceding variants, which use differences in header interpretation, this uses **the time axis**. The same byte sequence has different boundaries depending on when it arrives – an application of the property seen in Part 3 that "segment boundaries can be manipulated by the sender."

---

## 6. Defences and their limits

### Detection and safety rules

Everything organized here is published research, and actual testing is done only within an authorized scope. These techniques **break other users' requests when they succeed.** If an unrelated user's request arrives on a connection with a prefix left on it, that user receives a broken response or their request fails. Trying them carelessly on a live service creates a real outage.

Detection is therefore split into two stages.

**Stage 1 – timing-based probes.** Determine whether the server is waiting for a body from the response delay. If the backend waits for more body to come, the response is noticeably late. This approach leaves no prefix on the connection and so does not affect other users. It is the stage that confirms only the possibility of vulnerability.

**Stage 2 – confirmation.** The stage of actually injecting a request, and from here there is impact. Only in authorized testing, preferably at low-traffic times, using confirmation through one's own follow-up request. Tools such as Burp Suite's HTTP Request Smuggler implement this procedure.

### Priority of defences

In order of priority:

1. **Change the upstream to HTTP/2.** The length is stated in the frame header, so the room for interpretation disappears. Also the conclusion of the 2025 research.
2. **Normalize or reject at the frontend.** Do not forward requests that arrive with both `Transfer-Encoding` and `Content-Length`. RFC 9112 requires removing `Content-Length` first if you do decide to forward.
3. **Close the connection on ambiguous requests.** This is why the specification says "must close the connection after responding." With the connection closed there is nowhere for a prefix to remain.
4. **Close the connection after error responses.** Directly removes one of the conditions for CL.0 and CSD.
5. **Be strict at the backend too.** Do not assume the frontend will filter it. A defence present on only one side disappears when that side is replaced.

---

## Where to go back to

The places to go back to are [Part 6 §2](/post/net-browser-06-http1), which set up the rules for deciding where a body ends, and §3 of the same instalment, which placed connection reuse as the delivery path.

To see the same form at another layer, go to [Deep Dive 02](/post/net-browser-deep-02-pipeline), which covers the path by which differences in render cost become an observation channel as-is.

---

### References

- [HTTP Desync Attacks: Request Smuggling Reborn](https://portswigger.net/research/http-desync-attacks-request-smuggling-reborn) (2019)
- [Browser-Powered Desync Attacks](https://portswigger.net/research/browser-powered-desync-attacks) (2022) – CL.0, client-side desync
- [HTTP/1.1 must die: the desync endgame](https://portswigger.net/research/http1-must-die) (2025) – 0.CL, `Expect`-based
- [RFC 9112 §6.3](https://www.rfc-editor.org/rfc/rfc9112.html#name-message-body-length) – the rules for deciding body length
