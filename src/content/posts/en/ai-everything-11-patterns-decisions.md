This piece runs through twelve repeatable patterns, seven decisions a designer actually has to make, three counterintuitive takes that cut against instinct, and the principle of removing scaffolding.

---

## 1. Twelve harness patterns

A pattern is not a right answer but **a good solution that recurs often**. They divide into four bundles: memory and context, workflow and orchestration, tools and permissions, and automation.

First, memory and context (patterns 1–5).

### Pattern 1. Permanent instruction files

Fix the project's core rules in a file so they need not be explained again every session. The same as the house rules stuck on the fridge. You do not say "recycling on Wednesday" and "check the gas when going out" aloud every time.

- **When to use**: when handling the same project across many sessions, when several people use the same environment
- **What to watch**: too long and it goes unread or conflicts multiply. It should be a map and a checklist, not an encyclopedia
- **Implementation**: `AGENTS.md` (the OpenAI side), `CLAUDE.md` (the Claude side)

### Pattern 2. Scope-based context assembly

Rather than one giant rules file, assemble only the rules matching the work's location and situation. The same as not writing a department store's entire rules on one leaflet, but posting different notices in the food hall, the warehouse and the office.

- **When to use**: monorepos, multilingual projects, large repositories where conventions differ per team
- **What to watch**: rules scattered too far make it opaque which you are looking at now. Document priority and scope of application

### Pattern 3. Layered memory

Do not treat every memory the same; divide frequently used and occasionally used into layers. The distinction between desk, drawer and warehouse. The pen used daily goes on the desk, the occasionally consulted contract in the drawer, and documents for long keeping in the warehouse. Start with at least three layers: always-needed memory, current-work memory and archival memory.

### Pattern 4. Memory tidying (dream consolidation)

Periodically tidy accumulated memory to reduce duplication, contradiction and stale information. However large the wardrobe, it becomes a mess without tidying. Tidy when the season changes, remove what is not worn, and group like with like.

- **What to watch**: tidying too aggressively loses needed information too. Automatic tidying is putting in order, not forgetting

### Pattern 5. Progressive context compaction

As a session lengthens, summarize and shrink stage by stage, starting with the oldest parts. Recent discussion in detail, last week's discussion as a summary, older content down to conclusions only.

- **When to use**: sessions over 20–30 turns, long coding, customer support histories, long research
- **What to watch**: compaction is inherently lossy. Leave important decisions in a separate file

Next, workflow and orchestration (patterns 6–8).

### Pattern 6. The explore-plan-execute loop

Do not edit immediately; look first, make a plan, and execute last. A repair technician who picks up the drill the moment they see the wall is unsettling. A good technician looks at the state, explains the cause, states the method, and then works.

- **When to use**: unfamiliar codebases, work touching many files, work where mistakes are expensive
- **What to watch**: it looks slow on simple work. Adjust the intensity by importance
- **Implementation**: Claude Code's Plan Mode

### Pattern 7. Context-isolated subagents

Separate investigation, planning and verification into separate subagents so each sees only the context it needs. One person handling accounting, legal, design and development all in the same notebook is chaos.

- **What to watch**: detailed context can drop out in the handover. Divide by context boundary, not by role name ([Part 07](/post/ai-everything-07-multi-agent))

### Pattern 8. Fork-join parallelism

Split independent work into several branches, process in parallel, and merge at the end. One person going room to room for a whole-house clean takes a long time. The family each take a room and tidy the shared space together at the end.

- **What to watch**: the final merge is hard. Complexity grows especially when several branches touch the same file

Subagents gain parallelism through isolation, and Agent Teams gain coordination through communication. Ask first whether it is independent work or ongoing collaboration, then design.

Then tools and permissions (patterns 9–11).

### Pattern 9. Progressive tool expansion

Do not show every tool from the start; begin with a basic set and add only when needed. You do not hand someone learning to drive the keys to an excavator, a truck, a motorbike and a forklift.

- **What to watch**: open too late and the agent takes unnecessary detours or repeats the same question

### Pattern 10. Command risk classification

Divide the agent's actions by risk into auto-allow, ask for confirmation and auto-block. The same as an airport security check. You cannot stop every passenger, and you cannot send them all through unchecked.

- **Implementation**: the three stages of `allow` / `ask` / `deny`
- **What to watch**: too fine-grained and productivity falls; too loose and accidents happen

### Pattern 11. Single-purpose tool design

Do not depend on a general shell alone; separate frequent actions such as file reading, editing and search into dedicated tools. Better scissors for scissors and a screwdriver for screwdriving than doing everything with one Swiss army knife.

- **What to watch**: trying to cover every edge case with dedicated tools gets complicated instead. A combination of dedicated tools plus a restricted general shell is realistic

Finally, automation (pattern 12).

### Pattern 12. Deterministic lifecycle hooks

Do not leave procedures that must happen to the model's memory; connect them to system events and run them automatically. The same as a washing machine running rinse and spin automatically according to its programme rather than asking the person "don't forget the rinse." **What has to happen every time belongs in a hook, not in guidance.** Human memory wobbles; systems endure repetition.

- **What to watch**: too many hooks make debugging hard. Visualize and document which hooks are connected to which events

The realistic order for applying the patterns:

```
1. make a permanent instruction file (AGENTS.md / CLAUDE.md)
2. make explore-plan-execute the default habit
3. make only a few single-purpose tools (document search, file reading, running tests)
4. set allow / ask / deny by command risk classification
5. when work gets long, add layered memory and context compaction
6. when the volume grows, attach subagents and parallelism
7. finally, systematize repetitive procedures with lifecycle hooks
```

The core is **creating order before automating**. With no guidance, tools in disarray and no risk classification, piling on hooks first makes it more complicated instead.

It corresponds to the patterns in Anthropic's "Building effective agents" too. Prompt chaining corresponds to staged Skills, intermediate deliverables and approval gates. Routing is request classification, specialist agent selection and path-based rules. Parallelization is subagents, fork-join and parallel review. Orchestrator-workers is an orchestrator, an Agent Team and dynamic task decomposition. Evaluator-optimizer is the Generator-Evaluator harness, rubrics and iterative improvement. Autonomous agent is the long-running harness, environment feedback, stop conditions and human approval.

---

## 2. Seven design decisions

A well-designed harness is not made by simple formulas such as "attach lots of tools" or "multi-agent is always better." **Every choice has a price.**

| Decision | One side | The other | Plain explanation |
|---|---|---|---|
| Number of agents | single agent | multi-agent | work alone, or split into a team of specialists |
| Reasoning strategy | ReAct | plan then execute | think at every stage, or plan once and execute fast |
| Context strategy | heavy compaction | rich context | clear the desk, or spread out lots of material |
| Verification method | computational verification | reasoning-based verification | tests and linters vs an LLM judge |
| Permission design | permissive | restrictive | move fast, or put approval gates in |
| Tool scope | all tools always exposed | minimal tools per stage | the whole menu vs the menu needed now |
| Harness thickness | thin harness | thick harness | leave it to the model, or control with code and rules |

These decisions are not independent of one another. The more you go multi-agent, the more context isolation and verification loops matter. Exposing all tools all the time makes permission design and tool-selection accuracy a bigger problem.

Turning the seven decisions into a canvas and filling in each choice, its reason and the signal to revisit later lets you explain **why this harness looks the way it does**. The signals to revisit are things like these. Single or multi: whether more than 30 tools overlap, or specialist areas separate clearly. ReAct or plan-then-execute: whether new judgement is needed at every stage, and how much repeated execution there is. Compaction or rich context: whether the model misses important content, and whether cost is excessive. Computational or reasoning-based verification: whether there are quality problems tests do not catch. Permissive or restrictive: whether irreversible operations are included. All tools or minimal: whether tool selection errors are increasing. Thin or thick harness: whether code is excessively blocking work the model already does well.

The order for applying it first time:

```
1. start with a single agent. Multi only when the reason to divide is clear
2. split exploratory work to ReAct and repetitive work to plan-then-execute
3. give rich context at first, and design compaction and retrieval when failure patterns appear
4. verify with tests and linters first. Attach an LLM judge when semantic judgement is needed
5. always classify dangerous actions as ask or deny
6. default tools to minimal exposure per stage rather than full exposure
7. make the harness only as thick as needed. As models improve, remove stale controls
```

---

## 3. The relation between tool count and performance

Tool count and agent performance are not proportional. The first counterintuitive take is here. Attaching many tools feels like it should make it smarter, and as seen in [Part 05's tool explosion problem](/post/ai-everything-05-tools-and-mcp), more tools bring more selection burden and more context burden with them.

What showed this numerically is **d0**, the internal text-to-SQL agent at Vercel, the frontend infrastructure company that makes Next.js. Starting from an agent elaborately built with many specialist tools and hand-coded logic, they removed most of the specialist tools and had it explore a well-organized semantic layer of files (YAML, Markdown, JSON) directly with standard Unix tools such as `grep`, `cat` and `find`; on a benchmark of five representative queries the result was a 3.5× reduction in average execution time, a success rate going from 80% to 100%, and a 37% reduction in tokens. The full figures and an application checklist are in [Part 12's case analysis](/post/ai-everything-12-cases-ecosystem).

It is easy to draw the wrong lesson here. This result does not mean "bash alone makes every agent better." The reason Vercel's approach worked is that **their semantic layer was already a well-organized document structure.** Files were well named, definitions were clear, and the YAML held the relations and computations needed, so the model could read it directly. The core is not removing tools but creating an environment the model can read and judge well.

The previous structure had made many tools and constraints to protect the model. Over time those constraints themselves became a maintenance burden, and came to handle even the work the model could handle directly. Similar to assigning work to an employee while making a dedicated form for every small judgement. A form for confirming the customer name, a form for confirming the product code, a form for confirming the price. It looks systematic at first, and with too many forms the employee spends time choosing forms rather than working.

**Simplification is design, not deletion.** Even with fewer tools, basic safety devices such as sandboxes, logs, approvals and tests become more important, not less.

---

## 4. Whether ReAct or planning is superior

There is no fixed superiority between ReAct (alternating thinking and acting) and plan-then-execute. The second counterintuitive take is here. ReAct appears often in tutorials and looks clever, and thinking anew at every stage means **cost and latency at every stage.** The LLMCompiler research (Kim et al.) showed that on parallelizable workloads, planning first and executing in parallel can give up to 3.7× latency improvement and up to 6.7× cost reduction over ReAct.

The structures of the two methods and the criteria for choosing by type of work were organized in [Part 03](/post/ai-everything-03-agent-loop). The point is one. Use ReAct for work where intermediate observations change direction, such as exploration and debugging, and plan-then-execute for repetitive and parallel work with a clear order – there is no reason to pay per-stage reasoning cost on the latter.

---

## 5. Harness permissiveness and shipping speed

A more permissive harness does not make shipping faster. The third counterintuitive take is here. During development a permissive harness looks good. No approval dialogs, no friction. So demos come out fast. In production it is different. Once irreversible actions come in – customer data, payments, deployment, deletion, permission changes – **friction becomes insurance rather than obstruction.** A structure that stops and asks in front of a high-risk tool call is not a device for annoying the user but a device for leaving accidents in a recoverable state.

Harness behaviour by risk divides like this. Low risk such as reading files, searching and running tests is auto-allowed. Medium risk such as editing files or updating internal documents is logged and confirmed in some cases. High risk such as deployment, payment, DB deletion and external sending requires user approval. Exposing secret keys or unauthorized data extraction is auto-blocked.

The three counterintuitive takes have the same shape. The intuitive choice feels good during development. Many tools look like much capability, reasoning at every stage looks clever, and executing without approval looks fast. In real work, though, context pressure, unnecessary LLM calls, wrong tool selection and irreversible mistakes eat performance.

---

## 6. Harness thickness

Harness thickness is an **architectural bet** between how much to trust the model and how much to control with code.

| | Thin harness | Thick harness |
|---|---|---|
| Basic philosophy | trust the model's judgement | state the flow in code |
| Advantage | simple and flexible, and gets the benefit of model improvements quickly | predictable and auditable, and easier to control complex work |
| Disadvantage | more exposed to model mistakes and ambiguous judgements | the design gets heavy and can block a new model's capabilities |
| Suited to | exploration, creative work, coding assistance, areas where the model is strong | regulated work, payments and deployment, complex multi-stage workflows |
| Implementation feel | tools + context + permissions + a simple loop | state graphs, explicit routing, verification nodes, a planning stage |

A thin harness is giving a capable employee only the goal and the tools and trusting them; a thick harness is giving a new starter a checklist, a sign-off chain, a work order and interim checkpoints in detail. There is no right answer. It changes with skill level, risk, regulatory environment and the cost of failure.

By risk: brainstorming ideas and tidying personal notes are fine with a thin harness. Sharing team meeting minutes is medium, answers sent to customers medium to thick, submitting a business plan thick, and payments, deletion, deployment and legal judgements suit a very thick harness.

---

## 7. Scaffolding

Scaffolding refers to the harness structures that temporarily prop up the parts where the model is still weak. Tools, memory, context management, permissions, verification loops and error recovery fall under it.

**Scaffolding does not build the building. But without scaffolding the worker cannot reach the upper floors.** Scaffolding on a building site does not build the building on your behalf, and without it the upper floors cannot be reached. This is the analogy that best shows the harness's character.

There is a more important line. Scaffolding is **temporary infrastructure**. When the building is complete the scaffolding is partly or entirely removed. When the model is weak, planning stages, tool restrictions, explicit routing and verification loops are needed thickly. But as the model grows, some scaffolding becomes unnecessary. Left in place, it becomes a stale rule obstructing the new model's capabilities instead.

That does not mean it can be torn down at will. Today's models are trained alongside particular harnesses, and may have become accustomed to particular tool formats and feedback loops. Change the scaffolding and rather than getting simpler, **performance may temporarily drop.** Hand someone who has only practised in an automatic a manual car and their driving ability looks to have vanished. The person did not get worse; the familiar operating environment changed. So model performance is right to be evaluated together with the harness that model is used to, not on its own.

There are questions for checking whether a harness is future-proof. Does performance rise when you switch to a stronger model? Improving without an increase in harness complexity is a good sign; a new model conflicting with stale rules is a bad sign. Does quality hold when parts of the harness are removed? Being able to move to a simpler, faster structure is a good sign; quality crashing the moment something is removed is a bad sign. When a failure occurs, is it visible where it failed? Being able to confirm the cause from traces, logs, evals and progress files is a good sign; not knowing whether it is the model's fault or the harness's is a bad sign. Is there a regression eval after removing scaffolding? Being able to compare quality before and after removal is a good sign; cutting by feel and recovering after an incident is a bad sign.

The core is this. If performance rises when you put a new model in **without increasing harness complexity, the design is healthy.** Conversely, if the model improved and you still have to keep making the harness more complex, that is a signal to suspect first whether the harness is obstructing the model.

Remove one at a time. Anthropic's harness design piece explains that you have to identify which devices are actually load-bearing for performance. A railing that looks decorative may in fact be a safety device, and conversely an old signpost may now be an obstacle.

```
O check separately whether quality falls when the evaluator is removed
O check separately whether sprints hold when the planner is simplified
O check separately whether user-flow errors increase when browser verification is reduced
X reduce several devices at once and you cannot tell what was actually needed
```

The practical principles:

```
1. at first, put up as much scaffolding as needed
2. document the scaffolding – why this control is needed, which failure it prevents
3. when a new model or new tools appear, look for scaffolding removal candidates
4. reduce scaffolding one at a time, comparing before and after with evals, tests and logs
5. if performance falls, reinforce again – but return to a smaller, clearer scaffold
```

A well-designed harness is not a prison confining the model but scaffolding, parts of which can come down as the model and the product grow.

---

## 8. Technology choices that are easy for an agent to read

OpenAI's harness piece shows that **technology choices change too** when agents build real products. Code that looks good to a person, or a fashionable framework, is not always good for an agent.

- Clear file names and folder structure: search and exploration become easy
- A short AGENTS.md and a structured `docs/`: the needed document is easy to find and context waste falls
- Fast tests and linters: failures can be seen immediately after an edit
- Readable logs and traces: the model can re-observe the cause of failure
- Small PRs and small units of work: the change scope is small, making review and reverting easy
- Machine-readable configuration and schemas: constraints can be verified without human explanation

The boring structure spoken of here is not low quality. On the contrary, in operation a boring, clear structure is strong. People too make fewer mistakes cooking in a tidy kitchen. The last question to attach to the design decision table is this: is this structure good not only for a person to look at but for an agent to read, edit and verify?

---

## 9. Case figures and primary sources

A case figure's meaning is settled only by checking the primary source and the measurement conditions together. Impressive figures appear often in harness cases, and online summaries sometimes diverge from official documentation. Distinguishing the two:

- The phrase "Vercel cut 80% of the tools in v0" circulates, and it is not v0 (UI generation) but **d0**, the internal text-to-SQL data agent.
- The phrase "Claude Code cuts context by 95%" exists, and the Tool Search documentation's basis is a reduction of **more than 85%** in tool definition context.
- The phrase "Plan-and-Execute is 3.6× faster" exists, and the LLMCompiler paper says up to 3.7× latency improvement and up to 6.7× cost reduction, limited to parallelizable workloads.

The lesson is simple. The more impressive the figure, the more you check the **primary source**, and read alongside it under what conditions that figure was produced.

---

## 10. Summary

The twelve patterns are four bundles – memory/context, workflow/orchestration, tools/permissions, automation – and the core of the application order is creating order before automating. The seven decisions are not independent of one another, and filling in the canvas lets you explain why the harness looks the way it does.

The three counterintuitive takes share a root. More tools do not make it smarter (Vercel's d0 got 3.5× faster by reducing tools, and the core is an environment the model can read well, not deleting tools). ReAct is not always better, and plan-then-execute is favourable for repetitive and parallel work. A permissive harness is fast only for demos, and in production friction is insurance. In the end, **the choice that feels good during development and the choice that survives in production are different.**

Harness thickness is a bet between trust and control, and it changes with risk. Scaffolding has to come down eventually – one at a time, with regression evals. And the more impressive the number, the more you check the primary source and the conditions.

---

## Further reading

- Anthropic, *Building Effective AI Agents* – <https://www.anthropic.com/engineering/building-effective-agents>
- Vercel, *We removed 80% of our agent's tools* – <https://vercel.com/blog>
- LangChain, *Improving Deep Agents with harness engineering* – <https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering>
- Birgitta Böckeler, *Harness engineering for coding agent users* – <https://martinfowler.com/articles/harness-engineering.html>
- Kim Dong-hak, 《하네스 엔지니어링 백과사전》 (*Encyclopedia of Harness Engineering*), chapters 11 and 12 – <https://wikidocs.net/346803>, <https://wikidocs.net/346804>

---

Next: [12. Real cases and the ecosystem](/post/ai-everything-12-cases-ecosystem)
Previous: [10. Safety, governance and operations](/post/ai-everything-10-safety-governance)
