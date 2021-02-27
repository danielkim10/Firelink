const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var Match = require('../models/match');

//#region Get

router.get('/', (req, res) => {
  Team.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log('Error in retrieving matches: ' + JSON.stringify(err, undefined, 2));
  });
});

router.get('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No match with given id: ${req.params.id}`);
  
  Match.findById(req.params.id, (err, doc) => {
    if (!err) res.send(docs);
    else console.log('Error in retrieving match: ' + JSON.stringify(err, undefined, 2));
  });
});

//#endregion

//#region Post

router.post('/', (req, res) => {
  var match = new Match({
    number: req.body.number,
    games: req.body.games,
    tournament: req.body.tournament,
    teamA: req.body.teamA,
    teamB: req.body.teamB,
    date: req.body.date,
    teamAScore: req.body.teamAScore,
    teamBScore: req.body.teamBScore,
    maximumMatches: req.body.maximumMatches,
    status: req.body.status,
    matchParent: req.body.matchParent,
    matchChildren: req.body.matchChildren,
  });
  match.save((err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error creating match: ' + JSON.stringify(err, undefined, 2)); }
  });
});

//#endregion

//#region Put

router.put('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No match with given id: ${req.params.id}`);
  
  var match = {
    number: req.body.number,
    games: req.body.games,
    tournament: req.body.tournament,
    teamA: req.body.teamA,
    teamB: req.body.teamB,
    date: req.body.date,
    teamAScore: req.body.teamAScore,
    teamBScore: req.body.teamBScore,
    maximumMatches: req.body.maximumMatches,
    status: req.body.status,
    matchParent: req.body.matchParent,
    matchChildren: req.body.matchChildren,
  };
  Match.findByIdAndUpdate(req.params.id, { $set: match }, { new: true }, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error updating match: ' + JSON.stringify(err, undefined, 2)); }
  });
});

router.put('/addGame/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No match with given id: ${req.params.id}`);
  
  req.body.match.games.push(req.body.game._id);
  var match = {
    games: req.body.match.games,
  }

  Match.findByIdAndUpdate(req.params.id, { $set: match }, { new: true }, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error updating match: ' + JSON.stringify(err, undefined, 2)); }
  });
});

router.put('/incrementTeamScore/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No match with given id: ${req.params.id}`);

  if (req.body.victor === 100) {
    req.body.match.teamAScore++;
  }
  else {
    req.body.match.teamBScore++;
  }
  var match = {
    teamAScore: req.body.match.teamAScore,
    teamBScore: req.body.match.teamBScore,
  };

  Match.findByIdAndUpdate(req.params.id, { $set: match }, { new: true }, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error updating match: ' + JSON.stringify(err, undefined, 2)); }
  });
});

router.put('/assignBracketParent/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No match with given id: ${req.params.id}`);
  
  req.body.match.matchParent = req.body.parent;
  var match = {
    matchParent: req.body.match.matchParent
  };

  Match.findByIdAndUpdate(req.params.id, { $set: match }, { new: true }, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error updating match: ' + JSON.stringify(err, undefined, 2)); }
  });
});

router.put('/assignBracketChildren/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No match with given id: ${req.params.id}`);
  
  req.body.match.matchChildren.push(req.body.child1);
  req.body.match.matchChildren.push(req.body.child2);

  var match = {
    matchChildren: req.body.match.matchChildren
  };

  Match.findByIdAndUpdate(req.params.id, { $set: match }, { new: true }, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error updating match: ' + JSON.stringify(err, undefined, 2)); }
  });
});

router.put('/changeStatus/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No match with given id: ${req.params.id}`);

  var match = {
    status: req.body.status
  };

  Match.findByIdAndUpdate(req.params.id, { $set: match }, { new: true }, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error updating match: ' + JSON.stringify(err, undefined, 2)); }
  });
});

//#endregion

//#region Delete

router.delete('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No match with given id: ${req.params.id}`);
  
  Match.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error updating match: ' + JSON.stringify(err, undefined, 2)); }
  });
});

router.delete('/', (req, res) => {
  Match.deleteMany({}, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error deleting matches : ' + JSON.stringify(err, undefined, 2)); }
  });
});

//#endregion

module.exports = router;