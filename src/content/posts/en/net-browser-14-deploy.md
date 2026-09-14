The deficit Part 13 handed on is **the boundary of the execution environment**. This instalment opens that boundary along two paths: the path by which a user request reaches the app, and the path by which code reaches the server. **The former is usually reviewed well and the latter often forgotten, while the size of the privilege runs the other way.**

![The deployment path](/images/net-browser/en/14-deploy.svg)

---

## 1. The request path and the trust boundaries along it

| Leg | What it does | The problem this leg creates |
|---|---|---|
| browser → CDN | TLS termination, edge cache | if an input absent from the cache key affects the response, it gets poisoned (Part 6) |
| CDN → load balancer | distribution, health checks | one backend configured differently becomes an intermittent vulnerability |
| LB → reverse proxy | path routing, header manipulation | differences in path normalization bypass access control |
| proxy → app | HTTP/1.1 rewriting | this is the cell where request smuggling lives (Part 6) |
| app → DB | private network | the premise that the inside is weakly authenticated creates SSRF's value (Parts 2 and 4) |

This table is an overview of the whole path. The two subsections below unfold the two points where boundaries most often come apart.

### The point where encryption ends

What Part 5 pointed out takes concrete form here. In real deployments TLS ends not at the application server but at a CDN or reverse proxy. The leg after it is plaintext, or a separate internal TLS. Which is to say, **a party that can read and edit the plaintext exists in the middle of the path.** The statement "we use HTTPS, so it is safe" precisely means "the stretch between browser and edge is safe."

### The point where the client IP becomes a value written in a header

The source address the application server sees on the socket is the last proxy's (Part 2). The real client address is conveyed in a header.

```http
X-Forwarded-For: 1.2.3.4, 10.0.0.9, 10.0.0.3
```

It is a list to which each proxy appended the source it saw. The problem is that **clients can send this header too**. If the proxy does not strip the incoming `X-Forwarded-For`, an attacker fills the front of the list at will.

```
read the front of the list   → read the value the attacker forged
read the back of the list    → always the last proxy's IP
read Nth from the back       → N has to match the infrastructure exactly
```

The correct answer is "state the number of trusted proxy hops in configuration and count that many from the back." Adding one proxy means changing this setting too. IP-based rate limiting, access restriction and audit logs all stand on this value, so getting it wrong gets all three wrong. The side that reads this value and judges is Part 12's app.

---

## 2. What containers actually isolate

A container is not a virtual machine. It is a combination of three kernel features.

- **Namespaces** – what it sees. Process list, network interfaces, mount points and hostname are given as separated views.
- **cgroups** – how much it uses. Upper bounds on CPU and memory usage.
- **Capabilities and seccomp** – what it can do. Restrictions on privileged operations and permitted system calls.

**The kernel is shared with the host.** That single line is decisive for security. A virtual machine has its own guest kernel, so escaping means breaking the hypervisor; a container uses the same kernel, so **one kernel vulnerability is itself an escape path**. It is why container escape research effectively overlaps with kernel exploit research.

The settings that lower the bar in practice are a fixed set. Privileged mode, mounting the host's Docker socket, running as root inside the container, keeping unnecessary capabilities, sharing the host network namespace. Of these, mounting the Docker socket is effectively the same as handing over host privileges outright. Because anyone who can reach that socket can start a new privileged container.

---

## 3. The surface orchestration adds

The party that decides one container's isolation is the kernel, but the party that decides the placement and connection of hundreds is the scheduler above it. An orchestrator such as Kubernetes creates a single control point called the API server. The source of the convenience, and the concentration point of the target.

- **Without network policies, pods sit on a flat network.** At defaults any pod can reach any other. Breach one web frontend and every internal service is in range. The premises of Parts 2 and 4 present their bill here.
- **Default secrets are encoding, not encryption.** Without separately attaching storage encryption or an external secret manager, they sit in etcd effectively in plaintext.
- **Service account tokens are mounted inside pods.** Which means an attacker who compromises the application can query the API server straight away. With loose RBAC, that expands from there to the whole cluster.

---

## 4. Observability – the exposure surface collection creates

Logs, metrics and traces are indispensable for incident investigation. At the same time they are themselves a leak path. Authorization headers, session cookies and personal data in request bodies commonly end up in logs as-is, and log collection systems usually have **more people with access** than the application database does. Masking has to happen at the collection point; erasing after storage is too late.

Conversely, without audit logs an incident cannot be reconstructed. The premise of Certificate Transparency seen in Part 5 applies here unchanged. **When prevention cannot be complete, spend the budget on making sure what happened comes to light.**

---

## 5. The path by which code reaches the server

Everything up to §3 is the path by which a user request reaches the app. The other one is the path by which code reaches the server. What an application vulnerability grants is usually **user-level privilege**. What a pipeline vulnerability grants is **deployment privilege**. The latter means being able to put arbitrary code into production, so it is always larger.

The recurring failure types are a fixed list.

**An external PR triggers a workflow that has access to secrets.** A configuration in which code from a forked PR runs before review and deployment credentials are exposed to that execution environment. Editing one line of the build script to send the secrets outward is all it takes. Separating jobs that run untrusted code from jobs that use secrets is the basic defence.

**Third-party actions and base images are referenced by moving tags.** `@v3` and `:latest` are names, and what those names point at can change at any time. If upstream is compromised, malicious code quietly arrives from the next build onward. Pinning by commit hash or image digest is what actually uses the same thing.

**Internal package names are claimed on a public registry.** If the package manager is configured to look at both the private and the public registry and the public-side version is higher, the attacker's package is fetched under the internal name. The shape called dependency confusion.

**IaC state files are left lying around with secrets in them.** The state file is the blueprint of the entire infrastructure, and values such as database passwords go into resource attributes in plaintext. Put it in storage with no access control and that is itself a top-level leak.

---

## 6. Where vulnerabilities live at this layer

**At this layer one line of configuration decides where the trust boundary sits.**

```
not stripping incoming XFF                     → the client decides its own IP
trusted hop count out of step with the real setup → rate limiting, access restriction and audit logs all wrong together
a kernel shared with the host                  → one kernel vulnerability is itself an escape path
a default that does not block pod-to-pod       → compromising one app becomes cluster privilege
deployment credentials held by the pipeline    → arbitrary code goes into production
a collection point with no masking             → logs open wider than the app database
```

The point where a header becomes fact is organized in Part 15 as archetype B – identity discrepancy; the privilege the deployment path holds, as archetype C – missing privilege check.

---

## What is handed to the next part

### Part III summary

```
Part 11  a boundary newly stands where code splits across server and client
Part 12  the concurrency model and the location of state decide the kinds of vulnerability
Part 13  separating syntax from data, and the time between read and write
Part 14  the point where a header becomes fact, and the deployment path as a second entrance
```

The four instalments each named and gathered their own layer's vulnerabilities, but those lists remain as debt scattered by layer. Part IV – Map and Record gathers that debt into one coordinate system. Part 15 merges Parts 1 to 14 into a single map and lays the whole web-hacking tree onto those coordinates, and Part 16 records what was actually built on that map.

---

### References

- [OWASP Top 10 CI/CD Security Risks](https://owasp.org/www-project-top-10-ci-cd-security-risks/)
- [Kubernetes: Security Concepts](https://kubernetes.io/docs/concepts/security/) – RBAC, network policies, secrets
- [Forwarded HTTP Extension (RFC 7239)](https://www.rfc-editor.org/rfc/rfc7239.html) – the standardized forwarding header
