const mongoose = require('mongoose');

var Team = mongoose.model('Team', {
  name: { type: String, required: true },
  tag: { type: String, required: true },
  logo: String,
  owner: String,
  managers: [String],
  playerRoster: [String],
  coachRoster: [String],
  active: { type: Boolean, required: true },
  matchHistory: [String],
  tournamentHistory: [String],
  activelyRecruiting: Boolean,
  dateCreated: Date,
});

module.exports = { Team };
