const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var Notification = mongoose.model('Notification', {
    sender: String,
    recipients: [String],
    date: Date,
    type: String,
    message: String,
});

module.exports = { Notification };