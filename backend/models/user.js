const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new Schema({
  username: { type: String, unique: true, required: true},
  email: { type: String, unique: true, required: true },
  role: { type: Schema.Types.ObjectId, ref: 'Role' },
  description: String,
  twitchUrl: String,
  twitterUrl: String,
  youtubeUrl: String,
  discordTag: String,
  active: { type: Boolean, required: true },
  freeAgent: { type: Boolean, required: true },

  summonerName: String,
  summonerId: String, //summonerId
  puuid: String, //puuid
  summonerLevel: Number,
  profileIconId: Number,
  lastUpdated: Date, 

  soloTier: String, //tier
  soloRank: { type: Schema.Types.ObjectId, ref: 'Rank' }, //rank
  soloLP: Number, //leaguePoints
  soloWins: Number, //wins
  soloLosses: Number, //losses

  flexTier: String, //tier
  flexRank: { type: Schema.Types.ObjectId, ref: 'Rank' }, //rank
  flexLP: Number, //leaguePoints
  flexWins: Number, //wins
  flexLosses: Number, //losses

  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  teamJoinDate: Date,
  previousTeams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  tournaments: [{ type: Schema.Types.ObjectId, ref: 'Tournament' }],
  previousTournaments: [{ type: Schema.Types.ObjectId, ref: 'Tournament' }],
  previousMatches: [{ type: Schema.Types.ObjectId, ref: 'Match' }],
  unreadNotifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }],
  readNotifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }],
  incomingInvites: [{ type: Schema.Types.ObjectId, ref: 'Invite' }],
  outgoingApplications: [{ type: Schema.Types.ObjectId, ref: 'Invite' }],
  
  hash: String,
  salt: String,
  emailVerified: Boolean,
});

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
}

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    email: this.email,
    exp: parseInt(expiry.getTime() / 1000)
  }, "secret");
}

const User = mongoose.model('User', userSchema);
module.exports = User;