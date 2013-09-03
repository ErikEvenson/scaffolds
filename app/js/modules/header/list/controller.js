/*
The Header list controller.
*/
'use strict';

/* global define */
/*jshint -W098 */
define([
    'app',
    './view',
    'modules/header/entities'
], function(App, View){
    var module = App.module('Header.List', function(List, App, Backbone,
         Marionette, $, _){

        List.Controller = {
            list: function(){
                var headers = App.request('header:entities');
                
                var header = new View.Headers({
                    collection: headers
                });

                App.headerRegion.show(header);
            },
            
            setActiveHeader: function(headerUrl){
                var headers = App.request('header:entities');
                
                var header = headers.find(function(header){
                    return header.get('url') === headerUrl;
                });
                
                header.select();
                headers.trigger('reset');
            }
        };
        
        App.commands.setHandler('header:setActive', function(headerUrl){
            return List.Controller.setActiveHeader(headerUrl);
        });
    });

    return App.Header.List.Controller;
});