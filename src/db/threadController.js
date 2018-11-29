const neo4j = require('../api/neo4jdriver');
const Thread = require('../models/threadModel');

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
    }
}
