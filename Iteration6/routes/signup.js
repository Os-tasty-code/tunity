const express = require('express');
const router = express.Router();
const { getCurrentSong, getCurrentDJ, getPlaylist, loadPlaylistSong } = require('../databaseFunctions.js');

router.get('/signup', async (req, res) => {
    let playlist = await getPlaylist();
    res.render('signup', {
        songs: playlist
    });
});


module.exports = router;
