This instalment opens **behind the API**, which Part 11 named and handed on, through concurrency models and authorization specifications. How requests are divided and where the login state is kept is the skeleton of that structure. **The structure a server picks brings performance characteristics and a vulnerability class as one bundle.**

![Backend structure](/images/net-browser/12-backend.svg)

---

## 1. Three ways of dividing concurrent requests

### Processes (prefork)

A separate process handles each request. Because memory spaces are separated, one request's crash or memory corruption does not reach another request. The price is the memory cost per process, and the ceiling on concurrent handling is low.

The trap is **keeping state in process memory**. Because each request may be assigned to a different process, a value put into an in-memory cache may not be there on the next request. A common source of bugs that work fine locally, where there is one process, and then fail intermittently after deployment.

### Thread pools

Threads within the same process divide the requests between them. Because memory is shared it is light and carries more concurrent requests. Because it is shared, it becomes **a stage for race conditions**.

Place a global cache, a counter or a request context wrongly and data gets mixed between requests. The form that recurs in real incidents is storing user information in a thread-global variable or a singleton, and the next request reading that value as-is and **responding with another user's data**. The single-packet attack seen in Part 3 targets exactly this kind of shared state.

### Event loop (single-threaded async)

Most of a web request's time is not computation but waiting. Waiting for the database, for an external API, for a file. The event loop model does not hold a thread while waiting, and handles other requests instead. However much the connection count grows, memory does not grow in proportion.

The price is clear. **One piece of code that uses the CPU for a long time stops everything.** When image processing, large JSON serialization or cryptographic computation blocks the loop, every request waits meanwhile. The most common mistake in practice is calling a synchronous library inside an asynchronous framework. The code works, but the model's advantage is lost entirely.

The difference between the three models is stamped into the interface specifications frameworks stand on, too. WSGI (a synchronous interface) and ASGI (asynchronous + WebSocket support) split in the Python ecosystem because of this difference. For a server to handle long-lived connections, an interface that ends with one request-response cannot express it.

---

## 2. What API styles were trying to solve

### REST

Identify resources by URL, express actions with HTTP methods, report results with status codes. The point is **using the semantics HTTP already has rather than rebuilding them**. Caching, conditional requests and idempotency come along for free.

The limit is that the response shape is fixed on the server. When different screens need different fields, you either receive data you do not need (overfetching) or have to call several times (underfetching).

### GraphQL

The client specifies the fields it needs as a query. Overfetching and underfetching disappear and screen changes become possible without a server deployment.

The price is **the server losing the ability to predict response cost**.

- One query that increases nesting depth or expands a list recursively creates enormous database load. Depth limits and complexity budgets are the basic defence.
- Aliases allow the same field to be included hundreds of times in one request, neutralizing rate limits based on request count.
- Authorization becomes necessary **at field granularity**. The point teams accustomed to endpoint-level permission checks miss most often.
- If introspection is on, the whole schema is public.

### gRPC

Define the schema first and generate code, serialize in binary, and support streaming over HTTP/2. It gains performance and type safety in service-to-service communication. That it cannot be called directly from a browser is a constraint (a proxy layer is needed), and leaving reflection open exposes the internal service structure as-is.

---

## 3. Where the login state is kept

| | Sessions | Tokens (JWT) |
|---|---|---|
| Where it is stored | server-side store | in the token itself |
| Server state | yes | none |
| Immediate invalidation | possible | difficult |
| Content exposure | no | anyone can decode |
| Scaling | needs a shared store | no coordination between servers |

One recurring misunderstanding about JWT is worth settling first. **A signature does not hide the content.** The payload is merely Base64URL-encoded and anyone can decode it. Put a sensitive value in and it is exposed as-is.

The failures that recur on the verification side are of a fixed set of kinds.

- Library configurations that accept `alg: none` – signature verification itself is skipped.
- Confusion between RS256 and HS256 – use the public key as an HMAC key and anyone can make a valid signature with a public value.
- Implementations that trust the `kid`, `jku` or `x5u` headers and fetch the verification key **from the location the token dictates**. If a token can choose its own verification key, it is not verification.
- Not checking expiry (`exp`), not checking issuer (`iss`) or audience (`aud`).

They have one thing in common: **letting a value inside the token decide the verification procedure itself.** Verification parameters have to be fixed by the server.

The practical solution to the invalidation problem is usually a hybrid. Keep the access token's lifetime short and manage refresh tokens as server state. A compromise that takes "statelessness" only for the access token stretch.

---

## 4. The division of roles between OAuth 2.0 and OIDC

This is where the axis moves from where the token is kept to who issues it.

The two names are frequently mixed up, and their roles differ.

- **OAuth 2.0 is authorization.** It expresses the delegation "this application may access my resources." It does not specify who the user is.
- **OIDC is authentication.** It puts an ID token on top of OAuth to standardize "who this user is."

Using OAuth for login while trying to identify the user from the access token alone creates problems. Because an access token says only "what privileges this token has" and does not give "who it was issued to" in a verifiable form.

---

## 5. How recommendations get promoted to requirements

The direction of revision work shows this area's character well. **OAuth 2.1** is still at IETF draft stage as of 2026, and every agreed change is of the form "promoting what was optional to required."

| Change | Background |
|---|---|
| PKCE required | authorization code interception attacks |
| Exact match on redirect URI | code interception using partial-match rules |
| Refresh token rotation required | long-term use of stolen refresh tokens |
| Implicit grant removed | tokens exposed in the URL fragment |
| Password grant removed | a structure that hands the password directly to third-party apps |
| Bearer tokens in query strings forbidden | they stay in logs, referrers and browser history |

Separately, [RFC 9700](https://datatracker.ietf.org/doc/rfc9700/) documents security best current practice for OAuth 2.0. What to read here is not the individual items but the structure. **Items a specification writes down as "recommended" are not kept in the field.** So the revision writes the same content again as "must." The property of the web seen in Part 1 – having no central authority to enforce – operates here in the same way.

---

## 6. Where vulnerabilities live at this layer

**What this layer judges is not a single request but the relationship between request, user and object, and the flaws live where that relationship was not checked.**

- **BOLA / IDOR** – the flaw of not checking whether the requested object really belongs to this user. The most common number-one item in API security, and the reason is that authentication (whether logged in) is handled once in middleware while **authorization (permission on this object) has to be written per handler**. Missing it in one place is enough.
- **Mass assignment** – binding the request body wholesale onto an object lets fields such as `role` in too. Fixing input fields with an allow list is the defence.
- **Race conditions** – the shape where another request wedges in between checking a balance and deducting it. The attacking side's tool is the single-packet attack of Part 3 §6, and what it narrows is precisely this window. Database-level locking or atomic operations are needed, which connects directly to Part 13's transaction isolation levels.
- **SSRF** – occurs when a server sends a request to a URL from user input. The point where the private address ranges seen in Part 2 and the DNS resolution of Part 4 combine.
- **Deserialization** – arbitrary code executes in the course of restoring untrusted serialized data into objects. The more the serialization format is a language that can express object construction and method calls, the more dangerous it is.

BOLA and mass assignment sit squarely at archetype C (missing privilege check) in Part 15.

---

## What is handed to the next layer

The deficit this layer did not resolve is the window that opens between a read and a write, and the authority to close that window lies not with the app but with the layer where the data actually sits. Part 13 takes on that layer.

---

### References

- [OWASP API Security Top 10](https://owasp.org/API-Security/editions/2023/en/0x11-t10/) – why BOLA is number one
- [RFC 9700: Best Current Practice for OAuth 2.0 Security](https://datatracker.ietf.org/doc/rfc9700/)
- [OAuth 2.1](https://oauth.net/2.1/) – summary of changes
