## What is KNN?

![Chapter 4. KNN: Predicting from Nearby Examples — Figure 1](/images/ai-study/b458fdbdb4849a4033e6.png)

The regression in the previous chapter summarized the entire data into one function. When KNN receives new input, it finds surrounding examples and answers. Both methods attempt to generalize, but they make predictions differently. Since preprocessing, storage, and search structure creation can occur in KNN's fit(), let's understand it as "there is no process of learning weights by differentiating the global loss" rather than "no calculation is performed."

Chapter 3's regression used the same framework for all five branches. Establish a model using weighted sum, determine the cost function, and find θ using gradient descent. When learning is complete, the training data is discarded and only θ is carried around. This is **model-based learning** summarized in Chapter 1.

KNN (K-Nearest Neighbors) is the opposite method. As a representative of Chapter 1's **Case-Based Learning**, **when new data comes in, it finds the K closest ones among the training data and looks at their neighbors to determine the answer.** It is a supervised learning algorithm used for classification and regression. As the lecture says, “Storing the training dataset is the entire process of creating a model,” so there is no θ, cost function, or gradient descent in KNN.

|  | Model-based (linear/logistic regression) | Case-based (KNN) |
| --- | --- | --- |
| When learning | Find θ that reduces the cost function | **Does nothing.** Just saves training data. |
| holding | Parameter θ (number of features + 1) | Training data itself (number of samples × number of features) |
| When predicting | Just put it in θᵀx | Measure the distance from all stored data and find K items that are nearby. |
| data after training | You can throw it away | Must have |

Be precise about what each approach retains. The parameters retained by a model-based method are **weights**, not feature values. In “satisfaction = 4.47 + 0.53 × GDP,” GDP values such as 3.4 and 5 are inputs that vary between samples. The values 4.47 and 0.53 are fixed after training and summarize the feature’s influence: increasing GDP by 1 raises predicted satisfaction by 0.53. A model-based method summarizes this influence instead of retaining the individual feature values. KNN, by contrast, keeps those feature values themselves.

In terms of genealogy, KNN also belongs to **statistical learning** among the three genealogies in Chapter 1. Features are created by humans, and machines estimate boundaries in the feature space. Within the same lineage, regression, decision tree, and SVM find parameters, but KNN uses the data as is, so it is called a **non-parametric** method. It is also a very old method, proposed in 1951 (Fix and Hodges).

However, this does not mean that model-based and case-based were alternately popular in each era. The least squares method was around the same time as the early 1800s, KNN was in 1951, and logistic regression was in 1958. Learning KNN after regression is just an order of learning from the simple things. The two methods are chosen depending on the problem. When there is little data and the boundary shape is unknown, a case-based method that does not assume the function shape is advantageous, and when there is a lot of data and predictions need to be fast, a model-based method that only needs to calculate θᵀx is advantageous. These days, the two are combined, and this structure is vector search and RAG, which converts data into a numeric vector using a neural network (model-based) and then finds the closest example in that space (case-based).

## Prediction: Voting among the K Nearest Neighbors

The prediction method is simple. When a new point arrives, the distance to all stored training points is measured, the K closest points are selected, and the class is determined by **majority decision**. If K = 1, the class of the closest training point is given as is, and if K = 3, the class of the closest 3 points is followed. So, even for the same new point, the answer may vary depending on K. The one training point right next to the new point is class B, but if you look at it a little broadly, there are more class A points. Then K = 1 answers B and K = 3 answers A.

![Chapter 4. KNN: Predicting from Nearby Examples — Figure 2](/images/ai-study/d4b58956895d281579fb.png)

If we look at just one of the closest neighbors of a new point, we follow that point's correct answer. If you look at the three neighbors, the majority category is the answer. If the definition or scale of distance changes, the selected neighbors themselves change, resulting in different predictions from the same data.

### K = 1: Nearest-Neighbor Decision Regions

If K = 1, when a new point is placed at any location on the map, the answer is **the color of the training point closest to that location**. So the "ground" of a training point is **all the points closer to that point than any other training point**, and its range is **right up to the middle of the neighboring training points**. This is because if you cross the middle, the point on the other side gets closer.

If you look at the three dots on a straight line, you can see it right away.

```txt
Position: 0 2 4 7 10
Dots: Blue Red Blue
```

If the new dot is at 1.9, it is 1.9 to 0 and 2.1 to 4, so it is blue. If it is at 2.1, on the contrary, it is red. So 2, which is between 0 and 4, is the boundary, and in the same way, 7, which is between 4 and 10, is also the boundary. In other words, one red dot colors **2 to 7 as its land.** The principle is the same on a plane, so the midlines of neighboring points come together to form the land (polygon) of each point, and the midline between lands of different colors becomes a decision boundary.

In the same data, if K = 3, no matter where the new point comes, all three points are neighbors. Since it is 2 blue to 1 red, **all locations become blue**, and 2\~7 red islands disappear.

The decision boundary picture (K = 1, 3, 9) in the lecture is not a hand-drawn example, but is actually the result of training KNN, running predict for all positions on the screen, and painting it according to the answer. At K = 1, a single red dot in the center of the blue area causes the red area to protrude long like a tongue, and as K = 3 and 9, the tongue disappears and the boundary becomes a single smooth line. This is the same phenomenon as the straight line example above.

## Choosing K - Complexity and overfitting/underfitting

![Chapter 4. KNN: Predicting from Nearby Examples — Figure 3](/images/ai-study/24148503f51f76f56cba.png)

The background color is the predicted category when a new sample arrives at that location. The smaller K is, the more small areas are created around individual training points, and the larger K is, the more gently the boundary tends to be by looking at multiple surrounding points together. Increasing K is not a regularization that penalizes the learned coefficients, but plays a similar role in that it limits the complexity of the prediction rule.

In KNN, the key value that a person must decide is **K, that is, how many neighbors to see**. K is a hyperparameter.

If K is too small, overfitting occurs. If K = 1, only the closest point is followed, but if that point is noise (mislabeled, outlier), it is simply wrong. Conversely, if K is too large, underfitting occurs. In the extreme, if K is set to the total number of data, no matter where a new point arrives, its neighbors will be the same as the "whole data", making it a constant function that answers only the most abundant class everywhere. Usually K is chosen as an odd number. This is because when there are two classes and K = 4, there can be a 2 to 2 tie. The Scikit-Learn default value is 5.

The lecture summarizes this as “If you use fewer neighbors, the complexity of the model increases, and if you use more neighbors, the complexity decreases.” At first glance, it feels like the opposite. This is because if you look at fewer neighbors, the calculations will be fewer and simpler. However, complexity here is not the amount of calculation, but **how diverse and detailed the shapes the function can draw** are. K = 1 means that each training point has its own area, so if there are 100 points, there are actually 100 areas, and the boundary is bent at each point. K has only one total data sleeping area. In statistics, the actual degree of freedom of KNN is roughly considered to be “number of data ÷ K” (this is a generally known result and is not included in the lecture material). Moreover, the amount of calculation has little to do with K. This is because the distance to all stored points is measured the same whenever K is predicted, whether it is 1 or 9.

| handle | direction of complexity | Direction toward simplicity |
| --- | --- | --- |
| polynomial regression | raise the order | lower the order |
| KNN | **Reduce K** | **Raise K** |

So, the higher the complexity, the more diverse the situation can be, so is it a more general-purpose model? Not so. Complexity (the number of shapes that can be contained) and versatility (fitting well with data seen for the first time) are different stories. Training data contains a mixture of real patterns and noise, and the model has no way to distinguish between the two, so if the expressive power is large, even the noise is included.

Let's say that in the straight line example above, in reality, the entire section was blue and the red part 4 was noise. For K = 1, the new data coming into the section 2\~7 is **all wrong**. Even if you leave the noise points as they are, they are already wrong. K = 3 makes only one training point wrong and all new data are correct. So, "If you delete one point, the result changes significantly" is a **symptom** of the problem, and the real problem is that **the model's answer is influenced by individual training points and noise mixed in them**. This is what “large variance” means in the regression section. By analogy, K = 1 is a student who memorized all the answers to past exams, even the typos, and an appropriate K is a student who looked at the past exams and selected solution rules for each type.

However, **if the data is sufficiently large and clean**, high expressiveness wins. If the points near the border are dense, the space occupied by a single noise point becomes very small, and a small K can follow the complex real border in detail. It is the same principle as summarized in Chapter 1, “For a large model to work well, data, regularization, and calculations must increase together.”

### How Accuracy Changes with K

![Chapter 4. KNN: Predicting from Nearby Examples — Figure 4](/images/ai-study/dfe1338e893bd854051f.png)

The horizontal axis is K, and the further to the right you go, the simpler the model usually becomes. The direction of the horizontal axis may be opposite to that of a typical “model complexity” graph. The best K is chosen by repeatedly looking at the test curve and using cross-validation or validation sets within the training rather than being uneven.

In the lecture's concept graph, the horizontal axis represents model complexity. As training accuracy becomes more complex, it continues to increase and reaches 1, and new data accuracy increases along with it and then drops at a certain point. The left end is underfitting (both are low), the right end is overfitting (only training is high), and the top with the highest new data accuracy is the **Sweet spot**.

In the actual KNN graph, the horizontal axis is K(1\~10), so **the larger K becomes, the simpler it becomes.** So it looks like the conceptual graph has been flipped left and right.

| K | training accuracy | test accuracy | status |
| --- | --- | --- | --- |
| 1 | 1.00 | approximately 0.90 | overfitting (memorizing training data) |
| near 6 | About 0.95 | About 0.94 (highest) | suitable |
| 10 | approximately 0.94 | approximately 0.92 | It gets simpler and tests start to fail. |

(Numbers are values read by eye on the graph.) The reason the training accuracy of K = 1 is 1.00 is because each point in the training data is its own nearest neighbor, so it is unconditionally correct. Therefore, K should be selected not as training accuracy but as **the value with the highest verification accuracy**.

### Overfitting and underfitting again

Let us clearly distinguish between the two states here. Overfitting works well on training data, but does not work on new data. Underfitting is often misunderstood as “not working well with other data,” but in reality, it is a condition of poor fit **even on the training data itself**. Underfitting can be seen as “the state of not being able to solve practice problems because you studied too little,” and overfitting can be seen as “the state of not being able to solve new problems because you only memorized the answers to practice problems.”

|  | Training data performance | New data performance | meaning |
| --- | --- | --- | --- |
| overfitting | very high | lowness | I memorized the training data, even the noise. |
| suitable | height | height | learned the pattern |
| underfitting | **Low** | lowness | The model was so simple that I couldn't even figure out the pattern. |

There are four main causes of underfitting, and each has a set solution.

| cause | yes | solved |
| --- | --- | --- |
| The model is too simple | It's a curve, but a straight line is used. K is too large in KNN. | More complex models (raising order, reducing K, trees/neural networks) |
| lack of character | Trying to measure satisfaction with GDP alone | Adding or creating new relevant features (feature engineering) |
| regularization is too strong | α is too large so the weight is pushed to 0 | Reduce α |
| I learned less | gradient descent stops before bottom | Learn longer or adjust the learning rate |

“Gather more data,” which is effective in correcting overfitting, is useless for underfitting. This is because the model has no power and cannot learn more even if more data is given. Ultimately, overfitting and underfitting are a matter of turning the same knob in opposite directions.

| handle | If it is overfitting | If it's underfitting |
| --- | --- | --- |
| Model complexity (order, 1/K) | lower it | raise it up |
| regularization α | Raise it | reduce |
| features | Remove useless things | Add something useful |
| data amount | increase | no effect |

So how do I know if my model is underfitting? The key is **whether the performance is low even in the training data**, and “low” can only be judged if there is a comparison target. The first comparison we will look at is the **mindless baseline model**. For classification, “always answer with the most class,” and for regression, “always answer with the average value.” In MNIST in Chapter 2, the idiot classifier that always answered “not 5” had an accuracy of 91%. So, if the training accuracy of my model is 90% on the same data, it is worse than the idiot reference model and is definitely underfitting. In other words, whether the score is low is always judged by comparing it to the reference model.

Next, look at the training scores and validation scores side by side. If both are low and the difference is small, it is underfitting. If only training is high and the difference is large, it is overfitting. It is also a good idea to draw with varying complexity, like the K graph above. If you make the model a little more complex and both the training and validation scores go up, it means that the original model was underfitting. In regression, the shape of the error (prediction − correct answer) is also a clue. It's okay if the errors are scattered around 0 without a pattern, but if you see a pattern such as the predictions are always small at both ends and always large in the middle, the model has missed the pattern, as if it were using a straight line when it is actually a curve.

Let’s take another look at regularization, which prevents overfitting. Regularization does not prevent the system from being able to keep up with the noise after learning, nor does it mean learning the noise first and then correcting it through additional learning. **There is a penalty point in the cost function from the first step**, preventing the model from reaching θ that follows the noise in the first place. If you look at it like a mountain, when there is no regularization, the bottom of the mountain is at the "big weight that adjusts all the noise" location. If you add a penalty term (the lowest bowl shape when the weight is 0), **the bottom position itself is moved to the side with the smaller weight.** Gradient descent receives the two forces of "bend to match at least one more point" (MSE) and "reduce the weight toward 0" (penalty) at each step, and stops where the two are balanced. Noise is present in the data from beginning to end, but to match one noise, the weight must be greatly increased, so it does not follow because it is a loss. When learning is finished, the penalty disappears and only θᵀx is calculated for prediction. Early termination is closer to the idea of “stop learning at the point when you start to memorize the noise.”

## View in Code - Scikit-Learn KNN Classification

This code runs KNN classification from beginning to end using iris data. The order is the same as the regression section (data → separation → scaling → learning → prediction → evaluation).

```py
from sklearn.datasets import load_iris    # This line is missing from the lecture code
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score

X, y = load_iris().data, load_iris().target
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y)

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)   # Grab and convert mean/standard deviation with training data
X_test = scaler.transform(X_test)         # The test only converts based on that standard.

knn = KNeighborsClassifier(n_neighbors=5)
knn.fit(X_train, y_train)                 # Save training data
y_pred = knn.predict(X_test)              # Distance calculation for each test sample, majority vote with 5 closest
accuracy = accuracy_score(y_test, y_pred)
```

stratify=y equalizes the variety ratio for training/testing, so that three varieties of 50 flowers each are included in the 30 test flowers, with 10 flowers each. The lecture notes next to StandardScaler say, "KNN is a distance-based model, so normalization is essential," but what the code does is exactly standardization to set the mean to 0 and standard deviation to 1. In gradient descent, learning becomes slower when the scale is different, but in KNN **the answer itself is wrong** (see an example in the pros and cons below). And fit is learning to find θ in regression, but in KNN, all it does is save, so all the actual work is done in predict.

The options in the Scikit-Learn document contain the names of the concepts learned so far.

| options | default | meaning |
| --- | --- | --- |
| n\_neighbors | 5 | K |
| weights | 'uniform' | Should you count your neighbors' votes equally (uniformly) or give larger votes to your closest neighbors as the reciprocal of the distance (distance)? |
| algorithm | 'auto' | **How to find** nearby neighbors (brute, kd\_tree, ball\_tree) |
| p | 2 | 1 is the Manhattan distance, 2 is the Euclidean distance. |
| metric | 'minkowski' | Types of distance formulas (write Minkowski distance with p) |
| n\_jobs | None | How many CPUs will parallelize the neighbor finder (-1 is all) |

The fact that the algorithm and n\_jobs are separate shows the weakness of KNN. This is because finding neighbors is slow when making predictions. After learning, there are classes\_, n\_features\_in\_, n\_samples\_fit\_, etc., but there is no such thing as regression's coef\_(θ). Because no parameters were found. score(X, y) returns accuracy in classification. train\_test\_split, which divides data, receives test\_size (test ratio, 0.25 if nothing is given), random\_state (seed for reproduction), shuffle (shuffle before splitting, default True), and stratify (maintains the ratio of this value on both sides).

## KNN regression - average instead of majority vote

KNN can also be used in regression to guess numbers. All you have to do is take the average **of the K nearby** correct answer numbers. It's not about counting "how many dots are close." Let's predict the satisfaction level of a new country with a GDP of 3.4 using the GDP data from Chapter 1.

| country | GDP | satisfaction | Distance to 3.4 |
| --- | --- | --- | --- |
| A | 1 | 5.0 | 2.4 |
| B | 2 | 5.5 | 1.4 |
| C | 3 | 6.0 | 0.4 |
| D | 4 | 6.8 | 0.6 |
| E | 5 | 7.0 | 1.6 |

If K = 2, choose C, D (6.0 + 6.8) / 2 = **6.4**, if K = 3, choose C, D, B (6.0 + 6.8 + 5.5) / 3 =**6.1**. In the case of security, if the three most similar to the new flow among the past traffic that the analyst scored risk scores at are 70, 80, and 90, the new flow is predicted to have a score of 80.

If we go one step further, we get the idea that “the closer our neighbors are, the more similar they are to us, so let’s give them more weight.” That's weights='distance'.

| neighbor | distance | target value | weight (1/distance) |
| --- | --- | --- | --- |
| A | 1 | 10 | 1 |
| B | 2 | 20 | 0.5 |
| C | 4 | 40 | 0.25 |

If it is just an average (uniform), it is (10 + 20 + 40) / 3 = 23.3, but if it is distance weighted (distance), it gravitates toward the value of A that is closer to it, as (10×1 + 20×0.5 + 40×0.25) / (1 + 0.5 + 0.25) = 30 / 1.75 = 17.1. The lecture's example of California housing prices uses KNeighborsRegressor(n\_neighbors=5, weights='distance').

Regression results are evaluated by MSE and **R² (coefficient of determination)** instead of accuracy.

```txt
R² = 1 − (sum of squares of prediction error of the model) / (sum of squares of error when predicting with only the average)
```

The denominator is the error of the idiot standard model that “always answers with the average” mentioned earlier. So R² shows “how much better it is than the baseline model.” If it is 1, it is perfect, if it is 0, it is like taking an average, and if it is less than 0, it is worse than average. The score() of the Scikit-Learn regression model returns this R².

The MSE used here has the same formula as the MSE in the regression section, but its role is different. The cost function is a general concept that expresses “how wrong the model is with one number,” and MSE is just one of them (MSE for linear/multinomial regression, MSE + penalty for Ridge/Lasso, log loss for Logistic, and cross entropy for Softmax). However, KNN does not have a cost reduction process when learning, so there is no cost function at all, and the mean\_squared\_error in this code was used to **evaluate** the completed model on test data. In other words, the same MSE is the evaluation indicator here.

Cost function and evaluation indicator both measure “how wrong” something is, but their uses are different.

|  | cost function | evaluation indicators |
| --- | --- | --- |
| Who writes it? | Learning algorithm (gradient descent) | person |
| when | Every step while learning | After learning is over |
| from what data | training data | Verification/test data |
| purpose | Decide which direction to move θ | Determine if the model is usable |
| condition | **Must be differentiable** | It just needs to be easy for people to understand |

The reason why accuracy is not used as a cost function clearly shows this difference. Even if you move θ very slightly, if no samples exceed the baseline, the accuracy remains the same, but if it exceeds it, it suddenly changes like a step. The gradient is zero almost everywhere, so gradient descent has no direction. Logarithmic loss changes smoothly when θ moves slightly, providing direction. In other words, the **cost function is a smooth proxy score that learning can follow**, and the real goal is the evaluation indicator.

Lastly, looking at the regression results according to K, the prediction line of KNN regression has a **staircase shape** as the value changes rapidly at each point where the neighborhood changes, and just as seen in classification, K distinguishes between overfitting and underfitting.

| K | shape | Training R² | Test R² | status |
| --- | --- | --- | --- | --- |
| 1 | A jagged line passing through every point one by one. | 1.00 | 0.35 | overfitting |
| 3 | Follow the flow and be less jagged | 0.82 | 0.83 | suitable |
| 9 | Very gentle, missing details | 0.73 | 0.65 | underfitting side |

![Chapter 4. KNN: Predicting from Nearby Examples — Figure 5](/images/ai-study/f91a5fb137b8ae9130af.png)

Because regression uses the average of nearby correct answers, predictions can vary like steps as neighbors change. As K increases, more points are included in the average, but if it is too large, local changes are buried. Smoothing classification boundaries and stabilizing regression step heights come from the same neighbor joining rule.

## pros and cons

The two important parameters in KNN are the number of neighbors K and the distance measurement method. The advantage is that it is simple and easy to understand, and does not require learning, so you can make predictions as soon as you input data, and you only need to save it when adding new data.

Instead, the price is clear. First, **prediction is slow.** Each time a prediction is made, the distance to all stored samples must be measured, so if there are 1 million samples and 100 features, the prediction is calculated about 100 million times at a time. Second, the entire training data must be held, so **uses a lot of memory.** Third, **preprocessing is important.** If the scale is not adjusted in A (annual salary 3,000, age 25), B (3,100, 60), and C (5,000, 26), the A-B distance is about 106 and A-C is about 2,000, so B, who is 35 years older than A, is the oldest person in A. Become close neighbors. This is because salaries with large numbers take up almost all of the distance. Fourth, it is the **curse of dimensionality** summarized in Chapter 1. As the number of features increases, the distance between all points becomes similar, blurring the concept of "closest neighbors."

## How to measure distance

![Chapter 4. KNN: Predicting from Nearby Examples — Figure 6](/images/ai-study/273ddedea31983c10501.png)

Manhattan distance adds the absolute value of the movement amount for each coordinate. If the difference between two points is (3, 4), the Manhattan distance is 7, and the Euclidean distance is 5, which is the length of a straight line. Cosine similarity compares the direction rather than the length of the vector, and when using this as a distance, the value is usually 1 minus the similarity. You must first decide what expressions are considered similar.

You can also choose how you measure “close.” Let's compare the two points A(1, 1) and B(4, 5).

**Manhattan Distance** is \|4 − 1\| + \|5 − 1\| = 3 + 4 =**7**. In a checkerboard city, when you cannot cross buildings, the distance is walked only horizontally and vertically, so even if the turning order is different, if the horizontal and vertical distances are the same, the distance in Manhattan is the same.**Euclidean distance** is √((4 − 1)² + (5 − 1)²) = √(9 + 16) =**5**, which is the straight line distance (Pythagorean) connecting two points and is the default value of Scikit-Learn KNN.

The general formula that connects the two is **Minkowski distance**, and p in Scikit-Learn is this. If p = 1, it becomes Manhattan, and if p = 2, it becomes Euclidean. Manhattan does not square the difference, so it is less affected by outliers that differ significantly in only one characteristic. And **cosine similarity** only looks at how similar the **directions** of two points are and ignores the size. It is often used when expressing text by word frequency, because the word ratio (direction) of long and short documents is similar if the topic is the same.

## How to quickly find neighbors - kd-tree

The algorithm option is to alleviate the “slow prediction” aspect of the pros and cons. This is not about changing the model, but about choosing a **method to quickly find the nearest neighbor**. Regardless of the method, the neighbors found are the same, only the speed is different. brute measures the distance to all stored points.

kd\_tree searches by narrowing down the section. If the points are sorted in one dimension, the section is narrowed in half by binary search, and even 1 million items can reach the neighborhood in about 20 times, but kd-tree expands this to multiple dimensions. When fitting, the space is cut in half by the median value of the first feature, each half is cut by the median value of the second feature, and so on, cutting the axes alternately and saving them as a tree. When a new point arrives, it repeats along the tree, "Is it left or right on this axis?" and goes down to a small section to find the closest candidate. If the distance to the border with the next section is longer than the distance to the current candidate, that section is skipped entirely.

This idea of “discarding areas that are inevitably farther than the best distance found so far” is the same as **Closest Pair of Points** in algorithm classes. Closest Pair is a divide-and-conquer (O(n log n)) method that divides the points in half by sorting them by However, the problem to be solved is different.

|  | Closest Pair of Points | Find neighbors in KNN |
| --- | --- | --- |
| question | Which pair of points is closest to each other in the set of points? | What are the K training points closest to the **new point**? |
| number of times | Solve it once and you're done | Repeat every time a new dot appears |
| way | Divide and conquer from the beginning every time | Divide and store the space once in advance (kd-tree) and reuse it for each question. |

Since KNN continues to ask questions about the same training data, it reuses the tree once divided rather than splitting it every time. Although Scikit-Learn KNN does not use the Closest Pair algorithm itself, it implements the same principle with kd-tree.

kd-tree also has limitations. As the number of traits increases, there are almost no sections to skip due to the curse of dimensionality, which ultimately makes it similar to a brute. ball\_tree bundles the space into a ball shape instead of a box, making it a little more durable in high dimensions, and the default value, auto, automatically selects among the three based on the data.

## Concluding the KNN unit

KNN is a model created with the idea that “close things have similar answers.” There is no learning and it is easy to understand, but prediction is slow, the entire data must be carried, and it is sensitive to scale and dimension. And the way it goes back and forth between overfitting and underfitting with just K most clearly shows the same principles (bias/variance tradeoff) as the order/regularization of the regression unit.

## Select K including preprocessing

The standardization mean and standard deviation are also values determined from the data. Normalizing the entire data before cross-validation allows the statistics of the validation fragment to be trained. If the preprocessing and model are tied together in a pipeline as shown below, the scale is learned only in each training piece.

```py
from sklearn.datasets import load_iris
from sklearn.model_selection import GridSearchCV, train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)
pipeline = make_pipeline(StandardScaler(), KNeighborsClassifier())
search = GridSearchCV(
    pipeline,
    {"kneighborsclassifier__n_neighbors": [1, 3, 5, 7, 9]},
    cv=5,
    scoring="accuracy",
)
search.fit(X_train, y_train)
print(search.best_params_)
print(search.score(X_test, y_test))
```

An odd K reduces ties on a simple majority vote in two categories, but ties are still possible when there are more than three categories or when distance-weighted voting is used. Since KNN finds neighbors for each sample, the cost can increase when there is a lot of training data or the dimensionality is high. kd-tree and Ball Tree are data structures that help with searching, but they are not guaranteed to be fast on all high-dimensional data. [scikit-learn neighborhood-based learning documentation](https://scikit-learn.org/stable/modules/neighbors.html)

KNN repeated the search for nearby cases each time. Next, [decision tree - Chapter 5](/post/ai-foundations-07-decision-trees) divides the space into questions during training, and only follows the path of one question during prediction.
