const mongoose = require('mongoose');
const CommentSchema = require('./commentModel');
const Schema = mongoose.Schema;


const ThreadSchema = new Schema ({
    username:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    Comments:[CommentSchema],
    upvotes:[{
        type:Schema.Types.ObjectId,
        ref:'user'
    }],
    downvotes:[{
        type:Schema.Types.ObjectId,
        ref:'user'
    }]
});

const Thread = mongoose.model('thread', ThreadSchema);

module.exports = Thread;