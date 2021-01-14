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
  
  User.findById(req.params.id, (err, doc) => {
    if (!err) res.send(doc);
    else console.log('Error in retrieving user: ' + JSON.stringify(err, undefined, 2));
  });
});

//#endregion

//#region Post

router.post('/noTeam', (req, res) => {
  User.find({teamID: '', freeAgent: true}, (err, doc) => {
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
    summonerName: req.body.summonerName,
    displayName: req.body.displayName,
    freeAgent: req.body.freeAgent,
  };
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
    teamID: req.body.teamID,
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
  
  req.body.previousTeamIDs.push(req.body.teamID);
  var user = {
    teamID: '',
    previousTeamIDs: req.body.previousTeamIDs,
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

//#endregion

module.exports = router;
