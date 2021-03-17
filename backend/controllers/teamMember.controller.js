const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var TeamMember = require('../models/teamMember');

//#region Get

router.get('/', (req, res) => {
    TeamMember.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log('Error in retrieving team members: ' + JSON.stringify(err, undefined, 2));
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No team member with given id: ${req.params.id}`);
    TeamMember.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('Error in retrieving team member: ' + JSON.stringify(err, undefined, 2));
    }).populate({ path: 'user', populate: { path: 'role'}}).populate('team').exec((err, teamMember) => {

    });
});

//#endregion

//#region Post

router.post('/', (req, res) => {
    var teamMember = new TeamMember({
        user: req.body.user,
        team: req.body.team,
        joinDate: new Date(),
        leftDate: null,
        gamesPlayed: 0,
        wins: 0,
        active: true,
    });
    teamMember.save((err, doc) => {
        if (!err) res.send(doc);
        else console.log('Error creating team member: ' + JSON.stringify(err, undefined, 2));
    });
});

//#endregion

//#region Put

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No team member with given id: ${req.params.id}`);
    
    var teamMember = {
        user: req.body.user,
        team: req.body.team,
    };

    TeamMember.findByIdAndUpdate(req.params.id, { $set: teamMember }, { new: true }, (err, doc) => {
        if (!err) res.send(doc);
        else console.log('Error updating team member: ' + JSON.stringify(err, undefined, 2));
    });
});

router.put('/recordGame:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No team member with given id: ${req.params.id}`);
    
    if (req.body.win) {
        req.body.teamMember.wins++;
    }
    req.body.teamMember.gamesPlayed++;

    var teamMember = {
        gamesPlayed: req.body.teamMember.gamesPlayed,
        wins: req.body.teamMember.wins,
    };

    TeamMember.findByIdAndUpdate(req.params.id, { $set: teamMember }, { new: true }, (err, doc) => {
        if (!err) res.send(doc);
        else console.log('Error updating team member: ' + JSON.stringify(err, undefined, 2));
    });
});

router.put('/leaveTeam:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No team member with given id: ${req.params.id}`);
    var teamMember = {
        leftDate: new Date(),
        active: false,
    };

    TeamMember.findByIdAndUpdate(req.params.id, { $set: teamMember }, { new: true }, (err, doc) => {
        if (!err) res.send(doc);
        else console.log('Error updating team member: ' + JSON.stringify(err, undefined, 2));
    });
});

//#endregion

//#region Delete

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No team member with given id: ${req.params.id}`);
    TeamMember.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) res.send(doc);
        else console.log('Error updating team member: ' + JSON.stringify(err, undefined, 2));
    });
});

router.delete('/', (req, res) => {
    TeamMember.deleteMany({}, (err, doc) => {
        if (!err) res.send(doc);
        else console.log('Error deleting team members: ' + JSON.stringify(err, undefined, 2));
    });
});

//#endregion

module.exports = router;