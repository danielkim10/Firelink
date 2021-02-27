const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var inviteSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, refPath: 'senderType' },
    senderType: { type: String, enum: ['Team', 'Tournament'] },
    recipient: { type: Schema.Types.ObjectId, refPath: 'recipientType' },
    recipientType: { type: String, enum: ['Team', 'User'] },
    date: { type: Date, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    responseReceived: { type: Boolean, required: true },
    opened: { type: Boolean, required: true },
});

const Invite = mongoose.model('Invite', inviteSchema);
module.exports = Invite ;