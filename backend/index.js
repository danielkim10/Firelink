const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');

const { mongoose } = require('./db.js');

require('./authentication/passport');

var gameController = require('./controllers/game.controller');
var matchController = require('./controllers/match.controller');
var roleController = require('./controllers/role.controller');
var teamController = require('./controllers/team.controller');
var tournamentController = require('./controllers/tournament.controller');
var userController = require('./controllers/user.controller');
var inviteController = require('./controllers/invite.controller');
var notificationController = require('./controllers/notification.controller');
var rankController = require('./controllers/rank.controller');
var routesApi = require('./authentication/index');

var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());


app.listen(3000, () => console.log('Server started at port : 3000'));
app.use('/games', gameController);
app.use('/matches', matchController);
app.use('/roles', roleController);
app.use('/teams', teamController);
app.use('/tournaments', tournamentController);
app.use('/users', userController);
app.use('/invites', inviteController);
app.use('/notifications', notificationController);
app.use('/ranks', rankController);
app.use('/auth', routesApi);

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({ "message": err.name + ": " + err.message });
    }
});
