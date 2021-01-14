const mongoose = require('mongoose');

var Game = mongoose.model('Game', {
    teamARoster: [String],
    teamBRoster: [String],
    riotGameID: Number,
    status: { type: Number, required: true },
});

module.exports = { Game };