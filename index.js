
// --- Global Variables ---
// stores the data the cust inputted in the search field
let userSearchData='';

// stores the comic vine character details so multiple calls will not need to be made
let capiCharDetails={};


// --- API Pull functions---

// Summary: Character ID Pull - Comic Vine API (capi)
// Details: This accesses the Comic Vine Characters API with the main goal to get the character ID number so that specific character details can be pulled by another function. Callback function is reviewCapiChar
function getCapiCharId (){

}
// Summary: Specific character data pull - capi
// Details: This accesses the Comic Vine Character API (note the singular form of character) and feeds the data to updateCapiCharDetails. This provides more detail about a character that other functions will rely on. 

function getCapiCharDetails (){

}

// Summary: Comic book info data pull - capi
// Details: This pulls specific comic book data from Comic Vine Issues API (note plural form). Callback function is gatherComicData???


function getCapiComicDetails (){

}

// Summary: Movie info data pull - capi
// Details: This pulls specific movie data from Comic Vine Movie API (note singular form). Callback function is gatherMovieData???

function getCapiMovieDetails (){

}


// Character ID - Giantbomb API (gapi)
function getGapiCharId (){

}
// Specific character data - gapi
function getGapiCharDetails (){

}
// Game info - gapi
function getGapiGameDetails (){

}

// --- Gather data to be displayed ---
// Summary: creates object containing comic info
// Details: Will ultimately create an object that will be fed into insertComicInfo.  Will first feed getCapiComicDetails with first_appeared_in_issue.id and gatherComicData as callback??? and push the results to the new object (comicDetails). It will then loop through the first 4 issue_credits.id and feed them into getCapiComicDetails, pushing the result data into comicDetails object. It will then call insertComicInfo passing through comicDetails
function gatherComicData (){

}

// Summary: creates object containing movie info
// Details: Will ultimately create an object that will be fed into insertMovieInfo.  It will loop through the first 5 movies.id and feed them into getCapiComicDetails, pushing the result data into a movieDetails object. It will then call insertMovieInfo passing through movieDetails

function gatherMovieData (){

}

// Summary: creates object containing game info
// Details: Will ultimately create an object that will be fed into insertGameInfo.  Will first feed the guid into the getGapiCharDetails to return character details including movie list. It will then call getGapiGameDetails with first_appeared_in_game.id and gatherGameData as callback??? and push the results to the new object (gameDetails). It will then loop through the first 4 .id and feed them into getGapiGameDetails, pushing the result data into gameDetails object. It will then call insertGameInfo passing through gameDetails
function gatherGameData (){

}




// --- These review data ---
// Summary: Reviews existence of character in capi
// Details: Callback function for getCapiCharID. This will take in the data from getCapiCharId and compare the name keyvalue from the apiData to the userSearchData global variable to see if there is match. If there is a match, it will call the getCapiCharDetails function, passing through the charID (from the apiData) and updateCapiCharDetails callback function. It will also call the loadValidCharDom function. If there is not a match, it will trigger the insertInvalidSearch function.
function reviewCapiChar (apiData){

}

// Summary: Reviews comic book character info from capi to determine what to put into comic section DOM
// Details: This will review capiCharDetails to determine if there are comics (issue_credits key) available to be displayed. If there is, it will call the gatherComicData function. Otherwise it will call insertNoInfoFound
function reviewCapiComic () {

}

// Summary: Reviews movie info from capi to determine what to put into movie section DOM
// Details: This will review capiCharDetails to determine if there are movies (movies key) available to be displayed. If there is, it will call the gatherMovieData function. Otherwise it will call insertNoInfoFound 
function reviewCapiMovie () {
	
}
// Summary: Compares Giant Bomb API data against user input to determine what to put into game section DOM
// Details: This will call getGapiCharID and look to see if games exist (first_appeared_in_game key). If so, it will call the gatherGameInfo function, passing the guid.  Otherwise it will call insertNoInfoFound
function reviewGapiGame () {
	
}


// ---Manipulates the DOM when there are errors---
// Inserts Invalid Search error message in DOM. Used when a user submits an invalid search (non comic book character)
function insertInvalidSearch (){

}
// Inserts No info found error message in results DOM
function insertNoInfoFound () {

}

// --- Valid match insert functions. Manipulates DOM after valid character match ---

// Summary: Houses the calls to all Dom updates when a valid character has been searched for
// Details: Calls functions that:  load character picture & description (insertCharInfo), unhides main content section (showMainContent) & nav bar elements (search, scrollspy header navigation - showNavElem & showScrollSpy), determines what should be displayed in the main content section (reviewCapiComic, reviewCapiMovie, reviewGapiGame)

function loadValidCharDom (){

}
// Summary: Inserts capi character pic and desc
// Details: Using  keyvalues from capiCharDetails (image, deck, url) will display character info 
function insertCharInfo(){

}
// Inserts capi comic information
function insertComicInfo(){
	
}
// Inserts capi movie info
function insertMovieInfo(){

}
// Inserts gapi video game info
function insertGameInfo(){
	
}

// unhides section containing h2 elements
function showMainContent(){

}

// --- Other DOM manipulations ---

// Displays nav bar elements
function showNavElem(){

}

// Hides nav bar elements
function hideNavElem(){

}

// Hides section containing h2 elements
function hideMainContent(){

}

// Implements scrollspy
function showScrollSpy (){

}


// ---Other functions---

// Summary: creates storage place for results of character details pull
// Details: Callback function for getCapiCharDetails. This will update the global variable capiCharDetails with the json object so multiple functions can access the information without making unnecessary API calls
function updateCapiCharDetails(data){

}

// --- Event Listeners ---

// Expand or Collapse an H2 element

// Home function that clears all added elements and returns to original screen


// Summary: Evaluates & stores cust input
// Details: Event Listener. This reads the value the user submits in the search box and updates the global variable userSearchData. It will also trigger the getCapiCharId api pull function, passing through userSearchData and reviewCapiChar callbackfunction

function getUserSubmitValue (){

}