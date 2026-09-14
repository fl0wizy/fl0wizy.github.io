The deficit Part 9 named and handed on is the boundary between origins. This instalment erects that boundary as a unit called the origin, and guards it with headers and cookie attributes laid on top. This layer is not a design deduced from one consistent principle but **strata added one at a time, incident by incident**.

![Origins and the strata of defence](/images/net-browser/en/10-origin.svg)

---

## 1. Origin – a security unit split three ways

An origin is the combination of **scheme + host + port**. Differ in any one of the three and it is a different origin.

```
baseline: https://example.com/app

https://example.com/other      same origin
http://example.com             different – scheme
https://api.example.com        different – host
https://example.com:8443       different – port
```

The problem is that **cookies do not use this criterion**. As seen in Part 6, cookies are a mechanism bolted onto HTTP later; they judge whether to be sent by domain and path, and ignore port. `https://example.com` and `http://example.com` are different origins but share the same cookies by default. The basic unit of the browser security model is split in two, and that misalignment is the starting point of many of the problems appearing in this instalment.

Add the "site" of Site Isolation seen in Part 8 and there are three criteria. Origin (scheme+host+port), site (scheme+registrable domain), and the cookie's domain+path each point at a different scope. Without checking which criterion a given defence operates on, you will place the actual boundary wrongly.

---

## 2. The same-origin policy – reads forbidden, sends allowed

The core of the same-origin policy (SOP) is an asymmetry.

**What it blocks – reads**
- accessing another origin document's DOM
- reading the response body of a request sent to another origin
- reading another origin's cookies from script

**What it does not block – sends and embedding**
- sending requests to another origin with `<img src>`, `<script src>`, `<link>`, `<form>`
- **that site's cookies being attached** to those requests
- putting another origin's page in an `iframe`

Even when the response cannot be read, **the request has already reached the server and been processed**. On a server where a funds transfer completes with a single form submission, a form hidden in an attacker's page can send that request together with the victim's cookies. This is CSRF, and **it is a direct consequence of SOP's design, not an implementation mistake**. Sends could not be blocked because the web was designed from the start as a medium where "you can fetch and use another site's images."

Paths that learn without reading sit in the same gap. That is the XS-Leaks class, which infers another origin's state from whether an image loaded, from frame counts and from response time differences.

---

## 3. Defences added one incident at a time

### CORS – the mechanism that lifts the read ban

If SOP blocks reading responses, legitimate cross-origin API calls are blocked too. CORS lifts this **by having the server express permission**. The browser announces the request's origin with the `Origin` header and the server answers whether it is allowed with `Access-Control-Allow-Origin`. Requests that may have side effects (custom headers, `PUT`/`DELETE` and so on) ask permission first with an `OPTIONS` preflight.

That the judging party is the server creates the failure point. There are two typical mistakes.

```http
# reflecting the request's Origin as-is + allowing credentials
Access-Control-Allow-Origin: https://attacker.example
Access-Control-Allow-Credentials: true
```

This combination is effectively the same as granting every site the right to read authenticated responses. A configuration that trusts the `null` origin is the same. Origins become `null` in sandboxed iframes and some redirect situations, so an attacker can produce that state.

### CSP – on the premise that XSS will not go away

CSP's premise differs. It does not prevent XSS; it **reduces what can be done when XSS succeeds.** It restricts the origins of executable scripts, blocks inline scripts by default, and allows only those carrying a nonce or hash.

Bypasses are usually achieved **within the allow list**, without breaking CSP itself.

- If an allowed domain has a JSONP endpoint, arbitrary code can be executed through the callback parameter.
- If a popular library on an allowed CDN has a gadget (a path that evaluates a string as code), that is used.
- If `base-uri` is not specified, an attacker can change the origin of relative-path scripts with a `<base>` tag.

This is why `strict-dynamic` and nonce-based policies are recommended. Expressing trust as a list of domains means trusting those domains entirely, while a nonce expresses trust per individual script.

### frame-ancestors – clickjacking

Overlay a transparent iframe at the position the user clicks and the user presses something other than what they believe they are pressing. `X-Frame-Options` came first; today CSP's `frame-ancestors` does the same job more precisely.

### Cookie attributes – belated correction

The attribute list is the trace of filling in, one at a time, the fact that cookies are not origin-based.

| Attribute | The problem it answers |
|---|---|
| `Secure` | cookies leaking over plaintext HTTP |
| `HttpOnly` | script reading cookies via XSS |
| `SameSite` | cookies attaching to requests that departed from another site (CSRF) |
| `__Host-` prefix | a subdomain overwriting a parent domain's cookie |

With `SameSite=Lax` becoming the default in most browsers, CSRF's baseline difficulty rose considerably. But `Lax` **does attach cookies to top-level navigation GET requests.** If state-changing actions are open over GET, it still holds. This is why it is dangerous to strip CSRF tokens out on the grounds that a default now exists.

### COOP · COEP · CORP – after Spectre

The premise that memory boundaries collapse inside a process was set in Part 8 §3. What is new in this instalment is the headers that make the document side shoulder that premise, and they are **declarations of not putting another origin's resources in the same process or the same browsing context group**.

There is a reward attached to this declaration. Features such as high-precision timers and `SharedArrayBuffer` open only in documents that have declared isolation. A structure that says prove isolation first if you want to use powerful features – a design case of tying feature provision to a security requirement.

---

## 4. Partitioning the state of cache and storage

As long as the same browser is used, cache and storage can be shared between sites, and that sharing becomes an information-leak path. Learning from load time which resources are in the cache allows inferring where the user has been. In response, browsers included **"within which site it is used"** in the keys for cache and storage. The same image becomes a different cache entry when the top-level site differs.

---

## 5. A timeline of third-party cookie deprecation being called off

On the cookie side, a plan was reversed once. The timeline:

| When | What |
|---|---|
| January 2020 | Chrome announces a plan to phase out third-party cookies |
| 22 July 2024 | changes direction, deciding not to deprecate |
| 22 April 2025 | decides not to add a separate user-choice prompt either |
| 17 October 2025 | many Privacy Sandbox technologies retired, low adoption given as the reason |

One of the survivors is **CHIPS**, storing third-party cookies partitioned per top-level site. It settled towards partitioning cookies rather than removing them. Safari, Firefox and Brave still block third-party cookies, so **a stretch in which the default state differs per browser** will continue for some time.

It is worth reading as a case that changes in the web platform are not decided by technical merit alone. It is the result of the advertising ecosystem's dependence and regulators' scrutiny acting together, and Part 1's structure – that standards bodies hold no enforcement power – operates here too.

---

## 6. Where vulnerabilities live at this layer

**This layer's defences are not deduced from one principle but strata piled up one response per incident, and vulnerabilities live in the gaps between those strata.**

```
the asymmetry of blocking reads and leaving sends open → CSRF, and SameSite as a belated correction
three criteria split across origin, site and cookie     → the boundary a defence grasps differs from the real one
CORS leaving the permission judgement to the server     → Origin-reflecting configurations, trusting the null origin
CSP expressing trust at domain granularity              → JSONP and gadget bypasses within the allow list
state and screen shared across sites                    → browsing history leaking through load time, clicks intercepted by an overlaid iframe
```

Places where permission was expressed wrongly, such as CORS misconfiguration, sit at archetype C (missing privilege check) in Part 15; the place where the criteria split three ways, and the CSRF that stands on it, sit at archetype B (identity discrepancy).

---

## What is handed to the next part

### Part II summary

The three browser instalments bundled into one:

```
Part 08  software checks are not enough → promote the process boundary to a security boundary
Part 09  documents are interpreted several times, and the side effects are observed
Part 10  reads are blocked but sends are open, and the criteria are split three ways
```

These three sentences are the coordinates for most of the client-side vulnerability list. When meeting an individual item – prototype pollution, DOM clobbering, unvalidated `postMessage` origins, service worker abuse – grasping which sentence it belongs to first makes organizing it faster.

The boundary a browser draws is drawn only after the document arrives. Who made that HTML and where is something the origin criterion does not ask, and that is the deficit this part leaves unresolved.

The next part begins at Part 11 – Part III, the Application. The frontend, the first layer on the making side, takes on that deficit.

---

### References

- [Same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) – MDN
- [Content Security Policy Level 3](https://www.w3.org/TR/CSP3/) – W3C
- [Google ends third-party cookie phaseout plans](https://iapp.org/news/a/google-ends-third-party-cookie-phaseout-plans) – IAPP
