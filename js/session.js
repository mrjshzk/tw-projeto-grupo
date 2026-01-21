export const session = {
  loggedIn: false,
  user: null,
};

export function setUser(user) {
  console.log("setting...");
  localStorage.setItem("user", JSON.stringify(user));
  session.user = user;

  localStorage.setItem("loggedIn", true);
  session.loggedIn = true;
  console.log(session);
}

export function clearUser() {
  localStorage.removeItem("user");
  session.user = null;

  localStorage.removeItem("loggedIn");
  session.loggedIn = false;
}

if (localStorage.getItem("loggedIn")) {
  let user_json = localStorage.getItem("user");
  let user = JSON.parse(user_json);
  setUser(user);
}

export class User {
  constructor(name, email, password) {
    this.username = name;
    this.email = email;
    this.password = password;
  }
}
// Para tambem dar para para fazer login
export const defaultUsers = [new User("admin", "admin@admin", "admin")];
localStorage.setItem("users", JSON.stringify(defaultUsers));
