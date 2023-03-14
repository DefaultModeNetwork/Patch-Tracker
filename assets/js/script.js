const steamAPIUrl = "https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/";
const steamAppIDTerm = "?appid=";
const steamAPITagTerm = "&tags=patchnotes";
const apiFix = "https://proxy.cors.sh/"
const testGame = "Last Epoch" // Last Epoch App ID: 899770, current patch: 0.8.5
const testIds = ["appid: 899770, name: Last Epoch", "appid: 238960, name: Path of Exile", "appid: 1245620, name: Elden Ring"]

const contentEl = document.querySelector("#content");
var inputEl = document.querySelector("#user-input");

console.log(gameKeys)

async function callSteamNewsAPI(inputAppid) {
    let result = await fetch(apiFix + steamAPIUrl + steamAppIDTerm + inputAppid + steamAPITagTerm)
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

// function binarySearch(target, start, middle, end) {
//     var x = start;
//     var y = end;
//     var z = Math.floor((end+start)/2);
//     console.log("start:",x,"end:",y,"middle:",z)
//     tempTarget = target.toUpperCase();
//     console.log(target)
//     console.log(gameKeys[middle].name.toUpperCase())
//     if (x ==  y || y == z || x == z) {
//         console.log(gameKeys[z].name);
//         return
//     }
//     if ( tempTarget.localeCompare(gameKeys[middle].name.toUpperCase()) == 0 ) {
//         return gameKeys[middle].appid;
//     } else if ( tempTarget.localeCompare(gameKeys[middle].name.toUpperCase()) < 0 ) { //traverse left
//         //target is target, start is start, middle is now end, middle is now middle / 2
//         console.log("Lesser, traverse left.")
//         binarySearch(target, start, middle, Math.floor((start + end) / 2));
//     } else if ( tempTarget.localeCompare(gameKeys[middle].name.toUpperCase()) > 0 ) { //traverse right
//         //target is target, start is middle, end is end, middle is now end / 2
//         console.log("Greater, traverse right.")
//         binarySearch(target, middle, end, Math.floor((middle + end) / 2));
//     } else if ( (middle - start) == 0 || (end - middle) == 0 || middle == 0) { //exit condition returns first closest result.
//         return gameKeys[start].appid;
//     } else {
//         console.log("Nothing found");
//     }
// }

function binarySearch(target, start, end) {
    let mid = (Math.ceil((start + end) / 2))
    let userString = target.toUpperCase();
    let gameString = gameKeys[mid].name.toUpperCase();
    console.log("start:",start,"end:",end,"middle:",mid)
    console.log(gameKeys[mid])
    
    if ( mid - start == 0 || end - mid == 0) { // base case
        console.log("We're in 94", gameKeys[mid]);
        console.log(gameKeys[mid - 1]);
        return mid;
    } else if ( userString.localeCompare(gameString) === 0 ) {
        console.log(gameKeys[mid])
    } else if ( userString.localeCompare(gameString) < 0 ) { //traverse left
        //target is target, start is start, middle is now end, middle is now middle / 2
        // console.log("Lesser, traverse left.")
        binarySearch(target, start, mid);
    } else if ( userString.localeCompare(gameString) > 0 ) { //traverse right
        //target is target, start is middle, end is end, middle is now end / 2
        // console.log("Greater, traverse right.")
        binarySearch(target, mid, end);
    } else if ( (mid - start) == 0 || (end - mid) == 0 || mid == 0) { //exit condition returns first closest result.
        console.log("We're here", gameKeys[mid]);
        return gameKeys[mid];
    } else {
        console.log("Nothing found");
    }
}


function getAppid(userInput) {
    //TODO: add code that finds appid from list.
    // var appid = "";
    // appid = "899770"
    // return binarySearch(userInput, 0, (gameKeys.length - 1), Math.floor(gameKeys.length / 2));
    // return binarySearch(userInput, 0, Math.floor(gameKeys.length / 2), (gameKeys.length - 1))
    let result = binarySearch(userInput, 0, (gameKeys.length - 1))
    // return binarySearch(userInput, 0, (gameKeys.length - 1))
    console.log(result)
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