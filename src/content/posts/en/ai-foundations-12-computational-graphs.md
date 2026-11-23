**How does a neural network figure out the direction to fix the weights**

To briefly explain the learning of a neural network, it is the process of finding the difference between the prediction and the correct answer and then adjusting the weights to reduce the difference. Gradient descent, momentum, and Adam, which we looked at earlier, were all methods of determining how to move the weights in this process.

However, there is something you need to know first to change the weights.

If we change these weights slightly now, how much and in what direction will the final loss change?

If the equation is short, like linear regression, it can be found by direct differentiation. However, a neural network has numerous weights, and multiplication, addition, and activation functions are connected across multiple layers. It is difficult for a person to re-differentiate the entire equation every time the model is changed and write it in code.

To solve this problem, the computer must remember the calculation process and be able to calculate on its own the effect each calculation has on the final loss.

The computational graph is what connects the calculation process. Automatic differentiation is a function that calculates the slope by applying differentiation rules to recorded calculations.

If you understand computational graphs and automatic differentiation, you can see specifically what a single line of loss.backward() in your training code does.

## 1. Where differentiation enters the learning process of a neural network

First, let's unfold the entire learning process.

When creating a neural network, you decide which layers to use and what functions to put between layers. For example, you can put the input into a Dense layer, apply ReLU, go through another Dense layer, and create class-specific probabilities with Softmax.

Here, Dense is a layer that combines the values of the previous layer with weights. The basic calculation is as follows:

![Chapter 10. Computational Graphs: Operations and Derivatives — Figure 1](/images/ai-study/313c53d0edcbefaf9e79.png)

The meaning of each symbol is as follows.

```txt
• x: A vector that collects input values.
• W: This is a matrix that collects the weights to be multiplied for each input.
• b: Bias added to the results.
• z: This is the result calculated by weighted sum.
```

A vector is a collection of numbers in a row, and a matrix is a collection of numbers like a table. In deep learning, anything from a single number to a bundle of numbers arranged in multiple dimensions is referred to as a tensor.

Each component has the following roles:

| component | What to do |
| --- | --- |
| Dense | The input is multiplied by the weight and added to create a new value. |
| ReLU | Negative numbers are changed to 0, and positive numbers are passed as is. |
| Softmax | Convert the scores for each class into a probability that the sum is 1. |
| loss function | A number indicates how different the prediction is from the correct answer. |
| optimizer | Update the weights using the calculated gradient. |

Once you have decided on the model, loss function, and optimizer, insert the training data and repeat the next process.

| step | What is calculated |
| --- | --- |
| forward propagation | A prediction is made by calculating from input to output. |
| loss calculation | Compare predictions and correct answers. |
| backpropagation | Find the slope of each weight for loss. |
| Weight update | Change the weight using the gradient. |

Forward propagation (forward pass) is the process of calculating a value. The input is multiplied by the weights, an activation function is applied, and the final prediction is made by passing it to the next layer.

Learning does not end when a prediction is made. You need to measure how wrong you were compared to the correct answer. MSE can be used in regression problems that predict numbers, and loss functions such as cross-entropy can be used in classification problems that distinguish classes.

Then, in backpropagation (backward pass), the impact of each weight on the loss is calculated. Finally, the optimizer receives the results and changes the weights.

In PyTorch, this process is written as follows.

```py
optimizer.zero_grad()

outputs = model(inputs)
loss = loss_fn(outputs, labels)

loss.backward()
optimizer.step()
```

The code and learning process correspond to:

- optimizer.zero\_grad(): Empty the gradient remaining from the previous calculation.

- model(inputs): Executes forward propagation.

- loss\_fn(outputs, labels): Calculate loss from predictions and correct answers.

- loss.backward()**:** Calculates the slope based on the loss.

- optimizer.step()**:** Changes the weight using the gradient.

Here, the roles of backward() and step() must be distinguished.

backward() calculates the gradient. What actually changes the weights is step().

Keras' model.fit(...) is a method that internally manages this learning repetition. Divide the data into small batches, perform learning on each batch, and use the entire data repeatedly a set number of times. Whether you write your own loop or use fit(), the basic structure of learning is the same.

Now let's look at the most important calculation among them: slope.

## 2. Differentiation represents the effect of input changes on the results.

When understanding differential calculus, it is good to first determine “what changes when something changes.”

For example, let's say the price of one apple is 100 won and you buy two. If the price of one apple goes up by 1 won, the price of two apples goes up by 2 won. If a 10% consumption tax is added, the final payment amount increases by 2.2 won.

In other words, the change in the price of one apple is reflected 2.2 times in the final price.

Differentiation shows how much the result changes when the input is slightly changed.

The derivative of function f(x) is defined as follows.

![Chapter 10. Computational Graphs: Operations and Derivatives — Figure 2](/images/ai-study/be7b7ff33429b6536b38.png)

Solving each part of the equation is as follows.

- **h :** This is the amount that changed the input.
- **f(x+h) − f(x) :** This is the amount by which the result changes due to a change in the input.
- **Divided by two:** It is the ratio of the result change amount to the input change amount.
- **h → 0 :** This means that the input change amount is infinitely reduced to obtain the rate of change at that point.

In a neural network, weights are changed instead of inputs.

How much does changing the weights slightly change the loss?

The derivative of loss L with respect to weight w is written as follows.

![Chapter 10. Computational Graphs: Operations and Derivatives — Figure 3](/images/ai-study/53cbb470d282368c7e39.png)

∂ indicates that when there are multiple variables, other variables are fixed and differentiated for only one specific variable. This is called **partial derivative**. ∂L/∂w represents “how much the loss L changes when the weight w is slightly changed.”

Since there are many weights in a neural network, the partial derivative for each weight must be obtained. What brings these partial derivatives together is **gradient**. ∇L refers to the slope of loss.

![Chapter 10. Computational Graphs: Operations and Derivatives — Figure 4](/images/ai-study/9b456b8833391fed0989.png)

Each cell contains the partial derivative of the loss for one weight. It can be understood as a list of how much the loss changes when a certain weight is changed, recorded by weight.

By looking at the sign of the slope, you can tell which direction to move the weight.

- **If the slope is positive:** When the weight is slightly increased, the loss also increases. To reduce loss, reduce the weight.
- **If the slope is negative:** The loss decreases when the weight is slightly increased. To reduce loss, increase the weight.

So gradient descent uses the following equation:

![Chapter 10. Computational Graphs: Operations and Derivatives — Figure 5](/images/ai-study/ec04b90d47fc61d27db4.png)

η is the learning rate. Decide how much to move in the direction indicated by the tilt. The optimizer is the tool that determines this update method, and the computational graph and automatic differentiation are responsible for finding the gradient needed for the update.

## 3. Three ways to find derivatives on a computer

Methods for calculating differentiation on a computer include numerical differentiation, symbolic differentiation, and automatic differentiation. The three methods differ in what they calculate.

### Numerical differentiation compares the results by changing the input slightly.

If h is set to a very small number in the definition of differentiation, the rate of change can be roughly calculated. For example, if f(x) = x², x = 3, and h = 0.001, then:

![Chapter 10. Computational Graphs: Operations and Derivatives — Figure 6](/images/ai-study/03667193e56dec5b8eb6.png)

The actual differential value is 2x = 6, so a close value was obtained. This is **numerical differentiation**. If you can execute a function without knowing the structure of the equation, you can compare the results and approximate differentiation.

However, the cost increases in neural networks. This is because the loss must be recalculated by changing the weights one by one. The more weights there are, the more times the entire model needs to be run repeatedly.

There is also a problem with accuracy. If h is too large, the difference from the actual instantaneous rate of change will increase, and if it is too small, the limited numerical precision of the computer may become a problem in the process of subtracting two very similar numbers.

Rather than being the main method for learning large neural networks, numerical differentiation is useful for checking whether differential values obtained through other methods are correct.

### Symbolic differentiation changes one formula into another formula.

Symbolic differentiation is close to the way humans apply differentiation formulas. Take the equation f(x) = x² and create the equation f′(x) = 2x. The input is a formula and the result is also a formula.

This is clear in simple equations, but as the equation becomes more complex, the differentiation result becomes longer and the same calculation may appear multiple times. It is not easy to handle an entire program containing conditional statements and loops using formulas.

### Automatic differentiation connects the derivatives of the performed operations.

Automatic differentiation breaks complex calculations into smaller operations. For example, the following calculation can be separated into addition and squared.

![Chapter 10. Computational Graphs: Operations and Derivatives — Figure 7](/images/ai-study/4281b56873def01c7005.png)

If you know the differential of addition and the differential of squares, you can connect the two differentials to get the overall differential. Automatic differentiation uses the operations and intermediate values actually performed by the program. Apply the prepared differentiation rules to each operation and connect the results.

| method | default method | Key Features |
| --- | --- | --- |
| numerical differentiation | Change the input slightly and measure the difference in results. | An approximate value is obtained, and if there are many variables, the amount of calculation increases. |
| symbolic differentiation | Create a new formula using the rules of differentiation. | In complex expressions, the result may be large or calculations may be duplicated. |
| automatic differentiation | Connect the derivatives for each executed operation. | The slopes of many variables can be obtained efficiently by reusing intermediate calculations. |

Automatic differentiation is accurate, meaning that it does not approximate differentiation with small changes like numerical differentiation, but directly applies the differentiation rules. This does not mean that computer rounding errors disappear.

### There are two directions of progression in automatic differentiation.

Automatic differentiation is largely divided into Forward mode and Reverse mode.

- **Forward mode:** The impact of changing a specific input is conveyed to the direction of calculation progress.
- **Reverse mode:** Starting from a specific output, the effect of each input on that output is calculated backwards.

Neural networks have many weights, but the final loss used for training is usually a single number. Therefore, the Reverse mode, which starts from one loss and finds the slope of many weights, is a good fit.

Here, **forward propagation and forward mode should not be considered the same thing.** Reverse mode automatic differentiation also executes forward propagation first to obtain the intermediate value and final result. Afterwards, the differential calculation is performed in reverse.

So how does a computer know which operations to follow backwards? For this purpose, the connection relationships of calculations must be recorded.

## 4. The computational graph records the connection between operations and data.

In computational graph, the graph does not mean a bar graph or a line graph. It means a structure that represents relationships through dots and connecting lines.

- **Node:** Operations such as addition, multiplication, and activation function.
- **Edge:** It is a connecting line through which values are passed between operations.

For example, z = Wx + b contains an operation for multiplying weights and adding a bias. Applying ReLU to the result leads to a ReLU node. Afterwards, other layers and loss functions are connected in the same way.

The computational graph ultimately contains **what operations were performed with which values and where the results were used**. In the connection line of a neural network, not only a single number but also tensors such as vectors and matrices are transmitted.

This structure is used in forward propagation and backpropagation respectively. In forward propagation, calculations are made from forward inputs to produce results. Backpropagation starts from the final result and follows the connection relationships backwards.

Each node does not need to know the equations of the entire neural network. You only need to know the differentiation rules for the calculation you are responsible for. The addition node applies the rules of addition, and the multiplication node applies the rules of multiplication. **The fact that complex overall calculations can be divided into simple partial calculations** makes automatic differentiation possible.

### The timing of creating a computational graph depends on the execution method.

The method of first defining the calculation structure and then executing it is called Define-and-Run, and the method of creating the calculation structure while executing is called Define-by-Run.

| Category | Define-and-Run | Define-by-Run |
| --- | --- | --- |
| default method | First construct the computational graph and then execute it. | A computational graph is created while executing actual operations. |
| Commonly used expressions | static computational graph | Dynamic computational graph |
| Advantages | It is good to analyze and optimize the entire structure in advance. | It is close to the code execution flow, making it flexible and easy to track errors. |
| Things to consider | Error tracking can be complicated due to the division between structure definition and execution. | Optimization can be more complex because structures are recorded during execution. |
| representative example | Traditional execution of TensorFlow 1.x | Typical execution in PyTorch, immediate execution in TensorFlow 2 |

In the dynamic method, even if the execution path of if or for varies depending on the input, the graph can be constructed according to the actually performed operation. Not all frameworks create a static computational graph simply by writing model code.

It cannot be concluded that a static method is always fast and a dynamic method is always slow. Actual speed varies depending on the type of operation, model size, and optimization method. In some cases, a single framework leverages the strengths of both approaches. TensorFlow 2 basically executes operations immediately, but you can graph the calculation of a function using tf.function. [TensorFlow implementation documentation](https://www.tensorflow.org/guide/function)

Even if the execution method is different, the purpose of using computational graph is the same. The goal is to understand the connection relationships between operations and use them to calculate or differentiate values. Now let's read one small calculation as a graph.

## 5. Understanding forward propagation and backpropagation with apple prices

Let’s say one apple costs 100 won and you buy two. Let’s find the final payment amount when 10% consumption tax is added.

![Chapter 10. Computational Graphs: Operations and Derivatives — Figure 8](/images/ai-study/90c3780451db5f547f39.png)

The × in the circle means multiplication. The numbers above the line are the values used in each calculation or the results of the calculation. First, find the pre-tax amount as 100 × 2 = 200. If a 10% consumption tax is added, you pay 110% of the original amount, so 200 × 1.1 = 220. The final payment amount is 220 won.

Forward propagation is receiving input values like this and obtaining results in the order of calculation. Expressed as variables, a = pn, C = at.

- **p:** This is the price of one apple.
- **n:** is the number of apples.
- **t:** Multiplier including tax. Here it is 1.1.
- **a:** This is the amount before tax.
- **C:** This is the final payment amount.

Now, let’s think about how much the final price increases if the price of an apple increases by 1 won. Since you bought two, the pre-tax amount goes up by 2 won. Since tax is added, the final price increases by 2.2 won. That is, ∂C/∂p = 2 × 1.1 = 2.2.

220 obtained through forward propagation is the actual payment amount. 2.2, obtained by differentiation, is the rate at which price changes are reflected in the payment amount. The two numbers have different roles.

Here, when calculating the overall rate of change, the rate of change of the intermediate stage was multiplied. It connects the impact of price changes on the pre-tax amount and the impact of changes in the pre-tax amount on the final amount. This rule is the chain rule.

## 6. The chain rule connects intermediate rates of change

Let's say a calculation takes intermediate values to produce the final result. Create the intermediate value with t = g(x), and calculate the final result with y = f(t). When input x changes, t changes first. And as t changes, y changes.

![Chapter 10. Computational Graphs: Operations and Derivatives — Figure 9](/images/ai-study/fd7b5a5f056cc825a0bf.png)

This is the **chain rule**. The last line is the same rule written in composite function notation.

- **dt/dx:** This is the extent to which changes in input x are reflected in the median value t.
- **dy/dt:** This is the degree to which the change in the median t is reflected in the result y.
- **Result of multiplying two values:** This is the extent to which changes in input x are reflected in the final result y.

### Calculations with addition followed by a square

Let's say the overall equation is z = (x + y)². Dividing t = x + y and z = t² results in two operations: addition and squaring.

![Chapter 10. Computational Graphs: Operations and Derivatives — Figure 10](/images/ai-study/23baa5531de2e8a103db.png)

The thin line is the direction in which the value is calculated, and the thick line is the direction in which the gradient is transmitted. `**2` stands for square operation. The derivative of z with respect to x is obtained by connecting the derivatives of the two operations as follows.

![Chapter 10. Computational Graphs: Operations and Derivatives — Figure 11](/images/ai-study/fbc8543df56b2ace8441.png)

The derivative of the square operation is 2t, and the derivative of x in addition is 1. Multiplying the two values gives 2(x + y).

This can also explain why backpropagation starts with 1 in the final result.

![Chapter 10. Computational Graphs: Operations and Derivatives — Figure 12](/images/ai-study/f84e30b224daf1a9ff0f.png)

The rate of change that result z has on itself is 1. Starting from this value, we move forward by multiplying the derivative of each operation.

For example, if x = 2, y = 3, then t = 5, z = 25. The slope with respect to x at this point is 2 × 5 = 10. Therefore, if x is increased slightly, z increases by about 10 times the amount of change.

Each node only processed its own derivatives. The square node multiplies by 2t, and the addition node multiplies by 1. Automatic differentiation applies this principle to longer calculations as well.

## 7. Backpropagation of addition and multiplication nodes

When calculating backpropagation, two types of differentiation must be distinguished. One is **the derivative of the current operation itself**, and the other is **the gradient already obtained and passed in the later calculation**.

If the current node's output is z and the final loss is L, the value passed later is ∂L/∂z. It indicates how much the final loss L changes when the current output z changes. The current node multiplies this value by its own derivative and passes it forward.

![Chapter 10. Computational Graphs: Operations and Derivatives — Figure 13](/images/ai-study/45ad1071d607721fa642.png)

The first term on the right is the gradient received later, and the second term is the derivative of the current operation itself. Multiplying two values is the basic operation performed by each node. Rather than sending the loss L itself backwards, it conveys the rate of change of the loss.

### Addition transfers the slope as is.

In z = x + y, if you increase x by 1, z also increases by 1. The same goes for y. Since the derivative for each input is 1, each of the slopes received later is multiplied by 1.

![Chapter 10. Computational Graphs: Operations and Derivatives — Figure 14](/images/ai-study/bfc6c278ae5dec238cf2.png)

![Chapter 10. Computational Graphs: Operations and Derivatives — Figure 15](/images/ai-study/555b454ab48a435a8c36.png)

The left side is the process of calculating the value through addition, and the right side is the process of transferring the received gradient to each input. If the forward propagation input is 10 and 5, the output is 15. Afterwards, if a slope of 1.3 is received, 1.3 is transmitted to each of the two inputs.

Here, 1.3 is not divided in half. This is because the rate of change of each input on the output is 1.

### Multiplication multiplies the input value of the other party and passes it on.

In z = xy, when you change x slightly, how much z changes depends on y. Conversely, the impact of a change in y depends on x.

![Chapter 10. Computational Graphs: Operations and Derivatives — Figure 16](/images/ai-study/d4a67819024d95029c95.png)

![Chapter 10. Computational Graphs: Operations and Derivatives — Figure 17](/images/ai-study/2f9f8e1693e04bc1189d.png)

Multiply the x side by y, and the y side by x. If the inputs are 10 and 5 and the slope received at the back is 1.3, it is as follows.

| Calculate target | calculation | result |
| --- | --- | --- |
| forward propagation output | 10 × 5 | 50 |
| slope for input 10 | 1.3 × 5 | 6.5 |
| slope for input 5 | 1.3 × 10 | 13 |

Backpropagation of the multiplication node requires the input value used during forward propagation. So the input value must be saved. During learning, forward propagation creates predicted values while also storing information needed for later backpropagation.

## 8. By backpropagating apple calculations, the influence of multiple inputs can be obtained together.

The apple example calculated earlier was a = pn, C = at. The current values are p = 100, n = 2, t = 1.1, a = 200, C = 220.

![Chapter 10. Computational Graphs: Operations and Derivatives — Figure 18](/images/ai-study/7de8284a134bfe003026.png)

The forward propagation value is written on the thin line, and the slope calculated by backpropagation is written on the thick line. We start with 1 in the final result and then multiply the other input in the final multiplication C = at.

![Chapter 10. Computational Graphs: Operations and Derivatives — Figure 19](/images/ai-study/5494b7496c64ddb8387b.png)

Now the slope 1.1 is passed to the previous multiplication a = pn. Here too, the input from the other side is multiplied.

![Chapter 10. Computational Graphs: Operations and Derivatives — Figure 20](/images/ai-study/6a1698625c82e0847b2c.png)

| input | derivative | meaning |
| --- | --- | --- |
| The price of one apple is p | 2.2 | If the price goes up by 1 won, the final price goes up by 2.2 won. |
| number of apples n | 110 | If you buy one more, the final price increases by 110 won. |
| Tax inclusive multiplier t | 200 | If the multiplier increases by 0.01, the final amount increases by 2 won. |

The tax part must distinguish between units of input. The value entered in the graph is not the tax rate number of 10, but the tax-inclusive multiplier of 1.1. When the tax rate goes from 10% to 11%, the multiplier changes from 1.10 to 1.11. Since the change amount is 0.01, the final amount increases by 200 × 0.01 = 2 won.

In reality, the number is an integer, but in the equation, it is differentiated like a continuously changing variable. Since this equation is linear with respect to number, the actual difference in price when adding one item is also equal to 110 won.

The differentials for price, quantity, and tax were not calculated from the beginning. The slope of 1.1 obtained in the back was shared by the two calculations in the front. Neural networks also reuse intermediate calculations in the same way. This is why the slopes of many weights can be obtained together through backpropagation starting from a single loss.

## 9. Backpropagation of the activation function follows the same rule.

If you understand addition and multiplication, you can handle the activation function in the same way. The activation function is a function that changes the weighted sum to another value. In backpropagation, the gradient received behind is multiplied by the derivative of the activation function.

### ReLU passes or blocks the gradient depending on the input sign.

ReLU sends out the input as is in positive sections, and makes the output 0 in negative sections. Since the slope of the positive section is 1 and the slope of the negative section is 0, backpropagation is also divided as follows.

![Chapter 10. Computational Graphs: Operations and Derivatives — Figure 21](/images/ai-study/0f62b2b87e3ab5324634.png)

![Chapter 10. Computational Graphs: Operations and Derivatives — Figure 22](/images/ai-study/197dabc8fd9f6c8b99c8.png)

If the input was positive, the slope is passed as is, and if the input was 0 or less, the slope is set to 0. Let's say you receive a slope of 3 from behind.

| forward propagation input | forward propagation output | backpropagation result |
| --- | --- | --- |
| 2 | 2 | 3 × 1 = 3 |
| −2 | 0 | 3 × 0 = 0 |

Exactly at x = 0, the function bends, so the general differentiation is undefined. The implementation must determine the value to use at this point, which is treated as 0 in this case.

Here you can also understand why ReLU reduces vanishing gradients. In the positive section, the derivative of the activation function is multiplied by 1, so this operation itself does not make the slope smaller. Conversely, in neurons that continuously receive negative input, the slope can be 0. It is connected to the problem that the learning signal is not transmitted through the corresponding path.

However, other operations such as weight matrices also affect the overall gradient. The mere fact that the positive interval derivative of ReLU is 1 does not mean that the gradient of the entire neural network is always maintained.

### tanh can calculate derivatives with output values

tanh is an S-shaped function that changes the input between −1 and 1. If the output is y, the derivative is 1 − y². In backpropagation, the gradient received behind is multiplied by this value.

![Chapter 10. Computational Graphs: Operations and Derivatives — Figure 23](/images/ai-study/b043ed2ff47961b3abe8.png)

When the output is −1 or close to 1, y² approaches 1. Therefore, 1 − y² approaches 0 and the transmitted slope also becomes smaller. The explanation that when both ends of the activation function become flat, the slope becomes weaker can be confirmed by the formula.

## 10. When you decompose Sigmoid, you can see the process of creating a differential formula.

Sigmoid is a function that changes the input between 0 and 1.

![Chapter 10. Computational Graphs: Operations and Derivatives — Figure 24](/images/ai-study/e86aa9a4f158a2b8fe50.png)

exp(u) means u squared of e. e is a mathematical constant equal to approximately 2.718. Rather than differentiating the entire equation at once, let's break it down into smaller operations.

| step | calculation | Operations performed |
| --- | --- | --- |
| 1 | a = −x | Multiply by −1. |
| 2 | b = exp(a) | Apply the exponential function. |
| 3 | c = 1 + b | Add 1. |
| 4 | y = 1/c | Find the reciprocal. |

The reciprocal is 1 divided by the corresponding value.

![Chapter 10. Computational Graphs: Operations and Derivatives — Figure 25](/images/ai-study/0b5b2300ba6404998fa9.png)

The / node on the far right computes the reciprocal. Connecting these small operations results in Sigmoid. Now, let's set the gradient passed behind as G = ∂L/∂y and pass backwards from the right.

### reciprocal node

Differentiating y = 1/c gives −1/c². However, since y = 1/c, it can also be written as −y². Therefore, the slope G received later is multiplied by −y².

![Chapter 10. Computational Graphs: Operations and Derivatives — Figure 26](/images/ai-study/d3ed1c111d99c3ab5452.png)

### addition node

At c = 1 + b, the derivative with respect to b is 1. Therefore, the received slope is transmitted as is.

![Chapter 10. Computational Graphs: Operations and Derivatives — Figure 27](/images/ai-study/e6726429fabe208032b1.png)

### Exponential Function Node

The exponential function has the same form even when differentiated. The derivative of b = exp(a) is exp(a). Currently a = −x, so:

![Chapter 10. Computational Graphs: Operations and Derivatives — Figure 28](/images/ai-study/9fb0b3c0a896f6b4bd20.png)

### Node that multiplies by −1

The derivative of a = −x is −1. If you multiply the slope received earlier by −1, two negative numbers are multiplied to become a positive number.

![Chapter 10. Computational Graphs: Operations and Derivatives — Figure 29](/images/ai-study/f0af5b3baeb4eedef3b0.png)

This is the result obtained by following the small operations backwards. Finally, let's organize this result to express it as Sigmoid's output value y.

### Organize to express as output value

If we organize 1 − y in the definition of sigmoid, we get the first line below. If y²exp(−x) is divided using this relationship, it becomes y(1 − y).

![Chapter 10. Computational Graphs: Operations and Derivatives — Figure 30](/images/ai-study/249a13c251083794bb81.png)

In the end, Sigmoid's backpropagation equation is summarized as follows.

![Chapter 10. Computational Graphs: Operations and Derivatives — Figure 31](/images/ai-study/4c9cf68c61468c2fe846.png)

![Chapter 10. Computational Graphs: Operations and Derivatives — Figure 32](/images/ai-study/fb46d3b1f9968e4d6552.png)

Multiply the slope received later by y(1 − y), which is the derivative of Sigmoid itself. **Sigmoid can calculate its derivative in backpropagation by storing only the forward propagation output y.** There is no need to recalculate all the intermediate values divided previously.

### Vanishing gradients can also be checked in this equation.

| output y | Differentiation y(1 − y) |
| --- | --- |
| 0.5 | 0.25 |
| 0.99 | 0.0099 |
| 0.01 | 0.0099 |

The maximum value of the derivative is 0.25. When the output approaches 0 or 1, the derivative becomes almost 0. In backpropagation, the derivative of each operation is multiplied every time it passes through a layer. If a small value is multiplied several times, the slope reaching the front can become very small.

This is why weight initialization or activation function selection is important. The section in which the value of forward propagation is placed affects the size of the slope of backpropagation.

## 11. Directly implement Sigmoid’s forward propagation and backpropagation

If we translate the equation obtained previously into code, it is as follows.

```py
import numpy as np


class Sigmoid:
    def __init__(self):
        self.out = None

    def forward(self, x):
        out = 1 / (1 + np.exp(-x))
        self.out = out
        return out

    def backward(self, dout):
        dx = dout * self.out * (1.0 - self.out)
        return dx
```

forward() calculates the Sigmoid output and stores it in self.out for use in backpropagation. backward() multiplies the gradient received later by y(1 − y) calculated with the saved output.

| code | meaning |
| --- | --- |
| dout | The slope passed behind is ∂L/∂y. |
| self.out | This is the output y calculated from forward propagation. |
| self.out \* (1.0 - self.out) | The derivative of sigmoid itself is y(1 − y). |
| dx | The slope to be transmitted forward is ∂L/∂x. |

Let's calculate the case where the input is 1 and the gradient passed behind is 1.

```py
sigmoid = Sigmoid()

x = np.array([1.0])

y = sigmoid.forward(x)
dx = sigmoid.backward(np.array([1.0]))

print(y)
print(dx)
```

The output is roughly as follows:

```txt
[0.73105858]
[0.19661193]
```

The first value is the output of Sigmoid, and the second value is the slope at input 1.

![Chapter 10. Computational Graphs: Operations and Derivatives — Figure 33](/images/ai-study/807652f550b07706e766.png)

If the slope delivered from the back was 2, the slope to be delivered to the front is also doubled. 2 × 0.19661193 ≈ 0.39322386. The difference between obtaining the derivative of the sigmoid alone and conveying the slope for the final loss is revealed here. In actual backpropagation, the gradient received from behind must always be multiplied together.

Additionally, the values that must be stored are different for each operation. Multiplication requires two inputs and Sigmoid requires an output. The framework also stores the information required for backpropagation of each operation during forward propagation.

## 12. PyTorch’s automatic differentiation performs the same calculation for you

In PyTorch, you do not need to implement Sigmoid's backward() directly.

```py
import torch

x = torch.tensor([1.0], requires_grad=True)
y = torch.sigmoid(x)

y.backward()

print(y)
print(x.grad)
```

requires\_grad=True is a setting to track related calculations to obtain the gradient for this tensor. In forward propagation, y is approximately 0.7310586. Then, calling y.backward() starts from y and calculates the derivative with respect to x.

Since the current output is one element, it starts at 1, which is the derivative of the output itself. Multiplying this by Sigmoid's derivative y(1 − y) gives approximately 0.1966119. Therefore, the following values are stored in x.grad.

```txt
tensor([0.1966])
```

This code is not an example of training weights. Check only **the function that automatically calculates the derivative of the Sigmoid output with respect to the input** without a loss function or optimizer.

In actual training, loss.backward() is called for the final loss. Then, the operations connected to the loss are followed and the gradient of the weight to be learned is calculated. The engine responsible for this task in PyTorch is torch.autograd. [PyTorch automatic differentiation documentation](https://docs.pytorch.org/tutorials/beginner/basics/autogradqs_tutorial.html)

### Automatic differentiation does not create a new differential formula.

By dividing Sigmoid into smaller operations, it can be explained by sign reversal, exponential function, addition, and reciprocal.

| operation name | meaning |
| --- | --- |
| neg | Change the sign. |
| exp | Calculate the exponential function. |
| add | Add values. |
| reciprocal | Calculate the reciprocal. |

Breaking it down into smaller operations like this makes it easier to understand the process by which the chain rule is applied. However, the framework does not necessarily decompose torch.sigmoid(x) into these four nodes and execute them. You can also apply backpropagation rules prepared in Sigmoid itself.

What is important is that a backpropagation method is implemented for each operation, and the framework executes it using the connection relationship of the actual calculation. [PyTorch Autograd Internal Workings Documentation](https://docs.pytorch.org/docs/2.15/notes/autograd.html) The word “automatic” means that a person does not have to write the derivatives of the entire model every time. Instead, the necessary calculations are performed using the differentiation rules and connection structures of operations.

## 13. Connecting the entire process in one small neural network

So far, we have looked at each operation separately. Now, let’s connect the weighted sum, activation function, and loss to actually find the slope of the weights. Consider a simple model that takes one input.

![Chapter 10. Computational Graphs: Operations and Derivatives — Figure 34](/images/ai-study/e0b38e9bfb7c816ef0c2.png)

z is the weighted sum and r is the predicted value that passed ReLU. q is the correct answer. The 1/2 in front of the loss serves to simplify the equation by eliminating the 2 from the square when differentiating.

Let us use input x = 3, weight w = 2, bias b = 1, and answer q = 5.

### Calculate prediction and loss with forward propagation

![Chapter 10. Computational Graphs: Operations and Derivatives — Figure 35](/images/ai-study/ca7989692dd540032e1f.png)

The weighted sum is 7 and is a positive number, so it passes ReLU as is. Comparing the predicted value of 7 with the correct answer of 5, the loss is 2. This is the process of calculating the value.

### Starting from the loss, calculate the slope backwards.

First, if we find the derivative of the loss with respect to the predicted value r, we get r − q = 2. Since the input z of ReLU is positive, the derivative is 1. Then, if we differentiate the weighted sum z = wx + b, we get x = 3 for w and 1 for b.

![Chapter 10. Computational Graphs: Operations and Derivatives — Figure 36](/images/ai-study/c4c2103183194ed12886.png)

The fact that the loss was 2 alone did not allow us to know which weights to fix and by how much. The update direction was determined by obtaining the weight slope of 6 and the bias slope of 2 through backpropagation.

If it is gradient descent with the learning rate set to 0.1, it is updated as follows.

![Chapter 10. Computational Graphs: Operations and Derivatives — Figure 37](/images/ai-study/2ee3372bc4a61941aa3b.png)

### Confirm the same calculation with automatic differentiation

```py
import torch

x = torch.tensor(3.0)

w = torch.tensor(2.0, requires_grad=True)
b = torch.tensor(1.0, requires_grad=True)

target = torch.tensor(5.0)

z = w * x + b
prediction = torch.relu(z)

loss = 0.5 * (prediction - target) ** 2

loss.backward()

print(loss.item())
print(w.grad.item())
print(b.grad.item())
```

Each output corresponds to a loss, a weight slope, and a bias slope.

```txt
2.0
6.0
2.0
```

The directly calculated loss and slope are displayed as is. What the computer followed in this code is a process that connects multiplication, addition, ReLU, and differentiation of squares using the chain rule.

As the neural network grows, more of these operations are connected, and vectors and matrices are handled instead of single numbers. Next, this rule can be expanded to each layer of the neural network to calculate the process by which the gradient of the final loss is transmitted to the weight of each layer.
