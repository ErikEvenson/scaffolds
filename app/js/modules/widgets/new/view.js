/*
The Widgets new view.
*/
'use strict';

/* global define */
/*jshint -W098 */
define([
    'app',
    'requirejs-tpl!./templates/form.tpl'
], function(App, form){
    var module = App.module('Widgets.New.View', function(View, App, Backbone,
         Marionette, $, _){
             
        View.Form = Marionette.ItemView.extend({
            template: form,
            
            events: {
                
            }
        });
    });
    
    return App.Widgets.New.View;
});
