The web is a system that grew without central control, and in such a system nobody validates input for you and nobody forces interpretation into a single shape. Part I – The Protocol Layers follows what form that deficit takes at each layer, and this instalment looks at when, and through which decisions, it set. **The major branches of web vulnerabilities are not mistakes that crept in later; they are the price a design that grew without central authority agreed to pay from the start.**

![A timeline of the web standards lineage](/images/net-browser/en/01-web-timeline.svg)

---

## 1. What the 1989 proposal asked for

[Information Management: A Proposal](https://www.w3.org/History/1989/proposal.html), which Tim Berners-Lee submitted to CERN in March 1989, is less a manifesto announcing the invention of hypertext than **a report on an organizational operations problem**. The problem it names is personnel turnover. At CERN "two years is a typical length of stay," and information is continuously lost as a result. Not because there is no record, but because the record exists and cannot be found.

The proposal rejects each of the two solutions available at the time.

- **Tree structures** – they push information into a single hierarchy. In a help system, reaching a dead end means you have to "leave the system and re-enter it" to reach related information on another branch.
- **Keyword systems** – "two people never choose the same keyword." Which makes keywords useful only to someone who already knows the field.

Instead, the proposal demands five properties. These five are the web's design constraints themselves, to this day.

| Required property | How the proposal puts it | How it is implemented now |
|---|---|---|
| Decentralized | "link existing systems without central control or coordination" | anyone stands up a server and links to it |
| Link-based | "a 'web' of notes connected by links" | hyperlinks, `<a href>` |
| Remote access | "access from remote machines is essential" | HTTP over TCP |
| Heterogeneity | "access the same data from different kinds of system" | MIME types, content negotiation |
| Private links | "add one's own private links to public information" | bookmarks, citations, external links |

Of these, **decentralization** is the item that cost the most. No central control means precisely that there is no party to validate input for you.

---

## 2. Why it was split into HTTP, HTML and URL

Where the web parts ways with its rival protocols is not in features but in **how it decomposes**. Berners-Lee's design splits one system into three independent specifications.

```
URL   – what does it point to        (identification)
HTTP  – how is it fetched            (transport)
HTML  – how is the fetched thing read (representation)
```

Because the three specifications know nothing of one another, each can be replaced independently. HTML did in fact go as far as 5 and HTTP swapped its wire format three times, while URL is nearly unchanged. The same URL is fetched over HTTP/1.1 and over HTTP/3 alike, and it works even when what comes back is JSON rather than HTML.

Gopher, its contemporary, went the other way. Menu structure, transport and representation were bound together inside one protocol, and so it could never escape the shape of a hierarchical menu. Exactly the tree structure the 1989 proposal had rejected.

The price of decomposition is that **the number of interpreting parties grows to three**. The code that parses URLs, the code that parses HTTP messages and the code that parses HTML each exist separately, and each was implemented by different people at different times in different languages. What arises when these three read the same byte sequence differently is a parser differential. One of the major branches of web vulnerabilities comes from here.

---

## 3. 1993, two licensing decisions

The least known part of this history is that it was licensing, not technical merit, that decided the outcome.

**February 1993.** The University of Minnesota announces it will charge a licence fee for commercial use of Gopher. The stated reason was that, with budgets being cut, it needed grounds to keep spending development resources. The reaction was immediate. IBM declared it would not support a protocol carrying a restricted licence, and community sentiment turned overnight.

**30 April 1993.** CERN signs a document pointing the other way. The half-page [document](https://cds.cern.ch/record/1164399), signed by H. Weber, Director of Administration, and W. Hoogland, Director of Research, relinquishes all of CERN's intellectual property rights in the `libwww` library, the line-mode browser and the W3 server (`httpd`). The stated intent was "to promote compatibility, common practices and standards in networking and computer supported collaboration."

The result survives as a comparison of growth rates over the single year of 1993.

| Protocol | 1993 traffic growth |
|---|---|
| Gopher | 997% |
| Web | 341,634% |

Gopher was still used far more than the web that year and was still growing. Even so, the companies and publishers choosing where to put resources picked the free one. Berners-Lee himself had been discussing licensing with CERN, but after seeing the Gopher announcement he changed his request to "no restrictions at all."

**What this leaves behind:** the fact that every implementation of the web is a thing built separately by a different organization. With no central authority to enforce the standard, each implementation converged on lenient parsing – "accept it and do your best to interpret it" – Postel's principle.

---

## 4. The day the standard forked in two

On 2 June 2004, at the W3C's Web Applications and Compound Documents workshop, a joint proposal from Mozilla and Opera is voted down. The proposal's thrust was to reopen the evolution of HTML. The stated reason for rejection was that it conflicted with the already chosen direction of the web's evolution, and the W3C voted to continue developing an XML-based replacement specification (XHTML2).

Two days later, on **4 June 2004**, Apple, Mozilla and Opera open the WHATWG mailing list. The [WHATWG FAQ](https://www.whatwg.org/faq) names three motivations: the W3C's direction towards XHTML, its indifference to HTML, and its disregard for what web developers actually needed.

The split lasted fifteen years and was closed in May 2019 when both sides agreed on a single HTML and DOM specification. But what this period left is not one document.

- **The Living Standard concept** – a specification that keeps being updated rather than being frozen behind a version number. This is why there is no "HTML6" after HTML5.
- **Writing the parsing algorithm down** – the WHATWG HTML specification's largest contribution is not a new tag but the byte-level prescription of **exactly what order a browser must recover in** when it meets malformed markup. Until then this had been close to each browser's trade secret.
- **Multiplication of specifications** – HTML is managed by the WHATWG, HTTP by the IETF, CSS and accessibility by the W3C. A single request passes through the specifications of at least three bodies between arriving at a browser and becoming a screen.

---

## 5. The browser wars and the stagnation

Before the fork of the previous section, there was a period when a standard existed but could not be enforced. The first browser war (1995–2001) was a race between Netscape and Internet Explorer to ship features first. Because whoever implemented first became the de facto standard, a considerable amount of browser behaviour made in this period set as **practice with no basis in any spec**. HTML's automatic tag closing, the rules for recovering from malformed markup, and a good deal of how cookies behave all come from here.

After IE won, browser technology effectively stopped for about five years from 2001. And yet during this stagnation one feature that changed the direction of web applications had quietly arrived.

**XMLHttpRequest** first shipped in IE5 in 1999 as an ActiveX control (`Msxml2.XMLHTTP`), and its purpose was Outlook Web Access for Exchange 2000. Running a mail client in a browser meant fetching data without repainting the whole page. Mozilla adopted it in 2002, and Google put it to serious use in Gmail and Google Maps. A name was attached to the bundle much later, on 18 February 2005, in Jesse James Garrett's piece "Ajax: A New Approach to Web Applications."

The order matters. **The technology came first, the name six years later, and only once it had a name did a field called frontend come into being.**

---

## 6. Where vulnerabilities live in this history

Setting aside the previous section on the browser wars, the other four sections all converge on the same structural fact.

```
no central control (the 1989 design requirement)
   → implementations exist separately, one per organization
   → no party can forcibly correct differences in spec interpretation
   → lenient parsing becomes the survival strategy
   → two implementations read the same byte sequence differently
   → parser differential
```

The last term of this chain accounts for a sizeable part of the web-hacking tree. HTTP request smuggling, cache poisoning, reverse proxy bypass, Unicode normalization bypass and mXSS all share a single form: "a discrepancy between two interpreters." Grasping that form first, rather than memorizing individual techniques, is this whole series' policy.

The 2022 restructuring of the standard, which tries to write semantics and syntax apart from each other, is a response aimed at reducing this discrepancy, and that separation becomes a useful coordinate in Part 6.

This form – a discrepancy between two interpreters – is archetype A, boundary discrepancy, in Part 15.

---

## What is handed to the next layer

What this instalment named but did not resolve is **what happens along the path**. We have got as far as the web being split into three specifications with no central authority to interpret the pieces, but not one line has been said about which road the pieces actually cross, or who rewrites what while they cross it. Part 2 opens that road.

---

### References

- [Information Management: A Proposal (1989)](https://www.w3.org/History/1989/proposal.html) – the original
- [Software release of WWW into public domain (1993.04.30)](https://cds.cern.ch/record/1164399) – CERN Document Server
- [WHATWG FAQ](https://www.whatwg.org/faq) – how the fork happened
- [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html) – the result of the 2022 restructuring
