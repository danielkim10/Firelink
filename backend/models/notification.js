const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var Notification = mongoose.model('Notification', {
    sender: String,
    recipient: String,
    date: Date,
    dateRead: Date,
    type: String,
    teamID: String,
    tournamentID: String,
    userID: String,
    subject: String,
    message: String,
});

module.exports = { Notification };