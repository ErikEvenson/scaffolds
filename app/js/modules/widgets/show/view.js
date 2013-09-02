/*
The Widgets show view.
*/
'use strict';

/* global define */
/*jshint -W098 */
define([
    'app',
    'requirejs-tpl!./templates/missing.tpl',
    'requirejs-tpl!./templates/show.tpl'
], function(App, missing, show){
    var module = App.module('Widgets.Show.View', function(View, App, Backbone,
         Marionette, $, _){

        View.Missing = Marionette.ItemView.extend({
            template: missing
        });
        
        View.Show = Marionette.ItemView.extend({
            edit: function(e){
                e.preventDefault();
                this.trigger('widgets:edit', this.model);
            },
            
            events: {
                'click button.js-edit': 'edit'
            },
            
            template: show
        });
        
    });
    
    return App.Widgets.Show.View;
});
