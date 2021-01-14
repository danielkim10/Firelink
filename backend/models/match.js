const mongoose = require('mongoose');

var Match = mongoose.model('Match', {
  gameIDs: [String],
  tournamentID: { type: String, required: true },
  teamA: String,
  teamB: String,
  date: Date,
  teamAScore: Number,
  teamBScore: Number,
  maximumMatches: Number,
  status: { type: Number, required: true },
});

module.exports = { Match };
