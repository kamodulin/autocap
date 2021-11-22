document.addEventListener("DOMContentLoaded", function (event) {
    var images = document.images;
    var imagesLength = images.length;

    for (var i = 0; i < imagesLength; i++) {
        var image = images[i];
        if (true) {
            srcToFile(images[i].src).then(file => {
                process(file).then(res => {
                    image.alt = res;
                });
            });
        }
    }
});
