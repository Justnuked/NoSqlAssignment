const express = require('express');
const routes = express.Router();

//get users
routes.get('/', function(req, res){
    res.statusCode = 200;
    return res.json({eyyy : 'eeyyy'});
})

//add user
routes.post('/', function(req,res){

})

//change password
routes.put('/:id', function(req,res){

})

//delete user
routes.delete('/:id', function(req,res){

})

//get user
routes.get('/:id', function(req,res){
    var temp = req.params.id;

    res.statusCode = 200;
    return res.json({eyyy : 'eeyyy' + temp});
})

module.exports = routes;

