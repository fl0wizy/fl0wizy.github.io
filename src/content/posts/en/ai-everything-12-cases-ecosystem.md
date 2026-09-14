This instalment is the case study. It starts from why ACI (Agent-Computer Interface) research is the grounds for harness engineering, then reads the real harnesses of OpenAI Codex, Anthropic, Vercel, GitHub, Cursor, Microsoft and Replit one by one. After that it organizes how the harness ecosystem splits into layers, and where the phrase "harness engineering" came from.

---

## 1. ACI (Agent-Computer Interface)

The **ACI (Agent-Computer Interface)** is the interface by which an agent handles a computer, corresponding to a UI for people. It is a concept proposed by a Princeton research team while building an agent that resolves GitHub issues with code changes, organized in the [SWE-agent paper](https://arxiv.org/abs/2405.15793). The question the paper poses is simple. Does an agent also need a working interface suited to an agent?

People have an IDE. Syntax highlighting, autocomplete, a file tree, error underlines, search, a debugger. But is giving an agent a human IDE as-is the best thing? The paper's answer was no. It showed that an interface designed for agents changes performance considerably.

Raw tool access is not always a good interface either. Give an agent plain `bash` and it can do anything, and reading a 5,000-line file wholesale with `cat` explodes the context, editing with `sed` leaves no way to confirm the result, and search results pouring out hundreds of lines leave it not knowing what matters.

A good interface divides from a bad one like this.

- Rather than dumping search results, it narrows to the needed range and shows that.
- Rather than making it read whole files indiscriminately, it shows the needed location and its surrounding context.
- Rather than letting errors be found late after an edit, it reports errors right after the edit.
- Rather than leaving the cause of a test failure unclear, it provides the failure location and cause readably.
- Rather than leaving the result of the previous action hazy, it shows the current state and the next action clearly.

The interface makes the agent's working habits. This is harness engineering's **research grounding.** Even with the same model, changing the ACI changes performance. Which means results can be changed without changing the model.

---

## 2. The frame for reading the cases

Each case is organized along four question axes. What difficulty was it trying to solve (the problem)? What context, tools, memory, verification, permissions and state management were used (the harness design)? What harness principle does this case show (what to learn)? And where can a similar structure be applied (application)?

---

## 3. OpenAI Codex – a development team where people do not write code directly

The case of a three-person team developing for about five months led by Codex, OpenAI's coding agent, producing large-scale production code and 1,500 PRs. By harness element:

- **Context**: structured documents inside the repository, not a giant manual
- **Tools**: standard development tools, local scripts, the GitHub CLI, review tools
- **Verification**: agent review, tests, UI verification, logs, metrics and traces
- **State**: planning documents, progress, PRs, git history
- **Observability**: configured so Codex can see the UI and the observability stack directly
- **The human role**: setting intent, reviewing and improving the environment rather than coding directly

The way of operating is distinctive too. They run an agent-to-agent code review loop, with humans intervening only on security and architecture decisions. Codex scans in the background and, on finding drifting code, automatically submits a refactoring PR and goes as far as auto-merge. The core sentence they left is "give a map, not a 1,000-page manual." Meaning: leave only the core architectural constraints in machine-readable files.

This case's most important structural lesson is that **the repository is the System of Record.** Knowledge lives in the repository, not in the chat window.

```
X explain in chat → gone when the session ends
O record in the repository's docs/ → the next agent reads it too
```

Throughput changes the merge philosophy too. At low throughput, large tasks are held for a long time, people check most things directly, the reasons for changes stay in conversation, problems after merge are reverted in big chunks, and review becomes the bottleneck. At higher throughput, small tasks are divided often, automated tests and linters filter first, the reasons for changes stay in PRs, diffs, traces and progress files, reverts and follow-up fixes happen in small units, and people concentrate on architecture, security and product judgement.

What to take to general work:

```
□ leave the knowledge the AI will refer to as documents in the workspace, not in the chat window
□ divide into small plans and verifiable units rather than one large instruction
□ connect tests, logs, screens and checklists so the AI can check results itself
□ reflect what a person points out repeatedly into the harness from next time
```

---

## 4. Anthropic long-running agents – agents working across sessions

A structure where an initializer agent prepares the environment, run scripts and feature list, state is managed with a progress file, a feature list and git history, and the next coding agent reads the earlier records and continues. State is updated only after confirming the feature actually works. In human terms, shift handover, the patient chart and the work log.

The file set left behind:

```
goal.md           what has to be completed
feature_list.json done/not-done items (passes: true/false)
progress.md       what was done today and what remains
runbook.md        how to run it
decisions.md      important decisions and their reasons
```

The details are in [Part 09](/post/ai-everything-09-memory-longrunning).

---

## 5. Anthropic Research – a multi-agent research system

A lead agent analyses the whole question and makes a plan, then subagents investigate independent directions in parallel. The tools are web, Workspace and integrations search, with result integration and quality checking attached at the end. The thing to watch is cost. Token usage **can be larger** than a single agent's.

When to use it:

```
O the directions of investigation divide into several
O each direction can proceed independently
O sequential investigation takes too long
O there is someone responsible for integrating results at the end
```

When not to use it:

```
X the work is short and simple
X there is a high chance several agents investigate the same information redundantly
X the cost of integrating results is greater
X tools and context overlap heavily
```

---

## 6. Vercel d0 – the data agent that reduced its tool count

d0 is a text-to-SQL data agent operated internally at Vercel, the frontend infrastructure company that makes Next.js. Replacing several specialist tools with the filesystem and standard Unix tools, and having the model explore organized files directly rather than the harness finely curating context, made it faster and simpler. Instead of over-protecting the model, they provided an environment the model can read well.

The benchmark results on five representative queries:

- Average execution time: from 274.8 seconds to 77.4 seconds – **3.5× faster**
- Success rate: from 4/5 to 5/5, from 80% to 100%
- Average token usage: from about 102k to about 61k, a 37% reduction
- Average step count: from about 12 steps to about 7, a 42% reduction

But the lesson is not "bash alone does everything." It was possible because their semantic layer was already a well-organized document structure. Why this case is the grounds for the first counterintuitive take (tool count ≠ performance) was covered in [Part 11](/post/ai-everything-11-patterns-decisions).

Questions to review before applying it:

```
□ is this tool really needed?
□ can the model easily understand this tool's description?
□ would a well-organized file structure serve this work better than a separate tool?
□ is the tool helping the model's judgement, or replacing it?
□ do verification and safety hold even with fewer tools?
```

---

## 7. GitHub Copilot coding agent – from issue to PR

It takes issues, prompts and PR requests as input, works in a repository and branch, and produces draft PRs, commits and session logs. Verification is handled by GitHub Actions, security analysis and review, and permissions are managed with PR approval, branch protection and independent review.

Moved to general work:

```
1. turn the work request into a ticket
2. the AI makes a draft
3. the change history is left behind
4. a person reviews
5. it is applied after approval
```

This structure's strength is that every change comes out as a reviewable unit (a PR). Reverting is easy too.

---

## 8. Cursor Background Agents – asynchronous agents working on remote machines

The Background Agents of Cursor (a code editor product specialized for AI coding) run in an isolated VM, report state through background task status, allow follow-up requests and taking work over, and run terminal commands automatically. The risks are correspondingly clear: prompt injection and data exfiltration. So operating policies such as privacy mode, GitHub app permissions and repo access control are attached.

The less a person is attached to an agent, the thicker the harness has to be. What to check:

```
□ which repositories and files can it access?
□ is internet access needed?
□ may terminal commands be run automatically?
□ is there a risk of sensitive information being exposed?
□ when can a person take the work over?
□ are execution logs kept?
```

---

## 9. Microsoft Magentic-One – a lead agent and specialist agents

Magentic-One is a multi-agent system published by Microsoft Research in which a lead agent directs specialist agents. An Orchestrator manages the overall plan and progress, with WebSurfer (web navigation), FileSurfer (file navigation), Coder (writing and analysing code) and ComputerTerminal (running code and terminal work) beneath it. Records divide into two ledgers. The Task Ledger holds facts, estimates and plans about the task, and the Progress Ledger holds the current progress and assignments.

This two-ledger structure is especially worth learning from. It separates "what is known" from "how far we have got," the same idea as [Part 09's progress file + feature list](/post/ai-everything-09-memory-longrunning).

Questions to ask when designing multi-agent:

```
□ who is the Orchestrator?
□ what is each agent's role?
□ where are the work records kept?
□ how is duplicated work prevented?
□ who integrates the final result?
□ who replans when something fails?
```

---

## 10. Replit Agent – from idea to deployment

The Agent of Replit (a development platform for writing, running and deploying code in the browser) composes a runnable development environment, installs the needed packages, runs code and checks results iteratively, and connects the deliverable to a real service. Configuration files such as `.replit` and `replit.nix` define the execution environment. What is distinctive is that **the harness makes the environment itself.** It removes the time people spent on environment setup.

---

## 11. Claude Agent Skills – the folder structure of procedural knowledge

Claude Agent Skills is an execution unit that bundles a recurring job's procedural knowledge – instructions, scripts, templates and reference material – into one folder, and can restrict tool permissions with `allowed-tools`. The structure and design method were covered in [Part 05](/post/ai-everything-05-tools-and-mcp), so only the case-view points remain here. Good work to apply it to is work such as writing customer proposals, tidying meeting minutes, code review, report templates, PDF processing, data analysis procedures and writing brand-tone documents – **work where the procedure repeats and the deliverable format is fixed.**

---

## 12. The common patterns that recur

Overlay several cases and the same things repeat.

- The repository/filesystem as the centre of knowledge: OpenAI Codex, Vercel d0, Replit Agent
- Leaving records that cross sessions: Anthropic long-running agents, GitHub Copilot
- Designing scope rather than giving many tools: Vercel d0, Cursor, Claude Skills
- Making results verifiable: OpenAI Codex, SWE-agent, GitHub Copilot
- Dangerous work needing approval and isolation: Cursor, GitHub Copilot, Claude Skills
- Needing a coordinator to use several agents: Anthropic Research, Magentic-One

Compressed into five design patterns:

1. Progressive disclosure: unfold only as much as is needed
2. Workspace isolation: worktrees, VMs, sandboxes
3. Repo as source of truth: files, not chat
4. Mechanical enforcement: hooks, linters, tests
5. Unified feedback loop: failures leading to the next harness fix

---

## 13. The layered structure of the harness ecosystem

The harness ecosystem splits into seven layers, from the execution agent doing the actual work up to the human supervision giving final approval. The market is dividing along those layers too.

| Layer | Developer work | Everyday-work analogy |
|---|---|---|
| Human supervision | PR review, approval, prioritization | the team lead's final approval |
| Planning/requirements | specs, task DAGs | work request forms, checklists |
| Lifecycle platform | managing from requirements to deployment | the project management system |
| Task runner | converting issues into agent work | the person assigning work |
| Orchestrator | running several agents in parallel | seating and scheduling several employees |
| Framework/runtime | memory, state, hooks, sandboxes | company operating rules and systems |
| Execution agent | actually writing and editing code | the employee doing the work |

The lower layer (execution agents) is commoditizing fast, and value is moving to the upper layers (orchestration, governance, supervision).

---

## 14. The origin of the term "harness engineering"

The term harness engineering settled in over a few months in early 2026, and before it came the popularization of vibe coding. In January 2025 the phrase "Vibe Coding" from Andrej Karpathy, formerly head of AI at Tesla and a founding member of OpenAI, circulated widely, making the symbolic scene of AI coding's popularization. In September 2025 the OpenAI Codex team began experiments building an agent-first codebase and started accumulating empirical data. On 5 February 2026 Mitchell Hashimoto (founder of HashiCorp and Terraform) set out the harness view clearly in "My AI Adoption Journey," putting the concept into language, and a few days later OpenAI published "Harness engineering: leveraging Codex in an agent-first world," spreading it across the industry. In the same month simultaneous discussions from Martin Fowler (the software design and refactoring author, at the software consultancy ThoughtWorks), Ethan Mollick (professor at the Wharton School) and others formed the discourse, and it reached Korea in March–April 2026 through translations and commentary on leading technology blogs such as Toss Tech and channel.io, spreading onward to education platforms.

Vibe coding and harness engineering are often compared, and the differences are these.

| Item | Vibe coding | Harness engineering |
|---|---|---|
| Originator | Andrej Karpathy (Jan 2025) | Mitchell Hashimoto (Feb 2026) |
| Purpose | fast exploration and prototypes | stable production operation |
| Main users | non-developer users, solo founders | development teams, DevOps, AI engineers |
| Relation to code | "if it runs, OK" | infrastructure files committed to the repo |
| Iteration method | accept then re-prompt | mistakes become harness updates |
| Reliability | low | high (enterprise production) |
| Analogy | a sketch | construction drawings + safety regulations |

**They are a layer stack, not opposites.** Explore fast with vibe coding, and put a harness over it when moving to production. The gap between the two is called the "vibe coding gap" in practice.

---

## 15. Five frequent design mistakes

1. Blaming the model for the agent's mistakes. Comparing performance with the same model and a different harness reveals it quickly.
2. Writing AGENTS.md too long. There is nothing for it but to keep cutting with the 60-line principle and priority rules.
3. The agent not verifying its own results. It has to be blocked with a structure separating generation and verification.
4. Harness files going stale because they are not updated. Without a separate maintenance routine they inevitably go out of date.
5. Ignoring the context window and continuing to add rules. A long harness frequently performs worse than a short one.

---

## 16. Environment audit questions

Environment audit questions are a checklist for finding what is missing in the environment an agent works in.

- Is there information the agent needs to know and cannot read? Then documentation, moving it into the repository, adding search tools.
- Where does the agent often get stuck? Dedicated tools, better output formats, adding a progress file.
- Are mistakes found too late? Adding tests, linters, browser verification, logging tools.
- Is the context full of noise? Result limits, summarization, file viewers, progressive disclosure.
- Are dangerous actions left to the model's judgement alone? Permission policies, approval stages, sandboxes.
- Does every session change start from scratch? A progress file, feature list, git log, init script.
- Do the user and the agent misunderstand the same screen differently? UI state, accessibility labels, traces, approval UX, an operator dashboard.

---

## 17. The minimal harness

The minimal harness is the smallest harness, aimed at one recurring job, with only a goal, material, an intermediate deliverable, verification criteria, an approval point and an improvement record. It organizes into seven steps.

```
1. pick one recurring job
2. write the final deliverable in one sentence
3. gather the material to give the AI first
4. decide one intermediate deliverable
5. write three verification criteria
6. decide one human approval point
7. after running it, leave one thing to fix next time
```

Keeping just these seven steps changes it from "just asking an AI" to "designing a small harness."

---

## 18. Summary

ACI research is harness engineering's academic grounding. Even with the same model, changing the interface changes performance. OpenAI Codex showed that the repository is the System of Record and that the human role moves from execution to environment design; Anthropic's long-running agents showed that what long work needs is a handover structure rather than memory; and Vercel d0 showed that more tools is not better and an environment the model can read well matters more. GitHub, Cursor, Magentic-One and Replit showed how permissions, verification, state, tool scope and division of roles actually appear. The common patterns compress into five: progressive disclosure, workspace isolation, repo as source of truth, mechanical enforcement and a unified feedback loop. The ecosystem splits into layers with value moving to the upper layers (orchestration, governance), and vibe coding and harness engineering are a layer stack rather than opposites. And the most common design mistake is blaming the model for the agent's mistakes.

---

## Further reading

- John Yang et al., *SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering* – <https://arxiv.org/abs/2405.15793>
- Carlos E. Jimenez et al., *SWE-bench* – <https://arxiv.org/abs/2310.06770>
- OpenAI, *Harness engineering* – <https://openai.com/index/harness-engineering/>
- OpenAI, *Unlocking the Codex harness: how we built the App Server* – <https://openai.com/index/>
- Anthropic, *How we built our multi-agent research system* – <https://www.anthropic.com/engineering/built-multi-agent-research-system>
- Microsoft Research, *Magentic-One* – <https://www.microsoft.com/en-us/research/>
- Kim Dong-hak, 《하네스 엔지니어링 백과사전》 (*Encyclopedia of Harness Engineering*), chapters 13 and 15 and appendix F – <https://wikidocs.net/346805>, <https://wikidocs.net/350438>, <https://wikidocs.net/350446>

---

Next: [13. Glossary · cheat sheet · references](/post/ai-everything-13-glossary-references)
Previous: [11. 12 patterns + 7 decisions + 3 counterintuitive takes](/post/ai-everything-11-patterns-decisions)
