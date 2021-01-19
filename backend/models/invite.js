const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Team = require('./team');
var Tournament = require('./tournament');
var User = require('./user');

var inviteSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, refPath: 'onSender' },
    onSender: { type: String, enum: ['Team', 'Tournament', 'User'] },
    recipient: { type: Schema.Types.ObjectId, refPath: 'onRecipient' },
    onRecipient: { type: String, enum: ['Team', 'Tournament', 'User'] },
    date: Date,
    subject: String,
    message: String,
    responseReceived: Boolean,
    opened: Boolean,
});

const Invite = mongoose.model('Invite', inviteSchema);
module.exports = Invite ;