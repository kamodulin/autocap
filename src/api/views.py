import sys
from flask import request

import model
from app import app

models = {
    "vision": {
        "EfficientNet B0": "efficientnetb0",
        "InceptionV3": "inceptionv3",
        # "ResNet50": "resnet50",
        "VGG16": "vgg16"
    },
    "language": {
        # "RNN": "rnn",
        "RNN with attention": "rnn_attention",
        # "BERT": "bert"
    }
}


@app.route('/models', methods=['GET'])
def get_models():
    return {key: list(value.keys()) for key, value in models.items()}


@app.route('/predict', methods=['POST'])
def predict():
    data = request.form.to_dict()

    image_object = request.files['image']
    vision_model = models["vision"][data["vision"]]
    language_model = models["language"][data["language"]]

    caption, attention_plot = model.predict(image_object, vision_model,
                                            language_model)

    return {
        "caption": caption,
        # "attention_plot": attention_plot
    }
