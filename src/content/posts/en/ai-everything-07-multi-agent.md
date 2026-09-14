This piece runs through the conditions for multi-agent, the difference between Subagents and Agent Teams, why the split is by context boundary rather than role name, and even when multi-agent should not be used.

---

## 1. Defining multi-agent

Multi-agent is the structure in which several agents, each with an independent context window and execution loop, divide one goal between them. **Model diversity is not a condition here.** Orchestrating 10 subagents in one session while all 10 talk only to Opus, Claude's top model tier, is still multi-agent. What defines multi-agent is not model diversity but four things.

- **Independent context windows**: each agent has its own desk
- **A distinct system prompt/role**: "you are in charge of researching accommodation"
- **Separated tool permissions**: do not give the researcher deployment rights
- **A coordination structure**: who divides and who combines

Anthropic's multi-agent research system also has the lead agent and the subagents using the same model family. Claude Code's subagents also default to the same model.

The reverse holds too. Even with 50 Skills, 10 MCP servers and 20 Hooks attached, **if there is one context window it is a single agent.** Just an extended single agent. The unit of counting is not the word "agent" but an independent context window with its own loop.

Model tiering is a separate technique. Using a strong model for judgement and a cheap, fast one for simple tidying is a cost and latency optimization technique, not a condition of multi-agent.

```
multi-agent   ← a problem of dividing context
model tiering ← a problem of optimizing cost
     these can be used together, but neither is a condition of the other
```

---

## 2. The difference between Subagents and Agent Teams

Even the same "several agents" divides in two. Fail to distinguish them and you pick the wrong structure.

By the analogy of preparing a family trip: you are going on a family trip on Saturday and there is a lot to do. And two kinds of work are mixed in. The first is work that can be investigated separately. Finding three candidate places to stay, comparing train timetables, listing nearby restaurants – one person can investigate separately and bring back only the result, with no need to keep meeting in between. That is a Subagent. The second is work that has to keep being reconciled. Change the accommodation and transport changes; if transport costs rise the budget changes; if your parents struggle with a place with many stairs the accommodation candidates have to be looked at again. That is Agent Teams. And if it is just a simple day trip, the cost of dividing may be greater, so a single agent is better.

| | Subagent | Agent Teams |
|---|---|---|
| Basic character | fire-and-forget | collaborative |
| Way of working | finishes the assigned work and reports | shares state with one another and coordinates |
| Conversation between agents | none | yes |
| Shared memory | none | a shared task list and state |
| Persistent state | almost none. Gone when finished | context accumulates over time |
| The parent's role | delegates and receives a summary | runs the team and synthesizes results |
| One-line summary | "go and research this" | "let's work on it together with meetings" |

---

## 3. Subagents

A Subagent is a lower-level agent that a parent agent delegates to in an independent context, to finish one narrow task and return only the result. A structure that gains parallelism through isolation. One Subagent usually carries four things: **a distinct system prompt** fixing what kind of specialist this agent is ("you are in charge of researching accommodation"), an allowed tool list restricting which tools can be used (only maps and booking sites for the accommodation researcher), a clean independent context carrying only the needed information without the noise of the parent conversation, and one narrowly scoped task such as "compare three accommodation candidates."

The core value is keeping the parent's head clear. Long research logs, code search results and comparison tables of many candidates need not all go into the parent's context. The subagent investigates, and only a compressed result comes back to the parent.

```
parent agent (trip overall)
 ├─ "research 3 places to stay" → accommodation (independent context) ─┐
 ├─ "compare train timetables"  → transport (independent context)      ─┼─→ each returns just "one table"
 └─ "list restaurants"          → restaurants (independent context)    ─┘
                              ↓
                      the parent's final judgement
```

Work that suits Subagents:

- mutually independent research
- exploring a particular area of a codebase
- first-pass summaries of several documents
- reviews with a distinct perspective such as security, performance or style
- lookup work where the parent only needs the final summary

Its weakness is clear too. **It is weak on work where something found midway has to change another subagent's judgement immediately.** Suppose the accommodation researcher finds "this place is cheap but too far from the station." If that information has to change the transport researcher's judgement straight away, then in a structure where the accommodation researcher holds the result to the end and reports at the finish, the transport researcher may already have computed times on the wrong basis.

---

## 4. Agent Teams

Agent Teams is the structure in which several agents proceed together, reconciling intermediate state through a shared task list and conversation with one another. Coordination through communication rather than isolation. Agent Teams has three moving parts: a **team lead** that divides the work, sets the order and synthesizes results (the trip coordinator), teammate agents that each have their own context window and work in parallel (accommodation, transport, budget), and a shared task list tracking waiting/in-progress/done states and dependencies (the shared checklist on the fridge).

The core is not gathering results but reconciling intermediate state together. When the frontend person says "the API response structure has to change," the backend person can adjust immediately without waiting for the team lead. The test person sees that change and moves out of waiting. Similar to a family group chat. When the accommodation person posts "there is only one room available," the budget person recomputes cost immediately and the transport person re-examines travel time.

Work that suits Agent Teams: work where the results of several roles keep affecting one another, work where a midway discovery changes another task's direction, work with much waiting, blocking and prerequisites between tasks, and long-running projects rather than an investigation that ends in one go.

---

## 5. The criterion for dividing – context boundaries, not roles

A context boundary is the dividing line drawn on the criterion of whether two tasks need the same information, and it is the criterion for splitting multi-agent. The most common mistake in multi-agent design is dividing work by role name.

```
X planning → implementation → testing
   it looks tidy, and information is lost at every handover
```

The same as the telephone game. The first sentence was clear, and after passing through several people it is a different sentence. The good criterion is not role but **context boundary**. If two tasks deeply need the same information, one agent takes them on in sequence; if they need only mutually independent information, split them. If a midway discovery has to change another task, use a communicating structure such as Agent Teams; if the results just need combining, use an isolating structure such as Subagents.

It matters especially in coding. It is often more natural for the agent that implemented a feature to write that feature's tests too. Because it already knows the implementation intent and the exception handling. Unconditionally separating the person who cooks the stew from the person who tastes it is odd. The one who cooked knows what ingredients went in, so they check the basic seasoning first. Instead, **it is good for someone else to taste it once before it goes to the guests.**

This leads into [Part 08's Generator-Evaluator](/post/ai-everything-08-eval-harness) structure. Not splitting every stage by role, but making only the final verification independent.

---

## 6. Five orchestration patterns

Whether Subagents or Agent Teams, the real flow is a combination of these patterns.

- **Prompt chaining**: the previous stage's result as the next stage's input. When order matters and stages depend on one another
- **Routing**: look at the request and send it to the right specialist or model. When separating easy work from hard
- **Parallelization**: run independent work simultaneously. Multiple investigations, generating multiple candidates, summarizing multiple documents
- **Orchestrator-worker**: a central agent divides and synthesizes. Frequently used in both Subagents and Agent Teams
- **Evaluator-optimizer**: one makes and another evaluates and sends it back. When quality matters and it is hard to finish in one go

These patterns are not exclusive. Combine them: the parent routes the request, runs three Subagents in parallel, then an evaluator agent reviews the results.

As an example of a good division of labour: the Planner breaks the goal into small stages, the Researcher finds and summarizes material, the Builder makes the deliverable, the Evaluator critically verifies the result, and the Reporter writes a report a person can understand.

---

## 7. When not to use multi-agent

Multi-agent looks impressive and is not always the answer. If the work is simple enough that one good prompt suffices, the cost of dividing exceeds the gain. If agents have to keep asking each other about context, coordination cost explodes. If the cost of managing task dependencies exceeds the actual execution gain, management becomes the real job. If several agents have to edit the same file at once they conflict, or, more dangerously, **merge without conflict while the design assumptions come apart.** And if there is no way to measure whether results got slower and cost merely rose, you do not even know whether it is an improvement or a regression.

By house-repair analogy, it is dangerous if the electrician and the plumber tear open the same wall at the same time without talking. One may move the socket position and the other may route a pipe through that spot. Each worked hard, and combined it is a problem. So in coding it is safer to use Subagents as **a role that reads, investigates and reports risks** rather than as workers writing code simultaneously.

There are broadly three failure modes.

First, when the task description is vague, agents do the same work as each other.

```
X "go and research it"
O "list 5 security risks in a table based on the official documentation, and do not edit any code"
```

Every agent needs a clear purpose, expected output format, tools and material to use, and scope not to touch.

Second, the verifying agent does not actually verify and says "it's fine."

```
X "take a good look"
O "run the full test suite, and do not say done until these three cases pass"
```

**Verification has to be a procedure, not an impression.**

Third, token cost grows faster than expected. As agents multiply, each moves carrying its own context. Three people investigating separately for 10 minutes each is 30 minutes, but five people gathered in continuous meetings for an hour spends five hours. "More people so it will be faster" is not always right. So model tiering (a strong model for important judgements, a fast cheap one for repetitive lookups) and budget limits and stop conditions have to be part of the harness.

---

## 8. A practical decision procedure

```
1. first try solving it with one agent
2. see where it fails
3. if the context gets too large → isolate with a Subagent
4. if there is a lot of independent research → use Subagents in parallel
5. if intermediate state has to keep being reconciled → consider Agent Teams
6. if the same file has to be edited simultaneously → avoid parallel writes
7. measure whether cost, speed and quality actually improved
```

This order is the same as harness engineering's basic attitude. **Do not build the complex structure first.** Start small, see where it actually breaks, and add structure only there. Anthropic's "Building Effective Agents," which organizes patterns for building agents, recommends the same direction: first check whether a single LLM call, retrieval and examples suffice, and attach workflow and agent structures when needed.

---

## 9. The harness's assumption about model limits

The harness's assumption about model limits is the property that every structure of a harness stands on the premise "the model cannot do this alone." Anthropic's piece on managed agents gives an important warning. **A harness encodes the things it assumed the model could not do.** So as models improve, those assumptions can go stale. Multi-agent is the same. A structure divided today because context was insufficient can become unnecessary complexity on the next model with more context. This is [Part 11's "scaffolding" principle](/post/ai-everything-11-patterns-decisions).

---

## 10. Summary

The condition for multi-agent is not model diversity but independent context windows, roles, tool permissions and a coordination structure. Ten subagents all using the same model is still multi-agent; model tiering is merely a cost optimization technique; and however many Skills, MCPs and Hooks there are, one context window means a single agent. Subagents are fire-and-forget (errands) and Agent Teams are collaborative (meetings). Divide by context boundary, not by role name, because information is lost in the telephone game. Parallel writes editing the same file at once should be avoided, and merging without conflict while the assumptions come apart is more dangerous than conflict. In the end multi-agent is a tool for quality and context management rather than speed, and cost goes up rather than down.

---

## Further reading

- Anthropic, *How we built our multi-agent research system* – <https://www.anthropic.com/engineering/built-multi-agent-research-system>
- Claude Code Docs, *Create custom subagents* – <https://code.claude.com/docs/en/sub-agents>
- Claude Code Docs, *Orchestrate teams of Claude Code sessions* – <https://code.claude.com/docs/en/agent-teams>
- OpenAI Agents SDK, *Handoffs* – <https://openai.github.io/openai-agents-python/handoffs/>
- Kim Dong-hak, 《하네스 엔지니어링 백과사전》 (*Encyclopedia of Harness Engineering*), appendix E – <https://wikidocs.net/350445>

---

Next: [08. The evaluation harness](/post/ai-everything-08-eval-harness)
Previous: [06. Claude Code · Codex · Antigravity](/post/ai-everything-06-harness-products)
