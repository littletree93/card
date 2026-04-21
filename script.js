(function () {
  const toast = document.getElementById("toast");

  function showToast(message, ok) {
    if (!toast) return;
    toast.hidden = false;
    toast.textContent = message;
    toast.classList.toggle("toast--ok", Boolean(ok));
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(function () {
      toast.textContent = "";
      toast.hidden = true;
      toast.classList.remove("toast--ok");
    }, 2200);
  }

  async function writeClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  }

  document.querySelectorAll("[data-copy-btn]").forEach(function (button) {
    button.addEventListener("click", function () {
      const text = button.getAttribute("data-copy-btn");
      if (!text) return;
      writeClipboard(text)
        .then(function () {
          showToast("클립보드에 복사했습니다.", true);
        })
        .catch(function () {
          showToast("복사에 실패했습니다.", false);
        });
    });
  });
})();
