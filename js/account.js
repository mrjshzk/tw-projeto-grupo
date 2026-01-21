import { session, clearUser } from "./session.js";

if (session.loggedIn) {
  let username = session.user.username;
  let email = session.user.email;
  let passLen = session.user.password.length;
  let passHidden = "";

  for (let i = 0; i < passLen; i++) {
    passHidden += "*";
  }
  nameField.innerText = username;
  emailField.innerText = email;
  passwordField.innerText = passHidden;
} else {
  window.location.href = "signup.html";
}

document.getElementById("logout").addEventListener("click", () => {
  clearUser();
  window.location.href = "signup.html";
});
