createCarouselItem(
  "Spirited Away",
  "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
  "img/backdrops/spirited_away.jpg",
);
createCarouselItem(
  "Room",
  "Held captive for 7 years in an enclosed space, a woman and her young son finally gain their freedom, allowing the boy to experience the outside world for the first time.",
  "img/backdrops/room.jpg",
);
createCarouselItem(
  "Inception",
  "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
  "img/backdrops/inception.jpg",
);

function createCarouselItem(title, desc, img) {
  let newCarouselItem = `
<div class="carousel-item active h-100">
        <div class="d-flex align-items-end text-white h-100"
             style="min-height:100vh;background:
             linear-gradient(to right, rgba(0,0,0,.85), rgba(0,0,0,.25)),
             url(${img})
             center/cover no-repeat;">
          <div class="container mb-5 pb-5">
            <h1 class="display-4 fw-bold">${title}</h1>
            <p class="lead col-md-8">${desc}</p>
          </div>
        </div>
`;
  document.querySelector(".carousel-inner").innerHTML += newCarouselItem;
}
