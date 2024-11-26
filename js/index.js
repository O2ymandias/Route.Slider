"use strict";

const lightBox = document.querySelector("#lightBox");
const slider = document.querySelector("#slider");
const allImages = Array.from(document.querySelectorAll(".image"));
for (let i = 0; i < allImages.length; i++) {
	allImages[i].setAttribute("data-index", i);
}

function closeLightBox() {
	lightBox.classList.replace("d-block", "d-none");
}

function openLightBox() {
	lightBox.classList.replace("d-none", "d-block");
}

document.addEventListener("keydown", function (event) {
	if (event.key === "Escape") closeLightBox();
});

function updateMainImage(image) {
	const mainImage = document.querySelector("#mainImage");
	mainImage.setAttribute("src", image.getAttribute("src"));
	mainImage.setAttribute("data-index", image.getAttribute("data-index"));
}

function getNextOrPreviousImage(currentImageIndex, direction) {
	if (direction === "prev") {
		return currentImageIndex === 0
			? allImages.at(-1)
			: allImages.at(currentImageIndex - 1);
	} else {
		return currentImageIndex === allImages.length - 1
			? allImages.at(0)
			: allImages.at(currentImageIndex + 1);
	}
}

slider.addEventListener("click", function (event) {
	if (
		event.target.classList.contains("lightbox__layer") ||
		event.target.id === "close"
	) {
		closeLightBox();
		return;
	}

	if (event.target.classList.contains("image")) {
		updateMainImage(event.target);
		openLightBox();
	}

	if (event.target.id === "prev" || event.target.id === "next") {
		const currentImageIndex = Number(
			document.querySelector("#mainImage").getAttribute("data-index")
		);

		const nextOrPrevious = getNextOrPreviousImage(
			currentImageIndex,
			event.target.id
		);
		updateMainImage(nextOrPrevious);
	}
});
