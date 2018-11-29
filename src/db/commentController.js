const neo4j = require('../api/neo4jdriver');
const CommentModel = require('../models/commentModel');
const ThreadModel = require('../models/threadModel');
const VoteModel = require('../models/voteModel');

module.exports = {
    addComment(req,res,next){
        var content = req.body.content;
        var user = req.body.username;
        var parentId = req.body.parentId;
        var commentOfComment = req.body.commentOfComment;

        const session = neo4j.session();
        session.run(`MATCH (u:User) WHERE u.name = $name RETURN u`,
        {name: user})
        .then((result) =>{
            if(result.records.length === 0){
                session.close();
                res.status(400);
                res.send({Message: "User not found"});
            } else{
                session.close();
                if(commentOfComment === 'false'){
                    ThreadModel.findOne({_id: parentId})
                    .then((resultThread) =>{
                        if(resultThread === null){
                            res.status(400);
                            res.send({Message: "Thread not found"});
                        }
                        else{
                            var comment = new CommentModel({username: user, content:content});
                            comment.save();
    
                            resultThread.comments.push(comment);
                            resultThread.save();
                            res.status(200);
                            res.send({Message:"Comment added to thread"});
                        }
    
                    }).catch(next);
                }
                //comment of comment
                else{
                    CommentModel.findOne({_id: parentId})
                    .then((resultComment) =>{
                        if(resultComment === null){
                            res.status(400);
                            res.send({Message: "Comment not found"});
                        }else{
                            var comment = new CommentModel({username: user, content:content});
                            comment.save();
    
                            resultComment.comments.push(comment);
                            resultComment.save();
                            res.status(200);
                            res.send({Message:"Comment added to comment"});
                        }
                    }).catch(next);
                }
            }
            }).catch(next);
        },

        deleteComment(req,res,next){
            var commentId = req.params.id;
            var parentId = req.body.parentId;
            var commentOfComment = req.body.commentOfComment;

            //delete comment ref in thread
            if(commentOfComment === 'false'){
                ThreadModel.findOne({_id: parentId})
                .then((result) =>{
                    result.comments.pull(commentId);
                    result.save();
                })
                //delete comment ref in comment
            }else{
                CommentModel.findOne({_id: parentId})
                .then((result) => {
                    result.comments.pull(commentId);
                    result.save
                })
            }

            CommentModel.findOne({_id : commentId})
            .then((result) =>{
                if(result === null){
                    res.status(400);
                    res.send({Message: "Comment not found"});
                }else{
                    result.remove();
                    res.status(200);
                    res.send({Message: "Comment deleted"});
                }
            }).catch(next);
        },
        voteOnComment(req, res, next) {
            var user = req.body.username;
            var commentId = req.params.id;
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
    
            CommentModel.findOne({ _id: commentId })
            .populate('votes')
                .then((resultComment) => {
                    if (resultComment === null) {
                        res.status(400);
                        res.send({ Message: "Comment not found" });
                    }
                    else {
                        //get the previous vote of the user
                        var temp = resultComment.votes.filter(x => x.username === user);
                        if(temp.length > 0){
                            VoteModel.findOneAndRemove({_id: temp[0]._id})
                            .then(()=>{
                            })
                        }
    
                        //remove the previous vote out of the array if any
                        resultComment.votes = resultComment.votes.filter(x => x.username !== user);
    
                        vote.save();
                        resultComment.votes.push(vote);
                        resultComment.save();
                        res.status(200);
                        res.send({ Message: "Vote added to comment"});
                    }
                }).catch(next);
        },
    }