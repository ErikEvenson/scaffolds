/*
The Widgets edit view.
*/
'use strict';

/* global define */
/*jshint -W098 */
define([
    'app',
    'requirejs-tpl!./templates/form.tpl',
    'backbone.syphon'
], function(App, form){
    var module = App.module('Widgets.Edit.View', function(View, App, Backbone, Marionette, $, _){
             
        View.Edit = Marionette.ItemView.extend({
            clearFormErrors: function(){
                var $view = this.$el;
                var $form = $view.find('form');
                
                $form.find('.help-inline.text-danger').each(function(){
                    $(this).remove();
                });
                
                $form.find('.form-group.text-danger').each(function(){
                    $(this).removeClass('text-danger');
                });
            },
            
            events: {
                'click button.js-submit': 'submit'
            },
            
            onFormDataInvalid: function(errors){
                var $view = this.$el;
                    
                var markErrors = function(value, key){
                    var $formGroup = $view.find('#widget-' + key).parent();
                    var $errorEl = $('<span>', {
                        class: 'help-inline text-danger',
                        text: value
                    });
                    
                    $formGroup.append($errorEl).addClass('text-danger');
                };
                
                this.clearFormErrors();
                _.each(errors, markErrors);
            },
            
            submit: function(e){
                e.preventDefault(e);
                this.clearFormErrors();
                var data = Backbone.Syphon.serialize(this);
                this.trigger('form:submit', data);
            },

            template: form
        });
    });
    
    return App.Widgets.Edit.View;
});
