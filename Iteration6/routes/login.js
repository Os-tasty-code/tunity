const express = require('express');
const UserModel = require('../models/User'); 
const CurrentStateModel = require('../models/CurrentState'); 
const SongModel = require('../models/Song'); 
const router = express.Router();

//Jane Jacobs 
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserModel.findOne({ 'login.username': username });
        if (user && user.login.password === password) {
            req.session.userId = user._id;
            req.session.userProfilePic = user.profile.picture;
            switch (user.login.accountType) {
                case 'listener':
                    // Find user song recommendations and redirect to listener homepage
                    req.session.songRecommendations = user.listenerData.songRecommendations;
                    res.json({ success: true, redirectUrl: '/home' });
                    break;
                // O Dodart
                case 'dj':
                    // Redirect to DJ-specific page
                    let state = await CurrentStateModel.find().exec();
                    if(state.at(0).currentSong == undefined) {
                        const newState = new CurrentStateModel({
                            currentDj: user,
                            currentSong: (await SongModel.find().exec()).at(0)
                        })
                        await newState.save();
                    }
                    res.json({ success: true, redirectUrl: '/queue' }); // update djHome to actual page.
                    break;
                // Ramsha Kapadia
                case 'producer':
                    // Redirect to producer-specific page
                    res.json({ success: true, redirectUrl: '/schedule' }); // update producerHome to actual page.
                    break;
            }

        } else {
            res.json({ success: false, message: 'Invalid username or password' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("500: Server Error");
    }
});


module.exports = router;
