//List itemcancel button
function showCancelDialog() {
    const dialog = document.getElementById("cancelDialog");
    dialog.showModal();
}

//Dialog no button
function closeCancelDialog() {
    const dialog = document.getElementById("cancelDialog");
        dialog.close();
}
document.getElementById("cancelNoButton").addEventListener("click", closeCancelDialog);

//Dialog yes button
function cancelRequest(button) {
    closeCancelDialog(button);
    // This is the list element box
    let listItem = button.parentElement.parentElement;
    //Logical Operators (2 points)
    if (!listItem)
        return;
    else {
        // Get the list
        var requestsList = listItem.parentElement;
        // Remove the list item and all its children from the ordered list
        requestsList.removeChild(listItem);
    }
    
}

//Variables (2 points)
let cancelYesButton = document.getElementById("cancelYesButton");
cancelYesButton.addEventListener("click", function() {
    cancelRequest(this);
});

// Functions (1 point):
//On click for the submit button to add a requested song.
function addListItemToRequests(button) {

    // Get the String from the songRequest input field
    var songRequestInput = document.getElementById("songRequestInput");
    var songRequestValue = songRequestInput.value.trim(); // Remove leading and trailing spaces
    //Comparison Operators (2 points):
    //Validating Forms (10 points): 
    //Window Object (10 points): 
    if (songRequestValue === "") {
        alert("Field can not be blank");
        return;
    } else {
        songRequestInput.value="";
    }


    //- Modifying a DOM Element (15 points):
    //Get whole list
    var requestsList = document.getElementById("requests-list");
    // Create a new list item
    var newItem = document.createElement("li");
    newItem.className = "list-item";
    //Add text
    var listTextDiv = document.createElement("div");
    listTextDiv.className = "list-item-text";
    listTextDiv.textContent = songRequestValue + " - PENDING"; // Use the input value
    newItem.appendChild(listTextDiv);
    // Add cancel button
    var cancelButton = document.createElement("button");
    cancelButton.className = "cancel-button";
    cancelButton.textContent = "Cancel";
    cancelButton.addEventListener("click", function () {
        showCancelDialog(this);
    });
    newItem.appendChild(cancelButton);
    //Add pending image
    var listPendingDiv = document.createElement("div");
    listPendingDiv.className = "list-item-pending";
    newItem.appendChild(listPendingDiv);
    //Add new item to list
    requestsList.appendChild(newItem);
    
    
}
var submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", function () {
    addListItemToRequests(submitButton);
});


function changeColor(button) {
    //Button click visual
    button.style.backgroundColor = '#190061';
    setTimeout(function () {
        button.style.backgroundColor = '#3500d3';
    }, 500);
}

// esc closes dialog too
document.onkeydown = function (event) {
    if (event.key === "Escape") { 
        closeCancelDialog();
    }
};

//- Loops (1 point):
//Window Object (10 points): 
function flashList() {
    let requestsList = document.getElementById("requests-list");
    let listItems = requestsList.querySelectorAll("li");
    for (let index = 0; index < listItems.length; index++) {
        let listItem = listItems[index];
        // Use setTimeout to change the background color and reset it to the original color
        setTimeout(function () {
            listItem.style.backgroundColor = "#3500d3";
            setTimeout(function () {
                listItem.style.backgroundColor = "#190061";
            }, 100); // Change color back after 1 second
        }, index * 100); // Change color after a delay
    }
}
flashList();
