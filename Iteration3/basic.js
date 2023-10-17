document.addEventListener("DOMContentLoaded", () => {
    /* progress bar changes over time */
    let prog = document.getElementsByClassName("progress")[0];
    let w = 0;
    let s = 1;
    let dur = Math.ceil(Math.random() * 50) + 50;
    console.log(dur);
    setInterval(() => {
        w += (dur/100);
        prog.style.width = w + "%";
        if(w > 100) { /*progress bar restarts and moves next song up*/
            w = 0;
            s++;
            document.getElementById("current").children[0].children[0].innerHTML = "Song " + s;
            let list = document.getElementById("playlist").children[0];
            list.removeChild(list.children[1]);
            dur = Math.ceil(Math.random() * 50) + 50;
        }
        if(s == 8) {
            document.getElementById("current").children[0].children[0].innerHTML = "Stay Tuned for More Songs!";
            w=100;
        }
    }, dur)
});
