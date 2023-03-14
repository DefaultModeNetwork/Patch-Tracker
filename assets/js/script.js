const steamAPIUrl = "https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/";
const steamAppIDTerm = "?appid=";
const steamAPITagTerm = "&tags=patchnotes";
const apiFix = "https://proxy.cors.sh/"

const contentEl = document.querySelector("#content");
var inputEl = document.querySelector("#user-input");
var gameName = document.getElementById("game-name").value

console.log(gameKeys)

async function callSteamNewsAPI(inputAppid) {
    let video = await callYoutubeAPI()
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


async function getAppid(userInput) {
    let userString = await userInput.replace(/ /g,"");
    userString = userString.toLowerCase();
    console.log(userString)
    let result = binarySearch(userString, 0, (gameKeys.length - 1))
    return result.appid;
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
    // console.log(inputEl.value)
    let id = getAppid(inputEl.value)
    callSteamNewsAPI(id);
    callYoutubeAPI()
}

// loadFromStorage() uncomment this when localStorage is set up
inputEl.addEventListener("submit", userSearch)