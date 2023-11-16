
const express = require('express');
const router = express.Router();

//Removes session/cookie on logout
router.get('/logout', function(req, res){
    req.session.destroy(function(err){
      if(err){
        console.error(err);
      } else {
        res.redirect('/');
      }
    });
  });
  
module.exports = router;
