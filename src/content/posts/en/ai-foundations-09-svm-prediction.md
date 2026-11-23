## 9. Learning and prediction of kernel SVM - Ultimately, “how similar is it to the support vector?”

![Chapter 6. SVM II: Prediction and Neural Networks — Figure 9](/images/ai-study/171eaf395017ed319382.png)

![Chapter 6. SVM II: Prediction and Neural Networks — Figure 10](/images/ai-study/10bbcf3da9c3a133e224.png)

αᵢ is the coefficient obtained through learning, and yᵢ is the training answer expressed as −1 or +1. Even if the kernel values are similar, not all similar cases vote in the same direction because yᵢ and αᵢ are included together. Points with a coefficient of 0 do not affect the sum. When learning, the constraints of all training samples are used, and the final function is expressed as support vectors with remaining coefficients.

In a linear kernel, this sum can be collected as w. On the other hand, kernels like RBF typically compute the kernel of a new input and support vector. You should not assume that LinearSVC and SVC have the same type of storage and exactly the same implementation. [scikit-learn SVM documentation](https://scikit-learn.org/stable/modules/svm.html)

If you use a kernel, w cannot be calculated directly. This is because w is in a transformed high-dimensional (infinite-dimensional if RBF) space. So, learning and prediction are rewritten based on support vectors.

**Learning.** To solve the constrained optimization, a weight called **Lagrange multiplier αᵢ** is assigned to each sample. After learning is completed, most samples become αᵢ = 0, and only samples with **αᵢ > 0 become support vectors** to define the decision boundary and margin. In Section 3, “w is the weighted sum of support vectors,” the weight is α.

**Prediction.**

```txt
f(x) = Σ αᵢ yᵢ K(xᵢ, x) + b (sum only for support vector)
```

- **K(xᵢ, x) :** How similar the new sample x is to the support vector xᵢ. The kernel performs high-dimensional transformation and similarity calculation at once.
- **yᵢ :** The class (+1 or −1) of that support vector, i.e. which side you vote for.
- **αᵢ :** This is the voice size of the support vector.
- **Judgment:** If f(x) > 0, it is class 1, and if f(x) \< 0, it is class 0.

The prediction of nonlinear SVM is to determine whether the new sample is more similar to positive support vectors or negative support vectors through a weighted vote. In a linear kernel, K is just a dot product, so if you rearrange this equation, you get wᵀx + b in Section 4. Linear SVM and nonlinear SVM are two faces of the same equation. Since only support vectors are needed for prediction, the model is a “list of support vectors and their α”, and the prediction cost is proportional to the number of support vectors.

## 10. Is the core of SVM the kernel?

When we get to this point, the core of SVM looks like a kernel. But the key is **maximizing margins**, and the kernel is an **extension** on top of it. Linear SVM (LinearSVC) without a kernel is also an SVM that only finds the widest path, and conversely, kernel tricks can be applied to any model that uses only dot products (kernel ridge regression, kernel PCA, etc.), so they are not exclusive to SVM. What makes SVM an SVM is the idea of “creating the widest path, and that path is determined only by edge points.”

Nevertheless, the reason why SVM became famous along with the kernel is because the two accurately compensate for each other's weaknesses.

- **Margin makes the kernel possible and cheap:** Since the answer to the margin maximization problem is expressed only as a dot product between samples, the kernel can be inserted in its place. Moreover, when predicting that most α is 0, only the kernel value with the support vector needs to be calculated.
- **The kernel gives expressive power to the margin:** As long as there is a margin, you let go of the data that is not divided into straight lines. Since the kernel changes space, a curved boundary is created using the same "wide path finding".
- **Margin prevents overfitting of the kernel:** This is the most important connection. The RBF kernel moves data into an infinite dimension, and in an infinite dimension, any data, including noise, can be perfectly cut with a straight line. If you leave it alone, overfitting will end. However, since SVM picks the **widest path** rather than a “just cut” boundary, it picks the least sensitive one among many possible boundaries. This condition acts as a regularization, and its degree is controlled by C and γ.

| component | role | If there is no |
| --- | --- | --- |
| Maximize margin (+ support vector) | Criteria for generalization. Identity of SVM | It's not SVM |
| soft margin (C) | Realistic compromises on outliers and overlaps | It falls apart due to one outlier. |
| Kernel (+γ) | Extension to data that is not linear | Only straight boundaries are possible |

Here's where it's easy to get confused. Since I said "overfitting if the road is narrow" earlier, it sounds like the margin causes overfitting, but the margin is not the cause of overfitting, but a **break**. A narrow road is just a sign of weak brakes. The cause of overfitting is how freely the boundaries can bend, that is, the **flexibility** of the model, and the kernel increases that flexibility. Raising the degree of a polynomial kernel is the same as raising the degree of a polynomial regression, so the boundaries can fluctuate just as the 300th degree polynomial regression fluctuated between training points. If γ is made very large in the RBF kernel, it becomes sharp like a paper needle, creating a small island only around itself for each training sample. The training data is 100% correct, even the noise, but new samples that fall between islands do not resemble any support vector, so they are judged almost randomly. So, the kernel (and γ) can be viewed as the **engine**, and the margin (and C) as the **brake**. Overfitting occurs when the engine is too powerful (γ is large or high order) or the brakes are too weak (C is large), while underfitting is the opposite.

## 11. Kernels and artificial neural networks - do you decide on space or learn?

After looking at the kernel, one wonders, “If an artificial neural network creates a complex function, does it mean stacking the projection to the kernel in 5th or 6th order?” Not really. However, the goal they are aiming for is the same. Data that does not fit in a straight line is moved to another space and divided by a straight line. The difference is whether the space is determined by people or learned from data.

|  | polynomial feature | Kernel SVM | artificial neural network |
| --- | --- | --- | --- |
| Who decides on the new space? | person (order) | person (kernel type, degree, γ) | Learn from data |
| Do we actually calculate the new trait? | (so it explodes) | Don't do it (skip to kernel formula) | Do it. A person determines the number so it does not explode. |
| learning | Straight line θ over the new feature | Weight α for each support vector | Transformation itself + last straight line |
| number of layers | once | once | build several layers |

With a kernel, a person chooses the feature space before training; training then finds the widest margin within that space. Training cannot repair a poorly chosen kernel. Neural networks learn the representation itself. Each layer first computes a weighted sum, as in linear regression, then applies a nonlinear activation such as sigmoid or ReLU, which outputs 0 for negative inputs and leaves positive inputs unchanged. Stacking layers makes one layer’s output the next layer’s **new feature**. The final layer is usually logistic or softmax regression. Earlier layers construct features, and the final layer learns linear boundaries in that representation.

There are two reasons why the picture of “stacking nth-order functions” is inaccurate. First, the activation function is not polynomial, so the degree does not increase for each layer. When using the most common ReLU, it becomes a function that connects pieces of bent straight lines rather than a 5th or 6th order curve, and as the layer gets deeper, the number of bends increases, imitating a complex boundary. Second, nonlinearity comes from the activation function, not the order. If you subtract the activation function, no matter how many layers of weighted sums you stack, they are combined into a single weighted sum. If you combine a straight line with a straight line, it is still a straight line.

There is a link. The sigmoid kernel of SVM imitates the activation function of a neural network, and there is also a theory (Neural Tangent Kernel) that an infinitely wide neural network becomes the same as a specific kernel method. The reason SVM was strong before deep learning was because it efficiently solved non-linear problems with a single well-chosen kernel, and the reason deep learning took over was because it was stronger at learning the space itself from data such as images or negatives where it is difficult for people to determine which kernel is correct. Instead, neural networks require a lot of data, so SVM is still a good choice if the data is small or medium-sized.

## 12. Hyperparameters and their pros and cons

| hyperparameter | role | When you grow up | If it's small |
| --- | --- | --- | --- |
| C | Balancing Margin Width and Margin Error | Reduce errors even by narrowing the path → Overfitting is possible | Broaden the path and generalize → Underfitting is possible |
| γ (RBF) | Scope of influence for each sample | Boundaries become complicated → overfitting is possible | Softens over a wide range → Possible underfitting |

Training does not determine either value. As with a learning rate or α, try several combinations using grid search and choose them by validation performance.

**merit**

- **Strong in high-dimensional data:** Even if there are hundreds to thousands of features, there is a low possibility of overfitting. This is because the boundary is not determined by the number of features but by a small number of support vectors. Therefore, it is advantageous for text classification (spam, phishing emails) or image recognition where each word is a characteristic.
- **Good generalization performance:** Maximizing margin is itself a design for generalization.
- **Solve non-linear problems too:** Create curved boundaries without feature explosions thanks to kernel tricks.
- **Good performance even on small datasets.**

**disadvantage**

- **Slow training on large datasets:** Kernel SVMs work with similarities between samples, so training time grows at least quadratically with the number of samples. Millions of traffic logs place a substantial burden on this approach.
- **Inefficient multiclass classification:** The original model separates two classes. With multiple classes, it must combine several binary classifiers using an approach such as OvR or OvO. It does not handle all classes in a single model in the same way as softmax regression.
- **Tuning is required:** Performance is achieved only when the kernel type, C, and γ are carefully selected.
- **Difficult to interpret:** A nonlinear SVM acts like a similarity vote involving hundreds of support vectors in an infinite-dimensional space. This makes its decision difficult to explain. It cannot show a sequence of questions like a decision tree or expose a weight for each feature like a linear model, so it is closer to a black box.

## Concluding the SVM unit

SVM is ultimately a model that solves three problems sequentially.

| problem | Solution Principle |
| --- | --- |
| If there are multiple lines dividing the data, which one is more resistant to new data? | Choose the center line of the widest road (margin). The boundary is determined only by road edge points (support vectors). |
| There are outliers in real data, so there is no perfect path or it is narrow. | Allow some intrusion (soft margin). How much to allow is determined by C. |
| Data that is not divided by a straight line at all | If you increase the characteristic, it divides into a straight line but explodes. Calculate only the effects created without creating features using kernel tricks. |

To put it in one line, SVM is a classifier that finds the boundary with the widest margin between two classes by looking only at the points near the boundary, and if a straight line does not work, it changes the space with a kernel and does the same thing. And the next neural network is one that learns from data instead of having people select the space.

## The power of the kernel and questions for the next chapter

Just because it is named similarity does not mean that any function is a valid kernel of SVM. The kernel must satisfy the mathematical condition that it behaves like a dot product over a set of possible samples. For example, the conditions of a sigmoid type kernel may vary depending on the parameters.

SVM is a method of carefully selecting boundaries within a given expression and regularization. Ensemble changes the perspective and combines predictions from multiple models. The neural network goes further and learns the expression itself for selecting the boundary as the weight of the layer. Therefore, rather than memorizing “SVM is old, neural network is new,” it is easier to understand the location of the model by linking to **Where the expression is created and what function is learned**.

In the following [ensemble - Chapter 7](/post/ai-foundations-10-ensemble), we expand the perspective from a method of more precisely selecting a boundary to a method of combining different judgments from multiple models.
