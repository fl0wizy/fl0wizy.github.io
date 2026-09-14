This piece reads real products from the harness point of view. It runs through how the two levels of model and harness differ, why ChatGPT and Codex – same company, same model family – produce different results, and what the structures of Claude Code and Codex look like.

---

## 1. Separating the levels of model and harness

A **model** is a neural network that takes tokens as input and emits a probability distribution over the next token, and a **harness** is the execution layer that connects that model to a real working environment. These two frequently get mixed up when product names are listed.

It is easy to lay them out by company like this.

```
O OpenAI    : codex
O Anthropic : claude code
X Google    : gemini
```

The first two are indeed harness names. The third line is the problem. **Gemini is a model, not a harness.** Put the three side by side and the levels are out of step. Corrected as of August 2026:

| Company | Model (engine) | Harness (operating system) |
|---|---|---|
| Anthropic | Claude – Opus 5 / Sonnet 5 / Haiku 4.5 / Fable 5 | Claude Code (CLI · desktop · web · IDE), Claude Agent SDK |
| OpenAI | the GPT-5.x family | Codex (CLI · app · cloud), Agents SDK, Responses API |
| Google | the Gemini 3.x family | Antigravity (desktop · CLI · SDK), Jules |

Other commonly confused names also sort out once the levels are separated. ChatGPT is a product/surface and the model behind it is the GPT family. The Claude app is likewise a product/surface and the model is the Claude family. Kimi is a model from Moonshot AI, a Chinese AI company. Perplexity is a search-specialized product/harness that mixes several models internally. Cursor is a code editor product specialized for AI coding – an editor-type harness, so various models can be plugged in – and LangGraph (LangChain's framework for defining an agent's execution flow as a graph) and CrewAI (an open-source framework that gives roles to several agents and has them collaborate) are frameworks for building harnesses.

**A harness can have its model swapped.** Change the model in Cursor from Claude to GPT and Cursor stays the same. That is the evidence that the two layers are separate.

There is a reason for this confusion: changes on Google's side in 2026. Google announced at I/O 2026 that Gemini CLI would transition to Antigravity CLI. As of 18 June 2026, Gemini CLI and the Gemini Code Assist IDE extension stopped serving requests on some plans, and Antigravity 2.0 consists of a desktop app, a Go-based CLI, an SDK and a Google Cloud enterprise tier. Because these four share one agent harness, improvements to the core agent are reflected automatically wherever it is used. Gemini CLI, which had been Node.js based, was rewritten in Go, improving memory and start-up time as well (sources: [Google Developers Blog](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/), [Google I/O 2026 developer highlights](https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/)).

**The very fact that Google uses the words agent harness as a first-class concept in its own documentation** is symbolic. The harness is now at the centre of product architecture.

---

## 2. The structural difference between Codex and ChatGPT

**Codex** is a coding agent harness that runs on top of a repository, and **ChatGPT** is a conversational assistant surface. In that the same company with the same model family produces different deliverables, it becomes the empirical case for the proposition that the harness makes the result.

| | ChatGPT | Codex |
|---|---|---|
| What it is | a conversational assistant surface | a coding agent harness running on a repository |
| File access | none (only what is uploaded) | reads and edits designated directories directly |
| Command execution | limited to the sandboxed code interpreter | runs real commands and tests in the project |
| Loop | question → answer (mostly one turn) | request → reason → run tool → observe → repeat → report completion |
| Deliverable | text to copy and paste | commits, diffs, PRs, test results |
| Instruction file | custom instructions | AGENTS.md |
| Parallelism | none | several agents running simultaneously in isolated worktrees |

ChatGPT answers what something is; Codex executes how to fix it. ChatGPT explains the error; Codex fixes the error. It is more confusing still because they sometimes share an account and usage window, and the more they do, the sharper the conclusion gets. **What made the difference is not the model but the harness.**

(See: [ChatGPT vs Codex – Same Account, Different Loop](https://www.morphllm.com/comparisons/chatgpt-vs-codex), [a comparison of AI coding agents](https://growwstacks.com/blog/chatgpt-vs-openai-codex-vs-claude-code-best-ai-coding-agent-2026))

---

## 3. Claude Code's five-layer structure

The official documentation explains CLAUDE.md, Skills, MCP, Subagents, Agent Teams, Hooks and Plugins each as an independent extension point. The five layers below are not an official product classification but **a map drawn for learning**.

```
layer 5  Plugins / marketplaces           bundles of capability shipped to many projects and teams
layer 4  Subagents / Agent Teams          specialists who take on divided work
layer 3  Hooks / settings / permissions   checks and blocks that run automatically = enforcement
layer 2  Skills (SKILL.md, references)    work manuals taken out when needed
layer 1  CLAUDE.md / auto memory / rules  the always-visible basic rules = request

 MCP ─ not one layer but an external connection passage attached beside several layers
```

By everyday analogy: layer 1 is the rules on the office wall and the personal notebook, layer 2 is recipe cards for recurring work, layer 3 is the gas cut-off and the access card, layer 4 is a small team with someone on investigation, review and execution, and layer 5 is the standard operating package sent to every branch.

This is not a checklist where everything has to be turned on. Whenever a recurring problem appears, add the one layer that fits that problem.

```
missed the same rule twice              → write it in CLAUDE.md
pasting the same procedure a third time → pull it out into a Skill
a check that must run every time        → move it to a Hook
one task is cluttering the conversation → hand it to a Subagent
the same thing is used in several repos → bundle it as a Plugin
```

What goes where is decided by the same principle.

- **Rules that always have to be known**: `CLAUDE.md` or `.claude/rules/`
- **Long procedures needed occasionally**: a Skill
- **Checks that must run automatically**: a Hook
- **Independent work that can be handed to a separate specialist**: a Subagent
- **Things to ship to several projects and teams**: a Plugin
- **Connecting external tools or data**: MCP

The `.claude` folder is the equivalent of a chest of work drawers. `CLAUDE.md` is the basic rules on the wall (project description, commands, principles, structure), `.claude/skills/` holds manuals for recurring work, `.claude/agents/` holds specialist cards per role (investigator, reviewer, writer subagents), `.claude/settings.json` is the access card and security rule sheet (permissions, approval flows, hooks configuration), and `.claude/commands/` holds frequently used buttons (slash commands called repeatedly). `~/.claude/` is the personal desk drawer, holding personal preferences, personal Skills and commands, and user memory. **Do not mix the project's shared drawer with the personal drawer.** The same as mixing communal side dishes and personal snacks in the office fridge being confusing.

---

## 4. Six areas of CLAUDE.md operating rules

CLAUDE.md has to balance between two mistakes. Write too little and you end up repeating the same explanation every time; write too much and Claude does not know what to prioritize. What to carry sorts out into six areas.

- **Conversational manner**: no greetings, answer length, saying it does not know when it does not. Output tone and marking uncertainty.
- **Change control**: confirm before large changes, edit only the requested scope, summarize changes. Work scope and approval loops.
- **User and project context**: who the user is, what is being built, preferred tone. The basic context.
- **Memory and continuity**: MEMORY.md, session summaries, failure records. Long-term memory and handover.
- **Development work safety**: edit only relevant files, confirm before destructive operations, fix the stack. Least privilege and change safety.
- **Blocking high-risk actions**: deployment, DB changes, external sending and email require human approval. The governance area.

A minimal template you can use straight away:

```markdown
# CLAUDE.md

## 대화 방식
- 불필요한 인사말 없이 바로 답한다.
- 확실하지 않은 사실·날짜·수치·출처는 먼저 불확실하다고 말한다.
- 간단한 질문은 짧게, 복잡한 작업은 충분히 자세히 답한다.

## 변경 통제
- 사용자가 요청하지 않은 파일·문단·구조는 바꾸지 않는다.
- 큰 변경, 삭제, 덮어쓰기, 외부 전송은 먼저 무엇을 바꿀지 설명하고 확인을 받는다.
- 작업이 끝나면 변경 내용과 확인이 필요한 점을 짧게 정리한다.

## 사용자와 프로젝트 맥락
- 대상 사용자: [예: 하네스 엔지니어링을 처음 접하는 사람]
- 선호 톤: [예: 친절하고 차분하지만 장황하지 않게]
- 피할 것: [예: 검증되지 않은 수치, 과장된 표현]

## 기억과 연속성
- 중요한 결정은 `MEMORY.md`에 남긴다.
- 세션을 끝낼 때 완료한 일, 진행 중인 일, 다음 할 일을 요약한다.

## 개발 작업 안전
- 현재 요청과 직접 관련된 파일과 코드만 수정한다.
- 기술 스택과 테스트 명령은 프로젝트 규칙을 따른다.

## 고위험 행동 차단
- 배포, DB 변경, 외부 전송, 삭제처럼 되돌리기 어려운 행동은 먼저 확인을 받는다.
```

When work runs long it is better to split the file into three. `CLAUDE.md` holds the basic rules applied every session, `MEMORY.md` holds important decisions and session summaries, and `ERRORS.md` holds failed approaches and their fixes. Each helps for work spanning days to weeks, and when you want to stop repeating the same mistake.

**CLAUDE.md is not a magic contract.** Too long, or with many mutually conflicting rules, and quality falls instead. What absolutely has to be kept must move to stronger devices such as settings, permissions, hooks and tests. This distinction between request and enforcement is taken up properly in [Part 10](/post/ai-everything-10-safety-governance).

---

## 5. Twelve main features mapped onto the five layers

Putting the main features onto the five-layer map:

- **CLAUDE.md** (layer 1, memory and rules): the wall notice stating principles that have to be known every time
- **Permissions** (layer 3, permission and safety): the access card deciding how far read/write/execute is allowed
- **Skills** (layer 2, work manuals): if you keep explaining the same procedure, pull it out as a recipe
- **Hooks** (layer 3, automatic checks): automate the checks people often skip, like a gas cut-off
- **Slash Commands** (operating buttons): turn a long request into a short command
- **Plan Mode** (approval before execution): check the drawings before the building work
- **Checkpoints** (a recovery safety net): a save point to return to when something goes wrong
- **Compaction** (tidying context): summarizing long minutes. For when the conversation grows and the core is buried
- **Context Control** (layer 1, context management): choosing the material on the desk to work from now
- **MCP** (external connection passage): the wire connecting to external tools and data
- **Subagents** (layer 4, specialists): handing to an independent specialist makes for cleaner work
- **Headless Mode `-p`** (automated execution): an unattended intake window running repeatedly without a person

Four of these are especially effective.

First, **Plan Mode**. For work touching many files, do not have it execute straight away; look at the plan first.

```
먼저 계획만 세워줘. 어떤 파일을 읽고, 무엇을 바꿀지 설명한 뒤 내가 승인하면 진행해.
```

Second, **Checkpoints and `/rewind`**. Claude's file edits are tracked automatically so you can return to an earlier point. It does not replace Git, though. Files changed by bash commands, or changes made outside Claude Code, sometimes cannot be reverted. A checkpoint is a temporary save and Git is the formal record.

Third, **`/memory` and `/compact`**. When Claude appears to be missing earlier decisions, before blaming the model, check with `/memory` what memory is currently loaded. When the conversation is too long use `/compact`, and since summarizing is lossy, leave important decisions in `MEMORY.md` or `PROGRESS.md` too.

Fourth, **an independent review session**. Having Claude review its own output in the same session drags it towards its earlier assumptions. The same as a person being unable to find typos in their own writing.

```
(새 세션에서)
이 변경사항을 독립 리뷰어 관점으로 검토해줘.
구현 의도는 추측하지 말고, 실제 diff와 테스트 근거만 보고 위험을 찾아줘.
```

This connects to [Part 08's Generator-Evaluator structure](/post/ai-everything-08-eval-harness).

On the automation side, `-p` and structured output are the core.

```bash
claude -p "변경 내용을 검토하고 위험 항목을 JSON으로 요약해줘" --output-format json
```

```bash
claude -p "변경 위험을 분류해줘" --json-schema '{"type":"object","properties":{"risk":{"type":"string"}}}'
```

Used for CI, repeated review and automated reports. But **the more a Claude runs where nobody is watching, the thicker the harness has to be.** Input scope, permissions, output format and stop-on-failure conditions all have to be there.

---

## 6. The component parts of the Codex harness

Read Codex's features from the harness view and each looks like a component.

- **AGENTS.md**: the shop's operating rules. Has the project rules, run commands and cautions read before work.
- **Skill**: a recipe card for recurring work. Bundles the procedure, material and scripts of a frequent task reusably.
- **Subagent**: an investigator sent out separately. Hands independent work off in parallel and collects only the result.
- **Worktree**: a separate workbench. Lets several jobs proceed without interfering with one another.
- **Hook**: a sensor light that comes on automatically. Runs checks, records, approvals and summaries automatically at particular moments.
- **App Server**: the passage between the shop system and the ordering app. The interface that connects Codex deeply inside products and clients.

OpenAI's Responses API is a unified endpoint for model calls, composing model responses, tool calls, built-in tools, function calling and MCP connections into one flow. On top of it sit Handoff (passing to a specialist agent), Guardrail (confirmation rules that stop before payment, external sending or handling sensitive information), Tracing (records of who used which tool) and Eval (periodic quality checks).

The most noteworthy part of OpenAI's harness piece is not "the agent wrote a lot of code" but that **they built an environment in which the agent can observe and correct itself.** In an environment hard for an agent to see, errors show up only faintly on screen, the reasons for test failures are long and scattered, application state is checked only by human eyes, and documents and rules are scattered across several chat rooms. In a readable environment, by contrast, error messages and logs remain as files and traces, the failure location, expected value and actual value are clear, state can be checked through browser verification, screenshots and accessibility information, documentation is organized by a short map in the repository and a `docs/` structure, and `git diff` and test results remain after edits.

A screen that is good for a person is not always a good screen for an agent. For an agent, not only the screen but logs, test results, traces, error messages, file structure and run commands are all interface.

What an agent makes is not code alone either. Besides product code there come test code (a safety net so the next change does not break it), documentation (work memory for the next agent and the next person), release and deployment tooling, eval cases (the exam paper for comparing whether the harness got better), traces and dashboards (the instrument panel for finding where it failed), and review responses (records of decisions and reasons for edits). Understanding it only as "AI writes code for you" is seeing half the harness.

---

## 7. Comparing the three camps' emphases

The three companies' harness discourse differs in emphasis.

Anthropic sees the harness as **the crystallization of organizational knowledge**. CLAUDE.md, hooks, skills and agents are the representative structures, and what it most guards against is staleness – the context drift that comes from harness files going out of date. As the next direction it talks about session state management, gate systems and layered architecture.

OpenAI redefines the developer as an **environment designer**. AGENTS.md and inter-agent code review loops are the representative structures, and it warns against giving a 1,000-page manual instead of a map. The next direction is Self-Harness, the agent improving the harness itself.

Google puts **observability** as the harness's lifeline. Standard layers such as MCP (Model Context Protocol, the AI-to-tool connection standard Anthropic published in 2024) and A2A (Agent2Agent Protocol, the agent-to-agent communication standard Google led) are the representative structures; it warns that complex harnesses are short-lived, and sets democratizing multi-agent through standardization as the next direction.

The emphases diverge and there is agreement too. A harness is not a replacement for prompt and context engineering but a layer above them; harness design affects production outcomes more than model choice; the absence of a harness can be a leading cause of failure in agentic AI projects; and non-developers can take part, while the technical demands grow as the level rises.

**Harness debt** – the debt that accumulates as harness files go stale – is a concept that comes out of this context too. The details are covered in [Part 10's harness garbage collection](/post/ai-everything-10-safety-governance).

---

## 8. The order of adoption

There is no need to start grandly. Make a short CLAUDE.md (or AGENTS.md) at the project root and get a feel for the basic rules you no longer have to restate every time; turn the procedure you keep pasting into a Skill; move the check that must run into a Hook; hand long investigations or independent reviews to a Subagent; and when a configuration used across several projects emerges, bundle it as a Plugin then. One at a time, in order.

**Starting from read-only review lets you learn the permission and verification flow safely.**

---

## 9. Summary

Gemini is a model and Google's harness is Antigravity (formerly Gemini CLI). Model and harness are different levels, and Codex and ChatGPT – same company, same model family, different results – are the cleanest evidence of that. Claude Code sorts out when read as five layers of rules/manuals/enforcement/division of labour/distribution, with MCP as a passage attached alongside. CLAUDE.md is not a magic contract, so request (context) and enforcement (hook/permission) have to be distinguished, and Codex's components (AGENTS.md · Skill · Subagent · Worktree · Hook · App Server) read by the same principle. A good harness lets the agent read logs, tests, traces and diffs and decide its own next action, and all three camps agree that harness design affects production outcomes more than model choice.

---

## Further reading

- Claude Code Docs – <https://code.claude.com/docs/en/overview>
- Anthropic, *Building agents with the Claude Agent SDK* – <https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk>
- OpenAI, *Harness engineering* – <https://openai.com/index/harness-engineering/>
- OpenAI Codex, *Custom instructions with AGENTS.md* – <https://developers.openai.com/codex/guides/agents-md>
- Google Developers Blog, *Transitioning Gemini CLI to Antigravity CLI* – <https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/>
- Kim Dong-hak, 《하네스 엔지니어링 백과사전》 (*Encyclopedia of Harness Engineering*), chapters 6 and 7 – <https://wikidocs.net/346798>, <https://wikidocs.net/346799>

---

Next: [07. Multi-agent](/post/ai-everything-07-multi-agent)
Previous: [05. Tool engineering and MCP](/post/ai-everything-05-tools-and-mcp)
