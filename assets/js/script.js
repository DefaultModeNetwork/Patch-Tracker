const steamAPIUrl = "https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/";
const steamAppIDTerm = "?appid=";
const steamAPITagTerm = "&tags=patchnotes";
const apiFix = "https://proxy.cors.sh/"

const contentEl = document.querySelector("#content");
var inputEl = document.querySelector("#user-input");
var gameName = document.getElementById("game-name").value

console.log(gameKeys)

async function callSteamNewsAPI(inputAppid, storedName) {
    let gameName = ""
    if (storedName) { //allow for localStorage calls to overright the .value which is probably null anyway
        gameName = storedName;
    } else {
        gameName = document.getElementById("game-name").value
    }
    let video = await callYoutubeAPI(gameName)
    console.log(video)
    let result = await fetch(apiFix + steamAPIUrl + steamAppIDTerm + inputAppid + steamAPITagTerm)
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

/* Waiting for Youtube API, added storedName field for localStorage based calls. */
async function callYoutubeAPI(storedName) {
    let gameName = ""
    if (storedName) { //allow for localStorage calls to overright the .value which is probably null anyway
        gameName = storedName;
    } else {
        gameName = document.getElementById("game-name").value
    }
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

function binarySearch(target, start, end) {
    let mid = (Math.ceil((start + end) / 2))
    let userString = target;
    let gameString = gameKeys[mid].name;
    console.log("start:",start,"end:",end,"middle:",mid)
    console.log(gameKeys[mid])
    
    if ( mid - start == 0 || end - mid == 0) { // base case
        return gameKeys[mid];
    } else if ( userString.localeCompare(gameString) === 0 ) {
        return gameKeys[mid];
    } else if ( userString.localeCompare(gameString) < 0 ) { //traverse left
        //target is target, start is start, middle is now end
        return binarySearch(target, start, mid);
    } else if ( userString.localeCompare(gameString) > 0 ) { //traverse right
        //target is target, start is middle, end is end
        return binarySearch(target, mid, end);
    } else if ( (mid - start) == 0 || (end - mid) == 0 || mid == 0) { //exit condition returns first closest result.
        return gameKeys[mid];
    } else {
        console.log("Nothing found");
    }
}


function getAppid() {
    let userString = document.getElementById("game-name").value;
    userString = userString.replace(/ /g,"");
    userString = userString.toLowerCase();
    console.log(userString)
    let result = binarySearch(userString, 0, (gameKeys.length - 1))
    storeAppid(result.appid);
    return result.appid;
}

function storeAppid(gameAppid) {
    localStorage.setItem(document.getElementById("game-name").value, gameAppid);
}

function loadFromStorage() {
    for (var i = 0; i < localStorage.length; i++) {
        // callSteamNewsAPI(localStorage.getItem(i)); // calls the API for every appID currently in local storage.
        let name = localStorage.key(i);
        let appid = localStorage.getItem(localStorage.key(i));
        console.log(name, appid);
        callSteamNewsAPI(appid, name)
        // callYoutubeAPI(name);
    }
}

function userSearch(event) {
    event.preventDefault();
    let id = getAppid();
    callSteamNewsAPI(id);
    // callYoutubeAPI()
}

loadFromStorage(); //fire when page loads the first time.
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