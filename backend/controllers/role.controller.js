const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var Role = require('../models/role');

router.get('/', (req, res) => {
  Role.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log('Error in retrieving roles: ' + JSON.stringify(err, undefined, 2));
  });
});

router.post('/admin', (req, res) => {
  Role.find({ admin: req.body.admin } ,(err, doc) => {
    if (!err) res.send(doc);
    else console.log('Error in retrieving roles: ' + JSON.stringify(err, undefined, 2));
  })
})

router.get('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No Role with given id: ${req.params.id}`);
  
  Role.findById(req.params.id, (err, doc) => {
    if (!err) res.send(doc);
    else console.log('Error in retrieving role: ' + JSON.stringify(err, undefined, 2));
  });
});

router.post('/', (req, res) => {
  var role = new Role({
    name: req.body.name,
    admin: req.body.admin,
  });
  role.save((err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error creating role: ' + JSON.stringify(err, undefined, 2)); }
  });
});

router.put('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No role with given id: ${req.params.id}`);
  
  var role = {
    name: req.body.name,
    admin: req.body.admin
  };
  Role.findByIdAndUpdate(req.params.id, { $set: role }, { new: true }, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error updating role: ' + JSON.stringify(err, undefined, 2)); }
  });
});

router.delete('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No role with given id: ${req.params.id}`);
  
  Role.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error updating role: ' + JSON.stringify(err, undefined, 2)); }
  });
});

router.delete('/', (req, res) => {
  Role.deleteMany({}, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error deleting roles : ' + JSON.stringify(err, undefined, 2)); }
  });
});

module.exports = router;