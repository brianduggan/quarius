var express   = require('express'),
    router    = express.Router(),
    User      = require('../models/user');

router.post('/', function(req,res){
  var newUser = req.body.user;
  console.log(newUser);
  res.json(newUser);
})


module.exports = router;
//
