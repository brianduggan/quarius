var express   = require('express'),
    router    = express.Router(),
    Team      = require('../models/team');

router.post('/', function(req, res){
  var team = req.body;
  team = new Team(team);
  team.save(function(err, dbTeam){
    if (err){
      res.json(err);
    } else {
      res.json(dbTeam);
    }
  })
});

router.get('/', function(req,res){
  Team.find({}).populate('management').populate('teamMembers').exec(function(err, dbTeams){
    if(err){
      res.json(err)
    } else {
      res.json(dbTeams)
    }
  })
})

module.exports = router;


//
