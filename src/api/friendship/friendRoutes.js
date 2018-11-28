const express = require('express');
const routes = express.Router();
const friendController = require('../../db/friendController');

//new friendship
routes.post('/', friendController.addFriend);

routes.delete('/', friendController.removeFriend)

module.exports = routes;