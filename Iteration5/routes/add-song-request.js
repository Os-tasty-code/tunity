const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');

// Route to handle adding a song request
router.post('/add-song-request', async (req, res) => {
    const songName = req.body.songName;
    const userId = req.session.userId;

    try {
        const user = await UserModel.findById(userId);
        if (user) {
            user.listenerData.songRecommendations.push({ name: songName, status: 'PENDING' });
            await user.save();

            // Update session with new song recommendations
            req.session.songRecommendations = user.listenerData.songRecommendations;

            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
