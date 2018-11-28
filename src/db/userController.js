const neo4j = require('../api/neo4jdriver');

module.exports = {
    AddUser(req,res,next){
        var username = req.body.username;
        var password = req.body.password;

        const session = neo4j.session();

        session.run(
            `MATCH (u:User)
            WHERE u.name = $name
            RETURN u`,
            { name: username }
        ).then((result) => {
            if(result.records.length > 0){
                res.send({Message: 'User already exists'})
            }
            else{
                session.run(
                    `CREATE (user:User {name: $name, password: $password}) RETURN user`,
                    { name: username, password: password }
                ).then((result) => {
                    session.close()
                    res.send({ Message: "User " + result.records[0]._fields[0].properties.name + " has been created" })
                }).catch(next);
            }
        }).catch(next);
    },

    DeleteUser(req,res,next){
        var username = req.params.id;
        var password = req.body.password;

        const session = neo4j.session();

        session.run(
            `MATCH (u:User)
            WHERE u.name = $name
            RETURN u`,
            {name: username}
        ).then((result) => {

            if(result.records.length > 0){
                if(result.records[0]._fields[0].properties.password === password){
                    session.run(
                        `MATCH (u:User {name: $name})
                        DELETE u`,
                        {name: username}
                    ).then(() =>{
                        session.close();
                        res.status(200);
                        res.send({Message: "user has been deleted"});
                    })
                } else{
                    session.close();
                    res.status(401);
                    res.send({Message: "Password did not match"});
                }
            } else{
                session.close();
                res.status(401);
                res.send({Message: "User does not exist"});
            }
        }).catch(next)
    },

    ChangePassword(req,res,next){
        var username = req.params.id;
        var password = req.body.password;
        var newPassword = req.body.newPassword;

        const session = neo4j.session();

        session.run(
            `MATCH (u:User)
            WHERE u.name = $name
            RETURN u`,
            {name: username}
        ).then((result) => {

            if(result.records.length > 0){
                if(result.records[0]._fields[0].properties.password === password){
                    session.run(
                        `MATCH (u:User {name: $name})
                        SET u.password = $password`,
                        {name: username, password: newPassword}
                    ).then(() =>{
                        session.close();
                        res.status(200);
                        res.send({Message: "Password updated"});
                    })
                } else{
                    session.close();
                    res.status(401);
                    res.send({Message: "Password did not match"});
                }
            } else{
                session.close();
                res.status(401);
                res.send({Message: "User does not exist"});
            }
        }).catch(next)
    }
}