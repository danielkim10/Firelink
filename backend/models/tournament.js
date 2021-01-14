const mongoose = require('mongoose');

var Tournament = mongoose.model('Tournament', {
  name: { type: String, unique: true, required: true },
  description: String,
  tournamentMasters: [{ type: String, required: true }],
  maxParticipants: Number,
  participants: [String],
  startDate: Date,
  endDate: Date,
  rankRestrictionLB: Number,
  rankRestrictionUB: Number,
  status: { type: Number, required: true },
})

module.exports = { Tournament };
