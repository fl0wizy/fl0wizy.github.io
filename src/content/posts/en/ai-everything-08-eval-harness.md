This piece runs through why evals are a requirement rather than an option, where to use computational checks and reasoning-based checks, environment-state-based evaluation that separates "saying it was done" from "it actually happened," and the Generator-Evaluator three-agent structure.

---

## 1. Defining an eval

An **eval** is a test that measures the quality of an AI system. The equivalent of an exam paper for AI, though not a multiple-choice paper with one right answer. OpenAI's evals documentation defines it as testing whether model output satisfies specified criteria, and presents a flow of writing a task description, running test inputs, analysing results and improving iteratively. Anthropic's evals piece describes an evaluation harness as the infrastructure that provides instructions and tools, runs the task, records the steps, grades the result and aggregates.

Evaluating a chatbot and an agent differ. A chatbot's **answer** is evaluated ("is this answer accurate?"). An agent's **result of action** is evaluated ("was the booking actually created in the DB?").

```jsonc
// chatbot test case
{ "input": "노트북이 켜지지 않아요", "expected_category": "Hardware" }

// agent task
{
  "task": "고객의 환불 요청을 처리하라",
  "environment": "가짜 주문 DB와 정책 문서",
  "success": "환불 가능 여부를 정확히 판단하고 초안만 작성한다"
}
```

Evals are a requirement because of non-determinism. As seen in [Part 01](/post/ai-everything-01-llm-and-token), an LLM picks tokens by sampling. Even for the same request, the wording or the approach differs. So what is needed is not "it looks fine this time" but a number such as **93 out of 100 representative cases passed**. The same as a driving test. Succeeding at parking once by luck is not verification of driving ability.

---

## 2. Trial, Grader, Assertion

The three basic terms. A **Trial** is the result of running the same test once. Because LLMs are non-deterministic, several runs may be needed. A **Grader** is the function or model that assigns a score, and an **Assertion** is a condition that must be satisfied.

```
Assertion 1: was an email actually not sent?
Assertion 2: was the refund policy document cited?
Assertion 3: was customer personal data not exposed?
```

Multiple trials are needed because judging from a single success or failure is risky. An important harness runs the same test several times and looks at the **average score, worst score and failure patterns**.

---

## 3. Three levels of evaluation method

The first is answer-based evaluation. Suited to tasks with a clear right answer, such as classification, extraction and format conversion. The expected output for "the monitor won't turn on" is Hardware, for "the app keeps crashing" it is Software, for "can I have a receipt" it is Billing.

The second is rubric-based evaluation. "Is this a good report?" and "is this a kind answer?" have no right answer. Turning them into a **rubric (a scoring sheet)** makes them evaluable.

| Criterion | 0 points | 1 point | 2 points |
|---|---|---|---|
| Accuracy | wrong | partly right | accurate |
| Kindness | rude | ordinary | shows empathy and guidance |
| Grounding | none | vague | grounded in a document |
| Safety | exposes personal data | slightly risky | safe |

Rubrics are especially powerful for non-developers, because they turn the feel of "a good answer" into concrete criteria. The same goes for subjective things like design quality. It can be turned into questions such as: can the user tell straight away what to do (clarity), are buttons, colours, spacing and wording consistent (consistency), are text size and contrast sufficient (accessibility), are failure states explained kindly (error handling), does it feel like a real product rather than a placeholder (finish).

The third is LLM-as-judge, that is, having an AI evaluate another AI's output. The advantages are that it can make semantic judgements and can see tone, logic, omissions and intent. But the judge makes mistakes too, it is slow and expensive, and its judgement wobbles. So **important evaluation is not left to a single judge.** Deterministic tests, human review and an LLM judge have to be combined.

---

## 4. Three kinds of verification loop

A verification loop is the procedure that rechecks a deliverable or the result of an action and sends problems back, and it divides three ways by what it catches.

- **Rule-based** (tests, linters, schema checks): good at catching format errors, broken functionality and clear failures. Misses semantic quality.
- **Visual and environmental verification** (screenshots, browser checks, DB state checks): catches mismatches between the actual screen and the actual state. Needs verification tooling prepared.
- **Reasoning-based** (LLM judges, review agents): sees tone, logic, omissions and user intent. Latency and cost grow and the judge gets things wrong too.

Split into computational and reasoning-based it is clearer still. Computational checks are like a spellchecker or a thermometer – fast, repeatable and stable, while missing meaning and intent. Reasoning-based checks are like a teacher marking an essay – they see meaning, context and intent, while being slow, expensive and wobbly. The basic principle: **catch first with the computational what the computational can catch, and attach the reasoning-based only where semantic judgement is needed.** Leave every evaluation to an LLM-as-judge and cost and latency grow, and the evaluation itself wobbles instead.

By direction there are the two axes of [Guides and Sensors seen in Part 02](/post/ai-everything-02-what-is-harness) – feedforward (AGENTS.md, CLAUDE.md, Skills, output formats, prohibition rules) and feedback (tests, linters, screenshot checks, LLM review, human review) – and this piece's verification loops are all components on the feedback side. The principle that either alone is not enough applies unchanged too.

---

## 5. Environment-state-based evaluation

Environment-state-based evaluation is the method of judging success by checking the state actually left in the environment after the work, rather than the agent's report sentence. It is the core point of Anthropic's evals piece. More than the agent saying "I have booked the flight," the outcome is whether the booking exists in the real environment's SQL database. **An agent can claim success in words. Whether the actual state changed has to be checked separately.**

The success criteria for a scheduling agent are not a pretty answer but things like these.

```
□ was the event created in the calendar at exactly the right time
□ are the attendees correct
□ are there no duplicate events
□ was no invitation sent that the user did not approve
```

Contrasting the claim of completion with actual verification makes the difference clear.

| Claim of completion | Actual verification |
|---|---|
| I built the login screen | enter an email and password in the browser and follow the login flow to the end |
| I built search | put in a real search term and check results, empty results and error states |
| I wired up the payment button | check the approval, cancellation and failure flows in the sandbox |
| I finished the report | check source links, missing items, duplicate sentences and output format |

**The completion criterion should be closer to "the usage flow passed" than to "the code exists."** In development work, browser tests, screenshots, logs and test reports are the evidence; in everyday work, booking numbers, receipts, confirmation emails and a final checklist are the evidence.

---

## 6. The Generator-Evaluator harness

People miss typos when reviewing their own writing. **AI too is excessively positive when evaluating its own results.** Because of this self-evaluation bias, Anthropic's 2026 piece on harness design introduces a three-agent architecture that separates generator and evaluator.

```
Planner ────→ Generator ────→ Evaluator ──(pass)──→ next sprint → (to Planner)
narrows scope    makes it       inspects
sets done criteria    ↑         critically
                      └──(fail · specific feedback)──┘
```

The Planner divides the large goal into small sprints. The thing to watch is that fixing the detailed implementation in advance passes wrong assumptions straight on. The Generator makes the deliverable, and leaving verification to it as well misses much. The Evaluator's goal is not kind praise but **finding defects**. Left alone it may be lenient, or pass things on a surface look.

The sprint contract is the promise for this iteration. It writes down what will be made, what will not be made, and which criteria have to pass. It is not a document written once and finished. A **negotiation process** is needed, where the Generator proposes "at this scope it can be built like this," and the Evaluator asks back "verification is insufficient by this criterion" or "this item should be pushed outside this sprint." The same as a meeting to prepare a birthday party. If the planner says they will do balloons, cake and invitations today, the reviewer adjusts it to booking the venue and confirming the guest list today, with the cake decided tomorrow after checking allergies.

The Evaluator has to be verified too. Left alone, an Evaluator does not stay a good judge. So read the evaluator's assessment logs and keep checking them.

```
□ which scenarios were actually run?
□ which failures were reproduced?
□ how were the pass criteria confirmed?
```

A good judge is not someone good at praise but **someone who finds reproducible defects.** Not "it looks fine" but "one child has a nut allergy and the cake ingredients were not checked, and the invitation has only a start time with no end time."

Related research includes [Self-Refine](https://arxiv.org/abs/2303.17651), the 2023 paper having a model critique and fix its own output; [Reflexion](https://arxiv.org/abs/2303.11366), the 2023 paper having an agent reflect on its failures in language and carry that into the next attempt; and Anthropic's evaluator-optimizer workflow, in which one LLM call produces the result and another provides evaluation and feedback.

---

## 7. Regression evals

A regression eval is an evaluation checking that a failure already fixed does not reappear. The phenomenon of a fixed bug reappearing is called regression. An AI harness needs regression evals too. **A failure case a user found is not something to throw away but an asset to add to the eval dataset.**

```
failure occurs → record the cause → add a test case → fix the harness → re-evaluate
```

This loop is what makes an AI system get better over time.

The *Better Harness* piece from LangChain, the company that builds a development framework for LLM applications, describes evals as **training data** for harness engineering. Each eval case provides the signal "did the agent take the right action in this situation?", and that signal leads to the next harness fix.

```
collect production traces
  → convert failure cases into eval cases
  → tag the failure type: tool selection / missing context / permission problem / insufficient verification
  → fix the harness: prompt · tool descriptions · permissions · verification loops · context structure
  → re-evaluate
  → check for overfitting with holdout cases
```

Overfitting has to be avoided. Changing the instructions too hard to pass one particular case drops quality in other situations. The exam-workbook analogy makes it easy. The problems you solve while studying and the mock exam you save to the end to check your ability have to be different. So evals are managed with tags, and some are kept as a **holdout set** unused during the fixing process.

---

## 8. Five steps to practical adoption

Practical adoption sorts into five steps. There is no need to start grandly.

```
1. gather 20 real requests that come in often
2. have a person decide the expected results
3. compare model output with the expected results
4. analyse the failure cases
5. fix the instructions · tools · documents · evaluation criteria
```

It is a flow that can be started without being a developer. It begins with writing down, as a sentence, "what is a good result?", and testing that criterion against small examples.

Put quality checks as far forward as possible (keep quality left). Before work, put instruction files, Skills, prohibition rules and output formats in place so it does not head in the wrong direction from the start. During work, use linters, fast tests, schema checks and small review agents so errors can be fixed right after they are made. Before integration, use the full test suite, security checks and coverage to catch big problems before merging; after integration, use more expensive reviews, performance tests and long-term drift detection to check the big picture slowly.

Finding out at the departure gate that you have no passport leaves nothing to be done. Checking with a checklist the night before prevents the same problem far more cheaply. But it does not mean piling every check at the front. Fast checks go at the front, expensive checks at the back. The core is **having the harness keep sending small signals along the way so that a person does not suffer all at once at the end.**

---

## 9. Summary

Evals are a requirement, not an option. "It feels better" cannot be an operating metric, and while a chatbot's answer is evaluated, an agent's result of action has to be. Because LLMs are non-deterministic, multiple trials are needed to see average, worst and failure patterns, and evaluation climbs the three levels of answer-based, rubric and LLM-as-judge – while important evaluation is not left to a single judge. Catch first with the computational what the computational can catch, and attach the reasoning-based only where semantic judgement is needed. The core is environment-state-based evaluation: look at whether the booking exists in the DB, not at the words "I booked it." Because the maker reviewing is pulled towards their own assumptions, separate Generator and Evaluator, and a good judge is not someone good at praise but someone who finds reproducible defects. Do not throw failure cases away; add them to the eval dataset, and keep a holdout set to prevent overfitting. Evals are the harness's training data.

---

## Further reading

- Anthropic, *Demystifying evals for AI agents* – <https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents>
- Anthropic, *Harness design for long-running application development* – <https://www.anthropic.com/engineering/harness-design-long-running-apps>
- LangChain, *Better Harness: A Recipe for Harness Hill-Climbing with Evals* – <https://www.langchain.com/blog/better-harness-a-recipe-for-harness-hill-climbing-with-evals>
- Aman Madaan et al., *Self-Refine* – <https://arxiv.org/abs/2303.17651>
- Noah Shinn et al., *Reflexion* – <https://arxiv.org/abs/2303.11366>
- Kim Dong-hak, 《하네스 엔지니어링 백과사전》 (*Encyclopedia of Harness Engineering*), chapters 5 and 9 – <https://wikidocs.net/346797>, <https://wikidocs.net/346801>

---

Next: [09. Long-running execution and memory ownership](/post/ai-everything-09-memory-longrunning)
Previous: [07. Multi-agent](/post/ai-everything-07-multi-agent)
