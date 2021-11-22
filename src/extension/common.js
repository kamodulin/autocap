VISION_MODEL = "EfficientNet B0"
LANGUAGE_MODEL = "RNN with attention"
BASE_API_URL = "http://localhost:5001"

function srcToFile(src) {
    return (fetch(src)
        .then(function (response) {
            return response.arrayBuffer();
        })
        .then(function (buffer) {
            return new File([buffer], 'image.jpg', { type: 'image/jpeg' });
        }));
}

async function post(endpoint, data) {
    const promise = fetch(BASE_API_URL + endpoint, {
        method: "POST",
        body: data,
    });
    const resp = await promise;
    return await resp.json();
}


async function process(file) {
    var payload = {
        vision: VISION_MODEL,
        language: LANGUAGE_MODEL,
        image: file
    }

    let formData = new FormData();
    for (let [key, value] of Object.entries(payload)) {
        formData.append(key, value);
    }

    return await post("/predict", formData).then(res => {
        return res.caption;
    });
}
