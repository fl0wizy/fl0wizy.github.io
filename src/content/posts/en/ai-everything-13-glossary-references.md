This piece is the whole series' cheat sheet. It is the map to come back to when you get stuck while reading – closer to a signpost that sends you back to the core concepts than to a technical dictionary.

---

## Part 1. The one-page cheat sheet

A harness in one sentence: a harness is the execution environment that bundles the goals, material, tools, permissions, verification, records and human approvals an AI needs to work. Shorter still: the working environment that makes an AI guess less and work more safely and more repeatably.

One formula runs through this series.

```
Agent = Model + Harness
```

The model is the clever person, and the harness is the office that person can work in.

The harness's seven elements, each with a question attached for checking:

- **Goal**: deciding what to make. What is the final deliverable?
- **Context**: the material the AI has to see. Which documents and information will be given first?
- **Tools**: the AI's hands and feet. Which tools are needed, and how far will they be allowed?
- **Intermediate deliverable**: the interim result before the final one. What will be checked before the draft?
- **Verification**: the criteria for a good result. What has to be satisfied for the result to be acceptable?
- **Permissions and approval**: the point where a person takes responsibility. Who confirms before sending, publishing, submitting or deleting?
- **Records and improvement**: memory for next time. What will be saved and fixed next time?

For a small job, just the three of goal, material and verification criteria already make it far more stable.

Seven questions to check before handing work over:

```
1. what is this job's final deliverable?
2. what material must the AI see?
3. what should the AI ask first when it does not know?
4. what intermediate deliverable comes before the final result?
5. what criteria confirm whether it is a good result?
6. where must a person approve?
7. what will be recorded to do better next time?
```

Whatever goes unanswered here is what the AI ends up guessing.

Five failure signals telling you to look at the harness rather than the prompt:

- The same request gives a different result each time: the goal and criteria are vague.
- The answer is plausible and hard to trust: grounding material and verification criteria are insufficient.
- Fixing the final result takes more time: there is no intermediate deliverable.
- It tries to go ahead with dangerous actions: there is no permission and human approval point.
- It repeats the same mistake next time: there is no record and improvement loop.

Harness thickness matches the weight of the work. Brainstorming ideas or tidying personal notes goes thin, sharing team meeting minutes medium, answers sent to customers medium to thick, submitting a business plan thick, and payments, deletion, deployment and legal judgements very thick.

There are judgements to leave to people too. Final submission creates responsibility, external sending has a real effect on the recipient, payments and contracts carry financial and legal responsibility, personal data handling is sensitive, deletion and deployment are hard to reverse, and strategic decisions need context and accountable judgement. An AI can make a draft, and **responsible actions have to be confirmed by a person.**

The difference between prompt-centred and harness-centred: prompt-centred focuses on getting this answer right, keeps rewording the sentence, ends lucky if the result is good, and re-requests on failure. Harness-centred builds a structure repeatable next time, organizes the goal, material and verification criteria, records why it was good, and leaves the reason for failure and improves.

A request template to copy and use as a default:

```
아래 작업을 바로 최종 결과로 만들지 말고, 작은 하네스 흐름으로 진행해줘.

1. 먼저 목표와 필요한 자료를 확인해줘.
2. 정보가 부족하면 추측하지 말고 질문해줘.
3. 최종 결과 전에 중간 산출물을 먼저 만들어줘.
4. 결과를 검증할 기준을 3~5개 제안해줘.
5. 사람이 승인해야 할 지점을 따로 표시해줘.
6. 마지막에는 다음번에 개선할 기록을 남겨줘.

작업 주제:
[여기에 내가 맡기고 싶은 일을 적는다]
```

The last question to check is one. Am I demanding only an answer from the AI right now, or am I building the environment for the AI to work in?

---

## Part 2. Glossary

Each entry runs term (everyday analogy), explanation, then what to watch.

### Basic concepts

- **Model** (the engine): the central AI that understands language and produces the next action or answer. Do not think changing the model alone solves everything.
- **Agent** (an employee given work): an AI system that performs several stages towards a goal and uses tools. Do not confuse it with a simple chatbot. An agent acts.
- **Agent = Model + Harness** (a work vehicle with an engine in it): the state of a model combined with a harness, doing real work. Model performance and harness quality have to be looked at separately.
- **Harness** (the whole office the employee works in): the external structure making an agent work safely and repeatably. One prompt is not the whole harness.
- **Harness Engineering** (designing how the office runs): designing the environment, tools, permissions, verification and records the model works in. Not the skill of making an AI do work but the skill of designing the conditions of work.
- **Harnessability** (a tidy kitchen): the degree to which an environment is easy to attach a harness to. Look not only at agent settings but at documentation, tests, module boundaries and logs.
- **Guide** (the notice before work): the instructions and material that help it go in a good direction before acting. With guidance alone and no checking device, you do not know whether it was kept.
- **Sensor** (the check after work): the inspection that observes the result after acting and has it corrected. With sensors alone you only fix after getting it wrong every time.
- **Feedforward** (preparing the recipe before cooking): control beforehand that reduces the chance of failure before starting. Making it readable and followable by the model matters more than writing many rules.
- **Feedback** (tasting and adjusting the seasoning): control afterwards that has the result corrected. Feedback too late makes correction expensive.

### Context and tokens

- **Prompt** (the work instruction): the instruction given to the AI. Instructions alone are not enough.
- **Context** (the material on the desk): the whole of the information the AI can currently see. More is not always better.
- **Context Window** (the whiteboard space during a meeting): the token range the model can read at once. When the space fills, old content is pushed out or compacted.
- **Context Engineering** (tidying the desk and arranging the material): arranging instructions, documents, memory and tool information appropriately. A broader concept than polishing prompt sentences.
- **Context Rot** (a desk that has got messy): the phenomenon of old conversation, long logs and unnecessary tool results accumulating and clouding judgement. The fix is not putting more in but summarizing, saving to files and searching when needed.
- **Lost in the Middle** (the middle of long minutes): the phenomenon of performance dropping when the relevant information is in the middle. Put what matters at the front or the back.
- **Token** (a fragment of a sentence): the unit of information the model reads and writes. Not the same as character count. It differs by model and Korean eats more.
- **Compaction** (summarizing long minutes): compressing old conversation and observations. Summarizing is always lossy. Leave important decisions in a file.
- **Progressive Disclosure** (taking out only the needed documents, in stages): the method of showing only the name and description first and reading the body when needed. Do not put everything in from the start.

### Tools and connections

- **Tool** (a button in the company system): an external capability the AI can call. Many of them can increase confusion rather than capability.
- **Tool Calling** (requesting work from a colleague): the method by which the model requests search, file reading, code execution and so on. The result has to be well packaged and returned to the model.
- **Client tool** (equipment in my own office): a tool that runs on my computer or application. The user can control all of it.
- **Server tool** (an outsourced service): a tool that runs on the provider's infrastructure. My hooks cannot block it.
- **MCP** (a USB-C port for AI): Model Context Protocol. The open standard Anthropic published in 2024 for connecting external tools and data in a standard way. The more connections, the more permissions and security also have to be designed.
- **A2A** (the inter-team contact network): Agent2Agent Protocol. The open standard Google led, for an agent to hand work to and coordinate with other agents. MCP is tool connection; A2A is agent collaboration.
- **RAG** (the librarian finding the book for you): Retrieval-Augmented Generation. The method of searching external documents before answering and putting them into the context. Poor retrieval quality means poor answer quality.
- **Vector DB** (a warehouse searched by meaning): Vector Database. A store that searches by the meaning of documents. Storing well does not mean retrieving well.
- **Embedding** (a document's meaning coordinates): text turned into a numeric vector in a meaning space. Understanding it as a "meaning address" is enough at first.

### Instruction files and skills

- **AGENTS.md** (the handover memo): the project rules and guidance file of the OpenAI/Codex side. Written long it goes unread and stale rules pile up.
- **CLAUDE.md** (the project memo for Claude): the rules and commands Claude Code refers to repeatedly. It is context, not a security device.
- **`.claude/`** (the project's shared drawers): the folder for project agents, skills and settings. Distinguish it from personal settings (`~/.claude/`).
- **Skill** (a manual for recurring work): a small execution unit bundling instructions, reference material and scripts. Not merely a long prompt. When it runs is designed too.
- **Skill Description** (the sign at the door): the wording that helps the model judge when to use a Skill. Vague and it does not run, or runs in the wrong place.
- **Hook** (a sensor light): a procedure that runs automatically on a particular event. Important recurring procedures belong in a hook, not in a prompt.
- **Middleware** (the checkpoint in between): a device that interposes before and after model calls and tool execution to inspect, modify and record. Too much of it makes the flow complex and debugging hard.
- **Plugin** (the standard operating package): a distribution unit bundling Skills, Hooks, Subagents and MCP. An untrusted Plugin is far more dangerous than a single document.

### Agent structure

- **Orchestrator** (the team lead): the coordinator dividing the work of several stages and agents and combining the results. Criteria for combining are needed as much as for dividing.
- **Handoff** (passing to a specialist department): one agent passing work to another specialist agent. Make sure core context does not drop out in the passing.
- **Subagent** (an external investigator): a lower-level agent given independent work, returning only the result. Not suited to work needing continuous coordination.
- **Fire-and-forget** (sending someone on an errand and receiving only the result): a Subagent's basic character. Insufficient when midway discoveries need sharing.
- **Agent Teams** (a collaborating team in the same room): a structure where a team lead and several agents collaborate continuously through a shared task list. Excessive for simple work.
- **Shared Task List** (the joint checklist): a list showing waiting, in-progress and done states along with dependencies. Diverge from the real state and the whole team moves wrongly.
- **Context Boundary** (the work partition): the criterion dividing which information has to be seen together and which can be detached. Divide by role name and handover loss appears.
- **ReAct** (moving improvisationally while watching): Reasoning + Acting. The method of repeating think-act-observe, and the name of a 2022 paper. Flexible and costly.
- **Plan-and-Execute** (plan then execute): making a plan first and then executing stage by stage. Favourable for work with a clear structure.
- **Prompt Chaining** (relay work): the previous stage's result passed as the next stage's input. Wrong at the front and the back wobbles too.
- **Routing** (classification at the reception desk): looking at the request and sending it to the right model, tool or agent. Vague classification criteria send it to the wrong person.
- **Parallelization** (several people preparing at once): processing independent work simultaneously. Dangerous when merging is hard or the same file is edited simultaneously.

### Evaluation and verification

- **Eval** (an exam paper for AI): short for evaluation. The procedure for testing and scoring AI results. Repeatable criteria are needed, not one or two examples.
- **Computational Sensor** (a thermometer, a spellchecker): fast, deterministic checks such as tests, linters and type checking. Do not expect it to judge meaning and intent.
- **Inferential Sensor** (a teacher marking an essay): a check that reads context and judges, such as an LLM review. Slow, expensive and wobbly in its results.
- **Grader** (the exam marker): the function or model assigning the evaluation score. Markers get things wrong too.
- **Rubric** (the scoring sheet): the criteria sheet distinguishing good results from bad. Per-item criteria beat "good/bad."
- **Generator** (the drafter): the role making answers, code, plans and documents. With generation alone and no review, quality wobbles.
- **Evaluator** (the reviewer): the role confirming whether the result satisfies the criteria. Looks by concrete criteria, not "it looks fine."
- **Regression Fixture** (the set of retest questions): the test set confirming expected behaviour holds after a change. Prevents things quietly breaking after an update.
- **Artifact** (receipts, photos, evidence of work): a reviewable deliverable such as a plan, a screenshot or a test result. Evidence matters more than the words "it is done."

### Safety and operations

- **Guardrail** (a road guardrail): the rules blocking dangerous or wrong actions. Loose is dangerous and tight stops work getting done.
- **Permission** (the access card): the permission deciding which tools and files the AI may use. Dividing into allow / ask / deny makes it easy to understand.
- **Sandbox** (the sandpit): an execution environment isolated so the real system is not broken. Be careful with secrets even inside a sandbox.
- **Prompt Injection** (a fake boss's instruction inside a document): an attack in which external content plants malicious instructions in the AI. Do not trust web pages and tool results unconditionally.
- **Observability** (CCTV and the instrument panel): the way of seeing system state through logs, metrics and traces. Invisible failures are hard to fix.
- **Trace** (the record of the route taken): the record of which stages and tools were passed through. Important for finding cost, latency and error causes.
- **Audit Log** (the approval history): the record of who did what, when and why. Looking at results alone does not give the reason.
- **Harness Entropy** (an untidied house): the phenomenon of getting complicated as temporary code, duplicate documents and stale rules pile up. The more throughput, the more a tidying loop is needed.
- **Harness Debt** (deferred repairs): the debt accumulating as harness files go stale. As serious as technical debt, with no measurement tools.
- **Garbage Collection** (regular house tidying): clearing unneeded temporary structures, stale instructions and duplicate documents. Judged by criteria, not deleted indiscriminately.

### Long-running work

- **Progress File** (the shift handover notebook): the record of long-running work's progress. Leave what to continue as a file instead of saying "continue."
- **Feature List** (the completion checkboxes): the list of features to complete and whether they pass. Managed so feature descriptions cannot be erased or changed.
- **Context Reset** (starting a new meeting): starting a new session reading only the handover documents. Without handover documents it is just amnesia.
- **Context Anxiety** (hurrying as the meeting ends): the tendency to hurry to wrap up on feeling the context is full. A structure for passing to a new session at the right time is needed.
- **Worktree** (a separate workshop): the Git feature dividing the same repository into several workspaces. Keeps parallel agents from stepping on each other.
- **Checkpoint** (a temporary save): a device that tracks edits during a session so they can be reverted. It does not replace Git.

### Design judgements

- **Harness Thickness** (the thickness of the checklist): the degree of leaving logic to the model versus controlling it with code. There is no right answer; it differs with risk and model maturity.
- **Scaffolding** (scaffolding on a building site): the structure temporarily propping up where the model is weak. It has to come down eventually – one at a time, though.
- **Load-bearing** (a load-bearing wall): the harness elements actually supporting performance. Something that looks decorative may be a safety device.
- **ACI** (the employee's workbench): Agent-Computer Interface. The interface where an agent meets the computer. A human UI is not optimal for an agent.
- **Agent Experience (AX)** (the recipes and order sheets for staff): the experience of an agent reading screens, state, errors and logs as meaning and acting on them. Do not assume a screen that looks pretty to a person is easy for an agent to read.
- **Human UX** (the customer's menu): the experience of a person handing work over, understanding it, and being able to approve, stop and correct. Do not remove control on the grounds that the AI handles it.
- **Operator UX** (the manager's dashboard): the experience of an operator managing execution state, approvals pending, failures, cost and logs. Defer the operations screen and you learn causes of failure late.
- **Black-box Harness** (an outsourced service whose insides you cannot see): a harness whose internal behaviour and memory structure are invisible. Convenient, and portability and ownership have to be checked.

---

## Part 3. The reference map

### Korean books

- **Kim Dong-hak, 《하네스 엔지니어링 백과사전》** (*Encyclopedia of Harness Engineering*, WikiDocs, v1.86) – <https://wikidocs.net/book/19689>
  Covers harness engineering broadly in 15 chapters plus appendices A–O. Each chapter ends with everyday-life exercises such as preparing a family trip or a moving checklist, and the appendices hold a harness maturity checklist, work harness design cards, adoption failure cases, application examples by job role, 71 Q&A items, a workshop plan and a practice kit. A paid ebook.
  Practice tooling: the `/harness-lab` skill for Claude Code and `$harness-lab` for the Codex CLI

### Official documentation – Anthropic

- *Building Effective AI Agents* – <https://www.anthropic.com/engineering/building-effective-agents>
- *Effective context engineering for AI agents* – <https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents>
- *Writing effective tools for AI agents* – <https://www.anthropic.com/engineering/writing-tools-for-agents>
- *Effective harnesses for long-running agents* – <https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents>
- *Demystifying evals for AI agents* – <https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents>
- *Harness design for long-running application development* – <https://www.anthropic.com/engineering/harness-design-long-running-apps>
- *Building agents with the Claude Agent SDK* – <https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk>
- *Equipping agents for the real world with Agent Skills* – <https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills>
- *Introducing the Model Context Protocol* – <https://www.anthropic.com/news/model-context-protocol>

### Official documentation – Claude Code

- Overview – <https://code.claude.com/docs/en/overview>
- Configure permissions – <https://code.claude.com/docs/en/permissions>
- Automate workflows with hooks – <https://code.claude.com/docs/en/hooks-guide>
- Create custom subagents – <https://code.claude.com/docs/en/sub-agents>
- Orchestrate teams of Claude Code sessions – <https://code.claude.com/docs/en/agent-teams>
- Connect Claude Code to tools via MCP – <https://code.claude.com/docs/en/mcp>
- Settings – <https://code.claude.com/docs/en/settings>
- How Claude remembers your project – <https://code.claude.com/docs/en/memory>
- Checkpointing – <https://code.claude.com/docs/en/checkpointing>
- Interactive mode – <https://code.claude.com/docs/en/interactive-mode>
- CLI reference – <https://code.claude.com/docs/en/cli-reference>
- Agent SDK overview – <https://code.claude.com/docs/en/agent-sdk/overview>
- Extend Claude with skills – <https://docs.anthropic.com/en/docs/claude-code/skills>
- Create plugins – <https://docs.anthropic.com/en/docs/claude-code/plugins>
- Hooks reference – <https://docs.anthropic.com/en/docs/claude-code/hooks>

### Official documentation – OpenAI

- *Harness engineering: leveraging Codex in an agent-first world* – <https://openai.com/index/harness-engineering/>
- *Unrolling the Codex agent loop* – <https://openai.com/index/unrolling-the-codex-agent-loop/>
- Agents SDK – <https://developers.openai.com/api/docs/guides/agents>
- Using tools – <https://developers.openai.com/api/docs/guides/tools>
- Function calling – <https://developers.openai.com/api/docs/guides/function-calling>
- Web search – <https://developers.openai.com/api/docs/guides/tools-web-search>
- MCP and Connectors – <https://developers.openai.com/api/docs/guides/tools-connectors-mcp>
- Structured Outputs – <https://developers.openai.com/api/docs/guides/structured-outputs>
- Codex: AGENTS.md – <https://developers.openai.com/codex/guides/agents-md>
- Codex CLI – <https://developers.openai.com/codex/cli>
- Codex: Agent Skills – <https://developers.openai.com/codex/skills>
- Codex: Subagents – <https://developers.openai.com/codex/subagents>
- Codex: Hooks – <https://developers.openai.com/codex/hooks>
- Codex: Worktrees – <https://developers.openai.com/codex/app/worktrees>
- Codex App Server – <https://developers.openai.com/codex/app-server>
- Agents SDK Tracing – <https://openai.github.io/openai-agents-python/tracing/>
- Agents SDK Handoffs – <https://openai.github.io/openai-agents-python/handoffs/>

### Official documentation – Google

- *An important update: Transitioning Gemini CLI to Antigravity CLI* – <https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/>
- *I/O 2026 developer highlights: Antigravity, Gemini API, AI Studio* – <https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/>
- *Announcing the Agent2Agent Protocol (A2A)* – <https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/>
- *Developer's Guide to AI Agent Protocols* – <https://developers.googleblog.com/en/developers-guide-to-ai-agent-protocols/>
- Google PAIR (People + AI Research), *People + AI Guidebook* – <https://pair.withgoogle.com/guidebook/>

### Protocols and standards

- Model Context Protocol – <https://modelcontextprotocol.io/docs/getting-started/intro>
- A2A Protocol – <https://a2a-protocol.org/latest/>
- AGENTS.md open format – <https://agents.md/>

### Papers and research

- **ReAct** (Yao et al., 2022): alternating reasoning and acting – <https://arxiv.org/abs/2210.03629>
- **Toolformer** (Schick et al., 2023): the model learning when to call tools – <https://arxiv.org/abs/2302.04761>
- **Reflexion** (Shinn et al., 2023): improving by keeping verbal feedback as memory – <https://arxiv.org/abs/2303.11366>
- **Self-Refine** (Madaan et al., 2023): iterative improvement through self-feedback – <https://arxiv.org/abs/2303.17651>
- **Lost in the Middle** (Liu et al., 2023): the position of information changes performance – <https://arxiv.org/abs/2307.03172>
- **SWE-bench** (Jimenez et al., 2023): a benchmark of solving real GitHub issues – <https://arxiv.org/abs/2310.06770>
- **SWE-agent** (Yang et al., 2024): the Princeton team's agent resolving GitHub issues with code changes. The ACI changes performance considerably – <https://arxiv.org/abs/2405.15793>
- **AgentBench** (Liu et al., 2023): evaluating LLMs as agents – <https://arxiv.org/abs/2308.03688>
- **Voyager** (Wang et al., 2023): an autonomous agent in an open-ended environment – <https://arxiv.org/abs/2305.16291>
- **ACON** (Kang et al., 2025): Agent Context Optimization. Optimizing context compression for long-horizon agents – <https://arxiv.org/abs/2510.00615>
- **Human-AI Interaction Guidelines** (Amershi et al., CHI 2019): 18 principles of AI UX – <https://doi.org/10.1145/3290605.3300233>
- **UXAgent** (Wang et al., 2025): simulating usability testing with LLM agents – <https://arxiv.org/abs/2504.09407>

### Security and governance

- OWASP (the non-profit for web and application security), *Top 10 for Large Language Model Applications* – <https://owasp.org/www-project-top-10-for-large-language-model-applications/>
- NIST (the US National Institute of Standards and Technology), *AI RMF: Generative AI Profile (AI 600-1)* – <https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf>
- Simon Willison (a Django co-creator and an author in the LLM security field), the *Prompt injection* series – <https://simonwillison.net/series/prompt-injection/>

### Frameworks and company blogs

- LangChain (the company behind the LLM application development framework), *The Anatomy of an Agent Harness* – <https://www.langchain.com/blog/the-anatomy-of-an-agent-harness>
- LangChain, *Improving Deep Agents with harness engineering* – <https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering>
- LangChain, *Better Harness: A Recipe for Harness Hill-Climbing with Evals* – <https://www.langchain.com/blog/better-harness-a-recipe-for-harness-hill-climbing-with-evals>
- LangChain, *Plan-and-Execute Agents* – <https://www.langchain.com/blog/planning-agents>
- Birgitta Böckeler (an author in the AI coding assistant field at ThoughtWorks), *Harness engineering for coding agent users* (martinfowler.com) – <https://martinfowler.com/articles/harness-engineering.html>
- Mitchell Hashimoto (HashiCorp co-founder, Ghostty developer), *My AI Adoption Journey* (5 Feb 2026) – an early piece using the harness view explicitly

### Background concepts

- Synopsys (the semiconductor design software company), *What is Wiring Harness?* – <https://www.synopsys.com/glossary/what-is-wiring-harness.html>
- ISTQB (the International Software Testing Qualifications Board) Glossary, *test harness* – <https://glossary.istqb.org/en_US/term/test-harness>

---

## Part 4. Final summary – this series in 8 sentences

1. **Agent = Model + Harness.** There are fewer problems solved by changing the model alone than you would think.
2. A raw LLM is a CPU with no operating system. It computes, and cannot finish work alone.
3. Context is not an infinite warehouse but a limited desk. Put a lot on it and what matters is buried.
4. What has to happen every time belongs in a hook, not in guidance. A request and enforcement are different.
5. It is not about giving many tools but about giving the tool needed now in an understandable way.
6. Evidence matters more than the words "it is done." Tests, screenshots, diffs, booking numbers.
7. Scaffolding does not build the building. But without it you cannot reach the upper floors. And it has to come down eventually.
8. Good AI use starts from a good question, and a lasting AI system is completed by a good harness.

---

Previous: [12. Real cases and the ecosystem](/post/ai-everything-12-cases-ecosystem)
