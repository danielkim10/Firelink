const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Tournament } = require('../models/tournament');

router.get('/', (req, res) => {
  Tournament.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log('Error in retrieving tournaments: ' + JSON.stringify(err, undefined, 2));
  });
});

router.get('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No tournament with given id: ${req.params.id}`);
  
  Tournament.findById(req.params.id, (err, doc) => {
    if (!err) res.send(docs);
    else console.log('Error in retrieving tournament: ' + JSON.stringify(err, undefined, 2));
  });
});

router.post('/', (req, res) => {
  var tournament = new Tournament({
    name: req.body.name,
    description: req.body.description,
    tournamentMasters: req.body.tournamentMasters,
    maxParticipants: req.body.maxParticipants,
    participants: req.body.participants,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    rankRestrictionLB: req.body.rankRestrictionLB,
    rankRestrictionUB: req.body.rankRestrictionUB,
    status: req.body.status
  });
  tournament.save((err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error creating tournament: ' + JSON.stringify(err, undefined, 2)); }
  });
});

router.put('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No tournament with given id: ${req.params.id}`);
  
  var tournament = {
    name: req.body.name,
    description: req.body.description,
    tournamentMasters: req.body.tournamentMasters,
    maxParticipants: req.body.maxParticipants,
    participants: req.body.participants,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    rankRestrictionLB: req.body.rankRestrictionLB,
    rankRestrictionUB: req.body.rankRestrictionUB,
    status: req.body.status
  };
  Tournament.findByIdAndUpdate(req.params.id, { $set: tournament }, { new: true }, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error updating tournament: ' + JSON.stringify(err, undefined, 2)); }
  });
});

router.delete('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No tournament with given id: ${req.params.id}`);
  
  Tournament.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error updating tournament: ' + JSON.stringify(err, undefined, 2)); }
  });
});

module.exports = router;