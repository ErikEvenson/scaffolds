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
                'click button.js-submit': 'submit'
            },
            
            onFormDataInvalid: function(errors){
                var $view = this.$el;
                    
                var clearFormErrors = function(){
                    var $form = $view.find('form');
                    
                    $form.find('.help-inline.text-danger').each(function(){
                        $(this).remove();
                    });
                    
                    $form.find('.form-group.text-danger').each(function(){
                        $(this).removeClass('text-danger');
                    });
                };
                    
                var markErrors = function(value, key){
                    var $formGroup = $view.find('#widget-' + key).parent();
                    var $errorEl = $('<span>', {
                        class: 'help-inline text-danger',
                        text: value
                    });
                    
                    $formGroup.append($errorEl).addClass('text-danger');
                };
                
                clearFormErrors();
                _.each(errors, markErrors);
            },
            
            submit: function(e){
                e.preventDefault(e);
                var data = Backbone.Syphon.serialize(this);
                this.trigger('form:submit', data);
            },

            template: form
        });
    });
    
    return App.Widgets.New.View;
});
