const MAX_IMAGES = 4;
const MAX_SIZE = 2 * 1024 * 1024; // 2MB
let images = [];
let editingIndex = null;

// Update counter
function updateCounter() {
    $("#uploadCounter").text(`${images.length}/${MAX_IMAGES}`);
}

// Drag & Drop Events
$("#dropArea").on("click", function () {
    if (images.length < MAX_IMAGES) {
        $("#fileInput").trigger("click");
    } else {
        showError("Upload limit reached.");
    }
});

$("#dropArea").on("dragover", function (e) {
    e.preventDefault();
    $(this).addClass("drag-over");
});

$("#dropArea").on("dragleave", function () {
    $(this).removeClass("drag-over");
});

$("#dropArea").on("drop", function (e) {
    e.preventDefault();
    $(this).removeClass("drag-over");
    handleFiles(e.originalEvent.dataTransfer.files);
});

$("#fileInput").on("change", function (e) {
    handleFiles(e.target.files);
});

function handleFiles(files) {
    if (images.length >= MAX_IMAGES) {
        showError("Upload limit reached.");
        return;
    }

    const file = files[0];
    if (file) {
        if (!file.type.startsWith("image/")) {
            showError("Only images are allowed.");
            return;
        }

        if (file.size > MAX_SIZE) {
            showError("Image size must be less than 2MB.");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => openPopup(reader.result);
        reader.readAsDataURL(file);
    }
}

function openPopup(imageSrc, index = null) {
    $("#modalImage").attr("src", imageSrc);
    editingIndex = index;

    if (images.length === 0) {
        $("#featuredBadge").parent().hide();
    } else {
        $("#featuredBadge").parent().show();
    }

    if (index !== null) {
        $("#imageCaption").val(images[index].caption);
        $("#featuredBadge").prop("checked", images[index].featured);
    } else {
        $("#imageCaption").val("");
        $("#featuredBadge").prop("checked", images.length === 0);
    }

    $("#uploadImgPopup").modal("show");
}


$("#addImageButton").on("click", function () {
    const newImage = {
        src: $("#modalImage").attr("src"),
        caption: $("#imageCaption").val(),
        featured: $("#featuredBadge").is(":checked"),
    };

    if (newImage.featured) {
        images.forEach((img) => (img.featured = false));
    }

    if (editingIndex !== null) {
        images[editingIndex] = newImage;
    } else {
        if (images.length < MAX_IMAGES) {
            newImage.featured = images.length === 0 ? true : newImage.featured;
            images.push(newImage);
        }
    }

    renderImages();
    $("#uploadImgPopup").modal("hide");
    resetPopupFields();
    checkUploadLimit();
});

function resetPopupFields() {
    $("#modalImage").attr("src", "");
    $("#imageCaption").val("");
    $("#featuredBadge").prop("checked", false);
}

function renderImages() {
    const $uploadedImages = $("#uploadedImages");
    $uploadedImages.empty();
    images.forEach((img, index) => {
        const listItem = $(`
      <div class="item">
        <img src="${img.src}" alt="Image ${index + 1}" class="img-fluid">
        <div class="content">
        ${img.featured
                ? '<span class="badge">Featured</span>'
                : ""
            }
        <p>${img.caption || "Click on edit to add a caption."}</p>
        </div>
        <div>
          <button type="button" class="btn edit-btn" data-index="${index}"><i class="gol-edit"></i></button>
          <button type="button" class="btn delete-btn" data-index="${index}"><i class="gol-trash"></i></button>
        </div>
      </div>
    `);
        $uploadedImages.append(listItem);
    });
    updateCounter();
}

$(document).on("click", ".edit-btn", function () {
    const index = $(this).data("index");
    openPopup(images[index].src, index);
});

$(document).on("click", ".delete-btn", function () {
    const index = $(this).data("index");
    const wasFeatured = images[index].featured; // Check if the deleted image was featured
    images.splice(index, 1); // Remove the image from the array

    if (wasFeatured && images.length > 0) {
        // If the deleted image was featured, assign featured to the first image
        images[0].featured = true;
    }

    renderImages();
    checkUploadLimit();
});

function checkUploadLimit() {
    if (images.length >= MAX_IMAGES) {
        $("#dropArea").addClass("disabled");
        showError("Upload limit reached. Delete an image to add more.");
    } else {
        $("#dropArea").removeClass("disabled");
        $("#errorMessage").text("");
    }
    updateCounter();
}

function showError(message) {
    $("#errorMessage").text(message);
}
