const mongoose = require('mongoose');
module.exports = mongoose.model('User', new mongoose.Schema({
  email: String,
  password: String,
  isAdmin: { type: Boolean, default: false }
}));
