- **Artificial Neural Network**
  - **Single layer perceptron**
  - **Multilayer Perceptron**
  - **Deep Neural Network (DNN)**
- **Basic concepts of deep learning**
  - **Reset Weights**
  - **Batch Normalization**
  - **parameter update**
  - **Learning rate scheduling**
  - **regularization method**

Let’s start our deep learning story with the perceptron. Perceptron is the smallest artificial neural network. It's confusing because it has several names, but it's actually a ladder connected in one row.

| name | Appearance | In short |
| --- | --- | --- |
| Perceptron (= single layer perceptron) | Input → **one layer of neurons** → output | smallest neural network |
| Multilayer Perceptron (MLP) | Input → **hidden layer** → Output | What are commonly called “artificial neural networks” |
| Deep Neural Network (DNN) | Input → **multiple hidden layers** → output | deep learning |

The criterion for changing the name of this ladder is “how many floors there are.” It is called deep learning because it has deep hidden layers.

**How is it different from the model we learned earlier**

Linear regression, logistic regression, and one neuron share the same weighted sum framework. The input is multiplied by the weight and added (weighted sum), and the result is put into a function. This does not mean that both KNN and decision tree have the same calculation structure. The only thing that is different is the function added at the end.

| model | What to do next after weighted sum | output |
| --- | --- | --- |
| linear regression | do nothing | Number (Risk Score 73.2) |
| Logistic regression | put in sigmoid | **Probability** (88% chance of an attack) |
| Perceptron | Put it in a step function | **0 or 1** (is/is not an attack) |

Therefore, the answer to the question “How is it different from a stochastic structure?” is as follows.

- Logistic regression: It tells you how confident you are, such as “88% chance of attack.”
- Perceptron: If the weighted sum exceeds the standard, it is cut to 1, otherwise it is cut to 0. Whether it is 51% or 99%, it is equally an “attack.”

However, this perceptron's succinct nature becomes its critical weakness. The reasons continue below.

## View single neurons and entire neural networks together

![Chapter 8. The Fundamentals of Deep Learning — Figure 1](/images/ai-study/21017b6e1ffe5528e524.png)

Although it was inspired by the shape of biological neurons with multiple inputs and one output, artificial neurons do not exactly reproduce the behavior of an actual brain. In the artificial neuron in the picture, the input is multiplied by the weight, the bias is added, and the activation function is applied. The object of learning is mainly these weights and biases.

![Chapter 8. The Fundamentals of Deep Learning — Figure 2](/images/ai-study/6886a33f3e7051b65d0c.png)

One circle is a neuron, a vertical bundle of circles is a layer, and one line is a learned connection. The input layer is where data is received, and the hidden layer creates an intermediate representation that is not directly observed as the correct answer. The output layer produces a final value appropriate for the problem. When counting the number of weight layers, there is a convention of subtracting the input layer from the calculation layer, so check the actual structure together rather than the name “how many layers.”

![Chapter 8. The Fundamentals of Deep Learning — Figure 3](/images/ai-study/4e111ef91d19aed7da4d.png)

If you expand the 12 pixels of a 4 × 3 image, there are 12 inputs. The pixel number is the location of the input, not the type of answer. If there are two outputs, the scores or estimated probabilities for 0 and 1 can be placed in the two digits, respectively. Hidden neurons mix pixels with different weights to create a new representation useful for the next layer.

## Why Neural Networks Developed This Way

**Step 1 - Let's imitate the brain (Perceptron, 1958)**

Nerve cells in the brain receive signals from many places. If the sum of signals exceeds a certain level, it sends a signal to the next cell, and if it does not exceed a certain level, it stays still. The perceptron translates this idea into a simple mathematical model.

- Incoming signal: input x.
- Different importance for each signal: weight w.
- If it goes over, shoot, if it doesn't go over, stay still: it's a step function.

There was great anticipation because the computer learns by looking at data and adjusting the weights on its own.

**Step 2 - Hitting the Wall (XOR Problem, 1969)**

Perceptron is ultimately a model that divides space with a single straight line. However, it has been proven that even very simple problems that cannot be separated by a single straight line, such as “1 only when two inputs are different” (XOR), cannot be solved. Because of this, neural network research stagnated for a while. It is the same wall as the “straight wall” that SVM crossed with the kernel.

![Chapter 8. The Fundamentals of Deep Learning — Figure 4](/images/ai-study/65a333418b7eafb70108.png)

AND and OR can separate two categories with a straight line, but XOR cannot. One expression of XOR is to calculate OR with the first hidden neuron, NAND with the second, and output the AND of the two. NAND is an operation that produces 0 only when both inputs are 1. By combining multiple boundaries like this, areas that could not be separated by a single straight line can be expressed. The fact that it can be expressed in a multi-layer structure and the fact that its weights can be well learned from data are two different things.

**Stage 3 - If you stack the layers, you can solve it, but you can't learn**

The solution itself was known. You can stack perceptrons in multiple layers.

- 1st floor: Two perceptrons each draw a straight line.
- 2nd layer: Perceptron selects the “area between two straight lines”.

This solves the XOR. The problem was how to learn the weights. The “just speaking” nature mentioned earlier is what holds you back here.

- Gradient descent is needed: We need to know how much the error changes (slope) in which direction when the weights are slightly changed.
- The problem with the step function: Since the output is either 0 or 1, the output hardly changes even if the weight is slightly changed, but suddenly changes at some point. The slope is 0 almost everywhere, so it doesn’t tell us “which way to fix it.”

**Step 4 - Transform the stairs into smooth curves**

The step function was changed to a smooth function like sigmoid. Then, even if the weight is changed, the output changes slightly, creating a slope. **Error backpropagation** is a method of changing the weights of all layers at once by inverting and transferring this gradient from the output to the input direction.

The interesting thing here is that one neuron with a sigmoid added to the weighted sum is the same as in logistic regression. Therefore, artificial neural networks can be viewed as “multiple layers of small units such as logistic regression.” If softmax is used in the last output layer, the probability comes out again like the first model learned.

**Step 5 – But why a neural network**

The models in the previous units had common homework. Good features had to be created by people.

- Polynomial regression: A person determines the degree and creates x² and x³.
- SVM: The person chose the kernel (which space to move to).
- Decision tree: Questions can only be asked based on the features given by the person.

The hidden layer of the neural network does this work itself. The front layer combines the original data to create useful features, and then builds more complex features on top of them. In a photo, the lower layer captures lines and edges, and the deeper layer captures the shape of the eyes or face. The last layer only classifies using the created features like logistic regression or softmax.

If you move to security, this is the difference. The previous model required a human to select and input features such as “number of packets, number of bytes, and port number.” When given near-raw data, a neural network automatically finds which combination is a signal of an attack. Instead, it requires a lot of data to find it, and it is difficult to explain why that decision was made.

## What each part does in one learning session

![Chapter 8. The Fundamentals of Deep Learning — Figure 5](/images/ai-study/efa15489cf51be6de1d6.png)

Select one mini-batch, calculate the current prediction and loss, and use differentiation to determine in which direction each parameter should be changed to reduce the loss. Then the optimizer updates the actual values. Simple gradient descent moves in the opposite direction of the gradient, not the gradient itself. This iteration is performed over multiple batches and epochs.

Backpropagation is not an inverse function calculation that restores the original input from the output. Connect the derivative of the intermediate operation to find how sensitive the loss is to the weight. The slope for the weights and the weights themselves are also different. If z = wx + b, the value obtained by differentiating z by w is the input x, and the value obtained by differentiating z by x is the weight w.

The specific arithmetic connection is [computational graph - Chapter 10](/post/ai-foundations-12-computational-graphs), and the differentiation of the entire layer is expanded with numbers from [backpropagation - Chapter 11](/post/ai-foundations-13-backpropagation). In this chapter, you first need to determine the location and necessity of each part.

## Three problems that arose from deep accumulation

Thanks to error backpropagation, it is now possible to learn even if multiple layers are stacked. But when I actually built up the layers, three new problems arose. The rest of this chapter is all about tools to fix one of these three.

| problem | symptoms | repair tool |
| --- | --- | --- |
| 1. I can't learn | Tilt is not transmitted to the front floor | Activation function replacement, weight initialization, batch normalization |
| 2. Slow learning | Wandering zigzag towards the floor | Optimizer, learning rate scheduling |
| 3. Memorize everything | Only the training data is correct, but the new data is not correct. | Early termination, L1·L2, dropout, data augmentation |

Before that, let’s first look at what the neural network learns to reduce.

**First - what does a neural network reduce (cost function)**

Learning a neural network is the same as the regression section. Measure the difference between the prediction and the correct answer as one number (cost), and adjust the weight so that the number is smaller. So it is said that learning (neural network) = optimization (mathematics).

The cost function is chosen depending on the problem.

- Regression (when guessing numbers): Use mean square error (MSE). The output layer sends out the received value as is (identity function).
- Classification (when selecting a box): Use cross-entropy. The output layer generates probabilities using softmax. If you give 0.6 to the correct class, the cost is -log(0.6) ≈ 0.51. The closer the probability is to 1, the closer it is to 0.

Cross-entropy is given different names depending on the shape in which the correct answer is given.

| problem | name | Appears to give the correct answer |
| --- | --- | --- |
| either one | Binary cross-entropy (BCE) | 0 or 1 |
| one of many | Categorical cross-entropy (CCE) | Vector (one-hot) where only the correct digit is 1, such as \[0, 0, 1, 0\] |
| one of many | Sparse categorical cross-entropy (SCCE) | Just integer 2. Calculation is same as CCE |

### Problem 1. No learning - vanishing gradients
**What Happens**

Error backpropagation transmits the gradient obtained in the output layer forward through the layers. At this time, each time a layer is passed, the slope of the activation function of that layer is multiplied.

The slope of the sigmoid is 0.25 even at its largest. By multiplying only the five local derivatives of the activation function, the maximum is 0.25 x 0.25 x 0.25 x 0.25 x 0.25 ≈ 0.001. The sum of weights and paths also affects the slope of the entire actual floor. Like a game of whisper-passing, the signal gets fainter the farther back you go, so the front floor barely hears “which way to fix it.” So learning in the front layers can become very slow or virtually stop. These are **vanishing gradients**. Conversely, if the multiplied value is greater than 1, the gradient increases for each layer and explodes, which is **gradient runaway**.

The solution is three-pronged. This involves increasing the multiplication gradient itself (activation function), finding a good starting point (weight initialization), or keeping the values in an appropriate range throughout learning (batch normalization).

---

**Solution 1 - Change the activation function**

First, let's check why the activation function is necessary. If the activation function is a straight line (e.g. f(x) = cx), even if you go through the layers three times, c There is no point in stacking layers. So the hidden layer requires nonlinear activation. Even if it is made up of several straight line pieces like ReLU, it is non-linear if the whole thing is not a single linear function. The question is which curve?

| activation function | Appearance | good point | problem |
| --- | --- | --- | --- |
| step function | 0 or 1 | Origin of Perceptron | Since the derivative is 0 almost everywhere, it is difficult to learn multilayers with standard backpropagation. |
| sigmoid | S-shape of 0\~1 | smooth | Both ends are flat, vanishing gradients |
| tanh | S-shape of −1\~1 | A little better than sigmoid | As expected, both ends are flat, so vanishing gradients |
| ReLU | If it is a negative number, it is 0. If it is a positive number, it is as is. | The slope on the positive side is always 1, which reduces dissipation and makes calculations faster. | A neuron that receives only negative numbers will have a gradient of 0 and may die. |
| Leaky ReLU | If it is a negative number, it is 0.01 times, if it is a positive number, it is the same. | Even in negative numbers, a small slope is left to prevent dead neurons. |  |
| ELU | curve is smooth on the negative side | Solve the problem of ReLU | It's a bit slow because it's an exponential calculation. |

In ReLU, the local derivative of the positive interval is 1, so the activation function itself alleviates the problem of shrinking the gradient. However, since the backpropagation of the entire layer is multiplied by the weights and the derivatives of other operations, using ReLU does not eliminate vanishing gradients or congestion. In general fully connected neural networks, the ReLU series is often used, and different activations are also used depending on the model structure. The output layer is determined separately. Regression is the identity function, classification is softmax.

---

**Solution 2 - Start the weights from an appropriate size (weight initialization)**

![Chapter 8. The Fundamentals of Deep Learning — Figure 6](/images/ai-study/33f5c306c22599e88af5.png)

The first line compares the sigmoid output distribution of each layer in the standard deviation 1, the second 0.01, and the third Xavier setting. Distributions that are concentrated at both ends may be saturated and produce small differentials, and distributions that are too narrow around 0.5 may not convey sufficiently different information. This is why we want to choose an initialization that spreads appropriately over the middle section.

A distinction must be made between the symmetric problem of starting all different neurons with the same weight, and the problem of the size being too small even if different random numbers are used. LeCun initialization is a representative form that uses a standard deviation of 1/√n for the number of inputs n, and appears together in self-normalization settings such as SELU. Glorot·He·LeCun is not memorized as a rule, “smaller is always better.”

Learning starts the weights from random values. The size of this random value is more important than you might think.

- If you start too large: the weighted sum grows larger with each layer, converging on the flat ends of the sigmoid (0 or 1). As the slope approaches 0, vanishing gradients occur.
- If you start too small: all neurons emit approximately the same value (around 0.5). As the output becomes similar, expression may be limited. Since small weights are repeatedly multiplied in backpropagation, vanishing gradients may still occur. This is the problem of limited expressiveness.

So a rule was created to determine “just the right size.” The principle is one. The more inputs come from the previous layer, the smaller the weights start. If you add 100 inputs, the sum will be larger than if you add 10 inputs, so reduce the weight accordingly to keep the size of the sum constant.

| method | Standard deviation of weight when there are n nodes in the previous layer | Activation function used together |
| --- | --- | --- |
| Xavier (Glorot) reset | General type √(2/(n input + n output)); If the two widths are the same, then 1/√n | Sigmoid, tanh |
| He reset | √(2/n) | ReLU series |

The reason He is slightly larger than Xavier is because ReLU discards all negative inputs to 0. Since half of the signal is discarded, the weight is increased accordingly to compensate. Keras uses Xavier(glorot\_uniform) by default, but changes it to He(he\_normal) when using ReLU.

Solution number 2 seems similar to the regularization method of linear regression, but its purpose is different.

Although both seem similar in that they both have “lower weight”

|  | regularization (ridge, lasso) | weight initialization |
| --- | --- | --- |
| When does it work | **Throughout** the learning process, within the cost function | Learning **Once at the start** |
| change what | **Destination point** (at what θ the learning will end) | **Starting point** (where to start learning) |
| purpose | Avoid overfitting (generalization) | Make learning happen (let the gradient flow) |
| Is smaller always better? | The harder you go, the simpler it becomes. | **No.** If it is too small, the neurons will all give the same value and fail. |
| If the weight increases during training, | They keep pulling me in with penalty points. | I don't care. You are free after departure |

If you compare it to a marathon, it’s like this.

Regularization is a rule that applies throughout the game (don't get too ahead of yourself). Initialization is to determine the position of the starting line. If the starting line is in front of a cliff, you cannot run at all (you will disappear), and if the starting line is at the top of the downhill, you will fall.

Rather, a closer relative is the feature scaling (standardization) of the regression unit. Just as scaling “makes gradient descent run smoothly by keeping the size of the input constant,” initialization “makes learning run well by keeping the size of the values for each layer constant.” Batch normalization is what does this for each layer throughout learning, so the three are one family.

---

Solution 3 - Trim values per layer (batch normalization)

Weight initialization only sets the values at startup. As learning progresses, the weights change, and the values of each layer may shift to one side again.

Batch normalization provides this ordering throughout training, layer by layer. Standardization of the regression unit (set to mean 0 and standard deviation 1) is not performed only on the input data, but is performed for each mini-batch between all layers.

1. Standardization: Calculate the mean and variance of the mini-batch and set the values to mean 0 and variance 1.
2. Adjustment: Multiply the adjusted value by γ (magnification) and add β (shift).

There is a reason there are two stages. If you unconditionally set the mean to 0 and the variance to 1, you cannot use it even if there is a distribution better suited to that layer. So, γ and β are also learned and the neural network determines “the best distribution for this layer” on its own. At first, we start with γ = 1, β = 0, that is, just tidying up.

**Effect**

- Faster: Under appropriate conditions, it uses a larger learning rate and helps with stable learning. For models using batch normalization, the accuracy increases to around 0.85 in just 20 epochs. Models that are not used stay below 0.4.

- Dissipation and congestion are reduced: The phenomenon of excessive bias in activation values can be alleviated.

- Overfitting is reduced: The mean and variance are slightly different for each mini-batch, resulting in a slight noise effect.

Batch normalization has 4 additional numbers per neuron. These are the γ and β that are learned, and the moving average and moving variance that are stored for use in prediction. In deep neural networks, weight initialization and batch normalization are often used together.

---

### Read up to stored values in batch normalization

![Chapter 8. The Fundamentals of Deep Learning — Figure 7](/images/ai-study/9a617fe915ab01b86220.png)

Subtract the mean and divide by the standard deviation, but add a small ε to the denominator to prevent division by zero. γ learns how much to enlarge the normalized value, and β learns how much to shift. γ·β are changed with backpropagation and optimizer, and moving average and moving variance are updated with batch statistics.

In the example of applying batch normalization to 784 inputs, a total of 3,136 values are stored, including 784 γ, 784 β, 784 moving average, and 784 moving variance. Of these, 1,568 are learning targets and the rest are in a non-learning state. Knowing this distinction allows you to understand the total, trainable, and non-trainable numbers in the model summary.

If you place batch normalization right after the weighted sum, you can omit activation in Dense and place a separate activation layer after BatchNormalization. In this case, the bias before normalization may be redundant, so consider use\_bias=False. This does not mean that regularization is mandatory in all layers or that the learning rate can be unconditionally large. [Keras batch normalization documentation](https://keras.io/api/layers/normalization_layers/batch_normalization/)

### Problem 2. Learning is slow - optimizer and learning rate

**Starting point - zigzag of gradient descent (SGD)**

Now I can learn, but it's slow. Let’s recall the mountain metaphor from the regression section. If the valley is long on one side, gradient descent zigzags down the steep wall. It takes a long time to reach the bottom. Neural networks have hundreds of thousands of weights, so long valleys like this are common.

The rules that modify the weights are called optimizers. Gradient descent (SGD) is the most basic, and the rest fix its weaknesses one by one.

**Two ways to fix it**

1. Gives inertia - momentum series
   - **Momentum**: Like a ball rolling down a slope, it gives inertia in the direction it was moving so far. The alternating left and right movements cancel each other out, and the same movements accumulate and become faster. In an ideal case where the slope is constant, the cumulative movement amount with an inertia coefficient of 0.9 can approach 10 times the basic movement amount. There is no guarantee that the actual learning time will be 1/10th of that.
   - **Nesterov Momentum**: Preview the slope of the front position you will arrive at if you follow the inertia. If it looks like it's going to pass the bottom, it's like applying the brakes in advance, so momentum converges faster than normal.
2. Separate stride length for each weight - adaptive series
\

\
- AdaGrad: Weights that have moved a lot so far shorten the stride, and weights that have moved less increase the stride. In a long valley, the steep direction moves slowly and the gentle direction moves quickly, leading straight to the bottom. In the regression section, the optimizer automatically does the work of rounding the valley through feature scaling. The downside is that the stride length continues to decrease, so if you learn it for a long time, it becomes 0 and learning stops.
\

\
- RMSProp: Gradually forget about old records and set your stride based on recent movements. Since the stride length does not fade to 0, it is much more advantageous for long learning.
\

\

a combination of two branches

- Adam: Combined inertia (momentum) and stride length (RMSProp) for each weight. It is now used as a default in most deep learning.
- Nadam: Adam plus Nesterov's “preview”.
- AdamW: This is a version with L2 regularization (force that pulls the weights down) properly applied to Adam. If you just attach them, the regularization effect will be jagged for each weight, so apply regularization separately. It is often used as a default when fine-tuning the latest models such as language models.

Learning rate scheduling - vary stride length over time

: If the optimizer determines the ratio of direction and stride, the learning rate is the total size of the stride. As we saw in the regression section, if it is too large, it diverges, and if it is too small, it takes a long time.

A typical strategy is to start with a relatively large learning rate and reduce it. There are other strategies, such as a slow warm-up or one cycle at first. When descending from a mountain hike, it is like walking briskly on a wide path and then stopping at a slow pace near your destination. Changing the learning rate during training is called learning rate scheduling.

| way | how to reduce |
| --- | --- |
| Power based | Reduce quickly at first, then slowly (½, ⅓, ¼…) |
| index based | Reduce by 10 times for each certain step (1/10, 1/100 …) |
| Fixed by section | Fix it for a few epochs and then lower it in steps. |
| performance based | If the verification error no longer decreases, then lower it. Most used in practice |
| 1 cycle | Start small, go up big, and then go down small again. |

- Performance-based example: ReduceLROnPlateau from Keras. If the verification loss does not improve two times in a row, the learning rate is reduced by half. Plateau refers to a section where performance stagnates.
- The intention of cycle 1: Start small and prevent divergence. In the middle, it moves big and gets out of a small puddle (local minimum). At the end, make it small again and sit squarely on the floor.

---

### Problem 3. Memorize everything - regularization

Now learning is good and fast. However, a neural network has hundreds of thousands or millions of weights, so it is much easier to memorize training data than a decision tree. So regularization is virtually essential. There are four ways.

1. **Early termination - It stops once you start memorizing**

As learning continues, the training error continues to decrease. However, the verification error goes up again at some point. That moment is when I started memorizing. Stopping just before that is an early termination. It is the same as what we saw in the regression section and ensemble section.

Keras EarlyStopping works like this:

- Watch the verification loss.
- If there is no improvement even after waiting for 5 epochs (patience), stop. I wait so as not to misunderstand that I am memorizing something that has been floating around for a while.
- Revert to the weights at the best time (restore\_best\_weights).

2. **L1/L2 regularization - prevents weights from growing**

Lasso (L1) and Ridge (L2) from the regression section are the same. If the weight is large, a penalty point is given to make the model less sensitive.

- L2: Keep the weights small overall.
- L1: Set useless weights to 0.

In Keras, regularizers.l2(0.01) are used for each layer. The default strength is 0.01.

3. **Dropout - rest some neurons each time**

Each time we learn, we randomly select some of the neurons (usually 10~50%) and turn them off. A neuron that is turned off produces 0 for that turn. When making predictions, all neurons are used.

It is easy to understand if you compare it to a group task. A team that has a random number of people absent every time can't rely on one person. So everyone knows the content properly. The same goes for neural networks, where it becomes difficult to combine a few specific neurons and memorize noise. Also, since we are learning a little bit of the neural network each time, the final model behaves like the average of several neural networks. The idea of the ensemble unit takes place within a single neural network.

The effect is clear. Before dropout, the training accuracy is at 1.0 and the test stops at 0.75, so the gap is large. After dropping out, the two climb together and the gap narrows. If it is overfitting, raise the ratio, if it is underfitting, lower it.

4. **Data Growth - Increase data**

Increasing the diversity of training data can help with generalization. Expand the training set by creating transformations in the existing data that retain the correct answers. Overfitting does not disappear simply by increasing the number of replications.

- Image: Flip or rotate.
- GAN: Creates realistic samples with a generative model.
- SMOTE: Creates a new sample by connecting samples of a small number of classes.

Security data often has much fewer attack samples than normal, so SMOTE is often used to increase the number of attacks.

---

Let’s look at the actual default settings as an example.

This is an example starting point that can be examined in a general fully connected neural network. It is not a fixed standard or optimal setting for all tasks. Each row in the table is a tool as seen above.

| item | default | problem to fix |
| --- | --- | --- |
| weight initialization | He reset | I can't learn |
| activation function | ELU (ReLU series) | I can't learn |
| normalization | None if shallow, batch normalization if deep | I can't learn |
| optimizer | Momentum (or RMSProp, Nadam) | slow to learn |
| Learning rate schedule | 1 cycle | slow to learn |
| regularization | Early termination (add L2 if necessary) | Memorize everything |

If you summarize it in one piece,

```txt
Weighted sum + step function = perceptron → Can only draw one straight line (XOR fails)
Perceptron with multiple layers = multi-layer perceptron → XOR is solved, but it is a step function and cannot be learned.
Staircase → Smooth function + error backpropagation → All layers can be learned (= artificial neural network)
Deeply stacking hidden layers = deep neural network → deep learning that creates its own characteristics

After deep stacking, ① learning is not possible → ReLU series, He·Xavier initialization, batch normalization
            ② Slow learning → Momentum·RMSProp·Adam, learning rate scheduling
            ③ Memorize everything → Early termination, L1·L2, dropout, data proliferation
```

## Reading the output and derivative of the activation function side by side

![Chapter 8. The Fundamentals of Deep Learning — Figure 8](/images/ai-study/9b9c5b76ae16542709df.png)

A step function displays only those that exceed a criterion. The sigmoid is 0.5 at input 0 and is smooth at both ends. tanh shifts the output range between −1 and 1, so it is centered at 0. In ReLU, if the input is a positive number, it is the same as the input, and if it is less than 0, it is 0. **This does not mean that the positive output of ReLU is 1, but that the derivative of the positive interval is 1**.

Leaky ReLU leaves a small slope α even for negative inputs. If α is set to 0.01, the output of −3 is −0.03 and the output of +3 is +3. ELU uses α(exp(x) − 1) on the negative side and sends x as is on the positive side. The negative side is smoother, but requires exponential calculations and does not automatically solve all slope problems.

![Chapter 8. The Fundamentals of Deep Learning — Figure 9](/images/ai-study/649c7b8ba8a98b647253.png)

The fact that z entered into ReLU in forward propagation is negative does not mean that the prediction is wrong. This is a condition that makes the current output of that neuron 0. The fact that a negative slope comes from backpropagation is information about the direction of correction to reduce loss. The two negative numbers are values at different positions. If z is a positive number, it is passed on as is even if the slope that comes after it is negative. z = 0 is not mathematically differentiable, so the framework uses the rules it chooses.

The output layer is determined separately according to the problem. Representative examples include identity output for numeric regression, one sigmoid for binary classification, and softmax for exclusive multiple classification. Softmax maintains the order of scores, so when only the largest class is needed, the same class can be obtained by simply obtaining argmax of the scores. However, if an estimated probability or probability threshold is needed, the value omitting this calculation cannot be used as a probability.

## Directly check the numbers in the loss function

Let's say the answer vector is \[0, 0, 1, 0, 0, 0, 0, 0, 0, 0\] and the predicted probability is \[0.1, 0.05, 0.6, 0, 0.05, 0.1, 0, 0.1, 0, 0\]. The third class is the correct answer, and the model gave it a score of 0.6.

Adding up all the squared errors is 0.195. The mean square error of dividing this by 10 output elements is 0.0195, and the definition of adding only 1/2 in front of the sum of squares is 0.0975. The difference between the two values is due to different summation and average rules. Just because a function has mean in its name, it does not automatically assume that the implementation of the function is average.

The categorical cross-entropy is −log(0.6), which is approximately 0.510826. If it is a one-hot answer, only the answer class term remains. In actual array calculations, numerical problems may occur if 0 × log(0) is calculated as is, so stable log calculations or logits-only losses are used in the implementation. logits is the real number score before passing sigmoid and softmax.

## The optimizer's internal history is different from the weights themselves.

![Chapter 8. The Fundamentals of Deep Learning — Figure 10](/images/ai-study/5faa758337e735683036.png)

g is the slope of the current loss, v is a record of past directions, and h is a record of the squared magnitude of the slope. Square and division are applied to the same position of the parameter. η is the learning rate and ε is a small positive number that prevents the denominator from becoming too small.

SGD currently moves to g. Momentum inherits the previous move v. AdaGrad continues to add squared gradients, so as the cumulative value increases, the effective stride for that coordinate decreases. RMSProp uses a moving average that de-weights older squared records. It is not a guarantee that the stride length is always constant or does not go to 0, but it is a design to alleviate the problem of infinite accumulation.

Adam uses both the average of the slope and the average of the squares, and the initial value starts from 0 to correct for small biases. Two commonly used coefficient examples are 0.9 and 0.999. Nadam combines the idea of Nesterov-style acceleration, while AdamW separates weight decay from adaptive gradient updating. “Adam plus L2 loss” and “separate attenuation of AdamW” are not the same update.

Let's also distinguish the time t, epoch, and mini-batch step of the learning rate schedule. A power example is η(t) = η₀/(1 + t/s)ᶜ, and an exponential example is η(t) = η₀ × 0.1 to the t/s power. Fixed for each section changes the value only at a certain point, and performance-based is lowered when verification performance stagnates. In one cycle, you can start small, raise it, then lower it again, and use a configuration that adjusts the momentum in the opposite direction. Neither schedule is a formula that guarantees reaching the optimal solution for all models.

## Connect structure and learning setup in one step in code

The following function assumes that 28 × 28 input images and an integer answer of 0\~9 have already been prepared. Image values are set to real numbers in the range 0\~1, and training and verification data are delivered separately from each other.

```py
import keras
from keras import layers, regularizers

def train_image_classifier(X_train, y_train, X_val, y_val):
    model = keras.Sequential([
        keras.Input(shape=(28, 28)),
        layers.Flatten(),
        layers.Dense(300, use_bias=False, kernel_initializer="he_normal",
                     kernel_regularizer=regularizers.l2(0.01)),
        layers.BatchNormalization(),
        layers.Activation("relu"),
        layers.Dropout(0.2),
        layers.Dense(100, activation="relu", kernel_initializer="he_normal"),
        layers.Dense(10, activation="softmax"),
    ])
    model.compile(
        optimizer=keras.optimizers.SGD(learning_rate=0.01, momentum=0.9),
        loss="sparse_categorical_crossentropy",
        metrics=["accuracy"],
    )
    callbacks = [
        keras.callbacks.ReduceLROnPlateau(
            monitor="val_loss", factor=0.5, patience=2
        ),
        keras.callbacks.EarlyStopping(
            monitor="val_loss", patience=5, restore_best_weights=True
        ),
    ]
    history = model.fit(
        X_train, y_train,
        validation_data=(X_val, y_val),
        epochs=50, batch_size=32, callbacks=callbacks,
    )
    return model, history
```

Flatten spreads 28 × 28 to 784 inputs and has no weights to learn. Dense is a fully connected weighted sum layer. BatchNormalization adjusts the distribution of the next value, and Activation applies ReLU. Dropout randomly sets some hidden outputs to 0 during training. The last 10 values are the probabilities of the 10 categories.

compile() sets the loss, optimizer, and indicators to observe, and fit() performs the actual learning. callbacks are a list of objects called at specific times during learning. ReduceLROnPlateau lowers the learning rate when improvement stops, and EarlyStopping stops if it does not improve even after waiting longer and restores the weights at the optimal point. The unit of patience, in this configuration, is the epoch in which verification is performed.

For prediction, model.predict(X\_new) is used. In a normal prediction process, batch normalization uses stored statistics and dropout is turned off. There is a difference between changing an input to obtain a new probability and learning new weights. [Keras Sequential Model Description](https://keras.io/guides/sequential_model/)

### Perceptron, a step function, can also learn weights from data.

Single-layer perceptron has perceptron learning rules that are different from backpropagation. Therefore, the perceptron should not be divided into having people manually set the weights and learning the neural network automatically. The following is an example of training a single-layer perceptron. When creating only two features, specify n\_redundant=0 so that the default number of redundant features does not conflict.

```py
from sklearn.datasets import make_classification
from sklearn.linear_model import Perceptron
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split

X, y = make_classification(
    n_samples=100, n_features=2, n_informative=2,
    n_redundant=0, n_classes=2, random_state=42,
)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42,
)
perceptron = Perceptron(max_iter=1000, eta0=0.1, random_state=42)
perceptron.fit(X_train, y_train)
y_pred = perceptron.predict(X_test)
print(accuracy_score(y_test, y_pred))
```

## Putting Dropout and data augmentation into the Real Flow

![Chapter 8. The Fundamentals of Deep Learning — Figure 11](/images/ai-study/b04f34355baf66867448.png)

Lines and neurons that are missing from dropout are not permanently deleted from the model. During the learning phase, the output was temporarily set to 0. A typical inverted dropout multiplies the live output by 1/(1 − p) to match the expected size, and uses all outputs as is in inference. For example, if p = 0.2, multiply the live output by 1.25.

![Chapter 8. The Fundamentals of Deep Learning — Figure 12](/images/ai-study/bd7e5e16d3a52b7c8eb0.png)

The above example shows how the training/evaluation accuracy interval changes when dropout is added. There is no guarantee that the upper side will always have higher final evaluation performance. The lower training accuracy may be due to turning off some outputs during training, so look at the interval and final verification performance together.

Data augmentation works by changing the input. Image rotation and inversion are used only within the range where the correct answer is maintained. If you rotate the number 6 greatly to make it look like 9 and give the same answer, it becomes an incorrect example. Arbitrarily mixing fields and their order in logs or malware can also destroy the meaning of the original action. GAN is a model that generates new samples and SMOTE is a method of interpolating between minority class neighbors, both of which should be used inside the training data.

Now, rather than memorizing each part separately, you can connect them by location. Prepare the input expression and training data, forward propagate with initialized weights, backpropagate the derivative in the loss, and update with the optimizer and learning rate. Regularization and validation control this process so that it is not geared toward memorizing the training data.
