/*function escapeHtml(text) {
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

    const [head, tail] = raw.split(marker);

    code.innerHTML =
      `${escapeHtml(head)}` +
      `<span class="dots">...</span>` +
      `<span class="more" hidden>${escapeHtml(tail)}</span>`;

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
});*/