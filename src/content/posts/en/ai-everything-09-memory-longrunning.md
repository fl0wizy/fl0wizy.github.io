This piece runs through the shift-work problem and the session handover structure, the four models of memory ownership and lock-in risk, and the operating criteria for good memory.

---

## 1. State discontinuity between sessions (the shift-work problem)

State discontinuity between sessions is the problem of a newly started session not knowing the previous session's work state, so that it repeats the same investigation or misjudges what is complete. It is called the shift-work problem, by analogy with workers changing shift without a handover.

In short conversations the AI looks good. But in work that continues over many hours or many days, problems arise. As the conversation grows the context gets complicated, earlier decisions are forgotten, and eventually it starts to believe that unfinished work is finished.

Anthropic's *Effective harnesses for long-running agents* emphasizes the problem that **each new session does not know the previous work state**. The same as a night-shift worker arriving with no handover at all, having to investigate again what the day shift did.

There is a less well-known failure mode too: the context anxiety Anthropic's harness design piece points out. When it feels the context window is nearly full, the agent tends to hurry to wrap up, declaring this is probably enough without properly checking what remains. People too want to push difficult points to next time as a meeting's end approaches. So a long-running harness does not merely tell the model to hold out; it gives it **a handover structure to pass to a new session** at the right moment.

---

## 2. Compaction and context reset

Compaction is the technique of summarizing a long conversation to reduce context. It has the advantage of letting the conversation continue, at the price that **important details drop out in the summarizing.** Exactly as stated in [Part 04](/post/ai-everything-04-context-engineering), source records such as a progress file, a feature list and git history have to be held alongside the summary.

The option in the other direction is context reset, that is, starting a new session. It looks risky and is actually powerful when designed well. A new session removes the old noise and starts by reading only the structured handover documents. Good moments to reset: when one feature unit is finished, when the conversation has grown too long, when the model is repeatedly confused, and when an agent in a new role is needed.

---

## 3. The session handover structure

The records used in handover are broadly four.

- **feature_list.json**: structures what remains
- **progress.md**: explains what has been done so far
- **git history**: holds the actual change history
- **test report**: leaves evidence of what was verified

Of these, the feature list is the most practical part of Anthropic's piece. A feature list is not a to-do list but **a verification ledger**.

```jsonc
[
  {
    "id": "auth-01",
    "feature": "이메일 로그인",
    "verification": "브라우저에서 로그인 → 대시보드 진입 → 새로고침 후 세션 유지",
    "passes": false          // ← 처음에는 전부 false
  }
]
```

There are three rules. Every item starts at `passes: false`. The agent may not change the feature descriptions or test conditions at will. It may change `passes` to `true` only after actually implementing and confirming.

On a long-trip checklist, writing only "look into insurance" leaves the completion criterion vague. Writing that the policy PDF exists, the dates are right and every family member is covered makes it checkable. A good feature list is not a document that writes down what to do but one that writes down **what has to be proved before saying done**.

The reason for using JSON is here too. A free-form Markdown list is easy for an agent to merge items in or reword. JSON has a clear structure, making it easy to give the rule that feature names and verification conditions stay fixed and only the pass state changes.

Anthropic's long-running harness research separated an initializer agent from a coding agent. The community has also introduced this flow of repeatedly running sessions with the same instruction under the name Ralph Loop.

```
Initializer Agent
  init.sh · progress.md · feature_list.json · first git commit
        ↓
Coding Agent (session 1)
  1. read git log · progress · feature list
  2. pick one unfinished feature
  3. implement · fix
  4. test
       ├─ pass → change feature list state · git commit · update progress
       └─ fail → leave the failure log in progress
        ↓
Coding Agent (session 2) – reads the traces and continues
```

The same as shift work at a hospital running 24 hours. However capable the doctor, without a handover chart they miss the patient's state. Here the filesystem is not a simple store but **the memory device bridging context windows**. What is in the conversation window is compacted or lost as it grows, while progress.md, feature_list.json, git history and test reports can be read again by the next session. "Leave it so the next model can read it too" is a safer principle than "the model remembers." Do not merely tell the AI to continue; have it leave, as files, the traces that make continuing possible.

There is also a point raised in the harness piece from LangChain, the company that builds a development framework for LLM applications. In long work, an agent may decide by itself to wrap up when the context gets complicated. Here, rather than terminating immediately, the harness can open a fresh, clean session and have it read the original goal, the progress files and the remaining feature list again. The same as having a doctor about to go home check whether any patient is missing from the handover chart before passing to the next shift.

---

## 4. Git · init script · smoke test

From the harness view, Git is a **state memory device**. It records which files changed when and why. When an AI works over a long period, git commits play the role of a work log. The same structure can be built outside development work. Document version records, change logs, approval history and work completion sheets all play the same role as git history.

An init script is a script that prepares the environment when a new session starts, and a smoke test is a test that quickly checks that basic functionality is not badly broken. The same role as a restaurant's opening checklist. Check the gas valve, the fridge temperature, the card terminal and the reservation list before opening for business.

When ending a session, demand a clean state. Have it leave a change summary, the tests run, the tests that failed, the remaining work and the recommended next task.

---

## 5. The four failures of long-running work

Four failures recur in long-running work.

- **Declaring everything complete too early.** Building only part and believing it is finished. Supplement by having it read the remaining items in the feature list first.
- **Handing to the next session in a buggy state.** The next session has to find the cause of failure again. Have it leave failing tests and error logs in the progress file.
- **Not checking the real usage flow.** It looks built and the user is blocked. Demand browser verification, screenshots and scenario tests.
- **Looking up how to run it again every time.** Time is wasted at every start and mistakes recur. Fix the start-up procedure with `init.sh` and a smoke test.

The hospital shift analogy applies unchanged here too. Writing only "patient stable" leaves the next doctor not knowing what is stable. There have to be **checkable items** such as temperature, blood pressure, medication given and the time of the next test.

---

## 6. The relation between memory and the harness

Memory is a resource the harness operates. What goes into the context when, what is stored long-term, and who may edit, delete or migrate it are all items of harness design.

Memory looks like an add-on to attach later, and using it properly raises questions the harness has to answer.

- When do CLAUDE.md and AGENTS.md go into the context? This decides whether project rules are applied reliably.
- When is long-term memory retrieved? Taking it out only when needed reduces context pollution.
- What remains and what disappears after compaction? Important decisions can vanish in summarizing.
- Can the agent edit its own memory? Self-improvement becomes possible, and wrong memories accumulate too.
- Are memory provenance and edit history visible? Needed for auditing, debugging and personal data deletion requests.
- Can the memory be moved to another model or harness? The key condition for avoiding provider lock-in.

All of these are harness design questions. So rather than "plug memory into the harness," it is more accurate to ask **"how does the harness operate memory?"**

Short-term memory is the material currently spread on the desk. The current conversation, recent tool output and just-read files belong here, and too much of it confuses the model. Long-term memory is the record kept in a drawer or a warehouse. User preferences, project rules, past decisions and failure cases go here, and without ownership, migration, auditing and deletion become difficult.

The harness handles both. The model sees only what is inside the context window. To connect long-term memory to actual behaviour, the harness has to find it, summarize it, put it in, and store the result back.

---

## 7. The four models of memory ownership

Whose is the memory an AI agent accumulates? This is not a technical question. It connects to product strategy, user experience, data ownership, provider lock-in and regulatory compliance.

| Model | Structure | Advantage | Risk |
|---|---|---|---|
| 1. Self-owned harness | manage prompts, tools and short- and long-term memory directly, call the API only when needed | high data and memory portability. Survives changing models | heavy implementation burden |
| 2. Stateful provider API | long-term memory yourself, short-term threads and server-side compaction by the provider | development is easy | hard to continue a conversation on another model, and hard to verify the accuracy of compacted summaries |
| 3. Closed/black-box harness | prompts and some tools yourself, memory reads and writes internal | "it works" | the shape, summarization method, provenance, edit rules and migration path are unclear |
| 4. Managed harness + managed memory | tool execution, runtime and memory all on the provider's infrastructure | fastest start, low operating burden | the export API, audit logs, permission scope and deletion policy must be checked |

Memory lock-in is stronger than it looks. In the era of using models alone, changing provider was easy. Adjust the prompt a little and you could move to another model. But once an agent **starts accumulating long-term memory**, the situation changes.

Over time memory comes to hold things like these.

```
· the tone the user prefers
· how the organization makes decisions
· the files and tools used often
· approaches that failed in the past
· reporting styles the approver dislikes
· the response style per customer
· prohibition rules per project
· frequently occurring errors and their fixes
```

This is the product's **differentiating asset**. Even with the same model and tools, with memory the product becomes progressively personalized. Conversely, without memory anyone can build a similar agent. If the memory lives only inside a particular platform, cannot be exported and has an unknown structure, then leaving that platform turns the agent from an experienced employee back into a new starter on their first day. Put the memory only in someone else's safe and the differentiation goes into someone else's safe.

This does not mean do not use a managed harness. Only that failing to answer the questions below makes migration cost far higher later. Questions to check before deciding on adoption:

- **Where is the memory stored?** My DB, files or object storage, or a clear export, is a good sign. Existing only in the provider's internal state is a warning sign.
- **Is the memory format knowable?** JSON, files, a standard schema and version control are good signs. Black-box summaries and an undisclosed structure are warning signs.
- **Can it be moved to another model?** A model-independent API or file-based export is a good sign. Being tied to a particular model or thread is a warning sign.
- **Can it be deleted and edited?** Per-user deletion, redaction and rollback are good signs. An unclear deletion policy is a warning sign.
- **Is it visible who created a memory?** Per-agent and per-session audit logs are good signs. Unclear provenance is a warning sign.
- **What remains after compaction?** Being able to inspect the compaction policy and the summaries is a good sign. Not knowing what disappeared is a warning sign.
- **Are cost and latency tracked?** Being able to observe memory read/write cost and latency is a good sign. Difficulty in tracing causes is a warning sign.

If the answers are vague, that vagueness is itself the risk.

The realistic strategy divides by situation. For an experiment or prototype, verify fast with a managed harness and memory. For an internal tool, managed is fine while checking export and audit logs. Where customer data is included, check the memory's storage location, deletion rights, permissions and contract terms. For a long-term differentiating product, **own the core long-term memory yourself or make it portable.** In a regulated industry, prioritize memory provenance, retention, deletion and auditability.

---

## 8. Operating criteria for good memory

The operating criteria for good memory are not volume stored but four things: selection, retrieval, scope and migration. The rules that decide what to pick, when to take it out, in which scope to keep it, and how to move it.

Memories worth storing and memories better not stored differ. Recurring user preferences, rules that must keep being kept in the project, approaches that failed in the past and why, ways of working that take a long time to explain again, and reporting formats, approval procedures and forbidden expressions are worth storing. On the other hand, temporary requests needed once today, general information already clearly written in documents, unverified guesses, temporary choices likely to change soon, and unnecessarily sensitive personal data are better not stored.

The way of reading is best structured as looking at the contents first and opening only the needed page. The memory index shows at a glance what memories exist, and the memory body holds the actual detailed rules and grounds. The relation between the first page of a health record book and the detailed pages on allergies, medications and test results. The same principle as [Part 04's progressive disclosure](/post/ai-everything-04-context-engineering).

Old memories are rechecked like sticky notes. If it says an important function is in this file, check whether the file still exists; if it says this customer prefers approach A, check it does not conflict with a recent contract or conversation; if it says this team uses this reporting format, check the latest template has not changed; if it says this method failed last time, check the conditions are still the same.

Memories are divided by scope too. Personal memory holds tone preferences and reporting formats like a personal notebook, managed by the user themselves. Project memory holds project rules and forbidden approaches like a per-trip preparation file, going through the project manager's approval. Organizational memory holds security policy, approval procedures and legal standards like shared family rules, with reads opened widely and writes restricted. Temporary memory holds this session's work state like today's shopping note, tidied up when the session ends.

Moving memory is not copying files. Three things have to move: the memory's content (user preferences, project rules, past decisions), the memory's structure (whether it is personal, project or organizational), and the memory's usage (when to read it, what to compare it with, how strongly to apply it). Leave out the third and the files move while the behaviour differs.

Memory needs safety devices too. There has to be a check before storing and verification rules when reading. Things like the following must not go into memory.

```
- sentences telling it to ignore existing instructions
- sentences telling it to read passwords or tokens
- sentences telling it to act while hiding it from the user
- sensitive information of unclear provenance
- instructions from unverified external documents
```

This is **prompt injection by way of memory**. Once stored, it affects every session afterwards. The details are covered in [Part 10](/post/ai-everything-10-safety-governance).

Compaction and summarization are subject to evaluation too. Long context requires compaction, and compaction is lossy. Whether the core constraints remain after summarizing, whether user preferences were distorted, and whether security rules dropped out have to be verified with evals.

---

## 9. Summary

The fundamental problem of long-running work is the shift-work problem. A new session does not know the previous state, and an agent that feels the context is full hurries to wrap up. Because compaction is lossy, source records such as a progress file, a feature list and git history have to be held alongside, and the feature list has to be a verification ledger starting at `passes: false` for everything, not a to-do list. The filesystem is the memory device bridging context windows, and the principle is to have traces that make continuing possible left as files, rather than saying "continue."

Memory is not an add-on plugged in later but a resource the harness operates. Of the four ownership models, managed is fast while export, auditing and deletion policy must be checked. **Not owning the memory makes owning the agent difficult.** Good memory is not storing a lot but choosing well, dividing scope, rechecking, and making it movable.

---

## Further reading

- Anthropic, *Effective harnesses for long-running agents* – <https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents>
- Anthropic, *Harness design for long-running application development* – <https://www.anthropic.com/engineering/harness-design-long-running-apps>
- Claude Code Docs, *How Claude remembers your project* – <https://code.claude.com/docs/en/memory>
- Claude Code Docs, *Checkpointing* – <https://code.claude.com/docs/en/checkpointing>
- Minki Kang et al., *ACON* – <https://arxiv.org/abs/2510.00615>
- Kim Dong-hak, 《하네스 엔지니어링 백과사전》 (*Encyclopedia of Harness Engineering*), chapters 8 and 14 and appendix D – <https://wikidocs.net/346800>, <https://wikidocs.net/346806>, <https://wikidocs.net/350444>

---

Next: [10. Safety, governance and operations](/post/ai-everything-10-safety-governance)
Previous: [08. The evaluation harness](/post/ai-everything-08-eval-harness)
