const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var Notification = require('../models/notification');

//#region Get

router.get('/', (req, res) => {
    Notification.find((err, doc) => {
      if (!err) res.send(doc);
      else console.log('Error in retrieving notifications: ' + JSON.stringify(err, undefined, 2));
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No notification with given id: ${req.params.id}`);

    Notification.findById(req.params.id, (err, doc) => {
      if (!err) res.send(doc);
      else console.log('Error in retrieving notification: ' + JSON.stringify(err, undefined, 2));
    });
});

//#endregion

//#region Post

router.post('/', (req, res) => {
    var notification = new Notification({
        date: new Date(),
        subject: req.body.subject,
        message: req.body.message,
    });

    notification.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error creating notification: ' + JSON.stringify(err, undefined, 2)); }
      });
});

//#endregion

//#region Put

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No notification with given id: ${req.params.id}`);

    var notification = {
        date: new Date(),
        subject: req.body.subject,
        message: req.body.message,
    };

    Notification.findByIdAndUpdate(req.params.id, { $set: notification }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error updating notification: ' + JSON.stringify(err, undefined, 2)); }
    });
});

//#endregion

//#region Delete

router.delete('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No notification with given id: ${req.params.id}`);
    
  Notification.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error updating notification: ' + JSON.stringify(err, undefined, 2)); }
  });
});

router.delete('/', (req, res) => {
  Notification.deleteMany({}, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error deleting notifications : ' + JSON.stringify(err, undefined, 2)); }
  });
});

//#endregion

module.exports = router;