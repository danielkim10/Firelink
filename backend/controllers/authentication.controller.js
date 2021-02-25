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
        if (err) {
            if (err.keyPattern.username) {
                res.status(401).send('Username already in use');
            }
            else if (err.keyPattern.email) {
                res.status(401).send('Email already in use');
            }
            else {
                res.status(400).send('Bad request');
            }
        }
        else {
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
            "token": token
        });
    }
    });
};

module.exports.login = function(req, res) {
    passport.authenticate('local', (err, user, info) => {
        var token;

        if (err) {
            res.status(400).send('Bad request');
            return;
        }
        else if (user && !user.active) {
            res.status(400).send('The specified user is no longer active');
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
            res.status(401).send('Invalid credentials');
        }
    }) (req, res);
};