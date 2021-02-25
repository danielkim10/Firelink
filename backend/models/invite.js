const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var inviteSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, refPath: 'senderType' },
    senderType: { type: String, enum: ['Team', 'Tournament'] },
    recipient: { type: Schema.Types.ObjectId, refPath: 'recipientType' },
    recipientType: { type: String, enum: ['Team', 'User'] },
    date: Date,
    subject: String,
    message: String,
    responseReceived: Boolean,
    opened: Boolean,
});

const Invite = mongoose.model('Invite', inviteSchema);
module.exports = Invite ;