'use strict';
var uuid = require('node-uuid');

var widgets = {
    '1': {
        'id': '1',
        'name': 'widget name',
        'type': 'widget type'
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

exports.create = function(id, widget, cb){
    // Assumes widget is validated already
    var err = null;
    id = id || uuid.v4();
    
    if (id in widgets) {
        err = 'Alread exists';
    } else {
        widget.id = id;
        widgets[id] = widget;
    }

    cb(err, id);
};

exports.destroy = function(id, cb){
    var err = null;
    
    if (id in widgets) {
        delete widgets[id];
    } else {
        err = 'Not found';
    }
    
    cb(err);
};

exports.list = function(cb){
    cb(null, widgets);
};

exports.read = function(id, cb){
    var err = null;
    var widget = null;
    
    if (id in widgets) {
        widget = widgets[id];
    } else {
        err = 'Not found';
    }
    
    return cb(err, widget);
};

exports.update = function(id, widget, cb) {
    var err = null;
    
    if (id in widgets) {
        widgets[id] = widget;
    } else {
        err = 'Not found';
    }
    
    cb(err);
};

exports.upsert = function(id, widget, cb) {
    if (id in widgets) {
        exports.update(id, widget, cb);
    } else {
        exports.create(id, widget, cb);
    }
};