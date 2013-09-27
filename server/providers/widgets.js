'use strict';
var uuid = require('node-uuid');

var models = {
  '1': {
    'id': '1',
    'name': 'Grand widget',
    'type': 'Useful'
  }
};

exports.schema = {
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

exports.updateSchema = exports.schema;
exports.createSchema = exports.schema;
delete exports.createSchema.properties.id;

exports.create = function(id, model, cb){
  // Assumes model is validated already
  var err = null;
  id = id || uuid.v4();
  
  if (id in models) {
    err = 'Already exists';
  } else {
    model.id = id;
    models[id] = model;
  }

  cb(err, id);
};

exports.destroy = function(id, cb){
  var err = null;
  
  if (id in models) {
    delete models[id];
  } else {
    err = 'Not found';
  }
  
  cb(err);
};

exports.list = function(cb){
  cb(null, models);
};

exports.read = function(id, cb){
  var err = null;
  var model = null;
  
  if (id in models) {
    model = models[id];
  } else {
    err = 'Not found';
  }
  
  return cb(err, model);
};

exports.update = function(id, model, cb) {
  var err = null;
  
  if (id in models) {
    models[id] = model;
  } else {
    err = 'Not found';
  }
  
  cb(err);
};

exports.upsert = function(id, model, cb) {
  if (id in models) {
    exports.update(id, model, cb);
  } else {
    exports.create(id, model, cb);
  }
};