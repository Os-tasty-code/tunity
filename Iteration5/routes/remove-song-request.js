const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');

router.post('/remove-song-request', async (req, res) => {
    const { songName } = req.body;
    const userId = req.session.userId; 

    try {
        const user = await UserModel.findById(userId);
        if (user) {
            // Not sure how to remove the exact song that was click on if there are duplicates, so just remove the latest duplicate.
            for (let i = user.listenerData.songRecommendations.length - 1; i >= 0; i--) {
                if (user.listenerData.songRecommendations[i].name === songName) {
                    user.listenerData.songRecommendations.splice(i, 1); //Remove one element after i
                    break;
                }
            }
            await user.save();

            // Update session data
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
