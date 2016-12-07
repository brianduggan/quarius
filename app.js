//MODULES & MIDDLEWARE
var express       = require('express'),
    app           = express(),
    bodyParser    = require('body-parser'),
    morgan        = require('morgan'),
    mongoose      = require('mongoose'),
    mongoPath     = process.env.MONGOLAB_URI || 'mongodb://localhost/quarius-01',
    cookieParser  = require('cookie-parser'),
    loadUser      = require('./middleware/loaduser.js');

app.set('view engine', 'jade');
mongoose.connect(mongoPath);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(loadUser);

//ROUTES
app.get('/', function(req,res){
  res.render('index');
});


//LISTEN
var port = process.env.PORT || 8000;
app.listen(port, function(req,res){
  console.log('Listening on port: ' + port);
});


//
