const express = require('express');
const UserModel = require('../models/User'); 
const router = express.Router();

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
                case 'dj':
                    // Redirect to DJ-specific page
                    console.error("DEBUG: DJ home page not connected in /routes/login.js")
                    //Add DJ info to session here
                    res.json({ success: true, redirectUrl: '/' }); // update djHome to actual page.
                    break;
                case 'producer':
                    // Redirect to producer-specific page
                    //add producer info to session here
                    //console.error("DEBUG: Producer home page not connected in /routes/login.js")
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
