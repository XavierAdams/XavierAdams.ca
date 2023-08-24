const photoInput = document.getElementById('photo-input');
const gallery = document.querySelector('.gallery');
let images = [];

function saveImagesToLocalStorage() {
    localStorage.setItem('images', JSON.stringify(images));
}


function addImageToGallery(imageData) {
    const imgContainer = document.createElement('div');
    imgContainer.className = 'image-container';

    const img = document.createElement('img');
    img.src = imageData.url;
    img.className = 'gallery-image';

    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remove';
    removeButton.className = 'remove-btn';
    removeButton.addEventListener('click', () => {
        removeImage(images.indexOf(imageData));
    });

    imgContainer.appendChild(img);
    imgContainer.appendChild(removeButton);
    gallery.appendChild(imgContainer);
}

function removeImage(index) {
    images.splice(index, 1);
    saveImagesToLocalStorage();
    updateGallery();
}

function updateGallery() {
    gallery.innerHTML = '';

    for (let i = 0; i < images.length; i++) {
        addImageToGallery(images[i]);
    }
}

function handleImageUpload(files) {
    for (const file of files) {
        const reader = new FileReader();

        reader.onload = function(event) {
            const imageData = {
                url: event.target.result
            };

            images.push(imageData);
            saveImagesToLocalStorage();
            updateGallery();
        };

        reader.readAsDataURL(file);
    }
}

photoInput.addEventListener('change', function(event) {
    const files = event.target.files;
    handleImageUpload(files);
});

document.getElementById('save-button').addEventListener('click', () => {
    saveImagesToLocalStorage();
    alert('Images saved to local storage.');
});

document.getElementById('back-button').addEventListener('click', () => {
    history.back();
});

// Load images from local storage on page load
images = JSON.parse(localStorage.getItem('images')) || [];
updateGallery();