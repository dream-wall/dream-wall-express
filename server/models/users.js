var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  id: Number,
  username: { type: String, trim: true },
  password: { type: String, trim: true },
  created_on: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('users', UserSchema);
