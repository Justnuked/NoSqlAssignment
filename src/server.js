const http = require('http');
const express = require('express');
const userRoutes = require('../src/api/user/userRoutes')
const app = express();
const port = process.env.PORT || 3000;

//set json as content type
app.use('*', function(req, res, next){
	res.contentType('application/json');
	next();
});


//set api routes
app.use('/api/users', userRoutes);

//Returns a 400 error for all non existing endpoints
app.use('*', function(req, res, next){
	res.status(400);
	res.json({Error: 'No matching endpoint'});
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