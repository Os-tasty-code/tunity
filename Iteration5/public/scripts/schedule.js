document.addEventListener("DOMContentLoaded", () => {
    // /* progress bar changes over time */
    // let prog = document.getElementsByClassName("progress")[0];
    // let list = document.getElementById("playlist").children[0];
    // let w = 0;
    // let s = 1;
    // let dur = Math.ceil(Math.random() * 50) + 50;
    // console.log(dur);
    // setInterval(() => {
    //     w += (dur/100);
    //     prog.style.width = w + "%";
    //     if(w > 100 && list.children.length > 1) { /*progress bar restarts and moves next song up*/
    //         w = 0;
    //         s++;
    //         document.getElementById("current").children[0].children[0].innerHTML = "Song " + s;
    //         list = document.getElementById("playlist").children[0];
    //         list.removeChild(list.children[1]);
    //         dur = Math.ceil(Math.random() * 50) + 50;
    //     }
    //     if(list.children.length == 1) {
    //         w=100;
    //         document.getElementById("current").children[0].children[0].innerHTML = "Stay Tuned for More Songs!";
    //     }
    // }, 1)

    // const elements = [
    //     { buttonText: 'A' },
    //     { buttonText: 'A' },
    //     { buttonText: 'B' },
    //     { buttonText: 'A' },
    //     { buttonText: 'B' },
    //     { buttonText: 'D' },
    //     { buttonText: 'D' },
    //     { buttonText: 'A' },
    //     { buttonText: 'A' },
    //     { buttonText: 'C' },
    //     { buttonText: 'NONE' },
    //     { buttonText: 'B' },
    //     { buttonText: 'A' },
    //     { buttonText: 'B' },
    //     { buttonText: 'A' },
    //     { buttonText: 'C' },
    //     { buttonText: 'C' },
    //     { buttonText: 'D' },
    //     { buttonText: 'D' },
    //     { buttonText: 'A' },
    //     { buttonText: 'D' },
    //     { buttonText: 'C' },
    //     { buttonText: 'C' },
    //     { buttonText: 'NONE' },
    //     { buttonText: 'A' },
    //     { buttonText: 'C' },
    //     { buttonText: 'NONE' },
    //     { buttonText: 'B' }
    // ];

    // Get parent div in which you want to add buttons
    const parent = document.getElementById("grid-container");
    
    // In for loop, set "i" to be lower than number length of array.
    alert("djs length: " + djs.length);
    for(let i = 0; i < djs.length; i++) {
        // Create button node and add innerHTML (innerHTML is stuff that goes between <></> tags).
        // Since "elements" is an array, you select current iteration of it with [i]
        let button = document.createElement("button");
        button.classList.add("grid-item-" + djs[i].djCode);
        button.innerHTML = elements[i].djName;
        console.log("button text: " + button.innerHTML);
        button.onclick = openForm;
        parent.appendChild(button);
    }
});

function showCancelDialog(button) {
    button.parentElement.querySelector(".cancel-dialog").showModal();
  }

  function closeCancelDialog(button) {
    button.parentElement.closest(".cancel-dialog").close();
  }

  function cancelRequest(button) {
    button.parentElement.closest(".cancel-dialog").close();
  }

function submitDJ() {
    var dj = document.getElementById("djcode").value;
    console.log("dj: " + dj);
    if(dj == "") {
        alert("You must input a DJ code!");
        return false;
    }
    else {
        alert("Form submitted!");
        return true;
    }
}

function openForm() {
    document.getElementById("changeDJ").style.display = "block";
}
  
function closeForm() {
    document.getElementById("changeDJ").style.display = "none";
}