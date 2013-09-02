'use strict';

var path = require('path');
var Percolator = require('percolator').Percolator;
var port = process.env.PORT || 5000;
var staticDir = path.join(__dirname, '../app');
var CRUDCollection = require('percolator').CRUDCollection;
// var SomeDB = require('SomeDB');
// var db = new SomeDB();
var widgets = require('./models/widgets');

var schema = {
    description : 'A widget',
    type: 'object',
    properties: {
        id: {
            title: 'id',
            type: 'string',
            required: true
        },
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

var updateSchema = schema;
var createSchema = schema;
delete createSchema.properties.id;

var widgetCollection = new CRUDCollection({
    schema: schema,
    updateSchema: updateSchema,
    createSchema: createSchema,
    
    create: function(req, res, widget, cb){
        widgets.create(null, widget, function(err, id){
            if (err){
                return cb(true);
            } else {
                res.status.created(req.uri.child(id));
            }
        });
    },
    
    /*jshint -W098 */
    destroy: function(req, res, id, cb){
        widgets.destroy(id, function(err){
            if (err) {
                res.status.internalServerError(err);
            } else {
                cb();
            }
        });
    },
    
    fetch: function(req, res, cb){
        var id = req.uri.child();
        
        widgets.read(id, function(err, widget){
            if (err) {
                if (err === 'Not found') {
                    return cb(true);
                } else {
                    res.status.internalServerError(err);
                    return cb(true);
                }
            } else {
                cb(null, widget);
            }
        });
    },
    
    list: function(req, res, cb){
        widgets.list(function(err, widgets){
            cb(null, widgets);
        });
    },
    
    update: function(req, res, id, widget, cb){
        widgets.update(id, widget, function(err){
            if (err) {
                res.status.internalServerError(err);
            } else {
                cb();
            }
        });
    },
    
    upsert: function(req, res, id, widget, cb) {
        widgets.upsert(id, widget, function(err){
            if (err) {
                res.status.internalServerError(err);
            } else {
                cb();
            }
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
server.route('/api/widgets/:id', widgetCollection.wildcard);

server.listen(function(err){
    if(err){throw err;}
    console.log('Percolator is listening on port ', server.port);
});