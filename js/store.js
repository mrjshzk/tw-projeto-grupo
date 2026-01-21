import { session } from "./session.js";
import { addToast } from "./toasts.js";

let movies;
fetch("../20_movies.json")
  .then((response) => response.json())
  .then((mov) => {
    movies = mov;
    OnMovieDataFetched();
  })
  .catch((err) => console.error(err));

const cardContainer = document.querySelector("#cardContainer");
const inputSearch = document.querySelector("#inputSearch");
const select = document.querySelector("#inputSelect");

// filter variables
let search = "";
let genre = "";

const distinctGenres = [
  "Drama",
  "Crime",
  "Action",
  "Adventure",
  "History",
  "Sci-Fi",
  "Romance",
  "Comedy",
  "Thriller",
  "Animation",
  "Family",
  "War",
  "Mystery",
  "Musical",
  "Film-Noir",
];

function OnMovieDataFetched() {
  if (!movies?.MovieData) return;
  distinctGenres.forEach(addGenreOption);
  UpdateCardContainerInnerHTML(movies.MovieData);
}
inputSearch.addEventListener("input", (e) => {
  search = e.target.value;
  updateTableData();
});

select.addEventListener("input", (e) => {
  genre = e.target.value;
  updateTableData();
});

function updateTableData() {
  if (!movies || !movies.MovieData) return;

  let filteredData = movies.MovieData;

  // filter from search
  if (search.length) {
    filteredData = filteredData.filter((movie) => {
      return movie.Series_Title.toString()
        .toLowerCase()
        .includes(search.toLowerCase());
    });
  }

  // filter from genre
  if (genre.length) {
    filteredData = filteredData.filter((movie) => {
      return movie.Genre.toString().toLowerCase().includes(genre.toLowerCase());
    });
  }
  UpdateCardContainerInnerHTML(filteredData);
}

function addGenreOption(genre) {
  var option = document.createElement("option");

  option.text = genre;
  option.value = genre;

  select.add(option, null);
}

function UpdateCardContainerInnerHTML(data) {
  cardContainer.innerHTML = data
    .map((movie) =>
      getCardFromMovieData(
        "./img/posters/" + movie.Image,
        movie.Series_Title,
        movie.Overview,
        movie.Genre,
      ),
    )
    .join(" ");
}

function getCardFromMovieData(image, title, overview, genre) {
  return `
    <div class="col-sm-12 col-md-6 col-lg-4 pt-5">
      <div class="card bg-dark text-light border-0 shadow-lg overflow-hidden h-100"
           style="border-radius: 1rem;">
        <div class="position-relative w-100" style="padding-top: 150%;">
          <img
            src="${image}"
            class="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
            alt="${title} poster"/>
          <div class="position-absolute top-0 start-0 end-0 bottom-0 d-flex flex-column"
               style="
                 background: linear-gradient(
                   to bottom,
                   rgba(0,0,0,.75) 0%,
                   rgba(0,0,0,0) 35%,
                   rgba(0,0,0,.0) 55%,
                   rgba(0,0,0,.92) 100%
                 );">

            <div class="p-2 d-flex justify-content-center">
              <span class="badge rounded-pill bg-danger px-3 py-2 small text-uppercase fw-semibold"
                    style="letter-spacing:.08em;">
                ${genre}
              </span>
            </div>

            <div class="mt-auto">
              </div>
              <div class="text-center mb-3">
              <button type="button"
                      class="rounded-pill btn btn-danger btn-sm w-50 fw-semibold learn-more-btn"
                      data-bs-toggle="modal"
                      data-bs-target="#movieModal"
                      data-title="${title}"
                      data-image="${image}"
                      data-overview="${overview}"
                      data-genre="${genre}"
                      >
                Learn more
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

const comments = {};

function setModalData(image, title, overview, genre) {
  modalImage.src = image;
  modalTitle.innerHTML = title;
  modalDesc.innerHTML = overview;
  modalGenre.innerHTML = genre;
}

// Update modal data with selected movie
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".learn-more-btn");
  if (!btn) {
    return;
  }
  setModalData(
    btn.dataset.image,
    btn.dataset.title,
    btn.dataset.overview,
    btn.dataset.genre,
  );

  const title = btn.dataset.title;
  if (!comments[title]) comments[title] = [];

  const listEl = document.getElementById("commentsList");
  listEl.innerHTML = "";
  commentContainer.value = "";
  ratingContainer.value = "";

  for (const [c, r, user, date] of comments[title]) {
    renderComment(c, r, user, date);
  }
});

submitCommentBtn.addEventListener("click", () => {
  let comment = commentContainer.value;
  let rating = ratingContainer.value;
  addComment(comment, rating);
});

function addComment(comment, rating) {
  if (commentContainer.value == "") {
    addToast("Please write a comment.");
    return;
  }
  if (ratingContainer.value == "") {
    addToast("Please set a rating.");
    return;
  }
  commentContainer.value = "";
  ratingContainer.value = "";

  if (!session.loggedIn) {
    addToast("You need to be logged in to comment.");
    return;
  }

  const title = modalTitle.innerText;
  if (!comments[title]) comments[title] = [];

  const date = new Date();
  const formatted = date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  comments[title].push([comment, rating, session.user.username, formatted]);
  renderComment(comment, rating, session.user.username, formatted);
}

function renderComment(comment, rating, username, formatted) {
  document.getElementById("commentsList").innerHTML += `
    <div class="list-group-item bg-transparent text-light border-secondary px-0">
      <div class="d-flex justify-content-between align-items-start">
        <div class="me-3">
          <div class="fw-semibold">${username}</div>
          <div class="small text-white-50">${comment}</div>
          <div class="small text-secondary mt-1">${formatted}</div>
        </div>
        <span class="badge bg-danger rounded-pill">${rating} ★</span>
      </div>
    </div>
  `;
}

// just to be safe, rerender movies because live-server tends to wipe everything :(
document.addEventListener("visibilitychange", () => {
  if (!document.hidden && movies?.MovieData) {
    updateTableData();
  }
});
