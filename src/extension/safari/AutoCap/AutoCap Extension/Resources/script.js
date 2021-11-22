document.addEventListener("DOMContentLoaded", function (event) {
    var images = document.images;
    var imagesLength = images.length;
    
    for (let i = 0; i < imagesLength; i++) {
        let image = images[i];
        if (true) {
            srcToFile(images[i].src).then(file => {
                process(file).then(res => {
                    console.log(i, image, res);
                    image.alt = res;
                });
            });
        }
    }
});
