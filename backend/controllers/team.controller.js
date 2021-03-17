const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var Team = require('../models/team');

//#region Get

// get all teams
router.get('/', (req, res) => {
  Team.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log('Error in retrieving teams: ' + JSON.stringify(err, undefined, 2));
  });
});

// get team with _id
router.get('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No team with given id: ${req.params.id}`);
  
  Team.findById(req.params.id, (err, doc) => {
    if (!err) res.send(doc);
    else console.log('Error in retrieving team1: ' + JSON.stringify(err, undefined, 2));
  }).populate('owner').populate('managers').populate({ path: 'playerRoster', populate: { path: 'role' }}).populate('coachRoster')
    .populate('averageRank')
    .populate('previousMembers').populate('previousMatches').populate('previousTournaments')
    .populate('incomingInvites').populate('outgoingInvites').populate('incomingApplications').exec((err, team) => {
      if (err) console.log('Error in retrieving team2: ' + JSON.stringify(err, undefined, 2));
    });
});

//#endregion

//#region Post

// create new team
router.post('/', (req, res) => {
  req.setTimeout(5*1000);
  //let playerRoster = [];
  //let coachRoster = [];
  if (req.body.user.role.name === 'Player') {
   req.body.team.playerRoster.push(req.body.user._id);
  }
  else if (req.body.user.role.name === 'Coach') {
   req.body.team.coachRoster.push(req.body.user._id);
  }

  req.body.team.owner = req.body.user._id;

  var team = new Team({
    name: req.body.team.name,
    tag: req.body.team.tag,
    logo: req.body.team.logo,
    description: req.body.team.description,
    twitchUrl: req.body.team.twitchUrl,
    twitterUrl: req.body.team.twitterUrl,
    youtubeUrl: req.body.team.youtubeUrl,
    discordUrl: req.body.team.discordUrl,
    active: true,
    activelyRecruiting: req.body.team.activelyRecruiting,
    dateCreated: new Date(),
    dateDisbanded: null,

    owner: req.body.team.owner,
    managers: req.body.team.managers,
    playerRoster: req.body.team.playerRoster,
    coachRoster: req.body.team.coachRoster,
    averageRank: null,
    
    previousMembers: req.body.team.previousMembers,
    previousMatches: req.body.team.previousMatches,
    previousTournaments: req.body.team.previousTournaments,
    
    incomingInvites: [],
    outgoingInvites: [],
    incomingApplications: [],
  });

  team.save((err, doc) => {
    if (!err) res.send(doc);
    else console.log('Error in creating team: ' + JSON.stringify(err, undefined, 2));
  });
});

// find team with owner
router.post('/teamOwner', (req, res) => {
  Team.find({owner: req.body.owner}, (err, doc) => {
    if (!err) res.send(doc);
    else console.log('Error in retrieving team: ' + JSON.stringify(err, undefined, 2));
  });
});

router.post('/getTeamsWithIds', (req, res) => {
  Team.find({_id: req.body}, (err, doc) => {
    if (!err) res.send(doc);
    else console.log('Error in retrieving team: ' + JSON.stringify(err, undefined, 2));
  });
});

router.post('/activelyRecruitingTeams', (req, res) => {
  Team.find({activelyRecruiting: true}, (err, doc) => {
    if (!err) res.send(doc);
    else console.log('Error in retrieving teams: ' + JSON.stringify(err, undefined, 2));
  }).populate('owner');
});

//#endregion

//#region Put

// update team with _id
router.put('/find/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No team with given id: ${req.params.id}`);
  
  var team = {
    name: req.body.name,
    tag: req.body.tag,
    logo: req.body.logo,
    description: req.body.description,
    twitchUrl: req.body.twitchUrl,
    twitterUrl: req.body.twitterUrl,
    youtubeUrl: req.body.youtubeUrl,
    discordUrl: req.body.discordUrl,
    activelyRecruiting: req.body.activelyRecruiting,
  };
  Team.findByIdAndUpdate(req.params.id, { $set: team }, { new: true }, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error updating team: ' + JSON.stringify(err, undefined, 2)); }
  });
});

// promote a member as the new owner
router.put('/promoteToOwner', (req, res) => {
  if (!ObjectId.isvalid(req.params.id)) {
    return res.status(400).send(`No user with given id: ${req.params.id}`);
  }

  var team = {
    owner: req.body._id,
  }
});

//promote/demote a member
router.put('/promote/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`No user with given id: ${req.params.id}`);
  }

  if (req.body.status === 'Manager') {
    req.body.team.managers.push(req.body.user._id);
    console.log(req.body.team.managers);
  }
  else if (req.body.status === 'Member') {

  }

  var team = {
    owner: req.body.team.owner._id,
    managers: req.body.team.managers,
  }

  Team.findByIdAndUpdate(req.params.id, {$set: team}, {new: true}, (err, doc) => {
    if (!err) res.send(doc);
    else { console.log('Error updating team: ' + JSON.stringify(err, undefined, 2))}
  });
})

// leave team with _id
router.put('/leave/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`No team with given id: ${req.params.id}`);
  }

  if (req.body.team.managers.some(e => e._id === req.body.user._id)) {
    req.body.team.managers.splice(req.body.team.managers.indexOf(req.body.team.managers.find(e => e._id === req.body.user._id), 1));
  }

  if (req.body.team.playerRoster.some(e => e._id === req.body.user._id)) {
    req.body.team.playerRoster.splice(req.body.team.playerRoster.indexOf(req.body.team.playerRoster.find(e => e._id === req.body.user._id), 1));
  }
  else if (req.body.team.coachRoster.some(e => e._id === req.body.user._id)) {
    req.body.team.coachRoster.splice(req.body.team.coachRoster.indexOf(req.body.team.coachRoster.find(e => e._id === req.body.user._id), 1));
  }

  //previousMembers
  req.body.team.previousMembers.push({user: req.body.user._id, joinDate: req.body.user.teamJoinDate, leftDate: new Date()});

  var team = {
    managers: req.body.team.managers,
    playerRoster: req.body.team.playerRoster,
    coachRoster: req.body.team.coachRoster,
    previousMembers: req.body.team.previousMembers,
  };

  Team.findByIdAndUpdate(req.params.id, {$set: team}, {new: true}, (err, doc) => {
    if (!err) res.send(doc);
    else { console.log('Error updating team: ' + JSON.stringify(err, undefined, 2))}
  });
});

// disband team with _id
router.put('/disband/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`No team with given id: ${req.params.id}`);
  }

  var team = {
    owner: null,
    managers: [],
    playerRoster: [],
    coachRoster: [],
    active: false,
    activelyRecruiting: false,
    dateDisbanded: new Date(),
  };
  Team.findByIdAndUpdate(req.params.id, {$set: team}, {new: true}, (err, doc) => {
    if (!err) res.send(doc);
    else { console.log('Error updating team: ' + JSON.stringify(err, undefined, 2))}
  });
});

router.put('/addMember/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`No team with given id: ${req.params.id}`);
  }

  if (req.body.teamMember.user.role.name === 'Player') {
    req.body.team.playerRoster.push(req.body.user._id);
  }
  else if (req.body.teamMember.user.role.name === 'Coach') {
    req.body.team.coachRoster.push(req.body.user._id);
  }

  var team = {
    playerRoster: req.body.team.playerRoster,
    coachRoster: req.body.team.coachRoster,
  }

  Team.findByIdAndUpdate(req.params.id, {$set: team}, {new: true}, (err, doc) => {
    if (!err) res.send(doc);
    else { console.log('Error updating team: ' + JSON.stringify(err, undefined, 2))}
  });
});

router.put('/createInviteForTeam/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`No invite with given id: ${req.params.id}`);
  }
  
  req.body.team.outgoingInvites.push(req.body.invite._id);

  var team = {
    outgoingInvites: req.body.team.outgoingInvites,
  }

  Team.findByIdAndUpdate(req.params.id, {$set: team}, {new: true}, (err, doc) => {
    if (!err) res.send(doc);
    else { console.log('Error updating team: ' + JSON.stringify(err, undefined, 2))}
  });
});

router.put('/deleteOutgoingInvite/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`No invite with given id: ${req.params.id}`);
  }

  req.body.team.outgoingInvites.splice(req.body.team.outgoingInvites.indexOf(req.body.team.outgoingInvites.find(e => e._id === req.body.invite._id)), 1);

  var team = {
    outgoingInvites: req.body.team.outgoingInvites,
  }

  Team.findByIdAndUpdate(req.params.id, {$set: team}, {new: true}, (err, doc) => {
    if (!err) res.send(doc);
    else { console.log('Error updating team: ' + JSON.stringify(err, undefined, 2))}
  });
});

//#endregion

//#region Delete

// delete team with _id
router.delete('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No team with given id: ${req.params.id}`);
  
  Team.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error updating team: ' + JSON.stringify(err, undefined, 2)); }
  });
});

router.delete('/', (req, res) => {
  Team.deleteMany({}, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error deleting teams: ' + JSON.stringify(err, undefined, 2)); }
  });
});

//#endregion

router.post('/teams', (req, res) => {
  Team.find({_id: req.body._id}, (err, doc) => {
    if (!err) res.send(doc);
    else console.log('Error in retrieving teams: ' + JSON.stringify(err, undefined, 2));
  });
})

module.exports = router;