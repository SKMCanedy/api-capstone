'use strict';
// --- Global Variables ---
// stores the data the cust inputted in the search field
let userSearchData='';

// stores the comic vine character details so multiple calls will not need to be made
let capiCharDetails={};

// stores the giantbomb character details so multiple calls will not need to be made
let gapiCharDetails={};


// --- API Pull functions---

// Summary: Character ID Pull - Comic Vine API (capi)
// Details: This accesses the Comic Vine Characters API with the main goal to get the character ID number so that specific character details can be pulled by another function. Callback function is reviewCapiChar
function getCapiCharId (callback){
	console.log (`getCapiCharId function accessed`);
	const capiCharSearchUrl = "https://cors-anywhere.herokuapp.com/https://www.comicvine.com/api/characters/";
	const query = {
		api_key: "77e74b104e90bbe37c3f4576a41e5c7a37c87520",
		format: "json",
		filter: `name:${userSearchData}`,
		field_list: "id,name,api_detail_url",
	};
	$.getJSON(capiCharSearchUrl, query, callback);
};
// Summary: Specific character data pull - capi
// Details: This accesses the Comic Vine Character API (note the singular form of character) and feeds the data to updateCapiCharDetails. This provides more detail about a character that other functions will rely on. 

function getCapiCharDetails (charURL, callback){
	console.log (`getCapiCharDetails function accessed`);
	const capiCharDetailsUrl = "https://cors-anywhere.herokuapp.com/"+charURL;
	const query = {
		api_key: "77e74b104e90bbe37c3f4576a41e5c7a37c87520",
		format: "json",
		field_list: "id,name,deck,first_appeared_in_issue,image,issue_credits,movies,api_detail_url,site_detail_url",
	};
	$.getJSON(capiCharDetailsUrl,query,callback);
};

// Summary: Comic book info data pull - capi
// Details: This pulls specific comic book data from Comic Vine Issues API (note plural form). Callback function is gatherComicData???


function getCapiComicDetails (comicId, callback){
	console.log (`getCapiComicDetails function accessed`);
	const capiComicDetailsUrl = `https://cors-anywhere.herokuapp.com/https://comicvine.gamespot.com/api/issues/`;
	const query = {
		api_key: "77e74b104e90bbe37c3f4576a41e5c7a37c87520",
		format: "json",
		filter: `id:${comicId}`,
		field_list: "id,name,image,description,site_detail_url",
	};
	$.getJSON(capiComicDetailsUrl,query,callback);
};

// Summary: Movie info data pull - capi
// Details: This pulls specific movie data from Comic Vine Movie API (note singular form). Callback function is gatherMovieData???

function getCapiMovieDetails (movieId, callback){
	console.log (`getCapiMovieDetails function accessed`);
	const capiMovieDetailsUrl = `https://cors-anywhere.herokuapp.com/https://comicvine.gamespot.com/api/movies/`;
	const query = {
		api_key: "77e74b104e90bbe37c3f4576a41e5c7a37c87520",
		format: "json",
		filter: `id:${movieId}`,
		field_list: "id,name,image,description,site_detail_url",
	};
	$.getJSON(capiMovieDetailsUrl,query,callback);
};


// Character ID - Giantbomb API (gapi)
function getGapiCharId (callback){
	console.log (`getGapiCharId function accessed`);
	const gapiCharSearchUrl = `https://cors-anywhere.herokuapp.com/https://www.giantbomb.com/api/characters/`;
	const query = {
		api_key: "2a8e5dcbcc310e7cf6713106844a65288cd678d4",
		format: "json",
		filter: `name:${userSearchData}`,
		field_list: "name,guid,api_detail_url",
	};
	$.getJSON(gapiCharSearchUrl,query,getGapiCharDetails);
};

// Specific character data - gapi
function getGapiCharDetails (apiData){
	console.log (`getGapiCharDetails function accessed`);
	let charURL = apiData.results[0].api_detail_url;
	const gapiCharDetailsUrl = "https://cors-anywhere.herokuapp.com/"+charURL;
	const query = {
		api_key: "2a8e5dcbcc310e7cf6713106844a65288cd678d4",
		format: "json",
		field_list:"name,first_appeared_in_game,games",
	};
	$.getJSON(gapiCharDetailsUrl,query,updateGapiCharDetails);
};


// Game info - gapi
function getGapiGameDetails (gameId, callback){
	console.log (`getGapiGameDetails function accessed`);
	const gapiGameDetailsUrl = `https://cors-anywhere.herokuapp.com/https://www.giantbomb.com/api/games/`;
	const query = {
		api_key: "2a8e5dcbcc310e7cf6713106844a65288cd678d4",
		format: "json",
		filter: `id:${gameId}`,
		field_list: "name,deck,image,site_detail_url",
	};
	$.getJSON(gapiGameDetailsUrl,query,callback);
};

// --- Gather data to be displayed ---
// Summary: creates object containing comic info
// Details: Will ultimately create an array filled with objects (comicDetails) that will be fed into insertComicInfo.  Will first feed getCapiComicDetails with first_appeared_in_issue.id and gatherComicData as callback??? and push the results to the new object (comicDetails). It will then loop through the first 4 issue_credits.id and feed them into getCapiComicDetails, pushing the result data into comicDetails object. It will then call insertComicInfo passing through comicDetails
function gatherComicData (apiData){
	console.log (`gatherComicData function accessed`);
	let comicIds= [capiCharDetails.results.first_appeared_in_issue.id];
	for (let i=0; i<4; i++){
		comicIds.push(capiCharDetails.results.issue_credits[i].id)	
	};
	for (let i=0; i<comicIds.length; i++){
		getCapiComicDetails(comicIds[i],insertComicInfo);	
	};
	
};


// Summary: creates object containing movie info
// Details: Will ultimately create an array filled with objects (movieDetails) that will be fed into insertMovieInfo.  It will loop through the first 5 movies.id and feed them into getCapiComicDetails, pushing the result data into a movieDetails object. It will then call insertMovieInfo passing through movieDetails

function gatherMovieData (apiData){
	console.log (`gatherMovieData function accessed`);
	let movieIds= [];
	for (let i=0; i<capiCharDetails.results.movies.length; i++){
		console.log(capiCharDetails.results.movies[i].id);
		if (i>5){
			break;
		}
		movieIds.push(capiCharDetails.results.movies[i].id)	
	}
	console.log(movieIds);
	for (let i=0; i<movieIds.length; i++){
		getCapiMovieDetails(movieIds[i],insertMovieInfo);
	};
};

// Summary: creates object containing game info
// Details: Will ultimately create an array filled with objects(gameDetails) that will be fed into insertGameInfo. It will then call getGapiGameDetails with first_appeared_in_game.id and gatherGameData as callback??? and push the results to the new object (gameDetails). It will then loop through the first 4 .id and feed them into getGapiGameDetails, pushing the result data into gameDetails object. It will then call insertGameInfo passing through gameDetails
function gatherGameData (apiData){
	console.log (`gatherGameData function accessed`);
	const gameIds = [gapiCharDetails.results.first_appeared_in_game.id];
	for (let i=0; i<4; i++){
		gameIds.push(gapiCharDetails.results.games[i].id)	
	}
	for (let i=0; i<gameIds.length; i++){
		getGapiGameDetails(gameIds[i], insertGameInfo);
	};
};




// --- These review data ---
// Summary: Reviews existence of character in capi
// Details: Callback function for getCapiCharID. This will take in the data from getCapiCharId and look to see if there is a result 1 or greater. If there is a match, it will call the getCapiCharDetails function, passing through the charID (from the apiData) of the first results array entry and updateCapiCharDetails callback function. It will also call the getGapiCharId (passing getGapiCharDetails as the callback) and loadValidCharDom functions. If there is not a match, it will trigger the insertInvalidSearch function.
function reviewCapiChar (apiData){
	console.log (`reviewCapiChar function accessed`);
	if (apiData.number_of_total_results>= 1) {
		console.log(`Character URL is ${apiData.results[0].api_detail_url}`);
		getCapiCharDetails(apiData.results[0].api_detail_url, updateCapiCharDetails);
		getGapiCharId ();
	}
	else {
		insertInvalidSearch(getGapiCharDetails);
	}
};

// Summary: Reviews comic book character info from capi to determine what to put into comic section DOM
// Details: This will review capiCharDetails to determine if there are comics (issue_credits key) available to be displayed. If there is, it will call the gatherComicData function. Otherwise it will call insertNoInfoFound
function reviewCapiComic () {
	console.log (`reviewCapiComic function accessed`);
	if (capiCharDetails.results.issue_credits[0] != null){
		gatherComicData();
	}
	else {
		insertNoInfoFound('.comicInfo');
	}
};

// Summary: Reviews movie info from capi to determine what to put into movie section DOM
// Details: This will review capiCharDetails to determine if there are movies (movies key) available to be displayed. If there is, it will call the gatherMovieData function. Otherwise it will call insertNoInfoFound 
function reviewCapiMovie () {
	console.log (`reviewCapiMovie function accessed`);
	if (capiCharDetails.results.movies[0] != null){
		gatherMovieData();
	}
	else {
		insertNoInfoFound('.movieInfo');
	}	
};
// Summary: Compares Giant Bomb API data against user input to determine what to put into game section DOM
// Details: This will call getGapiCharID and look to see if games exist (first_appeared_in_game key). If so, it will call the gatherGameInfo function, passing the guid.  Otherwise it will call insertNoInfoFound
function reviewGapiGame () {
	console.log (`reviewGapiGame function accessed`);
	if (gapiCharDetails.results.games[0] != null){
		gatherGameData();
	}
	else {
		insertNoInfoFound('.gameInfo');
	}		
};


// ---Manipulates the DOM when there are errors---
// Inserts Invalid Search error message in DOM. Used when a user submits an invalid search (non comic book character)
function insertInvalidSearch (){
	console.log (`insertInvalidSearch function accessed`);
	$('#alertSection').html(`Uh oh. We can't find that character! Did you spell it correctly? Please try again.`);
	showAlertSection();
};
// Inserts No info found error message in results DOM
function insertNoInfoFound (divClass) {
	console.log (`insertNoInfoFound function accessed`);
	$(divClass).html(`Looks like this character doesn't have information available for this.`)
};

// --- Valid match insert functions. Manipulates DOM after valid character match ---

// Summary: Houses the calls to all Dom updates when a valid character has been searched for
// Details: Calls functions that:  load character picture & description (insertCharInfo), unhides main content section (showMainContent) & nav bar elements (search, scrollspy header navigation - showNavElem & showScrollSpy), determines what should be displayed in the main content section (reviewCapiComic, reviewCapiMovie, reviewGapiGame)

function loadValidCapiDom (){
	console.log (`loadValidCapiDom function accessed`);
	insertCharInfo();
	// showNavElem();
	// showScrollSpy();
	reviewCapiComic();
	reviewCapiMovie();
	showMainContent();
};

function loadValidGapiDom(){
	console.log (`loadValidGapiDom function accessed`);
	reviewGapiGame();
}
// Summary: Inserts capi character pic and desc
// Details: Using  keyvalues from capiCharDetails (name, image, deck, url) will display character info 
function insertCharInfo(){
	console.log (`insertCharInfo function accessed`);
	hideAlertSection();
	let charDetailsString = `
		<div class="card text-center" style="width: 18rem;">
			<h2>${capiCharDetails.results.name}</h2>
			<img class="card-img-top" src="${capiCharDetails.results.image.medium_url}" alt="Image of ${capiCharDetails.results.name}">
			<div class="card-body">
		    	<p class="card-text">${capiCharDetails.results.deck}</p>
		  	</div>
		</div>`
	// let charDetailsString = `<div class="img-thumbnail mx-auto">
	// 		<img src= "${capiCharDetails.results.image.medium_url}" alt="Image of ${capiCharDetails.name}"
	// 	</div>
	// 	<div>
	// 		<p>${capiCharDetails.deck}</p>
	// 	</div>`;
	$(".charInfo").html(charDetailsString);

};
// Inserts capi comic information
function insertComicInfo(apiData){
	console.log (`insertComicInfo function accessed`);
	console.log(apiData);
	let comicDetailsString = `
		<div class="card" style="width: 18rem;">
			<p>${apiData.results[0].name}</p>
		  	<img class="card-img-top" src="${apiData.results[0].image.medium_url}" alt="Image of ${apiData.results[0].name}">
		  	<div class="card-body">
		    <p class="card-text">${apiData.results[0].description}</p>
		  </div>
		</div>
	`;

	$('.comicInfo').append(comicDetailsString);
};

// Inserts capi movie info
function insertMovieInfo(apiData){
	console.log (`insertMovieInfo function accessed`);
	console.log(apiData);
	let movieDetailsString = `
		<div class="card" style="width: 18rem;">
		  <img class="card-img-top" src="${apiData.results[0].image.medium_url}" alt="Image of ${apiData.results[0].name}">
		  <div class="card-body">
		    <p class="card-text">${apiData.results[0].name}</p>
		  </div>
		</div>
	`;

	$('.movieInfo').append(movieDetailsString);
};


// Inserts gapi video game info
function insertGameInfo(apiData){
	console.log (`insertGameInfo function accessed`);
	console.log(apiData);
	let gameDetailsString = `
		<div class="card" style="width: 18rem;">
			<p>${apiData.results[0].name}</p>
			<img class="card-img-top" src="${apiData.results[0].image.medium_url}" alt="Image of ${apiData.results[0].name}">
			<div class="card-body">
		    <p class="card-text">${apiData.results[0].deck}</p>
		  </div>
		</div>
	`;

	$('.gameInfo').append(gameDetailsString);
};

// unhides section containing h2 elements
function showMainContent(){
	console.log (`showMainContent function accessed`);
	$('#hiddenSection').removeClass("d-none");

};

// Hides section containing h2 elements
function hideMainContent(){
	console.log (`hideMainContent function accessed`);
	$('#hiddenSection').addClass("d-none");	
}

function showAlertSection(){
	$('#alertSection').removeClass("d-none");
}

function hideAlertSection(){
	$('#alertSection').addClass("d-none");
}

function clearContent(){
	$('.detailSection').html("");
}

function searchingMessage(){
	$('#alertSection').html(`<p>Searching...there's a lot of comic book characters y'know...</p>`);
	showAlertSection();
};

// --- Other DOM manipulations ---

// Displays nav bar elements
// function showNavElem(){
// 	console.log (`showNavElem function accessed`);

// }

// // Hides nav bar elements
// function hideNavElem(){
// 	console.log (`hideNavElem function accessed`);

// }


// }

// // Implements scrollspy
// function showScrollSpy (){
// 	console.log (`showScrollSpy function accessed`);
// }


// ---Other functions---

// Summary: creates storage place for results of character details pull
// Details: Callback function for getCapiCharDetails. This will update the global variable capiCharDetails with the json object so multiple functions can access the information without making unnecessary API calls
function updateCapiCharDetails(apiData){
	console.log (`updateCapiCharDetails function accessed`);
	capiCharDetails=apiData;
	console.log(capiCharDetails);
	loadValidCapiDom();
};

function updateGapiCharDetails(apiData){
	console.log (`updateGapiCharDetails function accessed`);	
	gapiCharDetails=apiData;p
	console.log(gapiCharDetails);
	loadValidGapiDom();
};

// --- Event Listeners ---


// Home function that clears all added elements and returns to original screen


// Summary: Evaluates & stores cust input
// Details: Event Listener. This reads the value the user submits in the search box and updates the global variable userSearchData. It will also trigger the getCapiCharId api pull function, passing through userSearchData and reviewCapiChar callbackfunction

function getUserSubmitValue (){
	$('.searchButton').on('click', function (event) {
		console.log (`getUserSubmitValue function accessed`);
		event.preventDefault();
		hideAlertSection();
		hideMainContent();
		clearContent();
		userSearchData = $(".searchBox").val();
		console.log (`This is what the user searched for: ${userSearchData}`);
		$('.searchBox').val("");
		searchingMessage();
		getCapiCharId (reviewCapiChar);	
	})
};

$(getUserSubmitValue);