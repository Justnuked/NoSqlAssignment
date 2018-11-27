const neo4j = require('neo4j-driver').v1;

let driver;

if (process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'test') {
    console.log("Neo4j test db online")
    driver = neo4j.driver('bolt://localhost:7687',
        neo4j.auth.basic('uwu', 'owo'));
}

else {
    console.log("Neo4j production db online")
    driver = neo4j.driver('bolt://localhost:7687',
        neo4j.auth.basic('uwu', 'owo'));
}

module.exports = driver;