'use strict';

var path = require('path');
var Percolator = require('percolator').Percolator;
var port = process.env.PORT || 5000;
var staticDir = path.join(__dirname, '../app');
var accountsCollection = require('./collections/accounts');
var widgetsCollection = require('./collections/widgets');

var server = new Percolator({
    'autolink': true,
    'parseBody': false,
    'port': port,
    'protocol': 'http',
    'resourcePath': '/api',
    'staticDir': staticDir
});

// accountsCollection.handler.basicAuthenticate = function(username, password, req, res, cb){
//     if(username === 'eee' && password === 'fff'){
//         console.log('XXXX');
//         return(null, {username: 'eee'});
//     } else {
//         console.log('YYYY');
//         return cb(true);
//     }
// };
// console.log(accountsCollection.handler);
// 
// 
// server.route('/api/v1/accounts', {
//     basicAuthenticate : function(username, password, req, res, cb){
//         if (username === 'eee' && password === 'fff'){
//             return cb(null, {username : 'eee'});
//         } else {
//             return cb(true);  // Percolator will 401 for you
//         }
//     },
//     GET : function(req, res){
//         accountsCollection.handler.GET(req, res);
//     }
// });

server.route('/api/v1/accounts', accountsCollection.handler);
server.route('/api/v1/accounts/:id', accountsCollection.wildcard);

server.route('/api/v1/widgets', widgetsCollection.handler);
server.route('/api/v1/widgets/:id', widgetsCollection.wildcard);

server.listen(function(err){
    if(err){throw err;}
    console.log('Percolator is listening on port ', server.port);
});


