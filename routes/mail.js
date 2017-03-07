var express     = require('express'),
    router      = express.Router(),
    nodemailer  = require('nodemailer'),
    transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                      user: process.env.GMAILUSER,
                      pass: process.env.GMAILPASS
                    }
                  });

router.post('/', function(req,res){
  var mailOptions = {
    from: req.body.name + ' <'+req.body.email+'>',
    to: 'brian.e.duggan@icloud.com',
    subject: req.body.topic + ': '+ req.body.subject,
    text: req.body.message
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error){
      console.log(error);
    } else {
      console.log('sent ' + info.envelope + ' ' + info.messageId);
      res.json(info);
    }
  })
  console.log('hmmm....');
})

router.post('/password/reset', function(req,res){
  var password = req.body.password;
  var email = req.body.email;
  var mailOptions = {
    from: 'Quarius Staff',
    to: email,
    subject: 'Your New Temporary Password',
    text: password
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error){
      res.json({error: error});
    } else {
      console.log('sent ' + info.envelope + ' ' + info.messageId);
      res.json(info);
    }
  })
})

module.exports = router;
