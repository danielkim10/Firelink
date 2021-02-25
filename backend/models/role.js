const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var roleSchema = new Schema({
  name: { type: String, required: true },
  alt: { type: String, required: true },
  admin: { type: Boolean, required: true },
  image: String,
});

const Role = mongoose.model('Role', roleSchema);
module.exports = Role;
