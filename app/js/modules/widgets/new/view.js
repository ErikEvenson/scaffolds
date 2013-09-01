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
            
            onFormDataInvalid: function(errors){
                var $view = this.$el;
                    
                var clearFormErrors = function(){
                    var $form = $view.find('form');
                    
                    $form.find('.help-block.error').each(function(){
                        $(this).remove();
                    });
                    
                    $form.find('.form-group.error').each(function(){
                        $(this).removeClass('error');
                    });
                };
                    
                var markErrors = function(value, key){
                    var $formGroup = $view.find('#widget-' + key).parent();
                    var $errorEl = $('<span>', {
                        class: 'text-danger error',
                        text: value
                    });
                    
                    $formGroup.append($errorEl).addClass('error');
                };
                
                clearFormErrors();
                _.each(errors, markErrors);
            },
            
            submitClicked: function(e){
                e.preventDefault(e);
                var data = Backbone.Syphon.serialize(this);
                this.trigger('form:submit', data);
            },

            template: form
        });
    });
    
    return App.Widgets.New.View;
});
