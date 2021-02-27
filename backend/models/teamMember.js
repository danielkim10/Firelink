const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var teamMemberSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    joinDate: { type: Date, required: true },
    leftDate: Date,
    gamesPlayed: { type: Number, required: true },
    wins: { type: Number, required: true },
    active: { type: Boolean, required: true },
});

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);
module.exports = TeamMember;