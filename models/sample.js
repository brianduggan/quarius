var mongoose = require('mongoose');

var SampleSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  primaryColor: {type: String, required: true},
  secondaryColor: {type: String, required: true},
  vert: {type: String, required: true}
}, {timestamps: true});

module.exports = mongoose.model('Sample', SampleSchema);
