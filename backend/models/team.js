const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var teamSchema = new Schema({
  name: String,
  tag: String,
  logo: String,
  description: String,
  twitchUrl: String,
  twitterUrl: String,
  youtubeUrl: String,
  discordUrl: String,
  active: Boolean,
  activelyRecruiting: Boolean,
  dateCreated: Date,
  dateDisbanded: Date,

  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  managers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  playerRoster: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  coachRoster: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  averageRank: { type: Schema.Types.ObjectId, ref: 'Rank' },

  previousMembers: [
    { user: { type: Schema.Types.ObjectId, ref: 'User' },
      joinDate: Date,
      leftDate: Date,
    }
  ],
  previousMatches: [{ type: Schema.Types.ObjectId, ref: 'Match' }],
  previousTournaments: [{ type: Schema.Types.ObjectId, ref: 'Tournament' }],
  
  incomingInvites: [{ type: Schema.Types.ObjectId, ref: 'Invite' }],
  outgoingInvites: [{ type: Schema.Types.ObjectId, ref: 'Invite'}],
  incomingApplications: [{ type: Schema.Types.ObjectId, ref: 'Invite' }],
});

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;
