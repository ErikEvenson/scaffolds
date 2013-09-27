'use strict';

var CRUDCollection = require('percolator').CRUDCollection;
var provider = require('../providers/accounts');

module.exports = new CRUDCollection({
  schema: provider.schema,
  updateSchema: provider.updateSchema,
  createSchema: provider.createSchema,
  
  create: function(req, res, model, cb){
    provider.create(null, model, function(err, id){
      if (err){
        return cb(true);
      } else {
        res.status.created(req.uri.child(id));
      }
    });
  },
  
  /*jshint -W098 */
  destroy: function(req, res, id, cb){
    provider.destroy(id, function(err){
      if (err) {
        res.status.internalServerError(err);
      } else {
        cb();
      }
    });
  },
  
  fetch: function(req, res, cb){
    var id = req.uri.child();
    
    provider.read(id, function(err, model){
      if (err) {
        if (err === 'Not found') {
          return cb(true);
        } else {
          res.status.internalServerError(err);
          return cb(true);
        }
      } else {
        cb(null, model);
      }
    });
  },
  
  list: function(req, res, cb){
    provider.list(function(err, models){
      cb(null, models);
    });
  },
  
  update: function(req, res, id, model, cb){
    provider.update(id, model, function(err){
      if (err) {
        res.status.internalServerError(err);
      } else {
        cb();
      }
    });
  },
  
  upsert: function(req, res, id, model, cb) {
    provider.upsert(id, model, function(err){
      if (err) {
        res.status.internalServerError(err);
      } else {
        cb();
      }
    });
  }
});
