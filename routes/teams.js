var express   = require('express'),
    router    = express.Router(),
    Team      = require('../models/team');

//CREATE A NEW TEAM
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

// GET ALL TEAMS
router.get('/', function(req,res){
  Team.find({}).populate('management').populate('teamMembers').exec(function(err, dbTeams){
    if(err){
      res.json(err)
    } else {
      res.json(dbTeams)
    }
  })
})

//GET ONE TEAM
router.get('/:id', function(req,res){
  Team.findById(req.params.id).populate('management').populate('teamMembers').exec(function(err, dbTeam){
    if(err){
      res.json(err);
    } else {
      res.json(dbTeam);
    }
  })
})

// UPDATE TEAM INFORMATION
router.put('/:id', function(req,res){
  Team.findByIdAndUpdate(req.params.id, req.body).populate('management').populate('teamMembers').exec(function(err, dbTeam){
    if(err){
      res.json(err);
    } else {
      res.json(dbTeam);
    }
  })
})

module.exports = router;


//
