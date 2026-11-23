## 1. If you have seen the neighborhood in space, now let’s look ahead and behind in time.

Previous chapter: [convolutional neural network - Chapter 12](/post/ai-foundations-14-cnn)

The CNN in Chapter 12 grouped nearby pixels and used the same filter at multiple locations in the image. This time, let's think that the input is not a single photo, but a record coming in over time. The meaning of the same events can vary depending on the order in which connection attempts, login failures, and permission changes occurred. Just as there is a difference between “good” and “not good” in sentences, the order of sentences is important.

Use the weighted sum, activation, and backpropagation learned from Chapter 8 to Chapter 11 as is. What changes is **connection**, which includes information from previous points in time when calculating the current input. This structure is a recurrent neural network, RNN (Recurrent Neural Network).

![Chapter 13. RNNs: Sequence and Memory — Figure 1](/images/ai-study/cf6c2f1ef59f7a7cc6c6.png)

![Chapter 13. RNNs: Sequence and Memory — Figure 2](/images/ai-study/f8134d44649d54c0469d.png)

A fully connected network learns general relationships between inputs, and CNN incorporates spatial neighborhood relationships into its structure. RNN inserts information transfer in the time direction here. Feedforward neural networks can also solve time series problems with fixed-length inputs that bundle values at multiple points in time. However, a separate structure is needed to process sequences of different lengths with the same calculation rules and continue the previous summary.

**Sequence** is an ordered list of items. A time series is a sequence with one or more measurements at each time step. Examples include temperature/wind speed, stock prices, negative signals, and vehicle movement paths. Tokens in sentences are also sequences, but each position does not necessarily represent the actual clock time. The time point t below can be read as “this input location.”

## 2. Recurrence: Reusing State in the Next Computation

![Chapter 13. RNNs: Sequence and Memory — Figure 3](/images/ai-study/43d8e25ac0755560bb46.png)

Upon receiving the current input xₜ, the RNN creates a hidden state hₜ. **Hidden state** is a numeric vector that contains the information needed for the next calculation from the input received so far. A vector is an array of several numbers. hₜ is the result of this calculation and becomes the material for the next time.

![Chapter 13. RNNs: Sequence and Memory — Figure 4](/images/ai-study/4dc4f2a3f4007c446e53.png)

This equation uses row vector notation. xₜWₓ is a calculation that reflects the current input, and hₜ₋₁Wₕ is a calculation that reflects the previous state. After adding the two results and the bias b, we pass tanh to create a new state. h₀ or h₋₁ at the first point has a different name depending on the starting index convention, and is often initialized to a 0 vector.

Here, Wₓ and Wₕ are learned parameters. hₜ is an intermediate calculated value that changes at each time depending on the input. **The weights are not learned every time the state changes.** Even when making predictions, hₜ changes, but in general inference, Wₓ and Wₕ are used as is. This is also connected to the question, “Does the weight of the model change immediately when I add a prompt?”

In some cases, h in the RNN picture is called the output, but h is not necessarily the final answer. If it is emotional classification, h is classified by using Dense and sigmoid or Softmax, and if it is prediction of the next value, it is changed to the required output dimension through Dense.

## 3. Unrolling Reveals a Repeated Computational Graph

![Chapter 13. RNNs: Sequence and Memory — Figure 5](/images/ai-study/c4183258e49e3527d3df.png)

If you expand the circulation arrow on the left in the time direction, it will look like the one on the right. Looking at x₁, we make h₁, and looking at x₂ and h₁ together, we make h₂. In x₃, x₃ and h₂ are used. It is not a structure that receives future values in advance.

The important thing is that each box is not a separate model with different weights. **Use the same Wₓ, Wₕ, and b at all points**. If CNN uses the same filter for each spatial location, RNN uses the same state update rule for each temporal location. Inputs and states are different, but the rules are shared.

![Chapter 13. RNNs: Sequence and Memory — Figure 6](/images/ai-study/c96e5c5a30f8d152f74d.png)

In this figure, the state is written with Y instead of h, and the activation function is written with the general symbol φ instead of tanh. Y₍ₜ₋₁₎Wᵧ and hₜ₋₁Wₕ have the same role in this context. Even if the symbol changes, you can look at the structure of “weighted sum of previous state + weighted sum of current input + bias”.

For example, let's say the input and state are one number, Wₓ=1, Wₕ=0.5, b=0, and starting state=0. When the first input is 1, h₁=tanh(1)≈0.7616. Even if the next input is 0, h₂=tanh(0.5×0.7616)≈0.3634 is not 0. This is because previous information that is not in the current input remains through the state. The memory of a simple RNN is not a list that stores the original text, but a compressed representation that is continuously updated.

## 4. Match the dimensions of input, state, and weight

Let the mini-batch size be N, the number of input features at each time point be D, and the size of the hidden state be H. The input Xₜ at one point in time is N × D, and the previous state Hₜ₋₁ is N × H. Wₓ is D × H, Wₕ is H × H, and bias b is H values.

![Chapter 13. RNNs: Sequence and Memory — Figure 7](/images/ai-study/219db942b1a1220a1786.png)

In matrix multiplication, the middle dimensions must be the same. If you multiply (N × D) and (D × H), you get N × H, and if you multiply (N × H) and (H × H), you get N × H. We can add the two results, adding the bias to each row and applying tanh to get the next state N × H. The size comparison in the picture explains this weighted sum, and the activation function is included when creating the final state.

When an entire sequence is collected in a batch, the input is a three-dimensional array called **(batch size, number of time points, number of features for each time point)**. If we group 5 records from 10 points in time with both temperature and wind speed, we get (5, 10, 2). If the RNN with 32 neurons returns the states at all times, it is (5, 10, 32), and if it returns only the last state, it is (5, 32).

If feature number 2 is the information type of the input, state size 32 is the size of the internal summary space that the model will use. Just because there are 10 viewpoints does not create 10 sets of different weights. The number of parameters of SimpleRNN is D×H + H×H + H. If D=2, H=32, there are 64+1,024+32=1,120. As the sequence becomes longer, the amount of calculation and intermediate values to be stored increase, but the number of parameters remains the same.

## 5. Unrolling in Time vs. Stacking Layers

![Chapter 13. RNNs: Sequence and Memory — Figure 8](/images/ai-study/9959e00a9a9d9cad4630.png)

The boxes running horizontally represent the flow of time. The vertically stacked boxes are multiple RNN layers. The first layer creates a state with input at each point in time, and the second layer receives the state at each point in the first layer as input. Each layer has its own weight, and the weights of that layer are shared in the time direction.

![Chapter 13. RNNs: Sequence and Memory — Figure 9](/images/ai-study/8e20f7aad60b35681d41.png)

Therefore, spreading a single RNN layer ten times in the time direction does not result in a 10-layer Deep RNN. When multiple RNN layers are stacked vertically, it is called a deep RNN. The reason why return\_sequences is needed in the Keras code below is because the hourly status must be passed to the upper layer.

## 6. Create SimpleRNN and check the output format

```py
import numpy as np
import tensorflow as tf
from tensorflow import keras

inputs = np.random.random((32, 10, 8)).astype(np.float32)

last_state = keras.layers.SimpleRNN(4)(inputs)
whole_sequence = keras.layers.SimpleRNN(
    4, return_sequences=True
)(inputs)

print(last_state.shape)       # (32, 4)
print(whole_sequence.shape)   # (32, 10, 4)
```

units=4 means that 4 numbers are used in the hidden state. The default value return\_sequences=False returns only the status at the last time. If True, all statuses at each point in time are returned. This does not mean that past points are not calculated, but **which of the calculated results are exported** changes.

The basic model for predicting one number in a sequence is as follows.

```py
model = keras.Sequential([
    keras.Input(shape=(None, 1)),
    keras.layers.SimpleRNN(32, activation="tanh"),
    keras.layers.Dense(1),
])
```

None in Input means not to fix the number of viewpoints, and 1 is the number of input features at each viewpoint. Placement axes are not used for this shape. This model has one RNN layer and one output Dense layer. To create a deep RNN, you actually need to stack multiple RNN layers.

Saying that you can handle sequences of different lengths does not mean that you can mix arbitrary lengths in one batch of rectangular arrays. Typically, you add padding to a short sequence and pass a mask to ignore its position, or group it by length. Very long sequences also have computational and memory limitations.

### Read all arguments of SimpleRNN by role

```py
tf.keras.layers.SimpleRNN(
    units, activation="tanh", use_bias=True,
    kernel_initializer="glorot_uniform",
    recurrent_initializer="orthogonal", bias_initializer="zeros",
    kernel_regularizer=None, recurrent_regularizer=None,
    bias_regularizer=None, activity_regularizer=None,
    kernel_constraint=None, recurrent_constraint=None,
    bias_constraint=None, dropout=0.0, recurrent_dropout=0.0,
    return_sequences=False, return_state=False,
    go_backwards=False, stateful=False, unroll=False, **kwargs
)
```

| factor | meaning |
| --- | --- |
| units | Size H of the state vector |
| activation, use\_bias | Activation function to create the state and whether to use bias |
| kernel\_initializer | Initial value of input weight Wₓ |
| recurrent\_initializer | Initial value of the circular weight Wₕ. orthogonal is an orthogonal matrix-based initialization |
| bias\_initializer | Initial value of bias |
| kernel/recurrent/bias\_regularizer | Loss penalty to be applied to input weight, circular weight, and bias, respectively |
| activity\_regularizer | Loss penalty to apply to output activation |
| kernel/recurrent/bias\_constraint | Constraints to apply to the updated parameter |
| dropout | Dropout rate applied to input connection |
| recurrent\_dropout | Dropout rate applied to connections on the circular side |
| return\_sequences | Determine whether to return output for all points in time |
| return\_state | Determines whether to receive the final status as a separate return value |
| go\_backwards | Decide whether to process input backwards. This alone does not make it a bidirectional RNN. |
| stateful | Deciding whether to use the last state from one batch as a continuation of the corresponding samples from the next batch. Sample order and initialization management required |
| unroll | Decide whether to explicitly unfold the iterative calculation. Can be useful for short sequences, but can increase memory burden |
| kwargs | Common layer settings such as name |

The official operation can be checked based on [Keras SimpleRNN](https://keras.io/api/layers/recurrent_layers/simple_rnn/) and [RNN Common Layer Documentation](https://keras.io/api/layers/recurrent_layers/rnn/).

## 7. What to input and what to output

![Chapter 13. RNNs: Sequence and Memory — Figure 10](/images/ai-study/e6df8de448aa3cda530b.png)

Even though the state calculation of the RNN is the same, the output connection varies depending on the task. The gray output in the picture above does not mean that there is no calculation, but that it is not used as the final output of the task.

| form | input and output | Examples and Interpretation |
| --- | --- | --- |
| Sequence-to-Sequence | Receives a sequence and returns results at each point in time | Predict the next stock price or weather at any point in time or attach tags to each word. |
| Sequence-to-Vector | Takes a sequence and returns one result | After reading the entire review, classify it as positive or negative. |
| Vector-to-Sequence | Create a sequence based on one vector | Generate captions based on image feature vectors |
| Encoder-Decoder | Convert input sequence to representation and create new sequence | Read English sentences and generate translated sentences of different lengths |

The first part of this table is a form that creates output corresponding to each input point. Encoder-Decoder is also broadly sequence-to-sequence, but is displayed separately to emphasize the two-step structure in which the input and output lengths may be different.

The encoder is the part that converts the input into an internal representation, and the decoder is the part that creates the output using that expression. In a simple RNN translation model, the input sentence is summarized in the final state of the encoder and passed to the decoder. The bottleneck of having to store information from a long sentence in one vector becomes the starting point for attention in the next chapter.

### Deep RNN that produces a single result across the entire sequence

```py
sequence_to_vector = keras.Sequential([
    keras.Input(shape=(None, 1)),
    keras.layers.SimpleRNN(20, return_sequences=True),
    keras.layers.SimpleRNN(20),
    keras.layers.Dense(1),
])
```

The first layer is True because it must pass the hourly status to the upper layers. The last RNN only provides a summary of the entire sequence, so the default value of False is used. If the middle layer is False, the time axis disappears and does not match the 3D input expected by the next RNN.

### Deep RNN that produces results at each time point

```py
sequence_to_sequence = keras.Sequential([
    keras.Input(shape=(None, 1)),
    keras.layers.SimpleRNN(20, return_sequences=True),
    keras.layers.SimpleRNN(20, return_sequences=True),
    keras.layers.TimeDistributed(keras.layers.Dense(10)),
])
```

All RNN layers maintain the time axis. TimeDistributed applies the same Dense to each point in time. If the input is (N, T, 1), the output is (N, T, 10). An output of 10 means that there are 10 numbers to predict at each time, and does not necessarily mean that there are 10 class probabilities. The Dense in this code does not have a Softmax, so it should not be interpreted as a probability distribution.

## 8. BPTT is backpropagation expanded in the time direction.

![Chapter 13. RNNs: Sequence and Memory — Figure 11](/images/ai-study/d06ed7a063b2a7f75f80.png)

In Chapter 11, we went back through the layers and multiplied by derivatives. When RNN is expanded in the time direction, the same calculation cells are connected, so the differential can be transferred from the loss at a later time point to the state at a previous time point. This is called **BPTT (Backpropagation Through Time), time-directed backpropagation**. A new differential principle is not created, but the same chain rule is applied to computational graphs over time.

![Chapter 13. RNNs: Sequence and Memory — Figure 12](/images/ai-study/eb0dfd4616278af8f7b1.png)

Even if the loss is calculated only at the last point, if the previous point affected the final state, the slope is transmitted. When losses are calculated at multiple points in time, the contributions of those losses are combined. Since the same Wₕ and Wₓ were used at all time points, the parameter slope should also add the contribution of each time point. This is the same principle as adding the slope for each use of the shared filter in CNN.

Forward propagation calculates the actual state from front to back. Backpropagation calculates the sensitivity of losses from back to front. It is not an inverse function that restores the previous input. These two must be distinguished so as not to confuse h and dh in the code below.

## 9. Open one RNN cell with code

![Chapter 13. RNNs: Sequence and Memory — Figure 13](/images/ai-study/f7a48fad71f5c6ab30a0.png)

The calculation at one point is divided into two matrix multiplication, addition, and tanh. The red line's dh\_next is not the next state itself, but the slope of the loss for that state. You must save x, h\_prev, and h\_next during forward propagation to use them again in backpropagation.

```py
import numpy as np

class RNN:
    def __init__(self, Wx, Wh, b):
        self.params = [Wx, Wh, b]
        self.grads = [np.zeros_like(Wx), np.zeros_like(Wh),
                      np.zeros_like(b)]
        self.cache = None

    def forward(self, x, h_prev):
        Wx, Wh, b = self.params
        t = np.matmul(h_prev, Wh) + np.matmul(x, Wx) + b
        h_next = np.tanh(t)
        self.cache = (x, h_prev, h_next)
        return h_next

    def backward(self, dh_next):
        Wx, Wh, b = self.params
        x, h_prev, h_next = self.cache
        dt = dh_next * (1 - h_next ** 2)
        db = np.sum(dt, axis=0)
        dWh = np.matmul(h_prev.T, dt)
        dh_prev = np.matmul(dt, Wh.T)
        dWx = np.matmul(x.T, dt)
        dx = np.matmul(dt, Wx.T)
        self.grads[0][...] = dWx
        self.grads[1][...] = dWh
        self.grads[2][...] = db
        return dx, dh_prev
```

t in forward is not a time index but a local variable containing the weighted sum before activation. To avoid confusion, you can think of this weighted sum as zₜ in the equation. Since the derivative of tanh is 1−tanh(z)², it can be calculated as 1−h\_next² using the saved h\_next.

dt is the slope of the loss relative to the current weighted sum. The reason for adding axis=0 in db is because one bias is shared by all samples in the batch. dWx and dWh are the gradients for the weights, and dx and dh\_prev are the input and gradients to return to the previous state. .T is a transpose that changes rows and columns, and matches the direction and dimension in the differentiation of matrix multiplication.

For example, if dt is N × H and x is N × D, then the product of x.T and dt is D × H. It is the same as the original shape of Wₓ. Since dh\_prev is N × H, it can be passed as the slope for the state at the previous point in time. The fact that **the slope of the learning target has the same shape as the learning target** becomes the standard for reviewing the code.

This class is the implementation of a cell point in time. If you forward multiple viewpoints with the same object and then backpropagate with only one final cache, the information from previous viewpoints will be overwritten. In the entire BPTT, the cache for each time point must be stored separately, the weight array must be shared, and the parameter slopes of each time point must be combined. backward itself does not change the weight. Update is a separate optimization step.

## 10. Why is it difficult to learn the first part when the sequence becomes long?

![Chapter 13. RNNs: Sequence and Memory — Figure 14](/images/ai-study/ee8cf3f4d6bb8b5bb603.png)

When a language model predicts the next word, it may need the name or subject far before it. This is called a **long-term dependency**. In a simple RNN, the information must go through many intermediate state updates, and the learning gradient must travel the same long path.

![Chapter 13. RNNs: Sequence and Memory — Figure 15](/images/ai-study/7c299b66c3b768b0cf22.png)

![Chapter 13. RNNs: Sequence and Memory — Figure 16](/images/ai-study/c6d3aa87ba1ad5bb8094.png)

tanh changes the input between −1 and 1. When the absolute value of the input is large, the output approaches both ends and the curve becomes flat. The derivative is 1−tanh(z)² and lies between 0 and 1. This small value and the effect of the circular weight matrix are multiplied each time.

Simply assuming that the effective multiplier of each step is 0.5, the value after 20 steps is 0.5²⁰≈0.000000954. In this situation, there is almost no gradient left that tells us how to change the weights of the previous time. These are vanishing gradients. In actual RNN, a matrix and activation derivative are multiplied together rather than a single number, so the result cannot be determined by looking at tanh alone.

![Chapter 13. RNNs: Sequence and Memory — Figure 17](/images/ai-study/002aae80c23f2123450c.png)

Conversely, if directions with an effective magnification greater than 1 are repeated, the slope may become excessively large. For example, 1.5²⁰ is approximately 3,325. These are exploding gradients. The difficulty of transferring past input to the present and the difficulty of sending sufficient learning signals for past calculations are interconnected. Long sequences require storing more intermediate states, which increases computation time and memory burden.

## 11. Gradient clipping is a size limit that prevents explosions

Let’s say the slopes of all parameters are gathered into one vector g. The L2 norm, which is the overall size, is the value obtained by squaring each component, adding them, and taking the square root. If this size exceeds the threshold, that is, the allowable limit, the entire vector is reduced by the same ratio.

![Chapter 13. RNNs: Sequence and Memory — Figure 18](/images/ai-study/6ed0baf45df70fd5180a.png)

For example, if the slope is (3, 4), the magnitude is 5. If the limit is 2, multiply by 2/5 to change to (1.2, 1.6). Maintain the direction and reduce the size to 2. Unlike value clipping, which cuts each component into individual ranges, this is clipping based on the overall norm.

```py
def clip_grads(grads, max_norm):
    total_norm = np.sqrt(sum(np.sum(g * g) for g in grads))
    if total_norm > max_norm:
        scale = max_norm / (total_norm + 1e-12)
        for g in grads:
            g *= scale
```

Clipping suppresses updates that are too large. This is not a way to solve the long-term memory problem by restoring the slope that has already become small. Truncated BPTT, which learns by breaking a long computational graph into certain sections, is also an option to reduce the memory burden, but it does not deliver the same learning gradient beyond the truncated boundary. LSTM is a method of changing the cell structure itself to retain information longer.

## 12. LSTM doesn’t just overwrite the state, it divides what to keep and what to add.

LSTM (Long Short-Term Memory) is a type of RNN. In addition to state h of the simple RNN, a separate channel called **cell state c** is created, and how much information is left, added, and taken out is controlled by a gate.

![Chapter 13. RNNs: Sequence and Memory — Figure 19](/images/ai-study/718c7413ea4e3920366a.png)

The c passage across the picture is in a cell state. The h created below is a hidden state that is passed on to other layers or output calculations. Commonly, c is called a long-term state and h is called a short-term state, but “c is necessarily remembered for a long time and h is necessarily forgotten quickly” is not an absolute distinction. Both change according to learned calculations.

The cell state is passed to the next time point in the same LSTM layer. When multiple LSTM layers are stacked, a sequence of h is usually passed to the upper layer, and each layer maintains its own c separately. Since it is possible to receive a separate return of c through the API, the explanation of “exchanging within the layer” refers to the general connection method.

**Gate** is a device that creates numbers between 0 and 1 and multiplies information by element. If it is close to 0, it passes weakly, and if it is close to 1, it passes strongly. This value is created by applying sigmoid to the weighted sum of the current input and the previous hidden state. Rather than a switch that a person opens and closes every time, the degree of opening changes depending on the input as the weight is learned.

Now let's read the pictures in the actual calculation order. f is the ratio to remain, g is the content of the new candidate, i is the ratio to write the candidate, and o is the ratio to show it to the public. ⊙ is an element-wise product, or Hadamard product, that multiplies the same positions. It is different from matrix multiplication.

## 13. The deletion gate determines how much of the previous memory to keep

![Chapter 13. RNNs: Sequence and Memory — Figure 20](/images/ai-study/0e0e5ff48e7ef5e617c5.png)

![Chapter 13. RNNs: Sequence and Memory — Figure 21](/images/ai-study/49fb4994fae19297d0dc.png)

f of the forget gate passes through sigmoid and becomes between 0 and 1. The previous cell state cₜ₋₁ is multiplied by f element by element. If f is 0, the corresponding component is deleted, and if f is 1, it is left as is. If f is 0.8, 80% of the previous component remains in the direct passage.

If you look at this step alone, f ⊙ cₜ₋₁. **This alone does not complete the final cₜ.** New memories to be added are added later. Because of the name “delete gate”, it is easy to read that the larger f is, the more it is deleted, but in this equation, the larger f is, the more it is left behind.

## 14. Calculate new content and the extent to which it will be used separately.

![Chapter 13. RNNs: Sequence and Memory — Figure 22](/images/ai-study/82f13464305e86db35e7.png)

![Chapter 13. RNNs: Sequence and Memory — Figure 23](/images/ai-study/b73a1fd1087ef760f21d.png)

g is a **new memory candidate** created from the current input and the previous hidden state. Since tanh is used, it has a value between −1 and 1. If g indicates what to write, the next input gate i determines how much of that candidate will be reflected.

![Chapter 13. RNNs: Sequence and Memory — Figure 24](/images/ai-study/020e30dcafd087142d90.png)

![Chapter 13. RNNs: Sequence and Memory — Figure 25](/images/ai-study/e658bd508947abd3e45e.png)

i is a sigmoid output, so it is between 0 and 1. The new value to be added is i ⊙ g. Therefore, the final cell state is calculated as “previous memory left + new memory selected”.

![Chapter 13. RNNs: Sequence and Memory — Figure 26](/images/ai-study/51a4b84e734a7b75a434.png)

For example, if the previous memory of one component is 0.8, f = 0.9, g = −0.5, i = 0.2, the new cell state is 0.9 × 0.8 + 0.2 × (−0.5) = 0.62. Just because the new candidate is negative doesn't mean it's a false memory. It may be a value that reduces existing expressions or adjusts them in a different direction.

## 15. The output gate decides what to display from memory.

![Chapter 13. RNNs: Sequence and Memory — Figure 27](/images/ai-study/7f5f2503ad86d2dfcbba.png)

![Chapter 13. RNNs: Sequence and Memory — Figure 28](/images/ai-study/b2970a96f31b1e34d135.png)

The output gate o is also calculated through sigmoid from the current input and previous hidden state. Convert the new cell state cₜ to tanh and multiply by o to get the hidden state hₜ.

![Chapter 13. RNNs: Sequence and Memory — Figure 29](/images/ai-study/cfd51be8a3c6ec63f651.png)

In the previous numerical example, if cₜ=0.62 and o=0.7, hₜ=0.7×tanh(0.62)≈0.386. The value left inside the cell is different from the value passed outside. It becomes possible to create a structure that preserves certain information internally while revealing less in the current output.

Putting all four calculations together, it is as follows. The superscripts f, g, i, and o indicate that each calculation has its own weight and is not a power.

![Chapter 13. RNNs: Sequence and Memory — Figure 30](/images/ai-study/c041f58f2f40b99da4b7.png)

| value | activation | role |
| --- | --- | --- |
| f | sigmoid | How much of the previous cell state to leave behind |
| g | tanh | Candidate content to be added |
| i | sigmoid | How many candidates to use |
| o | sigmoid | How to print the new cell state |
| cₜ | Weighted sum of previous states and candidates | Cell state leading to next time point |
| hₜ | o ⊙ tanh(cₜ) | Hidden state to be passed on to other layers and output calculations and next time point |

## 16. Why does LSTM alleviate vanishing gradients?

![Chapter 13. RNNs: Sequence and Memory — Figure 31](/images/ai-study/6887dc2d877ce10d59bf.png)

In Chapter 10, the local derivative of the addition node was 1. The cell state of an LSTM has a path that adds new content to the previous state. Looking along this direct path, the derivative from cₜ₋₁ to cₜ is fₜ. When going backwards through multiple points in time, the effect of this path is multiplied by f at each point in time.

![Chapter 13. RNNs: Sequence and Memory — Figure 32](/images/ai-study/ebc0209123cae33b05ae.png)

**Even if the gate value changes at each time, the multiplication is cumulative.** If f is 0.5 every time, it still gets smaller quickly. The key is that f can be learned to remain close to 1 for important information. It provides a direct path to preserve information longer than a simple RNN that passes through the same cyclic matrix and tanh at every step.

This explanation is based on the direct path of the cell state. There are also other paths in the overall differentiation as the gate depends on its previous state. Therefore, LSTM should not be considered to completely eliminate vanishing gradients or explosions or accurately remember infinitely long information. It is a structure that makes it easy to learn long-term dependencies.

## 17. Summarizing a sequence with two layers of LSTM

```py
lstm_model = keras.Sequential([
    keras.Input(shape=(None, 5)),
    keras.layers.LSTM(64, return_sequences=True),
    keras.layers.LSTM(32),
    keras.layers.Dense(1),
])
```

There are five features at each point in time. The first layer returns 64-dimensional h at each time point, so the output is (N, T, 64). The second layer returns only the last 32 dimensions h, which becomes (N, 32), and Dense changes it to (N, 1). The cell state c is also calculated inside each layer, but return\_sequences=True does not mean it returns c. You can check separate status return options in [Keras LSTM documentation](https://keras.io/api/layers/recurrent_layers/lstm/).

A general bias set of LSTMs creates four weighted sums, so the number of parameters is 4 (DH+H²+H). The first layer has 4(5×64+64²+64)=17,920 pieces, the second layer has 4(64×32+32²+32)=12,416 pieces, and Dense has 33 pieces, for a total of 30,369 pieces. This is why it requires more calculations than a simple RNN of the same state size.

## 18. GRU reduces gates and merges states into one

![Chapter 13. RNNs: Sequence and Memory — Figure 33](/images/ai-study/2f902a995286943c8341.png)

GRU (Gated Recurrent Unit) eliminates the separate cell state c of LSTM and continues the information with one h. Two reset gates and update gates are used. It is a choice to reduce structure and parameters while maintaining the ability to handle long-term information. If the size is the same, there are usually fewer parameters than LSTM, but actual speed and accuracy vary depending on implementation, hardware, and issues.

![Chapter 13. RNNs: Sequence and Memory — Figure 34](/images/ai-study/bc675325b685d76d2b50.png)

![Chapter 13. RNNs: Sequence and Memory — Figure 35](/images/ai-study/1630d461e53cbce1f13d.png)

In this equation, r determines how much of the previous state to refer to when creating a new candidate. If r is 0, the influence of the previous state disappears in the calculation to create the candidate h̃, and a candidate is created using the current input and bias. However, **this does not mean that the past completely disappears in the final hₜ.** The previous hₜ₋₁ can be passed separately to the mixed path of the update gate.

z in the picture determines how much of the new candidate is reflected. The final state is (1−z) ⊙ hₜ₋₁ + z ⊙ h̃. If z is 0, the previous state is maintained, and if z is 1, a new candidate is used. The node 1− subtracts its input from 1. If the LSTM separately sets the rate f to retain old memories and the rate i to write new candidates, the GRU in this notation groups the two rates as 1−z and z.

For example, if the previous state is 0.8, the candidate is −0.2, and z=0.25, the new state is 0.75×0.8+0.25×(−0.2)=0.55. Just remember the difference: r is used in the process of creating candidates, and z is used in the final mixing.

![Chapter 13. RNNs: Sequence and Memory — Figure 36](/images/ai-study/654078ffb89d0e848769.png)

When comparing GRU figures and implementations, you should check symbol conventions. Some sources define z as **the rate of maintaining the previous state** and write it as hₜ=z⊙hₜ₋₁+(1−z)⊙h̃. The name is the same, but since the complement ratio is used, you have to judge by looking at the equation, “What increases when z is large?” There are also variations depending on whether reset is applied before or after matrix multiplication. [Keras GRU](https://keras.io/api/layers/recurrent_layers/gru/)'s default reset\_after=True indicates this difference, and not all detailed calculations are the same as the reset-before training expression above.

```py
gru_model = keras.Sequential([
    keras.Input(shape=(None, 5)),
    keras.layers.GRU(64, return_sequences=True),
    keras.layers.GRU(32),
    keras.layers.Dense(1),
])
```

The output appearance is the same as the previous LSTM example, but the internal state update calculations are different. The basic GRU equation using one set of biases requires 3 (DH+H²+H) parameters. In Keras default reset\_after=True, the input/circulation bias is divided into 3H(D+H+2). The first GRU in this code is 13,632, the second is 9,408, and the Dense is 33, for a total of 23,073. Simply calculating “always exactly 3/4 of an LSTM” can miss bias implementation differences.

## 19. Even if you change the method of passing the state, there are still problems

| structure | state of continuation | Information control method | main burden |
| --- | --- | --- | --- |
| SimpleRNN | h | Activate after weighting the previous state and input | Vanishing gradients and explosions on long paths, limitations of compressed memory |
| LSTM | h and c | Maintain previous memory, write new candidates, regulate output | Four weighted sums and two states, sequential calculation |
| GRU | h | When creating a candidate, reset, mix previous state and candidate with update | Sequential computation and finite state capacity remain |

For all three structures, the state at the previous point must exist to calculate the next state. LSTM and GRU have better control over what to keep for longer, but they still need to convey the necessary information for the entire sentence in the state. In a simple encoder-decoder, the bottleneck of condensing the input into a single final state also remains.

It is clear where we have studied up to this point. CNN decides **what inputs to view together in space**, and RNN decides **what information to pass along in time**. Now the question arises, “Why not directly refer back to all previous states when needed?” [Attention and Transformer Structure - Chapter 14](/post/ai-foundations-16-transformer) in the next chapter starts from that question, and Transformer recreates the sequence processing structure based on that direct reference.

### Figure Sources and Implementation References

The basis for the original pictures and code is the provided lecture material 「13\_recurrent neural network」, and the material includes 『Hands-On Machine Learning, 2nd Edition』 and 『Deep Learning Starting from the Bottom』. The cell-level NumPy implementation maintains the original forward propagation and backpropagation calculations and connects them into one class. LSTM gate product accumulation, GRU's two notation conventions, and Keras bias structure are distinguished to avoid confusion.

- [Keras SimpleRNN](https://keras.io/api/layers/recurrent_layers/simple_rnn/)
- [Keras LSTM](https://keras.io/api/layers/recurrent_layers/lstm/)
- [Keras GRU](https://keras.io/api/layers/recurrent_layers/gru/)
- [GRU proposed RNN Encoder-Decoder study, 2014](https://arxiv.org/abs/1406.1078)
