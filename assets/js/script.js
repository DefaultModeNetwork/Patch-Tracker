const steamAPIUrl = "https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/";
const steamAppIDTerm = "?appid=";
const steamAPITagTerm = "&tags=patchnotes";
const apiFix = "https://proxy.cors.sh/"
const testGame = "Last Epoch" // Last Epoch App ID: 899770, current patch: 0.8.5
const testIds = ["appid: 899770, name: Last Epoch", "appid: 238960, name: Path of Exile", "appid: 1245620, name: Elden Ring"]

const contentEl = document.querySelector("#content");
var inputEl = document.querySelector("#user-input");

async function callSteamNewsAPI(inputAppid) {
    const video = await callYoutubeAPI()
    console.log(video)
    fetch(apiFix + steamAPIUrl + steamAppIDTerm + inputAppid + steamAPITagTerm)
        // let result = await fetch(testUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            let patchData = data.appnews.newsitems[0]
            renderGameInfo(patchData.title, patchData.contents, patchData.url, video);
        })
}

const renderVideo = (json) => {
    const items = json.items[0]
    const videoId = items.id.videoId || items.id.channelId || ''
  console.log(json,videoId,items)
   return `<iframe width="280" height="160" src="https://www.youtube.com/embed/${videoId}?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; 
  clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    
//   const wrapper = document.getElementById('youtube-wrapper')
//   wrapper.innerHTML = frame
  
  }
  
/* Waiting for Youtube API */
async function callYoutubeAPI() {
    var gameName = document.getElementById("game-name").value
    console.log(gameName)
    const key = 'AIzaSyBhm51niYzxBdPH_lm8AqoIAyIv74eQF4M'
	const url = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&'
    
    return await fetch(`${url}q=${gameName}&key=${key}`).then((res) => res.json()).then(json => renderVideo(json)) //only calls video if fetch works
}




    //needs to call the youtube api with a q value of gameName + patchName


/* content -> container -> game info 
    TODO: Change url to be a component of the the patchEl
*/
function renderGameInfo(title, contents, url, video) {
    /* TODO: render fucntion inputs to HTML page */
    var containerEl = document.createElement('div');
    containerEl.className="result" //results on page format with css
    var patchEl = document.createElement('div');
    patchEl.className = "patch-data"
    patchEl.setAttribute("id", "patch-data")
    var converter = new showdown.Converter();
    var html = converter.makeHtml(contents);
    patchEl.innerHTML = html
   
    var titleEl = document.createElement('div');
    titleEl.className = "patch-title"; // bold result title
    titleEl.textContent = title;

    var urlEl = document.createElement('div');
    urlEl.setAttribute("id", "patch-data");
    urlEl.innerHTML = "<a href=" + url + " target='_blank' >" + url + "</a>" //open patch notes url in new tab

    containerEl.append(titleEl);
    containerEl.append(urlEl); // not the final version of how url will be added
  
    
    containerEl.append(patchEl); //here is where we add to the container, all the components
    var frameEl = document.createElement("div")
    frameEl.className = "frame-wrapper"
    frameEl.innerHTML = video
    containerEl.append(frameEl)
    //add those componenets somwewhere on the page.
    contentEl.append(containerEl);
    console.log(title,url)
}

function getAppid(userInput) {
    //TODO: add code that finds appid from list.
    var appid = "";
    appid = "899770"
    return appid;
}

function storeAppid(gameName, gameAppid) {
    localStorage.setItem(gameName, gameAppid);
}

function loadFromStorage() {
    for (var i = 0; i < localStorage.length; i++) {
        callSteamNewsAPI(localStorage.getItem(i)); // calls the API for every appID currently in local storage.
    }
}

function userSearch(event) {
    event.preventDefault();
    console.log("prove this works")
    callSteamNewsAPI(getAppid(inputEl.value));
    callYoutubeAPI()
}

// loadFromStorage() uncomment this when localStorage is set up
inputEl.addEventListener("submit", userSearch)
const toggleBtn = document.querySelector('.toggle-btn');
const body = document.querySelector('body');
let isBackgroundGif = false;

toggleBtn.addEventListener('click', function() {
  if (isBackgroundGif) {
    body.style.backgroundImage = "url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/24b2d5f4-4824-467a-b16e-e564be3b7d95/ddoos9w-0e0b8c9c-293f-4449-9195-fbb1edd2609d.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI0YjJkNWY0LTQ4MjQtNDY3YS1iMTZlLWU1NjRiZTNiN2Q5NVwvZGRvb3M5dy0wZTBiOGM5Yy0yOTNmLTQ0NDktOTE5NS1mYmIxZWRkMjYwOWQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.bituyBJBE319jxEB8gFfZ9SnNlfXl3Qo0PxFubCrC6o')";
    body.style.backgroundSize = 'cover';
    body.style.backgroundPosition = 'center';
    body.style.color = 'black';
    isBackgroundGif = false;
  } else {
    body.style.backgroundImage = "url('https://thumbs.gfycat.com/ZanyGrimGodwit-max-1mb.gif')";
    body.style.backgroundSize = 'cover';
    body.style.backgroundPosition = 'center';
    body.style.color = 'white';
    isBackgroundGif = true;
  }
});