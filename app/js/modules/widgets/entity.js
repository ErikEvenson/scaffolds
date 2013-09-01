/*
The Widgets entities module.
*/
'use strict';

/* global define */
/*jshint -W098 */
define(['app'], function(App){
    var module = App.module('Widgets.Entities', function(Entities, App,
         Backbone, Marionette, $, _){
        
        Entities.Widget = Backbone.Model.extend({
            defaults: {
                'name': 'New widget',
                'type': 'New type'
            },
            
            urlRoot: '/api/widgets',
            
            validate: function(attributes, options){
                var errors = {};
                
                if (!_.isEmpty(errors)){
                    return errors;
                } else {
                    return;
                }
            }
        });

        Entities.Widgets = Backbone.Collection.extend({
            url: '/api/widgets',
            model: Entities.Widget,
            comparator: 'name',
            
            parse: function(response, options){
                var widgets = [];
                var items = response._items;
                
                _.each(items, function(widget){
                    widgets.push(widget);
                });

                return widgets;
            }
        });
        
        var API = {
            getWidgetEntities: function(){
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
            }
        };
    
        App.reqres.setHandler('widget:entities', function(){
            return API.getWidgetEntities();
        });
        
        App.reqres.setHandler('widget:entity:new', function(id){
            return new Entities.Widget();
        });
    });
    
    return App.Widgets.Entities;
});
