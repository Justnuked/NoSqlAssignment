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

    // Add friendship between two students
    addFriend(req, res, next) {

        const student1 = req.body.username1;
        const student2 = req.body.username2;
        let session = driver.session();

        session.run(
                `MATCH (x:User)
            WHERE x.name= $name1 OR x.name = $name2
            RETURN x`,
                { name1: student1, name2: student2 }
            ).then((result) => {
                if (result.records.length !== 2) {
                    res.status(422).send({ Error: "One or both students do not exist" })
                }
                else {
                    session.run(
                        `MATCH p = (x:User)-[r:IS_FRIEND]->(y:User)
                    WHERE x.name= $name1 AND y.name= $name2 
                    RETURN p`,
                        { name1: user1, name2: user2 }
                    ).then((result) => {
                        if (result.records.length < 1) {
                            session.run(
                                `MATCH (a:User {name: $name1}), (b:User{name: $name2})
                            CREATE (a)-[:IS_FRIEND]->(b)
                            CREATE (b)-[:IS_FRIEND]->(a)`,
                                { name1: user1, name2: user2 }
                            ).then(() => {
                                session.close()
                                res.status(200).send({ Message: 'Friendship added' })
                            }).catch(next);
                        }
                        else {
                            res.status(200).send({ Message: 'Already friends' })
                        }
                    }).catch(next);

                }
            })
            .catch(next);
    },

}