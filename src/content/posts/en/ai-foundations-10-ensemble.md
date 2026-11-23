The ensemble referred to here is a technique to create a stronger prediction model by combining several models. The random forest seen at the end of Chapter 5 decision tree is a representative example. Instead of making one model better, the key is to gather the judgments of several appropriate models so that each can erase each other's mistakes.

## Key Terms

- **Predictor (Learner):** Each model that makes up the ensemble. If it is classification, it is a classifier; if it is regression, it is a regression model.
- **Weak learner / Strong learner:** A model that is only slightly better than random guessing on its own is a weak learner. An example is a decision tree with a depth of 1. A model with good performance created by combining these models is a strong learner.
- **Bias and variance:** This is a concept seen in Chapter 3 regression. Bias is an error caused by incorrect assumptions, which appears as underfitting, and variance is the property of the model changing significantly even if the data changes slightly, and appears as overfitting. Which of the two reduction methods is different varies depending on the ensemble method.
- **Bootstrap:** This is a method of selecting samples from the training set **by allowing duplicates** (replacement sampling). The same sample may be selected multiple times, or may not be selected at all.
- **Residual:** This is the difference between the correct answer and the prediction (correct answer − prediction). This is the part the model hasn’t gotten right yet.

## Why combine multiple models?

All of the models I have seen so far have the weakness of leaning to one side. The linear model was prone to underfitting (bias) due to the assumption of a straight line, and the decision tree changed completely even if the data changed slightly (variance). There is a limit to making one model better, so we change our ideas. **If we create multiple models and combine the results, wouldn't each individual's mistakes cancel out each other?**

It's amazing when you look at the numbers and see how strong this idea is. This is what happens if you create multiple classifiers with an accuracy of only 51%, barely better than a coin toss, **independently** of each other, and then have a majority vote.

| number of classifiers | Probability of majority vote being correct |
| --- | --- |
| 1 | 51% |
| 1,000 | About 72.6% |
| 10,000 | About 97.7% |

The important condition here is “**independent**”. If all classifiers are wrong in the same place and in the same direction, the majority vote is also wrong. The equation we saw in Chapter 5, variance of mean = ρσ² + (1 − ρ)σ²/n, was this story. The more similar the models are (the larger ρ), the less improvement there is in merging them. So, the performance of the ensemble depends on **how diverse the learners are**, and the ensemble is divided into three branches depending on how to create multiple positives.

| method | How to make positive | learning sequence | mainly to reduce |
| --- | --- | --- | --- |
| Voting | They use **different algorithms** | each separately | Weaknesses of Individual Models |
| Bagging/Pasting (Random Forest) | Give the same algorithm a **different piece of data** | simultaneously, parallel | dispersion |
| boosting | Where the previous model was **wrong, the next model** corrects it. | one after another, sequentially | bias |

Ensemble is used when the performance of a single model is not satisfactory, when there is enough data and want to further improve performance, or when you want to reduce overfitting and improve generalization performance. Scikit-Learn collects these methods in the sklearn.ensemble module.

![Chapter 7. Ensembles: Combining Model Decisions — Figure 1](/images/ai-study/043e30e6f99eff7d9b87.png)

Different models look at the same input and make predictions. What is important is not just increasing the number of models, but whether the ways in which errors are made are sufficiently different. If you copy the same model with the same data and settings, the errors will be almost the same, so the benefit of merging may be small.

## 1. Voting - voting by other models

It is the simplest ensemble. Like logistic regression, SVM, and decision tree, **different models** are trained separately and predictions are combined into votes. If the algorithm is different, the method of error is likely to be different, so various positives naturally arise.

There are two ways to vote.

- **Hard voting (direct voting):** Only the **classes** submitted by each model are counted and decided by majority vote.
- **Soft voting (indirect voting):** Averages the **probabilities** of each model and selects the highest class.

| model | Class 0 probability | Class 1 odds |
| --- | --- | --- |
| A | 0.3 | 0.7 |
| B | 0.4 | 0.6 |
| C | 0.2 | 0.8 |
| average | 0.3 | **0.7** |

Class 1 with the largest mean is the final prediction.

Soft voting usually works better because **it reflects confidence**. Let's say Models A and B are called Class 1, but the probability is just over 0.51, and Model C is called Class 0, and we are very confident with the probability 0.99. Hard voting is 2 to 1, which is class 1. Soft voting is class 0 because the average probability of class 1 is (0.51 + 0.51 + 0.01) / 3 ≈ 0.34. Hard voting counts “barely yes” and “definitely yes” as one vote, while soft voting gives more weight to votes with greater certainty. However, all models must be able to produce probability, so SVM must turn on probability with SVC (probability=True).

In an actual example, the accuracy, which was 0.864 for logistic regression, 0.888 for SVM, and 0.896 for decision tree, increased to **0.904** when the three were combined with soft voting (VotingClassifier), which was higher than the best individual model.

## 2. Bagging and pasting - same model, different data

![Chapter 7. Ensembles: Combining Model Decisions — Figure 2](/images/ai-study/37419e67427c57549fdf.png)

![Chapter 7. Ensembles: Combining Model Decisions — Figure 3](/images/ai-study/bc0217cec4ed6bf2e304.png)

Restructuring sampling means that the same sample can be included in one sample multiple times because the selected cases are re-entered as candidates. Non-replacement sampling does not allow duplication within a sample. The difference between bagging and pasting is this extraction rule, and it does not mean that all models start from different original datasets.

Voting has the burden of having to prepare several different good algorithms. Another way is to use the same algorithm, but give each model a different piece of the training set. If the data is different, even the same algorithm produces different models.

- **Bagging (bagging = bootstrap aggregating):** Select pieces **by allowing duplication** (bootstrap). When a piece of the same size as the original data is created through restoration extraction, on average, only about 63% of the original sample is included, and some are included multiple times.
- **Pasting:** Pull out pieces **without duplication**.

Once all predictors have finished training, the predictions are collected. Classification is based on the class that appears the most (hard voting). If it is a model that can produce a probability, it is determined by the average of predict\_proba() (soft voting), and regression averages the predicted values.

The effect is **bias is similar and variance is reduced**. Each model may be slightly inaccurate individually because it only looks at a portion of the data, but since each model is affected by different noise, the average is canceled out. The difference is clear when comparing a single decision tree and a bagging ensemble of 500 decision trees made from the same data. One tree has a jagged decision boundary along lone points, while the bagging ensemble has a similar number of errors (similar bias) but a much smoother boundary (smaller variance), resulting in better generalization.

Since each model learns separately without knowing each other, it can be trained in parallel. Scikit-Learn uses BaggingClassifier (classification) and BaggingRegressor (regression).

![Chapter 7. Ensembles: Combining Model Decisions — Figure 4](/images/ai-study/98082506ec2917a7c211.png)

It can be seen that the jagged boundaries of individual trees become stable when trees from multiple samples are combined. The reason averaging is helpful is because independent noise cancels each other out. If the trees repeat similar mistakes, their effectiveness is reduced.

If the error correlation of M models with the same variance σ² is approximately ρ, the variance of the average error is σ² × \[ρ + (1 − ρ)/M\]. If the correlation is 1, the variance of this equation does not decrease even if the number of models increases. This relationship is the motivation for random forests to change not only the sample but also the feature candidates.

### Feature sampling - distributing features instead of data

Instead of, or along with the sample, you can randomly select some **features** and give them to each model.

- **Random patch method:** Samples are randomly selected and features are also randomly selected.
- **Random subspace method:** All samples are used (bootstrap=False), and only features are randomly selected (bootstrap\_features=True).

It is especially useful for high-dimensional data with hundreds or thousands of features. As the features seen for each model are different, the positives increase and the variance decreases, improving generalization. Instead, since each model judges only a portion of the features, **bias may increase slightly.** It is a transaction that exchanges positive and individual accuracy.

## 3. Random Forest - Bagging + Random Selection of Features

![Chapter 7. Ensembles: Combining Model Decisions — Figure 5](/images/ai-study/ee6dc6bf74411a89c3fb.png)

The boundaries drawn differently for each tree are combined at the end. Although it is intuitive to describe class combinations as majority voting, scikit-learn's RandomForestClassifier averages the class probabilities for each tree and then selects the largest class. The simple majority result of the class selected by each tree is not always the same.

Feature importance is not the size of the causal relationship. The importance of impurity reduction is difficult to interpret when there are many types of values or correlated features. We cannot conclude that changing that characteristic will reduce attacks just because it is of high importance.

Random Forest is an ensemble that applies bagging (or pasting) to the decision tree, adding an additional layer of randomness. A normal decision tree finds the best question among **all features** when dividing nodes, but a random forest tree finds the best question only among **some randomly selected features** for each node. So there are two places of randomness that make the tree different. Different data samples (bootstraps) for each tree, different feature candidates for each split. As we saw in Chapter 5, this device makes the trees less similar to each other, so the bias of each tree is slightly lost, but the variance is greatly reduced, resulting in a better model overall.

For prediction, predictions from all trees are averaged for regression, and predictions from all trees are collected for classification to select the most selected class.

**Why do you get better bounds?** Because of the bootstrap, some training points are in one tree and not in the other, so each tree is incomplete. If you draw the decision boundaries of the five random trees separately, each one is curved differently in the wrong places. However, the boundary of the random forest that averages the probabilities of the five trees is less overfitting and smoother than any other tree. This is because the noise memorized by each tree is different for each tree and is erased from the average, leaving only the true pattern.

**Feature importance.** This is another advantage of random forest. Scikit-Learn calculates the importance of a feature by calculating how much impurity is reduced on average by nodes using a certain feature across all trees. If you train a random forest with 500 trees on the iris data, this is what you get.

| features | importance |
| --- | --- |
| petal length | 0.44 |
| petal width | 0.42 |
| sepal length | 0.11 |
| sepal width | 0.02 |

In Chapter 5, the reason why the tree created a question using only two petal features is confirmed by numbers. In security, it is used to see “which traffic features contributed most to detection.”

There is one point to point out. Random Forest is introduced as being created to compensate for the weak generalization of decision trees, and that is true **within the training range**. There is less shaking, so it fits the new data better. However, the weakness of not being able to predict **outside the training range** remains. This is because the answer of the random forest is ultimately the average of the leaf values, and the leaf value is the average of the training samples. Random forests are not suitable for problems that require tracing trends, such as the RAM price example in Chapter 5.

## 4. Boosting - The next model corrects the mistakes of the previous model.

![Chapter 7. Ensembles: Combining Model Decisions — Figure 6](/images/ai-study/0e1d4339949d14178316.png)

Each model in bagging can be prepared independently, but the next model in boosting requires the results of the previous step. So parallelism between steps is limited. However, this does not mean that all internal calculations to find split candidates at each stage cannot be parallelized.

Bagging reduces **variance** by creating multiple deep and complex models (models with large variance) and averaging them. So, on the other hand, what should we do with models that are too simple and therefore underfitting (models with large bias)? No matter how many simple models you average, they are all still simple.

Boosting goes a different route. **Weak models are trained one after another, allowing each model to compensate for the mistakes of the previous model.** Weak learners usually use models with limited expressive power, such as a decision tree with a depth of 1, and become increasingly sophisticated as dozens or hundreds of them are connected. So boosting is effective **in reducing bias**. The representative algorithms are AdaBoost, gradient boosting, and XGBoost and LightGBM, which are improvements to gradient boosting.

The downside is that each model learns by looking at the results of the previous model, so **it cannot be parallelized**. Therefore, it is difficult to scale to large data like bagging or pasting.

|  | Bagging | boosting |
| --- | --- | --- |
| individual model | Deep and complex (high variance) | Shallow and simple (highly biased) |
| learning sequence | At the same time, they don't know each other | In turn, look at the model in front and fix it. |
| reduce | dispersion | bias |
| Parallelization | possible | impossible |

## 5. Adaboost - Putting weight on the wrong sample

AdaBoost (Adaptive Boosting) makes the next model pay more attention to **samples** that were incorrect in the previous model. The method is to assign **weights to each sample** and increase the weight of incorrect samples. Samples with larger weights are reflected in greater costs when the next model trains, so the next model tries to match those samples. The name Adaboost is because the weights are repeatedly adapted.

### learning process

1. **Start:** Give all samples the same weight w = 1/m (m is the number of samples).
2. **Model training:** Trains the model and makes predictions with the current weights.
3. **Error rate calculation:** The ratio of the weighted sum of incorrect samples to the total weighted sum is **weighted error rate r**. The error rate increases as more important samples are incorrect, not just the number of errors.
4. **Model Weight Calculation:** Determines how loud this model will be in the final vote. The more accurate the model, the greater the weight.
5. **Sample weight update:** This model multiplies the weight of the **wrong** sample by exp(α), and leaves the correct sample as is. It is then normalized by dividing by the sum of all weights.
6. **Repeat:** Learn the next model with the updated weights. It stops when the set number of models is reached or a perfect model is found.

```txt
Error rate r_j = (Weighted sum of wrong samples) / (Total weighted sum)
Model weight α_j = η × log((1 − r_j) / r_j) η = learning rate
Sample weight W ← w × exp(α_j) for incorrect samples, as is for correct samples
```

If you put in the numbers, you can see the meaning of the equation (η = 1).

| Error rate r of the model | Model weight α | Weight multiplier for incorrect samples | meaning |
| --- | --- | --- | --- |
| 0.1 | 2.20 | 9 times | Because she is a model who guesses well, her voice is loud. However, the wrong samples are really difficult samples, so we emphasize them greatly. |
| 0.3 | 0.85 | 2.33 times | A decent model |
| 0.5 | 0 | 1 times | It's like flipping a coin. No voting rights and no weight changes. |

### prediction

Predictions from all models are weighted for voting with the model weight α. The better the model, the more it is reflected in the final prediction.

| model | prediction | weight α | α × prediction |
| --- | --- | --- | --- |
| h₁ | +1 | 0.7 | +0.7 |
| h₂ | +1 | 0.6 | +0.6 |
| h₃ | −1 | 0.3 | −0.3 |
| sum |  |  | **+1.0 → positive** |

When five Adaboostro models are sequentially attached to the crescent moon data, the weight of the samples in which the first model is very wrong increases, and the second model shifts its focus to getting those samples more accurately correct. Each time a model is added, the boundary is modified little by little. If the learning rate is 1, the boundary is shaken significantly because the correction is large each time, and if the learning rate is 0.5, the correction width is half, so the boundary moves calmly. Overfitting reduces the number of models or regularizes weak learners more strongly.

There are also regression versions (AdaBoostRegressor, AdaBoost.R2) that focus on samples with large errors, but they are rarely used due to limitations in performance and stability, and AdaBoost is mainly used for classification. In Scikit-Learn, a decision tree with a depth of 1 is used as a weak learner in AdaBoostClassifier.

## 6. Gradient boosting - The next model corrects the remaining error.

![Chapter 7. Ensembles: Combining Model Decisions — Figure 7](/images/ai-study/bca386e8467f06e8a3b4.png)

![Chapter 7. Ensembles: Combining Model Decisions — Figure 8](/images/ai-study/bdcdf8070ca8c00e5ec9.png)

The left column shows the new tree matching the current residuals, and the right column shows the final prediction by adding the trees so far. The new tree does not know and calculate the actual residuals of the new samples. It learns the relationship between inputs and residuals from training data and predicts the correction amount for new inputs.

Adaboost shifted the attention of the next model by changing the weight of the incorrect **sample**. Gradient boosting is more direct.**The next model is given “the remainder (residual) that the previous model did not get right” as the correct answer and trained.**

If you follow regression, you will immediately understand.

1. **First tree h₁:** Learn the original answer y. If you fit the curved data into a tree with a depth of 2, it only roughly follows the 4 steps.
2. **Residual calculation:** Find y − h₁(x) for each sample. The places where the first tree predicted too low are positive numbers, and the places where the first tree predicted too high are negative numbers.
3. **Second tree h₂:** Learns **this residual** as the correct answer, not the original correct answer. It is about learning “where and how wrong the first tree was”.
4. **Third tree h₃:** Learns the residuals that h₁ + h₂ has not yet guessed.
5. **Prediction:** Add the predictions of all trees. h(x) = h₁(x) + h₂(x) + h₃(x).

When only h₁ is used, the stairs are rough, but when h₂ is added, the bottom of the curve becomes aligned, and when h₃ is added, it becomes more accurate at both ends. As more trees are added, the remaining residual decreases toward 0. For reference, if you directly calculate the example of connecting three depth 2 trees to 4 samples (x = 1, 2, 3, 4, correct answers 3.0, 3.5, 4.0, 5.0), with this data and splitting rule, the residual in the second tree becomes 0, and the third tree predicts only 0. This is an example that demonstrates a principle, not a generalization.

### Why “Gradient” in the Name?

If you look at the update equation, it looks the same as gradient descent in Chapter 3.

```txt
ŷ_new = ŷ_old − η × g g = ∂L/∂ŷ (slope of loss function differentiated by predicted value)
```

If the loss is MSE(½(y − ŷ)²), then g = ŷ − y, i.e. **residual plus minus**. So “going in the opposite direction of the slope” is the same as “correcting the prediction by the residual.” Gradient descent reduces the cost by moving θ little by little, but gradient boosting reduces the cost by moving the **predicted value itself** little by little, and a tree takes that step. The next model gradually corrects the direction incorrectly predicted by the current model.

### Number of trees and learning rate

![Chapter 7. Ensembles: Combining Model Decisions — Figure 9](/images/ai-study/18f4d384104561c29eee.png)

![Chapter 7. Ensembles: Combining Model Decisions — Figure 10](/images/ai-study/0747a1a59dd4d6a43075.png)

If you add too few trees, you can learn less about large flows, and if you add too many, you can even compensate for noise. As shown in the picture on the right, select the number of trees with the smallest verification error. Lowering the learning rate reduces the contribution of each tree, which usually requires more trees, so adjust the two values together.

- **η (learning rate):** Determines how much to reduce and add the contribution of each tree. Going smaller requires more trees, but tends to improve generalization (shrinkage).
- **If there are too few trees:** 3 trees cannot properly keep up with the training set. It is underfitting.
- **If there are too many trees:** If there are 200 trees, the staircase will follow each training point and overfit.

So the number of trees is set to **early termination**. When measuring the verification error by adding trees one by one, the error goes down, reaches its lowest point at a certain point (56 trees in the example), and then goes up little by little. Use the model at that point. This is the same idea as early termination seen in Chapter 3 regularization.

### loss function

Classification (GradientBoostingClassifier) uses log loss (binary cross entropy), and regression (GradientBoostingRegressor) uses MSE. If you just change the loss, the same procedure of “revising the prediction along the gradient” still works. This model, which is a concatenation of regression trees, is also called GBRT (Gradient Boosted Regression Trees).

## 7. XGBoost - High-performance version of gradient boosting

Gradient boosting has good performance, but is slow and prone to overfitting. XGBoost (eXtreme Gradient Boosting) is an engineered version of these two. It is used for both classification and regression, is one of the most widely used boosting techniques, and is fast and accurate on large-scale and high-dimensional data.

| characteristic | what does it mean |
| --- | --- |
| regularization | Both Lasso (L1) and Ridge (L2) regularization are supported. Apply the regularization in Chapter 3 to the tree to prevent overfitting. |
| Parallelization | The order of boosting, which creates the trees sequentially, remains the same. Instead, the calculation to find the best split for each node **within one tree** is divided in parallel, greatly speeding up learning. |
| Early termination | If performance stops improving, don't add more trees. |
| tree pruning | Limit tree complexity by pruning unprofitable splits |
| Missing value handling | It learns on its own which branch to send samples with empty values, and handles data with missing values without additional preprocessing. |
| User-defined objective function | Modeling is flexible because the loss function can be directly defined. |

XGBoost is not included in Scikit-Learn, so install the xgboost library separately. When used to classify three varieties of iris, the objective function is multi:softmax and the evaluation index is mlogloss. The softmax and cross entropy seen in Chapter 3 are used as the loss of boosting. eta is the learning rate, and the number of boosting rounds is the number of trees to be attached.

## 8. LightGBM - Faster and lighter

LightGBM (Light Gradient Boosting Machine) is also based on gradient boosting. It was created by Microsoft in 2017 and was designed to operate faster and lighter than XGBoost. It is optimized for large-scale data processing, supports GPU learning, and is provided as a separate library (lightgbm) that can be used similarly to Scikit-learn.

- **XGBoost:** It is a stable type centered on accuracy.
- **LightGBM:** This is a speed-oriented, high-capacity type.

For large security data, such as millions of traffic logs, LightGBM is often advantageous in terms of training time.

## 9. Advantages and disadvantages of ensemble

**merit**

- **Performance:** Generally higher performance than individual models.
- **Prevention of overfitting:** Because it is an average judgment of several models, it is resistant to noise and outliers, and predictions are stable.

**disadvantage**

- **Cost:** Because multiple models must be trained and predicted, the computational cost can be large and slow. In particular, boosting cannot be parallelized.
- **Interpretation:** Interpretation is difficult because the output of multiple models is combined. As we saw in Chapter 5, one tree was a white box, but the votes or sums of hundreds of trees become a black box. It becomes difficult to explain “why” a detection model raises an alert.
- **Tuning:** Data preparation and hyperparameter tuning are important. If the number of trees, depth, and learning rate are incorrectly set, it directly leads to overfitting or underfitting.

## Concluding the ensemble unit

1. If one model has bias or variance weaknesses, multiple models are combined to offset the mistakes. However, **the models must be different**.
2. If you combine different algorithms and vote, it is **voting**. Soft voting, which averages out the probabilities, is usually better.
3. Giving different pieces of data to the same algorithm is **bagging/pasting**. Train in parallel and reduce **variance**. A tree ensemble that adds random feature selection for each split is **Random Forest**.
4. If you follow a weak model one after another to correct the mistakes of the previous model, this is **boosting**. It reduces **bias** but does not parallelize.**AdaBoost** increases the weight of incorrect samples, and **Gradient Boosting** matches the remaining residuals to the next tree. The latter is gradient descent on the predicted values.
5. **XGBoost** made gradient boosting stronger with regularization, parallelization, and missing value handling, and **LightGBM** made it faster and lighter.
6. The cost is computational cost, loss of interpretability, and tuning burden.

## Distinguishing between the three types of weights

AdaBoost's sample weight determines **which training data is considered more important**. The predictor weight α determines **which model's votes will be counted larger in the final combination**. The connection weight of a neural network determines **how the values between neurons are converted**. Although they all use the name “weight,” their attached objects and roles are different.

One notation of binary AdaBoost sets the predictor coefficient as 1/2 × log((1 − r)/r) and multiplies all samples by exp(−αyh). In another notation, the coefficient is set as log((1 − r)/r), and only incorrect samples are multiplied by exp(α) and normalized. If the learning rate is kept the same, the relative sample ratios of the two notations are the same. If you mix the half coefficient and update rule in the two formulas one by one, it becomes a different algorithm, so they should be read as a pair.

The high certainty of soft voting is helpful as long as it is premised on accurate probability estimates. Overconfidence in the wrong model can actually be detrimental. XGBoost's L1·L2 regularization is a regularization of the objective function applied to the output weights of tree leaves, etc., and its structure is not the same as reducing the linear regression coefficient for each input feature. The speed and performance superiority of LightGBM and XGBoost also vary depending on data size, device, implementation and settings. [scikit-learn ensemble description](https://scikit-learn.org/stable/modules/ensemble.html)

Until this chapter, predictions were made by combining given features in various ways. In the next [Basic concepts of deep learning - Chapter 8](/post/ai-foundations-11-deep-learning), we learn what features to change the input to using multiple layers of parameters.
