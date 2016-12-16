//MODULES & MIDDLEWARE
var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    morgan          = require('morgan'),
    mongoose        = require('mongoose'),
    mongoPath       = process.env.MONGODB_URI || 'mongodb://localhost/quarius-01',
    cookieParser    = require('cookie-parser'),
    loadUser        = require('./middleware/loaduser.js');

require('dotenv').config();
app.set('view engine', 'jade');
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(loadUser);
mongoose.connect(mongoPath);

//ROUTES
var userRouter = require('./routes/users');
app.use('/users', userRouter);

var mailRouter = require('./routes/mail')
app.use('/contact', mailRouter);

var sampleRouter = require('./routes/sample');
app.use('/sample', sampleRouter);

app.get('/', function(req,res){
  res.render(__dirname + '/public/views/index');
});


//LISTEN
var port = process.env.PORT || 8000;
app.listen(port, function(req,res){
  console.log('Listening on port: ' + port);
});


//
