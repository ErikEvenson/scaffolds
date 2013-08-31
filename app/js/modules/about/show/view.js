/*
The About show view.
*/
'use strict';

/* global define */
/*jshint -W098 */
define([
    'app',
    'requirejs-tpl!./templates/message.tpl'
], function(App, message){
    var module = App.module('About.Show.View', function(View, App, Backbone,
         Marionette, $, _){

        View.Message = Marionette.ItemView.extend({
            template: message
        });
    });
    
    return App.About.Show.View;
});
