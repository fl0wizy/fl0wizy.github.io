## 1. Expand computational graph to learning of entire neural network

In [computational graph - Chapter 10](/post/ai-foundations-12-computational-graphs), complex calculations are divided into smaller operations such as addition, multiplication, and activation functions. Forward propagation calculates the actual value, and backpropagation calculates how sensitive the final result is to changes in the front input.

However, there is still a distance between understanding the differentiation of a single operation and learning a neural network. Neural networks have many weights and biases. Even if you know that the prediction is wrong, you cannot automatically decide which value to change and in which direction.

This time we bridge the gap. **backpropagation is a method of calculating the gradient of the loss for each weight and bias**, and **gradient descent is a method of updating the actual value using the gradient**. The two processes are used together, but have different roles. Automatic differentiation is a function that leaves differential calculations to the framework rather than writing them by hand.

To understand this relationship, you first need to be clear about what you want to reduce.

## 2. Transform the difference between the predicted value and the correct answer into a learning goal

Input is the data that the model receives. If it is an image, it can be the brightness of the pixel, and if it is a security detection, it can be a number such as the number of connections or transmission volume. Weight is a learning target value that determines how much each input will be reflected. Bias is a value that shifts the entire standard in addition to the weighted sum of the input.

One neuron multiplies the output of the previous layer by the weight, adds the bias, and passes it through the activation function. The activation function is a function that changes the collected values into values to be passed on to the next layer. φ in the equation below is not a specific function name, but a notation that represents the activation function.

![Chapter 11. Backpropagation: From Loss to Weights — Figure 1](/images/ai-study/0e8809387eeff0b5217a.png)

z is the **weighted sum before passing through the activation function**, and a is the output after passing through the activation function. The superscript ℓ indicates which layer it is, and the subscript j indicates which neuron is in that layer. Here, the superscript is not a power. The subscript ji of w means the weight connecting the ith neuron of the previous layer to the jth neuron of the current layer.

The **loss function** is a numerical representation of how well learning is progressing by comparing the final output and the correct answer. Loss is generally defined so that the smaller the better. A distinction must be made between residual and loss, which are simply the difference between the predicted value and the correct answer. The residual obtained by subtracting the predicted value from the correct answer can be negative and its sign can be reversed. The squared error loss is non-negative because it squares the difference.

For example, let's say a neural network that distinguishes between 0 and 1 uses two outputs. If the correct answer is 0, the correct answer vector is expressed as (1, 0), and if the correct answer is 1, the correct answer vector is expressed as (0, 1). The method of assigning one position to each category and indicating the correct position as 1 is called one-hot expression.

![Chapter 11. Backpropagation: From Loss to Weights — Figure 2](/images/ai-study/fe8f736ed4fb66ddcfbb.png)

If there are 64 training images, a prediction is made for each image and the loss is calculated. When the loss of the kth image is Cₖ, the squared errors of the two outputs are added, and the loss of the entire data, Cₜ, is the sum of 64 losses.

![Chapter 11. Backpropagation: From Loss to Weights — Figure 3](/images/ai-study/178c50de15f0562d9ddc.png)

t₁\[k\] and t₂\[k\] are the two correct values of the kth data. a₁³\[k\] and a₂³\[k\] are the predicted values of the output layer. The first 1/2 simplifies the calculation by removing the 2 from the square when differentiating. Adding 1/2 in front of the squared error does not change the location of the minimum point, but it does change the size of the slope.

Afterwards, using only C usually means the loss of one piece of data. The slope for the entire data is obtained by adding or averaging the slopes obtained from each data. Additionally, the two output examples below are settings that apply the activation function to each output separately. If you use Softmax to tie the outputs together, you must apply the differentiation rules appropriate for the function.

## 3. Why does gradient descent subtract the gradient?

Let's consider the input of the loss function as the weight to be learned. When the weights change, the prediction changes, and when the prediction changes, the loss also changes. Therefore, loss can be viewed as a function of weight.

![Chapter 11. Backpropagation: From Loss to Weights — Figure 4](/images/ai-study/05fc9a77b52d5ac0d0c5.png)

The horizontal axis is the learning target value and the vertical axis is the loss. Move little by little from the starting position and look for a direction in which loss decreases. In the bowl-shaped function as shown in the picture, you can imagine it going down toward the bottom.

The information needed at this time is differentiation. ∂L/∂w represents **how much and in which direction the loss L changes when the weight w is increased slightly when other values are fixed**. ∂ is a partial derivative symbol that differentiates by changing only one of several variables.

- **When the slope is positive:** Increasing w slightly increases the loss. To reduce loss, reduce w.
- **When the slope is negative:** Increasing w slightly reduces the loss. To reduce loss, increase w.
- **When the slope is 0:** It means that the primary change information at that point is 0. We cannot conclude that this alone is the minimum score.

![Chapter 11. Backpropagation: From Loss to Weights — Figure 5](/images/ai-study/ca44e1a2f3b79b40172b.png)

This sign relationship can be expressed in one equation as follows.

![Chapter 11. Backpropagation: From Loss to Weights — Figure 6](/images/ai-study/5e326d427096cdcb97ae.png)

η is read as eta and is **learning rate**. It is a positive number that controls how much to move at one time. If the slope is positive, the weight decreases by subtracting positive numbers, and if the slope is negative, the weight increases by subtracting negative numbers. The same rule applies to bias.

For example, if w is currently 2, gradient is 6, and learning rate is 0.1, the new value is 1.4. If w is currently 2 and the slope is −6, the new value is 2.6. Whether the loss is negative or the correct answer is a separate story. Here, the sign tells **in which direction to change the weight**.

If the learning rate is too large, it may pass over the low point and move to the opposite high point, or the loss may continue to increase. If it is too small, improvement can be very slow. Since the direction of gradient descent uses information near the current position, the loss is not necessarily reduced when moving once.

Additionally, the loss surface of a real neural network is not a simple bowl shape. The point where the slope is 0 may be the maximum or saddle point. The saddle point is the point where something goes up in one direction and goes down in another. **Slope 0 is a candidate condition for a general minimization problem, not a guarantee that the global minimum has been reached.**

### If there are dozens of values, dozens of slopes are also needed.

Let's call the weight and bias gathered in one line the parameter vector θ. A gradient vector, or gradient, is a collection of partial derivatives for each value in the same order. To reduce the function value, the corresponding partial derivative multiplied by the learning rate is subtracted from each component.

![Chapter 11. Backpropagation: From Loss to Weights — Figure 7](/images/ai-study/ab42f69d0518e81fb4f6.png)

The general function f(x₁, …, xₙ) also follows the same principle. Set the change amount of each variable as Δxᵢ = −η ∂f/∂xᵢ, add the change amount to the current value, and calculate the slope again. In a neural network, weights and biases are placed in place of these variables. The goal is to lower the loss using the current gradient, not to solve a separate function that makes the gradient itself smaller.

## 4. Gradient descent confirmed numerically

Consider the function f(x, y) = x² + y², which consists of two variables. In this example, x and y are not input pixels of the image, but variables that we want to move around to find the minimum point. The starting point is (3, 2) and the learning rate is 0.1.

![Chapter 11. Backpropagation: From Loss to Weights — Figure 8](/images/ai-study/2bb28d8a5d05bbbcf668.png)

The initial slope is (6, 4). If you multiply this by −0.1, the amount of change becomes (−0.6, −0.4). Adding to the current position, the next position is (2.4, 1.6). The function value decreases from 13 to 8.32.

The second time, we don't continue to use the previous gradient. Recalculate the slope (4.8, 3.2) at the new location. The amount of change is (−0.48, −0.32), and the next position is (1.92, 1.28). The function value is 5.3248.

![Chapter 11. Backpropagation: From Loss to Weights — Figure 9](/images/ai-study/2abe33fb89d9338952f7.png)

Each row of the table shows the current position, the slope at the current position, the amount of change to use for the next move, and the current function value. On the screen, the values are rounded to two decimal places, so some values in the back row appear as 0.00. This does not mean that it becomes exactly 0 in the actual calculation.

In this function, x and y are 0.8 times each time, and the function value is 0.64 times each time. Therefore, after moving 30 times, the function value is approximately 0.0000199. The minimum point in this example is (0, 0), and it gets closer to that point as it is repeated. The importance of the movement size can also be seen in the fact that if the learning rate is changed to 1, the position only changes sign each time, so the function value does not decrease.

## 5. Even a small neural network requires 47 gradients

Now let’s replace the variables of gradient descent with the weights and biases of the actual neural network. It uses a fully connected neural network with 12 inputs, 3 hidden layer neurons, and 2 output layer neurons. Fully connected means that all neurons in the previous layer are connected to all neurons in the next layer.

![Chapter 11. Backpropagation: From Loss to Weights — Figure 10](/images/ai-study/498a0dca20b28090a12a.png)

Enter the 12 pixels of the small image, arranged from x₁ to x₁₂. The layer numbers are 1 for the input layer, 2 for the hidden layer, and 3 for the output layer. aᵢ¹ of the input layer is equal to input xᵢ. The input layer itself has no weights or biases to learn in this example.

| section | calculation | Number of values to learn |
| --- | --- | --- |
| Weight from input layer to hidden layer | 12 × 3 | 36 |
| Hidden layer bias | 1 per neuron | 3 |
| Weights from hidden layer to output layer | 3 × 2 | 6 |
| Output layer bias | 1 per neuron | 2 |
| total | 36 + 3 + 6 + 2 | 47 |

To learn this neural network using gradient descent, the partial derivative of each of the 47 parameters required for one update must be obtained. This does not mean solving 47 differential equations. This means that for each parameter, one loss slope value is obtained at the current position.

Let’s read the notation specifically. w₁₁² is the weight that goes from the first input of the input layer to the first neuron of the hidden layer. w₁₂² is the weight going from the second input to the same hidden neuron. w₁₁³ is the weight from the first neuron of the hidden layer to the first neuron of the output layer.

![Chapter 11. Backpropagation: From Loss to Weights — Figure 11](/images/ai-study/f0c758925a3479212965.png)

The last weight in the first equation means that the subscripts of w are 1 and 12. Since there are 12 pixels, there are 12 terms. In the second equation, there are 3 outputs of the hidden layer, so there are 3 terms multiplied by the weights. The calculation structure in the hidden layer and output layer is the same. The only difference is that the output of the previous layer is used as the input of the current layer.

## 6. What is difficult if you expand differential calculus from beginning to end every time?

Let’s say we change one of the weights w₁₁² in front of the hidden layer. The weighted sum of the first hidden layer neuron changes, and the output of that neuron changes. This output is routed to two final outputs. Therefore, there are two paths to reach the loss.

![Chapter 11. Backpropagation: From Loss to Weights — Figure 12](/images/ai-study/73abf22b4bc8bf0b500d.png)

One path goes through the first neuron of the output layer, and the other path goes through the second neuron of the output layer. **The local derivatives are multiplied within one path, and the contributions from different paths are added.** The local derivative is the rate of change between the input and output of that operation, not the entire neural network.

![Chapter 11. Backpropagation: From Loss to Weights — Figure 13](/images/ai-study/604612e37514e4b30162.png)

The sum sign in the first line means that the path with output j equal to 1 and the path with output j equal to 2 are added. The five derivatives of each path sequentially connect loss, output layer activation, output layer weighted sum, hidden layer activation, and hidden layer weighted sum. This is the chain rule for multiple variables.

If there are 64 pieces of training data, the slope obtained for each piece of data is added again as shown in the second line. Similar calculations on the back path are repeated when calculating the slope of other weights. The more layers and connections there are, the more cumbersome and redundant it is to unfold this equation from scratch every time.

Backpropagation reduces this duplication. **Save the gradient already obtained at the back and use it again at the front.** If the rules learned in the computational graph are grouped into layers, the reuse structure is clearly revealed.

## 7. Relationship between code, computational graph, automatic differentiation, and backpropagation

When implementing a model, define the layer, activation function, and learning target values. When forward propagation is executed, predicted values and loss are created from the input. In PyTorch's general immediate execution method, the computational connections in this process are recorded as a graph for automatic differentiation.

Then, when we call backward() on the loss, the framework follows the graph backwards using the differentiation rules prepared for each operation. In this way, the method of calculating the forward slope starting from the output side is reverse automatic differentiation, and is connected to backpropagation in neural networks.

Therefore, it should not be understood as completing all differentiation first with automatic differentiation and then performing a separate backpropagation operation one more time. **Automatic differentiation is a broader concept that automates calculations, and backpropagation is the core method of calculating the gradient within it.** Automatic differentiation also has a forward method, so the two terms are not completely synonymous in all situations. [PyTorch automatic differentiation explained](https://docs.pytorch.org/tutorials/beginner/basics/autogradqs_tutorial.html)

Let's also distinguish between nodes in computational graphs and neurons in neural networks. Calculating one neuron requires several operations such as multiplication, addition, and activation function. In implementation, this can be processed by grouping it into a large operation. The terms addition node or exponential function node refer to **operational units that make up calculations**, not to separate neural network layers.

Only after all slopes have been obtained does the optimizer update the value. An optimizer is an algorithm or implementation object that receives the calculated gradient and modifies parameters. Gradient descent is one type. Backpropagation itself is not dependent on a specific update algorithm. The same gradient can be passed to different optimizers such as SGD or Adam.

## 8. What is the error δ of a node

To simplify complex equations, the derivative of the loss with respect to the weighted sum of neurons z is grouped into one symbol. δ is read as delta.

![Chapter 11. Backpropagation: From Loss to Weights — Figure 14](/images/ai-study/49db8d34b50c68835484.png)

δⱼℓ represents how much the loss changes when the weighted sum of the jth neuron in the ℓ layer is changed slightly. Traditionally, this is called Node's error, but it is not always the same as the number obtained by subtracting the predicted value from the correct answer. It is not even an indication of whether the neuron is correct or incorrect.

![Chapter 11. Backpropagation: From Loss to Weights — Figure 15](/images/ai-study/58c21e441058ecfeb31f.png)

In the figure, the effect of z₁² of the hidden layer on the loss is transmitted through two outputs. δ₁² is the result of combining all the effects of the path. δ₂³ of the output layer is the sensitivity from the second weighted sum of the output layer to the loss.

If δ is a positive number, slightly increasing z when other values are fixed increases the loss. If δ is negative, slightly increasing z is the way to reduce loss. However, since what is actually adjusted is not z itself, but the weight and bias that creates z, the derivatives of each parameter must be additionally connected.

The purpose of introducing δ is not to create a new kind of error. This is to name and reuse the **later calculation results** that commonly appear in the slopes of various weights.

## 9. If you know δ, you can immediately find the slope of the weight and bias.

### Weights entering the hidden layer

The term containing w₁₁² in the weighted sum of the first neuron in the hidden layer is w₁₁²x₁. If other values are fixed and only this weight is differentiated, x₁ remains.

![Chapter 11. Backpropagation: From Loss to Weights — Figure 16](/images/ai-study/3b16a42987111f0a4d2b.png)

![Chapter 11. Backpropagation: From Loss to Weights — Figure 17](/images/ai-study/b2a92fc24ef63e0f60f1.png)

Multiplying δ₁² delivered from the back by x₁ received from the front becomes the slope of the loss relative to the weight of the connection. Since the input layer output a₁¹ is x₁, the two notations are the same.

The reason the input is multiplied is because when you change the weight, the weighted sum changes as much as the input. If the input is 0, the multiplication term does not change in the data even if the weight changes slightly. When the input is large, the same weight change changes the weighted sum larger.

### Weights going into the output layer

The rules are the same in the output layer. However, the value coming through the connection is not the original input x, but the output a of the hidden layer.

![Chapter 11. Backpropagation: From Loss to Weights — Figure 18](/images/ai-study/aeae3640d163ea8b3439.png)

![Chapter 11. Backpropagation: From Loss to Weights — Figure 19](/images/ai-study/979f49fcf913b7d222d9.png)

**The slope of the weight is the product of the δ of the arriving neuron and the output of the previous layer through that connection**. We do not just look at δ, nor do we call the weight value itself the slope.

### slope of bias

The bias is added directly to the weighted sum. Therefore, differentiating z by b is 1.

![Chapter 11. Backpropagation: From Loss to Weights — Figure 20](/images/ai-study/2fd04e52ebc71f02ab33.png)

![Chapter 11. Backpropagation: From Loss to Weights — Figure 21](/images/ai-study/a7f2352aca2d5a988460.png)

The slope of the bias is equal to δ of the corresponding neuron. The reason the input value is not further multiplied is because the bias term is in the form b × 1.

### Apply the same rule to other connections

![Chapter 11. Backpropagation: From Loss to Weights — Figure 22](/images/ai-study/e898c6d9abcbf5c7c27a.png)

w₁₂² takes the second input, so it multiplies x₂. Since w₂₃³ is connected from the third neuron of the hidden layer to the second neuron of the output layer, δ₂³ is multiplied by a₃². The slope of the second deflection of the output layer is δ₂³.

There is now less need to differentiate each of the 47 weights and biases in a long way. Once the δ of all neurons is obtained, each gradient can be obtained by combining that value with the previous layer output saved from forward propagation. The next problem is **how to find δ**.

## 10. Reason for calculating δ of the output layer first

The output layer is directly connected to the losses. Find the derivative of the loss with respect to the predicted value and multiply it by the derivative of the activation function to get the output layer δ. Let's generally write the number of the last floor as L. Here, L is the floor number, and the context is different from L used to express loss earlier. Below, loss is written as C to reduce confusion.

![Chapter 11. Backpropagation: From Loss to Weights — Figure 23](/images/ai-study/20fbeb377bd586eb5dfa.png)

![Chapter 11. Backpropagation: From Loss to Weights — Figure 24](/images/ai-study/d32552e3ceed33c609ca.png)

If you differentiate the squared error by the predicted value, you get the predicted value minus the correct answer. If we initially set the loss as (correct answer − predicted value)², the result is the same. This is because when differentiating, the inside −1 is multiplied together.

But this is still a derivative with respect to a. Since δ is the derivative with respect to z, we need to connect a = φ(z) once more. So the derivative of the activation function is multiplied.

### If the output activation function is sigmoid,

Sigmoid is an S-shaped function that changes any real number input between 0 and 1. For very small negative numbers, it approaches 0, and for large positive numbers, it approaches 1. If z is 0, the output is 0.5. In binary classification, we can learn to interpret the output as an estimate of the probability of correct answer category 1. The sigmoid output used in the hidden layer does not always mean that it is the probability of an event.

![Chapter 11. Backpropagation: From Loss to Weights — Figure 25](/images/ai-study/b519d3ec6339c40fc8fd.png)

The derivative of sigmoid is obtained by multiplying the current output by 1 minus that output. Therefore, it is easy to recalculate the derivative if there is a forward propagation output. When used with squared error, the output layer δ is **(predicted value − correct answer) × predicted value × (1 − predicted value)**.

If the predicted value is 0.8 and the correct answer is 1, the residual p − t is −0.2, the sigmoid derivative is 0.16, and δ is −0.032. These three values are different. It can be interpreted that a correction signal is transmitted to increase output that is lower than the correct answer.

The derivative of sigmoid is at most 0.25. As the output gets very close to 0 or 1, the derivative becomes smaller. If these small derivatives are repeatedly multiplied in several layers, the gradient transmitted forward can become very small. This is the starting point for understanding vanishing gradients. However, the connection weight and derivatives of other operations also affect the actual gradient size.

## 11. There is no answer in the hidden layer, so how do you find δ?

The output layer can be compared directly with the correct answer. On the other hand, the correct answer value is not given separately for each hidden layer neuron. The hidden layer affects the final loss through the neurons behind it. Therefore, δ received from the back layer must be used.

![Chapter 11. Backpropagation: From Loss to Weights — Figure 26](/images/ai-study/4fedb582b175ecb10490.png)

The first neuron of the hidden layer is connected to both the first neuron and the second neuron of the output layer. In the first path, the first δ of the output layer is multiplied by the weight w₁₁³ of the connection. In the second path, the second δ of the output layer is multiplied by w₂₁³. After adding the two results, they are multiplied by the derivative of the hidden layer's own activation function.

![Chapter 11. Backpropagation: From Loss to Weights — Figure 27](/images/ai-study/df6ba6d76b9f7249c5fa.png)

Here, the reason why weights appear must be separately pointed out. When the output layer weighted sum z₁³ is differentiated by the hidden layer output a₁², w₁₁³ remains. **We multiply it because the weights are the local derivatives of the path**. This does not mean that all derivatives are weights.

Just looking at the weighted sum z = wx + b, the derivative with respect to x is w, the derivative with respect to w is x, and the derivative with respect to b is 1. Even with the same operation, the results vary depending on what is being differentiated.

Additionally, the contributions of the two output paths may have different signs. Increasing the current hidden output of one path can reduce the loss, while increasing the other path can increase the loss. Backpropagation combines this influence, including its sign. It is not a process where an error is unconditionally divided equally.

### Reverse ignition system expanded to multiple floors

A simple formula is a rule for calculating the next value using an already obtained value. Here, δ of the front layer is calculated from δ of the back layer, so it can be said to be an ignition equation applied in the reverse direction.

![Chapter 11. Backpropagation: From Loss to Weights — Figure 28](/images/ai-study/b9d6b46daeb38caa2ee7.png)

The first line is the perspective of one neuron. The neurons in the next layer to which the current neuron j is connected are counted as r, and each weight is multiplied by the next layer δ and added. Afterwards, multiply the derivative of the activation function of the current neuron.

The second line is the same calculation grouped into a matrix. The rows of W correspond to arrival neurons, and the columns correspond to departure neurons. The T above is a transpose that changes rows and columns, and ⊙ is a symbol to multiply components in the same position. Transposing a matrix does not mean finding the inverse function. In order to collect information from the back layer for each neuron in the front layer, multiplication was organized according to the connection direction.

The last line is an equation that calculates the slope of the weight and bias using a matrix and a vector at once. By multiplying the δ vector by the transpose of the output vector of the previous layer, all δⱼaᵢ required for each connection is created. The principle is the same whether calculated by neuron or grouped into a matrix.

## 12. Summing and averaging the slopes of multiple data

Until now, δ and weight slope were values for one piece of data. If the overall loss is defined as the sum of the losses for each data, the slope is also summed. If we define it as average loss, the slope is also averaged.

![Chapter 11. Backpropagation: From Loss to Weights — Figure 29](/images/ai-study/6ca1fd04ead6a59c5a26.png)

m is the number of data processed at once. This group is called a batch. δ\[k\] and a\[k\] are the values obtained when the kth data is forward propagated and backpropagated. The parameters are shared, but the inputs are different, so the activation output and δ vary for each data.

While processing the entire batch, the gradient is calculated with the same current weights. Collect the slope and update it once. Each time a piece of data is processed, the immediate updating method and update order are different.

When the number of data is fixed, the sum and average have the same minimum point, but the slope size differs by m times. Therefore, you can know the actual size of the movement by looking at whether it is the sum or average of the losses and what the learning rate was. If the entire data is used at once, it is called batch gradient descent, and if part of it is grouped, it is called mini-batch gradient descent.

## 13. Direct calculation from forward propagation to update in a small neural network

Let’s connect the structure of the equation with numbers. The input is x₁ = 1, x₂ = 2 and the correct answer is 1. It uses one hidden neuron and one output neuron, and applies sigmoid to both neurons.

The hidden layer weights are u₁ = 0.1, u₂ = 0.2, and the bias is bₕ = 0. The output layer weight is v = 0.3, and the bias is bₒ = 0.1. The loss is 1/2 × (predicted value − correct answer)². There are five parameters in this example: three weights and two biases.

### First calculate the actual values

![Chapter 11. Backpropagation: From Loss to Weights — Figure 30](/images/ai-study/0913a98c9d36d1066e87.png)

The weighted sum of the hidden layer is 0.5 and the hidden output is approximately 0.622459. This becomes the input to the output layer. The final predicted value is approximately 0.571197, and the loss compared to the correct answer 1 is approximately 0.091936.

The aₕ and p calculated at this time are also used for later backpropagation. Backpropagation cannot be executed independently of forward propagation simply because the calculation order is reversed. **The current value from forward propagation is needed for differential calculation.**

### Find the output layer δ and pass it to the hidden layer.

![Chapter 11. Backpropagation: From Loss to Weights — Figure 31](/images/ai-study/d1e6a7491134a6d6f23b.png)

The output layer δ is approximately −0.105027. If we multiply this by the output layer weight of 0.3 and the derivative of the hidden layer sigmoid, the hidden layer δ becomes approximately −0.007405. The hidden layer was not directly compared to the correct answer, but sensitivity to loss was obtained from information passed behind it.

The slope of the output weight is approximately −0.065375 by multiplying the output layer δ by the hidden output. The two weight gradients in the hidden layer multiply the same δ by inputs 1 and 2, respectively, so the second gradient is doubled. The slopes of the two deflections are each δ of the corresponding layer.

### After finding the slope, update the parameter

If the learning rate is set to 0.1 and the five parameters are updated, it is as follows. The values in the table are rounded to six decimal places.

| parameter | Before renewal | slope of loss | After renewal |
| --- | --- | --- | --- |
| u₁ | 0.100000 | −0.007405 | 0.100740 |
| u₂ | 0.200000 | −0.014809 | 0.201481 |
| bₕ | 0.000000 | −0.007405 | 0.000740 |
| v | 0.300000 | −0.065375 | 0.306538 |
| bₒ | 0.100000 | −0.105027 | 0.110503 |

When forward propagation is recalculated with the updated value, the loss becomes approximately 0.090380. It is smaller than the previous approx. 0.091936. Although we have seen the reduction directly here, there is no general guarantee that one update will always reduce the loss for all networks and learning rates.

The five slopes can be confirmed with numerical differentiation, which measures the amount of change in loss by changing each parameter very slightly. In this example, using a central difference interval of 0.000001, the maximum difference from the backpropagation result is approximately 0.000000000014. Numerical differentiation is good for calculating principles, but when there are many parameters, it is expensive to replace differential calculations in actual learning.

## 14. Connecting the entire learning algorithm together

![Chapter 11. Backpropagation: From Loss to Weights — Figure 32](/images/ai-study/9c215827f35ad285b4af.png)

The entire process can be broken down into small steps as follows.

1. **Read the training data.** If there are 64 images, prepare pixel input for each image and expression of the correct answer.
2. **Set initial values for weights and bias.** In a neural network with multiple hidden neurons, initialization is also considered so that neurons do not repeat the same calculations.
3. **Calculate prediction and loss with forward propagation.** Apply the weighted sum and activation function from the front, and obtain the squared error C by comparing it with the correct answer.
4. **Calculate δ starting from the output layer.** After calculating δ of the output layer, calculate δ of the hidden layer using the reverse firing equation.
5. **Calculate the slope of each weight and bias.** The weight is multiplied by δ and the output of the previous layer, and the bias uses δ.
6. **Summarize or average the results for each data.** Obtain the overall cost function Cₜ and its corresponding slope.
7. **Update the parameter with gradient descent.** Subtract the product of the learning rate and gradient from the current parameter.
8. **Repeat from forward propagation with new parameters.** Proceed to the set learning number or termination condition by looking at the change in loss and the performance of the verification data.

The key to backpropagation is to efficiently perform steps 4 and 5 for multiple parameters. Number 7 is the optimization step that uses the results. If we distinguish between the two steps, we can understand why the weights remain the same when backward() is called. This is because the update command has not been executed yet.

## 15. What this process looks like in PyTorch

Let's create a model that changes 10 input features into 5 hidden outputs, passes ReLU, and produces one final value. Here, we use hypothetical regression data and mean square error to confirm the flow. In actual problems, the input and correct answer are replaced with training data.

```py
import torch
from torch import nn

torch.manual_seed(0)

# 1. Define the model and the training objects.
model = nn.Sequential(
    nn.Linear(10, 5),
    nn.ReLU(),
    nn.Linear(5, 1),
)
criterion = nn.MSELoss()
optimizer = torch.optim.SGD(model.parameters(), lr=0.01)

input = torch.randn(4, 10)
target = torch.randn(4, 1)

for step in range(3):
    # 2. Clear gradients accumulated by the previous backward pass.
    optimizer.zero_grad()

    # 3. Run the forward pass and calculate the loss.
    output = model(input)
    loss = criterion(output, target)

    # 4. Calculate parameter gradients by backpropagation.
    loss.backward()

    # 5. Update the parameters using those gradients.
    optimizer.step()

    print(f"step={step}, loss={loss.item():.6f}")
```

nn.Linear(10, 5) is a weighted sum layer that calculates 5 outputs from 10 inputs. Each output also has one bias. The first layer learns 50 weights and 5 biases, and the last layer learns 5 weights and 1 bias, for a total of 61. ReLU itself has no values to learn in this example.

The shape of the input (4, 10) means that 4 pieces of data each have 10 features. The shape of the output and answer is (4, 1). Since we did not add a sigmoid after the last layer, the final output is not limited to between 0 and 1. This is a choice tailored to the regression example.

The definition of ReLU is that if the input is a positive number, it outputs the input as is, and if it is 0 or less, it outputs 0. For example, 3 becomes 3 and −3 becomes 0. **The output of the positive section is not 1, but the derivative is 1**. The derivative of the negative interval is 0. Since differentiation is not mathematically defined at 0, the rule to be used must be determined in the implementation, and PyTorch uses 0. [PyTorch ReLU definition](https://docs.pytorch.org/docs/stable/generated/torch.nn.ReLU.html)

ReLU serves to add non-linearity so that even if multiple weighted sum layers are stacked, they do not combine into a single simple linear relationship. The fact that the weighted sum of forward propagation is negative does not mean that the model gave a wrong answer. This means that the value to be transmitted from the current neuron is set to 0. In backpropagation, the slope of a position that was positive during forward propagation is passed as is, and the slope of a position that was negative is made 0. Even if the slope from behind is negative, it can be transmitted as is if the forward propagation input was positive.

[optimizer.zero](http://optimizer.zero)\_grad() clears the previous gradient. PyTorch basically accumulates the gradients calculated with backward(), so if this initialization is missing, the gradients of the previous step may be mixed up. output = model(input) is forward propagation, criterion is loss calculation, loss.backward() is backpropagation, and optimizer.step() is update. The default value of nn.MSELoss() is the average of the squared errors, and the constant multiplier is different from the loss derived previously by adding 1/2. That magnification is also included in automatic differentiation. [PyTorch learning loop description](https://docs.pytorch.org/tutorials/beginner/basics/optimization_tutorial.html)

## 16. Learning a sigmoid model implemented directly in C

When using the framework, gradient calculations can be hidden from view. This time, a model that receives two inputs and produces one output is trained directly in C. The correct answer is AND, which is 1 only when both inputs are 1.

| first input | second input | Correct answer |
| --- | --- | --- |
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

There is no hidden layer in this model. It is a **logistic regression model** that applies sigmoid to the weighted sum of inputs. Only two weights and one bias are learned. This can be seen as a case where the multiple layers of backpropagation described previously have been reduced to their simplest form.

### Why is error calculated simply as predicted value − target?

There is an important difference here. The slope in the code below corresponds not to squared error but to a combination of sigmoid and binary cross-entropy losses. Binary cross-entropy is a function that increases the loss when the correct answer is 1 and gives a low probability, or when the correct answer is 0 but gives a high probability. log is natural log. [PyTorch binary cross-entropy definition](https://docs.pytorch.org/docs/stable/generated/torch.nn.BCELoss.html)

![Chapter 11. Backpropagation: From Loss to Weights — Figure 33](/images/ai-study/fdca372891edbcd75a24.png)

The denominator of the equation where loss is differentiated by p is p(1 − p). This can be reduced by multiplying this by the derivative of sigmoid, p(1 − p). Therefore, the differential δ with respect to z is summarized as p − y. **The sigmoid derivative is not omitted, but is the result of multiplying it with the derivative of the loss and organizing it**.

Conversely, if square error loss is used, this reduction does not occur. In that case, you must use (p − y)p(1 − p) as before. Therefore, you should not judge what loss is used just by looking at the variable name error in the code. You need to check the actual slope equation.

The code below is the entire program, including functions, loops, and result output required for learning.

```c
#include <math.h>
#include <stdio.h>

double sigmoid(double z) {
    return 1.0 / (1.0 + exp(-z));
}

double predict(double *x, double *w, double b, int n_features) {
    double z = b;
    for (int i = 0; i < n_features; i++) {
        z += w[i] * x[i];
    }
    return sigmoid(z);
}

int main(void) {
    double X[4][2] = {{0.0, 0.0}, {0.0, 1.0}, {1.0, 0.0}, {1.0, 1.0}};
    double y[4] = {0, 0, 0, 1};  // AND targets
    int m = 4;
    int n_features = 2;
    double w[2] = {0.0, 0.0};
    double b = 0.0;
    double lr = 0.1;
    int epochs = 1000;

    for (int epoch = 0; epoch < epochs; epoch++) {
        double dw[2] = {0.0, 0.0};
        double db = 0.0;
        for (int i = 0; i < m; i++) {
            double y_pred = predict(X[i], w, b, n_features);
            double error = y_pred - y[i];
            for (int j = 0; j < n_features; j++) {
                dw[j] += X[i][j] * error;
            }
            db += error;
        }
        for (int j = 0; j < n_features; j++) {
            w[j] -= lr * (dw[j] / m);
        }
        b -= lr * (db / m);
    }

    printf("w = [%.6f, %.6f], b = %.6f\n", w[0], w[1], b);
    for (int i = 0; i < m; i++) {
        double p = predict(X[i], w, b, n_features);
        printf("%.0f AND %.0f: p = %.6f, class = %d\n",
               X[i][0], X[i][1], p, p >= 0.5);
    }
    return 0;
}
```

### The part responsible for forward propagation

sigmoid() converts the real number z to a value between 0 and 1. exp() is an exponential function. predict() first puts the bias in z, adds the product of each input and the weight, and then applies sigmoid. This function only makes predictions and does not change the weights.

Initially, both weights and biases are 0, so the weighted sum of all four data is 0. All sigmoid outputs are also 0.5. For example, in the first iteration, the average slope is 0 for both weights and 0.25 for the bias. Therefore, the bias is first updated to −0.025. Afterwards, as the prediction changes, the weights also move.

If multiple hidden neurons are all initialized to the same value, a symmetry problem may arise where the neurons learn only the same features. Since this is a logistic regression with one output neuron, there is no need to prohibit initialization to 0 for the same reason. Also, since the roles and data of the two inputs are symmetrical, it is natural for the final two weights to be learned with the same value.

### part that collects the slope

At the beginning of each epoch, dw and db are set to 0. An epoch is a unit that processes the entire training data once. In the inner loop, the predicted value of each of the four data is obtained and p − y is calculated.

X\[i\]\[j\] × error added to dw\[j\] is the slope of the jth weight. The error is added to the db as is. The weight gradient and bias gradient derived earlier are used as is. Rather than changing each data to a new parameter, all four slopes are collected using the current parameters.

### The part that changes the actual value

After processing the four data, dw and db are divided by m = 4 and averaged. Multiply this by the learning rate lr = 0.1 and subtract it from the current value. This is batch gradient descent. After processing all data, updating once is repeated 1,000 times.

This code can be learned by directly calculating the differential equation for loss without printing the loss value itself. However, to observe the learning state, it is useful to also record the average cross-entropy or verification performance. When p is very close to 0 or 1, direct calculation of logarithm requires numerical caution. In an actual framework, an implementation that stably combines sigmoid and loss can be used.

### Read the learning outcomes

If you run the above program, you will get the following result based on 6 decimal places.

```txt
w = [3.037636, 3.037636], b = -4.773702
0 AND 0: p = 0.008378, class = 0
0 AND 1: p = 0.149813, class = 0
1 AND 0: p = 0.149813, class = 0
1 AND 1: p = 0.786099, class = 1
```

A class is a classification result that is set to 1 if the probability estimate is 0.5 or more. The learned weights increase the weighted sum as the two inputs increase. Negative bias lowers the default. So, if only one input is 1, it does not yet exceed 0.5, but if both inputs are 1, it exceeds the standard.

Learning must also be distinguished from the task of making the output exactly 0 and 1. In a finite weighted sum, the sigmoid output is not exactly 0 or 1, but a value somewhere in between. The value is compared with the classification criteria to determine the correct answer.

AND can be trained with this model because it can divide two categories with a straight boundary. If you change the answer to XOR, it cannot be solved with the same structure. This is because XOR is a problem where the answer is 1 when only one input is 1, and it cannot be divided by a single linear boundary. This difference also leads to the need for multiple layers and a nonlinear activation function.

## 17. Why backpropagation should not be thought of as an inverse function

Forward propagation calculates the actual output value based on the input and current parameters. Backpropagation starts from the loss and calculates the slope for each intermediate value and parameter. **Forward propagation is not a process of restoring the original input by putting the results in reverse.**

If you input −3 and −7 into ReLU, both come out as 0. It is impossible to restore which input was just by looking at output 0. Still, using the information that the input was negative during forward propagation, we can know that the backpropagation derivative is 0 at that location. Backpropagation is possible even without an inverse function.

The reason for multiplying the derivatives when going through multiple layers has nothing to do with restoration. This is because of the chain rule, which connects how much the next value changes when the previous value is slightly changed, and how much that change changes the loss. The gradient passed later is multiplied by the local derivative of the corresponding operation. Where there are branches, the results of each path are added.

Lastly, let’s distinguish between prompting situations and learning. When a sentence is input into an already learned language model, the sentence is divided into tokens, converted to numeric expressions, passed through several layers, and the score of the next token is calculated. In general inference, the weights are fixed at this time. Even if the prompt changes and the internal calculation value and output change, it cannot be said that the weights have been learned.

When learning a language model, the next token is predicted from the context and the loss compared to the actual next token is obtained. The slope of the loss is calculated using backpropagation, and then the optimizer updates the weights. Although the actual language model does not have the same layer composition or loss as the small sigmoid neural network in this chapter, the connection of **creating the loss with forward propagation, obtaining the gradient with backpropagation, and updating the parameter with the gradient** remains the same.
