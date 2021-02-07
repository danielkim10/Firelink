const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//player, coach, tournament master, 
var roleSchema = new Schema({
  name: { type: String, required: true },
  admin: { type: Boolean, required: true },
});

const Role = mongoose.model('Role', roleSchema);
module.exports = Role;
