
// --- Global Variables ---
//
let userSearchData;
let capiCharDetails={};
let gapiCharID;

// --- API Pull functions---

// Summary: Character ID Pull - Comic Vine API (capi)
// Details: This accesses the Comic Vine Characters API with the main goal to get the character ID number to be utilized in other functions by updating the global variable capiCharID
function getCapiCharId (){

}
// Specific character data - capi

// Movie info - capi
// Comic info - capi

// Character ID - Giantbomb API (gapi)
// Specific character data - gapi
// Game info - gapi

// --- These compare data ---
// Summary: Compares existence of character in capi
// Details: Callback function for getCapiCharID. This will take in the data from getCapiCharId and compare the name keyvalue to the userSearchData global variable to see if there is match. If there is a match, it will call the getCapiCharDetails function, passing through the char ID and updateCapiCharDetails callback function. If there is not a match, it will trigger the insertInvalidSearch function.
function compareCapiChar (apiData){

}

// Compares comic book character info from capi to determine what to put into DOM
// This will take in the search data and call getCapiCharDetails function. It will compare theIf there is a match
function compareCapiComic () {

}
// Compares movie character info from capi to determine what to put into DOM
function compareCapiMovie () {
	
}
// Compares video game character info from gapi to determine what to put into DOM
function compareGapiGame () {
	
}


// ---Manipulates the DOM when there are errors---
// Inserts Invalid Search error message in DOM. Used when a user submits an invalid search (non comic book character)
function insertInvalidSearch (){

}
// Inserts No info found error message in results DOM

// --- Valid match insert functions. Manipulates DOM after valid character match ---
// Inserts mapi character pic and desc
// Inserts mapi comic information
// Inserts capi movie info
// Inserts gapi video game info


// Expand or Collapse an H2 element

// Displays nav bar elements

// Hides nav bar elements --- needed?

// Implements scrollspy

// Home function that clears all added elements and returns to original screen

// ---These figure out Cust input and/or update global variables---

// Summary: creates storage place for results of character details pull
// Details: Callback function for getCapiCharDetails. This will update the global variable capiCharDetails with the json object so multiple functions can access the information without making unnecessary API calls
function updateCapiCharDetails(data){

}

// Summary: Evaluates & stores cust input
// Details: This reads the value the user submits in the search box and stores it as a variable. This will trigger the compareCapiChar function, passing through the search variable

function getUserSubmitValue (){

}