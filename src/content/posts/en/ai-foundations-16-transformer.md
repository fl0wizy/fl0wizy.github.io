## Introduction

Previous chapter: [recurrent neural network - Chapter 13](/post/ai-foundations-15-rnn)

In Chapter 13, the RNN passed the previous state to the next time, and the LSTM and GRU controlled which of them to keep and which to rewrite. However, to write information at the beginning of a long sentence at the end, multiple state updates still had to be performed. In a simple encoder-decoder, there was also the burden of summarizing the entire input into one final state.

Let's think about translating. Rather than reading a sentence once, covering the original text and relying only on memory, it is good to be able to look at the necessary parts of the original text again when creating the next word. **attention is an operation** that scores how much information needed for the current calculation is referenced and collects information according to that ratio.

Attention is not the same thing as Transformer. Attention can also be attached to RNN-based translation models. [A study by Bahdanau et al.](https://arxiv.org/abs/1409.0473), released in 2014 and presented at ICLR 2015, refers to the input part needed to reduce the bottleneck of compressing the input into one fixed-length vector. Afterwards, in 2017, Transformer changed its structure to process sequences centered on attention without RNN.

Therefore, the position of this chapter is not **a new principle for learning weights**, but **a new structure for transferring information between inputs**. Weighted sum, activation function, Softmax, loss, and backpropagation reuse parts from the previous chapter. First, we will look at the entire building, open each part, and finally connect the process through which a single sentence actually goes through.

## 2. Find out where you are looking in the Transformer overall structure.

![Chapter 14. Attention and the Transformer — Figure 1](/images/ai-study/8db803e6f5663eea24c6.png)

The left side of the picture is the **encoder**, and the right side of the picture is the **decoder**. The encoder changes each position of the input sentence into a vector that reflects the surrounding context. The decoder predicts the next token by referring to the output generated so far and the expression created by the encoder. Data flows from the bottom of the picture to the top, and num\_layers means stacking multiple layers of blocks of the same type.

At first, you only need to distinguish between five areas.

| location | What to do | Connection to previous chapter |
| --- | --- | --- |
| Tokenization and Embedding | Convert text into a vector of numbers for the model to compute | Preprocessing and learned expression to represent input as numbers |
| location information | Provide ordering clues to vectors | Provides information separately from the RNN in the processing order |
| attention | Take information you need from other places and mix it up | Weighted sum but mixing ratio is calculated from current input |
| FFN, Add, Norm | Representation variation and stable learning at each location | Dense·Activation·computational graph·backpropagation |
| Linear and Softmax | Generate scores and probabilities for each candidate in the vocabulary | Multiclassification in Chapter 2 and Loss Learning in Chapter 11 |

This structure is not included in all language models. BERT mainly uses a left encoder type, GPT uses a decoder-based type without a separate encoder, and T5 uses both an encoder and a decoder. Let’s look at this difference again after understanding each block.

## 3. What is the difference between token number and embedding vector?

A computer cannot perform matrix multiplication on the sentence itself. First, the text is divided into processing units called **tokens**, and each token is assigned an integer ID. A token can be an entire word, a part of a word, or a symbol. For ease of explanation, we treat “I like movies” like three tokens here. The actual split may vary from tokenizer to tokenizer.

For example, we can assume that “I love you” has been converted to \[101, 1567, 1128\]. These numbers are illustrative examples and are not intended to be the result of a specific actual tokenizer. This does not mean that ID 1567 is 15 times more meaningful than 101. ID is a number to find an entry in the word dictionary.

**Embedding** is the process of converting the number into a learnable numeric vector. If the number of vocabulary is V and the representation size is d\_model, then the embedding table is of size V × d\_model. The row corresponding to the token ID is read and used as the initial vector for that token. The embedding table is also a parameter learned through loss and backpropagation.

![Chapter 14. Attention and the Transformer — Figure 2](/images/ai-study/3b656bbe274b8fbf042e.png)

In the example above, the three tokens are each represented by four numbers, so X is 3 × 4. The first axis is the token location, and the second axis is the expression components. Each ingredient does not necessarily have a meaning determined by a person, such as “degree of positivity” or “degree of given.” Learn useful expressions by combining various components.

The same token embedding before attention can be taken from the same table. After attention, the expression changes depending on the surrounding sentences. You can think of it as a process of creating clues to distinguish between a bank in “I left money at the bank” and a bank in other contexts.

## 4. Self-Attention is a calculation that refers to each other within the same input.

![Chapter 14. Attention and the Transformer — Figure 3](/images/ai-study/340d6398151f67bebfd4.png)

The self in **Self-Attention** does not mean that each token only sees itself. This means that the person asking the question and the information being referenced are **created in the same sequence**. Each token in a sentence updates its expression by collecting information from other tokens, including itself. However, the actual viewable position may be limited depending on the mask.

It can be called “dynamic linking” because the input relationships are recalculated each time. If the CNN's filter looks at a nearby fixed region, and the RNN receives information through previous states, attention also directly references distant locations within the allowed range. This direct reference reduces long transmission paths due to distance.

This does not mean that distance itself becomes meaningless or that location should disappear. Location information is also important, so location information is provided separately. Also, not all context can be perfectly remembered. Problems such as input length limitations, computation volume, training data, and competition among various information remain.

## 5. Q, K, and V: Three Roles for the Same Input

To reference another token, two things are needed: First you need to decide whose information you want to get, and then get the actual content from there. These roles are divided into Query, Key, and Value.

| symbol | Easy role description | The limits of metaphor |
| --- | --- | --- |
| Q, Query | A vector indicating what information the current location will find. | It is not a human search term itself. |
| K, Key | Vector to compare what information each location is associated with | Not a unique key or password in the DB |
| V, Value | The content vector that will actually be fetched and shuffled at that location. | Not the correct label |

![Chapter 14. Attention and the Transformer — Figure 4](/images/ai-study/36b553acdbe88f24cac5.png)

The same input X is multiplied by different weight matrices W\_Q, W\_K, W\_V to create Q, K, and V. Linear transformation is a calculation that creates a new component by multiplying and adding an input component by a weight. Below is a notation that omits the bias.

![Chapter 14. Attention and the Transformer — Figure 5](/images/ai-study/29cdb1670351c58cde37.png)

If X is n × d\_model and W\_Q and W\_K are d\_model × d\_k, then Q and K are n × d\_k. If W\_V is d\_model × d\_v, then V is n × d\_v. n is the number of tokens, d\_k is the query·key size, and d\_v is the value size. The number of components of Q and K must be the same so that they can be compared as dot products.

The initial weight is initialized to a random small value and adjusted to the loss of the learning objective, such as predicting the next token. In learned inference, Ws are usually fixed, and Q·K·V are newly calculated when the input changes. **W is a learning parameter and Q·K·V are calculation results according to input**.

Omitted points in the picture mean that some ingredients have been omitted. This is not a complete matrix example where you can reproduce the entire dot product behind by just multiplying a few visible numbers. The actual calculation includes all omitted components.

## 6. First step: Create a relevance score using the dot product of Q and K

![Chapter 14. Attention and the Transformer — Figure 6](/images/ai-study/e1386e9ff90a3a4e1adb.png)

The dot product of one query qᵢ and one key kⱼ is the value added by multiplying the same components. To calculate all combinations at once, multiply Q and K by the transpose Kᵀ. Since Q is n × d\_k and Kᵀ is d\_k × n, the result is n × n.

**Row i of the result matrix is the location where information is received**, and **column j is the reference location**. For example, the “movies” column in the “like” row is the score when the like position retrieves information from movies. Since the learned Q and K come from different transformations, these scores are not necessarily the same in the opposite direction. In other words, the degree to which i refers to j and the degree to which j refers to i may be different.

This score is sometimes called similarity, but it is not completely the same as normalized cosine similarity or human-judged semantic similarity. It is more accurate to understand it as a **compatibility score** created to mix information to suit learning goals.

## 7. Second Step: Why Divide by Square Root?

![Chapter 14. Attention and the Transformer — Figure 7](/images/ai-study/eb6a441d75e9236697f3.png)

Divide each value of QKᵀ by √d\_k. If the key is 64-dimensional, divide by √64=8. Here, d\_k is **the query·key dimension of one head**. It is not always the same value as the entire embedding dimension d\_model. d\_model=512, d\_k=64 in a typical example of 8 heads.

As the dimension increases, the number of terms added to the dot product increases, which can increase the variation in scores. If we simplify that the components are independent and the mean is 0 and the variance is 1, the variance of the dot product is proportional to d\_k. You can adjust the score scale by dividing by √d\_k. This means scaled, that is, adjusted in size.

If the scores are too spread out, Softmax can give you almost a 1 in one position and almost a 0 in the rest. In these extreme sections, the change signal required for learning may become small. Scaling is a device to alleviate this, but it does not guarantee that the slope will be stable under any circumstances.

## 8. Third step: Create a reference ratio for one row with Softmax

Softmax converts the scores to values between 0 and 1, summing to 1. This is the same function used to create class probability in Chapter 2. Here, it is applied not to the class but to the **token location for reference**.

![Chapter 14. Attention and the Transformer — Figure 8](/images/ai-study/d3bcd50e7ef9a5d57357.png)

Large scores in a row are assigned a large percentage, and small scores in a row are assigned a small percentage. Since each row is calculated independently, the sum of all rows is 1. The sum of the columns does not have to be 1. In a stable implementation, the maximum value of each row is subtracted and an exponential function is applied. Even if you subtract the same value from all scores, the ratio is the same, and calculating an overly large index can be avoided.

Let's say the previous QKᵀ values are the first row (110, 90, 80), the second row (70, 99, 70), and the third row (90, 70, 100) and d\_k=64. After dividing by 8 and applying Softmax to each row, it is as follows.

![Chapter 14. Attention and the Transformer — Figure 9](/images/ai-study/4f3e74134863fc73b183.png)

About 0.9045 in the first row means that the I position mixes the value of I by about 90.45%. Approximately 0.9494 of the like position is an example of like giving great weight to its own position. The third row gets about 21.87% from I, about 1.80% from like, and about 76.33% from movies. Numbers have been rounded to the nearest decimal place.

This example is not a rule that you always see a lot of yourself in real language. The explanatory score created this result. **attention weight A is a mixing ratio calculated for each input**, and is not a parameter itself saved after learning like W\_Q. The same word “weight” is used, but its role is different.

## 9. Fourth step: Mix V in that ratio to create a new expression

Once you have decided where to refer to, you need to gather the actual content. Multiply the attention ratio A and the value matrix V. Since A is n × n and V is n × d\_v, the result Z is n × d\_v. For each token, a new content vector is created.

![Chapter 14. Attention and the Transformer — Figure 10](/images/ai-study/eb402163462613b8c8f9.png)

For example, the new representation of the first token is a weighted sum of the order of 0.9045v₁ + 0.0742v₂ + 0.0213v₃. Since v₁·v₂·v₃ is a vector, this calculation is performed for each component. It is important that the output is not a single “name of the referenced word” but **a new vector containing information from multiple locations**.

Now you can see why K and V were created separately. K is used to compare whose information to refer to, and V is used to convey the actual content. Even if they come from the same input, it gives room to learn the selection criteria and delivery content separately.

A collection of four steps in one form is scaled dot-product attention.

![Chapter 14. Attention and the Transformer — Figure 11](/images/ai-study/c8c08a3a1c82148c43dd.png)

Creating Q·K·V, dot product, resizing, Softmax, and even the weighted sum of V are one attention calculation. This is the process of creating an expression that reflects the context at each position of the entire sentence, and this alone does not constitute the entire Transformer.

## 10. Check calculation order and matrix size with small code

The code below is a small numerical example to verify the attention calculation, not the trained language model. Q, K, and V are given directly to check from score calculation to output among the four steps. In the actual model, these values are created by the matrix multiplication of X and W as seen earlier.

```py
import numpy as np

def softmax_rows(scores):
    shifted = scores - scores.max(axis=-1, keepdims=True)
    values = np.exp(shifted)
    return values / values.sum(axis=-1, keepdims=True)

def attention(Q, K, V, causal=False):
    scores = Q @ K.T / np.sqrt(Q.shape[-1])
    if causal:
        blocked = np.triu(np.ones(scores.shape, dtype=bool), k=1)
        scores = np.where(blocked, -np.inf, scores)
    weights = softmax_rows(scores)
    return weights @ V, weights

Q = np.array([[1., 0.], [0., 1.], [1., 1.]])
K = np.array([[1., 0.], [0., 1.], [1., 1.]])
V = np.array([[10., 0.], [0., 10.], [5., 5.]])

Z, weights = attention(Q, K, V)
print(weights.shape)      # (3, 3)
print(Z.shape)            # (3, 2)
print(weights.sum(axis=-1))  # [1., 1., 1.]
```

Although Q and K happen to be the same in this example, they typically use different learning transformations. The causal option is a masking of future positions, which will be explained later. This code only deals with single sequences of the same length and does not implement all batching, multiple heading, and padding handling.

## 11. Multiple heads are used because one reference method is not enough.

There are many types of relationships in a sentence, such as the relationship between the subject and the verb, the object pointed to by the demonstrative, and the combination of nearby expressions. Instead of using only one hybrid method, we compute multiple attentions with different learning transformations. This is **multi-head attention**.

![Chapter 14. Attention and the Transformer — Figure 12](/images/ai-study/85c3bed29ab0c6825bdb.png)

On the left is the calculation for one head. Below we multiply and scale Q and K, apply a mask if necessary, and blend V via Softmax. The one on the right is a structure in which these calculations are performed in parallel across multiple heads and the results are then combined.

If there are 8 heads and d\_model is 512, the Q·K·V of each head can be made into 64 dimensions. The input X of the three tokens is 3 × 512, W\_Q of each head is 512 × 64, and Q is 3 × 64. **This is not a concept of simply dividing and distributing the original 512 components into the first 64 and the next 64.** Each head linearly transforms the entire input into 64 dimensions with its own weight. In the implementation, you can do one large matrix multiplication and divide by the head axis.

If the result of each head is 3 × 64, the eight results are concatenated in the component direction to make 3 × 512. This is called Concat. Afterwards, the information from multiple heads is remixed by multiplying it by the learnable output transformation W\_O.

![Chapter 14. Attention and the Transformer — Figure 13](/images/ai-study/5e638669d4fcb2d85d32.png)

![Chapter 14. Attention and the Transformer — Figure 14](/images/ai-study/6b0c12bd8e2ecf4c9281.png)

The metaphor “multiple experts look at the same sentence” means that different relationships can be learned. A person does not necessarily designate the role of head 1 as the subject and head 2 as the noun. There is no guarantee that the interpretations of the heads will always be clear or completely different from each other. Since each calculation can be performed from the same input, head internal calculations can be parallelized.

## 12. How do you understand a sentence without knowing the order?

RNN updates the state sequentially starting from the first token, so the processing structure contains order. Basic Self-Attention calculates content relationships between tokens, but without separate location information, the order “first” and “third” cannot be used in the same way. If you simply change the order of the tokens, the output location also changes accordingly.

So we add **positional encoding** to the input embedding. Create P, which represents each position as a number pattern, and use X+P as input. Because addition is performed, the shape of P must be the same as X. You can think of it as overlapping the location clues with the meaning clues of the vocabulary.

![Chapter 14. Attention and the Transformer — Figure 15](/images/ai-study/38bd8fd351ed2773f610.png)

Originally, Transformer proposed a position encoding using sin and cos of multiple frequencies. sin and cos are functions that repeatedly oscillate according to input. The vibration speed of each component is varied to create different patterns for each location.

![Chapter 14. Attention and the Transformer — Figure 16](/images/ai-study/c7ef7b79d5e2e15972f5.png)

pos is the position starting from 0, and 2i and 2i+1 are even and odd component numbers. d\_model is the total representation size. The first pair of components changes quickly and the last pair changes more slowly. This is a method that allows you to create a location pattern without necessarily creating a new learning parameter for each location. There are other designs, such as learnable position embeddings, so this is not the only position processing method for all Transformers.

## 13. Add location information directly to “I like movies”

If the expression size is 4, the denominator is 1 in the first pair of components and 100 in the second pair of components. Therefore, P at positions 0, 1, and 2 is:

![Chapter 14. Attention and the Transformer — Figure 17](/images/ai-study/e4aa219cd2477207cc8f.png)

Even at position 0, P is not the 0 vector but (0, 1, 0, 1). This is because sin(0)=0 and cos(0)=1. So, if you add the first row of X (2, 3, 1, 5), you get (2, 4, 1, 6). If you omit this part, you will misunderstand the addition of positional encoding.

This numerical example is to demonstrate addition itself. The original Transformer also includes a setting that scales the token embedding by √d\_model and then adds location information. In that case, you can read X as the input that has been scaled.

Adding location encoding does not mean that the meaning of existing tokens disappears. The latter weights learn relationships based on expressions that contain both meaning and location. The same token may have different input representations from the beginning if its location is different.

## 14. After mixing the information, change the expression at each location.

If attention is responsible for retrieving information from other locations, **Feed Forward Network (FFN)** is responsible for transforming the information gathered at each location into new features. The original Transformer's FFN is a structure of Dense, ReLU, and Dense.

![Chapter 14. Attention and the Transformer — Figure 18](/images/ai-study/949704d4473b832e7885.png)

The first linear layer weights the components, ReLU adds a non-linear transformation, and the second linear layer returns them to the d\_model size. In the representative setting of the prototype, the 512 dimensions are expanded to 2,048 dimensions and then reduced to 512 dimensions. The reason why it was said in Chapter 8 that just stacking linear layers without an activation function can be combined into a single linear transformation is also important here.

The same FFN weight is applied to all token positions. Treating each position independently means that **FFN itself does not mix token positions together**. This does not mean that it is a calculation without context, as the attention output already contains information from other locations. Different encoder layers generally have different FFN parameters.

## 15. Add and Norm are devices for deepening the calculations you have already learned.

![Chapter 14. Attention and the Transformer — Figure 19](/images/ai-study/7475712499c4d7591f8c.png)

The red line is a **residual connection** that sends the input as is to the side path and adds it to the output of the layer. Also called skip connection or shortcut. If the sub-computation result is F(X), X+F(X) is created. To add two arrays, the shape must be the same, so we can see why attention and FFN come out in d\_model size again.

In Chapter 10, the derivative of addition was 1 for each input. This circuitous path allows information and gradients to be passed without having to go through several transformations in succession. The model becomes easier to learn by maintaining the original representation and adding the necessary modifications. However, this does not mean that the slope problem of the entire network automatically disappears.

**Layer Normalization** calculates the mean and variance based on the components of each token vector, adjusts the scale of the value, and applies learnable zoom and move values. It must be distinguished from Batch Normalization, which averages different sentences in a batch at once. It is used to alleviate the problem that rapid changes in the scale of input and output make learning difficult.

![Chapter 14. Attention and the Transformer — Figure 20](/images/ai-study/5835fd4edbb9338371d4.png)

μ and σ² are the mean and variance calculated from the feature components of one location. ε is a small positive number that prevents division by 0, and γ and β are adjustments for each component being learned. Because of normalization, the expressiveness of the signal is not unconditionally fixed, but the adjustment value is also learned.

The pictures in this chapter are read based on LayerNorm(X+F(X)), a circular post-norm structure. In modern implementations, there are also variations, such as pre-norm, where the norm is applied first. Add and Norm are not the same operation, but are two operations: an addition operation that takes a detour and an operation that adjusts the scale of a value.

## 16. Connecting up to this point completes one layer of the encoder.

![Chapter 14. Attention and the Transformer — Figure 21](/images/ai-study/84b7432bcdd542f980ca.png)

The input of token embedding plus location information goes into multi-head Self-Attention. Gather information from other locations to create a new expression, then add the original input and perform LayerNorm. Next, pass the FFN for each position and apply residual concatenation and LayerNorm again. Stack these blocks in several layers.

If there are n input tokens and the representation size is d\_model, the final encoder output R is usually also n × d\_model. **The entire sentence is not compressed into just one vector, but a representation of each input position remains.** This is an important difference compared to the single final state of a simple RNN encoder-decoder.

When encoders are stacked deeply, the back layer remixes and transforms the expressions that already reflect the context in the previous layer. In this case, “learning the expression” means that the weights are adjusted during the learning process. The weights are not relearned every time the representation of a new sentence is calculated with an already trained model.

## 17. The decoder looks at the sentences created so far and the original text together.

![Chapter 14. Attention and the Transformer — Figure 22](/images/ai-study/e5341a357a7c1587d14f.png)

Let’s say you translate the English “I like movies” into the French “J’aime les films.” The encoder creates a representation R of the English tokens, and the decoder uses this R and the French input so far. Not only the encoder output goes into the decoder, but also **output tokens known so far** go into the decoder.

![Chapter 14. Attention and the Transformer — Figure 23](/images/ai-study/b8a7c9cd73290e43b317.png)

In the figure, the final output of the left encoder is passed to several decoder layers on the right. Each decoder layer can refer to the same textual representation. The input at the bottom right is the embedding and location information of the token in the output sentence.

| step | Output input from the decoder | Token to be created this time |
| --- | --- | --- |
| 1 | &lt;sos&gt; | J'aime |
| 2 | &lt;sos&gt; J'aime | les |
| 3 | &lt;sos&gt; J'aime les | films |
| 4 | &lt;sos&gt; J'aime les films | &lt;eos&gt; |

&lt;sos&gt; is a descriptive notation for special tokens indicating the beginning and &lt;eos&gt; the end. The actual special token names and token splits are different for each model. Rather than reinventing the entire sentence at each step, the distribution of the next token is obtained and the selected token is added at the end. Therefore, the statement “returns J'aime les” means that the cumulative result is that way.

## 18. The decoder contains two types of attention.

![Chapter 14. Attention and the Transformer — Figure 24](/images/ai-study/d1709f8f1c93411b7222.png)

The first is **Masked Self-Attention**. Information is exchanged between tokens from the output sentence to the current position. The second is **Cross-Attention**, that is, encoder-decoder attention. The current output representation takes the necessary information from the original encoder's representation. The final FFN transforms the result at each location. Each sublayer has residual concatenation and normalization.

| calculation | Source of Q | Source of K·V | Reference range |
| --- | --- | --- | --- |
| Encoder Self-Attention | Input sentence expression | Same input sentence representation | Input position excluding padding etc. |
| Decoder Masked Self-Attention | Current expression on the output side | Same output side expression | Current and Past Locations |
| Encoder-Decoder Cross-Attention | Decoder expression | Encoder final output | Allowed source locations |

This table is the most important distinction when redrawing the structure. The attention formula is similar, but its role changes depending on where Q·K·V is taken from and where it is located.

## 19. The reason for covering the future is to prevent people from peeking at the correct answer when learning.

Being able to look ahead at “a student” while predicting the word after “I am” makes the learning problem overly easy. Since there are no future tokens at the time of actual creation, tokens to the right of the location should not be referenced during learning. This is called **causal mask**.

![Chapter 14. Attention and the Transformer — Figure 25](/images/ai-study/bec67e70979e6f453ec2.png)

![Chapter 14. Attention and the Transformer — Figure 26](/images/ai-study/d13d8aeac7dc60502b8f.png)

If the row is the current reference subject and the column is the reference location, the diagonal upper right is the future location. Change the score at that position to −∞ and apply Softmax. Since exp(−∞)=0, the attention ratio at that location becomes 0. **Rather than arbitrarily deleting the value after softmaxing, the structure is blocked at the score stage and then normalized**.

![Chapter 14. Attention and the Transformer — Figure 27](/images/ai-study/b48e0dd1b329b904b433.png)

Diagonal lines are allowed. This is because the learning input is pushed one space back from the correct answer, that is, “up to the previous token.” Seeing the token at the current input location does not mean seeing the next token to be matched at that location. Since the padding mask is used to ignore filling tokens rather than actual data, its purpose is different from the causal mask that blocks the future.

![Chapter 14. Attention and the Transformer — Figure 28](/images/ai-study/abb1b0e4937ba76378c9.png)

Other than mask processing, the dot product, scaling, Softmax, and V weighted sum are the same as before. If there are multiple heads, the results of each head are connected and W\_O is applied. Concat at the top of the diagram can be read as the step of combining multiple heads. The output of a single scaled dot-product attention itself does not necessarily require a head connection.

## 20. Cross-Attention determines which part of the original text to translate

Let the decoder expression behind the masked Self-Attention be M, and the final expression of the encoder be R. Cross-Attention creates Q from M, and K and V from R. The decoder asks “What do I need for the output I am creating now?” and compares how relevant each position in the original text is to that question.

![Chapter 14. Attention and the Transformer — Figure 29](/images/ai-study/c81b23f1f5d7781aebf9.png)

If the number of original tokens is n and the number of current tokens on the output side is m, the score matrix is m × n. It doesn't always have to be square like Self-Attention. This is because each output location collects information from n locations in the original text.

In translation settings where the encoder can already read the entire original text, the causal mask on the output side is not directly applied to the original text. The original text and output are different sequences. However, the padding location of the original text can be hidden. The process of calculating in each head and then combining it with Concat and W\_O is the same principle.

## 21. How to convert the last vector into a real word

![Chapter 14. Attention and the Transformer — Figure 30](/images/ai-study/4534469e9c0525bb6cd2.png)

The decoder's final vector is not yet a word. The linear layer converts this vector into **scores equal to the number of vocabulary**. This score before normalization is called logit. If there are V vocabulary and d\_model components in the expression, the shape of the output weight is usually d\_model × V. Softmax then creates the probability for each token.

Here, we need to distinguish between the Softmax of attention and the final Softmax. attention is the ratio of “which input location to refer to”, and the last is the probability of “which token to output next”. It's the same function, but the axis it targets is different.

Assume that the vocabulary has only three items \[J'aime, les, films\], and the logit after “&lt;sos&gt; J'aime les” is \[45, 40, 49\].

![Chapter 14. Attention and the Transformer — Figure 31](/images/ai-study/87a8b2c807a960f9369f.png)

If we subtract 49 to create \[−4, −9, 0\] and then apply the exponential function and normalization, we get about \[0.017984, 0.000121, 0.981895\]. The probability of les is very small, but not exactly 0. If it is a method that selects the greatest probability, films is selected.

This method of selecting the maximum value is called greedy decoding. Other methods include sampling based on probability or comparing multiple candidate paths. Softmax itself does not necessarily select the largest token. Softmax creates a distribution, and the selection rule picks the actual tokens from that distribution.

## 22. Read the entire decoder again to see the reason for each box

![Chapter 14. Attention and the Transformer — Figure 32](/images/ai-study/546dc3c8b098a484fab3.png)

At the bottom, there is an output token pushed one space and location information. The first attention refers to the previous output token, the middle attention refers to the original encoder output, and the FFN changes the combined representation. The final vector that passes through these blocks passes Linear and Softmax and becomes the distribution of the next token.

![Chapter 14. Attention and the Transformer — Figure 33](/images/ai-study/753315d974a54d9b8acc.png)

The reason there are multiple blocks on both sides of the entire picture is to refine the expression several times. The original transformer's representative setting is 6 layers of encoder and 6 layers of decoder, but not all models are fixed to 6 layers. The same type of operation is used for each layer, but parameters are generally learned separately.

## 23. In learning, the correct answer is pushed one space to calculate multiple positions together.

If the translation answer is “J'aime les films &lt;eos&gt;”, the decoder training input can be made “&lt;sos&gt; J'aime les films”. Each input position predicts the next correct token. This method of inserting the actual correct answer using the previous token is called teacher forcing.

| Contents of decoder input position | The correct answer to guess at that location |
| --- | --- |
| &lt;sos&gt; | J'aime |
| J'aime | les |
| les | films |
| films | &lt;eos&gt; |

Since the correct answer sequence is already available, predictions for multiple positions can be calculated at once using matrix operations. However, the causal mask prevents each location from seeing the future. **Calculating positions in parallel during training is different from knowing future tokens in advance when generating them.**

Compare the predicted distribution for each location with the actual correct answer to obtain the cross-entropy loss. If the probability given to the correct token is p, then the default loss for that position is −log(p). The higher the probability, the smaller the loss. The padding location is usually also excluded from loss calculations.

![Chapter 14. Attention and the Transformer — Figure 34](/images/ai-study/467f77fea231d86c551e.png)

The backpropagation learned in Chapter 11 calculates the required gradient from the output weight to the FFN, attention projection weight, and embedding. Optimization methods such as Adam update parameters with the slope. Process multiple batches and repeatedly learn from the entire data. This entire flow is a repetition of input preparation, encoder/decoder forward propagation, loss calculation, backpropagation, and optimization.

The attention ratio is also affected by learning, but the values calculated from each input are not permanently stored in a table. Parameters such as W\_Q·W\_K that create the ratio are adjusted according to the loss. This distinction is the standard for accurately viewing “what is learned.”

## 24. In inference, future tokens are not known, so tokens are generated one at a time.

Let’s say you add “I love you” to the translated translation model that has been trained. The input is tokenized, embedding and location information are created, and the encoder calculates the representation for each original text location. The decoder starts at the start token.

| Output side input so far | Example of the following selection |
| --- | --- |
| &lt;sos&gt; | Je |
| &lt;sos&gt; Je | t' |
| &lt;sos&gt; Je t' | aime |
| &lt;sos&gt; Je t' aime | &lt;eos&gt; |

This word distinction is also for explanatory purposes. There is no guarantee that the actual tokenizer divides on the same boundary. Generation ends when termination conditions such as termination token and maximum length are reached.

Implementations such as KV cache, which efficiently reuses already created parts, saves the keys and values of past tokens to reduce repetitive calculations. This is a reuse of inference medians, not retraining the model or changing the weights. Although the initial processing or training of the entire prompt has many parts to parallelize, in general self-regression generation the next token depends on the previous selection.

## 25. BERT·GPT·T5 use the same parts for different purposes

| series | Typical architecture | Typical training and usage |
| --- | --- | --- |
| BERT | encoder | Restore hidden tokens by referring to both contexts, and use expressions for classification and question answering. |
| GPT | Decoder-based, usually with separate encoder and no cross-attention | Generate text and code by predicting the next token based on the previous token |
| T5 | encoder and decoder | Unification of multiple NLP tasks in the form of converting input text into output text |
| ViT | Transformer treats image patches like tokens | Divide an image into small pieces and learn the relationships between those representations |

NLP means natural language processing: the field in which computers process human language. LLM means large language model. Transformer names an architecture, whereas LLM describes the scale and language-modeling role of a model; the terms are not interchangeable. ViT, which operates on images, also shows that the Transformer architecture is not limited to text. The original studies of [BERT](https://arxiv.org/abs/1810.04805), [T5](https://arxiv.org/abs/1910.10683), and [ViT](https://arxiv.org/abs/2010.11929) illustrate these uses.

### BERT example: Fill in the blank with both contexts

If you type “The cat sat on the \[MASK\].”, the expression at the \[MASK\] position refers to the tokens before and after it, and candidates such as mat can be predicted from the lexical distribution. This is called masked language modeling. It is also called an auto-encoding method in that it masks and restores part of the input.

This is an example to understand BERT’s pre-training. In actual emotional classification, sentences are input and an output layer for classification is used, and in extractive question and answering, the output structure can be different, such as predicting the start and end positions of the answer. Not all BERT uses are necessarily \[MASK\] fills.

### Example of GPT: Creating the next token from the previous tokens

When “I love” comes in, you can select you as the next token, and with “I love you” as a condition, you can select so, followed by much. The method in which one's output becomes part of the next input is called autoregressive, or self-regressive generation. Causal attention is used so that only the preceding context required for creation is visible.

Inserting a prompt into a GPT does not necessarily mean that it goes through the left encoder of the original translation Transformer. Typically, prompts are processed and subsequently generated within the same decoder-based token flow. Knowing this difference can help you avoid the confusion, “Do all Transformers have both an encoder and a decoder?”

## 26. Read the order of development in terms of what problems were solved

| period | change | Key point for this chapter |
| --- | --- | --- |
| Spread of backpropagation research in the 1980s and 1986 | Development of connectionism and recurrent computation | Rather than determining the origin of RNN as a single year, it is viewed as a flow that deals with time-dependent information. |
| 1997 | LSTM | Introducing a path to leave and erase information in long state transfers |
| 2013 | Word2vec | Spread of ways to represent words as learned vectors |
| 2014 | Seq2Seq, GRU | Structure and gate simplification for changing one sequence to another |
| Released in 2014 and announced in 2015 | attention-based translation | Refer to the necessary parts of the original text without relying on the last vector |
| 2017 | Transformer | Sequence processing based on attention without circulation |
| 2018 | GPT-1, BERT | Advancement of dictionary learning centered on creation and interactive expression |
| 2019 | GPT-2, T5 | Expansion of production scale and unification of text input and output operations |
| 2020 | GPT-3, ViT | 175 billion parameter language model and image Transformer |
| 2022 | GPT-3.5 series and ChatGPT released | Expanding popular use of conversational language models |
| 2023 | GPT-4 | Expanding the use of large-scale language models |

GRU's initial proposal can be found as [2014 study](https://arxiv.org/abs/1406.1078). [GPT-3 research](https://arxiv.org/abs/2005.14165) reported 175 billion parameters, and [ChatGPT public post](https://openai.com/index/chatgpt/) explains that it was based on the GPT-3.5 series in November 2022. Chronology does not mean that when one appears, the previous one disappears. CNN, RNN, and LSTM can still be selected depending on data and execution conditions.

## 27. The advantages of direct connection also come with computational costs.

RNNs convey the influence of distant inputs across multiple points in time. The default global Self-Attention directly calculates the combination of all positions allowed on a floor. For this reason, it is easy to shorten paths that deal with long-distance relationships, and to parallelize location-specific calculations in learning given a sequence.

However, the score matrix between n tokens is n × n. In basic dense attention, doubling the length quadruples the number of location pairs. “Can be parallelized” and “Always requires less computation” are not the same thing. There are implementations that reduce memory usage or variations that only compute some of the relationships, but knowing the cost of the underlying structure helps us understand why long contexts are expensive.

As data grows, it does not necessarily mean that it becomes more accurate. Learning objectives, quality, redundancy, bias, model size, and computational resources all have an impact. While CNN strongly assumes spatial structure and RNN strongly assumes order, Transformer has a lot of room to flexibly learn relationships between inputs, so the importance of the data and calculation environment is also great.

## 28. Security looks at which inputs affect which calculations

So far, we have looked at the structure of understanding sentences. From a security perspective, the same structure can be read again by **externally changeable inputs** which affect the results. Below is a breakdown to understand the attack surface when connecting this architecture to an actual AI service.

| branch | What can change from the outside | What to distinguish from impact |
| --- | --- | --- |
| training data | Contaminated documents/labels/repeated patterns | The learned weights may reflect bias or incorrect behavior. |
| Tokenization/Input Preparation | Strings with different representations, long input, encoding differences | Even if people read similarly, token composition, length, and model response may vary. |
| Prompts and search documents | Directives mixed in user instructions, web documents, and tool results | Prompt injection risk if external material is treated like original work instructions |
| Long context and attention calculations | Too many tokens and repeated requests | Computation, memory, and cost burden. Link to service length and usage limits |
| Run tool after output | Commands and arguments proposed by the model | Actual impact is determined by harness execution policy, authority, and verification |

The mere fact that attention references an external token does not immediately result in privilege escalation. There must be an execution path where model output leads to actual file access or service change. Here, the distinction between the roles of [agent vs harness vs LLM](/post/ai-foundations-02-agent-harness-llm) and [MCP](/post/ai-concepts-mcp) becomes important again.

For example, even if a web document to be summarized contains the sentence “Ignore previous instructions and do something else,” that is reading material and not an authorized command from the user. The model should be designed so as not to confuse the two, and the tool execution part should also verify the allowable range and parameters. [Anthropic prompt injection explained](https://www.anthropic.com/research/prompt-injection-defenses) also addresses the problem of untrusted external content trying to change the agent's behavior.

Additionally, **the causal mask that covers future tokens is not a security authority checking device.** It is a mathematical device that adjusts the information access order of learning and generation. It cannot be said that access control for each user is completed with only a mask after inputting a secret document into the model. The attention ratio of “where did you look a lot” also does not guarantee the accuracy or safety of the facts.

## 29. The training data environment changes the model’s judgment.

The language model can make the next token or masked token within the text the correct answer. The advantage of self-supervised learning is that people can create learning problems without having to attach separate classification labels to every sentence. However, just because the right answer can be created from data does not mean that the data is always true. False claims, biases, and contextual imbalances can also be learned.

If applied to security logs, it is necessary to check which system's logs were collected and for what period of time, what the ratio of normal and attack cases is, and whether a specific host name coincidentally suggests the correct answer. If training, validation, and testing data overlap, it may appear that new situations are judged well. The generalization and evaluation conditions learned in Chapter 1 and Chapter 2 are still necessary in Transformer.

Inserting external search results into the prompt increases the information of this input. Additional training of the model involves changing the weights. The two methods can be used together when covering up-to-date information or tailored to a specific field, but they operate differently. Knowing this distinction allows you to think separately about “what the model originally learned and what it referenced this time.”

## 30. Following a Prompt Through the Entire System

Let’s say you ask, “Describe the signs of an attack in these logs.” The app configures the user's instructions and permitted log data as model input. The text is turned into token IDs, and each ID becomes an embedding vector. After the location information is added, it passes through several Transformer blocks.

In each block, we create Q·K·V with the current representation, calculate the scores between the allowed positions, and shuffle the contents at the Softmax ratio. FFN transforms the representation of each location, and residual concatenation and normalization help to carry out deep calculations. Create the logit and probability of the entire vocabulary from the expression of the last position and select the next token. Attach a new token and continue this process.

If it is a decoder-based model such as GPT, there is not necessarily a separate encoder. In the encoder-decoder model for translation, the original encoder expression and the output decoder expression meet at cross-attention. Depending on which structure it is, you have to choose the overall picture.

What changes during this run is the input, intermediate representation, Q·K·V, attention rate and generated tokens. In general inference, already learned parameters are used as is. Only during learning, the correct answer and loss are calculated and the parameters are changed through backpropagation and optimization. If the model requests the use of a tool, the actual execution is handled by the harness and the tool.

| parts learned earlier | This is where it appears again |
| --- | --- |
| Chapter 1: Data, Learning, and Generalization | Large-scale text learning and prediction in new contexts |
| Chapter 2: Multiclassification, Probability, and Loss | Output and cross-entropy to select the next token across the vocabulary |
| Chapter 3: Weighted sums and prediction functions | Q·K·V projection, FFN, last linear layer |
| 4\~Chapter 7: Different assumptions and data conditions for each method | Compare which structures make which data relationships easier to learn |
| Chapter 8: Representation Learning and Nonlinearity | Embedding, deep blocks, activation of FFN |
| Chapter 10: Computational graph and path-specific differentiation | Gradient calculation of matrix product, Softmax, and residual path |
| Chapter 11: Distinction between backpropagation and optimization | Gradient calculation and Adam update of all learning parameters |
| Chapter 12: Shared Weights and Structural Assumptions | Projection·FFN shared on token locations, comparison of spatial local connections and global references. |
| Chapter 13: State passing and encoder-decoder | Alleviate long propagation paths and compression bottlenecks with direct referencing |

Attention is a part that weights and sums the necessary location information, and Transformer is an architecture that combines this part with position information, FFN, residual connection, normalization, and output layer. Next time you encounter a new model name, check which encoder or decoder it uses, what location it can refer to, and what it has learned to predict, so you can place it on this map.

### Figure Sources and Original Research

The original structure diagram and explanatory example were organized based on the provided lecture material on 「14\_attention and Transformer Structure」. The data specifies 『Getting Started with Google BERT』 as the base material. For the numerical example, I manually recalculated and wrote down the Softmax for each row, the first row and sum of the positional encoding, and the final token probability. The security and data environment section is an additional explanation that connects the learning objectives to the actual model/harness structure.

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [attention-based translation research](https://arxiv.org/abs/1409.0473)
- [BERT](https://arxiv.org/abs/1810.04805)
- [T5](https://arxiv.org/abs/1910.10683)
- [Vision Transformer](https://arxiv.org/abs/2010.11929)
