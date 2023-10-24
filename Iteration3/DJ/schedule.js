document.addEventListener("DOMContentLoaded", () => {
    /* start song playing */
    let song = document.getElementById("song-audio")
    song.src = "../Song-1.mp3";
    toggle();
    // loadMusic();
    /* progress bar changes over time */
    let prog = document.getElementsByClassName("progress")[0];
    let list = document.getElementById("playlist").children[0];
    let w = 0;
    let s = 1;
    let dur = 100;
    // if(song.duration != NaN) {
    //     dur = song.duration
    // }
    setInterval(() => {
        if(!song.paused) {
            w += (dur/100);
            prog.value = w;
        }
        if(w > 100 && list.children.length > 1) { /*progress bar restarts and moves next song up*/
            w = 0;
            s++;
            document.getElementById("current").children[0].children[1].innerHTML = "Song " + s;
            list = document.getElementById("playlist").children[0];
            list.removeChild(list.children[1]);
            dur = song.duration;
        }
        if(list.children.length == 1) {
            w=100;
            document.getElementById("current").children[0].children[0].innerHTML = "Stay Tuned for More Songs!";
        }
    }, 100)

    const elements = [
        { buttonText: 'A' },
        { buttonText: 'A' },
        { buttonText: 'B' },
        { buttonText: 'A' },
        { buttonText: 'B' },
        { buttonText: 'TIME OFF' },
        { buttonText: 'TIME OFF' },
        { buttonText: 'A' },
        { buttonText: 'A' },
        { buttonText: 'C' },
        { buttonText: 'NONE' },
        { buttonText: 'B' },
        { buttonText: 'A' },
        { buttonText: 'B' },
        { buttonText: 'A' },
        { buttonText: 'TIME OFF' },
        { buttonText: 'TIME OFF' },
        { buttonText: 'TIME OFF' },
        { buttonText: 'TIME OFF' },
        { buttonText: 'A' },
        { buttonText: 'D' },
        { buttonText: 'TIME OFF' },
        { buttonText: 'TIME OFF' },
        { buttonText: 'NONE' },
        { buttonText: 'A' },
        { buttonText: 'C' },
        { buttonText: 'NONE' },
        { buttonText: 'B' }
    ];
    // Get parent div in which you want to add buttons
    const parent = document.getElementById("grid-container");
    
    // In for loop, set "i" to be lower than number length of array.
    for(let i = 0; i < elements.length; i++) {
        // Create button node and add innerHTML (innerHTML is stuff that goes between <></> tags).
        // Since "elements" is an array, you select current iteration of it with [i]
        let button = document.createElement("button");
        if(elements[i].buttonText == 'A') {
            button.classList.add("grid-item-on");
            button.innerHTML = "On-Air";
        } else if(elements[i].buttonText == 'NONE') {
            button.classList.add("grid-item-pot");
            button.innerHTML = "Open Slot";
            button.onclick = openForm;
        } else if(elements[i].buttonText == 'TIME OFF') {
            button.classList.add("grid-item-off");
            button.innerHTML = elements[i].buttonText;
        } else {
            button.classList.add("grid-item-" + elements[i].buttonText.toLowerCase());
            button.innerHTML = elements[i].buttonText;
        }
        parent.appendChild(button);
    }
});

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

function toggle() {
    let button = document.getElementById("toggle-song");
    let song = document.getElementById("song-audio");
    if(song.paused) {
        button.innerHTML = "||";
        song.play();
    } else {
        button.innerHTML = "▶";
        song.pause();
    }
}
