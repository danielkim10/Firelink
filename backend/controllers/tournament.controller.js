const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var Tournament = require('../models/tournament');

//#region Get

// get all tournamnets
router.get('/', (req, res) => {
  Tournament.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log('Error in retrieving tournaments: ' + JSON.stringify(err, undefined, 2));
  }).populate('tournamentMasters').populate('rankRestrictionLB').populate('rankRestrictionUB');
});

// get tournament with _id
router.get('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No tournament with given id: ${req.params.id}`);
  
  Tournament.findById(req.params.id, (err, doc) => {
    if (!err) res.send(docs);
    else console.log('Error in retrieving tournament: ' + JSON.stringify(err, undefined, 2));
  }).populate('tournamentMasters').populate('rankRestrictionLB')
    .populate('rankRestrictionUB');
});

//#endregion

//#region Post

// create new tournament
router.post('/', (req, res) => {
  if (req.body.startDate < new Date()) {
    req.body.status = 'Not Started';
  }
  else {
    req.body.status = 'In Progress';
  }

  var tournament = new Tournament({
    name: req.body.name,
    description: req.body.description,
    tournamentMasters: req.body.tournamentMasters,
    maxParticipants: req.body.maxParticipants,
    participants: req.body.participants,
    onParticipants: req.body.participantTypes,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    format: req.body.format,
    privacy: req.body.privacy,
    rankRestrictionLB: req.body.rankRestrictionLB,
    rankRestrictionUB: req.body.rankRestrictionUB,
    outgoingInvites: req.body.outgoingInvites,
    incomingApplications: req.body.incomingApplications,
    status: req.body.status
  });
  tournament.save((err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error creating tournament: ' + JSON.stringify(err, undefined, 2)); }
  });
});

//#endregion

//#region Put

// update tournament with _id
router.put('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No tournament with given id: ${req.params.id}`);
  
  var tournament = {
    name: req.body.name,
    description: req.body.description,
    tournamentMasters: req.body.tournamentMasters,
    maxParticipants: req.body.maxParticipants,
    participants: req.body.participants,
    onParticipants: req.body.onParticipants,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    format: req.body.format,
    privacy: req.body.privacy,
    rankRestrictionLB: req.body.rankRestrictionLB,
    rankRestrictionUB: req.body.rankRestrictionUB,
    outgoingInvites: req.body.outgoingInvites,
    incomingApplications: req.body.incomingApplications,
    status: req.body.status
  };
  Tournament.findByIdAndUpdate(req.params.id, { $set: tournament }, { new: true }, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error updating tournament: ' + JSON.stringify(err, undefined, 2)); }
  });
});

// add participant to tournament with _id
router.put('/addParticipantToTournament/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No tournament with given id: ${req.params.id}`);
  
  req.body.tournament.participants.push(req.body.participant._id);
  var tournament = {
    participants: req.body.tournament.participants
  };
  Tournament.findByIdAndUpdate(req.params.id, { $set: tournament }, { new: true }, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error updating tournament: ' + JSON.stringify(err, undefined, 2)); }
  });
});

// remove participant from tournament with _id
router.put('/removeParticipantFromTournament/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No tournament with given id: ${req.params.id}`);
  
  if (req.body.tournament.participants.some(e => e._id === req.body.participant._id)) {
    req.body.tournament.participants.splice(req.body.tournament.participants.indexOf(req.body.tournament.participants.find(e => e._id === req.body.participant._id), 1));
  }
  else {
    console.log('Error updating tournament');
    return;
  }
  var tournament = {
    participants: req.body.tournament.participants
  };
  Tournament.findByIdAndUpdate(req.params.id, { $set: tournament }, { new: true }, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error updating tournament: ' + JSON.stringify(err, undefined, 2)); }
  });
});

// create invite for tournament with _id
router.put('/createInviteForTournament/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`No tournament with given id: ${req.params.id}`);
  }
  req.body.tournament.outgoingInvites.push(req.body.invite._id);
  var tournament = {
    outgoingInvites: req.body.tournament.outgoingInvites,
  }

  Tournament.findByIdAndUpdate(req.params.id, { $set: tournament }, { new: true }, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error updating tournament: ' + JSON.stringify(err, undefined, 2)); }
  });
});

// accept or reject a tournament application with _id
router.put('/handleApplication/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`No tournament with given id: ${req.params.id}`);
  }

});

// add match to tournament with _id
router.put('/addMatchToTournamnent/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`No tournament with given id: ${req.params.id}`);
  }

  req.body.tournament.matches.push(req.body.match._id);
  var tournament = {
    matches: req.body.tournament.matches,
  }

  Tournament.findByIdAndUpdate(req.params.id, { $set: tournament }, { new: true }, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error updating tournament: ' + JSON.stringify(err, undefined, 2)); }
  });
});

// cancel tournament with _id
router.put('/cancelTournament/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No tournament with given id: ${req.params.id}`);
  var tournament = {
    active: false,
    status: 'Canceled'
  };

  Tournament.findByIdAndUpdate(req.params.id, { $set: tournament }, { new: true }, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error updating tournament: ' + JSON.stringify(err, undefined, 2)); }
  });
});

//#endregion

//#region Delete

// delete tournament with _id
router.delete('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No tournament with given id: ${req.params.id}`);
  
  Tournament.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error updating tournament: ' + JSON.stringify(err, undefined, 2)); }
  });
});

router.delete('/', (req, res) => {
  Tournament.deleteMany({}, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error deleting tournaments : ' + JSON.stringify(err, undefined, 2)); }
  });
});

//#endregion

module.exports = router;