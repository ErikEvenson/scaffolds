'use strict';

var Percolator = require('Percolator').Percolator;
var port = process.env.PORT || 5000;
var server = new Percolator({
    'port': port
});

server.route('/', function(req, res){
    res.object({hello: 'world!'}).send();
});

server.listen(function(err){
    if(err){throw err;}
    console.log('Percolator is listening on port ', server.port);
});


// var http = require('http');
// var express = require('express');
// var server = new express();

// 
// server.set('view engine', 'jade');
// server.set('views', './app/views');
// server.use(express.static('./app'));
// 
// server.get('/', function(request, response){
//     response.render('index');
// });
// 
// http.createServer(server).listen(port, function(){
//     console.log('Server started.');
// });
