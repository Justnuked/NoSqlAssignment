const express = require('express');
const routes = express.Router();
const CommentController = require('../../db/commentController');

//post new comment
routes.post('/', CommentController.addComment);

//delete comment
routes.delete('/:id', function(req,res){

})

//vote on comment
routes.post('/:id', function(req,res){

})

module.exports = routes;