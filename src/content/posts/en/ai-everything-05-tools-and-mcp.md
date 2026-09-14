This piece runs through the tool layer's five responsibilities, the tool explosion problem and scope design, the difference between MCP and A2A, and Skill and permission design.

---

## 1. Defining a tool

A tool is a function the model calls in order to perform an action other than generating text. It is the part responsible for action beyond words. For an AI, tools are search, calculation, file reading, drafting an email, looking up a ticket, querying a DB, clicking in a browser, running code. If an AI without tools is a person with a good memory, an AI with tools is **an employee with a laptop, a calculator, the internet and the company systems**. As [Toolformer](https://arxiv.org/abs/2302.04761), Meta's 2023 paper that had a language model learn for itself when to call a tool, shows, a language model can supplement with external tools the tasks it is weak at alone, such as arithmetic or looking up current facts.

"We connected a tool" does not mean an API address was attached. The tool layer carries five responsibilities together.

- **Registration**: tell the model which tools exist and when to use them.
- **Schema validation**: check input names, types and required fields.
- **Permission check**: distinguish actions of differing risk such as read/write/delete/send.
- **Isolated execution**: run in a sandbox or restricted environment where possible.
- **Result formatting**: turn the tool result into an observation message the model can read easily.

---

## 2. Good tool names and descriptions

Names are a restaurant menu. If the menu says "dish 1," both the customer and the staff are confused.

```
X do_stuff, handle, process, run
O search_policy_docs, create_gmail_draft, run_unit_tests, lookup_order_status
```

The description is not an API document for humans but judgement guidance for the model. Anthropic's *Writing effective tools for AI agents* explains that tool descriptions have a **direct effect** on agent performance. A good tool description does not stop at "this function does X"; it carries when to use it, when not to use it, the input format, the boundary with similar tools, and what message comes back on failure.

```
search_policy_docs(query):
  사내 정책 문서에서 관련 조항을 검색한다.
  사용자가 휴가, 비용 처리, 보안, 개인정보와 관련된 질문을 할 때 사용한다.
  외부 법령 검색에는 사용하지 않는다. (→ search_law 사용)
  출력은 관련 문서 제목, 조항 요약, 마지막 수정일을 포함한다.
```

This is ACI (Agent-Computer Interface) design. A good interface for a person and a good interface for an agent differ. This story continues in [Part 12](/post/ai-everything-12-cases-ecosystem).

---

## 3. Divide tools by risk

Tools are divided by risk and handled differently. Low-risk ones such as reading files, searching documents and running tests can be auto-allowed. Medium risk such as editing files, writing drafts and updating internal documents leaves a log and takes confirmation in some cases. High risk such as sending email, taking payment, deleting and deploying requires human approval. Exposing secret keys or unauthorized data extraction is the forbidden zone, blocked automatically.

There is one particularly important design principle. **A tool that sends immediately and a tool that makes a draft must always be separated.** `send_email` and `create_email_draft` are different tools.

---

## 4. Token efficiency of tool output

Giving the top 5 + summary + source + confidence + date is better than putting all 100 search results in.

```json
{
  "top_results": [
    {
      "title": "휴가 정책 2026",
      "summary": "연차는 반차 단위로 신청 가능하며, 팀장 승인이 필요하다.",
      "last_updated": "2026-02-12",
      "source": "docs/hr/vacation.md"
    }
  ],
  "uncertainty": "정책은 2026년 2월 기준이며, 노무 이슈는 HR 확인 필요"
}
```

Large results go to a file, not to the conversation window. It is the practical habit emphasized in the harness piece from LangChain, the company that builds a development framework for LLM applications. Rather than shoving large search results, long logs and big file listings into the model context as-is, **save them to a file or a workspace** and give the model only where it was saved (the path), what the key summary is, and which part to read next. The same as a removals firm not tipping every box into the living room but labelling each box and moving it to its room. You open only the box you need.

---

## 5. The tool explosion problem

The tool explosion problem refers to the phenomenon whereby, as the number of tools attached to an agent grows, both selection accuracy and context efficiency fall. Attaching more tools looks better, and **in fact the opposite can happen.** With more tools there is more for the model to choose between each time, it has to read each tool's description and so consumes context, and the chance of choosing wrongly among similar tools grows. The same as remote controls around the house. A remote with 80 buttons looks powerful, and even the basic jobs of turning the power on and adjusting the volume become more awkward.

The tool scoping strategy is five steps.

```
1. write down the tools this work absolutely requires
2. separate read tools from write tools
3. mark dangerous tools as 'approval required'
4. merge similar tools into one, or make the names clearer
5. in long-running work, open tools dynamically stage by stage
```

For a research agent, opening tools stage by stage looks like this.

```
stage 1 (investigate) : web_search, file_search, read_note
stage 2 (draft)       : + write_draft
stage 3 (send)        : + send_email  ← human approval required
```

Like this, **opening tools stage by stage is itself harness design.**

When there really are many tools, putting every tool description into the context is itself waste. OpenAI explains that a large tool surface can be lazily loaded at runtime with tool search, and Claude handles tool search and scaling with MCP Tool Search. The official documentation explains that this approach generally **cuts tool definition context by more than 85%**. The same as a department store's information desk. Rather than standing every shop's staff in one place, you first find at the information desk which shop you need and then go to that shop.

---

## 6. MCP (Model Context Protocol)

MCP (Model Context Protocol) is an **open standard** published by Anthropic in 2024 for AI applications to connect to external tools and data sources. It is the equivalent of a USB-C port for AI. Just as various devices plug into a USB-C port, many services and tools connect to an AI. The Claude Code documentation explains that MCP servers allow connections to Jira, Sentry, Statsig, PostgreSQL, Figma, Slack, Gmail draft and more. OpenAI likewise explains that built-in tools, function calling, tool search and remote MCP servers can be used in the Responses API.

MCP and Skills are used together. If MCP is the wire that connects to a tool, a Skill is the manual telling you in what order and by what criteria to use that tool. MCP connecting to a database does not mean Claude automatically knows what our company's tables mean. **Domain knowledge such as table meanings, personal data cautions and permitted query scope has to go in a Skill or CLAUDE.md.**

There are things to watch on adoption too. The more you connect, the more there is to check. External tool access is straight away a question of permissions, security, data exposure and the risk of wrong execution.

```
O connect only the MCPs you really need at first
O start read-only
O wrap important actions in approval flows and Hooks
```

---

## 7. MCP vs A2A – tool connection vs agent collaboration

A2A (Agent2Agent Protocol) is an open standard for agents to communicate with one another. Both take agents beyond the stage of producing answers alone, and their directions differ.

| | **MCP** | **A2A (Agent2Agent)** |
|---|---|---|
| Central question | which **tools and data** should this agent use, and how? | which **agent** should be given which work, and how are the results combined? |
| What it connects | tools, APIs, data sources | other agents, remote agents, specialist agents |
| Harness layer | the tool connection layer | the agent collaboration layer |
| Design focus | tool names, schemas, permissions, error handling | roles, delegation, state sharing, result integration |
| Everyday analogy | a standard toolbox and connection ports | a team lead and specialists dividing the work |

The two are not competitors; in practice they are used together.

```
orchestrator agent
 ├─ (A2A: assigns work) → flight agent   ── (MCP: uses a tool) → flight API
 └─ (A2A: assigns work) → schedule agent ── (MCP: uses a tool) → calendar API
```

The criterion is simple. If the problem is having many tools, organize it from the MCP view (tool schemas, permissions, tool search, error handling). If the work has roles different enough that people would divide it, organize it from the A2A view (roles, delegation boundaries, state passing, result merging). Blur this distinction and the design gets complicated. Splitting work that only needs one tool called well across several agents makes it slower instead.

A2A is a protocol Google started and donated to the Linux Foundation. The observability argument Google puts forward as its reason for standardization is covered in [Part 10](/post/ai-everything-10-safety-governance).

---

## 8. Skills

A Skill is the unit that packages a recurring job's procedure, material and examples into a single folder, to be loaded only when needed. Claude Skills is the way of turning recurring work into **a reusable work manual** rather than a prompt that explains it again every time.

```
my-skill/
├── SKILL.md          ← required. This alone meets the minimum
├── references/       ← optional. Long material, opened only when needed
│   ├── examples.md
│   └── template.md
├── templates/        ← optional. Formats for recurring deliverables
└── scripts/          ← optional. Things to handle deterministically
```

A Skill that works well is not a clever prompt but a small work manual for a recurring job.

The difference between CLAUDE.md and a Skill: if CLAUDE.md is the company-wide handbook, a Skill is a manual for a particular job. CLAUDE.md carries project and repository context (tech stack, test commands, team rules), and a Skill carries a repeatable work capability (trigger, workflow, output format, examples). By household analogy, "in our house, recycling goes out on Tuesday night" is CLAUDE.md, and "cardboard boxes go in this bin with the tape peeled off and folded flat" is a Skill.

The decisive difference is when they are read. **CLAUDE.md always goes in every session, and a Skill's body goes in only when there is a relevant request.** Put a long procedure into CLAUDE.md and it costs every session; put it into a Skill and it costs only when used.

A Skill that works well has five components.

1. **The YAML trigger header**: `name`, `description`. The description is not an introduction but a trigger rule.
2. **Overview**: a summary that lets Claude quickly understand what role it is in right now.
3. **Workflow**: numbered, stage-by-stage order. One stage = one action.
4. **Output Format**: length, structure, tone, format. This is also the evaluation criterion.
5. **Examples & Edge Cases**: one normal input + one exceptional input is the minimum. For real use, 3–5.

How to write the description:

```yaml
# X 나쁨
description: 제안서 작성을 도와드립니다.

# O 좋음
description: >
  이 스킬은 고객 제안서를 작성합니다.
  "제안서 써줘", "견적 제안 만들어줘", "RFP 답변 초안",
  "고객 대상 제안 문서", "세일즈 덱 초안" 같은 요청에 사용합니다.
  내부 기획서나 개발 스펙 문서에는 사용하지 않습니다.
```

Put in 5–7 expressions users would actually say, add a **negative boundary** – "do not use it in this case" – and write it as a third-person explanation rather than a first-person introduction.

Broken Skills show up in five types. The silent Skill does not run when it should, caused by an ambiguous description, so add users' expressions to the description. The hijacker runs on unrelated requests, caused by a broad scope with no negative boundary, so state "do not use it in this case." The drifting Skill gives different results every time, caused by an ambiguous workflow and output criteria, so change them into testable instructions. The glass-jawed Skill breaks on exceptional input, caused by too few edge cases, so add odd, contradictory or insufficient inputs as examples. Over-eagerness adds sections nobody asked for, caused by having no prohibitions, so state the output scope and the forbidden behaviours.

Test five things before shipping. Does the expected result come out on perfect input (the happy path)? Does it ask first when information is missing (minimal input)? Does it hold up under contradictions, typos, long input and other languages (exceptional situations)? Is it quietly inactive on requests it should not serve (the negative test)? Are the structure and quality consistent across three runs of the same input (the repetition test)? **A Skill is a small harness too. It should have an eval before shipping.** This story continues in [Part 08](/post/ai-everything-08-eval-harness).

There are security risks as well. A Skill can contain not only instructions but scripts and resources. Anthropic's official blog also warns that a malicious skill can create vulnerabilities in the environment, leak data, or induce unintended behaviour. **Somebody else's Skill is not a convenient manual but a work procedure that can execute.** Reading and inspecting before trusting is the right order. Plugins are riskier still, because Skill + Hook + Subagent + MCP connections arrive as one bundle. There is nothing for it but to check before installing what scripts run, what permissions are demanded, and what external tools are connected.

---

## 9. Permissions

Permissions are the set of rules by which the harness decides whether to actually allow the action the model requested. The equivalent of the harness's seatbelt. Claude Code's permissions documentation explains the `allow` / `ask` / `deny` rules and the `deny → ask → allow` evaluation order.

The core principle is exactly as seen in [Part 03](/post/ai-everything-03-agent-loop). **Separate the model's judgement from the system's enforcement.** Even when the model judges it looks fine, actually sending email, taking payment, deleting or deploying has to pass the harness's permission policy. Concrete policy design and configuration examples are covered in [Part 10](/post/ai-everything-10-safety-governance).

---

## 10. Summary

The tool layer carries five things together: registration, schema validation, permission checking, isolated execution and result formatting. A tool name is a menu and the description is judgement guidance for the model, so it has to say when not to use it too. More tools do not make it smarter. It only adds selection burden and context burden, which is why tools are opened stage by stage. That is harness design. MCP is tool connection (USB-C) and A2A is agent collaboration – not competitors but different layers. A Skill is a work manual rather than a long prompt, and progressive disclosure saves context. The description is a trigger rule rather than an introduction, so a negative boundary must go in. Somebody else's Skills and Plugins are code that executes, so read and inspect before installing. Permissions are evaluated in the order `deny → ask → allow`, and dangerous tools must go under ask or deny.

---

## Further reading

- Anthropic, *Writing effective tools for AI agents* – <https://www.anthropic.com/engineering/writing-tools-for-agents>
- Anthropic, *Equipping agents for the real world with Agent Skills* – <https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills>
- Model Context Protocol official documentation – <https://modelcontextprotocol.io/docs/getting-started/intro>
- A2A Protocol – <https://a2a-protocol.org/latest/>
- Timo Schick et al., *Toolformer* – <https://arxiv.org/abs/2302.04761>
- Kim Dong-hak, 《하네스 엔지니어링 백과사전》 (*Encyclopedia of Harness Engineering*), chapters 4 and 7 – <https://wikidocs.net/346796>

---

Next: [06. Claude Code · Codex · Antigravity](/post/ai-everything-06-harness-products)
Previous: [04. Context engineering](/post/ai-everything-04-context-engineering)
