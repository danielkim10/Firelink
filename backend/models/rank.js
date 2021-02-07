const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var rankSchema = new Schema({
    name: String,
    value: Number,
    image: String,
});

const Rank = mongoose.model('Rank', rankSchema);
module.exports = Rank;