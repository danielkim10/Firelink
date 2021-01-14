const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Notification } = require('../models/notification');

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
        sender: req.body.sender,
        recipient: req.body.recipient,
        date: new Date(),
        type: req.body.type,
        teamID: req.body.teamID,
        tournamentID: req.body.tournamentID,
        userID: req.body.userID,
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
        sender: req.body.sender,
        recipient: req.body.recipient,
        date: new Date(),
        type: req.body.type,
        teamID: req.body.teamID,
        tournamentID: req.body.tournamentID,
        userID: req.body.userID,
        subject: req.body.subject,
        message: req.body.message,
    };

    Notification.findByIdAndUpdate(req.params.id, { $set: team }, { new: true }, (err, doc) => {
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

//#endregion