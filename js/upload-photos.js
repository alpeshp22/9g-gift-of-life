$(document).ready(function () {
    const maxPhotos = 4;
    const maxFileSize = 2 * 1024 * 1024; // 2 MB
    let photoCount = 0;
    let currentEditingItem = null;
    let isFileInputOpen = false; // Flag to check if file input is open
    let featuredItem = null; // Track the currently featured item

    const updatePhotoCount = () => {
        $("#uploadCount").text(`${photoCount}/${maxPhotos} uploaded`);

        if (photoCount >= maxPhotos) {
            $("#photoUploadView").addClass("disabled");
            $("#photoUploadView").off("click dragover dragleave drop"); // Disable all events
        } else {
            $("#photoUploadView").removeClass("disabled");
            bindPhotoUploadEvents();
        }
    };

    const addPhotoToList = (imageSrc, caption = "", isFeature = false) => {
        const placeholder = caption.trim()
            ? caption
            : "Click on edit to add a caption.";
        const featureBadge = isFeature ? `Featured` : "";
        const photoItem = `
    <div class="item" data-feature="${isFeature}">
      <img src="${imageSrc}" alt="Uploaded Photo" />
      <div class="content">
        <p>${placeholder}</p>
      </div>
      <div>
        <button type="button" class="btn btn-edit"><i class="gol-edit"></i></button>
        <button type="button" class="btn btn-delete"><i class="gol-trash"></i></button>
      </div>
    </div>
  `;
        $("#photoList").append(photoItem);

        if (isFeature) {
            updateFeaturedItem($("#photoList .item").last());
        }

        photoCount++;
        updatePhotoCount();
    };

    const updateFeaturedItem = (newFeaturedItem) => {
        if (featuredItem) {
            featuredItem.find(".badge").remove(); // Remove the badge from the previously featured item
            featuredItem.data("feature", false);
        }
        if (newFeaturedItem) {
            newFeaturedItem.find(".content").prepend('<span class="badge">Featured</span>');
            newFeaturedItem.data("feature", true);
            featuredItem = newFeaturedItem;
        } else {
            featuredItem = null;
        }
    };

    // Show error message
    const showError = (message) => {
        const errorElement = `<p class="error-message" style="color: red; font-size: 12px; margin-top: 5px;">${message}</p>`;
        $(".photo-upload-view").next(".error-message").remove(); // Remove existing error messages
        $(".photo-upload-view").after(errorElement); // Add new error message after the photo upload view
    };

    // Clear error message
    const clearError = () => {
        $(".photo-upload-view").next(".error-message").remove(); // Remove any existing error message
    };


    const handleFileUpload = (files) => {
        const fileInput = $("#fileInput");
        fileInput.prop("disabled", true);

        if (photoCount >= maxPhotos) {
            showError("You can only upload up to 4 photos.");
            return;
        } else {
            clearError();
        }

        for (const file of files) {
            if (file.size > maxFileSize) {
                showError(`File size should not more then 2MB.`);
                continue;
            } else {
                clearError();
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                currentEditingItem = null; // Reset current editing item for new uploads
                $("#popupImagePreview").attr("src", e.target.result);
                $("#imageCaption").val("");
                $("#featureImageCheck").prop("checked", false);
                $("#uploadImgPopup").modal("show");
            };
            reader.readAsDataURL(file);
        }

        fileInput.prop("disabled", false);
        isFileInputOpen = false;
    };

    $(document).on("click", "#save-caption", function () {
        const caption = $("#imageCaption").val();
        const isFeature = $("#featureImageCheck").is(":checked");

        if (currentEditingItem) {
            const placeholder = caption.trim()
                ? caption
                : "Click on edit to add a caption.";
            currentEditingItem.find("p").text(placeholder);

            // Update the badge and feature status
            if (isFeature) {
                updateFeaturedItem(currentEditingItem);
            } else if (currentEditingItem.data("feature")) {
                updateFeaturedItem(null);
            }
        } else {
            const imageSrc = $("#popupImagePreview").attr("src");
            addPhotoToList(imageSrc, caption, isFeature);
        }

        $("#uploadImgPopup").modal("hide");
    });

    $(document).on("click", ".btn-delete", function () {
        const item = $(this).closest(".item");
        if (item.data("feature")) {
            updateFeaturedItem(null); // Clear the featured item if the deleted item is featured
        }
        item.remove();
        photoCount--;
        updatePhotoCount();
    });

    $(document).on("click", ".btn-edit", function () {
        const item = $(this).closest(".item");
        const imgSrc = item.find("img").attr("src");
        const caption = item.find("p").text().trim() === "Click on edit to add a caption."
            ? ""
            : item.find("p").text();
        const isFeature = item.data("feature");

        currentEditingItem = item;

        $("#popupImagePreview").attr("src", imgSrc);
        $("#imageCaption").val(caption);
        $("#featureImageCheck").prop("checked", isFeature);
        $("#uploadImgPopup").modal("show");
    });

    const bindPhotoUploadEvents = () => {
        $("#photoUploadView").on("click", () => {
            if (isFileInputOpen) return;

            isFileInputOpen = true;

            const fileInput = $(`<input type="file" id="fileInput" accept="image/*" multiple hidden />`);
            fileInput.on("change", (e) => handleFileUpload(e.target.files));
            fileInput.trigger("click");
        });
    };

    updatePhotoCount();
    bindPhotoUploadEvents();
});