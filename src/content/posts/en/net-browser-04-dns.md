Part 3's TCP could only open a connection once it had an address, and it left unanswered where that address comes from. What this instalment puts in that place is a distributed database split by delegation and caching: DNS. **The correspondence between a name and an address is not a fixed fact but an answer with a lifetime attached.**

![The DNS resolution path and rebinding](/images/net-browser/en/04-dns.svg)

---

## 1. How HOSTS.TXT collapsed

On the early ARPANET the correspondence between names and addresses was a single file. The NIC (Network Information Center) maintained `HOSTS.TXT`, and every host periodically downloaded that file whole. It works when there are a few hundred hosts.

[RFC 1034](https://www.rfc-editor.org/rfc/rfc1034.html) records the reason this method collapsed in a precise sentence.

> "The total network bandwidth consumed in distributing a new version by this scheme is proportional to the square of the number of hosts in the network."

The reason it is **the square** is that two terms grow at once. As hosts increase the file grows (proportional to N), and the number of parties that have to receive that file also increases (proportional to N). A file N times larger is received by N times more hosts, so the total cost is N squared. With an "explosive growth" in host counts foreseen, that slope had a fixed ending.

Nor was it only a scale problem. An organization wanting to change its own name had to "wait until the NIC fixed `HOSTS.TXT`." An administrative bottleneck rather than a technical one, and exactly the same problem as the web's design requirement seen in Part 1 ("without central control").

DNS's design goals were therefore set out like this.

| Goal | How RFC 1034 puts it | The implemented form |
|---|---|---|
| A consistent name space | "a consistent name space which will be used for referring to resources" | hierarchical domains separated by dots |
| Distributed maintenance | "maintained in a distributed manner, with local caching" | delegation + resolver caches |
| Extensibility | "host addresses, mailbox data, and other as yet undetermined information" | record types (A, MX, TXT, SVCB …) |
| Transport independence | "independent of the communications system that carries them" | over UDP, TCP, DoT, DoH alike |

---

## 2. Delegation as a mechanism

The way DNS removed the central file is, instead of replicating the data, **splitting responsibility**. The root servers do not know the address of `example.com`. What they know is the single fact that "the answers for `.com` are known by those name servers."

```
browser (stub) ─recursive query→ recursive resolver
                                   │  ┌─query→ root   → "com is over there"
                                   ├──┼─query→ .com   → "example is over there"
                                   │  └─query→ ns.example.com → A 203.0.113.10
                                   └─answer (A + TTL)→ browser
```

The browser throws one **recursive query** and receives the final answer. The resolver throws **iterative queries** several times, descending the delegation chain. This division of labour matters because **the cache exists only at the resolver**. The root and the TLDs do not have to bear the world's every query precisely because resolvers answer most of them from cache.

The record types met most often in practice, and why each type had to exist separately, are as follows.

- **A / AAAA** – from a name to an IPv4 / IPv6 address.
- **CNAME** – from a name to another name. This is what CDNs and SaaS providers use when they say "point at us," and the subdomain takeover that appears later occurs in exactly this record.
- **NS** – the record that expresses delegation itself. A declaration that the answers below this domain are held by this name server.
- **MX / TXT** – mail routing and arbitrary strings. Mail authentication such as SPF, DKIM and DMARC is all stacked on TXT. A case of a field with no original purpose becoming authentication infrastructure.
- **SVCB / HTTPS** – a comparatively recent addition that announces in advance the information needed before connecting (supported protocols, alternative ports, ECH configuration). This record has to be present for Part 5's ECH to work.

---

## 3. TTL – the tradeoff between freshness and load

Every record carries a TTL (Time To Live). It is the value by which the authoritative server specifies how many seconds a resolver may cache this answer.

```
long TTL (e.g. 86400)            short TTL (e.g. 30)
────────────────────────────────────────────────────
queries ↓ · upstream load ↓      queries ↑ · load ↑
cache holds through an outage    an outage propagates immediately
server replacement lands slowly  server replacement lands immediately
                                 an attacker can also change answers often
```

CDNs and load balancers set TTLs short because of the second-to-last line. Moving traffic to another region immediately requires that old answers not live long. And yet the same property becomes the premise of the last line, DNS rebinding. The property "answers can be changed often" carries no record of the owner's intent.

---

## 4. Attacks aimed at name resolution

### Cache poisoning

Making a resolver cache a fake answer sends every user of that resolver to the attacker's address. Classical DNS identified responses over UDP by a 16-bit query ID alone, so an attacker firing enough forged responses that arrive before the real one could hit it. When Dan Kaminsky published a way to raise this attack's success rate to a practical level in 2008, comprehensive mitigations followed.

The response went in the direction of **increasing the number of bits that must be guessed**. Source port randomization (16 more bits), and 0x20 encoding, which mixes the case of the query name at random and checks that it comes back unchanged in the response. DNSSEC, the fundamental fix, attaches signatures to responses, but its adoption is still low because of deployment complexity.

### Subdomain takeover

Picture `blog.example.com` pointing by CNAME at some SaaS, where the resource on the SaaS side has been cancelled and only the DNS record remains. If an attacker claims the same name again on that SaaS, `blog.example.com` comes to serve the attacker's content.

Where the impact grows is not the content itself. It is when that name appears in **cookie domains, CORS allow lists, CSP allowed origins and OAuth `redirect_uri` whitelists**. Everywhere the organization configured to trust its own subdomain is breached at once.

---

## 5. DoT and DoH – transport encryption moving visibility around

DNS queries were plaintext. Anyone along the path can see which names a user is asking about. DoT (DNS over TLS) and DoH (DNS over HTTPS) cover this.

There is a price here worth writing down honestly. DoH makes DNS traffic indistinguishable from ordinary HTTPS traffic, and lets a browser bypass OS settings and use its own resolver. User privacy goes up, but an enterprise network's DNS-based filtering, malicious-domain blocking and incident-investigation logs are neutralized at the same time. The substance of this debate is that **privacy and visibility are the two ends of the same axis**.

---

## 6. Where vulnerabilities live at this layer

**As long as judgement is by name and connection is by address, there is nowhere any guarantee that the two point at the same thing.**

DNS rebinding uses that gap. The browser's same-origin policy (SOP) judges by **name**. A script executed at `https://evil.com` can access only resources of `https://evil.com`. But the actual socket connection is made by **address**. And the answer to the name-to-address translation carries §3's TTL.

```
t=0   evil.com → 203.0.113.9 (attacker)   TTL 1 second
      browser: runs JS with origin evil.com

t=2   evil.com → 192.168.0.1 (internal network)
      the JS is still origin evil.com → passes SOP
      the socket connects to 192.168.0.1 → reaches an internal service
```

What characterizes this problem is that the defence does not gather in one place but divides across layers.

- **Browser** – DNS pinning. Fix the once-resolved address for the lifetime of the origin. Although the browser can only control its own cache, so it is not complete.
- **Resolver** – discard responses for external domains that point at private ranges (Part 2 §4). A feature most public resolvers provide by default.
- **Server** – validate the `Host` header against a whitelist. Checking not which address the arriving connection came to, but **which name it is calling itself by**.
- **Internal services** – do not make authentication depend on network location. Removing the premise that "this request came from the private network, so it is trusted" removes rebinding's value.

The last item is the fundamental fix. Rebinding has force because unauthenticated admin interfaces are common on internal networks, not because DNS is especially fragile.

Written as cause and effect, this layer's vulnerabilities are three lines.

- responses identified by a 16-bit query ID alone → cache poisoning
- the resource pointed at is cancelled while the CNAME remains → subdomain takeover, and the simultaneous bypass of every configuration that trusted that name
- judgement by name, connection by address → DNS rebinding

In all three lines, two parties identify a single target by different criteria. That form is archetype B, identity discrepancy, in Part 15.

---

## What is handed to the next layer

This layer turns a name into an address, but it does not verify that the party standing at the end of that address is the party it claims to be. The identity of what a name points at: that is the deficit this layer did not resolve, and Part 5 takes it on.

---

### References

- [RFC 1034: Domain Names - Concepts and Facilities](https://www.rfc-editor.org/rfc/rfc1034.html) – the HOSTS.TXT collapse and the design goals
- [RFC 9460: Service Binding and Parameter Specification via the DNS](https://www.rfc-editor.org/rfc/rfc9460.html) – SVCB / HTTPS records
- [OWASP: Server Side Request Forgery Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html) – private-range filtering in practice
