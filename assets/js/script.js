const steamAPIUrl = "https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/";
const steamAppIDTerm = "?appid=";
const steamAPITagTerm = "&tags=patchnotes";
const apiFix = "https://proxy.cors.sh/"
const testGame = "Last Epoch" // Last Epoch App ID: 899770, current patch: 0.8.5
const testIds = ["appid: 899770, name: Last Epoch", "appid: 238960, name: Path of Exile", "appid: 1245620, name: Elden Ring"]

const contentEl = document.querySelector("#content");
var inputEl = document.querySelector("#user-input");

async function callSteamNewsAPI(inputAppid) {
    let result = await fetch(apiFix + steamAPIUrl + steamAppIDTerm + inputAppid + steamAPITagTerm)
        // let result = await fetch(testUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            let patchData = data.appnews.newsitems[0]
            renderGameInfo(patchData.title, patchData.contents, patchData.url);
        })
}
/* Waiting for Youtube API */
async function callYoutubeAPI(gameName, patchName) {
    var gameName = inputEl.value
    //needs to call the youtube api with a q value of gameName + patchName
}

/* content -> container -> game info 
    TODO: Change url to be a component of the the patchEl
*/
function renderGameInfo(title, contents, url, getYoutubeVideo) {
    /* TODO: render fucntion inputs to HTML page */
    var containerEl = document.createElement('div');
    var patchEl = document.createElement('div');
    patchEl.className = "patch-data"
    patchEl.setAttribute("id", "patch-data")
    patchEl.textContent = contents
   
    var titleEl = document.createElement('div');
    titleEl.setAttribute("id", "patch-data");
    titleEl.textContent = title;

    var urlEl = document.createElement('div');
    urlEl.setAttribute("id", "patch-data");
    urlEl.textContent = url //this line will need to change as this won't add the link correctly

    containerEl.append(titleEl);
    containerEl.append(urlEl); // not the final version of how url will be added
    containerEl.append(patchEl); //here is where we add to the container, all the components
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
}

// loadFromStorage() uncomment this when localStorage is set up
inputEl.addEventListener("submit", userSearch)
