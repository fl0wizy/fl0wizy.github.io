## What is regression?

In Chapter 1, it was said that machine learning creates rules (functions) on its own when given data and the correct answer. At this time, the problem is divided into two depending on what the correct answer looks like. Classification in Chapter 2 involves choosing one of the given boxes, such as "Is it attack or normal?", and regression involves guessing **one number**, such as "What is the risk score?" Guessing life satisfaction by looking at GDP or guessing risk score by looking at traffic features are all regressions.

Both are supervised learning methods that learn from data with correct answers. The differences start with the shape of the answer and extend to what the model does and how to measure the extent to which it is wrong.

|  | Classification | regression |
| --- | --- | --- |
| shape of the answer | One of the designated spaces (Attack/Normal) | Consecutive numbers (risk score 73.2) |
| What the lines on the graph do | It is a **border** that separates two spaces. | The line itself is the **answer**. The height above the line is the predicted value. |
| How to measure the degree of error | Was it right or wrong? (precision, recall) | How Far Wrong (MSE) |

The interesting thing is that the classification model also produces a score (a number). In regression, the number is presented as the answer, and in classification, the number is cut once more as a baseline and a cell is selected. So, if you understand regression first, you can see how the classification models that follow work inside. Logistic regression later in this chapter is the link.

![Chapter 3. Regression: Predictions and Probabilities — Figure 1](/images/ai-study/48165b4fc0f67b37bcd4.png)

In this chapter, we will separate the lines produced by the model from the loss surface that measures whether those lines are good or bad. In the data graph, the horizontal axis is the input x and the vertical axis is the answer y. In the optimization graph, the horizontal axes are weight and bias, and the height is loss. Even if the same word “slope” is used, it refers to the slope of the prediction straight line, and in the latter case, it refers to the rate of change of loss when changing parameters.

## Five branches of regression

Regression starts from the simplest straight line. The remaining four branches are modified one by one whenever a situation arises where a straight line does not work.

| Fork | what was the problem | how did you solve it |
| --- | --- | --- |
| 1. Linear regression | (Starting point) We need the simplest function to predict numbers. | Add features by multiplying their weights (straight line) |
| 2. Polynomial regression | If the actual relationship is a curve, a straight line will not fit. | Draw a curve by creating features such as x² and x³ |
| 3. regularization | The more complicated the curve, the more noise it creates (overfitting). | Penalties are given when the weight increases (Ridge, Lasso) |
| 4. Logistic regression | We need “probability of attack”, not numbers | Put the score of the straight line into sigmoid and change it to 0\~1. |
| 5. Softmax regression | The answer is not one of two, but one of many. | Scores are given for each class and divided with a probability that the sum is 1. |

- **Flow:** Straight line → A curve is needed → The curve is too sharp → Probability is needed instead of numbers → You have to choose one of many, not two.
- **4, 5 are regression names only:** Use is classification. It got this name because the calculations made inside it (which produces numbers by weighting) are similar to linear regression.
- **The basis is all linear regression:** All five branches use the “weighted sum → cost → gradient descent” structure. All that changes is the model shape or part of the cost function. So, let’s take a closer look at linear regression.

## 1. Linear regression

The simplest way to solve regression is to connect a straight line between the input and the answer. Linear regression multiplies each characteristic by its weight and uses the added value (weighted sum) as the predicted value. If you write it like this:

```txt
ŷ = θ₀ + θ₁x₁ + θ₂x₂ + … + θₙxₙ (If written as a vector, ŷ = θᵀx)
```

- **ŷ :** This is the predicted value.
- **θ₀ (bias):** This is the default value when all inputs are 0.
- **θ₁\~θₙ (Weight) :** This is how much each feature boosts the prediction.
- **x₀ = 1 :** If you add 1 at the beginning of the input, θ₀ is calculated as “weight × input” just like other weights. So θᵀx can be written in one line.

“Satisfaction = θ₀ + θ₁ × GDP” seen in Chapter 1 is linear regression with one feature. One feature makes it a straight line, two features make it a plane, and more than that makes it a hyperplane, but the fact that it is a weighted sum is the same.

Linear regression is the simplest model, so it is almost always used as an example when explaining “how machines learn.” The cost function and gradient descent that appear here are not exclusive to linear regression, but extend to the last four branches and neural networks. So if you get this part right, the rest will be much easier.

### Key Terms: Samples, Features, Targets, and θ

Let’s say we have data for 5 countries.

| country | GDP (characteristic) | Satisfaction (Correct Answer) |
| --- | --- | --- |
| A | 1 | 5.0 |
| B | 2 | 5.5 |
| C | 3 | 6.0 |
| D | 4 | 6.8 |
| E | 5 | 7.0 |

- **Sample:** This is one line of a table. One data, in this case one country. There are 5 samples in this table (m = 5).
- **Features:** This is an input item that describes the sample. It is a column in the table. Here, there is only one GDP. Adding the "Working Hours" column creates two features.
- **Correct answer (label):** This is the value you want to guess. Here it is satisfaction.
- **θ (theta, parameter):** This is a number that the model determines on its own after looking at the data. In “Satisfaction = θ₀ + θ₁ × GDP”
  - θ₀ is the basic score. If you change it, the straight line moves up and down.
  - θ₁ is “How much does satisfaction increase when GDP increases by 1?” If you change it, the slope of the straight line changes.

In other words, if you change θ, the straight line changes. So **learning = finding θ that best fits the data**.

- **Relationship between the number of features and the number of θ:** If there are n features, θ is n + 1 (one weight for each feature + basic score θ₀). Whether there are 5 samples or 50 thousand, the number θ remains the same.

### Cost function - “How wrong you are” in one number

To choose the best fit θ, you must first be able to measure “good fit” in numbers.

Here, the cost function is **a single number that represents how incorrectly the straight line drawn with θ predicts the training data**. The larger the number, the more wrong it is. In other words, the goal of learning is to reduce the cost function.

Linear regression uses MSE (Mean Square Error) as the cost function.

```txt
MSE(θ) = (1/m) × Σ (Prediction⁽ⁱ⁾ − Answer⁽ⁱ⁾)² m = Number of samples
```

- **Calculation:** For each sample, compute (prediction − target), square the difference, and average the results.
- **Reason for squaring:** It prevents negative and positive errors from canceling out each other. Greater penalties are given for major errors.
- **Reason for measuring from training data:** When learning, the only correct answer at hand is training data. Verification and test sets are used to separately check whether it works on new data.

The cost depends on θ. If we fix θ₀ = 4.47 for the five countries above and only change θ₁,

| θ₁ | MSE |
| --- | --- |
| 0.3 | 0.59 |
| 0.53 | 0.013 |
| 0.8 | 0.81 |
| 1.0 | 2.44 |

It is smallest at 0.53 and gets larger as you go further away. If you draw it on a graph, it looks like a bowl. **Learning = finding the bottom of this bowl**.

### How to Find the Bottom 1 - Normal Equation

Before reading the formula, establish the matrix shapes. With m samples and n input features, append a column of 1s for the bias. X then has m rows and n+1 columns, θ is a vector with n+1 rows, and y is a vector with m target values. Xθ contains the m predictions computed for all samples at once. The superscript T denotes the transpose, which interchanges rows and columns.

The equation using the inverse matrix of (XᵀX) holds true when this matrix is invertible. If there are duplicate features, there may be no inverse matrix. Since actual least squares implementations can use pseudoinverse matrices or numerically stable decomposition, a distinction is made between “use normal equations” and “the inverse matrix must be calculated directly.”

: This is a method to calculate the bottom of a bowl directly with one formula.

```txt
θ̂ = (XᵀX)⁻¹ Xᵀ y
```

- **Result:** When inputting the GDP data, θ₀ = 4.47, θ₁ = 0.53 come out exactly without repetition.
- **Problem 1:** If the number of features is large, the inverse matrix calculation becomes very slow.
- **Problem 2:** Data must be loaded into memory all at once.
- **Problem 3:** This formula only exists in special cases such as “linear regression + MSE”. It cannot be used on other models.

→ So we need a way to find the bottom without a formula. That's gradient descent.

### How to find the bottom 2 - gradient descent

Gradient descent is a representative method to find θ where the cost function becomes smallest. It can be used for models without formulas, so not only linear regression but also logistic regression and neural networks are learned using this method.

**Think of it like a mountain**

I got lost in the mountains covered in thick fog. You can't see the entire mountain, you can only feel which way the ground under your feet slopes. If you want to go down to the lowest point, do this.

1. Feel which way your feet are going down.
2. Take one step towards that.
3. I feel my feet again and take another step.
4. Stop when your feet are level (there is no room to go further). That's the floor.

This is exactly what gradient descent does. Guess what each part of the mountain actually is

| mountain metaphor | actually |
| --- | --- |
| where i stand | θ now |
| height of the location | The cost at θ (MSE) |
| slope underfoot (slope, gradient) | When θ is moved slightly, which way and how much does the cost change? |
| one step | Move θ in the opposite direction of the slope |
| stride length | Learning rate η (eta) |
| floor | θ with the smallest cost = answer to learning |

The important point here is that **the only thing that moves on the mountain is θ**. Samples (data) do not move. A sample is a material used to calculate “what is the height (cost) of the current location.”

**Why and in which direction does θ move**

What you are trying to reduce is **cost**. Since θ only moves toward decreasing costs, it can either increase or decrease.

- **When θ₁ = 0.3 :** The straight line is too gentle. So the predictions are overall smaller than the correct answers. If you increase θ₁, the prediction goes up toward the correct answer, reducing the cost. →**Increase** θ₁.
- **When θ₁ = 0.8 :** The straight line is too steep. So the predictions are overall larger than the correct answers. Here, if θ₁ is increased further, the prediction becomes farther from the correct answer, increasing the cost. →**Reduce** θ₁.
- **When θ₁ = 0.53:** The cost increases no matter which direction you move. The feet are flat. →**Stop**. It's the floor.

If you write this as an expression, it is one line.

```txt
θ ← θ − η × slope η(eta) = learning rate, step size
```

- **Meaning of slope:** “If you slightly increase θ, how much does the cost increase?”
- **Why leave it out:** If the slope is positive, it means that the cost increases as θ is increased. So, conversely, θ must be reduced. Conversely, if the slope is negative, θ must be increased. “Subtract slope” handles both cases at once.
- **Size of Slope:** How far is it from the floor. The farther away you are, the steeper the slope is, and the closer you get to the bottom, the closer it gets to 0. So, even if you keep your stride length fixed, your steps automatically become shorter near the floor.

**Gradient - the formal name for slope underfoot**

The “slope underfoot” in the mountain metaphor is officially called **gradient**. The value obtained by differentiating the cost function by θ, that is, “how much and in what direction does the cost change when θ is moved very slightly”. Gradient descent continues in the opposite direction of the gradient, and stops when the gradient becomes 0, assuming that the minimum value has been reached.

However, θ is not one, but θ₀, θ₁, … There are several. So **differentiate while moving only θ and keeping the rest fixed**. This is **derivative**, and the actual calculation is as follows.

```txt
Slope of θⱼ = (2/m) × Σ (Prediction⁽ⁱ⁾ − Answer⁽ⁱ⁾) × xⱼ⁽ⁱ⁾
```

1. Now predict for each sample with θ and find the error (prediction − correct answer).
2. For each parameter, “2 × error × input multiplied by that parameter” is calculated for each sample and averaged. The input multiplied by θ₀ is 1.
3. Move all parameters **simultaneously** in the opposite direction of their respective gradients.

Example: When θ₀ = 4.47, θ₁ = 0.3

| GDP x | Correct answer | prediction | error | For θ₁ (2 × error × x) | For θ₀ (2 × error × 1) |
| --- | --- | --- | --- | --- | --- |
| 1 | 5.0 | 4.77 | −0.23 | −0.46 | −0.46 |
| 2 | 5.5 | 5.07 | −0.43 | −1.72 | −0.86 |
| 3 | 6.0 | 5.37 | −0.63 | −3.78 | −1.26 |
| 4 | 6.8 | 5.67 | −1.13 | −9.04 | −2.26 |
| 5 | 7.0 | 5.97 | −1.03 | −10.30 | −2.06 |
| **Average = Slope** |  |  |  | **−5.06** | **−1.38** |

Since both are negative, increase both θ₀ and θ₁. The steeper the slope of θ₁, the more θ₁ moves.

\[−1.38, −5.06\], which gathers one derivative for each θ, is the **gradient vector**. Gradient descent takes one step in the opposite direction of this vector.

**Learning rate - how long will it take**

If you know the direction, just take one step. This one step is called a **learning step**, and the number that determines the size of the step is **learning rate η (eta)**. You can see why the learning rate is important by directly inserting it into the example above (now MSE 0.59).

| learning rate η | θ₀, θ₁ one step behind | One step later MSE | result |
| --- | --- | --- | --- |
| 0.01 | 4.48, 0.35 | 0.35 | Costs have decreased. Went slightly towards the bottom (θ₁ = 0.53) |
| 0.1 | 4.61, 0.81 | 1.10 | I skipped across the floor to the other side. The cost has actually increased |

If the learning rate is too small, too many steps are needed to reach the bottom, so it takes a long time. If it gets too big, it skips the floor like this, and if it continues to get bigger, it bounces higher and higher and spreads out.

**hyperparameter - who decides the learning rate**

There is something to distinguish here.

- **Parameter (θ):** This is a value determined by learning by looking at data. It keeps changing while you learn.
- **hyperparameter:** This is a value that a person determines before learning. It does not change during learning. The learning rate is a representative example, and the degree of polynomial regression, regularization strength, minibatch size, and number of epochs are also hyperparameters.

The learning rate is not determined by learning, so a person must find an appropriate value. The method used in this case is **grid search**. Train with several candidates (e.g. 0.02, 0.1, 0.5) and select the value with the best verification performance.

**Two problems with gradient descent - when there is not one floor**

So far, we have assumed that the cost function looks like a single bowl. However, if the cost function is uneven, two problems arise.

1. **Local Minimum:** The lowest point in the entire cost function is the **global minimum**. However, depending on your starting location, you may find yourself in a smaller pool, a local minimum. Since the gradient is 0 even at the bottom of the puddle, the algorithm mistakenly thinks it has reached the bottom and stops.
2. **Flat areas:** When the ground is almost flat, the gradient is close to 0, so steps are very small. It takes a long time to pass, and if it's too slow, it thinks it's finished and stops early, preventing it from reaching the global minimum.

Fortunately, the MSE of linear regression is a **convex function**. Since there is only one bowl, there is no local minimum, and if the learning rate and convergence conditions are set appropriately, it can converge toward the global minimum loss. However, whether the parameter that creates the minimum loss is unique depends on additional conditions such as the independence of X. Where these two problems become truly troublesome is in neural networks where the cost function is bumpy.

There are three places where gradient descent can be confusing when you first look at it. At first, I thought, “If the slope is positive, it’s uphill, so why reduce θ?” However, a positive slope means that “increasing θ increases the cost.” The prediction is already larger than the correct answer, but if you increase θ further, the distance goes further, so decreasing it will reduce the cost. Also, it is easy to think of various locations on the mountain as multiple samples, where the location is θ and the sample is just a material for calculating the height (cost) of that location. Finally, when calculating the slope, the average is averaged **over samples** rather than over parameters. There is one slope for each parameter, and each one is the average of the samples.

### Feature Scaling - Choosing the Shape of a Mountain

![Chapter 3. Regression: Predictions and Probabilities — Figure 2](/images/ai-study/bae7b2205f99ac70e0a9.png)

Concentric circles and ellipses are not input data but **parameter positions with the same loss value**. If the characteristic scale difference is large, the same loss surface may become elongated, making it difficult to move straight toward the minimum. Scaling does not change the target answer, but rather adjusts the coordinate size of the inputs and parameters that learning deals with.

If there are two or more features, θ is also more than two, so the mountain becomes a valley that spreads out in various directions.

- **Problem:** If the size range of the features is different (e.g. annual salary in tens of millions vs. age in tens of tens), the valley becomes elongated to one side. The cost of θ on the large feature side changes significantly even if it is moved just a little, and the cost of θ on the small feature side needs to be moved a lot to change. Since I can't balance both directions with one stride, I zigzag back and forth along the narrow valley wall.
- **Solution:** Set the range of features before learning. The valley becomes a round bowl and goes straight to the bottom.
  - MinMaxScaler (normalization): Calculates as (x − min) / (max − min). Reduce it to the range 0\~1.
  - StandardScaler (standardization): Calculate as (x − mean) / standard deviation. The mean is 0, the standard deviation is 1, and there is no range limit.

There is a common misunderstanding here. The reason it works is because "gradient descent processes features one by one in order," and since batch averages the entire sample, I think there will be no problem. However, all parameters move at the same time at each step, and the reason for their rotation is not the processing order, but the **bowl shape**. Batch averaging only eliminates sample fluctuations and does not make an elongated bowl round, so scaling is equally necessary for batch, mini-batch, and SGD.

### Batch, SGD, Mini-Batch - How many samples do you have under your feet?

The cost (height of the mountain) is the average of the errors across all samples. So, each sample has its own small mountain, and the real mountain can be seen as the average of those small mountains.

To accurately measure the inclination of your feet, you need to look at all samples. However, if there are 1 million samples, 1 million must be calculated for each step. So, the thought arises, “Can’t we just look at a few samples, roughly measure them, and move on quickly?”

The three methods differ only in how many samples are used when measuring the slope at the same location (currently θ).

```txt
Number of samples used in one step: 1 ──────── tens to hundreds ──────── total (m)
                         SGD Minibatch Deployment
```

1. **Batch gradient descent:** Measures the true gradient across the entire sample. This is how Σ in the derivative equation above is calculated for all samples. The slope is precise so it goes down smoothly. And **it is not sensitive to the number of features.** As the number of features increases, the calculation increases only proportionally, so when there are hundreds of thousands of features, it is much faster than regular equations.\
→ Problem: It is slow when the data is large because you have to look at the entire thing at each step.
2. **Stochastic gradient descent (SGD):** Estimates the gradient from a single randomly selected sample. One step is very fast, and learning is possible even when data comes in one by one.\
→ Problem: The slope is inaccurate and fluctuates. Looking at just the first sample in the example above, the slope of θ₁ is −0.46, which is significantly different from the true slope of −5.06.\
→ Solution 1 - Learning schedule: Make the learning rate large at first and then gradually smaller. It goes down quickly at first and shakes less at the end.\
→ Note: Fluctuations can also help pop out of the pool of local minima.
3. **Mini-batch gradient descent:** Solution 2 - Estimate the gradient in dozens\~hundreds of batches. It is almost accurate, fast, and well suited to GPU matrix operations. This is the default value in practice.

**Which one do you choose**

| situation | Choosing |
| --- | --- |
| The data is small so it fits all in memory. | Batch (normal equations are also possible for linear regression) |
| The data is big and there is a GPU. | mini batch |
| Data continues to come in one by one. | SGD (online learning, partial\_fit) |

Let’s also organize some terms. Just saying "gradient descent" usually refers to batch gradient descent. Rather than the layout being the basic type and the SGD and mini-batches being variations of it, the three can be viewed as the three positions of one handle, “How many samples do you use per step?” And what the handle determines is not the number of features (columns) but the number of samples (rows).

**Scikitlearn code**

```py
from sklearn.linear_model import LinearRegression, SGDRegressor

lin = LinearRegression()            # Solve it all at once without repetition
lin.fit(X, y)
lin.intercept_, lin.coef_           # θ₀, θ₁ (4.47, 0.53 for GDP data)

sgd = SGDRegressor(max_iter=1000, tol=1e-3, penalty=None, eta0=0.1)
sgd.fit(X, y.ravel())               # Solve using gradient descent (SGD)
```

- max\_iter: Maximum number of epochs to run. **Epoch** is a unit that goes through the entire training data once.
- tol: Stop if the cost does not decrease by this much during one cycle.
- penalty=None: Does not apply regularization.
- eta0: This is the initial learning rate.

![Chapter 3. Regression: Predictions and Probabilities — Figure 3](/images/ai-study/e8291bf9ef7a8ff74e63.png)

Batch gradient descent, which uses the entire data, computes the gradient of the same overall objective function every time. SGD and mini-batch estimate based on partial data, so the paths are shaky. In the picture, the movement around the minimum value should not be read simply as “learning failed.” If the learning rate is not reduced, it may continue to fluctuate due to the randomness of the sample.

### Linear regression at a glance

If you put it in one line, it looks like this. I want to find a good θ → Create a cost function to measure “good” → Find the θ with the smallest cost → The formula (normal equation) is slow and the space to use is narrow → Go down the mountain little by little (gradient descent) → If the valley is long, scale it because it goes around → If you look at the entire sample at each step, it is slow, so you only look at a part (SGD, mini-batch).

```txt
regression (problem of guessing the number)
 └ Linear regression (Model: ŷ = θᵀx)
    └ Cost: MSE
       └ Find θ with the smallest cost
          ├ Normal equations: Formulas at once
          └ gradient descent: little by little along the slope
             ├ Batch (full sample)
             ├ Mini-batch (sample bundle)
             └ SGD (1 sample)
```

- **regression/classification:** This is the type of problem.
- **gradient descent:** is a tool for training models. Since it is not dedicated to linear regression, logistic regression and neural networks are also learned using the same tool.
- **Next:** What about curve relationships that straight lines cannot fit → 2. Polynomial regression.

## 2. Polynomial regression

Linear regression is simple and easy to calculate, but it has the limitation that it can only draw straight lines. If the relationship in the actual data is a curve, a straight line will not fit no matter how well you choose θ. Multinomial regression was developed to solve this underfitting problem.

### Idea - model remains the same, changes features

The idea of multinomial regression is simple. Rather than creating a new model, existing features are raised to the power and added as new features. This creates an additional x² column next to x.

| x | x² (new trait created) | correct answer y |
| --- | --- | --- |
| 1 | 1 | … |
| 2 | 4 | … |
| 3 | 9 | … |

In this way, the model becomes ŷ = θ₀ + θ₁x + θ₂x². From the model's perspective, x² is just "one more feature", so it is still a weighted sum, and MSE and gradient descent learned earlier are used as is. However, if you plot the result on an x-y graph, it becomes a curve thanks to x². In other words, it is **a method of obtaining a curve while using linear regression**.

In fact, if you train the data made with y = 0.5x² + 1.0x + 2.0 + noise using polynomial regression, you get ŷ = 0.56x² + 0.93x + 1.78. It is almost the same as the original formula, the only difference is due to noise.

```py
poly = PolynomialFeatures(degree=2, include_bias=False)
X_poly = poly.fit_transform(X)        # x → [x, x²]
LinearRegression().fit(X_poly, y)     # Then, as with linear regression
```

![Chapter 3. Regression: Predictions and Probabilities — Figure 4](/images/ai-study/11329d0906109a4fad5d.png)

The curve in the figure was obtained by creating a new feature by squaring the input. Although it is originally a curve for x, it is still a linear combination for θ₀, θ₁, and θ₂. “Drawing a curve using linear regression” is not a contradiction if you distinguish between these two perspectives.

### Master 1 - Attribute explodes

The problem is when there are too many features. If there is one characteristic, it increases only by the degree, but if there are multiple features, powers such as a² and b² and combination terms such as ab and a²b are created.

| Original feature count | degree | Number of features after conversion |
| --- | --- | --- |
| 1 | 3 | 3 |
| 2 | 3 | 9 (a, b, a², ab, b², a³, a²b, ab², b³) |
| 10 | 3 | 285 |
| 100 | 3 | 176,850 |

As the features increase, the calculations also become heavier. Gradient descent increases proportionally to the number of features at each step, and the normal equations grow approximately to the cube of the number of features, quickly becoming unusable. Moreover, if x is 100, x² is 10 thousand and x³ is 1 million, so the size difference between features increases. So scaling is also a must.

So multinomial regression is actually mainly used in **a narrow range** where there are only a few original features and the degree is about 2\~3. It is not suitable for security data such as network traffic with tens to hundreds of features.

Ways to solve the same problem of “wanting to fit a curved relationship” more cheaply appear later.

- **Kernel Trick (Chapter 6 SVM):** Without actually creating the feature, only the results that would have been generated if the feature had been created are immediately calculated.
- **decision tree, ensemble (5, Chapter 7) :** Without combining features, “Is GDP > 3?” By linking the same questions together, a curved boundary is created.
- **Neural Network (Chapter 8\~):** Rather than having a person list the necessary combination features, it learns them from the data.

### Master 2 - It becomes a problem because it matches too well

There is also a more direct problem than attribute explosion. As you increase the order, θ increases, and the more θ there is, the more freely the curve curves, even following the noise in the training data. While trying to solve underfitting, overfitting was created.

- **1st:** Cannot follow the curve (underfitting).
- **Second:** Follows the actual shape and fits the new data well.
- **300th round:** Almost all of the training points are passed, but there is significant fluctuation (overfitting) between the points and at both ends.

If you fit the fourth curve to the data for five countries, you can see it right away. At GDP 7, the straight line predicts 8.18, while the fourth curve predicts −4.0. Satisfaction became negative.

However, if there are many features, it is not possible to check them by drawing a graph like this. So, we need a tool to determine numerically whether it is underfitting or overfitting, and that is the learning curve.

![Chapter 3. Regression: Predictions and Probabilities — Figure 5](/images/ai-study/0aa3d7d04ba61e8321c3.png)

Straight lines miss a lot of flow, and overly high degrees fluctuate greatly between training points. Even though a degree of 2 seems appropriate for this data, it does not mean that all problems will have a degree of 2 as the answer. Order selection is determined by verification performance.

### Learning curve - diagnosing underfitting and overfitting with numbers

A learning curve is a graph that learns by gradually increasing the number of training data and records two errors each time.

- **Training error:** This is the error measured from the data used for learning. When there are 1\~2 samples, the curve passes all of those points and is almost 0. As the number of samples increases, it becomes more difficult to fit them all.
- **Verification error:** This is the error measured from data that was not used for learning. The more data you look at, the better the generalization becomes.

You can tell the status by looking at the shape of the two lines.

| shape | diagnosis | prescription |
| --- | --- | --- |
| Both lines soon meet at a high point and become flat. | underfitting | Adding more data is useless. More complex models or better features are needed |
| The training error is low, but the gap with the validation error is large. | overfitting | As more data is added, the gap decreases. Or simplify or regularize the model |
| The two lines meet at a low point. | suitable | — |

![Chapter 3. Regression: Predictions and Probabilities — Figure 6](/images/ai-study/d0efa131b8b4823d953d.png)

The horizontal axis in the two figures above is not the number of learning, but **the number of samples used for training**. If both are high and close, suspect which model does not sufficiently represent the relationship. If the training error is low and the validation error is high, suspect that performance is not maintained in new samples. You should not only look at the extent of the curve, but also read the absolute size of the error.

### Bias/variance tradeoff - why you can't have both

There is a principle behind the phenomenon shown by the learning curve. The error in new data (generalization error) is a combination of three things.

| error | meaning | cause | result |
| --- | --- | --- | --- |
| bias | The assumption itself was wrong. | In reality, it is quadratic, but it is assumed to be a straight line. | underfitting |
| dispersion | Even if the training data changes slightly, the model changes significantly. | The model is too free and therefore sensitive to noise. | overfitting |
| Error that cannot be reduced | It's noise in the data itself. | Faulty sensor, outlier | We can't reduce it with a model, we have to fix the data. |

If you change one point on the previous fourth curve from 6.8 to 6.5, the forecast at GDP 6 changes from 4.5 to 7.5. This is what large variance means.

If you increase the order, the bias decreases but the variance increases, and if you lower the order, the opposite happens. You can't reduce both at the same time, so you have to find the right point.

### So next - regularization

In summary, instead of obtaining a curve, polynomial regression left the problem that there were too many θ and that the θ grew significantly to fit the noise. You can lower the order, but the order can only be adjusted by cutting it to 1, 2, or 3.

So, we came up with a way to keep the order as is and prevent it from growing by adding penalty points to the cost function when the weight increases. This is the third branch, regularization.

## 3. regularization

Instead of obtaining a curve, multinomial regression left the problem of overfitting. As you increase the order, θ increases, and those θs try to match the noise in the training data. The simplest way to prevent this is to lower the order, but the order can only be adjusted by cutting it off like 1, 2, or 3, so it cannot be used in cases such as "the 2nd order is not enough and the 3rd order is too much." So **a method was developed that leaves the model shape as is and places restrictions on learning to prevent θ from growing arbitrarily**. This is regularization.

### Why is a large weight a problem?

If you fit a 4th curve to the data of 5 countries (features are standardized) and look at the weights, it looks like this.

```txt
θ₁ = 5.02,  θ₂ = −17.73,  θ₃ = 25.07,  θ₄ = −11.65
```

GDP and satisfaction have an almost linear relationship, but the weights are large and the signs change alternately. It was set so that the large positive term and the large negative term cancel each other out and pass exactly 5 training points. This offset only works over the training points. Even if the data range is slightly outside the range, the balance is broken and one term wins, resulting in a value such as −4.0 in GDP of 7.

In other words, **large weight = function is sensitive**. Even if the input changes slightly, the output fluctuates significantly. This is the “large variance” we saw earlier.

### Idea - add a penalty to the cost function

The learning so far has been “Find θ that minimizes MSE.” Regularization adds one term here.

```txt
Cost with regularization = MSE + α × (penalty on weight size)
```

Now learning must satisfy two things at the same time. It must fit the data well (small MSE) and the weight must be small (small penalty). Then, it becomes a “loss” to increase the weight to adjust for one more noise, and the model chooses a less sensitive function.

**α (alpha)** is a hyperparameter that determines how strongly the penalty points will be given. If we apply ridge regularization to the same 4th order model and only change α,

| α | Weighted absolute value sum | Training MSE | GDP 6 forecast | GDP 7 forecast | status |
| --- | --- | --- | --- | --- | --- |
| 0 (no regularization) | 59.47 | 0.000 | 4.50 | −4.00 | overfitting |
| 0.1 | 1.21 | 0.009 | 7.33 | 7.27 | suitable |
| 1000 | 0.01 | 0.555 | 6.11 | 6.14 | underfitting (almost flat lines) |

- **α = 0 :** It’s just polynomial regression. The training error is 0, but it's crappy on new data.
- **Adequate α:** Training error increased slightly from 0 to 0.009. Instead, common sense values come from GDP 6 or 7. It fits the training data a little less and fits the new data better.
- **α is too large:** All weights are pushed to 0, resulting in a horizontal line passing through the data mean (6.06). This time it's underfitting.

The size of the α value itself varies depending on the penalty point calculation method, so look at the flow rather than the numbers. The method for choosing α is the same as the learning rate. Learn from several candidates and choose based on verification performance.

So when do penalty points come into play? Rather than being cut separately after the model makes a prediction, it is included from the beginning within the cost function that learning minimizes. So, when gradient descent calculates the gradient, the gradient of the penalty point is also calculated, and the force that pulls the weight toward 0 is added at each step. Differentiating the penalty point θ² of the ridge is 2θ, so at each step, the “direction desired by MSE” is added to the “force pulling toward 0 in proportion to the current weight.” Since the weight decreases by a certain percentage with each step, this is called **weight decay** in neural networks. Once learning is completed, the penalty disappears, prediction only calculates θᵀx using the learned θ, and performance is measured by the original MSE. In other words, the penalty point is just a device that changes “which θ you will arrive at.”

### How to assign penalty points - Ridge, Lasso, ElasticNet

Depending on how the “weight size” is measured, it is divided into three types.

**Ridge regression (L2) - penalty = sum of squared weights**

```txt
Cost = MSE + α × (θ₁² + θ₂² + … + θₙ²)
```

It pulls all weights evenly toward 0, but **does not make them completely 0.** The square penalty is because the smaller the weight, the weaker the pulling force (the square of 0.1 is 0.01, so it almost never pulls near 0). So all features remain in the model with small weights.

**Lasso regression (L1) - penalty = sum of absolute values of weights**

```txt
Cost = MSE + α × (|θ₁| + |θ₂| + … + |θₙ|)
```

The absolute value penalty is pushed toward 0 with **the same force** regardless of whether the weight is large or small. Therefore, the weight of a feature that is not very helpful is pushed down to 0, and if the weight is 0, that feature is the same as being omitted from the model. In other words, Lasso has the effect of automatically selecting important features (characteristic selection).

**ElasticNet - mix the two**

```txt
Cost = MSE + r × (Lasso penalty) + (1 − r) × (Ridge penalty)
```

If the mixing ratio r is 0, it is ridge, and if it is 1, it is lasso. It was created to alleviate Lasso's weaknesses with Ridge.

The weakness of Lasso mentioned here is revealed when there are many similarities between features. However, this does not mean that Lasso cannot be used, and prediction performance can be good. The problem is that **what features are left behind is unstable**. For example, the number of packets and the number of bytes move almost together, but Lasso can make predictions with only one of the two, so it leaves one and sets the rest to 0. Which one is left is almost a coincidence, so even if the data changes slightly, the number of packets left this week and the number of bytes left next week. This is okay if you just need to make good predictions, but it is difficult if you need to interpret “which features are important” or if you need stability where the model uses the same features every time. Lasso is unstable even when the number of features is greater than the number of samples. ElasticNet is used for this purpose. By making the ridge component distribute weight to similar features, similar features are left in a group or discarded as a group.

**Which one do you choose**

| situation | Choosing |
| --- | --- |
| Most of the features seem to be useful | ridge |
| There are many features, but only some of them are likely to be important (high-dimensional data) | lasso |
| I want to use Lasso, but there are many similar features or the number of features is greater than the number of samples. | ElasticNet |

In general, models with regularization perform better than models without regularization. Therefore, I tend to use at least weak ridges as a basis rather than pure linear regression.

### Things to keep in mind when using regularization

- **θ₀ (bias) does not regularize :** θ₀ only moves the straight line up or down and does not make the function sensitive. If θ₀ is pulled toward 0, the entire prediction is tilted toward 0.
- **Penalty points are only used when training:** Penalty points are a device that sets the direction of learning. When learning is completed and performance is measured, it is originally measured by MSE.
- **Scaling is essential:** Penalty points compare all weights on the same basis. If the feature sizes are different, a small weight is sufficient for a large feature and a large weight is needed for a small feature, so only the feature with a small penalty point is pressed.

![Chapter 3. Regression: Predictions and Probabilities — Figure 7](/images/ai-study/605b525cedc6794e21ae.png)

If you change the strength of Lasso, some coefficients become 0, and this can also determine which features to use.

![Chapter 3. Regression: Predictions and Probabilities — Figure 8](/images/ai-study/3bb5befee2dff71981c2.png)

The ridge suppresses excessive bending by reducing the overall weight. The left side of the figure is an example of the original linear feature, and the right side is an example of the expanded polynomial feature. Even with the same regularization, if the input expression changes, the visible curve changes.

### Another regularization - early termination

![Chapter 3. Regression: Predictions and Probabilities — Figure 9](/images/ai-study/0ba7abcca4aecdd6c992.png)

Here, the horizontal axis is the epoch, that is, the number of times the entire training data was processed. This is different from the picture of increasing the number of samples like the previous learning curve. Save the weight with the lowest verification loss, wait to avoid stopping due to brief fluctuations, and then restore the best state.

There is a way to regularize without adding penalties. While learning with gradient descent, we continuously monitor the validation error.

1. Initially, the training error and validation error go down together.
2. At some point, the training error continues to go down, but the validation error stops and then goes up again. The model began to memorize the noise in the training data.
3. So **learning stops at the point where the verification error is lowest.**

Since the weights are stopped before they grow significantly, the effect is similar to penalty regularization. Because it is simple to implement, it is widely used in neural networks.

### So next - logistic regression

This is the story of “getting the numbers right” regression. Starting from a straight line, polynomial regression came out because curves were needed, and regularization came out because the curves ran wild.

However, what is really often asked in security is **“What is the probability that this is an attack?”** rather than “What is the risk score?” The output of linear regression can range from −∞ to +∞, so it cannot be a probability as is. So, the fourth branch, logistic regression, is a device that changes the linear score between 0\~1.

## 4. Logistic regression

All regressions up to this point have guessed “number one.” However, what is really often asked in security is **“What is the probability that this is an attack?”** rather than “What is the risk score?” The output θᵀx of linear regression can be any value from −∞ to +∞, so it cannot be a probability as is. This is because the probability must be between 0 and 1. So, logistic regression is a function that adds a linear score between 0\ and 1.

### Idea - put linear score into sigmoid

Logistic regression is calculated in two steps.

```txt
Step 1 (same as linear regression): t = θᵀx = θ₀ + θ₁x₁ + … + θₙxₙ
Step 2 (Convert to probability): p̂ = σ(t) = 1 / (1 + e⁻ᵗ)
```

Step 1 is a weighted sum that is exactly the same as linear regression, the only difference is step 2. σ is a **sigmoid function** (logistic function), and it returns between 0 and 1 no matter what value you enter.

| t (linear score) | −4 | −2 | 0 | 2 | 4 |
| --- | --- | --- | --- | --- | --- |
| σ(t) (probability) | 0.018 | 0.12 | 0.5 | 0.88 | 0.982 |

- **t is significantly positive:** the probability approaches 1. “We leaned heavily toward attack.”
- **t is 0 :** probability is exactly 0.5. “I don’t know which one.”
- **t is significantly negative:** the probability approaches 0.

So the linear score t becomes a score that indicates “how much it leans toward positive.” To be exact, t is the logarithm of **log odds** log(p / (1 − p)), that is, “how many times the probability of being positive is the probability of being negative.” What the model does is regression, which guesses this log odds number as a weighted sum, and converts that number into a probability and uses it for classification. This is why it has “regression” in the name.

### Prediction - 0.5 is the baseline

Once you have the probability, classification is simple. If p̂ ≥ 0.5, predict positive (1, e.g. attack), and if p̂ \< 0.5, predict negative (0, e.g. normal). However, since sigmoid is exactly 0.5 or more when t ≥ 0, even without calculating the probability, **θᵀx can be judged positive if it is a positive number, and negative** if it is negative.

Scikit-Learn’s LogisticRegression also provides two separate methods.

- predict(): Returns the class label (0 or 1). Internally, it only checks if θᵀx > 0.
- predict\_proba(): Returns the probability through sigmoid.

Here the decision threshold from Chapter 2 comes up again. 0.5 is just the default. If there is a situation where it is impossible to miss a single attack, lower the baseline to 0.3 to increase recall, and if there are too many false positives and analysts are tired, increase precision by raising it to 0.7. The probability of predict\_proba() or the decision score of decision\_function() can be adjusted by applying a separate threshold.

### Learning - cost function is log loss, not MSE

The goal of learning is to find θ that gives a high probability for positive samples and a low probability for negative samples. **Log loss** (logistic loss) is used instead of MSE as a cost function to measure this. The cost for one sample is as follows:

```txt
When the correct answer is 1 (positive): Cost = −log(p̂)
When the correct answer is 0 (negative): Cost = −log(1 − p̂)
```

If we calculate the cost according to the probability generated by the model for samples where the correct answer is positive,

| Probability p̂ produced by the model | 0.99 | 0.9 | 0.5 | 0.1 | 0.01 |
| --- | --- | --- | --- | --- | --- |
| Cost −log(p̂) | 0.01 | 0.11 | 0.69 | 2.30 | 4.61 |

If you confidently predict the right thing, the cost is almost zero. However, **the more confidently you predict the wrong side, the more explosively the cost increases.** This is a very large punishment for mistakes such as “It was an attack, but I said there was a 1% chance.” The total cost is the average of the costs of all samples.

**Why not use MSE**

- **It becomes bumpy:** When MSE is applied to the sigmoid probability, the cost function becomes bumpy and a local minimum occurs. Log loss is a convex function, so there is only one bowl, and there is no non-global local minimum problem, but the learning rate, number of iterations, and solution existence conditions must be checked.
- **The penalty is weak:** The probability of MSE is between 0\~1, so the error is up to 1, so the penalty is not large even if you are confident that you are wrong.

**How to learn**

Since logarithmic loss does not have a solution in the form of a general normal equation, numerical optimization is used. In addition to gradient descent, methods such as Newton series or L-BFGS can also be used. Batch, SGD, mini-batch, learning rate, and scaling learned earlier are all used as is. The derivative shape is almost the same as linear regression.

```txt
Derivative of θⱼ = (1/m) × Σ (σ(θᵀx⁽ⁱ⁾) − Answer⁽ⁱ⁾) × xⱼ⁽ⁱ⁾
```

The structure of “prediction − correct answer” multiplied by the input and averaged is the same, the only difference is that the prediction is changed to σ(θᵀx) instead of θᵀx.

Regularization can also be used as is. Scikit-Learn LogisticRegression has L2 (ridge) regularization by default, and the strength is set to C instead of α. C is the inverse of α, so **the smaller it is, the stronger the regularization.**

### Decision boundary - the line dividing the classes

Since the prediction rule is “positive if θᵀx ≥ 0,” the boundary separating the two classes is **where θᵀx = 0**. This is the **decision boundary**. Because θᵀx is a weighted sum, the decision boundary is always a straight line (or plane if there are many features).

The iris example in the lecture shows this. There are 150 irises of three varieties (Setosa, Versicolor, and Virginica). If you ask them to guess "Is it Virginia or not" just by looking at the width of the petal?

- As the width of the petal increases, the probability that it is Virginica increases from 0 to 1, drawing an S-shaped curve.
- The point where the probability exceeds 0.5 is the decision boundary. In the textbook example, it is about 1.6cm.
- If we increase the feature to two petal lengths and widths, the decision boundary becomes a straight line on a plane.

Here, let’s summarize the relationship between logistic regression and “classification.” The two are not at the same level. **Classification is the type of problem**(“Is it an attack or normal?”), and **logistic regression is one of the methods to solve that problem**. The same classification problem can be solved with softmax regression, KNN, decision tree, SVM, and neural network, and the error matrix·precision·recall·ROC in Chapter 2 is a tool to evaluate the classification result regardless of the method used. The work done in logistic regression (getting the number called log odds through weighted sum) is regression, and the last thing done (cutting the probability into a baseline and selecting a box) is classification. This is exactly the structure that was first said, “In the classification model diagram, a score is given and the score is cut as a baseline.”

Chapter 2's SGDClassifier also gave a decision score and cut it, but the difference is the meaning of the score. SGDClassifier's score (values such as 2.7 and −1.3) only tells us that "the larger the number, the more positive it is," but the output of the logistic regression is immediately read as "88% probability of an attack." Therefore, a baseline can be set that is easy for people to understand, such as “if the probability is over 30%, it is an alarm.”

![Chapter 3. Regression: Predictions and Probabilities — Figure 10](/images/ai-study/6d75060a3b90b035612d.png)

If you set the petal length and width as coordinates, a straight line divides the two categories, and the parallel lines around it represent different estimated probabilities. The sigmoid curve itself and the decision boundary of the input space are two different pictures. Logistic regression with the original features creates a linear boundary, but if you add polynomial features, you can also create curved boundaries in the original input space.

### Limits and next - softmax regression

Logistic regression is often used as a classifier that generates probabilities because the results are easy to interpret, the calculations are light, and the baseline can be adjusted because it produces probabilities. However, it can only be used directly if the answer is **one of the two**.

If the answer is one of several, like a malware family, you can create one logistic regression for each class like OvR in Chapter 2. However, even if each model generates probabilities separately and add them all up, it does not add up to 1. So, **a method was created that calculates the scores of all classes at once and divides the probability so that the sum is 1**. This is the final branch, softmax regression.

## 5. Softmax regression

Logistic regression gives a probability when the answer is one of two, such as the “probability of an attack.” However, in security, the answer is often one of several, such as “Is this malware ransomware, a Trojan horse, or a worm?” Like OvR in Chapter 2, it is possible to create one logistic regression for each class, but because each model generates probabilities separately without knowing each other, strange results such as "Ransomware 0.7, Trojan 0.6, Worm 0.2" appear where the sum exceeds 1. The model does not know that “this sample is exactly one of three.”

So, **a method was created that calculates the scores of all classes at once and divides the probability so that the sum is 1**. This is softmax regression (multinomial logistic regression).

### Idea - Each class gives a score and divides it by probability.

Softmax regression is also calculated in two steps.

```txt
Step 1 (Linear score per class): s_k(x) = θ_kᵀx k = 1, 2, … , K
Step 2 (Softmax function): p̂_k = exp(s_k) / Σ_j exp(s_j)
```

Step 1 is a weighted sum like logistic regression, but the difference is that **each class has its own θ\_k**. If there are three classes, there are three θ vectors, and each class gives a score of “how much this sample is tilted toward me.”

Step 2 is the **Softmax function**. Add exp to each score and then divide by the total to create the probability. Let’s say the score for one malware sample is like this.

| class | Score s\_k | exp(s\_k) | Probability p̂\_k |
| --- | --- | --- | --- |
| ransomware | 2.0 | 7.389 | 0.66 |
| trojan horse | 1.0 | 2.718 | 0.24 |
| worm | 0.1 | 1.105 | 0.10 |
| sum |  | 11.212 | 1.00 |

The probabilities add up to exactly 1, and the class with the highest score receives the greatest probability.

**Why do you use exp**

If you just divide the score by the sum, when the score is \[2, −1, −3\], the sum is −2, so the probability becomes negative.

- **Always a positive number:** Even if the score is negative, if exp is added, it is positive and can be used as probability.
- **Maintain order:** The higher the score, the greater the exp. 1st place in score is 1st place in probability.
- **Amplifying differences:** Even a score difference of just 1 changes exp by a factor of about 2.7, concentrating probability on the leading class. The name Softmax means choosing the largest value (max), while distributing probability smoothly (soft) rather than making a single hard choice.

### Prediction - Pick the class with the highest probability

Just select the class with the highest probability (argmax). Since exp does not change the order, it is essentially the same as selecting the class with the highest score s\_k. In the example above, it is ransomware (0.66).

There is something to be careful about. Softmax is only used when there is exactly one correct answer per sample. Because it is a structure that divides the probability, if one class goes up, the rest have no choice but to go down. It is not suitable for problems where multiple tags can be attached at the same time, such as "It has a ransomware function and can spread like a worm," and in such cases, sigmoid is used separately for each tag to calculate the probability for each tag.

### Learning - Cross Entropy

The learning goal is the same as that of logistic regression. **Finding θs that give high probability to the correct answer class and low probability to the rest.** The cost function that measures this is **cross entropy**. Since the name is unfamiliar, let’s look at entropy first.

**Entropy – Magnitude of Uncertainty**

The amount of information obtained when an event occurs is measured by −log (probability). If something that always happens (probability 1) happens, it is 0 because there is no new information, and if something rare happens, it has a high value because it is surprising information. Entropy is the weighted average of this amount of information by probability, that is, **average amount of information**.

```txt
Entropy H(P) = −Σ P_i × log(P_i)
```

- **Certain case:** If the probability of a class is 1, the entropy is 0. The result is obvious.
- **Most uncertain case:** If all three classes are 1/3, the entropy is highest (about 1.10 in natural logarithm).

In other words, entropy is **a measure of uncertainty**.

**Cross entropy - how different are the two distributions**

Cross entropy measures how different the actual distribution P is from the model-predicted distribution Q.

```txt
Cross entropy H(P, Q) = −Σ P_i × log(Q_i)
```

In classification, the actual distribution P is 1 only for the correct answer class and 0 for the rest (e.g. (1, 0, 0)). So, only one correct class term remains in the sum.

```txt
Cost = −log (probability given by the model for the correct answer class)
```

When the correct answer is the first class

| Model prediction Q | Probability given to correct answer class | cost | Judgment |
| --- | --- | --- | --- |
| (0.9, 0.05, 0.05) | 0.9 | 0.11 | Accurate predictions, low costs |
| (0.3, 0.4, 0.3) | 0.3 | 1.20 | Wrong predictions, high costs |

I've seen this somewhere before. It is the same as the log loss −log(p̂) of logistic regression. **Cross entropy expands log loss to multiple classes**, so the properties are the same. The more confidently you are wrong, the more expensive it becomes, and since it is a convex function, gradient descent is used to find the global minimum. Instead of a general closed form solution, it is solved by numerical optimization such as gradient descent.

In Scikit-Learn, if you input data with three or more classes into LogisticRegression, you can learn with the softmax objective function by using a solver that supports multi-class learning. The scope of support varies depending on the solver. For example, the problem of classifying three varieties of iris (Setosa, Versicolor, and Virginica) by petal length and width is a representative example of softmax regression. (The iris example in number 4 was a binary classification that only asked whether it was Virginica or not.)

### How is it different from sigmoid?

From what we can see up to this point, Softmax seems to do something similar to Sigmoid. In fact, Softmax expands sigmoid into several classes, and the apparent difference is whether the probabilities add up to 1. However, the more fundamental difference is whether the classes are independent or competitive.

|  | sigmoid | softmax |
| --- | --- | --- |
| receiving | 1 score | K points (one per class) |
| paying | 1 chance (the remainder is 1 − p) | K probability |
| sum | If multiple numbers are used separately, it can exceed 1. | always exactly 1 |
| relationships between classes | Calculate probability for each output separately | **Compete** with each other (when one goes up, the others go down) |
| correct problem | Problem with one yes/no or multiple tags attached at the same time | The problem of choosing exactly one out of several |

- Several sigmoids separately ask “Does it have a ransomware function?” and “Does it spread like a worm?” It is not strange if both are 0.9. Because actually it could be both.
- Softmax asks at once, “Which of the three is this family?” If one is 0.9, the other two have no choice but to share 0.1.

It can also be confirmed by the equation that softmax is an expansion of sigmoid. If you calculate softmax when there are two classes, sigmoid comes out as is.

```txt
p̂₁ = e^s₁ / (e^s₁ + e^s₂)
   = 1 / (1 + e^−(s₁ − s₂)) ← Divide numerator and denominator by e^s₁
   = σ(s₁ − s₂)
```

It is the same as putting the **difference** of the two scores into sigmoid. Logistic regression calculates this difference as a single score (θᵀx) from the beginning. So **logistic regression is a special case of two classes of softmax regression**.

### Classes, Features, and the Shape of θ

Since each class has a separate θ, it is easy to think of a class as a characteristic, but the two are in completely different places. Features are the input, and classes are the answer options.

|  | features | class |
| --- | --- | --- |
| location | Input side (table column) | Output page (answer options) |
| yes | Number of packets, number of bytes, port number | Ransomware, Trojan horses, worms |
| role | basis for judgment | result of judgment |

The two meet at θ. Softmax has **one θ vector per class**, and each θ vector has **one weight per feature**. So θ becomes a table.

|  | Base score θ₀ | number of packets | number of bytes | port |
| --- | --- | --- | --- | --- |
| θ of ransomware | … | … | … | … |
| θ of Trojan horse | … | … | … | … |
| θ of worm | … | … | … | … |

If there are 3 features and 3 classes, the number of parameters is 3 × (3 + 1) = 12. The ransomware score is a weighted sum of the features with the first row weight, and other classes also give scores in their own row. Those three scores are put into softmax and divided by the probability.

## Concluding the regression section

If you connect the five branches in one line, it looks like this.

1. To guess the numbers, I drew a straight line using **linear regression**.
2. Because I needed a curve, I increased the features with **polynomial regression**.
3. The curve was jumping so I pushed the weights to **regularization**.
4. I needed probability instead of numbers, so I used sigmoid with **logistic regression**.
5. Since the answer was one of many, we divided the probability using **softmax regression**.

All five branches stand on the same framework of “weighted sum → cost function → gradient descent”, and this framework is also used in neural networks after Chapter 8. Since the last layer of the neural network is usually softmax and the cost function is cross entropy, the regression section also means learning the output layer of the neural network in advance.

## We'll see the same calculations again in the next chapter.

A linear model learns a weighted sum of given features. In polynomial regression, people create nonlinear features in advance, and SVM uses a different expression space as the kernel. The neural network learns the weights of the previous layer and creates an expression for the next layer. Remembering this difference puts the different algorithm names on one map.

Meanwhile, MSE, RMSE, and MAE are not the same indicators. MSE squares and averages the errors, so it is sensitive to large mistakes. RMSE is its square root, so it can be read in the same units as the answer. Because MAE averages absolute errors, the impact of large errors does not increase as quickly as the square. Learning objectives and evaluation indicators to be reported can be determined separately as needed.

The convexity of general linear and logistic regression does not extend to mean that the cross-entropy of the entire neural network is convex. In a neural network, the front layer that creates the prediction score also changes, so the optimization problem changes. Additionally, in completely linearly separated data, logistic regression without regularization may result in coefficients that continue to grow and no finite optimal value. It is more accurate to not simply explain why regularization and termination conditions are necessary as “a bowl with only one answer.” [scikit-learn linear model documentation](https://scikit-learn.org/stable/modules/linear_model.html)

In the next [KNN - Chapter 4](/post/ai-foundations-06-knn), we will look at how to create an answer with cases near the new input, rather than summarizing the entire data into a weighted sum.
