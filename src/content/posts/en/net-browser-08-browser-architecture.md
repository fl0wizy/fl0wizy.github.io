What decides the extent of loss after compromise is not the protocol but the browser's process layout. Part II – the Browser begins at that layout. The reason a browser uses several processes weighs towards security rather than stability, and the whole design is back-calculated from one sentence. **The renderer will eventually be compromised.**

![The browser process model](/images/net-browser/en/08-browser-process.svg)

---

## 1. What a single process could not carry

Early browsers ran every tab in one process. One tab's crash killing the whole browser, and one tab's heavy script stalling another tab's UI, are inconveniences. There is only one problem of a different kind. If the rendering engine has a single memory vulnerability, the attacker obtains everything that process holds. The contents of every open tab, the cookie store, and every file system access right.

The HTML, CSS, JS, image and font parsers are **a large C++ codebase that receives arbitrary hostile input**. Bringing memory bugs in such code to zero is not a realistic goal.

The Chromium documentation nails this judgement down as a premise. It assumes attackers will find a way to compromise the renderer, and notes that 5–15 high/critical renderer-side bugs have in fact been reported per Chrome release. Rather than eliminating bugs, the design moved **towards reducing what can be obtained when a bug goes off**.

---

## 2. Privilege layout by process

The substance of process separation is the layout of privilege.

| Process | Privilege | What it handles |
|---|---|---|
| Browser (broker) | full user privilege | UI, permission decisions, cookie store, process management |
| Network | restricted | sockets, TLS, attaching cookies, cache |
| GPU | restricted | raster, compositing, touching graphics drivers |
| Utility | heavily restricted | decoding formats such as images and audio |
| **Renderer** | **sandboxed, effectively unprivileged** | HTML parsing, DOM, CSS, JavaScript, layout, paint |

The renderer cannot open files, cannot open sockets, and cannot read cookies directly. It requests everything it needs from the broker over IPC (Mojo in Chromium), and the broker judges whether to approve. **Physically separating the code that parses hostile input from the code that holds privilege** is the point of this layout.

The utility process exists for the same reason. An image decoder is also large code parsing hostile input, so it is split out into a separate process restricted even further than the renderer.

---

## 3. The premise Spectre changed

There is one more fundamental reason why a memory vulnerability inside the renderer demanded a process boundary. The Chromium documentation notes that Spectre-class side channels let arbitrary memory of the renderer process be read "even if Chrome has no bugs."

That fact pulls the security model's level down by one.

```
earlier premise : even inside one process, software distinguishes origins
                  (the same-origin policy is enforced by checks inside the renderer)

after Spectre   : memory inside one process can be read regardless of
                  software checks
                  → a software boundary is no longer a security boundary
                  → the process boundary must be promoted to a security boundary
```

For the same reason browsers lowered the precision of high-resolution timers and came to allow `SharedArrayBuffer` only in documents carrying isolation headers (`COOP`/`COEP`). A case of **a flaw at the hardware layer changing web API design**, and this compensating structure is covered in Part 10 §3.

---

## 4. Site Isolation – the unit of isolation

Having decided to split processes, you have to decide where to draw the boundary. Chromium's choice is the **site**. The documentation's definition:

> "the scheme and registered domain name, including the public suffix, but ignoring subdomains, port, or path"

```
https://foo.example.com:8080  →  site = https://example.com
https://bar.example.com       →  site = https://example.com   (may share a process)
https://other.com             →  site = https://other.com     (must be a different process)
```

It is coarser than the **origin**, the basic unit of the browser security model (the definition of origin is in Part 10 §1). Unlike an origin, a site ignores subdomains and port. That dividing at the finer granularity of origin would be better for security is obvious, and the reason it was not done is compatibility. Old pages that modify `document.domain` to allow access between subdomains remain, and putting them in separate processes breaks their behaviour. Debt of the same kind as the "lenient parsing" seen in Part 1 constrains the design here too.

The scope of isolation is not the tab. **Cross-site iframes within one page also go to a separate process.** A page containing an ad iframe has at least two processes.

At the same time, a mechanism is attached that prevents data from **entering the process at all**. CORB (later ORB) keeps cross-site data from being delivered to the requesting page's process without the server's permission (CORS). The logic being that data not in the process cannot be read however thoroughly that process is compromised.

The cost is stated too. On desktop with many tabs the memory overhead is around 10–13%, and it is not applied on devices with less than 2 GB of memory or in Android WebView. A trade that buys security with memory, which also means it is not applied in environments that cannot afford to buy it.

---

## 5. Where vulnerabilities live in this structure

The process model dictates the shape of attacks. A browser exploit is almost always a **chain**.

**Stage 1 – code execution inside the renderer.** Memory bugs in the JavaScript engine, the HTML/CSS parser or the DOM implementation are used. Type confusion, and violations of JIT optimization assumptions, are the representative kinds. On success, the data of the site that renderer is responsible for becomes accessible.

**Stage 2 – sandbox escape.** Find a point where validation is missing on the IPC boundary with the broker, or use a vulnerability in the kernel or graphics drivers. Only on success does it reach the whole device.

Why the IPC boundary is stage 2's main target is clear. The broker is the side that holds privilege and the renderer is the side assumed hostile. If the broker believes even one argument of a message from the renderer without validation, that spot becomes a passage running straight through the privilege boundary. The assumption "this value came from our renderer, so it will be in normal range" is the typical failure point.

Where vulnerabilities live in this structure folds into two forms. The point where the broker believes an argument from the renderer without validation is archetype C (missing privilege check) in Part 15, and the place where the unit of isolation and the unit of the security model are out of step is archetype A (boundary discrepancy).

---

## What is handed to the next layer

The deficit this layer did not resolve is **inside the renderer**. The process layout decides what a compromised renderer can carry out, but not the stages a byte sequence passes through to become a screen, nor what interposes between those stages. Part 9 opens that inside.

---

### References

- [Site Isolation](https://www.chromium.org/Home/chromium-security/site-isolation/) – Chromium official documentation
- [Mojo](https://chromium.googlesource.com/chromium/src/+/main/mojo/README.md) – Chromium's IPC layer
- [Post-Spectre Web Development](https://www.w3.org/TR/post-spectre-webdev/) – W3C, web design guidance after Spectre
