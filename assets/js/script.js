const steamAPIUrl = "https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/";
// const steamList = "https://api.steampowered.com/ISteamApps/GetAppList/v2/";
const steamAppIDTerm = "?appid=";
const steamAPITagTerm = "&tags=patchnotes";
const apiFix = "https://proxy.cors.sh/"
// const testUrl = "http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=440&count=3&maxlength=300&format=json";
const testGame = "Last Epoch" // Last Epoch App ID: 899770, current patch: 0.8.5
const testIds = ["appid: 899770, name: Last Epoch", "appid: 238960, name: Path of Exile", "appid: 1245620, name: Elden Ring"]

const contentEl = document.querySelector("content")



async function callSteamNewsAPI() {
    let result = await fetch(apiFix + steamAPIUrl + steamAppIDTerm + "899770" + steamAPITagTerm)
    // let result = await fetch(testUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        let patchData = data.newsitems[0]
        renderGameInfo(patchData.title, patchData.contents, patchData.url);
    })
}
/* content -> container -> game info */
function renderGameInfo(title, contents, url) {
    /* TODO: render fucntion inputs to HTML page */
    var containerEl = document.createElement("div")
    var patchEl = document.createElement("div")
    patchEl.className = "patch-data"
    patchEl.setAttribute("id","patch-data")
    patchEl.textContent = contents
    containerEl.append(patchEl)
console.log(title,url)



}
var testContent = "randomletters"
var testTitle = "randomlettersagain"
var testUrlL = "randomlettersoncemore"
renderGameInfo(testContent,test)
// callAppIdApi();
callSteamNewsAPI();