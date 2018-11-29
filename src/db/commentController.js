const neo4j = require('../api/neo4jdriver');
const CommentModel = require('../models/commentModel');
const ThreadModel = require('../models/threadModel');

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
                console.log("Called2");
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
                            res.send({Message:"Comment added to thread: " + result.title});
                        }
    
                    }).catch(next);
                }
                //comment of comment
                else{
    
                }
            }
            

        }).catch(next);
        }

    }