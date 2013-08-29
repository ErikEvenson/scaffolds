'use strict';

var path = require('path');
var Percolator = require('Percolator').Percolator;
var port = process.env.PORT || 5000;
var staticDir = path.join(__dirname, '../app');
var CRUDCollection = require('Percolator').CRUDCollection;
// var SomeDB = require('SomeDB');
// var db = new SomeDB();
var widgets = require('./models/widgets');

var schema = {
    description : 'A widget',
    type: 'object',
    properties: {
        name: {
            title: 'name',
            type: 'string',
            required: true,
        },
        type: {
            title: 'type',
            type: 'string',
            required: true
        }
    }
};

var widgetCollection = new CRUDCollection({
    schema: schema,
    
    create: function(req, res, widget, cb){
        widgets.create(widget, function(err, key){
            if (err){
                return cb(true);
            } else {
                res.status.created(req.uri.child(key));
            }
        });
    },
    
    destroy: function(req, res, key, cb){
        widgets.destroy(key, function(err){
            if (err) {
                if (err === 'Not found') {
                    cb(true);
                }
                return res.status.internalServerError(err);
            } else {
                cb(null);
            }
        });
    },
    
    fetch: function(req, res, cb){
        var key = req.uri.child();
        
        widgets.read(key, function(err, widget){
            if (err) {
                if (err === 'Not found') {
                    cb(true);
                }
                return res.status.internalServerError(err);
            } else {
                cb(null, widget);
            }
        });
    },
    
    list: function(req, res, cb){
        widgets.list(function(err, widgets){
            cb(null, widgets);
        });
    }
});

var server = new Percolator({
    'autolink': true,
    'parseBody': false,
    'port': port,
    'protocol': 'http',
    'resourcePath': '/api',
    'staticDir': staticDir
});

server.route('/api/widgets', widgetCollection.handler);
server.route('/api/widgets/:key', widgetCollection.wildcard);

// server.route('/api', {
//     GET: function(req, res){
//         res.object({
//             message: 'Hello World!'
//         }).send();
//     }
// });

server.listen(function(err){
    if(err){throw err;}
    console.log('Percolator is listening on port ', server.port);
});