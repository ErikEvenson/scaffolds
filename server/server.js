'use strict';
var http = require('http');
var express = require('express');
var server = new express();
var port = process.env.PORT || 5000;

http.createServer(server).listen(port, function(){
    console.log('Server started.');
});

server.get('/', function(request, response){
    response.send('Welcome!');
});
