const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var User = require('./user');
var Tournament = require('./tournament');
var Match = require('./match');
var Notification = require('./notification');
var Invite = require('./invite');
//xd
var teamSchema = new Schema({
  name: String,
  tag: String,
  logo: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  managers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  playerRoster: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  coachRoster: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  active: Boolean,
  matchHistory: [{ type: Schema.Types.ObjectId, ref: 'Match' }],
  tournamentHistory: [{ type: Schema.Types.ObjectId, ref: 'Tournament' }],
  activelyRecruiting: Boolean,
  dateCreated: Date,
  incomingNotifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }],
  incomingInvites: [{ type: Schema.Types.ObjectId, ref: 'Invite' }],
  outgoingInvites: [{ type: Schema.Types.ObjectId, ref: 'Invite '}],
  incomingApplications: [{ type: Schema.Types.ObjectId, ref: 'Invite' }],
});

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;
