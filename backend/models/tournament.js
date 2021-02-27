const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var tournamentSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  tournamentMasters: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  maxParticipants: Number,
  participants: [{ type: Schema.Types.ObjectId, ref: 'participantTypes' }],
  participantTypes: { type: String, enum: ['Team', 'User'] },
  startDate: { type: Date, required: true },
  endDate: Date,
  format: { type: String, required: true },
  privacy: { type: String, required: true },
  rankRestrictionLB: { type: Schema.Types.ObjectId, ref: 'Rank' },
  rankRestrictionUB: { type: Schema.Types.ObjectId, ref: 'Rank' },
  outgoingInvites: [{ type: Schema.Types.ObjectId, ref: 'Invite' }],
  incomingApplications: [{ type: Schema.Types.ObjectId, ref: 'Invite' }],
  matches: [{ type: Schema.Types.ObjectId, ref: 'Match' }],
  status: { type: String, required: true },
});

const Tournament = mongoose.model('Tournament', tournamentSchema);
module.exports = Tournament;
