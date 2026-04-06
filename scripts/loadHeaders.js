//ACTUAL HEADER MANAGER
function getHeaderFile() {
const path = window.location.pathname;

  if (path.includes("/publications/")) return "/includes/header_post.html";
  else if(path.includes("/posts.html")) return "/includes/header_post_list.html";
  else return "includes/header_index.html";
}

async function loadHeader() {
  const file = await getHeaderFile();
  const element = document.getElementById("site-header");

  if (!element) return;

  const res = await fetch(file);
  element.innerHTML = await res.text();
  initModeToggle();
  syncButtonText();
}

window.addEventListener("DOMContentLoaded", loadHeader);


//CODE FORMATTER (PUBLICATIONS) & EXPAND/COLLAPSE FUNCTION
function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("pre.code").forEach((pre) => {
    const code = pre.querySelector("code");
    if (!code) return;

    const marker = "[[MORE]]";
    const raw = code.textContent;
    if (!raw.includes(marker)) return;

    const [head, tail] = raw.split(marker); //splits at the marker

    code.innerHTML =
      `${escapeHtml(head)}` +
      `<span class="dots">...</span>` +
      `<span class="more" hidden>${escapeHtml(tail)}</span>`;//Injects <spans> at the sliced points

    const button = document.createElement("button");
    button.className = "read-more";
    button.type = "button";
    button.textContent = "Read more";

    button.addEventListener("click", () => {
      const dots = code.querySelector(".dots");
      const more = code.querySelector(".more");

      const isHidden = more.hidden;
      more.hidden = !isHidden;
      dots.hidden = isHidden;
      button.textContent = isHidden ? "Read less" : "Read more";
    });

    pre.after(button);
  });
});

function initModeToggle() {
  const html = document.documentElement; // correct way
  const button = document.getElementById("header-button");

  if (!button) return;

document.addEventListener("click", (element) => {
  if (element.target.id !== "header-button") return;

  const html = document.documentElement;
  const isLight = html.classList.contains("lightmode");

  const newMode = isLight ? "darkmode" : "lightmode";

  html.classList.remove("lightmode", "darkmode");
  html.classList.add(newMode);

  localStorage.setItem("mode", newMode);

  element.target.textContent =
    newMode === "lightmode"
      ? "Displaying: Light mode"
      : "Displaying: Dark mode";
});
}

function syncButtonText() {
  const button = document.getElementById("header-button");
  if (!button) return;

  const isLight = document.documentElement.classList.contains("lightmode");

  button.textContent =
    isLight ? "Displaying: Light mode" : "Displaying: Dark mode";
}

