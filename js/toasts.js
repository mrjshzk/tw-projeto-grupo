const toastContainerTemplate = `
<div id="toast-container"
     class="toast-container position-fixed bottom-0 end-0 p-3"
     style="z-index: 1060; pointer-events: none;">
</div>
`;

export function addToast(msg) {
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    document.body.insertAdjacentHTML("beforeend", toastContainerTemplate);
    toastContainer = document.getElementById("toast-container");
  }

  const newToastUid = `t_${Date.now()}_${Math.random().toString(16).slice(2)}`;

  const toastTemplate = `
<div id="${newToastUid}"
     class="toast align-items-center"
     role="alert" aria-live="assertive" aria-atomic="true"
     style="pointer-events: auto;">
  <div class="d-flex bg-danger">
    <div class="toast-body">${msg}</div>
    <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
</div>
`;

  toastContainer.insertAdjacentHTML("beforeend", toastTemplate);

  const toastEl = document.getElementById(newToastUid);
  const toast = bootstrap.Toast.getOrCreateInstance(toastEl, {
    delay: 2500,
    autohide: true,
  });

  toastEl.addEventListener("hidden.bs.toast", () => toastEl.remove());
  toast.show();
}
