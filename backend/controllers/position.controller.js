const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var Position = require('../models/rank');

router.get('/', (req, res) => {
    Position.find((err, docs) => {
      if (!err) res.send(docs);
      else console.log('Error in retrieving positions: ' + JSON.stringify(err, undefined, 2));
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No position with given id: ${req.params.id}`);
    
    Position.findById(req.params.id, (err, doc) => {
      if (!err) res.send(doc);
      else console.log('Error in retrieving position: ' + JSON.stringify(err, undefined, 2));
    });
});

router.post('/', (req, res) => {
    var position = new Position({
      name: req.body.name,
      image: req.body.image,
    });
    position.save((err, doc) => {
      if (!err) { res.send(doc); }
      else { console.log('Error creating position: ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No position with given id: ${req.params.id}`);
    
    var position = {
        name: req.body.name,
        image: req.body.image,
    };
    Position.findByIdAndUpdate(req.params.id, { $set: position }, { new: true }, (err, doc) => {
      if (!err) { res.send(doc); }
      else { console.log('Error updating position: ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No position with given id: ${req.params.id}`);
    
    Position.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) { res.send(doc); }
      else { console.log('Error updating position: ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/', (req, res) => {
    Position.deleteMany({}, (err, doc) => {
      if (!err) { res.send(doc); }
      else { console.log('Error deleting positions : ' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;