# Milestone 1
Group: AutoCap

Project: Caption this image

## Team members
- Brendan O'Leary
- Luke Sagers
- Kamran Ahmed

## Problem definition
The advancements in computer vision, natural language processing, and computing have led to complicated and sophistocated models. These models are large and require a lot of data and training. However, once trained, these models can be leveraged for other tasks, a concept known as transfer learning. Image captioning is a task that can use both pre-trained image and NLP models. One such use case for image captioning is for automatic alternate text generation for people with visual impairments that heavily rely on screen readers to access the interent through audio (Yesilada et al 2004). Accessibilty, as well as photo album indexing and automatic social media captioning and filtering are just some of the many applications that make accurate automatic image captioning an important priority.

## Proposed solution
The objective of this model is to take an image as an input and produce a sequence of text that serves as the caption of the image. We can achieve this with a deep learning, encoder-decoder model, where the image is encoded into features that are then decoded into a sequence of text. The encoder is a CNN feature extractor model and the decoder is a sequential language model with attention. There are several possible models to use as the image feature extractor and language model. We plan to consider all of these models and propose a final model that performs best at image captioning. 

## Project scope
- The deliverable is an AI app that produces captions for an input image. 
- This app has an underlying image + NLP model that has been trained using one or several of the datasets listed below. We will also produce statistics on the model training, such as model error and generalization gap between train and test data.

## Timeline and components
1. Collect and download image and caption data. Explore range of captions. Determine what pre-processing steps are necessary for both the images and the captions.
2. Create container and infrastructure for development.
2. Use potential models listed below as starting points for model exploration and selection. Compress model before deployment. Create a mock-up of app design.
3. Use mock-up to build AI web app. Possible advanced app features if time permits:
    - Create visualization interface to highlight the image features that are driving the caption prediction.
    - Build a functionality where user can edit the caption which could be used to update our model.
    - Allow for captions to be produced using different models in parallel.
4. Create infrastructure for deployment. Provisioning, deploying, and monitoring model and data.

## Datasets
- MS-COCO (Common objects in context): 330k images with at least 5 captions per image
- Flickr8k: 8k images each with five different image captions

## Potential models
### Computer Vision
- Pretrained image model to use as feature extractors. Possible models are VGG16 and InceptionV3, which have been trained to classify image objects.
### Language
 - Pretrained word embeddings (GloVe, word2vec)
 - Caption text created by a sequential decoder model, such as an RNN/LSTM. Possible to also use BERT or other pre-trained transformer models.

## References
Yesilada Y., Harper S., Goble C., Stevens R. (2004) Screen Readers Cannot See. In: Koch N., Fraternali P., Wirsing M. (eds) Web Engineering. ICWE 2004. Lecture Notes in Computer Science, vol 3140. Springer, Berlin, Heidelberg. https://doi.org/10.1007/978-3-540-27834-4_55