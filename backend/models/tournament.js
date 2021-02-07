const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var tournamentSchema = new Schema({
  name: String,
  description: String,
  tournamentMasters: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  maxParticipants: Number,
  participants: [{ type: Schema.Types.ObjectId, ref: 'participantTypes' }],
  participantTypes: { type: String, enum: ['Team', 'User'] },
  startDate: Date,
  endDate: Date,
  format: String,
  privacy: String,
  rankRestrictionLB: { type: Schema.Types.ObjectId, ref: 'Rank' },
  rankRestrictionUB: { type: Schema.Types.ObjectId, ref: 'Rank' },
  status: String,
});

const Tournament = mongoose.model('Tournament', tournamentSchema);
module.exports = Tournament;
