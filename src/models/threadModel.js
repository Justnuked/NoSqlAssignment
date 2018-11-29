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

ThreadSchema.pre('remove', function(next){
    const comments = mongoose.model('comment');

    comments.remove({_id: {$in: this.comments}})
    .then(() =>{
        const votes = mongoose.model('vote');

        votes.remove({_id: {$in: this.votes}})
        .then(() =>{
            next();
        })
    })
});

ThreadSchema.virtual('getUpvotes').get(function(){
    var temp = this.votes.filter(vote => vote.votetype === '2');

    return temp.length;
});

ThreadSchema.virtual('getDownvotes').get(function(){
    var temp = this.votes.filter(vote => vote.votetype === '1');

    return temp.length
});

const Thread = mongoose.model('thread', ThreadSchema);

module.exports = Thread;