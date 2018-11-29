const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = require('./commentModel');


const CommentSchema = new Schema ({
    
    username:{
        type: String,
        required:true
    },
    content:{
        type: String,
        required:true
    },
    comments:[{
        type:Schema.Types.ObjectId,
        ref:'comment'
    }],
    votes:[{
        type: Schema.Types.ObjectId,
        ref:'vote'
    }]
});

const CommentModel = mongoose.model('comment', CommentSchema);
module.exports = CommentModel;