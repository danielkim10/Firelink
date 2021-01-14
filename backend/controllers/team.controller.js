const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Team } = require('../models/team');

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
    else console.log('Error in retrieving team: ' + JSON.stringify(err, undefined, 2));
  });
});

//#endregion

//#region Post

// create new team
router.post('/', (req, res) => {
  let playerRoster = [];
  let coachRoster = [];
  /*if (req.body.user.role === req.body.roles[0]._id) {
    playerRoster.push(req.body.user._id);
  }
  else if (req.body.user.role === req.body.roles[1]._id) {
    coachRoster.push(req.body.user._id);
  }*/

  var team = new Team({
    name: req.body.team.name,
    tag: req.body.team.tag,
    logo: req.body.team.logo,
    owner: req.body.team.owner,
    playerRoster: req.body.playerRoster,
    coachRoster: req.body.coachRoster,
    active: true,
    matchHistory: req.body.team.matchHistory,
    tournamentHistory: req.body.team.tournamentHistory,
    activelyRecruiting: req.body.team.activelyRecruiting,
    dateCreated: new Date(),
  });
  team.save((err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error creating team: ' + JSON.stringify(err, undefined, 2)); }
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
  })
})

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
    owner: req.body.owner,
    playerRoster: req.body.playerRoster,
    coachRoster: req.body.coachRoster,
    active: req.body.active,
    matchHistory: req.body.matchHistory,
    tournamentHistory: req.body.tournamentHistory,
    activelyRecruiting: req.body.activelyRecruiting
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
  if (!ObjectId.isvalid(req.params.id)) {
    return res.status(400).send(`No user with given id: ${req.params.id}`);
  }

  var team = {
    owner: req.body.id,
    managers: req.body.managers,
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

  if (req.body.team.managers.includes(req.body.user._id)) {
    req.body.team.managers.splice(req.body.team.managers.indexOf(req.body.user._id));
  }

  if (req.body.team.playerRoster.includes(req.body.user._id)) {
    req.body.team.playerRoster.splice(req.body.team.playerRoster.indexOf(req.body.user._id));
  }
  else if (req.body.team.coachRoster.includes(req.body.user._id)) {
    req.body.team.coachRoster.splice(req.body.team.coachRoster.indexOf(req.body.user._id));
  }

  var team = {
    managers: req.body.team.managers,
    playerRoster: req.body.team.playerRoster,
    coachRoster: req.body.team.coachRoster,
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
    owner: '',
    playerRoster: [],
    coachRoster: [],
    active: false,
    activeRecruiting: false,
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

  let playerRoster = req.body.team.playerRoster;
  let coachRoster = req.body.team.coachRoster;

  if (req.body.user.role === '5ffa8ebbc3ba6336cc5591ee') {
    playerRoster.push(req.body.user._id);
  }
  else if (req.body.user.role === '5ffa8ec2c3ba6336cc5591ef') {
    coachRoster.push(req.body.user._id);
  }

  var team = {
    playerRoster: playerRoster,
    coachRoster: coachRoster,
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

//#endregion

router.post('/teams', (req, res) => {
  Team.find({_id: req.body._id}, (err, doc) => {
    if (!err) res.send(doc);
    else console.log('Error in retrieving teams: ' + JSON.stringify(err, undefined, 2));
  });
})

module.exports = router;