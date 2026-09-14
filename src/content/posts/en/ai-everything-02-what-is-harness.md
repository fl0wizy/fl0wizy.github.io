This piece organizes the lineage by which the word "harness" ran from car wiring through software testing to AI; where the model and the harness each sit within one turn; the harness's 5 minimal components and 12 production-grade components; and the external components a harness keeps outside the model (memory, skills and protocols).

---

## 1. The etymology of "harness"

**Harness** originally means "a device that binds, supports and connects." A climbing safety belt is a harness, the tack put on a horse is a harness, and the bundle of wires inside a car (the wiring harness) is a harness. The core is one thing. **A structure that binds complex and potentially dangerous elements so they do not scatter at will, and makes force and signal flow in the needed direction.**

A car is a good example. If the headlights, brake lights, battery, sensors, airbags, audio, navigation and ECU each trailed their own wires, maintenance would be hard, faults frequent, heat and vibration damaging, and accidents dangerous. So the car industry uses a wiring harness that bundles and protects the wires and fixes their routes. What an AI harness does corresponds exactly. It organizes context and tools the way wires are bundled so they do not tangle; it blocks dangerous tool calls and wrong actions the way overcurrent and wear are prevented; it lets failure points be found through logs and traces the way a mechanic locates a fault; and it standardizes models, tools, evaluation and approval flows the way connection rules between parts are standardized. And so, as the reliability of the whole vehicle rises, the reliability of the agent's whole job rises.

A harness is not a shackle confining the AI but the connective structure that lets it exert its strength properly. Wearing a seatbelt does not make driving slower. It lets you travel safely even at higher speed.

---

## 2. The test harness in software

A **test harness** is a test environment made up of the stubs and drivers needed to run tests. The term has been in software for a long time, and this definition is that of the ISTQB (International Software Testing Qualifications Board), the body that defines testing terminology standards.

Testing a bank transfer program is a good example. You cannot test every time by moving money in real accounts. So you make fake accounts, a fake DB, fake responses and an automatic checker. **Because using the real world as-is is dangerous, expensive or slow, you make a controllable environment.** That is the spirit of a test harness.

An AI harness inherits this legacy directly. Test in a fake mailbox before sending email to real customers, test in a sandbox payment environment before executing a real payment, run a dry-run before deleting a real server. This is not a developer habit but a required safety device of the AI era. Because AI is non-deterministic (see the sampling in [Part 01](/post/ai-everything-01-llm-and-token)). Not "it looks fine this time" but "it passed 93 out of 100 representative cases" is what is needed.

---

## 3. The lineage: workflow → agent → harness

**Workflow** and **agent** divide on whether code fixes the execution path in advance or the LLM decides it as it goes. Anthropic's "Building Effective Agents" distinguishes the two like this.

| | Workflow | Agent |
|---|---|---|
| Definition | LLMs and tools move along predefined code paths | the LLM decides the course and tool use dynamically by itself |
| Analogy | a washing machine's automatic programme | an expert who looks at the laundry and decides how to wash it |
| Suited to | classifying emails of a fixed format, converting documents | work where the scope of investigation differs each time and the number of tool uses is unknown |

It can be summed up as **workflow when the road is visible, agent when the road has to be found**. Harness engineering is not a matter of insisting on one of the two. It is balancing: fix the repeatable parts as workflow and leave the parts needing judgement to the agent.

And research underwrites this flow.

- [ReAct](https://arxiv.org/abs/2210.03629) (2022) – Reasoning + Acting. Both the paper showing an LLM can alternate reasoning and acting, and the name of that pattern. The model does not only think; it interacts with an external environment.
- [Toolformer](https://arxiv.org/abs/2302.04761) (2023) – Meta's paper, showing a model can learn by itself when and how to call a calculator, search, translation or calendar.

It means AI acquired hands and feet. Older AI answered inside its head only. Now it works a calculator, searches the shelves, opens files and runs programs. With hands and feet there is much more it can do, and at the same time safety training becomes necessary.

---

## 4. Agent = Model + Harness

**Agent = Model + Harness** is the equation that divides an agent into the model and the execution structure outside it. This formula has two sources.

A piece on Martin Fowler's site – the software design and refactoring author – written by Birgitta Böckeler, an author in the AI coding assistant field, divides the harness along two axes.

- **Guides (feedforward)**: they operate before the action. Devices that steer in a good direction in advance. Equivalent to preparing the recipe and ingredients before cooking.
- **Sensors (feedback)**: they operate after the action. Devices that observe the result and have it corrected again. Equivalent to tasting the soup and adjusting the seasoning.

Either alone is not enough. With only feedforward you end up with many rules and no knowledge of whether they were kept; with only feedback you end up correcting only after getting it wrong every time. **A good harness makes it get things wrong less from the start, and lets it fix itself when it does.**

LangChain – both a company that builds a development framework for LLM applications and the name of its open-source project – defines it more boldly. **If it is not the model, it is the harness.** System prompts, tools, MCP (Model Context Protocol, the open standard Anthropic published in 2024 for connecting tools and data to AI), the filesystem, sandboxes, orchestration logic, hooks and middleware are all harness. It looks bold, and this definition is useful in that it moves where responsibility sits.

The most common reaction when AI fails is to suspect the model first. The harness view turns that suspicion into something fixable.

- If the model did not reflect company policy: was the policy document in the context, and was it current?
- If it used a tool wrongly: was the tool description clear, and was too much exposed?
- If it forgot earlier work: was there a progress file or a state record?
- If it declared done without testing: was there a verification loop in the harness?
- If it attempted a dangerous action: were permissions, approvals and sandboxes designed in?
- If the answers differed every time: were the output format, evaluation criteria and examples fixed?

"The model is stupid" cannot be fixed. "The tool description is ambiguous" can be fixed today.

Where the model and the harness each sit within one agent turn looks like this as a picture.

![AI agent execution structure](/images/ai/AI-Harness.excalidraw.svg)

This SVG has the scene data of excalidraw, a diagram editing tool, embedded in it, so opening the file at excalidraw.com loads it ready to edit.

The same flow in text:

```
User → harness    ① prompt (natural language)
inside harness    load CLAUDE.md · expand @files · Skill metadata · assemble tool schemas · run Hooks
                  ← it moves before the LLM call too
harness → LLM     ② assembled request (JSON string) – if middleware exists, forwarded after logging/routing/caching
LLM server        ★ here, string → tokens
LLM → harness     ③ output token = tool_use
harness           ④ permission gate (allow / ask / deny)
harness → tool    ⑤ actual execution (MCP / local tools)
tool → harness    ⑥ result
harness → LLM     ⑦ wrapped as an observation message and re-requested
LLM → harness     ⑧ final answer
harness → User    ⑨ report the result
```

How each stage actually runs is covered in detail in [Part 03](/post/ai-everything-03-agent-loop).

---

## 5. The CPU and operating system analogy

**A raw LLM is like a CPU with no operating system.** It can compute, but on its own it cannot reliably finish the user's work. The harness is the operating system that turns that CPU into a computer for real work.

| Computer architecture | LLM agent structure | Plain explanation |
|---|---|---|
| CPU | LLM, model weights | the engine that computes and reasons. Powerful, but cannot finish work alone |
| RAM | context window | the material spread on the desk right now. Fast, but limited in space |
| Hard disk | vector DB, documents, files, long-term storage | the warehouse for long keeping. Has to be searched and fetched when needed |
| Device drivers | tool integrations, MCP, APIs, file I/O | the passage by which the model touches the outside world |
| Operating system | the agent harness | manages memory, tools, permissions, error recovery, verification, stop conditions |
| Applications | agent behaviour, or the product | the result the user actually experiences |

This is of course an introductory map, not a perfect technical account. The context window is not freely randomly accessible like real RAM, and a vector DB is not a simple store like a hard disk. Still the big picture is clear. The better the OS, the far more useful a computer the same CPU becomes.

The same picture shortened to one sentence: even an excellent cook makes mistakes in a kitchen where the fridge has no labels, the knives are blunt and the orders are jumbled. **The model is the cook, the harness is the kitchen.**

---

## 6. The five elements of a minimal harness

A **minimal harness** is the minimum set of components a configuration must have to be called a harness. Even a very small personal project can be called a harness if it has these five.

1. **A goal document**: what has to be done, and what must not be done
2. **A context map**: where the needed documents and data are
3. **A tool list**: which tools may be used and which are forbidden
4. **A verification method**: tests or a checklist that confirm whether the result is right
5. **A recording method**: handing what was done and what remains to the next session

---

## 7. The twelve elements of a production-grade harness

A **production-grade harness** is one at the scale that goes into a real product or organizational work. At this stage the parts multiply.

1. **Goals and success criteria**: decide what counts as the end (the order sheet)
2. **Orchestration loop**: repeat model call, tool execution, result incorporation (the workflow chart)
3. **Tool layer**: search, file reading, API calls, browser control (hands and feet)
4. **Memory**: keep information within and beyond the session (the work notebook)
5. **Context management**: select only the material to look at now (tidying the desk)
6. **Prompt composition**: assemble system instructions, tool descriptions, memory and the request (the meeting agenda)
7. **Output parsing**: distinguish an answer from a tool call (the receptionist)
8. **State and checkpoints**: resume after interruption, roll back, debug (the save button)
9. **Error handling**: retry, recover, request human intervention (the support centre manual)
10. **Guardrails and permissions**: block dangerous actions and put approval procedures in place (the access card)
11. **Verification loop**: tests, reviews, screenshots, LLM judges (the inspector)
12. **Observability and division of labour**: logs, cost, latency, subagent collaboration (CCTV and the org chart)

This does not mean more is better. Training wheels and a helmet are enough for a child's bicycle, while a car on the motorway needs brakes, airbags, ABS, a dashcam and maintenance records. **The higher the risk** – customer data, payments, deployment, legal documents – the more the twelve become necessary.

---

## 8. Components outside the model – memory, skills, protocols

**Components outside the model** are the elements the harness keeps outside rather than putting inside the model: the three axes of memory, skills and protocols, and the mediating devices between them. It is easy to think of an agent as "a model with a few tools attached," but the structure from the harness view is closer to the opposite. **Keep the model itself as thin as possible, and put outside it the memories, procedures and rules the model has no need to hold by itself every time.** The harness combines these outside elements at execution time.

```
                 ┌─ memory     (what to remember)
harness ─────────┼─ skills     (how to handle it)
(combiner)       └─ protocols  (how to interact)
                      │
                 mediating devices
                 (sandboxing · observability · compression · evaluation · approval loops · subagent orchestration)
                      │
                    model
```

The first axis is memory, that is, state there is no need to keep holding.

- **Working Context**: the state needed for the current task. Material spread on the desk
- **Semantic Knowledge**: meaningful knowledge and concepts. The warehouse of frequently consulted domain knowledge
- **Episodic Experience**: past experience and events. Previous meeting minutes and work history
- **Personalized Memory**: personalized memory. The preferences a regular shop remembers

All four are "memory," and they must not be handled the same way. The details are covered in [Part 09](/post/ai-everything-09-memory-longrunning).

The second axis is skills, that is, repeatable procedural knowledge.

- **Operational Procedures**: operating procedures. A shop's standard work order
- **Decision Heuristics**: criteria for judgement. An experienced employee's knack for deciding
- **Normative Constraints**: normative constraints. Company rules that must be kept

Prompts and skills differ. A prompt is an instruction given at the time; a skill is a recurring way of working **kept in reusable form**.

The third axis is protocols, that is, the agreements of interaction.

- **Agent-to-User**: between agent and user. How an employee explains to a customer and gets confirmation
- **Agent-to-Agent**: between agent and agent. How teammates divide work and hand it over
- **Agent-to-Tools**: between agent and tools. The rules to keep when using equipment

And the mediating devices control how the outside elements are met.

- **Sandboxing**: a safe execution space. A practice area rather than the real shop
- **Observability**: observing state and flow. CCTV and work records
- **Compression**: compressing long information. A handover memo summarizing long minutes
- **Evaluation**: evaluating results. The quality inspection sheet
- **Approval Loops**: approval procedures. The sign-off chain
- **Sub-Agent Orchestration**: coordinating sub-agents. A team lead and the division of roles

So where does a new feature go? Wanting to put a new capability into an agent and immediately tacking it onto the prompt or attaching one more tool makes the harness complex fast. Look at the feature's character first and the location is settled. State that has to be kept stably goes to memory; a procedure or knack used repeatedly goes to skills; rules of interaction with users, agents and tools go to protocols; and devices that control and roll back the flow go to the mediating devices. **The core of harness design lies in deciding "what to take out of the model and structure" rather than "what else to make the model do."**

---

## 9. The difference between a prompt and a harness

A **prompt** is a request made to the model in words, and a **harness** is the structure that actually executes or blocks that request. Prompts matter. But saying "never make a mistake" does not make mistakes disappear, saying "maintain security" does not block secret leakage, and saying "test it" does not make tests actually run.

"Drive carefully" is necessary but not sufficient. Lanes, traffic lights, brakes, seatbelts, a driving licence, insurance and a maintenance system have to be there too. A prompt is what you say to the driver; a harness is the roads, signals, vehicle, insurance and maintenance system. Words are taken as reference and can be disobeyed; a harness executes or blocks. Words apply only to this answer; a harness is repeatable next time. This distinction between **request and enforcement** continues into hooks and permissions in [Part 10](/post/ai-everything-10-safety-governance).

---

## 10. Defining harness engineering

**Harness engineering** is designing the entire environment an agent works in – context, tools, permissions, state, error recovery, verification, records. Distinguishing three levels:

- **Prompt engineering**: how to say it. Writing the work instruction
- **Context engineering**: what to show. Tidying the material on the desk
- **Harness engineering**: in what environment to have it work. Building the office, tools, approvals and inspection system

Harness engineering contains the first two, and adds tool execution, permissions, state, error recovery, verification and records on top. Most users are at the stage of tuning an existing harness to their own environment, and that is complete harness engineering too.

```
default harness as-is → tuning settings → writing Skills/Hooks → shipping Plugins → building your own harness with an SDK
     (most people here)                                              (product teams)
```

There is one more question to ask before designing. Not "which harness shall I attach" but **"is this environment easy to attach a harness to (harnessability)?"** With clear types, schemas and input formats, computational sensors catch errors fast. With distinct module boundaries and responsibilities, the range the agent has to fix can be narrowed. With tests and linters already in place, results can be confirmed as signals rather than words. With current documentation and examples, the agent can read the team's tacit knowledge. With kind logs and error messages, it gets clues to fix itself after a failure.

Conversely, stale rules, tangled dependencies, absent tests and out-of-date documentation make a harness hard to build. The more an environment is like this the more a harness is needed, and the harder it is to build at the same time. Good harness engineering is not only polishing agent settings but also tidying the work environment itself.

---

## 11. Summary

A harness was originally a device that binds, supports and connects, and it ran from car wiring through software testing to AI. Agent = Model + Harness; if it is not the model, it is all harness. A harness has two axes, Guides (control beforehand) and Sensors (verification afterwards), and either alone is not enough. A raw LLM is a CPU with no OS and the harness is that OS. The five minimal elements are a goal document, a context map, a tool list, a verification method and a recording method, and the twelve production-grade elements become necessary as risk rises. More is not better. The core design question is what to take out of the model and structure, and the answer to that is memory, skills, protocols and the mediating devices. A prompt is words and a harness is structure. Words matter, and structure is what makes them repeatable.

---

## Further reading

- LangChain, *The Anatomy of an Agent Harness* – <https://www.langchain.com/blog/the-anatomy-of-an-agent-harness>
- Birgitta Böckeler, *Harness engineering for coding agent users* – <https://martinfowler.com/articles/harness-engineering.html>
- Anthropic, *Building Effective AI Agents* – <https://www.anthropic.com/engineering/building-effective-agents>
- ISTQB Glossary, *test harness* – <https://glossary.istqb.org/en_US/term/test-harness>
- Kim Dong-hak, 《하네스 엔지니어링 백과사전》 (*Encyclopedia of Harness Engineering*), chapter 1 – <https://wikidocs.net/346793>

---

Next: [03. Anatomy of the agent loop](/post/ai-everything-03-agent-loop)
Previous: [01. LLMs and tokens](/post/ai-everything-01-llm-and-token)
