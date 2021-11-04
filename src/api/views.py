from flask import request

import model
from app import app


@app.route('/submit', methods=['POST'])
def submit():
    data = request.form.to_dict()
    
    image_object = request.files['image']
    vision_model = data["vision"].lower().replace(" ", "_")
    language_model = data["language"].lower().replace(" ", "_")

    prediction_results = model.predict(image_object, vision_model, language_model)

    return prediction_results