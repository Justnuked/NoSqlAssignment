const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const ThreadSchema = new Schema ({
    username:{
        type:String,
        required:[true, 'Username is required']
    },
    title:{
        type:String,
        required: [true, 'Title is required']
    },
    content:{
        type:String,
        required: [true, 'Content is required']
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

const Thread = mongoose.model('thread', ThreadSchema);

module.exports = Thread;