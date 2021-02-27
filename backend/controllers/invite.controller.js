const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var Invite = require('../models/invite');

//#region Get

router.get('/', (req, res) => {
    Invite.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log('Error in retrieving invites: ' + JSON.stringify(err, undefined, 2));
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No invite with givne id: ${req.params.id}`);
    
    Invite.findById(req.params.id, (err, doc) => {
        if (!err) res.send(doc);
        else console.log('Error in retrieving invite: ' + JSON.stringify(err, undefined, 2));
    })
})

//#endregion

//#region Post

router.post('/', (req, res) => {
    var invite = new Invite({
        sender: req.body.sender,
        senderType: req.body.senderType,
        recipient: req.body.recipient,
        recipientType: req.body.recipientType,
        date: new Date(),
        subject: req.body.invite.subject,
        message: req.body.invite.message,
        responseReceived: false,
        opened: false,
    });
    invite.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error creating invite: ' + JSON.stringify(err, undefined, 2)); }
    });
});

//#endregion

//#region Put

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No invite with given id: ${req.params.id}`);
    
    var invite = {
        sender: req.body.sender,
        recipient: req.body.recipient,
        subject: req.body.subject,
        message: req.body.message,
    };
    Invite.findByIdAndUpdate(req.params.id, { $set: invite }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error updating invite: ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/inviteOpened/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No invite with given id: ${req.params.id}`);

    var invite = {
        opened: true,
    }

    Invite.findByIdAndUpdate(req.params.id, { $set: invite }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error updating invite: ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/inviteResponse/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No invite with given id: ${req.params.id}`);
    
    var invite = {
        responseReceived: true,
    }

    Invite.findByIdAndUpdate(req.params.id, { $set: invite }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error updating invite: ' + JSON.stringify(err, undefined, 2)); }
    });
});

//#endregion

//#region Delete

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No invite with given id: ${req.params.id}`);
    Invite.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error updating team: ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/', (req, res) => {
    Invite.deleteMany({}, (err, doc) => {
      if (!err) { res.send(doc); }
      else { console.log('Error deleting invites : ' + JSON.stringify(err, undefined, 2)); }
    });
  });


//#endregion

module.exports = router;