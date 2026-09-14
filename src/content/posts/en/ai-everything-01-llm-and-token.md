This piece organizes the containment relations between AI, ML, deep learning and LLMs; the model parameters and attention weights that are mixed together in the phrase "token weights"; and where tokenization happens and how token cost is structured.

---

## 1. How AI, ML, deep learning and LLMs contain one another

**AI, ML, deep learning and LLMs** are not separate technologies standing side by side but concepts in a containment relation, narrowing in scope as you go later. It is easy to think "AI = LLM." Since most of what is called AI these days is an LLM, that works in practice, but a distorted conceptual map breaks somewhere else later.

```
AI (artificial intelligence) – 1950s~ · rule-based · search · expert systems
├─ symbolic AI (inference engines · constraint solving)
└─ ML (machine learning) – learns rules from data
   ├─ classical ML (SVM · random forests · regression)
   └─ deep learning (multi-layer neural networks)
      ├─ CV · speech · diffusion models
      └─ LLM (Transformer · next token prediction)
         └─ agent = LLM + harness
```

So `AI = LLM + harness` is the wrong formula, and **`Agent = Model + Harness` is the correct one.** An LLM is a subset of AI, and what we feel as "AI doing work" is an LLM in its agent state, combined with a harness. This equation is the definition used in common by [LangChain](https://www.langchain.com/blog/the-anatomy-of-an-agent-harness), which builds a development framework for LLM applications, and by [Martin Fowler's site](https://martinfowler.com/articles/harness-engineering.html), the software design and refactoring author.

---

## 2. Model parameters and attention weights

**Token weights** is not a real term but a phrase in which two different concepts – model parameters and attention weights – are mixed together. The sentence "it predicts the next word using token weights" displays that confusion directly.

- **Model parameters (weights)**: not values attached to each token, but the tens to hundreds of billions of numbers the whole neural network obtained through training. Once training ends they are fixed.
- **Attention weights**: these really are weights on relations between tokens. Only, they are intermediate values recomputed on every inference, not stored knowledge.

Which is to say, the phrase "token weights" puts attention's intuition in the place of parameters. What actually happens is seven stages.

```
input text "이 파일 고쳐줘"
 → ① tokenization   [이, 파일, 고, 쳐, 줘]
 → ② embedding      each token → a vector
 → ③ Transformer    attention computes how much tokens refer to one another
 → ④ logits         a score for each of the whole vocabulary (say 100,000)
 → ⑤ softmax        converted into a probability distribution
 → ⑥ sampling       temperature · top-p
 → ⑦ one next token settled → (back to ② and repeat)
```

The core is ④–⑦. The model does not pick one word to come next; it makes **a probability distribution over the whole vocabulary**. With a vocabulary of 100,000 it produces 100,000 scores at every step. The number 100,000 here is an example value used in this piece; actual vocabulary size differs by model. Picking one of them is a sampling rule. At `temperature=0` it simply takes the highest probability; raise it and diversity appears. And this process repeats one token at a time. It does not compose the whole sentence at once.

This fact has a meaning in practice. That an LLM answers the same question differently is not a bug but stage ⑥, sampling. So "it worked once" is not verification, and multiple trials are needed (covered in [Part 08, the evaluation harness](/post/ai-everything-08-eval-harness)). When reproducibility is needed, lower the `temperature` and fix the seed – and even then it is not fully deterministic. Writing prompts well to tilt the probability distribution in the direction you want is what prompt engineering actually is.

The accurate statement is this. **An LLM computes a probability distribution over the whole vocabulary through its trained parameters, and repeats the job of picking one next token according to a sampling rule.** That is all that is needed to read this series. The inside of each of stages ③–⑦ – how attention computes reference strength, where vocabulary size is decided, how temperature and top-p behave – is dissected stage by stage in [Deep Dive 01](/post/ai-everything-deep-01-transformer).

---

## 3. input token → LLM → output token

An **input token** is a token going into the model, and an **output token** is a token the model generates and emits one at a time. Adding two things to this basic picture makes it accurate.

First, input is not only text. Images, audio and PDFs are all ultimately converted into tokens and occupy the context. Images are not free. One screenshot can be several thousand tokens.

Second, output is not only sentences. This is the core of agents. In modern tool-calling environments the model's output is often **a structured object**.

```jsonc
// what the model actually emits
{
  "type": "tool_use",
  "id": "toolu_01A...",
  "name": "Read",
  "input": { "file_path": "/Users/me/project/main.py" }
}
```

The harness takes this output and classifies it three ways.

- plain text: show it to the user and end the loop
- `tool_use`: check permissions, run the tool, wrap the result as an observation message and call the model again
- handoff request: delegate to another specialist agent

What moves a harness such as Claude Code, Anthropic's agentic coding CLI, is ultimately the LLM's output tokens too. The trigger for running a tool, editing a file or spawning a subagent is always this `tool_use` block. The harness does move before the LLM call as well, though. That part is examined in seven stages in [Part 03, the agent loop](/post/ai-everything-03-agent-loop).

---

## 4. Where tokenization happens

**Tokenization** is the process of turning a string into an array of token IDs from the model's vocabulary, and this conversion happens not in the harness but **on the provider's server**. The harness has no tokenizer.

```
[my computer = harness]
  typing: "이 파일 고쳐줘"
    ↓
  assembling JSON ── still a string! ──
    ↓ HTTPS
──────────────────────────────────
[provider server]
  ★ tokenization ★  string → array of token IDs
    ↓
  model inference
    ↓
  response + usage: { input_tokens, output_tokens }
──────────────────────────────────
    ↓
  the harness displays "15.2k tokens" on screen
```

What the harness sends to the server is JSON like this. There are no token IDs anywhere.

```jsonc
{
  "model": "claude-opus-5",
  "system": "...CLAUDE.md contents...",
  "messages": [{ "role": "user", "content": "이 파일 고쳐줘" }],
  "tools": [ /* tool schemas */ ]
}
```

So what is the token count Claude Code displays? Either the value the server reported in the response's `usage` field, or a client-side approximation. That Anthropic provides a separate token counting endpoint at all is evidence that the client cannot count exactly. To know exactly before sending, you have to ask the server.

Tokenizers differ by model. OpenAI uses the BPE (Byte Pair Encoding) family, a tokenization algorithm that merges frequently co-occurring character pairs into single tokens (how the vocabulary gets built is covered in [Deep Dive 01](/post/ai-everything-deep-01-transformer)), and has published it for its own models as the token counting library `tiktoken`. Anthropic keeps its own tokenizer closed and provides only a count_tokens API. Google partially publishes the SentencePiece family, its open-source tokenization library. Because the same sentence has a different token count per model, saying "this prompt is 3,000 tokens" means nothing without naming the model.

There is one fact particularly important for Korean users. **Korean eats more tokens than English.** Most tokenizers are optimized on English corpora, so it is common for Korean to use 1.5–3 times the tokens for the same meaning. Applying the English-world rule of thumb "character count ÷ 4 = tokens" to Korean therefore underestimates badly; the same 200k context window holds far less Korean text, and cost rises accordingly. For long reference documents whose original is English, there are times when it is better not to translate them in at all.

---

## 5. The context window

The **context window** is the token range the model can see all at once in a single call. The analogy of "RAM" is used often; it is good as an introductory map but not accurate.

| RAM | Context window |
|---|---|
| randomly accessible | the whole thing is re-read on every call |
| you pay for what you write | cost is incurred every turn for what is in it |
| position is irrelevant to performance | position changes performance (Lost in the Middle) |

The third is decisive. The [Lost in the Middle](https://arxiv.org/abs/2307.03172) research reported that performance drops noticeably when relevant information sits in the middle of the context. Worse than when it is at the front or the end. Similar to a long meeting transcript. An important decision at the very start or very end is remembered, but buried somewhere in the middle even the attendees miss it.

So **the context window is not an infinite warehouse but a limited desk.** With no material on the desk the AI guesses, and conversely putting everything on it means it cannot find the important document. The technique for handling this problem is context engineering, the subject of [Part 04](/post/ai-everything-04-context-engineering).

---

## 6. How token cost is structured

**Token cost** is structured with a unit price on input tokens and on output tokens each, billed by usage. The token count shown on screen means that consumption. Understanding the billing structure accurately takes three corrections, though.

First, input tokens are billed too. Overwhelmingly so. A coding agent has far **more input than output.** Because every turn the system prompt, CLAUDE.md, tool schemas, conversation history and the contents of files read all go in again.

```
turn 1:  input 20k  + output 500
turn 2:  input 25k  + output 800    ← turn 1's contents go in again
turn 3:  input 31k  + output 400    ← turns 1+2 go in again
...
turn 20: input 150k + output 600
```

Because of this accumulating structure, long sessions get more expensive the further they go. This is why [Part 09](/post/ai-everything-09-memory-longrunning)'s compaction and session resets are needed.

Second, prompt caching changes this picture. Cache the repeated front part (system prompt, CLAUDE.md, tool definitions) and cache reads are far cheaper than ordinary input. In exchange cache writes are a little more expensive. So the token count on screen and the actual bill are not linearly proportional. It is also why harness design puts "what does not change at the front, what changes at the back." The front has to be fixed for the cache to survive.

Third, reasoning tokens are included in output too. The thinking a model does before answering is output tokens as well, and it is billed even when it is not shown on screen.

---

## 7. Summary

AI ⊃ ML ⊃ deep learning ⊃ LLM, and the accurate formula is `Agent = Model + Harness`. There is no such thing as "token weights." It is a phrase mixing model parameters, the fixed result of training, with attention weights, intermediate values computed during inference. Because the model makes a probability distribution over the whole vocabulary at every step and picks one token by sampling, the answer differs slightly each time (the inside of each stage is dissected in [Deep Dive 01](/post/ai-everything-deep-01-transformer)). Output may be a sentence or a structured object such as `tool_use`, and the latter is what makes an agent an agent. Tokenization happens on the provider's server, and the harness sends a string. Tokenizers differ by model, and Korean eats more tokens than English. The context window is closer to a desk than to RAM, and position changes performance. Cost is dominated by input, and prompt caching changes the picture.

---

## Further reading

- Nelson F. Liu et al., *Lost in the Middle: How Language Models Use Long Contexts* – <https://arxiv.org/abs/2307.03172>
- Anthropic, *Effective context engineering for AI agents* – <https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents>
- Kim Dong-hak, 《하네스 엔지니어링 백과사전》 (*Encyclopedia of Harness Engineering*), chapter 2 – <https://wikidocs.net/346794>

---

Next: [02. What a harness is – from wiring to AI](/post/ai-everything-02-what-is-harness) · Deep dive: [Deep 01. Dissecting the Transformer](/post/ai-everything-deep-01-transformer)
