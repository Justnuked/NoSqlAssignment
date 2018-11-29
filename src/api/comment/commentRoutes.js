const express = require('express');
const routes = express.Router();
const CommentController = require('../../db/commentController');

//post new comment
routes.post('/', CommentController.addComment);

//delete comment
routes.delete('/:id', CommentController.deleteComment);

//vote on comment
routes.post('/:id', CommentController.voteOnComment);

module.exports = routes;