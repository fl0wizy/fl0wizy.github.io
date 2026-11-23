The classification referred to here is a matter of looking at the input and guessing which of several predetermined categories it belongs to. This category is called a class.

- Input: Features of a single piece of data. For example, values such as number of packets, number of bytes, and port.
- It is one of the designated name tags. For example, “Attack” or “Normal”.
- Classifier: This is the model that does this.
- The key point is that the output is “a fixed number of options.” The answer is not a continuous number like 3.7 or 85 points, but is a multiple-choice question in which you have to choose one of several options.

**Example (two above are binary classification, bottom two are multi-classification)**

| problem | class | type |
| --- | --- | --- |
| Is this email spam? | spam/normal | Binary classification (2 classes) |
| Is this traffic an attack? | Attack / Normal | binary classification |
| What number is this handwriting? (MNIST) | 0 \~ 9 | Multiple classification (10 classes) |
| Which family is this malware? | Emotet / TrickBot / Ryuk … | Multiple classification |

![Chapter 2. Classification and Evaluation Metrics — Figure 1](/images/ai-study/3e9531b9974cff8b1d68.png)

Taking numerical images as an example, one sample is one image. MNIST has number image 70, Chapter 000, and one sheet is 28 × 28 pixels. When the pixels are expanded, there are 784 input features. The answer number 0\~9 is not 10 features, but 10 output options. 5-Detector is a binary classification problem in which the correct answer is reworked to only ask “Is it 5 or not?”

![Chapter 2. Classification and Evaluation Metrics — Figure 2](/images/ai-study/93ed3e1832d5fae1f796.png)

The thickness is different from the 5th cursive script of the same shape. Instead of remembering one specific image, the model should be able to assign the same category to new handwriting. For this reason, images that were not used for learning must be evaluated.

### Why does classification occur in machine learning?

In Chapter 1, we said that machine learning does not involve humans making rules. Instead, if you give data and the correct answer, the machine creates a rule (function). At this time, there are different types of problems depending on what the correct answer looks like.

- If the correct answer is a category, it is a classification. For example, “Attack / Normal”.
- If the answer is a number, it is regression. For example, “Risk Score 73.5”.

These are the “two types: classification / regression” written in the supervised learning section of Chapter 1. Chapter 2 deals with classification, and Chapter 3 deals with regression. These two chapters are structured to look at “two problems solved by supervised learning” one by one.

### Classification is ultimately about “drawing boundaries.”

The function that the classifier learns is the same as drawing a line in the feature space. “Based on a certain line in a space, this side is divided into attack and that side is normal.” This line is called the decision boundary. The algorithms we will learn in the future simply have different methods for drawing this line.

- Chapter 4 KNN: Determine which is the nearest neighbor.
- Chapter 5 decision tree: “Is the port 445?” Cut the space into squares by connecting the same questions.
- Chapter 6 SVM: Draw a line with the widest margin between two classes.

### Most security problems are classified

If you think about security problems solved using machine learning, most of them look like this.

- Intrusion detection: Is this traffic an attack or normal?
- Malware detection: Is this file malicious or normal?
- Phishing detection: Is this URL phishing?
- Malicious code analysis: Which family is this malware?

We often ask “what is it / is it true or not?” rather than “how much.”

![Chapter 2. Classification and Evaluation Metrics — Figure 3](/images/ai-study/48ce985a355ba2237965.png)

There are two standards for order in this study tree.

- Order of difficulty: going from simplest to complex models
- Problem and solution order: The model in the next chapter corrects the weaknesses left by the model in each chapter.
- This order is structured for understanding. The actual research histories overlap, and this does not mean that the next model replaced the previous model for all problems.

| Criteria (what to ask) | Choice | Choice of this problem |
| --- | --- | --- |
| Is there a correct answer (label)? | Supervised / Unsupervised / Semi-supervised / Reinforcement Learning | **Supervised Learning** |
| Do you continue to learn as data comes in? | Placement Learning / Online Learning | **Batch Learning** |
| How do you predict new data? | Case-based/model-based learning | **Model-Based Learning** |

![Chapter 2. Classification and Evaluation Metrics — Figure 4](/images/ai-study/ebe79ab320524f28a015.png)

As shown above, there are three criteria for dividing machine learning systems.

1. Do you look at the answer (label) when learning?

1. supervised learning
2. unsupervised learning
3. semi-supervised learning
4. reinforcement learning

2. Do you continue to learn after deployment?

1. batch learning
2. online learning

3. Do you summarize the data or keep it as is?

1. case based
2. model based

Since we studied Standard 1 in Chapter 1, we will briefly look at it starting from Chapter 2.

### Criterion 2 – Do I continue learning after deployment? (Batch Learning / Online Learning)

**Why is this standard needed**

Even if you create a model once and send it to the service, the world continues to change. New spam methods emerge and new attack techniques emerge. At this time, there are two answers to “how to adapt the model to new data.”

- **Recreate from scratch.** This is batch learning.
- **Continue and modify the existing model.** This is online learning.

Criterion 2 is the question that separates these two answers.

Words to organize. (The batch of batch learning is batch.)

- Batch: meaning “bundle,” meaning putting data in one batch.
- Deploy: It means “send out to actual combat.” The model that has completed training is uploaded to the service.

### Batch Learning

- Definition: Learn at once using all available data. The trained model is deployed, and only predictions are made without further learning during service. Because learning is completed in advance at a location away from the service, it is also called offline learning.

- procedure :

1. Collect data.
2. Learn (fit) from the entire data.
3. Check performance with validation and test sets.
4. Deploy the model to the service.
5. During service, only predict is called. Parameters are fixed to their values at the moment learning is completed.

- How to reflect new data: Combine old and new data and learn again from the beginning. Then replace it with a new model.

- Example: A spam filter that was deployed in January after learning from last year's emails will not change on its own even if spam using a new method pours in in March. LLMs such as ChatGPT and Claude are also deployed after learning once, and the weights do not change during conversation. However, using new information through searches, tools, and provided context is different from learning new weights.

**merit**

- Export as verified: The model confirmed with the test set is sent to service.
- Easy to control: models can be replaced after data inspection. However, offline learning is also affected if the collected data is contaminated, so safety is not guaranteed by the method alone.
- Reproduced: If the same data and settings are used, the same model is produced. If a problem arises, it is easy to revert to the previous model.
- Iterative learning is easy to design: stored data can be mixed and learned multiple times. However, data bias does not automatically disappear or performance always improves.

**disadvantage**

- Retraining cost: If the data is large, it takes a lot of time and computational resources to retrain from scratch.
- Late to change: Does not reflect changes between the time of learning and now.
- If resources are lacking, it cannot be used: There must be memory and storage space to store and process all data.

In practice, therefore, we compromise with periodic relearning.\
→ At regular intervals, such as every night or every week, new data is combined, retrained, and the model is replaced. Although retraining is automated, the model in service does not learn on its own, so it is still batch learning.

---

### Online Learning

- Definition: Whenever data is received one by one or in small batches (mini-batches), the existing model is continuously trained little by little. Do not learn again from the beginning.

- procedure :

1. Create an initial model.
2. When a new data bundle comes, we modify the parameters slightly with that bundle.
3. You can discard the used bundle.
4. Continue repeating 2\~3. There is no “end” point in learning.

- sklearn: fit() typically performs new learning. There are exceptions that reuse previous states, such as warm\_start in some models. partial\_fit() continues learning each time it is called. Only models that support partial\_fit (e.g. SGDClassifier) can be trained online.

Learning rate - the key handle of online learning

- Definition: A hyperparameter that determines how quickly to adapt to new data.
- If it is high: adapts quickly to new data. Instead, we quickly forget what we previously learned.
- Low: Stable and less shaken by noise. Instead, they are insensitive to change.
- In batch learning, the learning rate is the “step to the optimal point.” In online learning, it is a matter of strides, but it is also “how quickly we forget old things.”

**Out-of-core learning**

- **Definition:** When the data is too large to be loaded into memory at once, the data is broken into pieces and read one by one to learn using an online learning method.
- **Meaning:** This lesson ends offline before service. Still, the method is online learning. So “online” does not mean real time or the Internet. It means “to learn incrementally.”

**merit**

- **Fast adaptation:** Changes are made immediately according to fast data. For example, stock prices and real-time traffic.
- **Resource Savings:** Used data can be discarded, requiring less storage space and memory.
- **Huge data:** Data larger than memory can be learned (external memory learning).

**Disadvantages and Risks**

- **Bad data slowly ruins it:** When sensor failures, incorrect logs, or manipulated inputs come in, the model learns as is. Performance deteriorates slowly and is difficult to notice.
- **react :**
  - It continuously monitors performance, and if it falls, it stops learning and reverts to the previous model.
  - Monitors input data and filters out abnormal data. Unsupervised learning anomaly detection can be used for this monitoring.
- **Verification is difficult:** Since models are constantly changing, there is no guarantee that the performance measured yesterday will fit today's model.
- **Get carried away by order:** Data cannot be shuffled and is learned in the order in which it arrives. So I lean towards recent data.

Above, we briefly looked at what a classifier is and how it works.

Now let's look at how to score the classifier. This can also be seen as the core of AI benchmarks.

## Cross-validation and performance metrics

**Why a fair test is needed first**

Re-scoring with the data used for training may result in higher scores than the performance on the new data. A phenomenon in which the difference is large and new data performance is poor is overfitting. There is no need to assume that every model can almost memorize its training data. It's like putting textbook practice questions on a test.

However, you cannot use a test set. This is because the test set is a college entrance exam that is used only once at the end after all selections have been made. Currently, we are still selecting and refining the model.

So we create a test within the training data. This is “cross-validation.”

1. Divide the training data into several pieces (e.g. 3 pieces).
2. Study with two pieces, and take the test with the remaining piece.
3. Repeat by changing the test pieces.

In this way, all data becomes a “test problem not used for learning” once in a while.

Cross-validation is used twice throughout this section.

1. When measuring accuracy fairly\
: Calculate the percentage of guesses for each piece and average it.
2. When creating all of the following report cards\
: To create error matrices, precision, recall, and graphs, “the decision made by the model on the first look” is required for each data. If you run cross-validation and collect the judgments of each piece without discarding them, you will get one fair judgment for the entire training data. If you collect scores instead of judging, they become material for a graph drawn by moving the baseline.

There are two questions for grading.

| question | in charge |
| --- | --- |
| **What questions are on the test?** The model should not be graded using the data it saw during training. | cross validation |
| **What is the score based on?** Is it a percentage correct, a false alarm, or a miss? | accuracy, precision, recall, etc. |

- Cross-validation is the answer to the first question. It is a device that allows you to take a fair test.
- Accuracy or precision is the answer to the second question. This is the grading standard.

Let’s study the concepts of accuracy and precision using the error matrix.

![Chapter 2. Classification and Evaluation Metrics — Figure 5](/images/ai-study/4b84b78d910872078288.png)

TN, TP, FN, and FP are all types of results from judging one piece of data. If two things are checked for each piece of data, it will definitely fall into one of these four.

- Second letter = model’s judgment: P (Positive) means “it was said to be positive”, N (Negative) means “it was said to be negative”.
- First letter = Was the actual judgment correct: T (True) was correct, F (False) was incorrect.

So, if you read the name from the back, it will make sense. For example, FP means “I said it was positive (P), but it was wrong (F).”

There is something you should not be confused about here.

What if it was actually positive, but the prediction was negative? → It is FN, not TN.

The first alphabet refers to the AI's prediction result, not whether it was actually correct.

It was said to be negative, but if it was actually positive, the prediction was wrong, so the letter F comes in the first letter.

Then, there are two important formulas here.

These are recall and precision.

- Recall: What is the ratio of actual positives that were actually captured by the model?

→ It will be TP / (FN + TP).

- Precision: Proportion of actual positives among those predicted by the model as positive.

→ It will be TP / (FP + TP).

The important point here is that the trade off between precision and recall is a relationship in which the baseline (threshold) is moved and when one goes up, the other goes down.

- If you lower the baseline to increase recall: you can capture more positives and increase FP. Precision is often lowered, but it depends on the actual score order.

- Raising the baseline: the number of positive tests and recall may decrease. How much the precision improves can be confirmed with actual data.

### Why 99% accuracy does not mean successful attack detection

If there are only 100 attacks out of 10,000, the accuracy is 99% even if you answer that all are normal. However, none of the 100 attacks were found. Let's set the attack as positive and look at the results of the next detector.

| actual state | predicted to be an attack | predicted to be normal |
| --- | --- | --- |
| 100 actual attacks | TP = 80 | FN = 20 |
| Actual normal 9,900 cases | FP = 180 | TN = 9,720 |

The accuracy of this detector is 98%, which is lower than the standard for always being considered normal. Still, 80 attacks were found. The precision is 80/260, which is about 30.8%, and the recall is 80%, which is 80/100. Approximately 69.2% of the alerts analysts receive are false positives, so alert processing costs must also be considered.

![Chapter 2. Classification and Evaluation Metrics — Figure 6](/images/ai-study/d6a77646e6c9c54636b1.png)

The evaluation criteria vary depending on whether you want to find many actual attacks or need the reliability of a single alert. If the attack is not defined as positive, the interpretation of the number will be different, so the positive class must be clearly defined first. Since indicators with a denominator of 0 are not mathematically defined, also check the processing rules of the evaluation tool.

## What is F1 score?

It is a score that combines precision and recall into one number. If either one of them is low, it is made to go down as well.

why you need it

Since precision and recall are two numbers, it is difficult to compare models or baselines.

|  | precision | recall |
| --- | --- | --- |
| Model A | 90% | 60% |
| Model B | 70% | 80% |

A has high precision, and B has high recall. So I can't tell right away which one is better. In this case, F1 is used to see “whether you are good at both” with one number.

**How do I get it**

F1 = 2 × precision × recall / (precision + recall)

## From scores to verdicts: moving the threshold

![Chapter 2. Classification and Evaluation Metrics — Figure 7](/images/ai-study/5a93c9b85c88000e8a1a.png)

Place a baseline on the samples sorted by score. If something higher than the standard is judged positive, the lower the baseline, the more samples are captured. TP and FP can increase together and recall does not decrease. Conversely, raising the baseline can increase FN. Precision often moves in the opposite direction, but it can fluctuate depending on the score order of the actual data, so it is not a strictly monotonic relationship.

![Chapter 2. Classification and Evaluation Metrics — Figure 8](/images/ai-study/508a6b7dd1d5fc916895.png)

The horizontal axis of the figure is the threshold and the vertical axis is precision·recall. The positive and negative scores shown here are not probabilities but the decision scores of the classifier. You should not mix the probability standard of 0.5 with the score standard in thousands of units.

In the 5-detector example, if TP is 4,096, FP is 1,522, and FN is 1,325, precision is about 72.9%, recall is about 75.6%, and F1 is about 74.2%. This value is the result of the corresponding learning/verification configuration and is not a performance determined solely by the name of the algorithm.

## What do ROC curves and PR curves show differently?

![Chapter 2. Classification and Evaluation Metrics — Figure 9](/images/ai-study/db32885c1178b3fa791a.png)

TPR on the vertical axis of the ROC curve is equal to recall, and FPR on the horizontal axis is the ratio of false alarms among actual normals. The denominator of FPR is FP + TN, not all positive predictions. In the previous example of 10,000 cases, there are 180 false alarms even though the FPR is small, about 1.82%. If there is a lot of normal data, even a small percentage can become a large workload.

ROC-AUC is the area under this curve. In a typical binary score evaluation, it can be interpreted as the ability to place an arbitrary positive at a higher score than an arbitrary negative. Ties are usually counted as half points. If 1, there is complete rank separation, and the expected value of the random score is 0.5. Just because the AUC is high does not mean that the alert at the selected threshold is useful.

The PR curve uses recall on the horizontal axis and precision on the vertical axis. It is especially useful for detections where positives are rare, as it shows “how reliable the alert is when found.” The precision baseline of random ranking is influenced by the positive rate. Therefore, the PR values of datasets with different attack rates are compared by writing down the conditions together.

AP, which summarizes the PR curve numerically, and trapezoidal PR-AUC are not the same calculation. This is why the F1 of the ranking indicator and the fixed threshold moved differently even though the expressions were similar in the zero-shot case in Chapter 1. [scikit-learn evaluation metrics documentation](https://scikit-learn.org/stable/modules/model_evaluation.html)

## If the correct answer is one of several: Multiple classification

![Chapter 2. Classification and Evaluation Metrics — Figure 10](/images/ai-study/6bfafcf8432bf41d6a86.png)

Multiple classification is the problem of selecting one correct answer from several categories. OvR is One-vs-Rest and is also called OvA or One-vs-All. Create K models that distinguish each category from the rest. OvO is One-vs-One and creates a model for each pair of categories and uses K(K − 1)/2. If there are 10 numbers, they are 10 and 45 respectively.

OvO has a large number of models, but each model learns only two categories of data. Which method is faster depends on the underlying algorithm and data size. There are also methods, such as softmax, that learn all categories together in one model, so not all multi-classification is a bundle of binary models.

The confusion matrix of multiple classification shows which types are confused by placing the actual and predicted classes in rows and columns, respectively. If the indicators for each class are averaged with the same weight, it is a macro average, and if the number of samples for each class is reflected, it is a weighted average. It is also important to check whether failures of rare attack types are masked in the overall average.

The multi-label problem, where multiple tags can be correct at the same time, is separate. If one file can have both a ransomware function and a propagation function, the information will be lost if you force it to be expressed in multiple classifications that only select one. Now you can see how scores and odds are actually calculated in [regression(Regression) - Chapter 3](/post/ai-foundations-05-regression).
