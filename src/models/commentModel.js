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
    upvotes:[{
        type:String
    }],
    downvotes:[{
        type:String
    }]
});

const CommentModel = mongoose.model('comment', CommentSchema);

module.exports = CommentModel;