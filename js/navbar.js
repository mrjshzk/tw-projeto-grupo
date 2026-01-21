// needed because github pages :(
const redirectToLogin = () => {
  window.location.assign(new URL("login.html", window.location.href));
};

const redirectToSignup = () => {
  window.location.assign(new URL("signup.html", window.location.href));
};
let navbar = `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary">
  <div class="container">

    <a class="navbar-brand fw-bold text-danger" href="index.html">CineStore</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#cineNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="cineNavbar">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" href="store.html">Store</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="account.html">Account</a>
        </li>
      </ul>
      <div class="d-flex gap-2">
        <button onclick="redirectToLogin()" class="btn btn-outline-light">Login</button>
        <button onclick="redirectToSignup()" class="btn btn-danger">Sign up</button>
      </div>
    </div>
  </div>
</nav>
`;

document.body.innerHTML += navbar;
