const neo4j = require('../api/neo4jdriver');

module.exports = {
    AddUser(req,res,next){
        var username = req.params.username;
        var password = req.params.password;

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
    }
}