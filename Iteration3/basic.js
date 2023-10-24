document.addEventListener("DOMContentLoaded", () => {
    /* start song playing */
    let song = document.getElementById("song-audio")
    song.src = "Song-1.mp3";
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
});

function loadMusic() {
    let song = document.getElementById("song-audio")
    song.src = "Song-1.mp3";
    toggle();
    // console.log(song.duration);
}

/*onclick function for play button*/

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
