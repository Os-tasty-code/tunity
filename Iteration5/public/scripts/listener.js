//List itemcancel button
let currentCancelSongName = null; //Store song being canceled to be passed to dialog.
function showCancelDialog(button) {
    let listItem = button.closest('.list-item');
    currentCancelSongName = listItem.querySelector('.list-item-text').textContent.split(' - ')[0];

    const dialog = document.getElementById("cancelDialog");
    dialog.showModal();
}


//Dialog no button 
function closeCancelDialog() {
    const dialog = document.getElementById("cancelDialog");
        dialog.close();
}
document.getElementById("cancelNoButton").addEventListener("click", closeCancelDialog);

//Dialog yes button - updates db with song and reloads page
function cancelRequest() {
    fetch('/remove-song-request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ songName: currentCancelSongName }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.reload();
        } else {
            alert('Error removing song request');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


let cancelYesButton = document.getElementById("cancelYesButton");
cancelYesButton.addEventListener("click", function() {
    cancelRequest(this);
});

//On click for the submit button to add a requested song - updates db and refreshies page
function addListItemToRequests(button) {
    var songRequestInput = document.getElementById("songRequestInput");
    var songRequestValue = songRequestInput.value.trim();

    if (songRequestValue === "") {
        //TODO: add some double click protection here? Its annoying getting the alert.
        alert("Field cannot be blank");
        return;
    } else {
        songRequestInput.value = "";
        fetch('/add-song-request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ songName: songRequestValue }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.reload(); // Reload the page to reflect changes
            } else {
                alert("Error adding song request");
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}

//Connect form submit button
var submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", function () {
    addListItemToRequests(submitButton);
});

//Change submit button color on click
function changeColor(button) {
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


//Light up req list on load (such as adding or removing element load)
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
            }, 100); 
        }, index * 100);
    }
}
flashList();
