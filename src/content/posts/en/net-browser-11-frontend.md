The deficit Part 10 left was that the browser's boundary is drawn only after the document arrives, and that the origin criterion does not ask who made that HTML or where. Part III – the Application enters that making side, and this instalment fills the deficit with how the place of making moved back and forth between server and client. Rather than listing framework names, looking at it through the single question of **who makes the HTML, when, and where** reveals which problem of the previous stage each stage was trying to solve, and what it newly took on in exchange.

![Front-end evolution](/images/net-browser/11-frontend.svg)

---

## 1. Four stages

### ① Server templates

When a request comes in, the server queries the data, builds complete HTML and sends it down. When the user clicks something a new request goes out and the whole page is redrawn.

Simple, well read by search engines, fast first paint. The limit is clear. Changing only part of the screen is impossible, so an application-like feel cannot be made.

### ② Ajax partial updates

XMLHttpRequest, seen in Part 1, opens this stage. Rather than the whole page, only data is received and part of the DOM is edited. Code from the jQuery era is mostly imperative: "find this element, change this attribute, attach it over there."

Interaction without reloading was gained, and state was lost. More precisely, **state gets scattered around the DOM.** Which button is active, which filter the list is sorted by, is spread across screen elements' classes and attributes. The more complex the screen, the less "what is the state right now" can be confirmed from code, and bugs multiply in which two event handlers edit the same element differently.

### ③ SPA

The solution was to flip the direction. Rather than editing the DOM directly, **declare the state and derive the UI from the state.** The server provides little more than empty HTML and JSON APIs, and the browser builds the entire screen.

With state gathered in one place, complex UIs became manageable. The price is several things.

- Drawing the first screen requires downloading and executing the whole JavaScript bundle.
- Because the HTML the server sends down is empty, search engines and link previews do not see the content.
- Routing, scroll restoration, the back button and accessibility focus management all have to be implemented by hand. Things the browser used to do for free.

### ④ Return to SSR, and server components

As the third price grew, drawing on the server began again. Not a return to ①, though, but a structure of **drawing on the server first and picking it up in the browser.** With React introducing server components and Next.js taking that as its default model, sending only the pieces that need interaction to the client became mainstream.

---

## 2. Hydration as a cost

HTML made by the server **only shows; it is not yet clickable.** Because no event handlers are attached. The browser builds the same component tree once more, matches it against the existing DOM, and connects handlers. That process is hydration.

```
server : component tree → HTML string → transmit
browser: display HTML (the user sees the screen)
         → download the bundle → rebuild the same tree → connect events
         → now it is clickable
```

**The moment it is visible and the moment it is usable split apart.** A stretch arises where the page is drawn but buttons do not respond, and looking at a single metric hides that gap. There is also the waste of doing the same work twice.

The response went in the direction of shrinking the range to be redrawn. Streaming, which cuts the HTML into pieces and flows them out as they become ready; partial hydration, which handles what is on screen first; and the island architecture, which activates only the components needing interaction as separate islands. Server components go one step further with the choice of **not sending it to the client in the first place**. The code of components used only for rendering, with no interaction, never reaches the browser.

---

## 3. The trust boundary moving along with it

When the place of rendering changes, **which code is under the user's control** changes too. From a security standpoint, this instalment's core is that single line.

### When it moves to the client

When form validation, hiding menus by permission and discount calculation run in the browser, that is not validation but **UI**. An attacker calls the API directly without going through the screen. Opening developer tools shows all the code and state, and a single conditional can be changed and re-run.

This fact itself is old common sense, and the reason mistakes multiply in SPA structures is that **screen logic and validation logic live in the same codebase**. In a structure where server and client share the same function, which side holds the authoritative judgement becomes blurred. The principle that the server has to revalidate everything the client sent from scratch does not change.

### When it comes back to the server

Server components carry a new mistake in the opposite direction. A value inside a server component feels like it stays on the server, but **the moment it is passed to a client component as props it is serialized and transmitted.** Pass a whole database record and internal identifiers and unpublished fields go out with it; pass a configuration object and the keys inside it go out. That in code it looks like a function call within the same file while in fact it crosses a network boundary is the cause of this mistake.

### XSS changing address

Frameworks escape strings by default. Classical template XSS therefore dropped sharply. What remains instead is the **API that turns escaping off explicitly**.

```jsx
<div dangerouslySetInnerHTML={{ __html: userContent }} />
```

That the name carries a warning is the design intent. The problem is judging it fine because the server sanitized it before sending, and the mXSS seen in Part 9 §6 breaks exactly that assumption. What differs in this instalment is where that assumption stands: the sanitizing side and the side inserting into the DOM are split across server and browser, and neither rechecks the other's judgement.

That **prototype pollution** became a real attack path is another change of this period, as code that merges and copies client state objects multiplied. If a `__proto__` key gets mixed into a utility that deep-merges configuration objects, objects' default properties are polluted globally, and other code reading those values becomes a gadget.

---

## 4. Why bundlers exist

The frontend toolchain looks complex because it is solving three different problems at once.

- **Fragmentation of module systems** – JavaScript had no standard module system for a long time. CommonJS on the server side, AMD on the browser side, and standard ESM arriving later. Using libraries distributed in mutually different formats on one page means somebody has to translate.
- **The limit on request count** – because responses come out only in order on one connection (Part 6 §3), browsers open only about six connections per domain. With hundreds of files, loading becomes fatally slow. So they were merged into one.
- **Reducing transfer size** – removing unused code, minification, code splitting.

The second reason weakened considerably after HTTP/2. That bundling has not disappeared even so is because the first and the third remain. A textbook case of **the same tool remaining necessary for another problem even after one problem is solved**.

---

## 5. Where vulnerabilities live at this layer

**The trust boundary moves along with the place of rendering, and code that left validation behind where the boundary has departed becomes a vulnerability.**

```
validation moved to the client   → not validation but UI; the attacker calls the API without the screen
rendering returned to the server → server-side values serialized out along with props
the framework's default escaping → XSS moved to the API that turns it off, and to client state pollution

running through it all: every time the place of rendering moves, the trust boundary moves with it
```

The place where the sanitizer and the browser read the same string apart sits at archetype A (boundary discrepancy) in Part 15; the place where the judgement the screen made and the judgement the server ought to make come apart sits at archetype B (identity discrepancy).

---

## What is handed to the next layer

The deficit this instalment did not resolve is **behind the API**. We got as far as the judgement made on screen not being a judgement, but not one line was opened about the structure in which the side that actually has to make that judgement stands. Part 12 takes on that structure.

hack-tree, the thing being built in this series, corresponds to ④ in §1. On top of Next.js's App Router, most screens are drawn on the server, and only the parts needing interaction, such as the search palette and the graph view, are left as client components.

---

### References

- [React Server Components](https://react.dev/reference/rsc/server-components) – React official documentation
- [Rendering: Server Components](https://nextjs.org/docs/app/getting-started/server-and-client-components) – Next.js documentation
- [DOM-based vulnerabilities](https://portswigger.net/web-security/dom-based) – a list of client-side sinks
