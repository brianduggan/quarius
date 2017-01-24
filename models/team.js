var mongoose = require('mongoose');

var TeamSchema = mongoose.Schema({
  name: {type: String, required: true},
  management: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, {timestamps: true});

module.exports = mongoose.model('Team', TeamSchema);
