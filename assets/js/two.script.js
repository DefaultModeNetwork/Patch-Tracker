// // Options
// const CLIENT_ID = 'AIzaSyBggTRA9mH569Xhv3VxXGS6H1B09sPlhPc';
// const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];
// const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

// const authorizeButton = document.getElementById('enter-button');
// const signoutButton = document.getElementById('exit-button');
// const content = document.getElementById('content');

// // default youtube channel
// const defaultChannel = 'googledevelopers';

// // Load auth2 library
// function handleClientLoad(){
// 	gapi.load('client:auth2', initClient);
// }

// // Init API client library and set up sing in listeners
// function initClient(){
// 	gapi.client.init({
// 		discoveryDocs: DISCOVERY_DOCS,
// 		clientId:IzaSyBggTRA9mH569Xhv3VxXGS6H1B09sPlhPc,
// 		scope: SCOPES
// 	}).then(() => {
// 		// Listen for sing state changes
// 		gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
// 		// Handle initial sign in state
// 		updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
// 		authorizeButton.onclick = handleAuthClick;
// 		signoutButton.onclick = handleSignouClick;
// 	});
// }

// // update UI sign in state changes
// function updateSigninStatus(isSignedIn){
// 	if(isSignedIn){
// 		authorizeButton.style.display = 'none';
// 		signoutButton.style.display = 'block';
// 		content.style.display = 'block';
// 		getChannel(defaultChannel);
// 	}else{
// 		authorizeButton.style.display = 'block';
// 		signoutButton.style.display = 'none';
// 		content.style.display = 'none';
// 	}
// }

// // Handle Login
// function handleAuthClick(){
// 	gapi.auth2.getAuthInstance().signIn();
// }

// // Handle Logout
// function handleSignouClick(){
// 	gapi.auth2.getAuthInstance().signOut();
// }

// // Display channel Data
// function showChannelData(data){
// 	const channelData = document.getElementById('channel-data');
// 	channelData.innerHTML = data;
// }

// // Get channel from API
// function getChannel(channel){
// 	gapi.client.youtube.channels
// 	.list({
// 		part: 'snippet,contentDetails,statistics',
// 		forUsername: channel
// 	})
// 	.then(response => {
// 		console.log(response);
// 		const channel = response.result.items[0];
		
// 		const output = `
// 			<ul class="collection">
// 				<li class="collection-item">Title: ${channel.snippet.title}</li>
// 				<li class="collection-item">ID: ${channel.id}</li>
// 				<li class="collection-item">Subscribers: ${channel.statistics.subscriberCount}</li>
// 				<li class="collection-item">Views: ${channel.statistics.viewCount}</li>
// 				<li class="collection-item">Videos: ${channel.statistics.videoCount}</li>
// 			</ul>
// 			<p>${channel.snippet.description}</p>
// 			<hr />
// 			<a class="btn red darken-2" target="_blnak" href="https://youtube.com/${channel.snippet.customUrl}">Visit Channel</a>
// 		`;
// 		showChannelData(output);
// 	})
// 	.catch(err => alert('No Channel By THat Name'));
// }

// fetch('https://jsonplaceholder.typicode.com/todos').then(response =>{
//     return response.json();
// }).then(data =>{
//     console.log(data);
// })

// function init() {
//     gapi.client.init({
//       apiKey: 'https://youtu.be/15X35dqSvCo',
//       discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
//     }).then(function() {
//       console.log('API client loaded for YouTube API');
//     }, function(error) {
//       console.error('Error loading API client for YouTube API', error);
//     });
//   }

//   function search() {
//     var q = document.getElementById('query').value;
//     gapi.client.youtube.search.list({
//       q: q,
//       part: 'snippet'
//     }).then(function(response) {
//       var items = response.result.items;
//       // Do something with the search results
//     }, function(error) {
//       console.error('Error searching for videos', error);
//     });
//   }
  

//   // Place API key here
// const apiKey = "AIzaSyBggTRA9mH569Xhv3VxXGS6H1B09sPlhPc";
// const searchQuery = "frostpunk patch notes"; // Replace with user's search query

// // Make API request to search for videos
// fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${searchQuery}&maxResults=10&part=snippet`)
//   .then(response => response.json())
//   .then(data => {
//     const videos = data.items;
//     const videoIds = videos.map(video => video.id.videoId);

//     // Make API request to search for Steam games
// //     fetch(`https://api.steampowered.com/ISteamApps/GetAppList/v2/`)
// //       .then(response => response.json())
// //       .then(data => {
// //         const games = data.applist.apps;
// //         const gameIds = games.map(game => game.appid);


//     // Create an iframe for each video and append to page
//     videoIds.forEach(videoId => {
//       const videoUrl = `https://www.youtube.com/embed/${videoId}`;
//       const iframe = document.createElement("iframe");
//       iframe.src = videoUrl;
//       iframe.width = 560;
//       iframe.height = 315;
//       document.body.appendChild(iframe);
//     });
//   });

// // Use the YouTube API's search method to retrieve a list of videos based on a user's search query. The search method takes parameters such as q (the search query), maxResults (the maximum number of search results to return), and part (the video resource properties to retrieve, such as snippet or statistics).

// // Use JavaScript to extract the video IDs from the YouTube search results.

// // Set up a Steam Web API project and obtain an API key. This will allow your app to make requests to the Steam API and retrieve search results.

// // Use the Steam Web API's search method to retrieve a list of games based on a user's search query. The search method takes parameters such as query (the search query), count (the maximum number of search results to return), and key (the API key).

// // Use JavaScript to extract the app IDs from the Steam search results.

// // Link the YouTube video IDs to the corresponding Steam app IDs, such as by using a mapping table or by using the video titles to search for matching game titles.

// // Display the linked YouTube videos and Steam games to the user, such as by using an HTML table or list.

// //   // Replace YOUR_YOUTUBE_API_KEY and YOUR_STEAM_API_KEY with your actual API keys
// // const youtubeApiKey = "AIzaSyBggTRA9mH569Xhv3VxXGS6H1B09sPlhPc";
// // const steamApiKey = "YOUR_STEAM_API_KEY";
// // const searchQuery = "cats"; // Replace with user's search query

// // // Make API request to search for YouTube videos
// // fetch(`https://www.googleapis.com/youtube/v3/search?key=${youtubeApiKey}&q=${searchQuery}&maxResults=10&part=snippet`)
// //   .then(response => response.json())
// //   .then(data => {
// //     const videos = data.items;
// //     const videoIds = videos.map(video => video.id.videoId);

// //     
// //         // Map YouTube videos to Steam games
// //         const mappingTable = {
// //           "cat game 1": 12345,
// //           "cat game 2": 67890,
// //           // Add more mappings as needed
// //         };

// //         const linkedItems = [];

// //         for (const video of videos) {
// //           const videoTitle = video.snippet.title;
// //           const videoId = video.id.videoId;
// //           const matchingGameId = mappingTable[videoTitle] || findMatchingGameId(videoTitle, gameIds);
          
// //           if (matchingGameId) {
// //             const linkedItem = {
// //               videoId,
// //               gameId: matchingGameId
// //             };
// //             linkedItems.push(linkedItem);
// //           }
// //         }

// //         // Display linked items to user
// //         const table = document.createElement("table");
// //         for (const linkedItem of linkedItems) {
// //           const videoUrl = `https://www.youtube.com/embed/${linkedItem.videoId}`;
// //           const gameUrl = `https://store.steampowered.com/app/${linkedItem.gameId}`;
          
// //           const row = document.createElement("tr");
// //           const videoCell = document.createElement("td");
// //           const gameCell =
