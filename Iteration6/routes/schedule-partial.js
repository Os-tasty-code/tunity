const express = require('express');
const router = express.Router();
const { getDJSchedule } = require('../databaseFunctions');

router.get('/schedule-modal-data', async (req, res) => {
    try {
        const djSchedule = await getDJSchedule();
        res.render('partials/schedule-modal-partial', { djs: djSchedule });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving data for schedule modal');
    }
});

module.exports = router;
