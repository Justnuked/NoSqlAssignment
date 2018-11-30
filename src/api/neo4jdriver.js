const neo4j = require('neo4j-driver').v1;

let driver;


console.log("Starting NEODB. . .");
driver = neo4j.driver('bolt://hobby-iagimkniipmbgbkenocghgcl.dbs.graphenedb.com:24786', neo4j.auth.basic('admin', 'b.FpxI2jgjB6f4.qjgtPcbWCTLNMF09'));


module.exports = driver;