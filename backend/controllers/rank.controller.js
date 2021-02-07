const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var Rank = require('../models/rank');

router.get('/', (req, res) => {
    Rank.find((err, docs) => {
      if (!err) res.send(docs);
      else console.log('Error in retrieving ranks: ' + JSON.stringify(err, undefined, 2));
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No Rank with given id: ${req.params.id}`);
    
    Rank.findById(req.params.id, (err, doc) => {
      if (!err) res.send(doc);
      else console.log('Error in retrieving rank: ' + JSON.stringify(err, undefined, 2));
    });
});

router.post('/', (req, res) => {
    var rank = new Rank({
      name: req.body.name,
      value: req.body.value,
      image: req.body.image,
    });
    rank.save((err, doc) => {
      if (!err) { res.send(doc); }
      else { console.log('Error creating rank: ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No rank with given id: ${req.params.id}`);
    
    var rank = {
        name: req.body.name,
        value: req.body.value,
        image: req.body.image,
    };
    Rank.findByIdAndUpdate(req.params.id, { $set: rank }, { new: true }, (err, doc) => {
      if (!err) { res.send(doc); }
      else { console.log('Error updating role: ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No rank with given id: ${req.params.id}`);
    
    Rank.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) { res.send(doc); }
      else { console.log('Error updating rank: ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/', (req, res) => {
    Rank.deleteMany({}, (err, doc) => {
      if (!err) { res.send(doc); }
      else { console.log('Error deleting ranks : ' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;