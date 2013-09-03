/*
The Header entities module.
*/
'use strict';

/* global define */
/*jshint -W098 */
define([
    'app',
    'modules/widgets/module',
    'backbone.picky'
], function(App){
    var module = App.module('Header.Entities', function(Entities, App, Backbone, Marionette, $, _){
        
        Entities.Header = Backbone.Model.extend({
            initialize: function(){
                var selectable = new Backbone.Picky.Selectable(this);
                _.extend(this, selectable);
            }
        });

        Entities.Headers = Backbone.Collection.extend({
            initialize: function(){
                var singleSelect = new Backbone.Picky.SingleSelect(this);
                _.extend(this, singleSelect);
            },
            
            model: Entities.Header
        });
        
        var initializeHeaders = function(){
            Entities.headers = new Entities.Headers([
                {
                    name: 'Widgets',
                    url: 'widgets'
                },
                {
                    name: 'About',
                    url: 'about'
                }
            ]);
        };
        
        var API = {
            getHeaders: function(){
                if(Entities.headers === undefined){
                    initializeHeaders();
                }
                
                return Entities.headers;
            }
        };
    
        App.reqres.setHandler('header:entities', function(){
            return API.getHeaders();
        });
    });
    
    return App.Widgets.Entities;
});
