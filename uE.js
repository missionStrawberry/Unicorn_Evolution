/****************************************************************************
* Name:        Unicorn Evolution
* Authors:     Shiraz E. and Anna M.
* Date:        June 17, 2019
* Purpose:     Drag horses together to evolve them to their highest form
*****************************************************************************/

var dragID; // identifies horse to be moved
var drHoId; // drop horse Id (the id of the horse to be drop location)
var hBreed; // current horse breed
var nBreed; // next breed to iterate
var x; // x coordinate
var y; // y coordinate
var horse1; // first horse of current breed
var horse2; // second horse of current breed
var moola = 1000; // currency

// possible horse positions
var posX = ["0px", "100px", "200px", "300px", "400px", "500px", "600px", "700px", "800px", "900px"];
var posY = ["100px", "200px", "300px", "400px", "500px"];

var x2; // x coordinate of the horse that was moved
 

/* change()
 * shifts through game screens based on selection */
function change(elemNum) {
	var element; // screen to display
	
	// assigns intended display
	switch (elemNum) {
	    case 0: element = "title";
		        break;
	    case 1: element = "menu";
				break;
		case 2: element = "instructions";
		        break;
		case 3: element = "credits";
				break;
		case 4: element = "play";
				break;
		case 5: element = "win";
				break;

	} // switch
	toggleView(element); // displays
} // change


/* toggleView()
 * shifts visibility of screen (eg., play screen) 
 * and horses */
function toggleView(elem) {
	var element = document.getElementById(elem);
	
	// if element exists, it is considered true
	if (element) {
		element.className = (element.className == "hidden") ? "unhidden":"hidden";
	} // if
} // toggleView


/* allowDrop()
 * moves elements together if they are of the same breed*/
function allowDrop(ev, divID) {
  drHoId = divID;
  var tF = isRDrop(); // determines whether one element can be placed on another
  
  if (tF === true) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  } // if
} // allowDrop

/* drag()
 * allows element (horse) movement */
function drag(ev) {
  ev.dataTransfer.setData("image/png", ev.target.id);
  ev.dataTransfer.dropEffect = "move";
} // drag

/* drop()
 * allows element to be placed, directs 
 * combinination of 2 horses to next breed */
function drop(ev, num) {
    
  // location of elements to be combined    
  x = document.getElementById(drHoId).offsetLeft + "px"; 
  y = document.getElementById(drHoId).offsetTop + "px";
  x2 = document.getElementById(dragID).offsetLeft + "px";
 
  ev.preventDefault();
  var data = ev.dataTransfer.getData("image/png"); // datatype of moved element
  nBreed = num + 1; // iterates to next breed
  breed(nBreed); // gets String value of breed for ID
  
  // dictates breed iteration/combination 
  if (hBreed != "magic") {
	horse1 = hBreed + "1"; // current IDs of horses to be changed
	horse2 = hBreed + "2";
	var typeChange; // which of the breed (first, second) can be made visible
	typeChange = checkChange(); // determines above value (1, 2)
	
	// makes changes in visibility if possible
	if (typeChange == 0 || typeChange == 1) {
	  evolve(typeChange); 
	  moola += 700; // increases user earnings
	  document.getElementById("money").innerHTML = "Money: $" + moola; // displays earnings
    } // if
  } else {
    var d; // element dragged
	var e = document.getElementById("magic"); // highest evolution
	d = document.getElementById(dragID);
	d.style.left = x; // coodinates (on drop)
	d.style.top = y;
    
  // hides combined horses, displays final form
	toggleView(dragID);
	toggleView(drHoId);
	toggleView("magic");
	e.style.left = x; // appears at drop location
    e.style.top = y;
  } // else
  
  // displays win screen
  if (document.getElementById("magic").className == "unhidden") {
	toggleView("play");
	toggleView("win");
  } // if
} // drop


/* getId()
 * stores horse to drag when clicked */
function getId(divID) {
  dragID = divID;
} // getId

/* isRDrop()
 * (is right drop) returns true if the horse being dragged and the drop location horse are the same breed */
function isRDrop() {
  if ((drHoId == "mini1" && dragID == "mini2") || (dragID == "mini1" && drHoId == "mini2")) {
	return true;
  } else if ((drHoId == "welsh1" && dragID == "welsh2") || (dragID == "welsh1" && drHoId == "welsh2")) {
	return true;
  } else if ((drHoId == "arabian1" && dragID == "arabian2") || (dragID == "arabian1" && drHoId == "arabian2")) {
	return true;
  } else if ((drHoId == "friesian1" && dragID == "friesian2") || (dragID == "friesian1" && drHoId == "friesian2")) {
	return true;
  } else if ((drHoId == "clydesdale1" && dragID == "clydesdale2") || (dragID == "clydesdale1" && drHoId == "clydesdale2")) {
	return true;
  } else if ((drHoId == "unicorn1" && dragID == "unicorn2") || (dragID == "unicorn1" && drHoId == "unicorn2")) {
	return true;
  } else if ((drHoId == "alicorn1" && dragID == "alicorn2") || (dragID == "alicorn1" && drHoId == "alicorn2")) {
	return true;
  } else {
	return false;
  } // else
} // isRDrop

// dictates String definition of numerical breed
function breed(num) {
  
  // assigns String name to be used in IDs  
  switch(num) {
	case 0: hBreed = "mini";
			break;
	case 1: hBreed = "welsh";
			break;
	case 2: hBreed = "arabian";
	        break;
	case 3: hBreed = "friesian";
	        break;
	case 4: hBreed = "clydesdale";
	        break;
	case 5: hBreed = "unicorn";
	        break;
	case 6: hBreed = "alicorn";
	        break;
	case 7: hBreed = "magic";
  } // switch
} // breed

/* checkChange()
 * checks for capacity (storage) to show next breed (2 possible at once) */
function checkChange() {
  var fHorse = document.getElementById(horse1); // first horse (of breed)
  var sHorse = document.getElementById(horse2); // second horse 
  
  // value equates to which (/2) horse can be made visible, error message if both already shown
  if (fHorse.className == "hidden" && sHorse.className == "hidden") {
	return 0;
  } else if (fHorse.className == "unhidden" && sHorse.className == "hidden") {
	return 1;
  } else {
	document.getElementById("message").innerHTML = "There are too many horses of the same breed. Please drag some together.";
	document.getElementById("botBar").className  = "unhidden"; // bottom bar with error message displays
	return 2;
  } // else
} // checkChange

/* evolve()
 * positions and displays next horse, hides both of last breed */
function evolve(num) {
  var d; // element (horse) dragged
  var e; // element to make visible
  d = document.getElementById(dragID);
  d.style.left = x; // positioning of drop
  d.style.top = y; // (cont.) to place new horse with
  
  toggleView(dragID);
  toggleView(drHoId);
  posX.push(x2); // adds available x coordinate into posX array
  
  // based on already visible element, displays possible horse
  if (num == 0) {
	e = document.getElementById(horse1);
	toggleView(horse1);
  } else if (num == 1) {
    e = document.getElementById(horse2);
	toggleView(horse2);
  } // else if
  e.style.left = x; // positions at merge location
  e.style.top = y;
  
} // evolve

/* spawn()
 * spawns a miniature horse if the user is able to buy one, otherwise shows an error message */
function spawn() {
  var rand1;
  var rand2;
  var mOne = document.getElementById("mini1");
  var mTwo = document.getElementById("mini2");
  
  // randomly picks x and y coordinates from array of possibilities
  rand1 = Math.floor(Math.random() * (posX.length));
  rand2 = Math.floor(Math.random() * (posY.length));
  
  // if there is room, spawns first or second mini, otherwise shows error message
  if (posX.length == 0) {
	document.getElementById("message").innerHTML = "There are too many horses. Please drag some together.";
	document.getElementById("botBar").className  = "unhidden";
  } else if (mOne.className == "hidden" && mTwo.className == "hidden") {
	mOne.style.left = posX[rand1];
	mOne.style.top = posY[rand2];
	toggleView("mini1");
	moola -= 300; 
	posX.splice(rand1, 1); // removes an x coordinate in use from posX array
  } else if (mOne.className == "unhidden" && mTwo.className == "hidden") {
	mTwo.style.left = posX[rand1];
	mTwo.style.top = posY[rand2];
	toggleView("mini2");
	moola -= 300;
	posX.splice(rand1, 1);
  } else {
	document.getElementById("message").innerHTML = "There are too many miniature horses. Please drag them together.";
	document.getElementById("botBar").className  = "unhidden";
  } // else
  document.getElementById("money").innerHTML = "Money: $" + moola;
}

/* reset()
 * when the user starts a game, money is reset, posX array is refilled
 * and horses are hidden */
function reset() {
  moola = 1000;
  document.getElementById("money").innerHTML = "Money: $" + moola;
 
 // hide all horses
  var i = 0;
  for (; i < 7; i++) {
    breed(i);
    horse1 = document.getElementById(hBreed + "1");
    horse2 = document.getElementById(hBreed + "2");
	horse1.className = "hidden";
	horse2.className = "hidden";
  } // for
  var m = document.getElementById("magic");
  m.className = "hidden";
  
  posX = ["0px", "100px", "200px", "300px", "400px", "500px", "600px", "700px", "800px", "900px"];
  var b = document.getElementById("botBar");
  b.className = "hidden";
} // reset