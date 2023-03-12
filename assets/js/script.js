const steamAPIUrl = "https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/";
// const steamList = "https://api.steampowered.com/ISteamApps/GetAppList/v2/";
const steamAppIDTerm = "?appid=";
const steamAPITagTerm = "&tags=patchnotes";
const apiFix = "https://proxy.cors.sh/"
// const testUrl = "http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=440&count=3&maxlength=300&format=json";
const testGame = "Last Epoch" // Last Epoch App ID: 899770, current patch: 0.8.5
const testIds = ["appid: 899770, name: Last Epoch", "appid: 238960, name: Path of Exile", "appid: 1245620, name: Elden Ring"]

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
}

// callAppIdApi();
callSteamNewsAPI();





  function loadClient() {
    gapi.client.setApiKey("YOUR_API_KEY");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute() {
    return gapi.client.youtube.channels.list({
      "part": [
        "string"
      ],
      "id": [
        "UC_x5XG1OV2P6uZZ5FSM9Ttw"
      ]
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: ""});
  });

<><button onclick="authenticate().then(loadClient)">authorize and load</button><button onclick="execute()">execute</button></></>
