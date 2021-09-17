# Milestone 1
Group: AutoCap

Project: Caption this image

## Team members
- Brendan O'Leary
- Luke Sagers
- Kamran Ahmed

## Problem definition
The advancements in computer vision, natural language processing, and computing have led to complicated, sophistocated models. These models are large and require a lot of data and training. However, once trained these models can be leveraged for other tasks, a concept know as transfer learning. Image captioning is a task that can use both pre-trained image models and pre-trained NLP models. Possible use cases of image captioning are: 
- utility (alt text for websites -- screen readers, disability)
- creativity (captioning for social media, blog posts, etc.)

## Proposed solution
The objective of this model is to take an image as an input and produce a sequence of text that serves as the caption of the image. We can achieve this with a deep learning, encoder-decoder model, where the image is encoded into features that are then decoded into a sequence of text. The encoder is a CNN feature extractor model and the decoder is a sequential language model with attention. There are several possible models to use as the image feature extractor and language model. We plan to consider all of these models and propose a final model that performs best at image captioning. 

## Project scope
- The deliverable is an AI app that produces captions for an input image. 
- This app has an underlying image/NLP model that has been trained using one or several of the datasets listed below. We will also produce statistics on the model training, such as model error and generalization gap between train and test data.

## Timeline and components
1. Collect and download data. Explore range of captions. Determine what pre-processing steps are necessary for both the images and the captions.
2. Use potential models as starting point for model exploration and selection. Compress model before deployment. Create a mock-up of app design.
3. Use mock-up to build AI web app (mobile app?). Possible advanced app features if time permits:
    - Build a functionality where user can edit/update the caption which could be used to update our model
    - Create visualization interface to highlight the image features that are driving the caption prediction
    - Allow for captions to be produced using different models in parallel 
4. Provision server, deploy, and monitor model/data

## Datasets
- MS-COCO (Common objects in context): 330k images with at least 5 captions per image
- Flickr8k: 8k images each with five different image captions

## Potential models
- Pre-trained image model to use as an image feature extractor. Possible models are VGG16 and InceptionV3, which have been trained to classify image objects.
- Caption text created by a sequential decoder model, such as an RNN/LSTM. Possible to also use BERT or other pre-trained transformer models.