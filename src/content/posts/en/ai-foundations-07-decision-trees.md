## What is a decision tree?

![Chapter 5. Decision Trees: Splitting the Feature Space — Figure 1](/images/ai-study/82111615d952833ee119.png)

KNN searched around new inputs, and linear regression applied the same weighted sum to all inputs. The tree divides the input space into several regions and gives predictions of the same leaf to samples that arrive in those regions. Instead of a weight matrix, **feature number, threshold, child node, and leaf value** becomes the learning result.

Each model we've seen so far has come at a price. The linear model assumed in advance that the data would be a straight line (weighted sum), so if a curve was needed, the features had to be increased through polynomial regression, and at the cost of feature explosion and scaling. KNN does not assume the shape, but predictions are slow, sensitive to feature size, and it is difficult to explain why the answer was given.

Decision trees take a completely different route. The answer is found by linking Yes/No questions in the same way that humans judge. “Are the petals less than 2.45 cm long? For example, setosa. Or are the petal widths less than 1.75 cm?” It is a supervised learning algorithm that stacks the same if-else branches in a tree shape. The question always has only one shape: “Is feature k ≤ threshold tₖ?”

| characteristic | meaning |
| --- | --- |
| Solve both classification and regression | You can choose a box or put a number on it. |
| It is the basic component of random forest. | A model that collects multiple trees is a random forest. |
| Easy to visualize and interpret | The tree picture itself is a model |
| Regardless of scale | Because a question compares only one feature to a threshold, features of different magnitudes, such as salary and age, are not mixed in one equation. |
| Choose questions with the most information first. | Write the question that most clearly identifies the correct answer (target) first. |

At first glance, you might think, “Isn’t this just classification into a binary tree and regression?” In fact, Scikit-Learn's decision tree is just a binary tree if you look at its appearance. Each node has a question and the branches are always yes/no. However, binary tree is the name of a data structure, and decision tree is the name of the **model** that uses that structure. For a data structure to become a model, three more things must be added.

- **Rules for selecting questions:** The shape of a binary search tree is determined by comparing keys in the order in which data is received. A decision tree calculates and selects the question that provides the clearest answer. This selection process is learning.
- **Answer stored in leaf:** Contains a summary of training samples that arrived in the leaf. For classification, it is the class ratio, and for regression, it is the target average.
- **Stopping Rule:** Decide when to stop sharing. This is the regularization of decision trees.

## Key Terms: Reading Iris Data and Tree Diagrams

This article is explained using iris data from beginning to end. If you don't know the words, the tree picture will only look like a bunch of numbers, so organize them first.

**Data - iris dataset**

- **Iris data set:** This is data measuring the size of 150 iris flowers. It is included in Scikit-Learn, so it can be loaded directly with load\_iris().
- **Sample:** It is a single flower.
- **Features:** There are four: sepal length and width, petal length and width. In the example below, only two of these are used: **petal length and petal width**.
- **Class (Correct Answer):** It is a variety of iris. There are three varieties of 50 flowers each, and they are written as 0, 1, and 2 in the code.
  - **setosa(Setosa, 0):** The petals are very small. It is easy to distinguish because it does not overlap in size with the other two.
  - **versicolor, 1:** Petals are medium sized.
  - **virginica(2):** The petals are the largest. The sizes partially overlap with versicolor, so the two are confusing.

Because of this difference, the tree tries to separate setosa from the first question, and versicolor from virginica from the second question.

**Tree Structure**

- **Node:** It is a box in the tree picture.
- **Root Node:** This is the top box. All training samples start here.
- **Split (inner) node:** "Petal length ≤ 2.45?" It's a box with the same question.
- **Leaf Node:** This is the last box with no questions. Here is the answer.
- **Depth:** This is how many times it descends from the root. The root depth is 0.
- **Partition and Subset:** Dividing a sample of one node into two bundles using a question is partition, and the divided bundles are subsets.
- **Threshold tₖ:** This is the standard number for the question. 2.45 in "petal length ≤ 2.45".

**Numbers in Node Box**

- **samples:** The number of training samples that have come down to this node.
- **value :** The sample is counted by class. The order is \[setosa, versicolor, virginica\].
- **class :** This is the most common class in this node, i.e. the answer you will get if you stop here.
- **gini :** How mixed this node is.

**degree of mixing**

- **Impurity:** This is the degree to which multiple classes are mixed within one node. The more it is mixed, the bigger it becomes.
- **Pure:** Contains only one class. Impurity is 0. \[50, 0, 0\] is pure because it contains only setosa, and \[0, 49, 5\] is not pure because it contains 49 versicolor flowers and 5 virginica flowers mixed together.

## 1. Prediction - follow the question down

![Chapter 5. Decision Trees: Splitting the Feature Space — Figure 2](/images/ai-study/98bd8693884d03854ee2.png)

![Chapter 5. Decision Trees: Splitting the Feature Space — Figure 3](/images/ai-study/f80872daf7392c6a3616.png)

The first question in the tree and the first vertical line in the graph are the same division. Next, the question of width divides the remaining area horizontally. The reason vertical and horizontal boundaries occur is because the threshold value of only one feature is compared at a time. In the figure, the samples used in the gray leaf are the number of training samples that arrived at that leaf, and do not mean that new input will be passed through that number of times.

Let's learn a tree with a depth of 2 using the two petal features and all 150 flowers.

```py
from sklearn.datasets import load_iris
from sklearn.tree import DecisionTreeClassifier

iris = load_iris()
X = iris.data[:, 2:]          # Petal length and width
y = iris.target
tree_clf = DecisionTreeClassifier(max_depth=2)
tree_clf.fit(X, y)
```

The learned tree looks like this.

```txt
[root, depth 0] petal length ≤ 2.45 ?     samples=150, value=[50, 50, 50], gini=0.667
 ├ Example → [leaf, depth 1] samples=50, value=[50, 0, 0], gini=0.0 → setosa
 └ No → [Depth 1] Petal Width ≤ 1.75 ? samples=100, value=[0, 50, 50], gini=0.5
      ├ Example → [leaf, depth 2] samples=54, value=[0, 49, 5], gini=0.168 → versicolor
      └ no → [leaf, depth 2] samples=46, value=[0, 1, 45], gini=0.0425 → virginica
```

Prediction is about answering questions from the root, going down, and producing the class of the leaf you arrive at. A flower with a petal length of 1.4 cm becomes setosa directly from the first question. A flower with a petal length of 5cm and a width of 1.5cm is versicolor because 5 > 2.45 goes to the right, and 1.5 ≤ 1.75 goes to the left.

**You can also calculate probability.** There is a number for each class in the leaf, so if you convert it into a ratio, it becomes probability. The flower above arrived at the \[0, 49, 5\] leaf.

```py
tree_clf.predict_proba([[5, 1.5]])   # [[0.  , 0.907, 0.093]]  = 0/54, 49/54, 5/54
tree_clf.predict([[5, 1.5]])         # [1] → Versicolor with the highest probability
```

Flowers that arrive on the same leaf all receive the same probability, even if they are located in different positions within the leaf.

**The decision boundary is shaped like a step.** If you draw this tree on a plane (petal length on the horizontal axis, petal width on the vertical axis), the question at depth 0 draws a vertical line at petal length 2.45, and the question at depth 1 divides the right side of it with a horizontal line with petal width 1.75. If you increase the depth to 3, more vertical lines will appear in it. Since a question is a line perpendicular to an axis, the boundary is always a staircase made of straight lines perpendicular to the axis. This trait comes back later as a weakness.

Even if max\_depth=2 is the same, if all 4 features are used or only 80% of the data is trained, the questions and numbers may be different from the above tree due to the different data used for learning.

## 2. Impurity - The degree of mixing is expressed in numbers.

A good question is one that brings both parties together as a class after sharing. To do this, you need to measure “how much was mixed” in numbers. There are two scales.

### Gini impurity

```txt
G = 1 − Σ pᵢ² pᵢ = proportion of class i at that node
```

This is the **probability of being wrong** when one sample is randomly selected from a node and a random label is assigned according to the class ratio of that node. Since pᵢ² is “the probability that the selected sample is class i and the label attached is also i,” Σpᵢ² is the probability of being correctly classified into the same class, and subtracting it from 1 becomes the probability of being wrong. Because squares are used, the class with the larger ratio has more influence on the result.

| node | calculation | gini | meaning |
| --- | --- | --- | --- |
| Root \[50, 50, 50\] | 1 − (⅓² + ⅓² + ⅓²) | 0.667 | Three varieties mixed equally |
| setosa leaf \[50, 0, 0\] | 1 − 1² | 0 | pure |
| Depth 1 Right \[0, 50, 50\] | 1 − (0.5² + 0.5²) | 0.5 | The two varieties are half and half. |
| Depth 2 Left \[0, 49, 5\] | 1 − ((49/54)² + (5/54)²) | 0.168 | It's almost versicolor, but it's a little mixed. |

### entropy

```txt
H = −Σ pᵢ log(pᵢ)
```

This is the entropy seen in softmax regression. The average information amount is the weighted average of the information amount −log(pᵢ) by probability, that is, uncertainty. If there is only one class, it is 0, so it is the same as Genie in that “if it is pure, it is 0.” The left node at depth 2 is −(49/54)ln(49/54) − (5/54)ln(5/54) = 0.31 (natural logarithm).

The two measures produce mostly similar trees. Scikit-Learn's default values are gini for DecisionTreeClassifier and MSE for DecisionTreeRegressor. In the latest document, the default regression tree value is 'squared\_error', which is a changed name for mse.

### The impurity of a node and the split scores of its two children are different.

![Chapter 5. Decision Trees: Splitting the Feature Space — Figure 4](/images/ai-study/faf8555f9031f9bf33d5.png)

Gini is the degree to which categories are mixed in one node. CART averages the left and right Gini in proportion to the number of samples after splitting. This is why the question of creating only one very small pure leaf and leaving a large mixed node is not necessarily chosen as a good choice.

When explaining Gini in terms of misclassification probability, it refers to a situation where labels are randomly selected according to the category ratio of nodes. The actual training misclassification rate when predicting from a leaf to a single majority category is 1 − maximum class ratio, which is not the same as Gini. The log base of entropy changes the number units. You should not directly compare the values of approximately 0.31 in the natural log example and the implementation using base 2.

## 3. Training - CART algorithm

Now that we can measure impurity, we can choose a question. Scikit-Learn uses the **CART** (Classification And Regression Tree) algorithm when growing a tree. If a decision tree is the result, CART is the procedure for creating it, and the key question is “How do you choose feature k and threshold tₖ?”

### Procedure for selecting questions

1. **Departure:** Insert all 150 training samples into the root node.
2. **Creating a candidate question:** Sort the values for each feature, and use the **midpoint** of two different neighboring values as a threshold value candidate. In terms of petal length, the maximum value for setosa is 1.9 cm and the minimum value for versicolor is 3.0 cm. The result of dividing by any number is the same, so you only need to look at the midpoint, and the value is (1.9 + 3.0) / 2 =**2.45**. The number 2.45 in the tree above is this number. For the same reason, there are at most "number of different values − 1" candidates per feature, so you can try them all.
3. **Scoring each candidate:** The impurity after dividing for all (k, tₖ) candidates is averaged weighted by the number of samples. This is the **CART cost function** for classification.

```txt
J(k, tₖ) = (m_left / m) × G_left + (m_right / m) × G_right
```

4. **Selecting the best question:** The candidate with the smallest J is selected as the question for this node. The reason for weighting by number of samples is to prevent questions that require a pure sample or two from getting a good score.
5. **Split and Repeat:** Divide into two subsets and do the same thing again in each subset. Subsets of subsets are also divided again.
6. **Stop:** When max\_depth is reached or the impurity does not decrease with further division, the node becomes a leaf.

Calculating from the iris root, "petal length ≤ 2.45" is

```txt
J = (50/150) × 0 + (100/150) × 0.5 = 0.333 (from 0.667 before cutting to half)
```

In the right node "petal width ≤ 1.75" is

```txt
J = (54/100) × 0.168 + (46/100) × 0.0425 ≈ 0.110 (significantly reduced from 0.5)
```

Continuing from the regression section, trees also ultimately minimize the cost function. However, instead of moving θ little by little as in gradient descent, we calculate all finite candidates and immediately select the smallest one.

### Properties of CART

- **Always a binary split:** Since the question is one, "Is ≤ tₖ", there are always two branches. Other tree algorithms, such as ID3 or C4.5, divide one node into multiple branches.
- **Classification and regression are solved using the same procedure:** The only difference is whether gini or MSE is added to J in step 3. This is why the name is Classification **And** Regression Tree.
- **This is a greedy method:** Now J only looks at the smallest question in the node. It doesn't matter whether that choice leads to a better tree two or three steps later. Since the problem of exactly finding the best overall tree is so computationally expensive that it is virtually insoluble, a compromise is made with a "good enough" tree.

### The tree grows as it learns

Looking at this procedure, it can be seen that the decision tree is a structure in which the deeper it is learned and the number of leaves increases. When you call fit, initially there is only one leaf (root) with all the samples. If you divide the leaf into questions, the leaf becomes an internal node and two new leaves are created below it. Each time you divide, the number of leaves increases by one, and the deeper you divide, the deeper it becomes. The above tree was divided twice, resulting in 3 leaves and a depth of 2.

However, “as learning progresses” does not mean that things get better by repeating epochs like gradient descent. Gradient descent keeps changing the value while fixing the number of θ, but the tree does not change the question once it has been decided. The fit is completed by going through the recursion of dividing from the top and dividing each piece again. The finished tree is fixed and does not grow further when making predictions, and when new data is available, it is usually re-trained from the beginning. Scikit-Learn's decision tree does not have sequential learning, such as SGD's partial\_fit.

## 4. Regularization - If you leave it alone, it will memorize everything.

![Chapter 5. Decision Trees: Splitting the Feature Space — Figure 5](/images/ai-study/2206ef517501b387be94.png)

The small island-like area on the left is an area created by dividing a small number of training samples separately. Requiring a minimum number of samples for the leaf reduces these small areas. Pre-pruning is a restriction that stops while building a tree, and post-pruning is a procedure to merge or reduce branches of the tree. Even if the purpose is the same, the timing of operation is different.

CART's stopping condition was "when impurity does not decrease even with further distribution." However, impurity can almost always be reduced until the leaf becomes pure. This is what the saying “If you grow a tree until all the leaves are pure, it is overfitting” is the saying.

Consider the \[0, 49, 5\] leaf. If there is no stopping condition, the tree will try to remove up to 5 virginica flowers and ask "petal length ≤ 4.95?", "petal width ≤ 1.55?" Keep asking the same questions. If you repeat this until all leaves are pure, only one or two samples remain per leaf, and the training accuracy becomes 100%. If those five flowers were measurement errors or exceptional flowers, the tree has created a very narrow area for a single noise, and when a new flower falls into that area, the answer is wrong. If you grow a regression tree with the GDP data of 5 countries without regularization, you cut once at GDP 1.5, 2.5, 3.5, and 4.5, put each country in 5 leaves, and the training MSE becomes 0. The data has been memorized, and is in the same state as K = 1 in KNN.

The tree has an undetermined number of parameters, so it grows as much as the data allows (Section 6). So **the degrees of freedom must be deliberately limited**. There are two ways.

- **Pre-pruning:** Stop early during growth. Limit the maximum depth, number of leaves, and minimum number of samples required for segmentation.
- **Post-pruning:** After growing to the end, delete or merge nodes with few data points.

| parameter | meaning | To count regularization |
| --- | --- | --- |
| max\_depth | maximum depth of tree | reduce |
| max\_leaf\_nodes | Maximum number of leaf nodes | reduce |
| min\_samples\_split | How many samples are needed to split a node? | Raise it |
| min\_samples\_leaf | How many samples is needed to become a leaf? | Raise it |

The more things that start with max\_ are reduced, and the more things that start with min\_ are increased, the stronger the regularization becomes. These are knobs that play the same role as α in the regression section and K in KNN.

If you learn two trees on data that mixes two classes (yellow circles, blue squares) and compare them, you can immediately see the difference. A tree without regularization overfits by creating several narrow bar regions for a single point, and a tree with min\_samples\_leaf=4 has a simpler boundary, resulting in better generalization.

The default values of Scikit-Learn DecisionTreeClassifier are max\_depth=None, min\_samples\_split=2, min\_samples\_leaf=1, max\_leaf\_nodes=None. In other words, **the default setting is without regularization**, so you must set the regularization parameter yourself. ccp\_alpha of the same class is the intensity of post-pruning.

## 5. Regression tree - answers the average of the leaves

![Chapter 5. Decision Trees: Splitting the Feature Space — Figure 6](/images/ai-study/4d41b39b536ed4aa62b3.png)

In the leaves of the regression tree, the average of the correct answer values is stored instead of the number of categories. For example, if x = 0.6 arrives at a leaf with value = 0.1106, predict its average. The MSE of 0.0151 for that leaf's 110 training samples is a different value from the prediction mean itself.

![Chapter 5. Decision Trees: Splitting the Feature Space — Figure 7](/images/ai-study/e6466beae0b8b63530ec.png)

Increasing the depth allows separate averaging over smaller regions, approximating the curve more closely as a step. The same division structure is revealed by colored areas in classification and by the height of stairs in regression.

You can also guess numbers with a tree (DecisionTreeRegressor). The structure and CART procedure remain the same, with only two places changing.

|  | classification tree | regression tree |
| --- | --- | --- |
| Values to reduce when choosing questions | Impurity (gini or entropy) | MSE |
| Leaf's answer | Most Classes (+ Class Probability) | Target average of leaf samples |

**Prediction.** Let's say a sample with x₁ = 0.6 goes down the tree and arrives at a leaf with value = 0.1106. The target average of 110 training samples in that leaf is 0.1106, and that is the predicted value. If you calculate the MSE of 110 samples with this predicted value, it is 0.0151, and this number serves as how scattered the leaves are, that is, impurity in the regression tree. Just as KNN regression averages neighbors, a tree averages samples clustered on the same leaf.

**Code.**

```py
from sklearn.tree import DecisionTreeRegressor
from sklearn.datasets import make_regression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

X, y = make_regression(n_samples=100, n_features=1, noise=0.1, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
regressor = DecisionTreeRegressor(max_depth=2)
regressor.fit(X_train, y_train)
print("MSE:", mean_squared_error(y_test, regressor.predict(X_test)))
```

**Differences depending on depth.** When training two models on the same curve data, max\_depth=2 has 4 leaves, so the prediction is a 4-step staircase and only largely follows the curve. max\_depth=3 has 8 leaves, so the stairs become nicer and adhere more to the curve. Since each leaf has only one value, the prediction is always stair-shaped.

**Training and regularization.** Choose (k, tₖ) to reduce MSE instead of impurity.

```txt
J(k, tₖ) = (m_left / m) × MSE_left + (m_right / m) × MSE_right
```

Without regularization, the regression tree also overfits in the same way. The prediction line of the tree without regularization follows each training point and is jagged like a sawtooth, while the tree with min\_samples\_leaf=10 becomes a smooth staircase. The parameters of DecisionTreeRegressor are the same as the classifier, with the only difference being criterion='squared\_error' (= MSE).

## 6. Decision tree vs linear regression - parametric and non-parametric

If you look at it up to this point, the tree is a model that “memorizes everything if you leave it alone.” Why wasn't the linear model like that? This difference is explained by the distinction between parametric and nonparametric models.

**Parameters** are numbers determined by the model through learning. θ in linear regression is the parameter. Hyperparameters determined by humans, such as K, max\_depth, and learning rate, are not included here. The difference between the two models ultimately lies in whether the shape is determined by a person before learning or whether the shape is determined by the data.

- **Parametric model - Set the frame first and fill in only the numbers:** Linear regression first sets the straight line frame of “Satisfaction = θ₀ + θ₁ × GDP”, and learning fills in only the two θ. Whether there are 5 countries or 50 thousand, θ is 2.
- **Non-parametric model - the data determines the shape:**“Non-parametric” does not mean that there are no parameters, **it means that the number of parameters is not fixed before learning and increases with the data**. In a tree, the number of questions and leaves increases based on the data, and in KNN, the entire training data is a model.

Looking at it this way, the question “Can’t a linear model continue to grow in a straight line?” is resolved. It is true that it moves in a straight line, but that means **choosing a location** within a set frame, not growing. Learning only changes the **value** of θ and the **number** remains the same, so even if the slope and height change, the result is always a straight line. No matter how curved the data is, a straight line cannot be curved. In data from 5 countries, the straight line lasts to the end with 2 θ and does not fall below the training MSE of 0.013, that is, the lack of ability to memorize noise from the beginning means that “assumptions bind the degrees of freedom.” Conversely, the tree had 5 leaves, creating an MSE of 0. The frame of the shape itself has expanded according to the data. The only way to increase the degrees of freedom in a linear model was to have a person determine the features and degree before learning, like in polynomial regression, but the tree makes that decision on its own by looking at the data. Of course, the size of θ can increase like the fourth-order curve of polynomial regression, but that is a case where the degree of freedom has already been increased by increasing the features, and a pure straight line only becomes steeper and does not bend even if θ increases.

|  | parameter model | nonparametric model |
| --- | --- | --- |
| yes | Linear, logistic, softmax regression | decision tree, random forest (and KNN) |
| shape | Assume before learning (straight lines, etc.) | Data decides |
| Number of parameters | Fixed (number of traits + 1, etc.) | It increases as data increases. |
| When data increases | Numbers become more accurate | Models become larger and more complex |
| Training data after learning | No need (compression to θ) | KNN is all you need. The tree leaves a summary in the leaves. |
| basic risk | underfitting (limited degrees of freedom) | overfitting (fitting the training data very closely) |
| Predictions outside the training range | Continuing the trend | I can't do it |

By analogy, the parametric model is ready-made clothes. You just need to match a few size numbers, but if your body type is unusual, it won't fit. Nonparametric models are tailor-made. It can fit any body type, but if it fits too tightly, your posture that day will be reflected in the clothes.

**It cannot predict anything outside the training range.** The last line of the table is clear when looking at the RAM price example. When two models are trained with RAM prices by year, the linear model captures the price falling trend as a straight line and continues it into the future. After the training period ends, the regression tree continues to produce only the last leaf value, so the prediction line stops being flat. Since the tree's answer is always "which leaf it belongs to" and the leaf value is the average of the training samples, it cannot create values in a range that has never been seen. It is not suitable for time series forecasting, which requires plotting trends.

## 7. Instability - two weaknesses of the tree

### sensitive to rotation

![Chapter 5. Decision Trees: Splitting the Feature Space — Figure 8](/images/ai-study/11c29a4c25d6a637cee7.png)

Increasing the size of the input is different from rotating the coordinate axis. Even if you change a feature to a positive multiple, the order of the values is the same, allowing for a similar division, but if you rotate it, the boundary that used to divide into one question may need to be expressed as multiple steps. The property that standardization is not essential should not be extended to mean that it is resistant to rotation.

All partitions are perpendicular to the axis, so the decision boundary is step-like, and it only works well when the data direction is aligned with the axis. Data where two classes are divided by a vertical line ends with one question. However, if the same data is rotated by 45°, the diagonal boundary must be imitated as a staircase, which makes the boundary unnecessarily winding and worsens generalization. The solution is **PCA (Principal Component Analysis)**. Tree performance can be improved by aligning the main direction in which the data spreads with the axis.

### Sensitive to data changes - distribution issues

Even if the training data changes slightly or the hyperparameters change, the tree structure changes significantly. If we remove only one versicolor from the iris data and learn again, the first question, which was originally petal **length** 2.45 (vertical line), changes to petal **width** about 0.8 (horizontal line), and the next question becomes width 1.75.

The reason it fluctuates so much is because CART only chooses the best question at each step. If the root question changes, the entire tree underneath it changes. The change is especially easy in iris roots. In terms of petal width, the maximum value for setosa is 0.6cm and the minimum value for versicolor is 1.0cm, so even “petal width ≤ 0.8” accurately removes 50 setosa flowers. Since the split result is the same as "petal length ≤ 2.45", J is also 0.333, which means the two questions are **tied**. Scikit-Learn checks the features of each node in a random order, so if there is a tie, which one is chosen may vary depending on random\_state (it is an assumption that the result of subtracting one cluster is due to this tie, and has not been directly calculated and confirmed). Either way, the conclusion is the same. In the greedy method, small differences in the roots change the entire tree. This is a typical example of the **large variance** model mentioned in the regression section.

The method to control this shaking is **Random Forest**. Instability is overcome by averaging predictions from many trees.

## 8. Random Forest - average shaking

Random Forest creates tens to hundreds of decision trees and collects the predictions to provide an answer. Classification is majority vote (ScienceLearn averages the probabilities for each tree to select the highest class), and regression is the average of predicted values. If each tree is wrong in a different direction, the errors that are too high in one tree and too low in the other tree are offset in the average and get closer to the correct answer.

Looking at the structure, it is correct to create multiple decision trees independently. The trees are trained separately without knowing each other. But just having multiple doesn’t work. If you run the same CART 100 times with the same data, 100 identical trees will be wrong in the same direction in the same place, and the average will be no different from that of one tree. For averaging to be effective, the errors of the trees must **not** resemble each other, and this relationship is summarized in one equation. If the variance of one tree is σ², the correlation between trees is ρ, and the number of trees is n,

```txt
Variance of mean = ρσ² + (1 − ρ)σ² / n
```

The second term approaches 0 as more trees are created, but the first term ρσ² remains no matter how many trees are increased. If we put σ² = 1 and n = 100, we get

| Correlation between trees ρ | variance of the mean |
| --- | --- |
| 1 (all identical trees) | 1.0 (equal to 1 tree) |
| 0.5 | 0.505 |
| 0.1 | 0.109 |

So what the random forest actually does is make the trees less similar to each other (lower ρ) rather than increasing the number of trees. The “random” in the name is the device, and the randomness comes from two places.

1. **Data is given differently (bootstrap, bagging):** Each tree is trained by selecting m samples from the training set, allowing duplicates. Some flowers are picked two or three times and some are not, so on average only about 63% of the original sample goes into each tree. Previously, when the data changed slightly, the tree changed, but by using that property in reverse, various trees were obtained.
2. **Give different question candidates (random selection of features):** When dividing nodes, the best question is found only among some randomly selected features (usually √ number of features in classification) rather than all features. Without this, the strongest trait takes over the roots of all trees, making the trees similar again.

Because of the second device, the tree in the random forest is not, strictly speaking, an ordinary decision tree. Normal CART looks at all the features and selects the best question, but here it is deliberately limited to selecting questions that may not be the best. The performance of a single tree drops slightly, but the average performance increases as the trees become less similar to each other.

“Independently” is also a criterion that distinguishes random forests from other ensembles. **Boosting**, which will be discussed in the ensemble, creates trees in order, so that the next tree focuses on samples where the previous trees had errors and corrects the errors.

|  | Random Forest (Bagging Series) | boosting |
| --- | --- | --- |
| relationships between trees | They do not know each other (independent and parallel learning possible) | Create the next tree by looking at the errors in the previous tree (sequential) |
| mainly to reduce | Dispersion (shaking) | Bias (lack) |
| individual tree | Grow deeply | make it shallow |

What random forests gain is stability and performance. Variance is greatly reduced, so individual trees grow deeper with weaker regularization. Even if each tree is overfitted, the average erases the fluctuation. The tree's advantages of not requiring scaling and creating non-linear boundaries remain the same. There are three costs. Because it is a vote of hundreds of trees, it cannot be explained as an "attack because of this path" (black box in Section 9), learning and prediction become heavier as the number of trees (they are independent, so they can be run in parallel), and because it is the average of the trees, it still cannot predict outside the training range.

```py
from sklearn.ensemble import RandomForestClassifier

rf = RandomForestClassifier(n_estimators=500,      # number of trees
                            max_features='sqrt',   # Number of features to view per split = √(number of features)
                            random_state=42)
rf.fit(X_train, y_train)
rf.feature_importances_    # Importance of each characteristic
```

The **feature importance** in the last line makes up for some of the weaknesses of the black box. It tells you how much each feature reduces impurity on average across hundreds of trees, so you can see “which traffic features were most used for detection.” However, it still cannot explain why one sample was judged that way.

## 9. White box model vs. black box model

The final remaining question is whether the model can be interpreted by humans.

- **White box model:** It is a decision tree. Because the decision method is intuitive, a person can follow the decision path and explain it, such as "The length of the petal is greater than 2.45 and the width is less than 1.75, so it is versicolor."
- **Black box model:** Random forest, neural network, etc. Although the performance is excellent and the calculation process that creates the prediction can be confirmed, it is difficult to explain **why** the prediction was made. When a neural network determines that there is a person in a photo, it is difficult to know whether it did so by looking at the person's eyes, mouth, nose, or shoes.

The reason why Random Forest is a black box even though it is made of trees is because it is an average of hundreds of trees, so the explanation of following a single path no longer works. The possibility of interpretation is lost in exchange for stability. In security, this difference is practical. When a detection model raises an alert, the analyst must explain “why this is an attack,” and the tree shows the basis directly as a question path.

## Concluding the decision tree unit

If you put it in one line, it looks like this.

1. To avoid the straight line assumption of linear models and the scale problem of KNN, a model that connects questions was created.
2. The question is chosen to reduce **impurity**(Gini, entropy) the most, and the procedure is **CART**.
3. Since it is a **non-parametric model** with no assumptions, it will be memorized if left as is, so **regularization** (pruning) is necessary. The regression tree is the same.
4. Unable to predict outside of training range, **shaken by rotation and data changes**
5. Shaking is handled by **Random Forest**, which creates many less similar trees and averages them, but at the cost of losing the interpretability of **White Box**.

Among these, number 5, the idea of combining multiple models to create a better answer than one leads to ensemble.

## If you understand a tree, you can also see the starting point of the ensemble.

The class ratio of a leaf is the proportion of training data seen in that area. Even if 49/54 was a specific category, there is no guarantee that the ratio will remain the same in all future environments. In case of class imbalance and small leaves, the stability of probability must also be considered separately.

The split order of the tree is a greedy selection that selects the best candidate from the current node. The current best does not guarantee that it is the best of all possible trees. If the data changes slightly, the first division may change and the entire structure below may change. This is linked to the high variance of the trees and is the motivation for combining multiple trees in [ensemble - Chapter 7](/post/ai-foundations-10-ensemble).

Additionally, tree and random forest regressions are not models that continue to extend straight trends outside the observation range. Since leaf averages are combined, reducing variance does not provide extrapolation ability. [scikit-learn decision tree documentation](https://scikit-learn.org/stable/modules/tree.html)
