'use strict';

var path = require('path');
var Percolator = require('percolator').Percolator;
var port = process.env.PORT || 5000;
var staticDir = path.join(__dirname, '../app');
var accountsCollection = require('./resources/accounts');
var widgetsCollection = require('./resources/widgets');

var EEELib = require('../common/eeelib');

var server = new Percolator({
  'autolink': true,
  'parseBody': false,
  'port': port,
  'protocol': 'http',
  'resourcePath': '/api',
  'staticDir': staticDir
});

server.route('/api/v1/accounts', accountsCollection.handler);
server.route('/api/v1/accounts/:id', accountsCollection.wildcard);

server.route('/api/v1/widgets', widgetsCollection.handler);
server.route('/api/v1/widgets/:id', widgetsCollection.wildcard);

server.listen(function(err){
  if(err){throw err;}
  console.log('Percolator is listening on port ', server.port);
});

EEELib.burp();
