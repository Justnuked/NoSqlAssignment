const express = require('express');
const threadController = require('../../db/threadController');
const routes = express.Router();

//add new thread
routes.post('/', threadController.createThread);

//update thread
routes.put('/:id', threadController.updateThread);

//delete thread
routes.delete('/:id', threadController.deleteThread);
//vote on thread
routes.post('/:id/vote', threadController.VoteOnThread)

//get threads of friends or from friends and friends of friends
routes.get('/threadsoffriends', function(req,res){

})

//get all threads 
routes.get('/', threadController.getAllThreads);

//get all threads sorted by upvotes
routes.get('/upvote', threadController.getAllThreadsUpvoteSorting);
routes.get('/score', threadController.getAllThreadsScoreSorting);

//get thread
routes.get('/:id', threadController.findById);

module.exports = routes;