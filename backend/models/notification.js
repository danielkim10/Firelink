const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var notificationSchema = new Schema({
    date: Date,
    subject: String,
    message: String,
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;