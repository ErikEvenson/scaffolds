'use strict';
var uuid = require('node-uuid');

var widgets = {
    '1': {
        name: 'widget name',
        type: 'widget type'
    }
};

exports.create = function(widget, cb){
    // Assumes widget is validated already
    var key = uuid.v4();
    widgets[key] = widget;
    cb(null, key);
};

exports.destroy = function(key, cb){
    var err = null;
    
    if (key in widgets) {
        delete widgets[key];
    } else {
        err = 'Not found';
    }
    
    cb(err);
};

exports.list = function(cb){
    cb(null, widgets);
};

exports.read = function(key, cb){
    var err = null;
    var widget = null;
    
    if (key in widgets) {
        widget = widgets[key];
    } else {
        err = 'Not found';
    }
    
    return cb(err, widget);
};

exports.update = function(key, widget, cb) {
    var err = null;
    
    if (key in widgets) {
        widgets[key] = widget;
    } else {
        err = 'Not found';
    }
    
    cb(err);
};