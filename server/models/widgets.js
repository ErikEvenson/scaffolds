'use strict';

var widgets = {
    '1': {
        name: 'widget name',
        type: 'widget type'
    }
};

exports.create = function(key, name, type){
    widgets[key] = {
        name: name,
        type: type
    };
};

exports.destroy = function(key){
    delete widgets[key];
};

exports.list = function(){
    return widgets;
};

exports.read = function(key){
    return widgets[key];
};

exports.update = exports.create;