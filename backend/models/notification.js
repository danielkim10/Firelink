const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var notificationSchema = new Schema({
    date: { type: Date, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;