/*
The Widgets new view.
*/
'use strict';

/* global define */
/*jshint -W098 */
define([
    'app',
    'requirejs-tpl!./templates/form.tpl',
    'backbone.syphon'
], function(App, form){
    var module = App.module('Widgets.New.View', function(View, App, Backbone,
         Marionette, $, _){
             
        View.Widget = Marionette.ItemView.extend({
            events: {
                'click button.js-submit': 'submitClicked'
            },
            
            submitClicked: function(e){
                e.preventDefault(e);
                var data = Backbone.Syphon.serialize(this);
                console.log(data);
                this.trigger('form:submit', data);
            },

            template: form
        });
    });
    
    return App.Widgets.New.View;
});
