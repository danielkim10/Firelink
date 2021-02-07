const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var Team = require('./team');
var Role = require('./role');
var Tournament = require('./tournament');
var Match = require('./match');
var Notification = require('./notification');
var Invite = require('./invite');

var userSchema = new Schema({
  username: String,
  email: String,
  role: { type: Schema.Types.ObjectId, ref: 'Role' },
  description: String,
  twitchUrl: String,
  twitterUrl: String,
  youtubeUrl: String,
  discordTag: String,
  active: Boolean,
  freeAgent: Boolean,

  summonerName: String,
  summonerId: String,
  puuid: String,
  summonerLevel: Number,
  profileIconId: Number,
  lastUpdated: Date,

  soloTier: String,
  soloRank: { type: Schema.Types.ObjectId, ref: 'Rank' },
  soloLP: Number,
  soloWins: Number,
  soloLosses: Number,

  flexTier: String,
  flexRank: { type: Schema.Types.ObjectId, ref: 'Rank' },
  flexLP: Number,
  flexWins: Number,
  flexLosses: Number,

  team: { type: Schema.Types.ObjectId, ref: 'Team' },
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