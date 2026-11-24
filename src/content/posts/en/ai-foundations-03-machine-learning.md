## Introduction

At the center of machine learning is the goal of **learning relationships from data we have seen so far and applying those relationships to data we have not yet seen**. Learning here does not mean getting rid of all the code that people used. People determine data representation, model structure, learning criteria, and evaluation methods. Within that framework, specific judgment rules are determined using data.

![Chapter 1. What Is Machine Learning? — Figure 1](/images/ai-study/0e820fd77c408b199759.png)

The top is learning to create a model, and the bottom is inference using the model. In supervised learning, input and the correct answer are used together, but in unsupervised learning, the correct answer is not given. What is saved as learning results also differs for each model. Linear regression stores weights and biases, decision trees store questions and branching structures, and KNN stores information needed for training examples and neighbor search.

Even if we use the same log as an example, things change depending on the question. “Is it an attack?” is classification, and “How much will be transmitted in the future?” is regression. Asking “What actions are similar to each other?” without an answer is clustering. If you separate the learning method and type of problem, you can see the location of the subsequent chapters.

## Definition

: Traditional programming was “human-written rules + data → answer.”

Supervised learning can be summarized as “data + correct answer → rule”. Throughout machine learning, there are ways to find structure without an answer or to learn behavior with rewards. In other words, rules are created through data, and people are not rules, but examples are given so that they can create rules.

In this way, people can attempt to make decisions tailored to the data even in problems where it is difficult to directly write rules for all cases.

## The Goal of Machine Learning

: The goal is to get the correct answer from new data that has never been seen before. Memorizing training data is not the goal.

Learning of many models can be viewed from three perspectives: model, learning criteria, and optimization. However, there are also methods that do not repeatedly minimize the global loss, like KNN.

| algorithm | ① Model (what shape is the function) | ② Loss (how wrong you were) | ③ Optimization (how to reduce loss) |
| --- | --- | --- | --- |
| Linear regression (Chapter 3) | Straight line θ₀ + θ₁x | Mean Square Error (MSE) | normal equation or gradient descent |
| SVM (Chapter 6) | hyperplane wᵀx + b, curved into the kernel | Hinge Loss + Maximize Margin | Convex optimization (the local optimal solution is the global optimal solution, and uniqueness of the solution is a separate condition) |
| decision tree (Chapter 5) | A tree that connects questions | Gini impurity or entropy | Greedily picking the best questions in every installment |
| Deep Learning (Chapter 8\~) | Layered nonlinear functions | cross entropy, etc. | backpropagation + stochastic gradient descent |

Looking at the history of AI, there is a division seen as a competition between three answers to “how to create intelligence.” Techniques to be studied in the future can also be placed on this map.

| genealogy | key answer | representative technique | lecture |
| --- | --- | --- | --- |
| **symbolic AI** (Symbolic AI) | People write down knowledge as rules | Expert system, signature-based IDS | Not covered (replaced by machine learning) |
| **statistical learning** | Estimate boundaries or functions from data. Features are created by people | regression, KNN, decision tree, SVM, ensemble | 2\~Chapter 7 |
| **connectionism** (Connectionism) | A network that mimics neurons even learns its own features | Perceptron, backpropagation, CNN, RNN, Transformer | 8, 10\~Chapter 14 |

In the above distinction, statistical learning and connectionism enter machine learning.

**Functions and the process of creating them**

- Model: A function or rule structure that converts input into output. The structure is determined before learning, and after learning, it is used with the values determined by the data. It is a function itself that produces output when input is input. For example, “packet features → attack/normal”.

- Learning Algorithm: This is the process of looking at data and creating a function.

- machine learning: This is a field that studies and designs this process.

Typically, you declare a function when coding. A function is a process of input → function → output, and at this time, the function, which can be seen as a rule, is defined by a person.

What's special about machine learning is that the functions are created from data, rather than created by humans.

Now you know roughly what machine learning is.

Looking at scikit-learn's two methods, the difference between the process of creating and using a model becomes clearer.

```py
model = SVC(kernel="rbf", C=1.0, gamma=0.1) # Deciding what process to make
model.fit(X_train, y_train) # Process: Create a function with data (=learning)
model.predict(X_new) # Result: Use the created function (= inference)
```

**Concept Summary**

- Parameter: A number created through the above process. For example, w and b in SVM, and θ₀ and θ₁ in linear regression. The process determines.\
→ When we select a model, the 7B parameters mean that there are a lot of values in the model, but there is a difference between having a large number of parameters and having a large parameter value.
  1. Large number of parameters = large model

This is what you mean when you say something like “70B model.”

  - **Meaning:** This means that there are many values that can create rules. In other words, the shapes that a function can have become more diverse, allowing complex patterns to be created. This means that the range of functions that can be expressed can be expanded. Actual performance also depends on structure, data, learning method, and amount of computation.
  - **Good point:** It catches patterns that simple models cannot structurally catch. Underfitting is reduced (solution “Robust model with more parameters” in Chapter 1, slide 24).
  - **Problem 1 - overfitting:** If there are too many parameters compared to the data, it will cause noise. If 10 points are passed through a 10th degree polynomial, the training error is 0, but the curve fluctuates greatly between the points (Runge phenomenon, Chapter 1 slide 21). This is what von Neumann meant when he said, “With 4 parameters you can draw an elephant, and with 5 parameters you can wiggle its trunk.”
  - **Problem 2 - Cost:** If there are many parameters, more data is needed to learn, and it takes more computation and memory. Predictions are also slower.
  - **Problem 3 - Interpretation:** If there are two parameters, it can be read as “If GDP increases by 1, satisfaction increases by θ₁.” If there are hundreds of millions, it is difficult to read why such a decision was made.

But why are large neural networks so good these days?

- **Classical expectation:** If there are more parameters than data, overfitting is required. That's why large neural networks were doubted in the 1990s, and this is one of the reasons why SVM won at that time.

- **What is actually observed:** Large neural networks often generalize well even when the parameters are much larger than the data. It has also been reported that when the model is increased further, the error increases once and then decreases again (double descent, Belkin et al. 2019). But the reason why is still not fully explained.

- **Condition:** Data, regularization (Dropout, weight decay), and computation must scale with model size. Just raising the model is not effective. The scaling law is the observation that performance increases predictably when model size, data amount, and calculation amount are increased together. This is why LLM has become so big.

  2. Large parameter value = large weight number

  - **Meaning:** If the weight is large, even a small change in the input will result in a large change in the output. The function becomes sharper and more sensitive.
  - **Why it's bad:** Sensitive functions are prone to bending to fit every noise in the training data. That is, a sign of overfitting.
  - Solution - regularization: Add “penalties for larger weights” to the loss.

- Ridge regression (L2): penalizes weighted sums of squares.

- Lasso regression (L1): Penalizes the weighted absolute value sum. Some weights become completely 0, which also has a feature selection effect.

- Weight decay in neural networks: Same idea.

  - Connection with SVM
    - SVM is a model whose objective function includes regularization that keeps the weights small from the beginning. This is why SVM is strong on new data.

## Supervised Learning

- Definition: The correct answer is attached to all training data. The model learns a function that gives an input and returns the correct answer.

- Security: Classification of known malware families, determination of phishing URLs, intrusion detection of known attack types

- Two types:

- Classification: guess one of the designated categories. Example: attack/normal, malware family name
- regression: Guess the number. Example: Risk Score

- In the lecture: Regression, KNN, decision tree, SVM, and ensemble in Chapter 2\~Chapter 7 are all supervised learning.

- Problem 1 - Labels are expensive: The answer is put by people. In security, an experienced analyst must look through each log or file, which takes a lot of time and money.

- Problem 2 - You don't know what you haven't seen: Types of attacks (zero days) that were not in the training data are easy to miss because they do not fit into any class.

## Unsupervised Learning

- Definition: No label at all. Rather than guessing the correct answer, we look for hidden structures in the data.

- Security: Anomaly detection (unusual logins, traffic), discovery of new families by grouping new malware samples by behavior, reducing analyst burden by summarizing bulk logs into clusters

- Problem solved: Used when labeling is not possible or when you want to know what the data looks like before labeling it.

- main task

- Clustering: Grouping similar things together. Example: Grouping malware samples into groups with similar behavior
- Dimensionality reduction: Compress hundreds of features into a few axes. Example: visualization, noise removal
- Anomaly detection: Learn what normal looks like and then look for “something that isn’t normal.” Example: Login at a different time or amount than usual

- Why it's important for security: Anomaly detection works even without attack labels. So even attacks you have never seen before can be caught because they are “different from normal.” This method targets problem 2 of supervised learning.

- Problem 1 - Difficult evaluation: Since there is no right answer, it is difficult to check with numbers whether “it was tied well”.

- Problem 2 - Interpretation is up to the human: the model doesn't tell us what cluster 3 means.

- Problem 3 - Just because it’s strange doesn’t mean it’s an attack: Deploying new services, working overtime, and backing up are also “not the same as usual.” So there are a lot of false positives.

### A group found without an answer is not an attack type.

![Chapter 1. What Is Machine Learning? — Figure 2](/images/ai-study/614df7ee0c6b9c14f260.png)

Clustering finds a shape in which data that is close to each other is naturally grouped together. The horizontal and vertical axes are two input features, and nearby points are grouped into the same group. Here, the group number is a temporary division assigned by the model. Calling a group “malicious” requires separate analysis.

![Chapter 1. What Is Machine Learning? — Figure 3](/images/ai-study/ef3b092a4ac3cb0f0295.png)

Anomaly detection finds new points that are far away from the area where normal data is collected. While clustering asks about the structure of several groups, anomaly detection mainly asks about the degree of deviation from the norm. You can create scores without the labels of attack and normal, but new normal operations can also seem strange. Ideal score and attack judgment are not the same thing.

## semi-supervised learning

- Definition: When there is a little labeled data and a lot of unlabeled data, the two are used together for supervised learning.
- Security: Out of 10,000 alerts, only 100 were judged by analysts, and only a portion of the millions of binaries collected were analyzed.
- Problem solved: Supervised learning requires a lot of labels (cost), and unsupervised learning does not provide the correct answer (goal). Semi-supervised learning fills the gap.
- How to do one - two representative methods:

- Label propagation after clustering: First, unsupervised grouping, human labeling only a few items in each group, and then spreading to all the same groupings. The photo app groups faces by person, and when the user gives a name to one photo, that name is added to the entire group.

- Self-training: Create a model with labeled data and retrain it by attaching a temporary correct answer (pseudo label) to unlabeled data that the model is confident about. Repeat this process.

- Premise: The assumption is that “close data has the same correct answer.” When this assumption is broken, incorrect labels spread.
- In security: A typical structure is where analysts judge only 100 out of 10,000 alerts, and the model uses the remaining 9,900 for learning based on those decisions.
- Problem - Errors are amplified. If the initial model gives an incorrect pseudo-label, it re-learns from that error and becomes increasingly confident that it is wrong. This is especially dangerous if the attacker mixes in samples that are disguised to look normal.

![Chapter 1. What Is Machine Learning? — Figure 4](/images/ai-study/6c6d1f33775b48ffd58f.png)

In the semi-supervised learning picture, only some points have labels and most do not have correct answers. The lack of name tags is supplemented by using the structure that suggests that nearby data will have the same answer. Since there is no guarantee that all labels will be automatically and accurately restored, the quality of the initially applied labels and the distribution of unlabeled data are important.

### Reinforcement learning uses the consequences of an action instead of the correct answer.

In reinforcement learning, the agent selects an action based on the state of the environment and receives a reward as a result. An agent is a subject who chooses an action, and the reward is a number that evaluates the result of that action. The goal is to increase the sum of rewards gained over time rather than just one immediate reward. It is different from supervised learning in which a correct action is attached to every input.

For example, an automatic defense system can choose between allowing, additionally authenticating, or blocking access. The benefits of preventing attacks and the costs of preventing normal users may be revealed later. Therefore, it is necessary to distinguish between the general classification of “guessing the attack/normal label” and problems in which the outcome changes depending on the action.

## Case-based learning

- Definition: Memorize the training data as is. When new data comes, we find the most similar case and follow that answer.

- When learning: doing almost nothing. Just save the data. That is why it is also called “lazy learning.”

- When making predictions: Calculate the distance (similarity) between new data and stored data to find the closest cases.

- Key Tool - Similarity: This is a method of measuring “how similar things are” in numbers. Example: Euclidean distance, Manhattan distance

- Example: When predicting the satisfaction level of a country with a GDP of 3.4, the satisfaction levels of 6.0 and 6.8 of the two countries with the closest GDP (3 and 4) are averaged to arrive at 6.4.

- From the lecture: Chapter 4 KNN is the representative. The spam example on Slide 12 is a method of judging that “if there are many words in common with known spam emails, it is spam.”

- Problem 1 - Predictions are slow. Each time a prediction is made, it must be compared with all stored data.

- Problem 2 – You don’t know what’s out of bounds. Even if input is outside the range of the training data, only the answer from the nearest end case is followed.

- Problem 3 - When there are many features, “close” becomes blurred. As the dimension increases, the distance between all points becomes similar, making it less meaningful to select close neighbors (the curse of dimensionality).

## model-based learning

- Definition: The relationship between input and output in training data is created as a function (model). When new data comes, it is put into the function and the answer is calculated.

- When learning: Determine the shape of the function (e.g. a straight line) and find the parameter that makes the cost function smallest. This process is an optimization like gradient descent that we learned earlier.

- When predicting: Just input the input into the learned function. The data can be discarded.

- Key tools - model and cost function: Decide what shape of function to use and how wrong the function is.

- Example: Obtain the straight line “Satisfaction = 4.47 + 0.53 x GDP” using data from five countries. If you add GDP 3.4, it is about 6.27. From now on, you only need two numbers (4.47, 0.53).

- From the lecture: “Life satisfaction = θ₀ + θ₁ × GDP per capita” on slides 13\~14 is this example. Chapter 3 regression, Chapter 5 decision tree, Chapter 6 SVM, and neural networks from Chapter 8 are all model-based.

- Problem 1- If you choose the wrong shape, it is wrong. The actual relationship is a curve, but if you choose a straight line, no matter how much you study, it will not fit (underfitting).

- Problem 2 - Retraining is required to reflect new data. When data is added, the function must be found again.

To briefly explain the dimension mentioned above, “Dimension = the number of features that describe one piece of data.

| characteristic | dimension | A look at data | Looking at the picture |
| --- | --- | --- | --- |
| GDP | 1 | (3.4) | point on a straight line |
| GDP, working hours | 2 | (3.4, 40) | point on the plane |
| GDP, working hours, life expectancy | 3 | (3.4, 40, 82) | point in three-dimensional space |
| 100 features | 100 | (3.4, 40, 82, …) | Can't draw, but calculations are the same |

**Network flow data:** Dozens\~hundreds of features such as packet count, byte count, duration, port, flag, etc. → tens\~hundreds of dimensions

As in the example above, most real data are high-dimensional.

## What is cost function?

Cost function = A single number that indicates how wrong the model was in the training data.

Learning is the process of finding the parameter that makes this number the smallest.

**example**

Let’s compare two straight lines with the five GDP-satisfaction data mentioned earlier.

- **Straight A:** Satisfaction = 4.47 + 0.53 × GDP
- **Line B:** Satisfaction = 5.0 + 0.3 × GDP

| GDP | actual | A's prediction | Error in A² | B's prediction | Error of B² |
| --- | --- | --- | --- | --- | --- |
| 1 | 5.0 | 5.00 | 0.0000 | 5.3 | 0.09 |
| 2 | 5.5 | 5.53 | 0.0009 | 5.6 | 0.01 |
| 3 | 6.0 | 6.06 | 0.0036 | 5.9 | 0.01 |
| 4 | 6.8 | 6.59 | 0.0441 | 6.2 | 0.36 |
| 5 | 7.0 | 7.12 | 0.0144 | 6.5 | 0.25 |
| **Mean (MSE)** |  |  | **0.0126** |  | **0.144** |

The cost of A is about 11 times less than B. So A is a better straight line. Gradient descent finds a straight line like A by continuously moving θ₀ and θ₁ in the direction where this cost decreases.

## Machine Learning Sequence and Precautions for Failure

**Workflow Step 5**

1. Data collection: Gather materials for learning.
2. Data analysis: Identify the features of data through exploration and visualization. We only look at the training set. By previewing the test set, people unconsciously make choices tailored to the test data (data snooping).
3. Model selection: Determine the shape of the function. Example: straight line (linear regression), decision tree
4. Training: Find parameters that minimize the cost function.
5. Inference: Apply to new data to make predictions. Only when it matches well here can it be said to be “generalized.”

There are two points of failure in this flow.

- The material (data) is bad or
- When the model (algorithm) does not fit the data

---

### Failure Cause 1 - Bad Data
1. Insufficient amount of data (graph of importance of data compared to algorithm)

![Chapter 1. What Is Machine Learning? — Figure 5](/images/ai-study/7c824997b49ded24873a.png)

- When there is little data (left), the accuracy varies greatly for each algorithm, at 0.75 \~ 0.83.
- As data increases, all algorithms improve.
- When there is a lot of data (right), the three algorithms converge to around 0.96. This means that increasing data made a bigger difference than choosing an algorithm.

→ “Memory-based” is the case-based learning we learned earlier. When there was the least amount of data, it was first, but as the data increased, it came in last place.

2. **Non-representative data**

- Representativeness: The training data must closely resemble the new data that will actually be predicted.

- Sampling noise: The sample is small and therefore biased by chance. It decreases as more data is collected.

- Sampling bias: It is systematically biased due to the wrong selection method. No matter how much data you collect, it never disappears.

- Example - Opinion poll: In the 1936 US presidential election, a magazine predicted the outcome of the election with approximately 2.4 million responses, but was wrong. This is because the survey subjects were drawn from phone books and magazine subscriber lists and were biased towards the wealthy.

- Security example: If you learn only from attack traffic collected in the lab, you will get a lot of false positives in front of various normal traffic in the real network.

3. **Low quality data**

- Problem: If there are errors, outliers, and noise mixed in, the model learns from them.
- Outliers: Obvious outliers are removed or corrected directly.
- Missing values: When some samples are missing a characteristic, you have four options.

- Discard a feature: When a feature is missing from most samples

- Discard samples: When missing samples are few

- Fill in values: Fill in with the average or median value.

- Compare two models: Learn and compare the model with the features included and the model without the features separately.

4. **Irrelevant features**

- Garbage in, garbage out: Useless input produces useless results. As we saw earlier, irrelevant features only increase the dimensionality and ruin the distance calculation.
- Solution 1 - Select features: Choose only the useful features among the existing features.
- Solution 2 - Feature extraction: Combine features to create more useful features. Example: Dimensionality Reduction (PCA)
- Solution 3 - Collect new data: Create a new feature containing the necessary information.

### Failure Cause 2 - Bad Algorithm

1. **overfitting (Overfitting)**

- Definition: A model fits the training data too well, but does not fit the new data well.

- Cause: The model is too complex compared to the amount of noise in the data.

- Graph: This is the result of matching GDP and satisfaction for each country using a high-order polynomial.

![Chapter 1. What Is Machine Learning? — Figure 6](/images/ai-study/cdfbfa9b809c640f44be.png)

The curve passes almost all of the training points, but fluctuates significantly between them. On the right (after GDP 55,000) it spikes up and down. If you add a new country to this model, the satisfaction level will come out with strange values, such as negative numbers or hundreds. This is because I even memorized the noise.

- Solution: Simplify the model, reduce the number of features, collect more data, reduce noise, and regularization.

2. **regularization (Regularization)**

- Definition: Putting restrictions on learning to prevent the model from becoming too complex. For example, “penalty points if the slope is large” are added to the cost function.

- How to read the graph:

![Chapter 1. What Is Machine Learning? — Figure 7](/images/ai-study/d309210bc7e562a9954e.png)

- Blue circles: Countries used in study.
- Red squares: Countries excluded from study. It serves as new data.
- Dashed line (some data, no regularization): steeper slope, only fitting the blue circle. The distance from the red square is large.
- Solid line (some data + regularization): Same data, but the slope is prevented from increasing. Therefore, it is closer to the line (dashed line) of the entire data, including the red square.

- Conclusion: With regularization, it fits the training data a little less, but fits the new data better.

- Hyperparameter: This is a value that the person sets before learning to determine how hard regularization is applied. It does not change during learning. If you hang too hard, the straight line will become almost flat, resulting in underfitting.

3. **Underfitting**

- Definition: A state in which the model is too simple to capture the structure of the data.
- Example: Actual satisfaction is intertwined with many factors other than GDP, but this is the case when trying to explain it with only one straight line, GDP.
- Solution: Use a model with more parameters, add better features, and weaken regularization.

### Distinguish between overfitting and underfitting
|  | Training data performance | New data (validation) performance | cause | solution direction |
| --- | --- | --- | --- | --- |
| underfitting | lowness | lowness | Model is too simple | Complicate the model, weaken regularization |
| adequacy | height | height | — | — |
| overfitting | very high | lowness | Model is too complex | Simplify the model, strengthen regularization, and add data |

### Complex curves don't mean you learned better

![Chapter 1. What Is Machine Learning? — Figure 8](/images/ai-study/150f0da0b9e451f15aa8.png)

Even if the curve passes close to the training points, it may fluctuate significantly between points and outside the observation range. The purpose of finding the correct answer for new data and the purpose of passing a point that has already been seen are different. Making the model more complex only increases the number of functions that can be expressed, and selecting the relationships that are actually needed requires both data and regularization.

![Chapter 1. What Is Machine Learning? — Figure 9](/images/ai-study/49a70f30da97bd3039dd.png)

Regularization changes the learning criterion to favor less complex solutions among all representable functions. It is also important to expand the scope of data. If a straight line created by looking only at poor countries is extended to rich countries, there is no guarantee that it will fit well in the new range even if regularization is applied.

## Testing and Verification

![Chapter 1. What Is Machine Learning? — Figure 10](/images/ai-study/8125bfd5e72b4c65dad2.png)

The most important boundary here is between **values learned** and **information left only for the final evaluation**. Preprocessing to calculate the mean and standard deviation is also included in learning. The transformation determined in the training data is applied to the verification and test data. Performance can be inflated if very similar records from the same user or process are split between two, so consider the unit in which the data was created and the time order. [Cross-validation explanation in scikit-learn](https://scikit-learn.org/stable/modules/cross_validation.html)

During the testing and validation phase, data should be divided into three chunks.

### three sets of roles

| set | What to do | metaphor |
| --- | --- | --- |
| **Training Set** | Learn the parameters of the model | textbook practice problems |
| **Validation Set** (Development Set) | Compare multiple models and hyperparameters to choose the best one | Mock test (for choosing a study method) |
| **Test Set** | After selecting them all, use them only once at the end to estimate actual performance. | CSAT |

**Generalization error**

- Definition: This is the rate at which the model is incorrect in new samples seen for the first time. Also called out-of-sample error.
- The purpose of the test set: to estimate this value before field deployment.
- Useful for diagnosis: If the training error is low but the generalization error is high, it is overfitting.

### cross validation

What was the problem: Separating the validation set resulted in two losses.

- Training data is reduced. As much as it is removed for verification purposes, it cannot be used for learning.
- Verification scores become unstable. If the validation set is small, the score fluctuates greatly depending on which samples are included. The model you pick on a lucky split may actually be bad.

**Solution - Verify in turns.**

For example, with 1,000 pieces of data,

1. First, set aside 200 test sets. Cross-validation does not touch these 200.
2. Divide the remaining 800 training sets into 5 pieces (160 pieces each).
3. Spin five times. Each time, one piece is used for verification, and the remaining four pieces (640 pieces) are used for training.

```py
Round 1: [Verification] [Training] [Training] [Training] [Training]
Round 2: [Training] [Verification] [Training] [Training] [Training]
Round 3: [Training] [Training] [Verification] [Training] [Training]
Round 4: [Training] [Training] [Training] [Verification] [Training]
Round 5: [Training] [Training] [Training] [Training] [Verification]
```

4. Average the five scores. Since all samples were used for verification once, the score is more stable than when measured with a single verification set. This average is obtained for each hyperparameter candidate and the best one is selected.
5. The final model is retrained using all 800 selected hyperparameters. Even the data that was left out for verification purposes is returned to learning.
6. Measure the generalization error once with 200 test sets.\
→ Cost: Learning has to be done k times (5 times in the example above), so it takes k times the calculation time.

## scikit-learn

**Definition:** It is an open source library that allows you to use classical machine learning (regression, KNN, decision tree, SVM, ensemble, etc.) in Python. Deep learning uses Keras, TensorFlow, and PyTorch.

Three APIs - All algorithms use the same method name.

| role | method | What to do | yes |
| --- | --- | --- | --- |
| **Estimator** | fit(data) | Learn parameters from data | All models and preprocessors |
| **Predictor** | predict(new\_data) | Predict the correct answer with the trained model | KNeighborsClassifier, SVC |
| **Transformer** | transform(new\_data) | Transform and return data | StandardScaler (scale), PCA (dimension reduction) |

- Advantage: The method name is unified, so even if you change KNeighborsClassifier to SVC, the rest of the code can be left as is.
- fit\_transform(data): Learn and transform at once. However, it is only used for training data. Only the transform() of the transformer learned from the training data is applied to the test data. When fitted with test data, test information leaks into learning. (Data snooping seen earlier)

**Example code**/

```py
X, y = iris_dataset['data'], iris_dataset['target']      # Features and answers (150 flowers)
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=0)  # Training/Test Separation (default 75%/25%)
model = KNeighborsClassifier(n_neighbors=1)               # Select model (follow the closest one)
model.fit(X_train, y_train)                               # Training (KNN effectively saves)
model.predict(X_new)                                      # 1 new flower predicted
model.score(X_test, y_test)                               # test accuracy
```

- random\_state = 0: This is a seed to reproduce random division identically every time.
- Two lines of accuracy: np.mean(y\_p == y\_test) (directly calculates the proportion correct) and model.score(X\_test, y\_test) are the same value. The score of a classification model basically returns accuracy.
- This code is the same workflow as we learned earlier (data → separation → model selection → training → inference → evaluation).

## Anaconda

**Definition:** This is a distribution that installs Python and data science packages (Numpy, pandas, scikit-learn, etc.) at once.

- Why use it: When you install packages one by one, version conflicts often occur. Anaconda bundles proven combinations and allows you to create an independent environment for each project (conda environment management).
- Navigator: A GUI that manages the environment and packages with a click.

**Where you run the code**

| equipment | execution location | characteristic |
| --- | --- | --- |
| **Jupyter Notebook** | my computer | In the browser, code, execution results, graphs, and explanatory text are mixed into one document. Included in Anaconda |
| **Google Colab** | google cloud server | It is a cloud version of Jupyter. No installation is required, and GPU and TPU can be used for free, making it convenient for deep learning practice. Files are saved to Google Drive |

To summarize, you set up an environment with Anaconda, write code in Jupyter or Colab, and create a model with Scikit-Learn within that code.

## When Generalization Becomes Really Difficult: Switching Operating Systems

Even if it is new data that has not been seen in training, the level of difficulty is not the same. Matching the next log in the same environment is different from transferring a detector learned in Linux to Windows. The environment in which data is created like this is called a domain. When the domain is different, the same attack action is recorded with different words and structures.

A system call in Linux is an interface through which a program requests a function from the operating system kernel. The order of calls such as open, read, write, and execve shows the behavior. Windows Sysmon log records process creation, network connection, file activity, etc. through EventID and attribute fields. execve and process creation EventID 1 represent related actions, but their recording units and semantic scope are not exactly the same.

The system that analyzes this activity inside the host is called HIDS, or host-based intrusion detection system. The generalization of this system includes not only expressing words similarly, but also maintaining standards for distinguishing attacks even when the environment changes.

### What does zero shot prohibit in this case?

Here, zero shot is **a setting that applies a detector without additional learning or selecting a reference with the labels of the target environment**. Distinct from traditional zero-shot classification that uses descriptions of new classes, this case is closer to a source-only domain transfer evaluation. Source is the starting environment used for development, and Target is the target environment to be moved to.

![Chapter 1. What Is Machine Learning? — Figure 11](/images/ai-study/b3cf4d5cad30c9f426c6.png)

Prepare feature transformation and classifier with training data from source, and select threshold value with source verification data. Target fixes these values. Target answers are used only for final performance evaluation and post-analysis. Even further adaptation without the target's label differs from the strict source-only conditions in this case. A distinction must be made between using a fixed encoder that has already been pre-trained and fine-tuning it with target data.

### Convert logarithms into numeric vectors of the same shape

A vector is a list of characteristic numbers in a certain order. Embedding is an expression that converts input such as text into such a vector. Here we compare three expressions.

| expression | What makes a number | Important limitations when moving |
| --- | --- | --- |
| TF-IDF | Frequency of occurrence in a document and rarity in the entire document | It is difficult to express target words that are not in the source. |
| Word2Vec | Context in which a word appears with surrounding words | It is influenced by the learning corpus and environment, and processing of unregistered words is also necessary. |
| BGE-M3 | Semantic text representation created by pre-trained encoder | Even if the same vector space is used, operating system differences do not automatically disappear. |

Direct encodes the entire log sequence at once to create one vector. Sequence-Mean encodes each window by moving 64-token windows overlapping at 32-token intervals. A token is a unit that divides and processes text. The vectors in each window are L2 normalized to have a length of 1 and then averaged. No normalization is applied again to the last average vector. Therefore, even if the two methods are the same encoder, the direction and size of the vector and the method of collecting long context are different.

NUM expresses system calls as numeric identifiers, and NAME expresses them as names. The same number code does not mean the same as the meaning of the operating system's actions. Changing the name does not necessarily improve transfer, so comparisons must be made through experiments.

![Chapter 1. What Is Machine Learning? — Figure 12](/images/ai-study/6ae48703efa5fab4257d.png)

Logistic Regression or Linear SVM is placed after the feature vector. The first part is “How to express logs,” and the second part is “What boundaries are learned with that expression.” From this structure, you can see where the logistic regression in Chapter 3 and the SVM in Chapter 6 fit into the actual security system.

DeepLog's sequence prediction, LogAnomaly's semantic and quantitative information, LogRobust's unstable log processing, and LogBERT's Transformer expression are also approaches to dealing with log anomaly detection. On the other hand, CroSysLog's small target label/meta learning, LogAction's active learning, and FusionLog's use of unlabeled targets differ in the information used, so they cannot be treated under the same conditions as source-only experiments. Meta-learning is learning how to adapt to new problems from multiple learning problems, and active learning is a method in which the model selects data to ask a human to judge.

### Fix the data and evaluation conditions first.

| dataset | unit of data | entire | normal | attack | attack rate |
| --- | --- | --- | --- | --- | --- |
| ADFA-LD | Linux system call sequence | 5,951 | 5,205 | 746 | 12.54% |
| LMD-2023 | Process-related sequences in Windows Sysmon | 16,956 | 13,325 | 3,631 | 21.41% |

In LMD-2023, if there is more than one attack event in the sequence, it is marked as an attack. Internal experiments in the same environment train at about 80% and test at 20%. For transfer experiments, the Source is divided into 80% training and 20% validation, and the entire Target is used only for the final transfer evaluation. It repeats with five random seeds, and in LMD-2023, the same process group and the same text are separated so that they do not overlap in both learning and evaluation.

The numbers from the experiments below are the results for this data configuration and evaluation conditions. This is not a performance value that is directly applied to all operating system logs. The ± notation in the table remains the summary value of the replicate experiments provided. The calculations and differences between precision·recall·F1·ROC·PR are explained later in [Classification - Chapter 2](/post/ai-foundations-04-classification).

### It works well in the same environment, but why does it fall apart in a different environment?

Within ADFA-LD, the PR indices of BGE-M3 Sequence-Mean and LR are 0.888, and F1 is 0.822. Inside LMD-2023, the PR indices of BGE-M3 Direct and LR are 0.995, and F1 is 0.969. The result is that students can learn well in both environments.

### Full results of ADFA-LD internal assessment

| Method | PR\_AUC | F1 | ROC\_AUC | Precision | Recall |
| --- | --- | --- | --- | --- | --- |
| TF-IDF + LR | 0.808 ± 0.028 | 0.694 ± 0.027 | 0.964 ± 0.006 | 0.552 ± 0.034 | 0.937 ± 0.017 |
| TF-IDF + Linear SVM | 0.736 ± 0.031 | 0.769 ± 0.028 | 0.932 ± 0.013 | 0.745 ± 0.037 | 0.796 ± 0.023 |
| Word2Vec + LR | 0.751 ± 0.016 | 0.685 ± 0.021 | 0.955 ± 0.010 | 0.542 ± 0.026 | 0.932 ± 0.017 |
| Word2Vec + Linear SVM | 0.764 ± 0.011 | 0.706 ± 0.018 | 0.961 ± 0.010 | 0.561 ± 0.024 | 0.953 ± 0.018 |
| BGE-M3 Direct + LR | 0.879 ± 0.019 | 0.815 ± 0.014 | 0.978 ± 0.004 | 0.741 ± 0.014 | 0.907 ± 0.026 |
| BGE-M3 Direct + Linear SVM | 0.872 ± 0.020 | 0.812 ± 0.011 | 0.970 ± 0.006 | 0.781 ± 0.019 | 0.846 ± 0.030 |
| BGE-M3 Sequence-Mean  + LR | 0.888 ± 0.023 | 0.822 ± 0.011 | 0.971 ± 0.009 | 0.743 ± 0.030 | 0.922 ± 0.022 |
| BGE-M3 Sequence-Mean  + Linear SVM | 0.863 ± 0.015 | 0.834 ± 0.017 | 0.965 ± 0.013 | 0.785 ± 0.028 | 0.891 ± 0.032 |

### Full results of the LMD-2023 internal evaluation

| Method | PR\_AUC | F1 | ROC\_AUC | Precision | Recall |
| --- | --- | --- | --- | --- | --- |
| TF-IDF + LR | 0.976 ± 0.009 | 0.917 ± 0.015 | 0.991 ± 0.003 | 0.904 ± 0.019 | 0.931 ± 0.019 |
| TF-IDF + Linear SVM | 0.980 ± 0.012 | 0.936 ± 0.033 | 0.990 ± 0.007 | 0.907 ± 0.058 | 0.969 ± 0.011 |
| Word2Vec + LR | 0.991 ± 0.006 | 0.956 ± 0.021 | 0.997 ± 0.002 | 0.937 ± 0.042 | 0.977 ± 0.020 |
| Word2Vec + Linear SVM | 0.985 ± 0.027 | 0.971 ± 0.021 | 0.997 ± 0.004 | 0.958 ± 0.048 | 0.985 ± 0.012 |
| BGE-M3 Direct + LR | 0.995 ± 0.001 | 0.969 ± 0.013 | 0.998 ± 0.000 | 0.959 ± 0.035 | 0.981 ± 0.013 |
| BGE-M3 Direct + Linear SVM | 0.995 ± 0.002 | 0.982 ± 0.008 | 0.998 ± 0.001 | 0.979 ± 0.022 | 0.984 ± 0.010 |
| BGE-M3 Sequence-Mean  + LR | 0.987 ± 0.021 | 0.968 ± 0.020 | 0.997 ± 0.004 | 0.950 ± 0.042 | 0.987 ± 0.006 |
| BGE-M3 Sequence-Mean  + Linear SVM | 0.994 ± 0.002 | 0.971 ± 0.016 | 0.998 ± 0.001 | 0.955 ± 0.034 | 0.987 ± 0.010 |

However, when NAME·Direct·LR is moved from ADFA to LMD, the PR index is 0.153, F1 is 0.055, and F1 in the opposite direction is 0.026. If you use Sequence-Mean under the same NAME conditions, the F1 from ADFA to LMD increases to 0.344, but in the opposite direction it stays at 0.027. The effect varies depending on direction and expression conditions.

### Full results of two-way zero-shot transition

| Variant | Rep. | Direction | Clf. | PR\_AUC | F1 | ROC\_AUC | Precision | Recall |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| NAME | TF-IDF | ADFA → LMD | LR | 0.214 ± 0.000 | 0.000 ± 0.000 | 0.500 ± 0.000 | 0.000 ± 0.000 | 0.000 ± 0.000 |
| NAME | TF-IDF | ADFA → LMD | SVM | 0.214 ± 0.000 | 0.000 ± 0.000 | 0.500 ± 0.000 | 0.000 ± 0.000 | 0.000 ± 0.000 |
| NAME | TF-IDF | LMD →  ADFA | LR | 0.128 ± 0.004 | 0.140 ± 0.122 | 0.490 ± 0.033 | 0.081 ± 0.066 | 0.597 ± 0.539 |
| NAME | TF-IDF | LMD →  ADFA | SVM | 0.124 ± 0.001 | 0.006 ± 0.009 | 0.478 ± 0.018 | 0.010 ± 0.014 | 0.005 ± 0.006 |
| NAME | Direct | ADFA → LMD | LR | 0.153 ± 0.014 | 0.055 ± 0.026 | 0.329 ± 0.066 | 0.048 ± 0.019 | 0.066 ± 0.039 |
| NAME | Direct | ADFA → LMD | SVM | 0.150 ± 0.016 | 0.109 ± 0.054 | 0.307 ± 0.078 | 0.084 ± 0.031 | 0.179 ± 0.133 |
| NAME | Direct | LMD →  ADFA | LR | 0.077 ± 0.002 | 0.026 ± 0.012 | 0.230 ± 0.024 | 0.025 ± 0.004 | 0.038 ± 0.033 |
| NAME | Direct | LMD →  ADFA | SVM | 0.082 ± 0.004 | 0.025 ± 0.019 | 0.275 ± 0.037 | 0.036 ± 0.023 | 0.021 ± 0.017 |
| NAME | SeqMean | ADFA → LMD | LR | 0.237 ± 0.035 | 0.344 ± 0.067 | 0.583 ± 0.057 | 0.252 ± 0.033 | 0.572 ± 0.198 |
| NAME | SeqMean | ADFA → LMD | SVM | 0.240 ± 0.043 | 0.386 ± 0.010 | 0.579 ± 0.074 | 0.240 ± 0.009 | 0.981 ± 0.022 |
| NAME | SeqMean | LMD →  ADFA | LR | 0.110 ± 0.008 | 0.027 ± 0.020 | 0.398 ± 0.032 | 0.084 ± 0.042 | 0.016 ± 0.012 |
| NAME | SeqMean | LMD →  ADFA | SVM | 0.135 ± 0.016 | 0.064 ± 0.050 | 0.515 ± 0.058 | 0.102 ± 0.042 | 0.056 ± 0.052 |
| NUM | TF-IDF | ADFA → LMD | LR | 0.215 ± 0.000 | 0.000 ± 0.000 | 0.501 ± 0.000 | 0.000 ± 0.000 | 0.000 ± 0.000 |
| NUM | TF-IDF | ADFA → LMD | SVM | 0.215 ± 0.000 | 0.000 ± 0.000 | 0.501 ± 0.000 | 0.050 ± 0.112 | 0.000 ± 0.000 |
| NUM | TF-IDF | LMD →  ADFA | LR | 0.239 ± 0.010 | 0.254 ± 0.220 | 0.696 ± 0.014 | 0.223 ± 0.164 | 0.321 ± 0.286 |
| NUM | TF-IDF | LMD →  ADFA | SVM | 0.231 ± 0.012 | 0.006 ± 0.012 | 0.678 ± 0.010 | 0.020 ± 0.045 | 0.003 ± 0.007 |
| NUM | Direct | ADFA → LMD | LR | 0.362 ± 0.042 | 0.441 ± 0.063 | 0.759 ± 0.047 | 0.287 ± 0.056 | 0.975 ± 0.026 |
| NUM | Direct | ADFA → LMD | SVM | 0.309 ± 0.045 | 0.384 ± 0.156 | 0.704 ± 0.053 | 0.281 ± 0.090 | 0.708 ± 0.362 |
| NUM | Direct | LMD →  ADFA | LR | 0.170 ± 0.034 | 0.178 ± 0.109 | 0.520 ± 0.054 | 0.185 ± 0.094 | 0.323 ± 0.233 |
| NUM | Direct | LMD →  ADFA | SVM | 0.217 ± 0.039 | 0.240 ± 0.084 | 0.576 ± 0.053 | 0.257 ± 0.122 | 0.282 ± 0.119 |
| NUM | SeqMean | ADFA → LMD | LR | 0.274 ± 0.075 | 0.149 ± 0.155 | 0.630 ± 0.072 | 0.159 ± 0.129 | 0.149 ± 0.181 |
| NUM | SeqMean | ADFA → LMD | SVM | 0.202 ± 0.039 | 0.117 ± 0.140 | 0.499 ± 0.091 | 0.114 ± 0.109 | 0.134 ± 0.195 |
| NUM | SeqMean | LMD →  ADFA | LR | 0.235 ± 0.044 | 0.314 ± 0.089 | 0.697 ± 0.054 | 0.242 ± 0.074 | 0.543 ± 0.248 |
| NUM | SeqMean | LMD →  ADFA | SVM | 0.217 ± 0.053 | 0.246 ± 0.017 | 0.670 ± 0.084 | 0.149 ± 0.022 | 0.820 ± 0.234 |

A comparison in which only one component is changed and the rest are fixed is called ablation, or element-by-element comparison experiment. By comparing Direct and Sequence-Mean, NUM and NAME, and LR and SVM in this way, you can isolate which changes came with what results. Just because things get better in one direction doesn't mean that the change is always advantageous.

### Comparison of Direct and Sequence-Mean

| Direction | Representation | PR-AUC | F1 | ROC-AUC |
| --- | --- | --- | --- | --- |
| ADFA → LMD | Direct | 0.153 ± 0.014 | 0.055 ± 0.026 | 0.329 ± 0.066 |
| ADFA → LMD | SeqMean | 0.237 ± 0.035 | 0.344 ± 0.067 | 0.583 ± 0.057 |
| LMD → ADFA | Direct | 0.077 ± 0.002 | 0.026 ± 0.012 | 0.230 ± 0.024 |
| LMD → ADFA | SeqMean | 0.110 ± 0.008 | 0.027 ± 0.020 | 0.398 ± 0.032 |

### Comparing NUM and NAME

| Direction | Variant | PR-AUC | F1 | ROC-AUC |
| --- | --- | --- | --- | --- |
| ADFA → LMD | NUM | 0.274 ± 0.075 | 0.149 ± 0.155 | 0.630 ± 0.072 |
| ADFA → LMD | NAME | 0.237 ± 0.035 | 0.344 ± 0.067 | 0.583 ± 0.057 |
| LMD → ADFA | NUM | 0.235 ± 0.044 | 0.314 ± 0.089 | 0.697 ± 0.054 |
| LMD → ADFA | NAME | 0.110 ± 0.008 | 0.027 ± 0.020 | 0.398 ± 0.032 |

### Comparison of LR and Linear SVM

| Direction | Classifier | PR-AUC | F1 | ROC-AUC |
| --- | --- | --- | --- | --- |
| ADFA → LMD | LR | 0.237 ± 0.035 | 0.344 ± 0.067 | 0.583 ± 0.057 |
| ADFA → LMD | Linear SVM | 0.240 ± 0.043 | 0.386 ± 0.010 | 0.579 ± 0.074 |
| LMD → ADFA | LR | 0.110 ± 0.008 | 0.027 ± 0.020 | 0.398 ± 0.032 |
| LMD → ADFA | Linear SVM | 0.135 ± 0.016 | 0.064 ± 0.050 | 0.515 ± 0.058 |

### Even though it is in the same embedding space, it does not have the same distribution.

When we created a separate linear classifier to guess which operating system was using only the normal logs, the accuracy, balance accuracy, and ROC-AUC for both Direct and Sequence-Mean were 1.000. Balance accuracy is the average of each class recall. This means that in this experiment, the two environments were very easily distinguished using only normal data. Just because the expression was created by the same encoder does not mean that the expression has lost its domain information.

![Chapter 1. What Is Machine Learning? — Figure 13](/images/ai-study/0e45ded0530a607ef2fc.png)

t-SNE is a visualization that examines neighbor relationships by arranging high-dimensional vectors in two dimensions. This figure, which selects up to 1,000 items from each class, is supplementary data for examining differences in distribution. The actual detection performance is not judged solely based on the impression that something appears close or far away in 2D.

### There is a difference between guessing the rank of an attack and raising an alarm.

If the model gives an attack a higher-than-normal score, the ranking may be good. However, if the baseline selected from the source deviates from the target score range, all can be judged as normal or all as attacks. So, we check the expression transition and the decision threshold transition separately.

![Chapter 1. What Is Machine Learning? — Figure 14](/images/ai-study/02bfa29da21d832c7e4e.png)

![Chapter 1. What Is Machine Learning? — Figure 15](/images/ai-study/1475339c418751ef985d.png)

Default is the basic threshold of the classifier, Source-F1 is the threshold with the largest source verification F1, and Source-FPR5 is the threshold set to target a false positive rate of 5% in source verification. Just because it was 5% at Source does not mean it is 5% at Target. Target-Oracle is the criterion that created the largest F1 after the fact with the target correct answer. It is a comparative value used to diagnose how much room for improvement there is, and cannot be used for strict zero-shot operations.

The ROC-AUC and PR metrics summarize ranking information across multiple thresholds, and F1 evaluates the actual decision at the chosen threshold. Additionally, the value written PR-AUC(AP) in the table refers to the summary method called AP. The definition of the trapezoidal area of the AP and PR curves is different, so the numbers are not always the same.

### Didn't you memorize the collection environment instead of attacking?

In LMD-2023, the SplunkUniversalForwarder string appeared in 23.88% of attack samples and 0.03% of normal samples. The proportion of exactly 2,000 tokens in length also differed: 15.45% for attack and 9.99% for normal. This difference may be a trace of collection and pre-processing rather than the attack itself. The model can also learn this shortcut.

Even if Splunk-related samples were excluded, Direct+LR's PR index remained high at 0.993 and F1's at 0.960. Some conditions, except for the 2,000 token sample, were increased further. However, since the sample composition and attack rate change together, it cannot be interpreted that the filter causally improved performance.

### Overall results by data subgroup

| Representation | Subset | Mean Test N | Attack (%) | PR-AUC | F1 |
| --- | --- | --- | --- | --- | --- |
| Splunk-only + LR | ALL | 3,391.0 | 21.41 | 0.411 ± 0.034 | 0.401 ± 0.054 |
| Direct + LR | ALL | 3,391.0 | 21.41 | 0.995 ± 0.001 | 0.969 ± 0.013 |
| Direct + LR | SplunkAbsent | 3,207.0 | 16.93 | 0.993 ± 0.001 | 0.960 ± 0.015 |
| Direct + LR | SplunkAbsent-Short | 2,895.2 | 17.47 | 0.997 ± 0.002 | 0.980 ± 0.007 |
| Sequence-Mean + LR | ALL | 3,391.0 | 21.41 | 0.987 ± 0.021 | 0.968 ± 0.020 |
| Sequence-Mean + LR | SplunkAbsent | 3,207.0 | 16.93 | 0.979 ± 0.039 | 0.959 ± 0.024 |
| Sequence-Mean + LR | SplunkAbsent-Short | 2,895.2 | 17.47 | 0.997 ± 0.001 | 0.986 ± 0.003 |

### If you guess the meaning of a word well, will you be able to find the attack well?

We searched for related events using 11 manually verified extended answer pairs targeting 175 Linux system call types and 18 Windows EventIDs. Hit@3 is the percentage of correct answers ranked in the top three. MRR is the average value of the reciprocal rank of the first correct answer. The first correct answer is given 1 point, and the second correct answer is given 1/2 point.

In Canonical, a refined standard behavior description, both two-way Hit@3 is 1.000. In the condition where the raw fields were asymmetric, all values dropped to 0.000. The condition in which behavioral explanations were reinforced was 0.818 from Linux to Windows, and 0.800 in the opposite direction.

### Overall result of event semantic correspondence

| Condition | L → W Hit@3 | L → W MRR | W → L Hit@3 | W → L MRR |
| --- | --- | --- | --- | --- |
| SC-1: Canonical | 1.000 | 0.773 | 1.000 | 0.767 |
| SC-2A: Raw-field asymmetric | 0.000 | 0.115 | 0.000 | 0.052 |
| SC-2B: Action-enriched | 0.818 | 0.583 | 0.800 | 0.489 |

Semantic correspondence at the event level is a different problem from attack determination of the entire sequence. Even if relevant actions are expressed as close vectors, the order, context, and frequency of attacks may be missed or the baseline may be misaligned. The question this case brings back to the goal of Chapter 1 is clear. **In addition to whether the data is presented plausibly, it must be evaluated whether distinctions are maintained and the same judgment criteria work in actual application environments**.
