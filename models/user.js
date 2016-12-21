var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    crypto = require('crypto');

var UserSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  token: {type: String},
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  company: {type: String, required: false},
  position: {type: String, required: false},
  email1: {type: String, required: true},
  email2: {type: String, required: false},
  offPhone: {type: String},
  cellPhone: {type: String},
  type: {type: Number, required: true},
  active: {type: Boolean},
  primaryColor: {type: String},
  secondaryColor: {type: String},
  vert: {type: String},
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }]
}, {timestamps: true});

UserSchema.pre('save', function(next){
  if( this.isModified('password') ){
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

UserSchema.methods.setToken = function(callback){
  var scope = this;
  crypto.randomBytes(256, function(err, buffer){
    if(err) return callback(err);
    scope.token = buffer;
    scope.save(function(err){
      if (err) return callback(err);
      callback();
    });
  });
};

UserSchema.methods.authenticate = function(passwordTry, callback){
  bcrypt.compare(passwordTry, this.password, function(err, isMatch){
    if(err) return callback(err);
    callback(null, isMatch);
  });
};


module.exports = mongoose.model('User', UserSchema);
//
