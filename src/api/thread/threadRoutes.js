const express = require('express');
const routes = express.Router();

//add new thread
routes.post('/', function(req,res){

})

//update thread
routes.put('/:id', function(req,res){

})

//delete thread
routes.delete('/:id', function(req,res){

})

//vote on thread
routes.post('/:id/vote', function(req,res){

})

//get threads of friends or from friends and friends of friends
routes.get('/threadsoffriends', function(req,res){

})

//get all threads 
routes.get('/', function(req,res){

})

//get thread
routes.get('/:id', function(req,res){

})

module.exports = routes;