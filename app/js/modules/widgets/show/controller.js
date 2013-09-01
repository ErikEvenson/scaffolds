/*
The Widgets show controller.
*/
'use strict';

/* global define */
/*jshint -W098 */
define([
    'app',
    './view'
], function(App, View){
    var module = App.module('Widgets.Show', function(Show, App, Backbone,
         Marionette, $, _){

        Show.Controller = {
            show: function(id){
                console.log('SHOWING ' + id);
            }
        };
    });
    
    return App.Widgets.Show.Controller;
});