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
    else console.log('Error in retrieving team: ' + JSON.stringify(err, undefined, 2));
  }).populate('owner').populate('managers').populate({ path: 'playerRoster', populate: { path: 'role' }}).populate('coachRoster')
    .populate('matchHistory').populate('tournamentHistory').exec((err, team) => {
      if (err) return handleError(err);



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
    owner: req.body.team.owner,
    managers: req.body.team.managers,
    playerRoster: req.body.team.playerRoster,
    coachRoster: req.body.team.coachRoster,
    active: true,
    matchHistory: req.body.team.matchHistory,
    tournamentHistory: req.body.team.tournamentHistory,
    activelyRecruiting: req.body.team.activelyRecruiting,
    dateCreated: new Date(),
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
    managers: [],
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

  if (req.body.user.role.name === 'Player') {
    req.body.team.playerRoster.push(req.body.user._id);
  }
  else if (req.body.user.role.name === 'Coach') {
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

//#endregion

router.post('/teams', (req, res) => {
  Team.find({_id: req.body._id}, (err, doc) => {
    if (!err) res.send(doc);
    else console.log('Error in retrieving teams: ' + JSON.stringify(err, undefined, 2));
  });
})

module.exports = router;