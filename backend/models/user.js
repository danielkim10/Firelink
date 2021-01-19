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
  summonerName: String,
  displayName: String,
  teamID: { type: Schema.Types.ObjectId, ref: 'Team' },
  previousTeamIDs: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  recentTournaments: [{ type: Schema.Types.ObjectId, ref: 'Tournament' }],
  recentMatches: [{ type: Schema.Types.ObjectId, ref: 'Match' }],
  incomingNotifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }],
  incomingInvites: [{ type: Schema.Types.ObjectId, ref: 'Invite' }],
  active: Boolean,
  freeAgent: Boolean,
  hash: String,
  salt: String,
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