import sys
from flask import request

import model
from app import app


models = {
    "vision" : {
        # "MobileNetV3Small": "mobilenetv3",
        "InceptionV3": "inceptionv3",
        # "ResNet50": "resnet50",
        # "VGG16": "vgg16"
    },
    "language" : {
        # "RNN": "rnn",
        "RNN with attention": "rnn_attention",
        # "BERT": "bert"
    }
}


@app.route('/models', methods=['GET'])
def get_models():
    return {
        "vision": list(models["vision"].keys()),
        "language": list(models["language"].keys())
    }


@app.route('/submit', methods=['POST'])
def submit():
    data = request.form.to_dict()

    image_object = request.files['image']
    vision_model = models["vision"][data["vision"]]
    language_model = models["language"][data["language"]]

    prediction_results = model.predict(image_object, vision_model, language_model)

    return prediction_results