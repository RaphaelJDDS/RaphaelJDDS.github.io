
function getFooterFile() {
  return "../includes/footer.html";
}

async function loadFooter() {
  const file = getFooterFile();
  const element = document.getElementById("site-footer");

  if (!element) return;

  const res = await fetch(file);
  element.innerHTML = await res.text();
}

window.addEventListener("DOMContentLoaded", loadFooter);