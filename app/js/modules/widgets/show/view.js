/*
The Widgets show view.
*/
'use strict';

/* global define */
/*jshint -W098 */
define([
    'app',
    'requirejs-tpl!./templates/show.tpl'
], function(App, show){
    var module = App.module('Widgets.Show.View', function(View, App, Backbone,
         Marionette, $, _){

    });
    
    return App.Widgets.Show.View;
});
