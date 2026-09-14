The deficit Part 15 handed on is **a record of having deployed the coordinates**. hack-tree, a knowledge platform, began as "a place to organize security and CS concepts so that I can actually use them," and the process of building it became a matter of walking through each instalment of this series once more. **What was a principle before building turned out, once built, to be a one-line choice every time.**

![hack-tree architecture](/images/net-browser/16-hacktree.svg)

---

## 1. What was built

A platform where knowledge nodes across four axes – web hacking, pwn, kernel and CS – are written in markdown and served together with search, a graph, progress tracking and quizzes. The current content scale:

| Axis | Node count |
|---|---|
| Kernel | 175 |
| Pwn | 156 |
| Web | 136 |
| CS | 66 |
| **Total** | **533** |

Separately from the classification tree, the web axis has an **L0–L7 mental model ladder**, compressed into a six-stage course that fixes the learning order. The five archetypes organized in Part 15 are also the design basis of that ladder.

The technology stack:

- **web** – Next.js 15 / React 19 / TypeScript / Tailwind, pnpm as package manager, vitest for tests
- **api** – FastAPI / Uvicorn / SQLAlchemy 2 / Alembic / argon2, Python 3.12, pytest for tests
- **data** – SQLite (a Docker volume), a dedicated backup sidecar container
- **edge** – Caddy (automatic HTTPS, reverse proxy)
- **deployment** – GitHub Actions → GHCR → SSH to a GCP VM, infrastructure as Terraform + cloud-init
- **shell script testing** – bats to verify the compose configuration and the deployment scripts

---

## 2. The decisions actually made at each layer

The instalment behind each decision differs. Each subsection records which line of which configuration file that instalment's principle became.

### Choosing where TLS ends

The only ports open externally are Caddy's `:80` and `:443`, and the web and api containers are exposed only on the internal Docker network. Certificates are issued and renewed automatically through Let's Encrypt.

Part 5 wrote that "TLS ends at the proxy, not the application server," and the real feel of it was that **a single line in a configuration file moves that boundary**. Where `/api/*` is sent in the Caddyfile changes the extent of the plaintext leg. Reading a sentence in documentation and writing that line with my own hands are different kinds of understanding.

The same file attaches the security headers (HSTS, `X-Content-Type-Options`, `Referrer-Policy`) and removes the `Server` header. That Part 10's defences frequently live in edge configuration rather than in application code was also felt here.

### A structure that needs no CORS configuration

The browser calls the API at `https://hack-tree.com/api/...`, and Next.js rewrites that path to the internal `api:8000`. From the browser's point of view it **communicates only with the same origin**, so no CORS configuration exists at all.

The common CORS failures seen in Part 10 mostly come from configuration mistakes: reflecting the request's `Origin`, trusting `null`, or turning on credentials allowance alongside. With no configuration there is no such mistake. **Making a header unnecessary is safer than using it well** is this structure's lesson.

### Files kept outside the serving path

Quiz grading needs an answer key. Put that file in the frontend's static asset directory and anyone who knows the URL can download it. So the answer key sits in a separate, unserved directory and is **copied only when building the api image**. All grading happens on the server and the client receives only the result.

It is the concrete form of what Part 11 wrote: "all code and data running in the browser can be read by the user." Attempts to grade on the client while hiding the answers are all obfuscation, not security.

### Attack surface reduced by removing features

There is no public sign-up. Accounts are created only through invitations issued by an administrator. It was originally a convenience choice on the premise of small-scale use, and as a result a great deal disappeared.

```
one feature removed = several attack surfaces gone
  no sign-up → no account enumeration
             → no email verification bypass
             → no password reset poisoning
             → no need to handle spam and automated registration
```

A good share of Part 12's authentication-flaw list is concentrated in "registration and recovery flows." Not building those flows makes half the list not applicable. It stands as a case that removing a feature is sometimes surer than adding a defence.

Passwords are hashed with argon2, and sessions are cookie sessions with the server holding state. As organized in Part 12, sessions are simpler where immediate invalidation is needed.

### Backups that include verification

Simply copying the SQLite file can mix in a mid-write state. The backup container makes a consistent snapshot with `sqlite3 .backup`, verifies it with `PRAGMA integrity_check`, then rotates, keeping a fixed number. The data volume is **mounted read-only**. Removing, in the first place, any path by which the backup process could touch the original.

---

## 3. The walls actually hit

This taught more than the design written in documentation did.

### Native modules failing to load on alpine

I started from alpine to keep the image small, and the ONNX runtime used for search and an image-processing library failed to load. The cause was the C standard library. Both packages download precompiled binaries built for glibc, and alpine uses musl. The build passed and it failed **at run time**, so finding the cause took a while.

The fix was unifying every build stage onto glibc-based images. A little image size given up, predictability bought. I learned that in a stack with native dependencies the base image is not a matter of taste but a compatibility constraint.

### Where to keep the embedding model file

Semantic search needed a multilingual embedding model. At more than 130 MB the file could not simply go into the repository, and Git LFS ran into bandwidth and capacity limits.

The approach chosen is **a script that downloads from a pinned revision and verifies the sha256**. It checks the hash per file and fails on mismatch. An already-downloaded file whose hash matches is skipped, so re-running is safe. CI caches with the script's hash as the key.

The original purpose was solving a capacity problem, and **supply chain integrity verification** came along as a side effect. The principle organized in Part 14 – "pin by hash rather than a moving tag" – applied here unchanged. The model is baked into the web image and goes to the server, so the server does not need to download it.

### Where the difference between development and production is written

Locally it is convenient to open ports directly, and in production that must not happen. Locally it is HTTP so `Secure` cookies do not work, and in production they must be on. Handling this difference with conditionals in code hides mistakes quietly.

The compose files were split into three: a common definition, an override applied automatically in development, and a file specified explicitly in production. **Because the difference shows in the filename, what is on in which environment is visible.** Shell script tests (bats) verify that each combination produces the intended configuration.

### Making deployments reversible

Images carry two tags, `:latest` and `:<commit hash>`. The deployment script runs with a specific hash injected, so **which commit's code is running is always settled**. If the health check fails after deployment, it rolls back to the previous hash.

Use only a moving tag and there is no way to identify the point to roll back to. The same reason Part 14 said to pin third-party actions by hash, and in this case the operational motive came before the security one.

---

## 4. Knowing by reading and knowing by shipping

What writing this series confirmed is that most of the principles organized in each instalment **are actually present in a few lines of deployment configuration files**.

Until that correspondence was made, each principle was a separate piece of knowledge. Once made, they became one connected structure. **Most of the difference between knowing by reading and knowing by shipping was right here.**

At the same time, what this project could not cover is clear too. With few users it barely met performance or scaling problems, and with a single-file SQLite structure there was no occasion to actually experience the concurrency problems organized in Part 13. Problems that scale creates have to be learned by experiencing scale.

The main line, which started at the physical layer and climbed to deployment, closes with this instalment.

---

## What is handed on next

After this instalment come three deep dives. They are offshoots of the main line: Deep Dive 01 attaches to Part 6, Deep Dive 02 to Part 9, and Deep Dive 03 to Part 13. They unfold, at one instalment's length, the spots each main instalment folded into a line.

The cell the main line left empty (Part 15 §5) is the next shaft. The scope runs from the process by which an engine turns code into an executable form, through the assumptions optimization leans on and what happens when those assumptions break, to building a fuzzer by hand to find those spots automatically. As seen in Part 8, code execution inside the renderer is stage 1 of a browser exploit chain, and the engine is where that stage 1 most often stands.

None of the five archetypes of Part 15 disappears there. Boundary discrepancy reappears between the parser and the optimizer, identity discrepancy in type inference, and side-effect observation in caches and timing. Only the layer descends; the shapes are the same.

---

### References

- [Caddy: Automatic HTTPS](https://caddyserver.com/docs/automatic-https)
- [Next.js: Rewrites](https://nextjs.org/docs/app/api-reference/config/next-config-js/rewrites) – same-origin proxying
- [SQLite: Backup API](https://www.sqlite.org/backup.html) – consistent snapshots
