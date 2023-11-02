const express = require('express');
const router = express.Router();

router.get('/home', (req, res) => {
    res.render('home', { userProfilePic: '/images/user-profile-pic.png',
        djName: 'DJ Ella',
        djImageSrc: '/images/dj-profile-pic.jpg',
        albumName: "Marvin Gaye - What's Going On",
        albumImageSrc: '/images/alblum-art.jpg',
        songs: ["My Girl - The Temptations", "The Wheels on the bus", "Baby Love - The Supremes"],
        statuses: ["APPROVED", "REJECTED", "PENDING"]
     });
});

module.exports = router;
