'use strict';

var CRUDCollection = require('percolator').CRUDCollection;
var widgetsProvider = require('../providers/widgets');

module.exports = new CRUDCollection({
    schema: widgetsProvider.schema,
    updateSchema: widgetsProvider.updateSchema,
    createSchema: widgetsProvider.createSchema,
    
    create: function(req, res, widget, cb){
        widgetsProvider.create(null, widget, function(err, id){
            if (err){
                return cb(true);
            } else {
                res.status.created(req.uri.child(id));
            }
        });
    },
    
    /*jshint -W098 */
    destroy: function(req, res, id, cb){
        widgetsProvider.destroy(id, function(err){
            if (err) {
                res.status.internalServerError(err);
            } else {
                cb();
            }
        });
    },
    
    fetch: function(req, res, cb){
        var id = req.uri.child();
        
        widgetsProvider.read(id, function(err, widget){
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
        widgetsProvider.list(function(err, widgets){
            cb(null, widgets);
        });
    },
    
    update: function(req, res, id, widget, cb){
        widgetsProvider.update(id, widget, function(err){
            if (err) {
                res.status.internalServerError(err);
            } else {
                cb();
            }
        });
    },
    
    upsert: function(req, res, id, widget, cb) {
        widgetsProvider.upsert(id, widget, function(err){
            if (err) {
                res.status.internalServerError(err);
            } else {
                cb();
            }
        });
    }
});
