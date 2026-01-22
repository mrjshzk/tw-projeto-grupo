import { addToast } from "./toasts.js";
import { session } from "./session.js";
import { adminGeneratedMovies, updateTableData } from "./store.js";

addMovieForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!session.loggedIn || !session.user.username == "admin") {
    addToast("Only administrators can add content.");
    return;
  }

  adminGeneratedMovies.push({
    Series_Title: addMovieTitle.value,
    Genre: addMovieGenre.value,
    Overview: addMovieOverview.value,
    Image: "tbd.jpg",
  });
  updateTableData();
});
