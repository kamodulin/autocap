import tensorflow as tf
from PIL import Image

AUTOTUNE = tf.data.experimental.AUTOTUNE

def build_model(vision_model, language_model):
    # if vision_model == "mobilenetv3":
    #     encoder = tf.keras.models.load_model("mobilenetv3_encoder")
    # elif vision_model == "inceptionv3":
    #     encoder = tf.keras.models.load_model("inceptionv3_encoder")
    # elif vision_model == "vgg16":
    #     encoder = tf.keras.models.load_model("vgg16_encoder")

    # if language_model == "rnn":
    #     decoder = tf.keras.models.load_model("rnn_decoder")
    # elif language_model == "rnn_with_attention":
    #     decoder = tf.keras.models.load_model("rnn_with_attention_decoder")

    # return encoder, decoder
    pass

def preprocess_image(image_object, vision_model):
    # if vision_model == "mobilenetv3":
    #     image_width = 299
    #     image_height = 299
    #     preprocess_input = tf.keras.applications.mobilenet_v3.preprocess_input
    # elif vision_model == "inceptionv3":
    #     image_width = 224
    #     image_height = 224
    #     preprocess_input = tf.keras.applications.inception_v3.preprocess_input
    # elif vision_model == "vgg16":
    #     image_width = 224
    #     image_height = 224
    #     preprocess_input = tf.keras.applications.vgg16.preprocess_input
    # else:
    #     raise Exception(f"Invalid vision model: {vision_model}")
    
    # num_channels = 3

    # def load_image(image):
    #     image = tf.io.decode_image(image, channels=num_channels, expand_animations=False)
    #     image = tf.image.resize(image, (image_height, image_width))
    #     image = preprocess_input(image)
    #     return image

    # image_data = image_object.read()
    # image_data = tf.data.Dataset.from_tensor_slices(([image_data]))
    # image_data = image_data.map(load_image, num_parallel_calls=AUTOTUNE)
    # image_data = image_data.repeat(1).batch(1)

    # return image_data
    pass


def predict(image_object, vision_model, language_model):
    image = preprocess_image(image_object, vision_model)
    # model = build_model(vision_model, language_model)
    
    caption = ""
    # caption = evaluate(model, image) #logic from captioning notebook
    # attention plot
    
    return {
        "vision_model": vision_model,
        "language_model": language_model,
        "caption": caption,
    }