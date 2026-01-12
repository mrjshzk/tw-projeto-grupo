document.body.innerHTML += `
<button class="btn btn-danger position-fixed bottom-0 p-3" id="resetBtn">
  DELETE LOCALSTORAGE
</button>
`;
resetBtn.addEventListener("click", () => {
  alert("Deleted LocalStorage");
  localStorage.removeItem("user");
  localStorage.removeItem("loggedIn");
  location.reload();
});
