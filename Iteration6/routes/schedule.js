const express = require('express');
const router = express.Router();
const { getCurrentSong, getCurrentDJ } = require('../databaseFunctions');


router.get('/schedule', async (req, res) => {
    res.render('schedule', { userProfilePic });
    alert("in router.get");
});

module.exports = router;
