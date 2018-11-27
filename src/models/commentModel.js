const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CommentSchema = new Schema ({
    
    username:{
        type:Schema.Types.ObjectId,
        ref: 'user'
    },
    content:{
        type: String,
        required:true
    },
    comments:[CommentSchema],
    upvotes:[{
        type:Schema.Types.ObjectId,
        ref:'user'
    }],
    downvotes:[{
        type:Schema.Types.ObjectId,
        ref:'user'
    }]
});


module.exports = CommentSchema;