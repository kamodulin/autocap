import numpy as np
import tensorflow as tf
import pickle

model_dict = {}


def build_models(vision_model, language_model):
    if vision_model + "_" + language_model in model_dict:
        encoder, decoder, tokenizer = model_dict[vision_model + "_" + language_model]
    else:
        root = "models/" + vision_model + "_" + language_model + "/"

        encoder = tf.keras.models.load_model(root + "encoder")
        decoder = tf.keras.models.load_model(root + "decoder")
        tokenizer = load_tokenizer(root)

        model_dict[vision_model + "_" + language_model] = (encoder, decoder, tokenizer)

    return encoder, decoder, tokenizer


def load_tokenizer(path):
    tokenizer_path = path + "tokenizer.pickle"

    with open(tokenizer_path, "rb") as handle:
        tokenizer = pickle.load(handle)

    return tokenizer


def preprocess_image(image_object, vision_model):
    if vision_model == "efficientnetb0":
        image_width = 224
        image_height = 224
        preprocess_input = tf.keras.applications.mobilenet_v3.preprocess_input
    elif vision_model == "inceptionv3":
        image_width = 299
        image_height = 299
        preprocess_input = tf.keras.applications.inception_v3.preprocess_input
    elif vision_model == "vgg16":
        image_width = 299
        image_height = 299
        preprocess_input = tf.keras.applications.vgg16.preprocess_input
    else:
        raise Exception(f"Invalid vision model: {vision_model}")
    
    num_channels = 3

    def load_image(image_object):
        image = image_object.read()
        image = tf.io.decode_image(image, channels=num_channels, expand_animations=False)
        image = tf.image.resize(image, (image_height, image_width))
        image = preprocess_input(image)
        return image

    image = load_image(image_object)
    return image


def evaluate(image, encoder, decoder, tokenizer, *, max_seq_length=52, attention_features_shape=64):
    features = encoder(tf.expand_dims(image, axis=0))

    attention_array = np.zeros((max_seq_length, attention_features_shape))
    hidden = decoder.reset_state(batch_size=1)

    dec_input = tf.expand_dims([tokenizer.word_index['<start>']], 0)
    result = []

    for i in range(max_seq_length):
        predictions, hidden, attention_weights = decoder(dec_input, features, hidden)
        attention_array[i] = tf.reshape(attention_weights, (-1, )).numpy()
        predicted_id = tf.random.categorical(predictions, 1)[0][0].numpy()
    
        result.append(tokenizer.index_word[predicted_id])
        
        if tokenizer.index_word[predicted_id] == '<end>':
            break

        dec_input = tf.expand_dims([predicted_id], 0)

    result = result[:-1]
    num_words = len(result)
    attention_array = attention_array[:num_words]

    max = np.max(attention_array, axis=1, keepdims=True)
    min = np.min(attention_array, axis=1, keepdims=True)
    attention_array = (attention_array - min) / (max - min)
    
    length = int(np.sqrt(attention_features_shape))
    attention_array = attention_array.reshape(-1,  length, length)

    return result, attention_array


def predict(image_object, vision_model, language_model):
    image = preprocess_image(image_object, vision_model)
    
    encoder, decoder, tokenizer = build_models(vision_model, language_model)
    
    if vision_model == "efficientnetb0":
        attention_features_shape = 7 * 7
    elif vision_model == "vgg16":
        attention_features_shape = 9 * 9
    else:
        attention_features_shape = 8 * 8

    caption, attention_array = evaluate(
        image,
        encoder,
        decoder,
        tokenizer,
        attention_features_shape=attention_features_shape
    )

    caption = " ".join(caption)

    return caption, attention_array