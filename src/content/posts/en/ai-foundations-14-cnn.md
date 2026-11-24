## Introduction

In [Basic concepts of deep learning - Chapter 8](/post/ai-foundations-11-deep-learning), we learned that neurons make complex decisions by repeating weighted sums and activation functions. In [computational graph - Chapter 10](/post/ai-foundations-12-computational-graphs) and [backpropagation - Chapter 11](/post/ai-foundations-13-backpropagation), we started from the final loss and calculated how much to change each weight.

However, backpropagation is a method of learning a given connection. It does not determine which neurons to connect where best fits the image. This chapter is not about changing the learning method, but about changing the connection method of the neural network to suit the structure of the image.

In photos, nearby pixels form lines and edges, and those lines come together to form parts like eyes or wheels. Additionally, the same shape may appear on the left or right side of the photo. A convolutional neural network, or CNN (Convolutional Neural Network, ConvNet), reflects these two properties in its calculation structure. Small areas are examined repeatedly using the same criteria, and the discovered patterns are combined in the next layer.

![Chapter 12. CNNs: Learning Spatial Features — Figure 1](/images/ai-study/4ad7c734960ea62cd8c7.png)

The phrase “looking increasingly wider” in this picture does not mean that one filter suddenly becomes larger. This means that as the back layer regroups the results of seeing a small area in the front layer, the back neurons become influenced by a larger area of the original image. This range is later called the receptive field.

As you read this chapter, keep distinguishing between the shape of the input, the calculations the filter performs, the shape of the output, and the values being learned. The general flow of creating features from images, classifying them using features, and learning filters with classification loss is the same until the end.

## 2. What is inconvenient when spreading the image in one line?

A black and white image is a table of numbers consisting of height and width. The number in each cell represents the brightness. Black and white images of 28 × 28 pixels, like MNIST, are usually expressed as (28, 28, 1). The last 1 means that there is one **channel**, which is a type of color information. An RGB color image uses three channels: red, green, and blue.

To put it directly into the fully connected layer, that is, the Dense or Affine layer, 784 numbers of 28 × 28 can be spread out in one line. Information does not disappear when you open it. The numbers for each location still remain. The problem is that **the connection structure is not set so that neighboring pixels can be grouped together or the same pattern can be found in the same way in other locations**. Even such relationships must be learned from data.

![Chapter 12. CNNs: Learning Spatial Features — Figure 2](/images/ai-study/1a1bed327ecb26f7ea14.png)

CNN maintains the structure of height, width, and channel even at the intermediate stage. Calculate nearby locations first, and apply the same filter to multiple locations. In the flow below, features are created through convolution, ReLU, and pooling, and then finally unfolded and classified into a fully connected layer.

![Chapter 12. CNNs: Learning Spatial Features — Figure 3](/images/ai-study/49b60aaec694047f0a38.png)

Therefore, CNN is also a type of deep neural network, or DNN. The commonly referred to “Comparison of DNN and CNN” should be read in this context as **Comparison of a fully connected layer-oriented neural network and a convolution-oriented neural network**. This does not mean that CNNs and DNNs are two types that do not overlap.

## 3. Pass through the entire CNN first.

![Chapter 12. CNNs: Learning Spatial Features — Figure 4](/images/ai-study/55f5826d04da5c90fe50.png)

When the number image on the left comes in, the convolution layer calculates the response of the small pattern. The pooling layer summarizes the response into narrow regions. By going through convolution and pooling again, material to distinguish larger shapes is created. The final fully connected layer gathers these materials to create a score for each number, and Softmax converts the score into a probability distribution for each class.

In this figure, a 5 × 5 filter is applied to the 28 × 28 input without padding, resulting in 24 × 24. After 2 × 2 maximum pooling, it becomes 12 × 12, after the next 5 × 5 convolution, it becomes 8 × 8, and after the next pooling, it becomes 4 × 4. If there are 20 filters, the final features are 4 × 4 × 20 = 320. Unfold this and insert it into the fully connected layer. The last classification method is connected to the multiple classification learned in Chapter 2.

To understand the entire structure, we now need to open the box called “convolution” in the middle.

## 4. Filters are bundles of weights that look for small patterns

A **filter or kernel** is a small array of numbers. A 3 × 3 filter contains 9 numbers in one channel. These numbers are the learning target weights learned in Chapter 11. Place the filter on the input, multiply the input value and the filter value at the overlapping position, and then add them all together. Move the filter one space and repeat the same calculation.

The output table thus collected is the **feature map**. It shows which locations reacted strongly to the filter. The feature map is not the answer table. Although a filter may respond to edges or lines in a particular direction, it is not guaranteed to find only a single concept that a person can name.

![Chapter 12. CNNs: Learning Spatial Features — Figure 5](/images/ai-study/3287e175ad9722e5879f.jpg)

Let's look at the number example below. If you multiply and add the 3 × 3 area in the upper left corner of the 4 × 4 input and the filter, you get 1 × 2 + 2 × 0 + 3 × 1 + 0 × 0 + 1 × 1 + 2 × 2 + 3 × 1 + 0 × 0 + 1 × 2 = 15. If you move it one space to the right, you get 16, and in the next two positions you get 6 and 15. Therefore, the output is 2 × 2. This example shows the calculation before adding the bias.

In the number 2 example above, a turned-on pixel is considered 1, an turned-off pixel is considered 0, and a diagonal 3 × 3 filter is applied. If there are many places where 1 in the filter and 1 in the image overlap, the sum increases. So, intuitively, it can be viewed as the similarity of patterns. However, because general learning filters also include negative numbers and decimals, it is not always an operation that counts the “number of matching pixels.”

In mathematics, strict convolution uses the definition of flipping the filter, but the calculation that CNN libraries usually implement is cross-correlation, which does not flip the filter. In deep learning, this calculation is also customarily called convolution. When understanding the actual calculation, you can think of it as **multiplying and adding the same positions** as shown above.

## 5. Reasons for using the same filter repeatedly

Whether the diagonal line is visible from the top left or bottom right of the image, the criteria for finding the diagonal line should be similar. Instead of creating a separate filter for each location, CNN shares the same weight bundle across multiple locations. This is weight sharing.

Additionally, one output box does not look at the entire input, but only the nearby area covered by the filter. This is called local connectivity. Local connections reduce the number of inputs to view at once, and weight sharing reduces the need to create new weights for each location.

Even if the input size increases to 100 × 100, the number of learning weights for one 3 × 3 single channel filter is still 9. The amount of calculation increases because it is calculated at more locations, but the number of parameters of the filter itself does not increase. **The amount of computation and the number of numbers to learn are not the same thing.**

A filter usually has one bias attached to it, and that bias is also shared across all output locations. When there is one input channel, the number of parameters for one 3 × 3 filter is 9 + 1 = 10.

## 6. The bias and activation function must be passed to produce one layer of output.

If bias b is added to the multiplication/addition result of convolution, it becomes the value z before the activation function. Then, it is put into an activation function such as ReLU or sigmoid to produce output a. The neuron calculations from Chapters 8 and 11 appeared as is. What has changed is which inputs are connected and which weights are shared.

![Chapter 12. CNNs: Learning Spatial Features — Figure 6](/images/ai-study/d79acdf6721852410ed3.png)

![Chapter 12. CNNs: Learning Spatial Features — Figure 7](/images/ai-study/3a7d7fe96a456815330b.png)

For example, if the convolution sum is 2 and the bias is −1, z is 1. If sigmoid is applied, it becomes approximately 0.73. If the sum is 0, z is −1 and the output is approximately 0.27. This negative number does not indicate a “wrong answer.” This is the number entered into the activation function. If you use ReLU, it outputs 0 when z is a negative number, and z itself when it is a positive number. The output of the positive section is not 1. 1 is the derivative of that interval.

The term feature map can refer to the result before or after activation, depending on the context. When following calculations, you can avoid confusion by reading the convolution sum, z with the bias added, and a after activation separately.

## 7. Padding and stride to determine image size

If you move the 3 × 3 filter to the 4 × 4 input, the filter cannot go beyond the edge, so the output becomes 2 × 2. If the size decreases too quickly when stacking deep layers, or if you want to reflect more edge information, you can add a value to the input border. This is **padding**. Usually zero padding is used.

![Chapter 12. CNNs: Learning Spatial Features — Figure 8](/images/ai-study/d5ebe855473510b13f3d.png)

If you add one 0 to each side of the 4 × 4 input, it becomes 6 × 6 in calculations. If we move the 3 × 3 filter one space at a time, the output is 4 × 4. **The purpose of convolution is not always size reduction.** It is an operation that calculates a pattern, and the size varies depending on the padding, filter, and movement interval.

**stride** is the interval at which the filter is moved. If it is 1, it moves one space at a time, if it is 2, it moves two spaces at a time. For the same input, as the movement interval increases, the calculation position decreases and the output generally decreases.

![Chapter 12. CNNs: Learning Spatial Features — Figure 9](/images/ai-study/dd8024c6d5f673251e79.png)

In a general convolution that does not increase the interval inside the filter, if one direction input size I, filter size K, front and back padding sum P, and stride S are used, the output size is as follows.

![Chapter 12. CNNs: Learning Spatial Features — Figure 10](/images/ai-study/c1de59bb3ad5d0523837.png)

⌊ ⌋ indicates that the decimal part is discarded and the number is lowered to the integer below. For example, if input is 6, filter is 3, padding is 0, and stride is 1, the output is 4. The same calculation applies to height and width respectively. When the dilation, which is the filter internal interval, is increased to D, the effective filter size D(K−1)+1 is used instead of K.

### How are VALID and SAME different?

VALID adds no padding to input borders. SAME adds the necessary padding to match the output size to the input size ÷ the rounded value of the stride. Therefore, **SAME maintains exactly the same spatial size as the input when stride is 1**.

![Chapter 12. CNNs: Learning Spatial Features — Figure 11](/images/ai-study/fc2adf1b72e7dee67040.png)

Let's calculate an example with an input width of 13, a filter width of 6, and a stride of 5. The output width of VALID is ⌊(13−6)/5⌋+1 = 2. The output width of SAME is ⌈13/5⌉ = 3. To calculate the three positions, the total length must be (3−1)×5+6 = 16, so the total padding is 3 spaces. At this time, add 1 space at the front and 2 spaces at the back. If the total padding is odd, one more space is added at the back. This operation is connected to the SAME·stride condition of [Keras Conv2D Documentation](https://keras.io/api/layers/convolution_layers/convolution2d/).

## 8. Pooling summarizes the reaction into small regions

Convolution created a pattern response. Now let's consider whether we need to keep the values of all positions until the end. If the information “there is a strong edge somewhere around here” is sufficient, a small area can be compressed into one representative value. This reduction in space size is called downsampling.

![Chapter 12. CNNs: Learning Spatial Features — Figure 12](/images/ai-study/50febbae724f62317db3.png)

![Chapter 12. CNNs: Learning Spatial Features — Figure 13](/images/ai-study/13db68e3352d69aa1b65.png)

**max pooling** leaves only the largest value in the region. Treating a 2 × 2 area with a stride of 2 summarizes the four values into one. If the height and width are even numbers and applied without padding, they are each halved. Channels are processed separately, so the number of channels is maintained.

![Chapter 12. CNNs: Learning Spatial Features — Figure 14](/images/ai-study/923c9e2cfff703345227.png)

Here, if the identity function is displayed after the output, it means that the selected value is passed as is. This does not mean that the operation of selecting the maximum value itself is an identity function. Pooling is an operation with no weights or biases to learn, but the output changes as the input changes.

![Chapter 12. CNNs: Learning Spatial Features — Figure 15](/images/ai-study/d0077ce05f35bbc820c6.png)

For example, if the values of 2 × 2 in the upper left are 0.27, 0.12, 0.05, and 0.05, only the maximum value of 0.27 remains. If you calculate the entire picture in the same way, 4 × 4 is reduced to 2 × 2, and the results are (0.27, 0.27) in the first line and (0.50, 0.50) in the second line.

Summarization other than the maximum value is also possible.

| way | Calculations in one area | What's left? |
| --- | --- | --- |
| max pooling | select largest value | strongest reaction |
| average pooling | Add values and divide by number | Average response across regions |
| L2 pooling | Square each value, add them up, and then take the square root. | Size of response across regions |

For example, if the four values are a₁, a₂, a₃, a₄, L2 pooling is √(a₁²+a₂²+a₃²+a₄²). There is also a variant that takes the average first, like RMS, but here it refers to the square root of the sum.

Pooling reduces the size of intermediate data and the amount of subsequent computation. If there is Flatten and Dense behind it, the value for Dense is reduced, and the number of parameters in that layer is also reduced. On the other hand, the parameters of **pooling itself are originally 0**, and the number of parameters of the rear convolution is not reduced due to the size of the space. Because the location is roughly summarized, detailed location information may be lost. It can help reduce overfitting, but it doesn't always improve performance.

## 9. Compare numbers 1, 2, and 3 using the same filter

Now let's connect the pieces. Apply a 3 × 3 filter to the 6 × 6 black and white image, add a bias of −1, pass through the sigmoid, and then do 2 × 2 max pooling.

![Chapter 12. CNNs: Learning Spatial Features — Figure 16](/images/ai-study/a2df0b3a32dfc5f37ef3.png)

xᵢⱼ of the input refers to the i-th row and j-th column pixels. Just because they are arranged as circles in the picture does not mean that convolution discards neighbor relationships and completely connects all pixels. The positions covered by the filter are calculated. Processing a 6 × 6 input with a 3 × 3 filter with stride 1 without padding results in a 4 × 4 feature map, and after 2 × 2 pooling, 2 × 2 remains.

![Chapter 12. CNNs: Learning Spatial Features — Figure 17](/images/ai-study/edd16a499ebaff6e3f83.png)

In the convolution result of the number 2, there is a position where 3 appears. The biases add up to 2 and sigmoid(2) is about 0.88. The position where the sum is 2 is sigmoid(1) ≈ 0.73, the position where the sum is 1 is sigmoid(0) = 0.50, and the position where the sum is 0 is sigmoid(−1) ≈ 0.27. Afterwards, the maximum pooling results are the first line (0.73, 0.73) and the second line (0.88, 0.88).

![Chapter 12. CNNs: Learning Spatial Features — Figure 18](/images/ai-study/1b4ec7bd399c75d153e9.png)

If you look at number 1 with the same filter, the pooling results are the first line (0.73, 0.50) and the second line (0.50, 0.50). In number 3, it is the first line (0.73, 0.73) and the second line (0.50, 0.73). In this example, the number 2 creates a particularly strong response. Therefore, filter S can be useful as a material to distinguish the number 2.

However, this does not mean that S always recognizes only the number 2. The same partial pattern may exist in other images. Combining the responses of multiple filters allows for more reliable classification. In actual learning, instead of manually determining this filter value, learning is done to reduce the final classification loss.

## 10. Multiple filters increase the number of output channels.

![Chapter 12. CNNs: Learning Spatial Features — Figure 19](/images/ai-study/8e01edca389a53c30293.png)

A single filter looks at all channels of the input together and creates one output feature map. For example, if you apply a 3 × 3 filter to an RGB input, the actual weight shape of the filter is 3 × 3 × 3. The calculations for red, green, and blue are done separately, then added together, and one bias is added to create one output.

![Chapter 12. CNNs: Learning Spatial Features — Figure 20](/images/ai-study/3818d4eabfefea1e394e.png)

![Chapter 12. CNNs: Learning Spatial Features — Figure 21](/images/ai-study/10e617cc55d4fdbcac7f.png)

The number of input channels and the number of channels covered by the filter must match. In the above example, the output is created by combining the convolution results for each channel. In general convolution, this does not mean that “one filter looks at only one channel.” A special method of calculating each channel separately is called depthwise convolution.

![Chapter 12. CNNs: Learning Spatial Features — Figure 22](/images/ai-study/66acf62ad9c485eb9767.png)

If there are 10 filters, there are also 10 feature maps. Since each uses different weights and biases, different responses can be learned. This feature map is output by stacking it in the channel direction. Therefore, **the number of output channels is equal to the number of filters**. In the next convolution layer, these feature maps are new input channels. The channels of the second layer should not be interpreted as red, green, and blue.

The number of parameters of general convolution is as follows. This is when bias is used, excluding special settings for dividing channels into groups.

![Chapter 12. CNNs: Learning Spatial Features — Figure 23](/images/ai-study/8cd4480f185bcfb89bd5.png)

## 11. Grouping multiple images creates an additional dimension

The shape of an image is height × width × channels. In learning, multiple sheets are processed as a batch, so a batch axis is added. A tensor is an array of numbers with multiple axes.

![Chapter 12. CNNs: Learning Spatial Features — Figure 24](/images/ai-study/8b21b982eb1841e704bb.png)

The picture uses the order of putting the channels first (N, C, H, W). N is the number of images, C is the input channel, and H and W are the height and width. The filter is (FN, C, FH, FW), and the output is (N, FN, OH, OW). FN is the number of filters, FH·FW are the filter height/width, and OH·OW are the output height/width. The bias is one per filter and adds the same value to all images and spatial locations. This dimension expansion is called broadcasting.

The Keras example uses channels\_last, which puts the channels last, so the input is (N, H, W, C) and the output is (N, OH, OW, FN). The order of the axes representing the same data is different, but the principle of convolution is not different.

## 12. Backpropagation continues from the classification output to the filter.

![Chapter 12. CNNs: Learning Spatial Features — Figure 25](/images/ai-study/aa86c98e0c0876039c4b.png)

In this small structure, three filters each examine a 6 × 6 input to create three 4 × 4 feature maps. Pooling each map into 2 × 2 leaves a total of 12 values. The output layer collects these values and creates a score to distinguish numbers 1, 2, and 3.

![Chapter 12. CNNs: Learning Spatial Features — Figure 26](/images/ai-study/622127937aec52031227.png)

The line in this figure is the fully connected weight between the pooling values and the output neuron. Both the weight of the front filter and this weight are learned, but they are different parameters. The filter learns “what patterns to select,” and the final weight learns “how to combine those patterns into classification.”

![Chapter 12. CNNs: Learning Spatial Features — Figure 27](/images/ai-study/9b7c2530dbeed53ba44b.png)

When calculating loss, backpropagation is done the same as Chapter 11. Obtain the slope for each of the output layer weights, convolution bias, and filter weights and update them using an optimization method. The convolution unit bias in the picture should be read as **one per filter shared across the entire space** in a typical CNN. This should not be confused with structures that have separate biases for each location.

In backpropagation of maximum pooling, the gradient is transmitted to the position selected as the maximum value during forward propagation. At unselected locations, the slope of the pooling path is 0. If multiple maximum values are the same, the implementation selection rules are followed. Average pooling divides the gradient into each input in the region.

Filters are used repeatedly in several places. Therefore, the slope of a single filter weight must add the contributions of all locations that used that weight. This is the same principle as Chapter 10, where if a value splits into multiple paths and affects the loss, the slope for each path is added. Contributions from multiple images in a batch are also combined or averaged. **Weight sharing is a repeated use of forward propagation, while backpropagation is a structure that collects gradients from multiple users**.

## 13. What changes if you stack several layers of small filters?

![Chapter 12. CNNs: Learning Spatial Features — Figure 28](/images/ai-study/cf6f8487ad1962c30fcd.png)

The area in which an output is influenced by the original input is called the receptive field. When two 3 × 3 convolutions with a stride of 1 are stacked, the last output is affected by the 5 × 5 area of the original input. This is because the neighboring 3 × 3 results of the first layer are collected again.

Let's assume that the input, middle, and output channels are all one and that bias is used. One 5 × 5 filter layer uses 25 + 1 = 26 parameters, and two 3 × 3 filter layers use 9 + 1 + 9 + 1 = 20 parameters. **The comparison of 26 to 20 has the condition that all channels are one**. If the intermediate channel is greatly increased, the parameters of the two layers may increase.

A nonlinear activation function such as ReLU can also be inserted between the two layers. In addition to simply looking at a wide area, the relationships that can be expressed become richer by modifying the intermediate expression once more. This is different from performing linear calculations multiple times without an activation function.

![Chapter 12. CNNs: Learning Spatial Features — Figure 29](/images/ai-study/5a6537438d198a94eb54.png)

The front layer can respond to lines and edges, the middle layer can respond to texture or partial shape, and the back layer can respond to complex features that help distinguish objects. The expression “understand the meaning of things” refers intuitively to this change in expression. There is no guarantee that all filters will break down into the meanings expected by humans or be understood in the same way as humans.

## 14. How to read a typical CNN architecture

![Chapter 12. CNNs: Learning Spatial Features — Figure 30](/images/ai-study/c23818093eb53a32e31a.png)

A typical image classification CNN creates features through convolution and activation, and reduces the space size through pooling or convolution with a large stride. It is common to have a design in which the height and width become smaller and the number of channels increases as you go backwards. The direction is to include more diverse types of patterns while reducing location-specific details.

Since there may be more types of patterns combining multiple lines and textures than types of small lines, it is natural to design more filters in the back. However, it is not a rule that filters must be doubled. Neither a pooling layer nor a fully connected layer is required for all CNNs. Currently, I am studying a typical classification structure that clearly shows the role of each part.

## 15. Connect Conv2D and MaxPooling2D settings to calculations

Rather than memorizing the parameter names of the code, let's connect which part of the calculation we just saw to change. Below is the basic argument structure.

```py
tf.keras.layers.Conv2D(
    filters, kernel_size, strides=(1, 1), padding="valid",
    data_format=None, dilation_rate=(1, 1), groups=1,
    activation=None, use_bias=True,
    kernel_initializer="glorot_uniform", bias_initializer="zeros",
    kernel_regularizer=None, bias_regularizer=None,
    activity_regularizer=None,
    kernel_constraint=None, bias_constraint=None, **kwargs
)
```

| factor | Meaning in calculations |
| --- | --- |
| filters | Number of output feature maps. Number of output channels coming soon |
| kernel\_size | Height and width of the filter. 3 has the same meaning as (3, 3) |
| strides | Movement spacing in height and width directions. tuple of one integer or two integers |
| padding | valid has no additional padding. same sets the output size according to the stride and uses necessary padding. |
| data\_format | channels\_last or channels\_first. If None, Keras configuration is followed. |
| dilation\_rate | Spacing between input positions to reference within the filter. If 1, consecutive positions |
| groups | The number of groups that divide the input channel and convolution separately. If it is 1, watch all channels together. |
| activation | Activation function to be applied to the convolution result with added bias. If None, no further transformation |
| use\_bias | Decide whether to use filter-specific bias |
| kernel\_initializer, bias\_initializer | Decide what values to set the weights and biases at the beginning of training |
| kernel\_regularizer, bias\_regularizer | Penalties for weight and bias are added to the loss to suppress excessively large values, etc. |
| activity\_regularizer | Add penalty for output activation value to loss |
| kernel\_constraint, bias\_constraint | Process updated weights and biases to follow specified constraints |
| kwargs | Additional common layer settings such as name and dtype are transmitted. |

The initializer is the first starting value, the regularizer is the penalty added to the learning goal, and the constraint is the constraint applied to the value. The three have different roles. Here, we must distinguish between normalization, which means regularization, and standardization, which adjusts data to the mean and standard deviation.

```py
tf.keras.layers.MaxPooling2D(
    pool_size=(2, 2), strides=None, padding="valid",
    data_format=None, **kwargs
)
```

pool\_size is the size of the area to be summarized. If strides is set to None, pool\_size is used as the movement interval. If the input is (batch, height, width, channels), the output is (batch, pooled\_height, pooled\_width, channels). In channels\_first, the channel axis moves to the second in both cases. Pooling does not mix channels. You can also check the summary of each spatial axis and whether the channel is maintained in [Keras MaxPooling2D Documentation](https://keras.io/api/layers/pooling_layers/max_pooling2d/).

## 16. Preparing Fashion MNIST data

Fashion MNIST is classification data consisting of 28 × 28 black and white clothing images and 10 category labels. Distinguish between t-shirts, pants, pullovers, dresses, coats, sandals, shirts, sneakers, bags, and ankle boots. Of the 60, Chapter 000 for learning, the last 5, Chapter 000 is removed for verification, and 10, Chapter 000 for separate testing is left for the final evaluation.

```py
import numpy as np
import tensorflow as tf
from tensorflow import keras

(X_train_full, y_train_full), (X_test, y_test) = (
    keras.datasets.fashion_mnist.load_data()
)
X_train, X_valid = X_train_full[:-5000], X_train_full[-5000:]
y_train, y_valid = y_train_full[:-5000], y_train_full[-5000:]

X_train = X_train.astype(np.float32)
X_valid = X_valid.astype(np.float32)
X_test = X_test.astype(np.float32)

X_mean = X_train.mean(axis=0, keepdims=True)
X_std = X_train.std(axis=0, keepdims=True) + 1e-7
X_train = (X_train - X_mean) / X_std
X_valid = (X_valid - X_mean) / X_std
X_test = (X_test - X_mean) / X_std

X_train = X_train[..., np.newaxis]
X_valid = X_valid[..., np.newaxis]
X_test = X_test[..., np.newaxis]
```

The mean and standard deviation are calculated using only the training data. Learning statistics separately from verification and test data may differ from actual evaluation conditions or cause information leaks. All three data are converted to the same X\_mean and X\_std.

axis=0 means that statistics are obtained along the image count axis. Therefore, one average and one standard deviation are generated for each pixel location. keepdims=True leaves the placement axis with length 1, creating (1, 28, 28). 1e-7 is a small value inserted so that it does not divide by 0 even where the standard deviation is 0. The last np.newaxis attaches the channel axis to make the learning input (55000, 28, 28, 1).

## 17. How the shape of the data changes with each line of code

```py
model = keras.models.Sequential([
    keras.Input(shape=(28, 28, 1)),
    keras.layers.Conv2D(64, 7, activation="relu", padding="same"),
    keras.layers.MaxPooling2D(2),
    keras.layers.Conv2D(128, 3, activation="relu", padding="same"),
    keras.layers.Conv2D(128, 3, activation="relu", padding="same"),
    keras.layers.MaxPooling2D(2),
    keras.layers.Conv2D(256, 3, activation="relu", padding="same"),
    keras.layers.Conv2D(256, 3, activation="relu", padding="same"),
    keras.layers.MaxPooling2D(2),
    keras.layers.Flatten(),
    keras.layers.Dense(128, activation="relu"),
    keras.layers.Dropout(0.5),
    keras.layers.Dense(64, activation="relu"),
    keras.layers.Dropout(0.5),
    keras.layers.Dense(10, activation="softmax"),
])
```

The input shape can also be written as input\_shape=(28, 28, 1) in the first Conv2D. The above code clearly expresses the same structure by dividing it into an input layer. A variation of changing the number of filters to 32 is also possible, such as Conv2D (filters=32, kernel\_size=7, activation="relu", strides=1, padding="same"), but the number of first filters of the model to be followed here is 64.

| step | Output appearance of one image | Learning parameters |
| --- | --- | --- |
| input | 28 × 28 × 1 | 0 |
| Conv2D, 7 × 7, filter 64 | 28 × 28 × 64 | (7×7×1+1)×64 = 3,200 |
| max pooling 2 | 14 × 14 × 64 | 0 |
| Conv2D, 3 × 3, filter 128 | 14 × 14 × 128 | 73,856 |
| Conv2D, 3 × 3, filter 128 | 14 × 14 × 128 | 147,584 |
| max pooling 2 | 7 × 7 × 128 | 0 |
| Conv2D, 3 × 3, filter 256 | 7 × 7 × 256 | 295,168 |
| Conv2D, 3 × 3, filter 256 | 7 × 7 × 256 | 590,080 |
| max pooling 2 | 3 × 3 × 256 | 0 |
| Flatten | 2,304 | 0 |
| Dense 128 | 128 | 295,040 |
| Dropout 0.5 | 128 | 0 |
| Dense 64 | 64 | 8,256 |
| Dropout 0.5 | 64 | 0 |
| Dense 10 | 10 | 650 |
| entire | 10 class odds | 1,413,834 |

If 2 × 2 pooling without padding is applied to 7 × 7 with a stride of 2, it becomes 3 × 3. It's not 3.5 × 3.5 or 4 × 4. Flatten only rearranges these 3 × 3 × 256 values in one line and does not learn them.

Dropout(0.5) reduces excessive dependence on specific connections by stochastically making some outputs 0 during learning. For general inference in Keras, dropout is turned off and used. This does not mean that half of the test is unconditionally deleted.

## 18. Learning, validation, and prediction are different steps

```py
model.compile(
    loss="sparse_categorical_crossentropy",
    optimizer="nadam",
    metrics=["accuracy"],
)
history = model.fit(
    X_train, y_train, epochs=10,
    validation_data=(X_valid, y_valid),
)

X_new = X_test[:10]
y_pred = model.predict(X_new)
predicted_labels = np.argmax(y_pred, axis=1)
```

sparse\_categorical\_crossentropy is a multi-classification loss that gives the answer as an integer label from 0 to 9 rather than a one-hot vector. The name sparse does not mean that the image is sparsely populated. Nadam is an optimization method that combines Adam with the Nesterov-style momentum idea. Once backpropagation finds the gradient, this optimization method updates the weights.

Epoch 10 means repeating the entire training data ten times. validation\_data allows you to check performance on data that was not directly used for learning after each iteration. We need to see whether learning accuracy and verification accuracy occur together.

![Chapter 12. CNNs: Learning Spatial Features — Figure 31](/images/ai-study/ed41def5ba346362d89b.png)

The numbers in this run log are examples. The same results are not guaranteed depending on the environment, initial weight, random number, and library version. The shape of y\_pred is (10, 10). This is because for each 10 new image chapters, one probability for each of the 10 categories appears. argmax picks the number of the category with the highest probability in each row. When you only make predictions without learning a new model, the weights generally do not change.

## 19. The advantage of CNN comes from what is included in the structure in advance.

| point of comparison | Fully connected central neural network | CNN |
| --- | --- | --- |
| connection range | Each neuron connects to all inputs from the previous layer | Connect around nearby areas |
| Weight by location | Typically different connection weights for different locations | Share the same filter to multiple locations |
| spatial relationship | Pixel relationships need to be learned from data | Neighborhood relationships are reflected in the calculation structure |
| Pattern with a shifted position | Additional location-specific examples may be needed | Apply the same filter to the moved location as well |
| Parameters and overfitting | Connecting large inputs directly increases the number quickly. | Can be reduced under the same conditions, but varies depending on design |

CNN has the property that when the pattern moves, the response of the feature map also moves. This is called isovariance with respect to movement. Pooling and subsequent processing can reduce the impact of small movements, but this does not mean that the results will be exactly the same for any change in position, rotation, or size. Borders, padding, and stride also have an effect. Fully connected networks can also learn moved patterns with enough data and appropriate learning. The difference between the two methods lies in **which relationships are made structurally easier to learn** rather than the absolute distinction between possible and impossible.

## 20. Final exercise of reading the structure by number of parameters

The input is three channels RGB. Let's say that three 3 × 3 convolution layers sequentially create 100, 200, and 400 feature maps. All layers are regular convolutions and use bias.

| floor | input channel | output filter | calculation | parameter |
| --- | --- | --- | --- | --- |
| first | 3 | 100 | (3×3×3+1)×100 | 2,800 |
| second | 100 | 200 | (3×3×100+1)×200 | 180,200 |
| third | 200 | 400 | (3×3×200+1)×400 | 720,400 |
| total | — | — | 2,800+180,200+720,400 | 903,400 |

What the second layer sees is not the original three RGB channels, but the 100 feature maps created by the first layer. Understanding this connection also shows why the parameters of the back convolution layer can become large. The reason the input image height and width are not in the table is because the weights are shared throughout the space.

Let’s recap the learning position up to this point. Up to Chapter 11, we studied **How to learn the weights of a given neural network**. In Chapter 12, we studied **how to connect spatially close inputs to repetitive patterns**. Now, in data where order is important, such as logs or sentences, we are asked what information should be passed on to the next point. [recurrent neural network - Chapter 13](/post/ai-foundations-15-rnn) in the next chapter answers this question by sharing calculations that were shared in space in time.

### Figure Sources and Further Reading

The original illustrations and examples in the text were organized based on the provided lecture materials for 「12\_convolutional neural network」. The basic books specified in the lecture materials are 『Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow, 2nd Edition』 and 『Deep Learning Starting from the Bottom』. The original calculation example was maintained, but conditions that could be easily misunderstood, such as the SAME padding condition, shared bias, and the inclusion relationship between CNN and DNN, were specified.

- [Fashion MNIST CNN example notebook](https://github.com/rickiepark/handson-ml2/blob/master/14_deep_computer_vision_with_cnns.ipynb)
- [Convolution size calculation explanation](https://tensorflow.blog/a-guide-to-convolution-arithmetic-for-deep-learning/)
- [Keras Conv2D](https://keras.io/api/layers/convolution_layers/convolution2d/)
- [Keras MaxPooling2D](https://keras.io/api/layers/pooling_layers/max_pooling2d/)
