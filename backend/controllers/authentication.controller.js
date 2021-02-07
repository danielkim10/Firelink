const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
}

module.exports.register = function(req, res) {
    var user = new User();

    user.username = req.body.username;
    user.email = req.body.email;
    user.role = null;
    user.description = '';
    user.twitchUrl = '';
    user.twitterUrl = '';
    user.youtubeUrl = '';
    user.discordTag = '';
    user.active = true;
    user.freeAgent = false;

    user.summonerName = '';
    user.summonerId = '';
    user.puuid = '';
    user.summonerLevel = -1;
    user.profileIconId = -1;
    user.lastUpdated = null;

    user.soloTier = '';
    user.soloRank = null;
    user.soloLP = -1;
    user.soloWins = -1;
    user.soloLosses = -1;

    user.flexTier = '';
    user.flexRank = null;
    user.flexLP = -1;
    user.flexWins = -1;
    user.flexLosses = -1;

    user.team = null;
    user.previousTeams = [];
    user.tournaments = [];
    user.previousTournaments = [];
    user.previousMatches = [];
    user.unreadNotifications = [];
    user.readNotifications = [];
    user.incomingInvites = [];
    user.outgoingApplications = [];
    
    user.emailVerified = false;

    user.setPassword(req.body.password);
    user.save((err) => {
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
            "token": token
        });
    });
};

module.exports.login = function(req, res) {
    passport.authenticate('local', (err, user, info) => {
        var token;

        if (err) {
            res.status(400).json(err);
            return;
        }
        if (!user.active) {
            res.status(400).json(err);
            return;
        }

        if (user) {
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        }
        else {
            res.status(401).json(info);
        }
    }) (req, res);
};