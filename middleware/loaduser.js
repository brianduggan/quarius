var User = require('../models/user');

function loadUser(req,res,next){
  if(req.cookies.token){
    User.findOne({token: req.cookies.token}).populate('teams').exec(function(err, dbUser){
      req.user = dbUser;
      next();
    })
  } else {
    next();
  }
}

module.exports = loadUser;
//
