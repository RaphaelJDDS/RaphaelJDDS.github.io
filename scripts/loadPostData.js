import { loadJSONData } from "./JSON_Loader.js";

async function getPostData(data) {
  const path = window.location.pathname;

  for (var i = data.length -1; i < data.length; i--) {
    if(path.includes(data[i].url)){
      console.log("Match found");
      return data[i];
    }
  }
}

async function loadPostInfo() {  
  const data = await loadJSONData("../postsList.json");
  const contents = await getPostData(data);
  console.log(contents)

  const title = document.getElementById("post-title");
  const time = document.getElementById("DateAndTime");

  title.innerHTML = contents.title;
  time.innerHTML = contents.time;
}

window.addEventListener("DOMContentLoaded", loadPostInfo);