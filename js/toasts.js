const toastContainerTemplate = `
<div id="toast-container" class="toast-container position-fixed bottom-0 end-0 p-3"></div>
`;

/*
 * addToast:
 *    - init toast-container
 *    - generate a toast from template, replace message and give it
 *          some special id
 *    - create timer and bind its end to deleting the toast with said id
 * */

export function addToast(msg) {
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    document.body.innerHTML += toastContainerTemplate;
    toastContainer = document.getElementById("toast-container");
  }
  const newToastUid = Date.now() + Math.random();

  const toastTemplate = `
<div id="${newToastUid}" class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="d-flex bg-danger">
    <div id="toast-msg" class="toast-body">
    ${msg} 
    </div>
    <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
</div>
`;

  toastContainer.innerHTML += toastTemplate;
  const toastLiveExample = document.getElementById(newToastUid);
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastBootstrap.show();
}
