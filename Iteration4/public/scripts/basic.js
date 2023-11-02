document.addEventListener("DOMContentLoaded", () => {
    /* start song playing */
    let song = document.getElementById("song-audio")
    song.src = "songs/Song-1.mp3";
    toggle();
    /* progress bar changes over time */
    let prog = document.getElementsByClassName("progress")[0];
    let list = document.getElementById("playlist").children[0];
    let w = 0;
    let s = 1;
    let dur = 100;

    setInterval(() => {
        if(!song.paused) {
            w += (dur/100) * 0.1;
            prog.value = w;
            if (!isNaN(song.duration)) {
                duration = song.duration
            }
        }
        if(w > 100 && list.children.length > 1) { /*progress bar restarts and moves next song up*/
            w = 0;
            s++;
            document.getElementById("current").children[0].children[1].innerHTML = "Song2";
            list = document.getElementById("playlist").children[0];
            list.removeChild(list.children[1]);

            song.src = "../songs/Song-" + s + ".mp3"
            dur = song.duration;
        }
        if(list.children.length == 1) {
            w=100;
            document.getElementById("current").children[0].children[0].innerHTML = "Stay Tuned for More Songs!";
        }
    }, 100)
});

/*onclick function for play button*/
function toggle() {
    let button = document.getElementById("toggle-song");
    let song = document.getElementById("song-audio");
    setInterval(() => {
        if(isNaN(song.duration)) {
            console.log("invalid duration")
        } else {
            return;
        }
    }, 100)
    try{
        if(song.paused) {
            button.innerHTML = "||";
            song.play();
        } else {
            button.innerHTML = "▶";
            song.pause();
        }
    } catch (e) {
        console.log(e.message);
    }
}
