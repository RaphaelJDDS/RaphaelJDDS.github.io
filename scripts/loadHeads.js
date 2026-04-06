function getHeadFile() {
const path = window.location.pathname;
     console.log(path);

  if(path.includes("/publications/")){
     console.log("Head detected");
     return "/includes/head_post_post_list.html"
    }
  else if(path.includes("/posts.html")) return "../includes/head_post_post_list.html";
  else return "includes/head_index.html";
}

async function loadHead() {
  const file =  getHeadFile();
  const head_element = document.getElementById("site-head");

  if (!head_element) return;

  const html = await fetch(file);
  head_element.innerHTML = await html.text();
}

window.addEventListener("DOMContentLoaded", loadHead);