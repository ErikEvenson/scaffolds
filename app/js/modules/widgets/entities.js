/*
The Widgets entities module.
*/
'use strict';

/* global define */
/*jshint -W098 */
define([
    'app',
    'config'
], function(App, config){
    var module = App.module('Widgets.Entities', function(Entities, App, Backbone, Marionette, $, _){
        Entities.Widget = Backbone.Model.extend({
            defaults: {
                'name': 'New widget',
                'type': 'New type'
            },
            
            urlRoot: config.apiRoot + '/widgets',
            
            validate: function(attrs, options) {
                var errors = {};
                
                if (!attrs.name) {
                    errors.name = 'Name can\'t be blank';
                }
                
                if (!attrs.type) {
                    errors.type = 'Type can\'t be blank';
                }
                
                if(! _.isEmpty(errors)){
                    return errors;
                }
            }
        });

        Entities.Widgets = Backbone.Collection.extend({
            comparator: 'name',
            model: Entities.Widget,

            
            parse: function(response, options){
                var widgets = [];
                var items = response._items;
                
                _.each(items, function(widget){
                    widgets.push(widget);
                });

                return widgets;
            },
            
            url: config.apiRoot + '/widgets'
        });
        
        var API = {
            getWidgets: function(){
                var widgets = new Entities.Widgets();
                var defer = $.Deferred();
            
                widgets.fetch({
                    success: function(data){
                        defer.resolve(data);
                    },
                    error: function(){
                        defer.resolve(undefined);
                    }
                });
            
                return defer.promise();
            },
            
            getWidget: function(id){
                var widget = new Entities.Widget({id: id});
                var defer = $.Deferred();
                
                widget.fetch({
                    success: function(data){
                        defer.resolve(data);
                    },
                    error: function(data){
                        defer.resolve(undefined);
                    }
                });
                
                return defer.promise();
            }
        };
    
        App.reqres.setHandler('widgets:entities', function(){
            return API.getWidgets();
        });
        
        App.reqres.setHandler('widgets:entity', function(id){
            return API.getWidget(id);
        });
        
        App.reqres.setHandler('widgets:entity:new', function(id){
            return new Entities.Widget(id);
        });
    });
    
    return App.Widgets.Entities;
});
