This instalment opens **the inside of the renderer**, which Part 8 named and handed on, through the division into stages. The mechanism of this layer is a structure that splits the path from byte sequence to screen into several stages and seats JavaScript and the engine between them. **Every mechanism that made this layer fast skips or assumes something.**

The engine's internal intermediate representations, its optimization logic, and the vulnerability classes that come out of there are not this instalment's scope. Here we look only as far as **where the engine sits, why such a thing was needed, and where it is used now**.

![The rendering pipeline and where the engine sits](/images/net-browser/en/09-rendering.svg)

---

## 1. From bytes to pixels

Chromium's rendering architecture (RenderingNG) divides the pipeline into several stages. Grouped into units that mean something in practice:

1. **Parsing** – tokenize the HTML byte sequence and build the DOM tree.
2. **Style** – parse the CSS into a CSSOM and compute each DOM node's final style values with the cascade algorithm.
3. **Layout** – decide each box's position and size from the computed styles. The document's whole geometry is determined here.
4. **Paint** – build the **command list** of what to draw in what order. No pixels are actually painted.
5. **Compositing · raster · display** – split the command list into layers and tiles, turn them into pixels on the GPU side, and submit the frame to the screen.

The reason the stages are divided this finely is not only to make the order clear. It is **to skip stages that are not needed**. The Chromium documentation states that visual-effect animations and scrolling can skip layout, prepaint and paint.

This is the basis of frontend performance advice. An animation made with `transform` and `opacity` only rearranges layers that are already built, so only the compositing stage runs again. Make the same movement with `top`/`left` and the box geometry changes, so everything from layout onward is recomputed every frame. "This property is fast" is not a rule of thumb but a difference in which point of the pipeline the work restarts from.

---

## 2. Where JavaScript wedges in

### Parser blocking

When the HTML parser meets `<script>`, it stops parsing. Because the script can change the document with `document.write`, how to interpret the following bytes cannot be settled until script execution finishes.

```html
<script src="a.js"></script>   <!-- parsing stops → download → execute → resume -->
<script src="a.js" defer></script>  <!-- parsing continues → execute in order after the document completes -->
<script src="a.js" async></script>  <!-- parsing continues → execute immediately on arrival -->
```

To reduce this blocking cost, browsers also run a **preload scanner**. Even while parsing is stopped, it scans ahead through the bytes and starts downloading the resources that will be needed. A mechanism that keeps the network from stopping even though the parser has.

### The order of the event loop

The order in which code runs within one frame is fixed.

```
run one task (event handler, setTimeout callback …)
  → drain the microtask queue entirely (Promise callbacks, queueMicrotask)
  → rendering opportunity (if needed, requestAnimationFrame callbacks → style → layout → …)
  → next task
```

The difference between `setTimeout(fn, 0)` and `Promise.resolve().then(fn)` comes from here. The former is pushed to the **next task**, so rendering may happen in between. The latter is guaranteed to run right after the current task ends and before rendering. Write code that queues another microtask from within a microtask and the queue never empties, so the rendering opportunity never comes.

### Forced synchronous layout

Layout usually runs once at the end of a frame. But when JavaScript reads a geometric value such as `offsetHeight` or `getBoundingClientRect()`, the browser has to **run layout on the spot** in order to give an accurate value.

```js
for (const el of items) {
  el.style.width = el.offsetWidth + 10 + 'px';  // write → read → write → read …
}
```

The write causes the invalidation seen in the previous section, and the read immediately forces that recomputation. Alternate the two inside a loop and layout runs as many times as there are items. Do all the reads first and batch the writes and it finishes in one. This is why frameworks batch DOM updates.

---

## 3. What the engine is responsible for

To place the JavaScript engine exactly in the pipeline picture, what the engine provides has to be separated from what it does not.

| Provided by the engine (V8, SpiderMonkey, JavaScriptCore) | Provided by the host (the browser) |
|---|---|
| the language itself – syntax, object model, prototypes | `document`, the DOM API |
| garbage collection | `fetch`, `XMLHttpRequest` |
| built-in objects such as Promise and iterators | `setTimeout`, `requestAnimationFrame` |
| actually executing code | cookies, storage, permissions |

`document` is not part of the JavaScript language. It is a host object the browser plugs into the engine. This separation is what makes it possible to take the engine outside the browser. Swap only the host and the same language runs in an environment with no DOM.

---

## 4. Why an interpreter alone stopped being enough

The flow seen in Part 1 continues here. XMLHttpRequest arrived in 1999, the name Ajax was attached in 2005, and after that web pages became applications. Once scripts that had decorated documents came to hold entire application logic, **JavaScript execution time itself became the bottleneck**.

### Why AOT is impossible

JavaScript is dynamically typed. Whether `a` in a function `f(a, b)` is an integer, a string or an object cannot be known before execution, and the same function may receive different types on different calls. Translating to machine code ahead of time as in C means generating code that handles every case, and then it is not fast.

The structure engines chose is **observe, then specialize**.

```
① run it in the interpreter while observing "what types arrive at this spot"
② pick only the frequently executed functions, nail the observed types in as assumptions, and compile to machine code
③ if those assumptions break during execution, throw the compiled code away and fall back to the interpreter
```

Compilation takes time. Compiling code that will run only once is a loss. So the structure becomes one that **justifies compilation cost by execution frequency**. Which is also why the name is "Just-In-Time."

What assumptions get nailed in at ②, by what procedure the fallback at ③ happens, and what kinds of discrepancy can arise in between are a separate topic. Just holding on to the fact that **JIT is both an optimization and "code that leans on assumptions"** gives a feel for why this area generates its own vulnerability class. The details are covered code by code in the next series, which deals with engines.

### Three engines switching simultaneously in 2008

In 2008 three camps moved almost simultaneously.

| When | Engine | Camp |
|---|---|---|
| 2 September 2008 | **V8** – open-sourced the same day Chrome shipped | Google |
| 2008 | **TraceMonkey** – JavaScript's first JIT compiler | Mozilla |
| 2008 | **SquirrelFish Extreme** – the JavaScriptCore line | Apple |

V8 began in autumn 2006 when Lars Bak joined. Development proceeded in an outbuilding of a Danish farmhouse, and it was designed from the start on the premise of generating machine code. Mozilla supplemented its approach by adding JaegerMonkey in 2009. This period is commonly called the JavaScript speed race.

---

## 5. Where the engine runs outside the browser

The property that only the host needs swapping was actually put to use outside the browser.

- **Node.js** (2009) – attached the file system and sockets to V8 as host objects. The starting point of using JavaScript on the server.
- **Electron** – bundles Chromium and Node together to build desktop apps.
- **Deno · Bun** – put different host APIs on top of V8 and JavaScriptCore respectively.
- **Edge runtimes** – where an isolated execution environment has to be created quickly per request, the engine's isolation unit is used instead of a process.
- **Extension scripting** – proxies, databases and editors embed an engine to run user scripts.

**The JavaScript engine went from a browser component to a general-purpose execution runtime.** This is why the value of studying engines is not limited to one browser.

---

## 6. Where vulnerabilities live at this layer

The flaws that come out of the rendering pipeline itself are a different class from engine memory bugs. They all come from **interpreting the same document twice, or from rendering's side effects being observable**.

- **mXSS (mutation XSS)** – markup a sanitizer judged safe turns into a different structure in the course of the browser putting it into the DOM and then serializing and re-parsing it. Because it is a problem of the sanitizer's parser and the browser's parser reading the same string differently, it is exactly the same form as Part 6's parser differential.
- **DOM clobbering** – using the old behaviour whereby an HTML element's `id` or `name` becomes a property of the global object, JavaScript variables are overwritten by markup alone, with no script.
- **CSS injection** – even with no script insertable, being able to insert style alone lets attribute selectors and background image requests be combined to leak a value inside the page one character at a time.
- **XS-Leaks** – observable side effects such as rendering time, frame count and scroll position are used to infer another origin's state. A shape in which information is obtained from **differences in response** alone, without reading data directly.

Where vulnerabilities live at this layer is the observable differences the pipeline leaves. This form – that differences in response remain even when reading is blocked – is archetype D (side-effect observation) in Part 15.

---

## What is handed to the next layer

The deficit this layer did not resolve is **the boundary between origins**. The pipeline decides only what to draw in what order, not whether that document may read or learn about another origin's things. Part 10 looks at that unit head-on.

The invalidation scope of the rendering pipeline and the channel its cost creates are unfolded in [Deep Dive 02 – The Rendering Pipeline's Cost and Channels](/post/net-browser-deep-02-pipeline).

---

### References

- [RenderingNG architecture](https://developer.chrome.com/docs/chromium/renderingng-architecture) – Chrome for Developers
- [Celebrating 10 years of V8](https://v8.dev/blog/10-years) – early history as set out by the V8 team
- [HTML Standard: Event loops](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops) – WHATWG
