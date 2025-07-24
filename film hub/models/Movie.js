const mongoose = require('mongoose');
module.exports = mongoose.model('Movie', new mongoose.Schema({
  title: String,
  description: String,
  videoPath: String,
  thumbPath: String
}));
