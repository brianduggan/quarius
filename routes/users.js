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

//LOGS IN USER
router.post('/authenticate', function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  User.findOne({username: username}).exec(function(err, dbUser){
    if (dbUser){
      dbUser.authenticate(password, function(err2, isMatch){
        if (isMatch){
          dbUser.setToken(function(){
            res.json({
              description: 'password correct',
              user: dbUser
            });
          });
        } else {
          res.json({description: 'Sorry! Password is incorrect.', status: 302});
        }
      })
    } else {
      res.json({description: 'Sorry! Username does not exist.', status: 302});
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

// GETS USER BY TOKEN
router.get('/find/current', function(req,res){
  res.json(req.user);
});

module.exports = router;
//
