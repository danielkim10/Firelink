const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var positionSchema = new Schema({
    name: String,
    image: String,
});

const Position = mongoose.model('Position', positionSchema);
module.exports = Position;