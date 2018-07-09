// console.log("Hello World!");

// Global Variable ini

const localKey = "arrayDataSet"; // localKey controls all interaction with localStorage. code technically reusable, somewhat

// environment initialization START
if (!localStorage.getItem(localKey)){
	var array = [{
		data: "initialize"
	}];	
	localStorage.setItem(localKey, jsonify(array));
}
display();
// environment initialization END


// HELPER FUNCTIONS
// convert JSON into array
function unjsonify(jsonData){
	return JSON.parse(jsonData);
}
// convert user input into JSON string
function jsonify(userInput){
	return JSON.stringify(userInput);
}

// MAIN FUNCTIONS
function addItem(){
	var insertData = document.getElementById("input").value; //TODO: abstract ElementID for reusable add item (from different input fields)
	var array = unjsonify(localStorage.getItem(localKey));

	array.push({
		data: insertData // treat the data structure as a table, fieldName: dataToBeInserted
	});

	localStorage.setItem(localKey, jsonify(array));
	localStorage.dataId = array.length;

	display();
}

function deleteItem(){
	// var id = document.querySelector('.delete:checked').id; //  //TODO: abstract

	var index = document.querySelector('.delTask').id; 

	var array = unjsonify(localStorage.getItem(localKey));
	array.splice(index, 1);
	localStorage.setItem(localKey, jsonify(array));

	display();
}

function editItem(){
	var index = document.querySelector('.edTask:checked').id; //  //TODO: abstract
	var currentData = document.querySelector('.edTask:checked').data;
	// console.log(index);
	// var editValue = document.getElementById("editField").value;  //TODO: abstract
	// var editValue = prompt("enter new data: ");  // prompt
	document.getElementById("modal").style.display = "block";

	var array = unjsonify(localStorage.getItem(localKey));
	array.splice(index, 1, {
		data: editValue
	});
	localStorage.setItem(localKey, jsonify(array));

	display();
}

// SMELLY FUNCTION
function display(){
	var arrData = unjsonify(localStorage.getItem(localKey));
	var toPrint;

	// right now it doesn't consider the fact that there's already existing data in the HTML element
	// the easiest way is to just wipe everything before appending
	if(document.getElementById("test")) {  //TODO: abstract
		document.getElementById("test").innerHTML = "";  //TODO: abstract
	}

	// basic building blocks
	var mainDiv = $("ol#test");  //TODO: abstract

	for(var i = 1; i < arrData.length;  i ++){
		toPrint = arrData[i]; // the main data are stored in toPrint

		mainDiv.append(  //TODO: abstract, make this code cleaner. seems hard to maintain and susceptible to syntax error
			"<li>" 
			// + "<label class='deleteLabel'>"
			// + "<input type='checkbox'"
			// + "class='delete'"
			// + "onclick='deleteItem()'"
			// + "id ='" + i + "'"
			// + ">"		
			// + "</label>"
			+ "<span onclick='deleteItem()' class='delTask' id='" + i + "'" + "> delete </span>" // controls the delete "button"
			+ toPrint.data 
			// + "<span onclick='editItem()' class='edTask' id='" + i + "'" + ">  Edit </span>" // controls the delete "button"
			// + "<input type='radio' class='edTask id='" + i + "'" + ">"
			+ "<label class='edit' onclick='editItem()'>" 
			+ "<input type='checkbox' " 
			+ "class='edTask'"
			+ "id ='" + i + "'"
			+ "> edit "	
			+ "</label>"
			+ "</li>"
		);

	}
}



// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}