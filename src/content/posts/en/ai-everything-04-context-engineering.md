This piece runs through the three-level distinction between prompt, context and harness engineering; why context is a scarce resource; how to use CLAUDE.md and AGENTS.md as a map; and the four strategies for context management.

---

## 1. The levels of the three engineerings

Terminology first. Prompt engineering is the question of how to say it, equivalent to writing the work instruction. Context engineering is the question of what to show, equivalent to tidying the material on the desk. Harness engineering is the question of in what environment to have it work – building the office, tools, approvals and inspection system. Harness engineering contains the first two, and this instalment deals with the middle level.

---

## 2. The structure of a good prompt

A good prompt is not a long sentence but **one with a clear role, goal, material, constraints, output format and verification criteria**.

A bad prompt looks like this.

```
하네스 엔지니어링 설명해줘.
```

A good prompt looks like this.

```
일반 사용자 대상 교육 자료를 만든다.
하네스 엔지니어링을 자동차 배선 하네스와 사무실 업무 매뉴얼에 비유해 설명하라.
반드시 1) 정의, 2) 왜 필요한가, 3) 구성요소, 4) 실무 예시, 5) 주의점을 포함하라.
전문 용어는 처음 등장할 때 한 문장으로 풀이하라.
```

System instructions should be short and strong, like a constitution. Carry only the principles that apply to every task (stability), write them concisely enough that the model can hold them every time (brevity), make clear what takes precedence on conflict (priority), state clearly what must not be done (forbidden scope), and require confirmation before completion (the verification habit). Putting all the detailed work in makes the instructions heavy instead. When the company rulebook is 500 pages and nobody updates it, employees end up asking the person next to them.

---

## 3. The scarcity of context

The scarcity of context comes from the fact that the amount of tokens a model can refer to in one inference is fixed. Anthropic's piece on context engineering treats context as "the set of tokens included at LLM inference time" and explains that the usefulness of this limited resource has to be optimized. With no needed material on the desk the AI guesses, and with all the material on the desk it cannot find the important document.

The empirical basis is the 2023 paper Lost in the Middle. The research by [Nelson F. Liu et al.](https://arxiv.org/abs/2307.03172) reported that performance can drop sharply when the position of the relevant information changes. In particular, performance degrades **when it is in the middle** rather than at the start or the end.

```
retrieval performance by position in context (conceptual)

accuracy
  high │ ●                                    ●
       │   ●                              ●
       │      ●                       ●
       │          ●              ●
   low │              ● ● ● ● ●
       └────────────────────────────────────────
        front        ← middle →              end
```

The meeting-minutes analogy used in [Part 01](/post/ai-everything-01-llm-and-token) applies unchanged. When an important decision is buried somewhere in the middle, even the attendees miss it.

Context rot layers on top of this. It is the phenomenon of old conversation, long logs and unnecessary tool results accumulating over time and clouding the model's judgement. The same as a desk that has got messy, and the fix is not putting more in but **summarizing, saving to files, and searching at the moment of need**.

---

## 4. The six materials that go onto the context

Six things usually go onto the model's desk. What matters is not putting a lot of everything in but **assembling them in the order and amount that suit the current task**.

- **System instructions**: on what principles the work is to be done. Designed badly, the rules become too long or conflict.
- **The user request**: what has to be done now. A vague goal makes the result wobble.
- **Retrieval / RAG** (Retrieval-Augmented Generation): which documents have to be fetched. Irrelevant documents can be mixed in, or important ones missed.
- **Long-term memory**: what has to be remembered next time too. A wrong memory produces repeated errors.
- **Available tools**: which actions are possible. With many tools or vague descriptions, calls go wrong.
- **Output format**: in what shape the result has to come out. The answer may be right and still be hard to review or reuse.

Tool descriptions are part of the context too. Attach 30 tools and those 30 names, descriptions and parameters occupy the context every turn. This leads into [Part 05's "tool explosion problem"](/post/ai-everything-05-tools-and-mcp).

The risks differ by kind as well. Instructions (system instructions, AGENTS.md, CLAUDE.md) get ignored when too long, and documents (product manuals, policy documents) become the wrong standard when out of date. Search results differ in trust by source, memory produces repeated errors when stored wrongly, and tool results (API responses, test results) can be incomplete or delayed. So a well-designed harness states the priority between materials: the policy document over what the user says, test results over the model's self-confidence. This hierarchy was organized in [Part 03's message hierarchy](/post/ai-everything-03-agent-loop).

---

## 5. AGENTS.md and CLAUDE.md

AGENTS.md and CLAUDE.md are project instruction files kept in the repository so that the agent reads them every session. The spirit of the two files is the same. **A README that says "in this project, work like this."** AGENTS.md is an open format (<https://agents.md/>) used by several coding agents including Codex, OpenAI's coding agent, and CLAUDE.md is what Claude Code uses. They are the same in carrying per-project instructions and in the structure of laying a project override over global instructions. Both work well when they are less an encyclopedia holding all the project's knowledge and more a map telling you where to read.

An example of a beginner's template:

```markdown
# AGENTS.md 또는 CLAUDE.md

## 프로젝트 목표
이 프로젝트는 고객 문의를 빠르고 정확하게 분류하는 AI 도우미를 만든다.

## 작업 전 읽을 문서
- docs/product.md
- docs/policy.md
- docs/faq.md

## 반드시 지킬 규칙
- 문서에 없는 내용은 추측하지 않는다.
- 고객 개인정보를 답변에 노출하지 않는다.
- 변경 후 checklist.md를 확인한다.

## 완료 기준
- 결과 요약 작성
- 불확실한 항목 표시
- 다음 작업 제안
```

OpenAI's piece on harness engineering explains that **a short AGENTS.md plays the role of a map, with deeper knowledge kept in a structured docs/ directory**. This pattern is useful outside development work too.

```
marketing-ai-harness/
├── AGENTS.md              ← writes only "where to read" (60 lines or fewer recommended)
└── docs/
    ├── brand-voice.md
    ├── campaign-history.md
    ├── customer-personas.md
    ├── legal-review-rules.md
    └── examples/
        ├── good-copy.md
        └── bad-copy.md
```

Instruction files can be divided into levels. The user level (`~/.claude/`) holds personal work preferences and recurring habits – the personal notebook carried everywhere. The project level (`./CLAUDE.md`) holds the rules common to this repository and team – the family rules posted at the front door. Subfolders (`./src/CLAUDE.md`) hold detailed rules for a particular module or area – the small notices posted in the kitchen, the study and the storeroom. Path-based rules (`.claude/rules/*.md`) hold guidance per file pattern – the sticky notes attached to individual files.

An example of a path-based rule:

```markdown
---
paths:
  - "**/*.test.*"
---
테스트 파일을 수정할 때는 기존 테스트 스타일을 따른다.
정상 사례와 실패 사례를 함께 확인한다.
테스트를 추가했다면 실행 방법도 함께 남긴다.
```

There is one thing to watch. **CLAUDE.md is not a security device.** The official documentation explains that CLAUDE.md and memory are handled as "context." Which is to say, it is material Claude reads and refers to, not a device at the operating system level that cannot possibly be violated. If CLAUDE.md is writing "mind the fire" next to the gas hob, a Hook is the device that automatically cuts the gas after a set time. So behaviour that absolutely must be blocked is right to move to `permissions` or a Hook. This story continues in [Part 10](/post/ai-everything-10-safety-governance).

---

## 6. RAG and file search

RAG is the method of having the AI find and read relevant documents before it answers, and file search is the form that takes a file store as the search target. Both give the AI the role of a librarian. An excellent librarian does not memorize every book. Instead they find the needed book quickly and open it at the right page.

There is one practical principle for handling long material. When giving an AI long material, saying **look at the table of contents first, read only the needed sections, and note the section names you read in the answer** works far better than "read it all and figure it out."

---

## 7. The four strategies of context management

There are four strategies. Compaction summarizes old conversation to free space, equivalent to making a summary of the minutes. Observation masking hides the full text of past tool results and leaves only the call record, the same as looking at an expense summary rather than the original receipts. JIT retrieval does not put whole files in but reads with grep/head/search when needed – taking out only the needed box rather than the whole warehouse. Structured notes leave things as tidy files such as `progress.md` or `feature_list.json`, equivalent to writing a handover document.

On top of this there is progressive disclosure, that is, unfolding only as much as is needed. It is also the core design principle of Claude Skills, the feature that packages repetitive work at folder granularity. Rather than putting every manual into the context from the start, it **shows only the name and description first and has the body and additional files read in stages when needed.**

```
session start
  → only the Skill name + description in context (tens of tokens)
  → when a relevant request comes, load the SKILL.md body (hundreds to thousands of tokens)
  → if more is needed, load references/ files (only when needed)
```

Thanks to this structure, installing 50 Skills does not blow up the context. CLAUDE.md always goes in every session while a Skill's body goes in only when used. So putting long reference documents and procedures into a Skill rather than CLAUDE.md saves context.

Finally, **compaction is lossy.** Important details can drop out in summarizing. So a harness must not depend on compaction alone. Just as people do not throw away the original contract trusting the minutes alone, an AI has to hold source records such as a progress file, a feature list and git history too. The core principle is not to extend the conversation window endlessly but to leave important state as documents and start fresh. The same as the longer a meeting runs, the more minutes are needed. This is the starting point of [Part 09, the long-running harness](/post/ai-everything-09-memory-longrunning).

---

## 8. A practical checklist

The signals that should make you suspect a context problem:

| Symptom | Where to suspect | Prescription |
|---|---|---|
| keeps breaking project rules | CLAUDE.md is too long / conflicts | cut to 60 lines or fewer and split into docs/ |
| repeats the same explanation every session | there is no instruction file | write CLAUDE.md |
| forgets earlier decisions in long sessions | they vanished in compaction | leave them in MEMORY.md / progress.md |
| cites irrelevant documents | a RAG retrieval quality problem | narrow the search scope, require source attribution |
| picks the wrong tool | there are too many tools | minimal exposure per stage ([Part 05](/post/ai-everything-05-tools-and-mcp)) |
| answers differ every time | there is no output format or example | fix the schema, template and examples |
| cost rose suddenly | context accumulation | compaction + moving to files + using the cache |

---

## 9. Summary

Prompt (how to say it) is contained in context (what to show), and context in harness (in what environment to have it work). **The context window is not an infinite warehouse but a limited desk.** Put a lot in and the important thing is buried, and as Lost in the Middle shows, the position of information changes performance, so put what matters at the front or the back. The materials are six: system instructions / user request / RAG / long-term memory / tools / output format. AGENTS.md and CLAUDE.md should be a map rather than an encyclopedia (60 lines or fewer + docs/), and since they are not security devices, what absolutely must be blocked moves to permissions and Hooks. The management strategies are four – compaction / observation masking / JIT retrieval / structured notes – and progressive disclosure opens the contents first and the body when needed. And because compaction is lossy, important decisions must be left in files as well.

---

## Further reading

- Anthropic, *Effective context engineering for AI agents* – <https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents>
- Nelson F. Liu et al., *Lost in the Middle* – <https://arxiv.org/abs/2307.03172>
- Minki Kang et al., *ACON: Optimizing Context Compression for Long-horizon LLM Agents* – <https://arxiv.org/abs/2510.00615>
- AGENTS.md open format – <https://agents.md/>
- Kim Dong-hak, 《하네스 엔지니어링 백과사전》 (*Encyclopedia of Harness Engineering*), chapter 3 – <https://wikidocs.net/346795>

---

Next: [05. Tool engineering and MCP](/post/ai-everything-05-tools-and-mcp)
Previous: [03. Anatomy of the agent loop](/post/ai-everything-03-agent-loop)
