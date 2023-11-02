const path = require("path");
const express = require("express");
const home = require('./routes/home');
const app = express();
const options = {
    root: path.join(__dirname, "/")
};

//Tell node to use ejs.
app.set('view engine', 'ejs');
//uses style sheets inside public
app.use(express.static('public'))



//With express, you define handlers for routes.
app.get('/', (req, res) => {
    const userProfilePic = "/images/user-profile-pic.png";
    res.render('home', {userProfilePic}); // This will render views/index.ejs
});

app.get('/schedule', (req, res) => {
    const userProfilePic = "/images/user-profile-pic.png";
    res.render('schedule', { userProfilePic });
});

app.get('/playlist', (req, res) => {
    const userProfilePic = "/images/user-profile-pic.png";
    res.render('producer-playlist', { userProfilePic });
});

app.get('/queue', (req, res) => {
    const userProfilePic = "/images/user-profile-pic.png";
    res.render('queue', {userProfilePic}); // This will render views/index.ejs
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

app.get('/login', (req, res) => {
    res.render('login');
});


app.get('/scripts/:filename', function(req, res) {
    res.sendFile("/scripts/" + req.params.filename, options, (err) => {
        if (err) {
            console.log(err);
            res.status(404).send("File Not Found");
        }
    });
})

app.use(home);


app.listen(8080, () => {
    console.log("Tunity webpage on port 8080");
});
