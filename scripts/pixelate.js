// All hail this chap (A. Hanser)!!
function getPageHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );
}

function pixelate(tileSize = 4, sigmaGauss = 0.1) {
  tileSize = tileSize < 1 ? 1 : tileSize;
  sigmaGauss = sigmaGauss < 0 ? 0 : sigmaGauss;

  const content = document.getElementById("main-content");
  const pixelateFilter = document.getElementById("pixelate");

    if (tileSize <= 1 && sigmaGauss <= 0) {
    pixelateFilter.innerHTML = "";
    content.style.filter = "none";
    return;
  }

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = getPageHeight();

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const rows = Math.ceil(canvas.height / tileSize);
  const cols = Math.ceil(canvas.width / tileSize);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      ctx.fillStyle = "white";
      ctx.fillRect(
        c * tileSize - 1 + Math.floor(tileSize / 2),
        r * tileSize - 1 + Math.floor(tileSize / 2),
        Math.sqrt(tileSize),
        Math.sqrt(tileSize)
      );
    }
  }

  content.style.filter = "none";
  void content.offsetWidth;

  pixelateFilter.innerHTML = "";

  const blur = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "feGaussianBlur"
  );
  blur.setAttribute("in", "SourceGraphic");
  blur.setAttribute("stdDeviation", sigmaGauss);
  blur.setAttribute("result", "blurred");

  const hmap = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "feImage"
  );
  hmap.setAttribute("href", canvas.toDataURL());
  hmap.setAttribute("result", "hmap");

  const blend = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "feBlend"
  );
  blend.setAttribute("mode", "multiply");
  blend.setAttribute("in", "blurred");
  blend.setAttribute("in2", "hmap");
  blend.setAttribute("result", "blended");

  const morph = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "feMorphology"
  );
  morph.setAttribute("in", "blended");
  morph.setAttribute("operator", "dilate");
  morph.setAttribute("radius", tileSize / 2);

  pixelateFilter.setAttribute("x", "0");
  pixelateFilter.setAttribute("y", "0");
  pixelateFilter.setAttribute("width", String(canvas.width));
  pixelateFilter.setAttribute("height", String(canvas.height));
  pixelateFilter.setAttribute("filterUnits", "userSpaceOnUse");

  pixelateFilter.appendChild(blur);
  pixelateFilter.appendChild(hmap);
  pixelateFilter.appendChild(blend);
  pixelateFilter.appendChild(morph);

  content.style.filter = "url(#pixelate)";
}

function pixelationAnimation() {
  const frames = [
    { tileSize: 12, sigma: 1.2 },
    { tileSize: 9, sigma: 0.9 },
    { tileSize: 4, sigma: 0.4 },
    { tileSize: 1, sigma: -0.1 },
  ];

  let i = 0;

  function nextFrame() {
    if (i >= frames.length) return;
    pixelate(frames[i].tileSize, frames[i].sigma);
    i++;
    setTimeout(nextFrame, 200);
  }

  nextFrame();
}

window.addEventListener("load", () => {
  pixelationAnimation();
});

window.addEventListener("resize", () => {
  pixelate(1, 0);
});