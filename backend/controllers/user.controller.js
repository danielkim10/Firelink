const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var User = require('../models/user');

//#region Get

// get all users
router.get('/', (req, res) => {
  User.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log('Error in retrieving users: ' + JSON.stringify(err, undefined, 2));
  });
});

// get user with _id
router.get('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No user with given id: ${req.params.id}`);
  
  User.findById(req.params.id, {hash: 0, salt: 0}, (err, doc) => {
    if (!err) res.send(doc);
    else console.log('Error in retrieving user: ' + JSON.stringify(err, undefined, 2));
  }).populate('role').populate('team').populate('previousTeams').populate('tournaments')
    .populate('previousTournaments').populate('previousMatches')
    .populate('unreadNotifications').populate('readNotifications')
    .populate('incomingInvites').populate('outgoingApplications').exec((err, user) => {
    if (err) return handleError(err);
  });
});

//#endregion

//#region Post

router.post('/freeAgents', (req, res) => {
  User.find({teamID: null, freeAgent: true}, (err, doc) => {
    if (!err) res.send(doc);
    else console.log('Error in retrieving users: ' + JSON.stringify(err, undefined, 2));
  }).populate('role');
});

router.post('/tournamentMasters', (req, res) => {
  User.find({role: req.body}, (err, doc) => {
    if (!err) res.send(doc);
    else console.log('Error in retrieving users: ' + JSON.stringify(err, undefined, 2));
  }).populate('role');
});

router.post('/getUsersWithIds', (req, res) => {
  User.find({_id: req.body}, (err, doc) => {
    if (!err) res.send(doc);
    else console.log('Error in retrieving users: ' + JSON.stringify(err, undefined, 2));
  });
});

//#endregion

//#region Put

// edit user with _id
router.put('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No user with given id: ${req.params.id}`);
  
  var user = {
    role: req.body.role,
    description: req.body.description,
    freeAgent: req.body.freeAgent,
    twitchUrl: req.body.twitchUrl,
    twitterUrl: req.body.twitterUrl,
    youtubeUrl: req.body.youtubeUrl,
    discordTag: req.body.discordTag,

    summonerName: req.body.summonerName,
    summonerId: req.body.summonerId,
    puuid: req.body.puuid,
    summonerLevel: req.body.summonerLevel,
    profileIconId: req.body.profileIconId,
    lastUpdated: req.body.lastUpdated,

    soloTier: req.body.soloTier,
    soloRank: req.body.soloRank,
    soloLP: req.body.soloLP,
    soloWins: req.body.soloWins,
    soloLosses: req.body.soloLosses,

    flexTier: req.body.flexTier,
    flexRank: req.body.flexRank,
    flexLP: req.body.flexLP,
    flexWins: req.body.flexWins,
    flexLosses: req.body.flexLosses,
  };
  User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error updating user: ' + JSON.stringify(err, undefined, 2)); }
  });
});

router.put('/receiveInviteFromTeam/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No user with given id: ${req.params.id}`);
  
  req.body.user.incomingInvites.push(req.body.invite._id);

  var user = {
    incomingInvites: req.body.user.incomingInvites
  }

  User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error updating user: ' + JSON.stringify(err, undefined, 2)); }
  });
});

router.put('/deleteIncomingInvite/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No user with given id: ${req.params.id}`);
  
  req.body.user.incomingInvites.splice(req.body.user.incomingInvites.indexOf(req.body.user.incomingInvites.find(e => e._id === req.body.invite._id)), 1);

  var user = {
    incomingInvites: req.body.user.incomingInvites
  }

  User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error updating user: ' + JSON.stringify(err, undefined, 2)); }
  });
});

// add user to team
router.put('/addToTeam/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No user with given id: ${req.params.id}`);
  var user = {
    team: req.body.team._id,
    teamJoinDate: new Date(),
    freeAgent: false,
  };
  User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error updating user: ' + JSON.stringify(err, undefined, 2)); }
  });
});

// remove user from team
router.put('/removeFromTeam/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No user with given id: ${req.params.id}`);
  
  req.body.previousTeams.push(req.body.team._id);
  var user = {
    team: null,
    teamJoinDate: null,
    previousTeams: req.body.previousTeams,
  };
  User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error updating user: ' + JSON.stringify(err, undefined, 2)); }
  });
});

// deactivate user with _id
router.put('/deactivate/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No user with given id: ${req.params.id}`);
  
  var user = {
    active: false
  };
  User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error updating user: ' + JSON.stringify(err, undefined, 2)); }
  });
});

router.put('/newUnreadNotification/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No user with given id: ${req.params.id}`);
  
  req.body.user.unreadNotifications.push(req.body.notification._id);
  var user = {
    unreadNotifications: req.body.user.unreadNotifications
  };
  User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error updating user: ' + JSON.stringify(err, undefined, 2)); }
  });
});

router.put('/readNotification/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No user with given id: ${req.params.id}`);
  
  var user = {
  };
  User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error updating user: ' + JSON.stringify(err, undefined, 2)); }
  });
});

//#endregion

//#region Delete

// delete user with _id
router.delete('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No user with given id: ${req.params.id}`);
  
  User.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error updating user: ' + JSON.stringify(err, undefined, 2)); }
  });
});

router.delete('/', (req, res) => {
  User.deleteMany({}, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error deleting users : ' + JSON.stringify(err, undefined, 2)); }
  });
});

//#endregion

module.exports = router;
