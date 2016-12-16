var express   = require('express'),
    router    = express.Router(),
    Sample    = require('../models/sample');

router.post('/', function(req,res){
  var newSample = new Sample(req.body);
  newSample.save(function(err, dbSample){
    if (err){
      res.json({description: err});
    } else {
      res.json(dbSample);
    }
  });
})

module.exports = router;
