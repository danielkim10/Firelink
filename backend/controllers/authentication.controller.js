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
    user.role = '';
    user.description = '';
    user.summonerName = '';
    user.displayName = '';
    user.teamID = '';
    user.previousTeamIDs = [];
    user.recentTournaments = [];
    user.recentMatches = [];
    user.active = true;
    user.freeAgent = false;

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