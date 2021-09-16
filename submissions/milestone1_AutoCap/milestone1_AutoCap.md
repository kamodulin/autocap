# Milestone 1
Group: AutoCap

Project: Caption this image

## Team members
- Brendan O'Leary
- Luke Sagers
- Kamran Ahmed

## Problem definition
*ideas:*
- utility (alt text for websites -- screen readers, disability)
- creativity (captioning for social media, blog posts, etc.)

## Proposed solution
Deep learning model with CNN feature extractor backbone and attention-based head to automatically generate image captions

## Project scope
- 
-

## Timeline and components
1. Collect and download data. Explore range of captions.
2. Use potential models as starting point for model exploration and selection. Compress model before deployment.
3. Build web app (mobile app?) -> maybe build a feature where user can edit/update the caption which could be used to update our model (could be a nice highlight)
4. Provision server, deploy, and monitor model/data

## Datasets
- MS-COCO (Common objects in context). > 82k images with at least 5 captions per image
- Flickr8k

## Potential models
- CNN feature extractor (VGG16, InceptionV3) trained on object classification (maybe ImageNet?)
- Pass into RNN/LSTM decoder