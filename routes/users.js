var express   = require('express'),
    router    = express.Router(),
    User      = require('../models/user');

//CREATES A NEW USER
router.post('/', function(req,res){
  var newUser = new User(req.body.user);
  newUser.save(function(err, dbUser){
    if (err) {
      console.log(err);
      res.json({description: 'Sorry! This username exists!', status: 302})
    } else {
      res.redirect('/')
    }
  });
});

//GETS ALL USERS
router.get('/', function(req,res){
  User.find({}).exec(function(err, dbUsers){ //populate teams here
    if (err){
      console.log(err);
      res.json({description: 'Error!', status: 302});
    }
    console.log(dbUsers);
    res.json({users: dbUsers})
  });
});


module.exports = router;
//
