This piece dissects, stage by stage, ③–⑦ – the body of inference – from the seven-stage pipeline that [Part 01](/post/ai-everything-01-llm-and-token) compressed into one line each. If Part 01 is the map, this is the magnifying glass. It is independent of the series' main flow, so skipping it now and going to [Part 02](/post/ai-everything-02-what-is-harness) does not hinder reading on.

Let us start by putting the whole picture back in place.

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

---

## 1. ③ Attention – computing reference strength

**Attention** is the mechanism that decides how much each token refers to the other tokens in the sentence when updating its own representation. Every token looks at every other, giving large weights to semantically related tokens and small weights to unrelated ones, then mixes information in those proportions to make its representation anew. In "fix that file with that," the "that" token being connected so as to refer strongly to the earlier "file" is the typical example. **Reference strength** here is the plain-language rendering of this "how much it refers" ratio – the attention weight.

The computation is made of three kinds of vector. Multiplying each token's vector by three learned transformation matrices `W_Q`, `W_K` and `W_V` extracts the **Query**, **Key** and **Value** vectors. The order then runs like this.

1. Take the dot product of the current token's Query with each token's Key to get a raw score. This value is any real number, such as -3.2 or 18.4.
2. Divide the raw score by √d, the square root of the vector dimension d, to bring the magnitude into line.
3. Pass it through softmax to make ratios summing to 1. These ratios are the reference strength.
4. Weight-sum each token's Value in the proportions of the reference strength to make the current token's new representation.

![The stages of computing attention reference strength](/images/ai/attention-weights.svg)

The numbers in the figure are illustrative. If "that" gives "file" 0.82, then "file"'s information is mixed into the new representation with an 82% share. This computation runs in parallel across several attention heads and repeats across several layers, so context is reflected ever more deeply.

The reason for dividing by √d at step 2 is a property of the dot product. A dot product multiplies d components and adds them all up, so the larger the dimension d, the larger the variance of the result, in proportion to d (the standard deviation in proportion to √d). Feed large values straight into softmax and the distribution becomes extremely peaked, falling into a saturated state where gradients are nearly zero, and learning stops. This technique of dividing by √d to keep score magnitude independent of dimension is the Scaled Dot-Product Attention of the original paper, [Attention Is All You Need](https://arxiv.org/abs/1706.03762).

So where does the ability to bind "that" strongly to "file" come from? The reference strength value itself (0.82, say) is an intermediate value recomputed at every inference, while `W_Q`, `W_K` and `W_V`, the rules that produce that value, are model parameters fixed by training. Patterns of pronouns pointing at earlier nouns appeared countless times in the training data, and every time next-token prediction was wrong the error was backpropagated and these matrices were adjusted a little. Predicting well what comes after "fix it with that" is favoured by having "that" refer to "file," so training pushed the matrices in that direction. Which is to say, the association was not put in as a rule by a person but is the result of statistically compressing "binding it this way made predictions right" from vast examples and inscribing it into the parameters. The distinction stated in [Part 01, section 2](/post/ai-everything-01-llm-and-token) – "model parameters fixed, attention weights intermediate" – is exactly this arrangement.

---

## 2. ④ logits – scores for the whole vocabulary, and vocabulary size

**Logits** are raw scores rating, for every token in the vocabulary, "how likely it is to come next." The 100,000-item vocabulary in the figure above is an illustrative number, and the real value differs by model. What decides this number is **the tokenizer's vocabulary size**.

The vocabulary is built before the model is trained. An algorithm such as BPE repeatedly merges frequently co-occurring character pairs from a large body of text, making tokens until it reaches the vocabulary size the designer targeted (50,000, 100,000, 200,000 and so on). Which is to say, vocabulary size is "the total number of distinct token kinds this model can distinguish," a hyperparameter the designer sets. That number is directly the length of the logits vector and the number of rows in the embedding table. A larger vocabulary means each token carries more information and sequences get shorter, with the trade-off that logits computation at every step and the embedding table grow correspondingly.

The problem that frequently co-occurring character pairs differ between languages is handled in two layers. At the tokenizer layer, the vocabulary is built from a corpus mixing several languages, and byte-level BPE is used so that any character can at minimum be split into bytes. It is a safeguard so that even a character absent from the vocabulary does not become unprocessable. But whether split into bytes or bundled as character pairs, what finally enters the model is a token ID, and the computation after token IDs become embedding vectors is entirely identical. And the grammatical and semantic relations of each language are learned by the model, not the tokenizer. The tokenizer only splits, and the relations that bind are learned by ③'s parameters from each language's data – a division of labour.

---

## 3. ⑤ softmax – why it is turned into a probability distribution

Logits are arbitrary real numbers, so they can be compared by magnitude and cannot themselves be used as "the probability each token comes next." **Softmax** turns these scores all into values between 0 and 1 with a total summing to exactly 1, so they can be interpreted as a true probability distribution.

There are three reasons for turning them into probabilities. First, ⑥'s sampling operates on the premise of probabilities. Temperature and top-p are both defined only where there are "probabilities." Second, the model's essence is not "picking one next word" but "making a probability distribution over the whole vocabulary," and softmax is the stage that actually produces that distribution. Third, during training the error is computed by comparing this probability distribution with the correct token, so it has to be in probability form for training and inference to mesh consistently.

---

## 4. ⑥ Sampling – temperature and top-p

**Sampling** is the rule for actually drawing one token from the probability distribution. There are broadly two ways to choose. Always picking the highest-probability token (greedy) makes the result deterministic while identical every time; drawing in proportion to probability produces natural and varied sentences. This probabilistic sampling is exactly why an LLM gives different answers to the same question.

**Temperature** is a value borrowed by analogy from temperature in physics, controlling how peaked or flat the distribution is made. The logits are divided by this value just before softmax: low and the distribution peaks so the highest-probability token is almost always drawn (conservative and deterministic); high and the distribution flattens so lower-probability tokens have more room to be drawn (varied and creative). The physical intuition that higher temperature means more disorder is used as-is.

**Top-p** (nucleus sampling) is a control on another axis. Accumulating from the highest-probability tokens, it keeps as candidates only up to the point where cumulative probability reaches p (0.9, say), and discards the long tail entirely. Its characteristic is that the number of candidates varies each time, and it prevents the accident of an absurdly low-probability token being drawn while keeping diversity. In practice temperature and top-p are combined to set the width of diversity.

That does not mean a temperature of 0 is always better. For work where reproducibility matters – code generation, fact extraction, strictly formatted output, evaluation – keeping it near 0 is favourable, and for work needing diversity, such as brainstorming or writing, the same answer every time is a loss instead. Greedy is also a short-sighted method picking only the highest probability at each moment, so it can miss a better path for the sentence as a whole, and even at `temperature=0` it is not fully deterministic, because of differences in hardware operation ordering. Temperature is not good or bad but a knob chosen to match the character of the work. Note that an API lets this value be specified per call, while in a web chat app the provider's value is used and the user cannot touch it.

---

## 5. ⑦ Settling the next token – its relation to the preceding context

When it predicts that B comes after token A, B did not come from looking at A alone. What the model computes is the conditional probability P(next token | all preceding tokens), that is, "the probability of what the next token is, given the whole context so far." The relation between A and B is not 1:1 causation but the conditional relation "there is a high statistical likelihood of B following a context ending in A."

That likelihood has two sources. First, ③'s attention has already made A's representation reflecting the relation between A and the tokens before it. Second, the pattern "after such a context, such a token often came" from the training data is dissolved into the model parameters. "Seoul" coming after "the capital of South Korea is" is because that context was trained to predict that token strongly, not because the two tokens must grammatically adjoin.

And once B is settled, it goes back to ②, B is appended to the input, and the next token C is predicted. This structure of eating one's own output back as input and lengthening the context one token at a time is called autoregressive generation. Because the sampling at each step differs a little, the whole sentence differs too, so there is no guarantee that the same B comes from the same A context each time.

---

## 6. Summary

Attention makes Query, Key and Value with the trained `W_Q`, `W_K` and `W_V` matrices and computes reference strength through dot product, √d scaling and softmax, and the ability to bind tokens is statistically compressed into those matrices. Vocabulary size is a hyperparameter the designer sets when building the tokenizer vocabulary, and after logits are turned into a probability distribution by softmax, the next token is settled one at a time as a conditional probability by sampling under temperature and top-p rules. This repetition is autoregressive generation, and the structural reason an LLM gives slightly different answers to the same question.

---

## Further reading

- Ashish Vaswani et al., *Attention Is All You Need* – <https://arxiv.org/abs/1706.03762>
- Kim Dong-hak, 《하네스 엔지니어링 백과사전》 (*Encyclopedia of Harness Engineering*), chapter 2 – <https://wikidocs.net/346794>

---

Main line: [01. LLMs and tokens – anatomy of a prediction machine](/post/ai-everything-01-llm-and-token) · Next: [02. What a harness is – from wiring to AI](/post/ai-everything-02-what-is-harness)
