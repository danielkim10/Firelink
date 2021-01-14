const mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var User = new mongoose.Schema({
  /*id: String,
  userID: String,*/
  username: String,
  email: String,
  role: String,
  description: String,
  summonerName: String,
  displayName: String,
  teamID: String,
  previousTeamIDs: [String],
  recentTournaments: [String],
  recentMatches: [String],
  active: Boolean,
  freeAgent: Boolean,
  hash: String,
  salt: String,
});

User.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

User.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
}

User.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    email: this.email,
    exp: parseInt(expiry.getTime() / 1000)
  }, "secret");
}

module.exports = mongoose.model('User', User);
