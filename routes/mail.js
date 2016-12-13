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
  console.log(mailOptions);
  console.time('send');
  transporter.sendMail(mailOptions, function(error, info){
    if (error){
      console.log(error);
    } else {
      console.log('sent ' + info.envelope + ' ' + info.messageId);
      var thetime = console.timeEnd('send');
      console.log(thetime);
        res.json(info);
    }
  })
  console.log('hmmm....');
})

module.exports = router;
