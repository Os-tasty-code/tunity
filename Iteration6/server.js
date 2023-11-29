const path = require("path");
const express = require("express");
const home = require('./routes/home');
const signup = require('./routes/signup');
const login = require('./routes/login');
const logout = require('./routes/logout');
const addSongRequest = require('./routes/add-song-request');
const removeSongRequest = require('./routes/remove-song-request');
const session = require('express-session');


const mongoose = require('./database');
const { loadTestData, clearDatabase, loadSong, getDJSchedule } = require('./databaseFunctions');
const UserModel = require('./models/User');
const SongModel = require('./models/Song');
const CurrentStateModel = require('./models/CurrentState');
const { getCurrentSong, getCurrentDJ, getPlaylist, loadPlaylistSong } = require('./databaseFunctions');

mongoose.connection.once('open', () => {
    //loads example docs into mongo if database is empty.
    loadTestData();
    // loadSong("./songs/Song-3.mp3")
    //For debugging
    // clearDatabase();
});


const app = express();
const options = {
    root: path.join(__dirname, "/")
};

//Tell node to use ejs.
app.set('view engine', 'ejs');
//uses style sheets inside public
app.use(express.static('public'))
app.use(express.json()); //To use json to send data in form.
app.use(express.urlencoded({ extended: true }))
app.use(session({ //To store sessions
    secret: 'IDK if this needs to be unique', 
    cookie: {}
}));


//Jane Jacobs & O Dodart
app.get('/', async (req, res) => {
    const currentSong = await getCurrentSong();
    const currentDJ = await getCurrentDJ();
    let playlist = await getPlaylist();

    // let playlistsong = await loadPlaylistSong()

    res.render('index', {
        djName: currentDJ ? currentDJ.login.username : 'DEBUG: DJ not listed in current state',
        djImageSrc: currentDJ ? currentDJ.profile.picture : '/images/404-image.png',
        albumName: currentSong ? currentSong.album : 'DEBUG: Song not listed in current state.',
        albumImageSrc: currentSong ? currentSong.albumArt : '/images/404-image.png',
        songs: playlist
    });
});
  

app.get('/schedule', async (req, res) => {
    const userProfilePic = "/images/user-profile-pic.png";
    const currentSong = await getCurrentSong();
    const currentDJ = await getCurrentDJ();
    const djSchedule = await getDJSchedule();
    let playlist = await getPlaylist();

    res.render('schedule', { 
        userProfilePic,
        djs: djSchedule,
        songs: playlist
    });
});

app.get('/playlist', (req, res) => {
    const userProfilePic = "/images/user-profile-pic.png";
    res.render('producer-playlist', { userProfilePic });
});

//O Dodart
app.get('/queue', async (req, res) => {
    const userProfilePic = "/images/user-profile-pic.png";
    const songs = await getPlaylist();

    res.render('queue', {
        userProfilePic: userProfilePic,
        songs: songs
    }); 
});

/*pathing for image folder*/
app.get('/images/:filename', function(req, res) {
    res.sendFile("/images/" + req.params.filename, options, (err) => {
        if (err) {
            console.log(err);
            res.status(404).send("File Not Found");
        }
    });
})

/*pathing for song folder*/
app.get('/songs/:filename', function(req, res) {
    res.sendFile("/songs/" + req.params.filename, options, (err) => {
        if (err) {
            console.log(err);
            res.status(404).send("File Not Found");
        }
    });
})


app.get('/scripts/:filename', function(req, res) {
    res.sendFile("/scripts/" + req.params.filename, options, (err) => {
        if (err) {
            console.log(err);
            res.status(404).send("File Not Found");
        }
    });
})

app.use(home);
app.use(signup);
app.use(login);
app.use(logout);
app.use(addSongRequest);
app.use(removeSongRequest);


app.listen(8080, () => {
    console.log("Tunity webpage on port 8080");
});
