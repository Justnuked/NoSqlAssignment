const Neode = require('neode');
const http = require('http');
const express = require('express');
const userRoutes = require('../src/api/user/userRoutes');
const friendshipRoutes = require('../src/api/friendship/friendRoutes');
const threadRoutes = require('../src/api/thread/threadRoutes');
const commentRoutes = require('../src/api/comment/commentRoutes');
const mongoose = require('mongoose');


const app = express();
const port = process.env.PORT || 3000;

const neodeInstance = new Neode('bolt://localhost:7687',
    'uwu', 'owo');

//set json as content type
app.use('*', function(req, res, next){
	res.contentType('application/json');
	next();
});

//mongoose config
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/studdit');

//set api routes
app.use('/api/users', userRoutes);
app.use('/api/friendship', friendshipRoutes);
app.use('/api/thread', threadRoutes);
app.use('/api/comment', commentRoutes);

//Returns a 400 error for all non existing endpoints
app.use('*', function(req, res, next){
	res.status(400);
	res.json({Error: 'No matching endpoints'});
	res.end();
});

//Returns a 404 error for everything else
app.use('*', function(err, req, res, next){
	console.log('Error: ' + err);
	res.status(404).json({error: err}).end();

});

app.listen(port, function() {
	console.log('Server listens on port ' + port);
});

module.exports = app;