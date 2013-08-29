'use strict';

var Percolator = require('Percolator').Percolator;
var port = process.env.PORT || 5000;
var server = new Percolator({
    'port': port
});

server.route('/', {
    GET: function(req, res){
        res.object({
            message: 'Hello World!'
        }).send();
    }
});

server.listen(function(err){
    if(err){throw err;}
    console.log('Percolator is listening on port ', server.port);
});