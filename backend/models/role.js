const mongoose = require('mongoose');

//player, coach, tournament master, 
var Role = new mongoose.Schema({
  name: { type: String, required: true },
  admin: { type: Boolean, required: true },
})

module.exports = mongoose.model('Role', Role);
