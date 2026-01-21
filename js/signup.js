import { session, setUser, User } from "./session.js";
import { addToast } from "./toasts.js";

if (session.loggedIn) {
  window.location.href = "account.html";
} else {
  let fieldInvalid = (f) => f == "" || f == undefined;
  document
    .getElementById("createAccountForm")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      let email = emailField.value;
      let username = nameField.value;
      let password = passwordField.value;

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

      setUser(new User(username, email, password));
      window.location.href = "account.html";
    });
}
