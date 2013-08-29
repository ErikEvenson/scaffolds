'use strict';

var path = require('path');
var Percolator = require('Percolator').Percolator;
var port = process.env.PORT || 5000;
var staticDir = path.join(__dirname, '../app');
console.log(staticDir);

var server = new Percolator({
    'port': port,
    'protocol': 'http',
    'resourcePath': '/api',
    'staticDir': staticDir
});

server.route('/api', {
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