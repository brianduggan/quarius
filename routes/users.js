var express   = require('express'),
    router    = express.Router(),
    User      = require('../models/user');

//CREATES A NEW USER
router.post('/', function(req,res){
  var newUser = new User(req.body.user);
  newUser.save(function(err, dbUser){
    if (err) {
      res.json({description: 'Sorry! This username exists!', status: 302})
    } else {
      res.redirect('/');
    }
  });
});

//LOGS IN USER
router.post('/authenticate', function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  User.findOne({username: username}).populate('teams').exec(function(err, dbUser){
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
  User.find({active: 1}).populate('teams').exec(function(err, dbUsers){
    if (err){
      res.json({description: 'Error!', status: 302});
    }
    res.json({users: dbUsers})
  });
});

// GETS USER BY TOKEN
router.get('/find/current', function(req,res){
  res.json(req.user);
});

// UPDATES USER INFO
router.patch('/:id', function(req,res){
  var userId = req.params.id;
  var profile = req.body;
  User.findByIdAndUpdate({'_id': userId}, profile, function(err, user){
    res.json({user: userId});
  });
});

// ADDS USER RESULT SET
router.put('/:id', function(req,res){
  var userId = req.params.id;
  var colorSet = req.body;
  User.findByIdAndUpdate({'_id': userId}, colorSet, function(err, user){
    res.json({user: userId});
  });
})

//ADDS/REMOVES USER TO/FROM A TEAM
router.put('/teams/:id', function(req,res){
  var action = req.body.action;
  var teamID = req.body.teamID;
  var userID = req.params.id;
  User.findById(req.params.id).exec(function(err, dbUser){
    if(err){
      res.json(err);
    } else {
      if (action === 'add'){
        dbUser.teams.push(teamID);
        dbUser.save(function(err2, user){
          if (err2){
            res.json(err2);
          }
          res.json(user);
        })
      } else if (action === 'remove'){
        var idx = dbUser.teams.indexOf(teamID);
        dbUser.teams.splice(idx, 1);
        dbUser.save(function(err2, user){
          if (err2){
            res.json(err2);
          }
          res.json(user)
        })
      }

    } // end success for find user
  }) //end callback
}) //end put

module.exports = router;
//
