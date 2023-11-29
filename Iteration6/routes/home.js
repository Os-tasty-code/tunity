const express = require('express');
const router = express.Router();
const { getCurrentSong, getCurrentDJ } = require('../databaseFunctions');


router.get('/home', async (req, res) => {
    if(req.session.userProfilePic && req.session.songRecommendations) {
        const currentSong = await getCurrentSong();
        const currentDJ = await getCurrentDJ();

        res.render('home', { 
            userProfilePic: req.session.userProfilePic,
            djName: currentDJ ? currentDJ.login.username : 'DEBUG: DJ not listed in current state',
            djImageSrc: currentDJ ? currentDJ.profile.picture : '/images/404-image.png',
            albumName: currentSong ? currentSong.album : 'DEBUG: Song not listed in current state.',
            albumImageSrc: currentSong ? currentSong.albumArtUrl : '/images/404-image.png',
            songs: req.session.songRecommendations.map(rec => rec.name),
            statuses: req.session.songRecommendations.map(rec => rec.status)
        });
    } else {
        res.redirect('/login');
    }
});

module.exports = router;
