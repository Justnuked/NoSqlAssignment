const neo4j = require('../api/neo4jdriver');

module.exports = {

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