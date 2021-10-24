from api import app
from flask import request, jsonify
from PIL import Image

@app.route('/submit', methods=['POST'])
def submit():
    data = request.form.to_dict()

    image = request.files['image']
    vision = data["vision"]
    language = data["language"]
    image = Image.open(image)

    return jsonify({"vision": vision, "language": language, "image-size": image.size, "image-format": image.format})