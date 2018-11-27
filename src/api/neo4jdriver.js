const neo4j = require('neo4j-driver').v1;

let driver;


console.log("Starting NEODB. . .");
driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('uwu', 'owo'));


module.exports = driver;