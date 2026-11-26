## Introduction

What should we give a computer so it can judge whether an email in the inbox is spam? We can supply rules written by people, let a model learn decision criteria from past emails, or use a neural network to learn representations of the email text as well.

This article solves one problem, spam email classification, three times in a row. Holding the problem fixed narrows the difference between the three approaches to one question: who makes the rules and the features. We will examine what each approach struggles with before placing AI, machine learning, and deep learning on a relationship map and following the historical changes.

## Three Approaches to AI

### Symbolic AI

Symbolic AI is where humans put in rules. For example, an AI that filters spam email could use logic like this.

```txt
IF   the subject or body contains "free", "winner" or "loan"
AND  the sender is not in the address book
THEN move the email to the spam folder
```

Although symbolic AI led the early days of AI, it faced the following limitations.

- Weak against variants: If a spammer writes “fr.ee” or “f-r-e-e” instead of “free,” the rule passes. Adding more words to the list only invites the next variant.

- The number of exceptions increases endlessly: A rule that sends every email containing “free” to spam also catches the “free shipping” notice from a shop you use. If you add an exception rule, another exception will occur. Rules begin to conflict with each other.

- There is some knowledge that cannot be written down as rules: A person glances at an email and immediately feels “this looks like an ad,” but cannot translate that feeling into IF-THEN. The same goes for the ability to recognize a cat in a photo.

- Human time is the bottleneck: The cost of interviewing experts, writing down and maintaining rules is called the “knowledge acquisition bottleneck.” This is the main reason why the expert system collapsed in the 1980s.

However, this does not mean that the rule base has completely disappeared. In mail filters and security products, rule-based detection is still the first line of defense. For known spam phrases and known attacks, rules are the fastest and most accurate, and they immediately explain why something was caught. Therefore, in practice, known attacks are often left to rules, and new or ambiguous ones are left to machine learning.

### Statistical Learning

Due to the above limitations of symbolic AI, a system that finds rules and decision criteria from data has become necessary. Here, let’s look at supervised learning first. When a person provides data and correct answers instead of rules, the machine finds a decision criteria from the data. However, in the example below, the number to express the data, i.e. the feature, is determined by the person. k-means, which groups similar data without an answer, or PCA, which finds important directions of change, are also machine learning, but the learning method is different from the current attack/normal classification.

Building the same spam classifier with statistical learning looks like this.

1. Humans design features: number of advertising words, number of links, number of legitimate emails previously received from this sender, number of exclamation marks in the subject
2. Attaching answers to past emails: Label tens of thousands of emails as “spam” or “normal.”
3. The model finds the boundary: A model, such as an SVM, calculates the boundary that best divides spam and normal email in the space of these features.

```txt
[ad words, links, past legit, !]   label
[   5,      8,       0,     4 ]  →  spam
[   2,      1,      23,     0 ]  →  normal (shop notice)
[   3,      6,       0,     2 ]  →  spam
```

A model trained this way learns on its own that “an email with ad words is still normal if the sender has sent many legitimate emails before,” without a person writing it down as a rule. In symbolic AI, the ever-increasing number of exception rules are automatically processed within the data.

Statistical learning solves the limitations of symbolic AI as follows.

- Weak against variation → Since it is judged based on a combination of several features rather than a single value, it catches even if some parts change slightly. When a new variant emerges, rather than modifying the rule, it is re-trained by adding data.
- Exceptions increase endlessly → If exception cases are included in the data, the boundary is automatically adjusted.
- Human time is the bottleneck → Experts only need to label the correct answer instead of writing rules.

Representative techniques are regression, KNN, decision tree, SVM, and ensemble. In particular, SVM was the mainstream from the 1990s to around 2011. This is because the learning problem can be handled with convex optimization, there is a theoretical basis for why it works, and it works well even with relatively small data if the appropriate features are present. Convex optimization means that it is a type of problem that can find the global minimum without getting stuck in a worse local minimum. However, this does not mean that there is necessarily one solution under all conditions.

→ We will cover each technique separately. (The current page is only intended to capture the overall flow)

However, statistical learning also encountered the following limitations.

- Features are still created by humans: The performance of a model depends on which features are selected by humans. If a person cannot come up with a feature called “number of links,” the model cannot learn it either. The bottleneck has simply shifted from “rule writing” to “feature design.”

- It cannot directly handle raw data: If you just input pixels from images, bytes from malware, or sentences from emails, performance drops significantly. A person must first summarize it into meaningful numbers.

- As the data grows, it cannot handle it: Kernel SVM increases the amount of calculation in proportion to the square of the number of data. As the data increased to millions, learning itself became difficult.

This limitation has become a critical issue as data explodes on the Internet. There is an overabundance of data, but it is no longer possible for people to design its features one by one. At this point, connectionism, which learns features on its own, receives attention again.

For reference, the reason I said above that connectionism started again is because, historically speaking, connectionism started before statistical learning. Perceptron is from 1958, and SVM is from the 1990s. So it is true that deep learning in the 2010s actually received attention “again.”

However, this does not mean that statistical learning has disappeared. For data organized in tabular form, tree ensembles such as XGBoost are still equivalent to or stronger than deep learning. In security, statistical learning is a powerful baseline for data that has already been organized into numbers, such as network flow statistics, and models that can explain the basis for judgment, such as decision trees, are still used in the field where the reason for detection must be shown.

### Connectionism

Connectionism is a method of creating a network (neural network) by connecting units that mimic the neurons of the human brain, and learning the strength (weight) of the connection using data. Compared to the classical methods seen above, it is especially important that deep neural networks can learn features together in multiple stages. Neural networks are also a method of statistical learning, and they do not automatically learn complex features from simple perceptrons. People still need to prepare input and set learning goals. There is supervised learning that provides the correct answer, and there is also self-supervised learning that creates learning problems from the data itself.

Actually, connectionism is not a new method. In 1958, around the same time as symbolic AI, Perceptron first introduced “a machine that learns from data.” However, since there was only one layer, only one straight line could be drawn, and it was forgotten for a while when it was proven in 1969 that it could not solve even the simplest problem (XOR) that could not be divided by a straight line. With the advent of backpropagation in 1986, it became possible to learn neural networks with multiple layers, but in an era with little data and slow computers, learning was unstable, so it was pushed aside by statistical learning in the 1990s.

- Perceptron: The simplest neural network that multiplies the input by the weight and adds it, and returns 1 if the sum exceeds the standard.
- hidden layer: A layer between the input layer and the output layer. It is responsible for converting input into new features.
- backpropagation: A method of calculating how much to correct all weights by passing the output error back.

Then, in the 2010s, all three things came together at the same time. These are the large-scale data created by the Internet, GPUs that make calculations dozens of times faster, and learning tips (ReLU, good initialization, regularization, etc.) that prevent learning from collapsing even when layers are stacked deeply. Thanks to this, deep learning with tens to hundreds of layers became possible, and connectionism became mainstream again, significantly outperforming the method of using human-designed features in the 2012 image recognition competition.

Building the same spam classifier with connectionism looks like this. Instead of humans extracting features such as “number of ad words” or “number of links,” the email text goes in almost as is.

```txt
Subject: [HR] Confirm your tax documents
Body:    Verify your account at the link below.
      →  model learns the context  →  spam (phishing)
```

This way, you can catch patterns that people may not have thought of before. For example, a phishing email written politely like a company notice, with no ad words and no exclamation marks, slips past a rule that looks for “free” and past human-designed features alike. The neural network finds such patterns on its own from the context of the whole text.

Connectionism solves the limitations of statistical learning as follows.

- Features are still created by people → The model learns features step by step from raw data. The front layer learns simple patterns, and the back layer learns complex patterns that combine those patterns.
- It cannot directly handle raw data → It receives image pixels (CNN), logs, and the order of sentences (RNN, Transformer) as input.
- As the data grows, it cannot handle it. → The data is divided into small pieces for learning (mini-batch) and parallel calculation is performed on the GPU, so the more data, the better the performance.

The last big leap forward for connectionism was 2017's **Transformer**. The previous recurrent neural network (RNN) was slow because it processed sentences one word at a time, and if the sentence was long, it forgot the previous content. Transformer uses attention to solve two problems at the same time by looking at the entire sentence at once and focusing on the necessary parts. All words could be calculated simultaneously, making it possible to utilize the GPU to its full potential, which led to the emergence of large-scale language models (LLMs) such as GPT, which increased the model and data enormously. Because these models learn by “guessing the next word” from internet text without a human answer, they also avoid the long-standing problem of labeling costs.

- attention: A method of scoring where in the input the information needed now is and weighting it according to that score.

However, connectionism also has the following limitations.

- It takes a lot of data and calculations: If there is less data, it is worse than statistical learning. Large models cost a lot of GPU money to train.

- It is difficult to explain the basis for judgment: Hundreds of millions of weights are intertwined, so it is difficult for a person to read “Why was this email judged to be spam?” Operators need to know the evidence to correct emails that were filtered by mistake.

- You can be fooled by small variations: An attack (adversarial attack) is possible that overturns the model's judgment by slightly manipulating input that is almost identical to a human. This is a particularly big weakness in the security field where attackers exist.

- Learns biases in data as they are: By learning from data collected in a specific environment, you can learn traces of the collection environment, not the spam itself.

Current frontier models such as GPT belong to connectionism. This is because knowledge is stored in learned weights rather than human-written rules. However, AI that is actually serviced does not work with models alone. It calls up tools like calculators and searches, and follows human-defined safety rules. This is the same concept as guardrails, tooling, and MCP. In other words, the model is connectionism, and the system surrounding it is a mixture of the three genealogies.

| genealogy | who makes the rules | Who creates the features? | Limits beyond | remaining limits |
| --- | --- | --- | --- | --- |
| symbolic AI | person | person | — | Rules need to be rewritten endlessly |
| classical statistical learning | Learn from data | mainly people | Write rules | Feature design is the bottleneck |
| connectionism, especially deep learning | Learn from data | Input preparation is done by humans, and internal features are learned from data. | Burden of feature design | Data/computation costs, difficulty in explanation |

And the three genealogies are still used together today. In the security field, known attacks are often divided into rules (symbolic AI), organized numerical data is divided into tree ensembles (statistical learning), and raw data such as logs/binaries/sentences are divided into neural networks (connectionism).

## Placing the Approaches on a Map

Now that we have compared the approaches, we can place their names on one map. The figure shows **which concepts sit inside broader concepts**, rather than the order in which they appeared.

![AI branches into rule-based symbolic AI and data-driven machine learning; machine learning includes classical methods and neural networks, while neural networks include shallow networks and deep learning](/images/ai-study/ai-lineage-map-en.svg)

Deep learning is part of machine learning, and machine learning is part of AI. A neural network need not be deep. This map separates directly written symbolic rules from methods that learn from data.

### Names and Relationships

- **Artificial intelligence (AI):** The broad field of building machines that perform intelligent tasks.
- **Symbolic AI:** People write knowledge and rules directly, rather than learning them from data.
- **Machine learning:** Models learn patterns or decision criteria from data. Supervised learning uses labels; unsupervised learning looks for structure without labels.
- **Classical machine learning:** Here, methods that mainly learn predictions or data structure from human-designed features, including regression, KNN, decision trees, SVMs, and ensembles (Chapters 2–7).
- **Deep learning:** Multilayer neural networks that learn features through successive transformations, including CNNs, RNNs, and Transformers (Chapters 8–14).

| genealogy | key answer | representative technique |
| --- | --- | --- |
| **symbolic AI** (Symbolic AI) | People write down knowledge as rules | Expert system, signature-based IDS |
| **Classical statistical learning** | Here, we focus on the method of learning boundaries or functions from human-designed features. | regression, KNN, decision tree, SVM, ensemble |
| **connectionism** (Connectionism) | A network that mimics neurons even learns its own features | Perceptron, backpropagation, CNN, RNN, Transformer |

In this article, we follow the development of AI through three streams: symbolic AI, classical statistical learning, and connectionism. However, they are not completely separate categories. Neural networks and deep learning also learn from data, so they can be included in statistical learning. Here, the abbreviated term “statistical learning” mainly refers to the classical method in which humans designed features. The three streams did not appear and replace one after another, but competed over each other over time and leadership shifted.

Large language models such as GPT and Claude belong to the neural-network stream. Codex and Claude Code are applications that connect such models with tools to perform work. The [next article](/post/ai-foundations-02-agent-harness-llm) distinguishes a model from the execution software around it.

## Changes by era

Previously, we compared “who creates the rules and features” for the same spam classification problem. Now let’s look at “why that method attracted attention at that time” in chronological order. If the first part is a comparison of operation methods, the following is a process in which the selection changed as the data and calculation environment changed.

### 1. People write the rules themselves → The beginning of symbolic AI (1950s~1960s)
The name “artificial intelligence (AI)” was first used at the Dartmouth Conference in 1956. At the time, researchers thought that if people wrote down their knowledge as an “IF-THEN” rule, the computer would combine the rules to come to a conclusion. This is symbolic AI.

- Background: The computer was the size of a room and had the same computational power as today's calculators. There were hundreds of pieces of data created by hand.
- Strengths of symbolic AI: It achieved rapid results in problems with clear rules, such as chess and proving mathematical theorems.
- Limitations of symbolic AI: There were many things that could not be written down as rules. “How to recognize a cat in a photo” cannot be written as IF-THEN.
- Security example: This is the signature-based detection method that is still used today.

---

### 2. The first machine to learn from data → The emergence and frustration of the perceptron (1958\~1969)
In 1958, Rosenblatt created a perceptron that mimicked brain neurons. It was the first attempt to let the machine learn on its own by looking at data, without writing down the rules. This is the beginning of connectionism.

- Key idea: Each input is multiplied by a number (weight) indicating importance and added, and if the sum exceeds the standard, 1 is added. Every time I make a mistake, I change the weights little by little.
- Limitations of connectionism: Since there was only one layer, only one straight line could be drawn. In 1969, Minsky/Papert proved that even XOR (1 when exactly one of the two inputs is 1) cannot be solved. I guessed that I could just stack the layers, but there was no way to learn the stacked layers (backpropagation).
- Judgment at the time: “Rather than having a network that has no way to learn, it would be better to have people introduce rules right now.” → Research funds and interest have shifted to symbolic AI.

---

### 3. Winter of neural networks → symbolic AI becomes an expert system (1970s)
When the promised results were not achieved in the 1960s, disappointment with AI as a whole spread. Research funding has decreased significantly since the UK's Lighthill report (1973), and this period is called the first “AI winter.”

- A change in direction for symbolic AI: Instead of an AI that knows everything, only expert knowledge in narrow fields, such as medicine or chemistry, has been translated into rules. These are expert systems (e.g. MYCIN for blood infection diagnosis).
- Situation of connectionism: Research has all but stopped, but the seeds of backpropagation have been sown. In 1970, Linnainmaa proposed a method for calculating the derivative backwards, and in 1974, Werbos proposed using it for neural network training. However, it received little attention.
- Judgment at the time: “AI that knows everything is difficult, but knowledge in a narrow field can be transferred to rules.” → Symbolic AI has emerged again as an expert system.

---

### 4. Rules become overwhelming, neural networks find ways to build layers → The fall of symbolic AI and the revival of connectionism (1980s)
In the early 1980s, as expert systems spread to enterprises, symbolic AI reached its heyday (e.g., computer component composition XCON, 1980). However, it collapsed in less than 10 years, and connectionism revived in its place.

- Limitations of symbolic AI: As the rules grew into the thousands, they conflicted with each other and had to be rewritten by humans every time the world changed. The cost of creating and maintaining rules (knowledge acquisition bottleneck) was unaffordable.
- Result: The second AI winter came in the late 1980s as the expert systems market collapsed.
- Stuck problem: If you add a hidden layer between input and output, XOR is also solved. However, there was no correct answer for the hidden layer, so I didn't know how to fix the weights.
- Breakthrough of connectionism: In 1986, Rumelhart/Hinton/Williams made backpropagation widely known. The error of the output is passed backwards, the responsibility (gradient) of each weight is calculated, and the weight is moved in the direction where the error is reduced (gradient descent). This made it possible to learn a layered neural network.

---

### 5. Neural networks are difficult to handle → move to statistical learning (1990s\~2011)
This is the most confusing time. It may seem that neural networks were ahead of the curve once backpropagation was introduced, but it was statistical learning such as SVM that actually became mainstream.

- Background: There were thousands or tens of thousands of pieces of data, and computers were still slow.
- Weaknesses of neural networks in this environment:
  - Overfitting: There were too many parameters, so I memorized a small amount of data.
  - vanishing gradients: If the layer is deep, the gradient is not transmitted to the preceding layer. Therefore, only 1-2 layer shallow nets could be used.
  - Unstability: Even when stuck in a nearby puddle (local minimum), the results were always different even with the same settings. There were many values (hyperparameters) to be set by people.
- The emergence of SVM: Among the boundaries dividing two classes, the boundary that is furthest from both data is selected (this distance is the margin). If it is not divided by a straight line, a curved boundary is created with a kernel (Boser/Guyon/Vapnik 1992, Cortes/Vapnik 1995).
- Strengths of SVM: Standard SVM is a convex optimization problem, so it avoids the problem of being stuck in a worse local minimum. However, the mere fact that it is convex does not mean that there is always one solution. With appropriate features, it is powerful even with relatively small data, and in RBF kernel SVM, C and γ are representative adjustment values. You will also need to select the kernel type and other settings.
- Why SVM's weaknesses were bearable: Features had to be designed by humans (feature engineering), but since there was little data, experts could create them themselves.
- Judgment at the time: When it came to “effort in feature design” versus “stability of learning,” stability won. → Research and practice moved to statistical learning. At the same time, ensembles (AdaBoost 1995, Random Forest 2001) were also developed.
- Note: Neural networks are not abandoned. CNN (1989) and LSTM (1997) came out during this period, but they were few in number.

---

### 6. Limitations of human creation of features → Return of deep learning (2006\~2012)
As the data and calculation environment changed in the late 2000s, the weaknesses of statistical learning and neural networks changed places.

- Environmental change: Data has exploded on the Internet, and ImageNet (2009) has provided more than 1 million labeled images. In 2007, CUDA made it possible to use GPUs (a device that processes thousands of calculations simultaneously) for general calculations, and neural network training became dozens of times faster.
- The weakness of SVM became fatal: humans could not design the features of millions of data, and kernel SVM could not handle the amount of computation increased by the square of the number of data.
- The weaknesses of the neural network were resolved: overfitting was reduced due to the large amount of data, and GPU solved the lack of calculation. In 2006, Hinton showed that deep networks could be learned, and the name "deep learning" began to be used, and learning techniques such as ReLU (2010), Dropout (2012), Adam (2014), and batch normalization (2015) followed.
- Key idea: “Creating new features” of the hidden layer is stacked in several steps. The front layer learns lines and edges, and the back layer learns complex patterns such as eyes/ears/faces, so there is no need for humans to design features.
- Crucial event: In 2012, AlexNet beat a human-designed feature-based method by a wide margin in an image recognition competition.
- Judgment at the time: In the battle between “explainability and stability” versus “accuracy and scalability,” accuracy and scalability won. → Researchers moved to neural networks en masse within a few years.

---

### 7. Ordered data is slow and forgetful → attention and Transformer (2014\~)
Even after deep learning succeeded in images, ordered data such as sentences or logs remained a challenge. Transformer was the solution to this homework, and today's LLM emerged from it.

- Remaining issues:
  - RNN (1990, a neural network that reads words one by one while going through the memory of the previous step) forgot the previous content when the sentence was long. LSTM (1997) was alleviated with a gate that leaves and erases memory, but it had to be read one step at a time, so the GPU could not be used properly.
  - The translation model (Seq2seq, 2014) compressed the entire sentence into one vector and could not contain the entire long sentence.
  - Labeled data remains expensive.
- Breakthrough:
  - attention (Bahdanau et al., 2014): Every time you create a word, look at the entire input again and focus on the necessary parts.
  - Transformer (Vaswani et al., 2017): RNN structure was discarded and only attention was left. Parallel computation is possible because all words see each other at once (self-attention).
  - Self-supervised learning: Like “Guess the next word,” the answer is created from the data itself, and the entire unlabeled internet text is used as learning material.
- Result: A structure was created where performance increases as the model and data grow. Starting with GPT (2018), models have become large, such as GPT-3 (2020, 175 billion parameters), which is today's large-scale language model (LLM).

## Summary

| step | period | environment | mainstream | decisive reason |
| --- | --- | --- | --- | --- |
| 1 | 1950s\~1960s | Very little data/computation | symbolic AI | Achieve rapid results in problems with clear rules |
| 2 | 1958\~1969 | Very little data/computation | symbolic AI (perceptron frustration) | The neural network had only one straight line, and there was no way to learn layers. |
| 3 | 1970s | Disappointment with AI, reduced research funding (first AI winter) | symbolic AI (expert system) | Focusing the rules on a narrow field yielded practical results. |
| 4 | 1980s | As expert systems spread, the cost of maintaining rules explodes. | The downfall of symbolic AI (second AI winter), the resurgence of connectionism | The rules could not continue to be written by humans. Hidden layer can now be learned using backpropagation |
| 5 | 1990s\~2011 | Little data, slow CPU | statistical learning | It was stable with a small amount of data, and the effort of feature design was manageable. |
| 6 | 2006\~2012 | Data Explosion, GPU | connectionism (deep learning) | Feature design became impossible and the weaknesses of neural networks were resolved. |
| 7 | 2014\~ | Internet-scale text,massive GPU parallel computation | connectionism (Transformer, LLM) | Parallel computation and self-supervised learning enable scale-up |
