const express = require('express');
const routes = express.Router();

routes.get('/', function(req, res){
    res.statusCode = 200;
    return res.json({eyyy : 'eeyyy'});
})

module.exports = routes;

