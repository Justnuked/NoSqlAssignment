const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const VoteSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    votetype: {
        type: String,
        required: true,
    }
});

const Vote = mongoose.model('vote', VoteSchema);

module.exports = Vote;