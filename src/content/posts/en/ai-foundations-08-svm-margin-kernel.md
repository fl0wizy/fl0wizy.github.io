## What is SVM?

Logistic regression classifies two classes by drawing a straight line (hyperplane) between them. However, if the data is clearly divided into normal traffic and attack traffic, there is not just one straight line that perfectly separates the two, but numerous. If you look at the training data, all accuracy is 100%. So which of these straight lines is strong for new data?

Support vector machines (SVMs) answer this question. **Create an empty road as wide as possible between the two classes, and use the center line of the road as the boundary.** The wider the road, the better the generalization because the new sample will not fall to the other side even if it shakes a little. With the addition of a kernel trick that allows it to handle data that is not divided by a straight line, SVM was one of the most powerful supervised learning algorithms until the advent of deep learning. Although both classification and regression can be solved, here we focus on classification, and it is especially suitable for small or medium-sized data.

## Key Terms

- **hyperplane:** A boundary that divides space into two. In 2D it is a straight line, in 3D it is a plane, and if the data is n-dimensional, the hyperplane is n−1 dimensional. The decision boundary of logistic regression θᵀx = 0 was also a hyperplane.
- **w and b :** These are numbers that determine the hyperplane. w is the weight attached to each feature, and b is the intercept, which corresponds to θ₁\~θₙ and θ₀ in the regression section. The boundary is where wᵀx + b = 0.
- **Decision function:** This is wᵀx + b, which is calculated when a new sample is inserted. A positive number is a positive class, and a negative number is a negative class.
- **Margin:** This is the width of the empty road on both sides of the border.
- **support vector:** This is a sample spanning the edge of the path. These are the points closest to the border, and the name comes from the meaning that these points support the border location.
- **hard margin / soft margin:** Hard margin is a strict method that requires that there are no samples inside or on the other side of the road, and soft margin is a method that allows a little intrusion.
- **Margin error:** A sample that has entered the path or crossed the border and is on the other side.
- **Kernel:** This is a function that calculates how similar two samples are. It is a core tool for nonlinear SVM.
- **C and γ (gamma):** These are the two regularization knobs of SVM.

## 1. Maximizing the Margin

![Chapter 6. SVM I: Margins and Kernels — Figure 1](/images/ai-study/21f4c91097a931dde577.png)

There may be multiple lines dividing the training points, as shown on the left. SVM adds a criterion that increases the margin to the closest points. The final border and the two margin lines are different lines. The mere fact that an input point is within the margin does not necessarily indicate a misclassification. You can only invade the space within your own boundary.

The phrase “the center line of the widest road” doesn’t make much sense when you first hear it. It is easy to think of it as a case where there is only one characteristic. Let's say that the number of login attempts alone determines the difference between a normal attack and an attack.

```txt
Normal: 1, 2, 3 Attack: 7, 8, 9
```

No matter where you draw the baseline between 3 and 7, the training data is 100% correct. Whether the baseline is 3.5, 5, or 6.9, the percent correct is the same. But not all three are equally good.

- **Baseline 3.5:** Close to the highest value of 3 among normal values. If a normal user attempts it 4 times tomorrow, it will be incorrectly judged as an attack.
- **Baseline 5:** The distances to the closest points 3 and 7 on both sides are both 2. Even if the summit increases a little or the attack decreases a little, it has the most room to endure.

Here, **road** is an empty section with no data, such as between 3 and 7, and its width of 4 is **margin**. 5 in the middle is the **center line**, or decision boundary, and 3 and 7, which touch the edge of the road, are **support vector**. What SVM does is to take this empty section as wide as possible and draw a boundary in the middle of it. In two dimensions, it would be like building the widest road between two villages without touching any houses and using the center line of the road as the boundary.

If you write the path as an equation, there are three lines.

```txt
wᵀx + b = +1 ← positive side edge
wᵀx + b = 0 ← decision boundary (road center line)
wᵀx + b = −1 ← negative side edge
```

This is where an important property of SVM comes into play. **The boundary is determined only by the support vector.** In the example above, even if there is an extra 0.5 or 1 on the normal side, the path remains the same. This is because only a few points on the edge support the road. Logistic regression's log loss averages the cost of all samples and moves the boundary slightly even for distant samples, but SVM only focuses on samples near the boundary, which is confusing.

SVM is a **distance-based** algorithm, so like KNN, **scaling is essential**. Margin is measured as the distance from the boundary to the point, and if the unit of one characteristic is thousands of times larger than another characteristic, the distance is attracted to that characteristic, and the length expands only towards the large characteristic, and the small characteristic is almost ignored. So, before SVM, features are usually standardized using StandardScaler.

## 2. Hard and Soft Margins: How Much Error to Allow

### Hard Margin: The Limits of Perfect Separation

![Chapter 6. SVM I: Margins and Kernels — Figure 2](/images/ai-study/663e48393049382f1a8d.png)

On the left is a layout that cannot be separated, and on the right is an example where the width is narrowed due to one outlier. The hard margin constraint applies to all training samples. Soft margin controls the simplicity of boundaries and training violations by allowing violations but imposing a cost.

The strictest method is to impose the condition that “all samples must be outside the road, on your side.” This is **hard margin classification**, but it has two problems.

- **If it is not divided by a straight line, it does not work at all:** If a versicolor flower is mixed in a group of Iris setosa, there is no straight line that divides it perfectly because of that single flower.
- **Significantly shaken by one outlier :** If an outlier is close to the other class, you have to avoid that point as well, so the path becomes very narrow and strangely tilted. The training data is perfectly divided, but generalization is at the borderline.

Real-world data contains noise and outliers, so hard margins are not practical.

### soft margin and C

![Chapter 6. SVM I: Margins and Kernels — Figure 3](/images/ai-study/e369a88bab5c65ab76f6.png)

As C increases, greater punishment is imposed for the same violation, so more emphasis is placed on those who hit the training points. Smaller C allows more violations and increases the relative impact of reducing the weight size. If you read the reason for the change in the boundary of the picture as a balance of costs, you can avoid the misunderstanding that “a large C is always good.”

So, **soft margin classification** was created, which keeps the road as wide as possible but allows some samples to enter the road or cross over to the other side (margin error). It is a balance between path width and margin error, and in real problems, this is mostly used.

The handle that determines the balance is **C**. C is the size of the penalty point given for violating the road. If C is large, encroachment is very expensive, so all dots are tried to be kept out of the path even if the path is narrowed. If C is small, encroachment is cheap, so the path is widened without worrying about how many points are inside the path. In other words, **the larger C, the narrower the path.**

The intuition that “then narrowing the path is overfitting” is correct. To pinpoint the reason, just add an outlier to the previous example. Let's say a value of 6.5 is mixed into the normal data.

- **When C is large:** To keep 6.5 out of the way, the length narrows between 6.5 and 7, and the boundary becomes 6.75. One outlier had dragged the border. If tomorrow's attack is attempted 6.6 times, it will normally be missed.
- **When C is small:** 6.5 Let one invade and maintain the wide path between 3 and 7. The boundary remains near 5.

A narrow path is a signal that **a few extreme points, usually noise, dominate the boundary**, and that is overfitting of SVM. In the example of dividing irises versicolor and virginica, C = 1 is wide and has many flowers in the path, while C = 100 is narrow and has small margin errors. If you look at the training data alone, C = 100 looks better, but on new data, a wide path of C = 1 is likely to generalize better. So **if SVM is overfitting, regularize by reducing C.**

### How does underfitting occur?

Overfitting is drawn immediately, but underfitting is not drawn well. If you push C all the way to a smaller size, you will see it. If C is close to 0, there is almost no infringement penalty, so the only remaining goal for SVM is to “widen the road as much as possible.” When the road becomes infinitely wide, almost every point falls within the road, and the boundary barely sees any data. As shown in Section 3, a wide length means that w is close to 0, and if w ≈ 0, the decision function wᵀx + b produces almost the same value for any input, making it a model that ignores the input.

It is the same as the scene seen in the regression section. When α was increased to 1000 in the ridge, all weights were pushed to 0 and became a horizontal line passing through the data average. The small C of SVM corresponds to the large α of the ridge. In both cases, the goal of “lower weights” has trumped “fit the data.” There is a pattern in the data, but the model determines that “that difference can be ignored,” which is SVM underfitting.

|  | C louder | C small |
| --- | --- | --- |
| Attitude toward margin errors | Large penalty points are imposed and are rarely allowed. | I look at it to some extent |
| width of the road | Narrow to avoid errors | widens |
| danger | overfitting (getting closer to the hard margin) | underfitting (w is pressed to 0) |

Be careful about the direction. The larger α in the regression unit, the stronger the regularization, but the smaller the SVM C, the stronger the regularization. α is the value where the penalty is applied to the weight, and C is the value where the penalty is applied to the margin error, so the directions are reversed. Logistic regression’s C was in the same direction.

## 3. Learning - widening the path reduces w

Learning of SVM is ultimately about “finding w and b that gives the widest path.” However, if you write it as an equation, the goal changes to “make w small.” This is the core of SVM mathematics.

### Relationship between w and road width

![Chapter 6. SVM I: Margins and Kernels — Figure 4](/images/ai-study/910f660bffdc86230eae.png)

The above graph compares input positions where the decision score reaches ±1. As w gets smaller, we have to move further in the input space to achieve the same score difference. So the margin width becomes 2/‖w‖. This equation relates the margin line to the SVM representation normalized to a score ±1.

If there is only one feature, the decision function is w₁x₁, and the edge of the road is where these values are +1 and −1.

- **If w₁ = 1:** The decision function becomes ±1 at x₁ = ±1. The width of the road is 2.
- **If w₁ = 0.5:** The decision function is so smooth that it has to go up to x₁ = ±2 to reach ±1. The width of the road is 4.

The gentler the slope of the decision function, that is, the smaller w is, the wider the path becomes because the farther you have to go to reach ±1. Generally speaking

```txt
Margin (way width) = 2 / ‖w‖ ‖w‖ = size of w (norm)
```

So “maximize margin” is the same as “minimize ‖w‖.”

### Goals of hard margin and soft margin

Write the correct answer as t, positive as +1, and negative as −1.

```txt
hard margin
  Minimize: ½ wᵀw (= ½‖w‖², widen the way)
  Condition: t⁽ⁱ⁾(wᵀx⁽ⁱ⁾ + b) ≥ 1 for all samples i (all outside the road, on own side)

soft margin
  Minimize: ½ wᵀw + C × Σ ζ⁽ⁱ⁾
  Condition: t⁽ⁱ⁾(wᵀx⁽ⁱ⁾ + b) ≥ 1 − ζ⁽ⁱ⁾, ζ⁽ⁱ⁾ ≥ 0
```

- **Why there is only one constraint:** The original conditions are two separate statements: the decision function must be at least +1 for positive samples and at most −1 for negative samples. A negative sample has t = −1. Multiplying by t reverses the inequality for that sample, so both conditions take the same form.
- **Reason for ½‖w‖²:** It is easy to differentiate as it gives the same answer as minimizing ‖w‖.
- **Slack variable ζ⁽ⁱ⁾ (zeta):** This is a quantity, one for each sample, that indicates how much the sample has encroached on the margin. If you're well outside the road, it's 0, and it gets bigger the more you invade.

Unlike the "just reduce cost" problem in the regression section, this is a **constrained optimization problem** that minimizes **while keeping** the conditions. At soft margin, two goals collide. The first term seeks to widen the road, the second term seeks to reduce encroachment, and C is the balance between the two goals. The table in section 2 came out as an equation.

If you continue with the regression section, there is an interesting point. ½‖w‖² has the same shape as **penalty point of ridge regularization**, and Σζ is a loss that is calculated only for the amount that violates the margin, and is commonly called **hinge loss**. In the end, soft margin SVM is “hinge loss + ridge regularization,” and C plays the role of inverting α. The model is new, but the framework is the same as the regression section.

### What is the difference between decision function and cost function?

It is easy to confuse the decision function and the cost function because they both contain w and b, but the questions asked are different.

|  | decision function | cost function (objective function) |
| --- | --- | --- |
| ceremony | f(x) = wᵀx + b | ½‖w‖² + C·Σζ |
| putting in | One sample x | Parameters w, b (over the entire training data) |
| paying | The score of that sample. The sign is a class | One number representing "how bad is this w, b" |
| Questions to ask | Which sample is this? | Is this a good boundary? |
| When writing | When making predictions (also used internally during learning) | only when learning |

When paired with the regression section, the decision function is ŷ = θᵀx of linear regression, i.e. **the model itself**, and the cost function is MSE(θ), i.e.**the standard for selecting the parameters of the model**. Learning is the process of finding w, b where the cost function becomes smallest, and prediction is the process of calculating the decision function with the found w, b. The cost function also contains a decision function. This is because the conditional expression t(wᵀx + b) ≥ 1 − ζ determines “whether the decision function value of each sample is 1 or more in its direction.” If you combine the "cost function vs. evaluation index" in the KNN section, there are three things: decision function (the answer the model gives for each sample), cost function (the number that learning reduces), and evaluation index (the number by which a person measures performance after completion, such as accuracy and recall).

### After learning, only the support vector remains.

When solving for optimal w, **w comes out as the weighted sum of support vectors**. Samples that are far from the path do not contribute anything to w, so when learning is finished, only the support vector is stored and only the support vector is used for prediction. This is why computation and storage become efficient, and it is also why the kernel trick in Section 6 becomes possible.

## 4. Prediction - see only the sign

For a new sample x, compute the decision function wᵀx + b. A positive result predicts the positive class (1), and a negative result predicts the negative class (0). This uses the sign in the same way that logistic regression uses the sign of θᵀx. The difference is what the output means. Logistic regression applies a sigmoid to produce an “88% probability of an attack.” The SVM decision-function value is not a probability; it is closer to a score describing distance from the boundary.

When there are n features, if the decision function wᵀx + b is drawn with n features and function values as the axes, it is an n-dimensional inclined hyperplane, and the decision boundary, where the hyperplane meets 0, is (n−1) dimensional. If there are two features, the decision function is a tilted plane and the boundary is a straight line drawn on the floor.

## 5. Data that is not divided by a straight line - adding features and the cost

![Chapter 6. SVM I: Margins and Kernels — Figure 5](/images/ai-study/ff05ce8c108784cbad2a.png)

If both ends of an original vertical line are in the same category, it cannot be divided by a single line. If x² is made the second coordinate, the center and both ends are distinguished by height. This is why straight lines in the new space appear as non-linear divisions in the original space.

![Chapter 6. SVM I: Margins and Kernels — Figure 6](/images/ai-study/a40d164d6fae4edcb1a0.png)

As the degree and constant settings of the polynomial kernel become larger, the expressible boundary may become more complex. The actual boundary and performance are also affected by the strength of regularization, so do not judge based on the order alone.

So far, we have assumed data that can be cut in a straight line. However, in reality, data often cannot be divided by any straight line, like the shape of two interlocking crescent moons. If you look at the numbers alone, this is the data.

```txt
x :  −3  −2  −1   0   1   2   3
     Gong Gong Jeong Jeong Jeong Gong Gong
```

Since the center is normal and both ends are attack, no point on the vertical line can split it in two. You can reuse the method used in the regression section. **It is about creating one characteristic**. If x² is added as a new characteristic, x² is 0\~1 for normal, and x² is 4\~9 for attack, so it is clearly divided into one straight line, “Is x² ≤ 2.5?” Data that did not fit in a straight line can now be divided in a straight line in a space with increased features. If you create a polynomial feature and run a linear SVM on it, it can separate the crescent moon data quite well.

However, the costs we saw in the regression section follow. If you create a third-order polynomial feature for 100 features, there will be over 170,000 features. If the degree is low, complex data cannot be expressed, and if the degree is high, the features explode and the model becomes very slow. At the end of the regression section, what was announced as "a method of immediately calculating only the results that would have been produced if the feature had been created without actually creating it" appears here.

## 6. Kernel Trick - Get only the effect you created without creating a trait.

### SVM only uses “how similar are the two samples?”

The starting point is an observation. If you solve the learning and prediction of SVM to the end, only the **dot product of the two samples** is needed, not the sample characteristic value itself. The dot product is the value added by multiplying the same digits of two vectors. If a = (1, 2), b = (3, 4), aᵀb = 1×3 + 2×4 = 11, and the larger the two vectors are in the same direction, they can be used as a number to measure “how similar they are.”

The reason why only the dot product is needed is at the end of section 3, “w is the weighted sum of support vectors.” So the score of the new sample is

```txt
wᵀx = Σ (weight × support vectorᵢᵀx)
```

In other words, it is a weighted sum of “how similar the new sample is to each support vector.” Likewise, when learning in a space with expanded features, all that is needed is the **dot product** in the expanded space.

### Calculate the dot product of the expanded space directly as the original number.

Let's replace the two-feature sample with a second-order polynomial feature φ(x) = (x₁², √2·x₁x₂, x₂²) and calculate it directly with a = (1, 2), b = (3, 4).

```txt
After stretching, dot product: ϕ(a) = (1, 2√2, 4), ϕ(b) = (9, 12√2, 16)
              φ(a)ᵀφ(b) = 9 + 48 + 64 = 121

In original space: aᵀb = 11, 11² = 121
```

The values are the same. It's not a coincidence; it always happens.

```txt
φ(a)ᵀφ(b) = (a₁b₁ + a₂b₂)² = (aᵀb)²
```

**Even without actually increasing the features, just find the dot product with the original number and square it to get the dot product of the increased space.** This shortcut formula K(a, b) = (aᵀb)² is a **kernel function**, and skipping the higher-dimensional transformation with that formula is a **kernel trick**. When adding from 1 to 100, it is the same as using the formula 100 × 101 / 2 instead of adding 100 times. The answer is the same, only the calculation is shorter.

| method | 2 talents, secondary | 100 traits, 3rd level |
| --- | --- | --- |
| After actually increasing the dot product | Multiplication 11 times (φ(a) 4 times + φ(b) 4 times + dot product 3 times) | Create 170 thousand features and dot product |
| kernel formula | Multiplication 3 times (dot product 2 times + square once) | Dot product with the original 100 and cube it |

As the features and degrees increase, the increased number of features explodes, but the cost of the kernel formula increases only by the original number of features. This is the **polynomial kernel**. In this way, SVM avoids the feature explosion that multinomial regression suffered from. When learning the crescent moon data with a 3rd order polynomial kernel and a 10th order polynomial kernel, the 10th order boundary bends much more freely. Since the features are not actually created, the calculation does not explode even if the order is increased. However, the risk of overfitting increases with order.

## 7. The Gaussian RBF Kernel: Similarity as a Feature

![Chapter 6. SVM I: Margins and Kernels — Figure 7](/images/ai-study/6901f45b93c986c8f915.png)

The two bell shapes on the left are the similarity function with two landmarks, and the right is a picture using those values as two coordinates. This example gives us the intuition that non-linear representations make bounding easier. The feature mapping of the exact RBF kernel and the finite landmark vector are not equated.

The second way to deal with nonlinear data is a different idea. **Landmarks**(reference points) are placed on the data, and **how close** each sample is to each landmark is used as a new feature. The function that measures the degree of similarity is the **similarity function**, and its representative is the Gaussian RBF (radial basis function).

```txt
Similarity(x, ℓ) = exp(−γ‖x − ℓ‖²) ℓ = Landmark
```

It is a bell-shaped function, so it is 1 when the sample is above the landmark, and drops to 0 as it moves away. If landmarks are placed at −2 and 1 in one-dimensional data and γ = 0.3, the sample with x = −1 has a distance of 1 from the first landmark, so exp(−0.3 × 1²) ≈ **0.74**, and a distance from the second landmark of 2, so exp(−0.3 × 2²) ≈**0.30**. The new feature for this sample becomes (0.74, 0.30). If all samples are changed and drawn like this (similarity to the first landmark, similarity to the second landmark), data that could not be separated by a single straight line on a vertical line is divided by a single straight line.

The problem is where to place the landmarks, and the simplest way is to place them **one at every sample location**. Then, when there are m samples, there are also m features and it explodes again. Here, the two concepts must be distinguished. A vector listing the similarities with finite landmarks is an explicit feature design, and the dot product of the vectors is not an accurate RBF kernel.**RBF kernel** K(a, b) = exp(−γ‖a − b‖²) is a function that acts as a dot product in a separate implicit feature space. Mathematically, it is the same effect as moving data to an **infinite dimension** space, and when a straight line drawn in that space returns to the original space, it becomes a winding curved boundary. It is the most widely used kernel because of its large expressive power.

### γ: The Width of the Bell Curve

![Chapter 6. SVM I: Margins and Kernels — Figure 8](/images/ai-study/069b0576ef623b65702b.png)

When γ is large, the influence of nearby points becomes more local, and C balances training violations and regularization in its representation. The four pictures are the result of changing the two handles together. It is important not to mix the effect of changing one knob with the meaning of another knob.

γ determines how sharp the bell shape is. Since γ = 1/(2σ²), when γ is large, the width σ of the bell becomes narrow.

|  | γ is large | γ is small |
| --- | --- | --- |
| bell shape | It's pointed. You have to be very close to see the resemblance | Wide. Even though we are far away, we look alike |
| Scope of influence for each sample | It's narrow. Each dot creates a small island around itself. | Wide. Seeing many points tied together |
| decision boundary | It reacts sensitively to individual points and bends complexly. | soft and simple |
| danger | overfitting | underfitting |

If you study the crescent moon data by changing γ and C, you can see the effects of the two handles at a glance. If γ = 0.1, C = 0.001, it is underfitting where the boundary is almost straight and cannot follow the shape of a crescent moon. If γ = 5, C = 1000, it is overfitting where the boundary curves along the points. So, γ is also a regularization knob like C. **If it is overfitting, γ is reduced and if it is underfitting, it is increased**.

Compared to KNN, RBF is better understood. It is the same phenomenon that KNN's K = 1 paints its own land at each point, resulting in jagged boundaries, and when γ is large, small islands are created at each point. RBF SVM's prediction is also similar to KNN's weights='distance' in that "the closer the point, the louder the vote." The difference is that the voting point is not all samples, but only the support vector, and the size of each voice is determined **through learning**.

## 8. Kernel Types

| kernel | What to do | When to use it |
| --- | --- | --- |
| linear kernel | Calculate only the dot product of two vectors without adding features | Data divided by straight lines, data with many features |
| polynomial kernel | It produces the effect of a polynomial characteristic with a higher degree. | Data that requires curved boundaries |
| Gaussian RBF kernel | Creates the effect of infinite dimensional similarity space | Complex nonlinear data. spend the most |
| Sigmoid Kernel | Convert in a manner similar to the activation function of a neural network. | Nonlinear data similar to neural networks |

In Scikit-Learn, LinearSVC is used when only linear classification is performed, and SVC (kernel="linear" / "poly" / "rbf") is used when selecting a kernel.
