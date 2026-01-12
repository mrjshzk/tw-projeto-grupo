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

class User {
  constructor(name, email, password, gender) {
    this.username = name;
    this.email = email;
    this.password = password;
    this.gender = gender;
  }
}
// Para tambem dar para para fazer login
let default_users = [new User("admin", "admin@admin", "admin", "none")];
localStorage.setItem("users", default_users);
