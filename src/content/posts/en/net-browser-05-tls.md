Part 4 turned a name into an address and handed it on without verifying the identity of whoever stands at the end of that address. The layer that takes on that verification is TLS, and the basis for the verification is not cryptography but a list of parties permitted to issue certificates. **Of the three problems TLS solves, confidentiality and integrity close mathematically, while identity verification alone remains a problem of arrangement: whom shall we believe.**

![The TLS handshake and the chain of trust](/images/net-browser/05-tls.svg)

---

## 1. The three problems TLS solves

| Problem | Tool | Difficulty |
|---|---|---|
| Confidentiality – nobody along the path can read the contents | symmetric ciphers (AES-GCM, ChaCha20-Poly1305) | a solved problem |
| Integrity – changes to the contents are noticed | the authentication tag of an AEAD | a solved problem |
| Identity – whether the other side really is that server | certificates and the CA chain | **structurally unsolved** |

The first two are mathematics. Use the algorithms correctly and they hold. The third is not mathematics but a problem of social arrangement – **whom shall we believe** – and there is no complete answer to it. Which is why half of this instalment's length goes to the third.

---

## 2. The path of cutting round trips

The version history of TLS is, in large part, **a history of cutting RTTs**. As seen in Part 3, 1 RTT is already spent on the TCP handshake alone, so if TLS spends 2 more that is 3 RTTs before the first byte. On a path with 100 ms of latency, 0.3 seconds disappears before anything is done.

**TLS 1.2** spends 2 RTTs. The client sends a list of what it supports, the server picks one of them, and the client sends key exchange material matching that choice. The order – negotiate, then execute – forces the round trips.

**TLS 1.3** reverses that order. The client sends `ClientHello` **with key exchange material already in it**. It guesses which curve the server will choose and puts it out first. If the guess is right the server can answer immediately and it finishes in 1 RTT. If it is wrong, the server asks again with `HelloRetryRequest` and one more RTT is spent. Which is to say, **shortening the round trip is a statistical bet that "it is usually right."** It holds in practice because defaults such as X25519 are almost always right.

TLS 1.3 simultaneously cut away a great many options. RSA key exchange, CBC mode, static Diffie-Hellman, compression and renegotiation were all removed. The logic of removal is consistent. **The more negotiable options there are, the wider the surface for downgrade attacks.** Leaving a weak option in lets an attacker steer things that way, so it is erased from the list entirely. Removing RSA key exchange enforces forward secrecy as a side effect. Even if the server's private key leaks later, past traffic is not decrypted.

---

## 3. What 0-RTT gave up

On reconnection it can be cut further. 0-RTT is encrypting and sending the first request **immediately** with a pre-shared key (PSK) obtained in a previous session. Data departs with no round trip.

[RFC 8446](https://www.rfc-editor.org/rfc/rfc8446.html) §2.3 states two ways in which this data is weaker than other TLS data.

> "This data is not forward secret, as it is encrypted solely under keys derived using the offered PSK."

> "There are no guarantees of non-replay between connections. Protection against replay for ordinary TLS 1.3 1-RTT data is provided via the server's Random value, but 0-RTT data does not depend on the ServerHello and therefore has weaker guarantees."

The second is the more dangerous in practice. Ordinary TLS data is bound to a random value the server makes fresh each time, and so cannot be replayed. 0-RTT data is made before seeing that random value, and therefore does not receive that protection. If an attacker along the path copies the 0-RTT data as-is and sends it several times, the server may process it several times.

0-RTT is therefore used **only for idempotent requests**. Fetching a static resource with `GET` gives the same result executed twice. Flow a payment request or a state change through 0-RTT, on the other hand, and one replay is a duplicate execution outright. It is a shape in which one performance-optimization option spreads into a correctness problem for the application, and this property is inherited as-is when QUIC uses 0-RTT in Part 7.

---

## 4. The structural weakness of the chain of trust

Key exchange entangles with the identity problem. Diffie-Hellman can create a shared secret on a channel with an eavesdropper present, but **it does not tell you who the other party is.** A man in the middle doing a key exchange with each side leaves both feeling normal. So a signature is attached to the key exchange parameters, and a layer is needed that guarantees with a certificate that the signing key really belongs to that domain.

Browsers and operating systems ship with hundreds of root CA certificates built in. The procedure for judging a server certificate valid is checking that the signatures chain up to one of these roots.

There is a structural problem here. **Any CA in the trust list can issue a certificate for any domain.** Any CA from any country that happens to sit in the browser a Korean user runs can make a `google.com` certificate, and the certificate so made is technically entirely valid. The security of the whole system equals the security of the single flimsiest entry on the list.

In 2011 this scenario actually played out.

DigiNotar, a CA in the Netherlands, was compromised in July, and at least **531** forged certificates were issued. On 28 August, a `google.com` wildcard certificate among them was used in a man-in-the-middle attack targeting users in Iran. Around 300,000 Gmail accounts were understood to have been affected. Browser vendors removed the DigiNotar root in concert, and the company went bankrupt on 20 September.

What deserves attention is **the path of detection**. This attack was not exposed because the cryptography broke. The clue was a user in Iran posting a warning that had appeared in Chrome to a Google forum. It was caught because Chrome was pinning certificates for its own domains, and had it been another, unpinned domain nobody would have known.

### The response: from prevention to detection

Started around Google's Ben Laurie right after this incident and submitted to the IETF in 2012, **Certificate Transparency** is what came of it. Its premise differs from what came before.

```
the earlier premise : prevent misissuance → audit CAs more strictly → it failed
CT's premise        : misissuance happens → make sure it always comes to light
```

Every certificate is recorded into an append-only public log, and the log proves cryptographically that what was recorded has not been changed since. Browsers reject certificates that lack proof of registration in a log (an SCT). As a result, a domain owner **can watch every certificate issued in their own name directly.** A secretly issued certificate is found in the log before it is used.

This shift is a pattern that is repeatedly useful in security design: when the control that prevents an incident is incomplete in principle, move the budget towards making the incident **observable**.

---

## 5. SNI – the destination encryption did not cover

Here the axis shifts once, from trust and identity to the metadata a connection leaks.

In a situation where hosting many sites on one IP is ordinary, the server has to know **whose certificate to present** at the moment the TLS handshake begins. For this, the client puts the domain name it wants to reach into `ClientHello`. This is SNI (Server Name Indication).

`ClientHello` is sent before encryption. Which means **even on an HTTPS connection, which domain you are reaching is visible in plaintext along the path.** The contents are protected while the destination is not. This property is also the actual operating basis of nation-scale censorship and corporate network filtering.

**ECH (Encrypted Client Hello)** covers this hole. It encrypts `ClientHello` itself with the server's public key, hiding the SNI and the ALPN list. It was standardized in 2026 as [RFC 9849](https://www.rfc-editor.org/rfc/rfc9849.html). There is a precondition for it to work. The client has to know the public key used for the encryption **before connecting**, and the delivery path for that is the HTTPS/SVCB DNS record seen in Part 4. So for ECH to come on, the DNS-side configuration has to stand first, and where that condition is not met the client quietly falls back to plaintext SNI.

---

## 6. Where vulnerabilities live at this layer

**What this layer judges is identity, and everything not used in that judgement leaks out.**

- **Missing verification rather than the cryptography itself** – browsers verify certificates strictly, but settings that turn verification off are common in server-to-server communication and in mobile apps' HTTP clients. The typical shape is turning it off during development because of a self-signed certificate and shipping it that way. In that case TLS only encrypts and does not verify identity.
- **Downgrade** – if a client keeps supporting old versions, an attacker can steer the negotiation that way.
- **Padding oracle** – in CBC mode at TLS 1.2 and below, if the reason decryption failed (padding error or MAC error) is distinguishable by response time or message, ciphertext can be decrypted one byte at a time. This technique has left TLS and is still reproduced at application-level encryption (encrypted cookies, tokens).
- **0-RTT replay** – the replayability of §3 is not closed by the specification. Because the judgement of which requests to send by this path is itself the defence, the location of the defence moves outside the protocol.
- **Where TLS terminates** – the most frequently overlooked item. In real deployments TLS ends not at the application server but at a CDN or reverse proxy. Past that point it is plaintext, or a separate internal TLS. Which is to say, **a party that can see and edit the plaintext exists in the middle of the path.**

This list folds into two forms. One is that the claim binding a name to a key is verified with different degrees of strictness by different parties; the other is that decryption failure and whether processing happened leak out through timing and responses. The former is archetype B, identity discrepancy, in Part 15; the latter is archetype D, side-effect observation.

---

## What is handed to the next layer

This layer carries bytes safely, but it does not decide where those bytes break into one message. On top of that, a party that reads and rewrites plaintext remains behind the point where TLS ends. Message boundaries, and the relays that interpret them twice: Part 6 takes on both.

---

### References

- [RFC 8446: TLS 1.3](https://www.rfc-editor.org/rfc/rfc8446.html) – the limits of 0-RTT are §2.3
- [RFC 9849: TLS Encrypted Client Hello](https://www.rfc-editor.org/rfc/rfc9849.html)
- [Certificate Transparency](https://cacm.acm.org/practice/certificate-transparency/) – Communications of the ACM
