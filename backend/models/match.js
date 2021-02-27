const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var matchSchema = new Schema({
  number: { type: Number, required: true },
  games: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
  tournament: { type: Schema.Types.ObjectId, ref: 'Tournament' },
  teamA: { type: Schema.Types.ObjectId, ref: 'Team' },
  teamB: { type: Schema.Types.ObjectId, ref: 'Team' },
  date: Date,
  teamAScore: { type: Number, required: true },
  teamBScore: { type: Number, required: true } ,
  maximumMatches: { type: Number, required: true },
  status: { type: String, required: true },
  matchParent: { type: Schema.Types.ObjectId, ref: 'Match' },
  matchChildren: [{ type: Schema.Types.ObjectId, ref: 'Match' }],
});

const Match = mongoose.model('Match', matchSchema);
module.exports = Match;
