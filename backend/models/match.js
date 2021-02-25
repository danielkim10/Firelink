const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var matchSchema = new Schema({
  games: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
  tournament: { type: Schema.Types.ObjectId, ref: 'Tournament' },
  teamA: { type: Schema.Types.ObjectId, ref: 'Team' },
  teamB: { type: Schema.Types.ObjectId, ref: 'Team' },
  date: Date,
  teamAScore: Number,
  teamBScore: Number,
  maximumMatches: Number,
  status: { type: Number, required: true },
});

const Match = mongoose.model('Match', matchSchema);
module.exports = Match;
