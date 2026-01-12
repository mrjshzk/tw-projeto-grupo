import { session } from "./session.js";

if (session.loggedIn) {
  contentContainer.innerHTML = `Welcome ${session.user.username}`;
}
