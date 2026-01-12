let carousel_template = `
		<div id="movieCarousel" class="carousel slide" data-bs-ride="carousel">

			<!-- Indicators (Optional) -->
			<div class="carousel-indicators">
				<button type="button" data-bs-target="#movieCarousel" data-bs-slide-to="0"
					class="active" aria-current="true" aria-label="Slide 1"></button>
				<button type="button" data-bs-target="#movieCarousel" data-bs-slide-to="1"
					aria-label="Slide 2"></button>
				<button type="button" data-bs-target="#movieCarousel" data-bs-slide-to="2"
					aria-label="Slide 3"></button>
			</div>

<div class="carousel-inner rounded-3">
</div>
	<!-- Controls -->
	<button class="carousel-control-prev" type="button" data-bs-target="#movieCarousel" data-bs-slide="prev">
		<span class="carousel-control-prev-icon" aria-hidden="true"></span>
		<span class="visually-hidden">Previous</span>
	</button>
	<button class="carousel-control-next" type="button" data-bs-target="#movieCarousel" data-bs-slide="next">
		<span class="carousel-control-next-icon" aria-hidden="true"></span>
		<span class="visually-hidden">Next</span>
	</button>
	</div>
`;

carousel_container.innerHTML += carousel_template;
createCarouselItem("Inception", "movie", "img/backdrops/inception.jpg");
createCarouselItem("Inception", "movie", "img/backdrops/inception.jpg");
createCarouselItem("Inception", "movie", "img/backdrops/inception.jpg");

function createCarouselItem(title, desc, img) {
  let newCarouselItem = `
<div class="carousel-item active movie-carousel-item">
	<img src="${img}"
		class="d-block w-100" alt="${title}">
	<div class="overlay-shadow"></div>
	<div class="carousel-caption-left">
		<h2 class="display-5 fw-bold">${title}</h2>
		<p class="fs-5">${desc}</p>
	</div>
`;
  document.querySelector(".carousel-inner").innerHTML += newCarouselItem;
}
