import { session, setUser, User, defaultUsers } from "./session.js";
import { addToast } from "./toasts.js";

if (session.loggedIn) {
  window.location.href = "/account.html";
} else {
  let fieldInvalid = (f) => f == "" || f == undefined;
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    let username = nameField.value;
    let password = passwordField.value;

    if (fieldInvalid(username)) {
      addToast("The username provided is invalid.");
      return;
    }

    if (fieldInvalid(password)) {
      addToast("The password provided is invalid.");
      return;
    }

    console.log(defaultUsers);
    for (const user of defaultUsers) {
      if (user.email == username || user.username == username) {
        if (user.password == password) {
          console.log("hey");
          setUser(new User(user.username, user.email, user.password));
          window.location.href = "/account.html";
          return;
        }
      }
    }
  });
}
