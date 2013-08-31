/*
The Header entities module.
*/
'use strict';

/* global define */
/*jshint -W098 */
define(['app'], function(App){
    var module = App.module('Header.Entities', function(Entities, App,
         Backbone, Marionette, $, _){
        
        Entities.Header = Backbone.Model.extend({
        });

        Entities.Headers = Backbone.Collection.extend({
            model: Entities.Header,
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
