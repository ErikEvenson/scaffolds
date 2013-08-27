'use strict';
var http = require('http');
var express = require('express');
var server = new express();
var port = process.env.PORT || 5000;

server.set('view engine', 'jade');
server.set('views', './app/views');
server.use(express.static('./app'));

server.get('/', function(request, response){
    response.render('index');
});

http.createServer(server).listen(port, function(){
    console.log('Server started.');
});

