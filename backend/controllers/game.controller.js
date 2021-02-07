const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Game } = require('../models/game');

router.get('/', (req, res) => {
  Game.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log('Error in retrieving games: ' + JSON.stringify(err, undefined, 2));
  });
});

router.get('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No game with given id: ${req.params.id}`);
  
  Game.findById(req.params.id, (err, doc) => {
    if (!err) res.send(docs);
    else console.log('Error in retrieving game: ' + JSON.stringify(err, undefined, 2));
  });
});

router.post('/', (req, res) => {
  var game = new Game({
    teamARoster: req.body.teamARoster,
    teamBRoster: req.body.teamBRoster,
    riotGameID: req.body.riotGameID,
    status: req.body.status,
  });
  game.save((err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error creating game: ' + JSON.stringify(err, undefined, 2)); }
  });
});

router.put('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No game with given id: ${req.params.id}`);
  
  var game = {
    teamARoster: req.body.teamARoster,
    teamBRoster: req.body.teamBRoster,
    riotGameID: req.body.riotGameID,
    status: req.body.status,
  };
  Game.findByIdAndUpdate(req.params.id, { $set: game }, { new: true }, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error updating game: ' + JSON.stringify(err, undefined, 2)); }
  });
});

router.delete('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No game with given id: ${req.params.id}`);
  
  Game.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error updating game: ' + JSON.stringify(err, undefined, 2)); }
  });
});

router.delete('/', (req, res) => {
  Game.deleteMany({}, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error deleting games : ' + JSON.stringify(err, undefined, 2)); }
  });
});

module.exports = router;