import { loadJSONData } from "./JSON_Loader.js";

async function loadList(){

const data = await loadJSONData("../postsList.json");
var mainContent = document.getElementById('main-content');  // Get the main content div
    // Iterator for each object

for (var i = data.length -1; i > 0; i--) {
    var div = document.createElement('div');
    var div = document.createElement('div');
    var title = document.createElement('h1');
    title.className = 'publication-title';

    var a = document.createElement('a');
    a.textContent = data[i].title;
    a.href = data[i].url;
    a.className = 'postslist-title';
    
    title.appendChild(a);
    var time = document.createElement('p');

    time.textContent = data[i].time;
    time.className = 'publication-title';
    time.id = 'DateAndTime';
    
    div.appendChild(title);
    div.appendChild(time);
    mainContent.appendChild(div);
}
}

loadList();