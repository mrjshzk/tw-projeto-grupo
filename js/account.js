import { session, setUser } from "./session.js";
import { addToast } from "./toasts.js";

const popoverTriggerList = document.querySelectorAll(
  '[data-bs-toggle="popover"]',
);
const popoverList = [...popoverTriggerList].map(
  (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl),
);
if (session.loggedIn) {
  contentContainer.innerHTML = `Welcome ${session.user.username}`;
} else {
  let fieldInvalid = (f) => f == "" || f == undefined;
  document
    .getElementById("createAccountForm")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      let email = emailField.value;
      let username = nameField.value;
      let password = passwordField.value;
      let gender = genderField.value;

      if (fieldInvalid(email)) {
        addToast("The email provided is invalid.");
        return;
      }

      if (fieldInvalid(username)) {
        addToast("The username provided is invalid.");
        return;
      }

      if (fieldInvalid(password)) {
        addToast("The password provided is invalid.");
        return;
      }

      if (fieldInvalid(password)) {
        addToast("The gender provided is invalid.");
        return;
      }

      setUser(new User(username, email, password, gender));
      location.reload();
    });
}

class User {
  constructor(name, email, password, gender) {
    this.username = name;
    this.email = email;
    this.password = password;
    this.gender = gender;
  }
}
