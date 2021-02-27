const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var teamSchema = new Schema({
  name: { type: String, required: true },
  tag: { type: String, required: true },
  logo: { type: String, required: true },
  description: String,
  twitchUrl: String,
  twitterUrl: String,
  youtubeUrl: String,
  discordUrl: String,
  active: { type: Boolean, required: true },
  activelyRecruiting: { type: Boolean, required: true },
  dateCreated: { type: Date, required: true },
  dateDisbanded: Date,

  owner: { type: Schema.Types.ObjectId, ref: 'TeamMember' },
  managers: [{ type: Schema.Types.ObjectId, ref: 'TeamMember' }],
  playerRoster: [{ type: Schema.Types.ObjectId, ref: 'TeamMember' }],
  coachRoster: [{ type: Schema.Types.ObjectId, ref: 'TeamMember' }],
  averageRank: { type: Schema.Types.ObjectId, ref: 'Rank' },

  previousMembers: [{ type: Schema.Types.ObjectId, ref: 'TeamMember'}],
  previousMatches: [{ type: Schema.Types.ObjectId, ref: 'Match' }],
  previousTournaments: [{ type: Schema.Types.ObjectId, ref: 'Tournament' }],
  
  incomingInvites: [{ type: Schema.Types.ObjectId, ref: 'Invite' }],
  outgoingInvites: [{ type: Schema.Types.ObjectId, ref: 'Invite'}],
  incomingApplications: [{ type: Schema.Types.ObjectId, ref: 'Invite' }],
});

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;
