const neo4j = require('../api/neo4jdriver');
const Thread = require('../models/threadModel');
const VoteModel = require('../models/voteModel');

module.exports = {
    createThread(req,res,next){
        var title = req.body.title;
        var content = req.body.content;
        var username = req.body.username;

        const session = neo4j.session();

        session.run(`MATCH (u:User) WHERE u.name = $name RETURN u`,
        {name: username})
        .then((result) =>{
            if(result.records.length === 0){
                session.close();
                res.status(400);
                res.send({Message: "User not found"});
            } else{
                var thread = new Thread({username: username, title: title, content:content});
                thread.save()
                .then(() => {
                    session.close();
                    res.status(200);
                    res.send({Message: "Thread created"});
                })
            }
        }).catch(next);
    },

    updateThread(req,res,next){
        var threadId = req.params.id;
        var newContent = req.body.newContent;

        Thread.findByIdAndUpdate(threadId, {content: newContent})
        .then((result) =>{
            if(result === null){
                res.status(400);
                res.send({Message: "Thread does not exists"});
            }
            else{
                res.status(200);
                res.send({Message: "Thread updated"});
            }
        }).catch(next);
    },

    VoteOnThread(req, res, next) {
        var user = req.body.username;
        var threadId = req.params.id;
        var vote = req.body.votetype;

        // Check if the user is existent
        const session = neo4j.session();
        session.run(`MATCH (u:User) WHERE u.name = $name RETURN u`,
                { name: user })
            .then((result) => {
                if (result.records.length === 0) {
                    session.close();
                    res.status(400);
                    res.send({ Message: "User not found" });
                }
            }).catch(next);

        // 0 = No vote, 1 = Downvote, 2 = Upvote
        var vote = VoteModel({ username: user, votetype: vote })

        Thread.findOne({ _id: threadId })
        .populate('votes')
            .then((resultThread) => {
                if (resultThread === null) {
                    res.status(400);
                    res.send({ Message: "Thread not found" });
                }
                else {
                    console.log(resultThread.votes);

                    //get the previous vote of the user
                    var temp = resultThread.votes.filter(x => x.username === user);
                    console.log(temp.length);
                    if(temp.length > 0){
                        VoteModel.findOneAndRemove({_id: temp[0]._id})
                        .then(()=>{
                        })
                    }

                    //remove the previous vote out of the array if any
                    resultThread.votes = resultThread.votes.filter(x => x.username !== user);

                    vote.save();
                    //resultThread.votes.find({ username: user })
                    //    .then((x) => {
                    //        console.log(x);
                    //    })
                    resultThread.votes.push(vote);
                    resultThread.save();
                    res.status(200);
                    res.send({ Message: "Vote added to thread"});
                }
            }).catch(next);
    },

    findById(req,res,next){
        var threadId = req.params.id;

        Thread.findById(threadId)
        .populate('comments')
        .then((result) =>{
            console.log(result.getUpvotes + "Upvotes");
            console.log(result.getDownvotes + "Downvotes");
            result.comments = result.comments.filter(comments => comments != null);
            result.save().then(() =>{
                res.status(200);
                res.send(result);
            });
        }).catch(next);
    },

    deleteThread(req,res,next){
        var threadId = req.params.id;

        if(threadId === null){
            res.status(400);
            res.send({Message: "Thread not found"});
        }else{
            Thread.findById({_id: threadId})
            .then((result) =>{
                if(result === null){
                    res.status(400);
                    res.send({Message: "Thread not found"});
                }
                result.remove();
                res.status(200);
                res.send({Message: "Thread deleted"});
            });
        }
    }
    getAllThreads(req, res, next) {
        Thread.find()
            //.populate('comments')
            .then((result) => {
                    //result.comments = result.comments.filter(comments => comments != null);
                    //result.then(() => {
                    res.status(200);
                    res.send(result);
            }).catch(next);
    },
}
