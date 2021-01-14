const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Match } = require('../models/match');

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

router.post('/', (req, res) => {
  var match = new Match({
    gameIDs: req.body.gameIDs,
    tournamentID: req.body.tournamentID,
    teamA: req.body.teamA,
    teamB: req.body.teamB,
    date: req.body.date,
    teamAScore: req.body.teamAScore,
    teamBScore: req.body.teamBScore,
    maximumMatches: req.body.maximumMatches,
    status: req.body.status
  });
  match.save((err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error creating match: ' + JSON.stringify(err, undefined, 2)); }
  });
});

router.put('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No match with given id: ${req.params.id}`);
  
  var match = {
    gameIDs: req.body.gameIDs,
    tournamentID: req.body.tournamentID,
    teamA: req.body.teamA,
    teamB: req.body.teamB,
    date: req.body.date,
    teamAScore: req.body.teamAScore,
    teamBScore: req.body.teamBScore,
    maximumMatches: req.body.maximumMatches,
    status: req.body.status
  };
  Match.findByIdAndUpdate(req.params.id, { $set: match }, { new: true }, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error updating match: ' + JSON.stringify(err, undefined, 2)); }
  });
});

router.delete('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No match with given id: ${req.params.id}`);
  
  Match.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error updating match: ' + JSON.stringify(err, undefined, 2)); }
  });
});

module.exports = router;