var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    crypto = require('crypto');

var UserSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  token: {type: String},
  birthdate: {type: String, required: true},
  email: {type: String, required: true},
  type: {type: Number, required: true},
  active: {type: Boolean},
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }]
}, {timestamps: true});

UserSchema.pre('save', function(next){
  if( this.isModified('password') ){
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

UserSchema.methods.setToken = function(passwordTry, callback){
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
