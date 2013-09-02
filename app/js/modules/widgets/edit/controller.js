/*
The Widgets edit controller.
*/
'use strict';

/* global define */
/*jshint -W098 */
define([
    'app',
    './view'
], function(App, View){
    var module = App.module('Widgets.Edit', function(Edit, App, Backbone,
         Marionette, $, _){

        Edit.Controller = {
            edit: function(id){
                require(['modules/widgets/entities'], function(){
                    // TODO loading spinner
                    var layout = new View.Layout();
                    var panel = new View.Panel();
                    
                    var fetching = App.request('widgets:entity', id);
                    
                    $.when(fetching).done(function(widget){
                        var edit;
                        
                        if(widget !== undefined){
                            edit = new View.Edit({
                                model: widget
                            });
                            
                            layout.on('show', function(){
                                layout.panelRegion.show(panel);
                                layout.contentRegion.show(edit);
                            });
                            
                            edit.on('form:submit', function(data){
                                var saveStatus = widget.save(data);
                    
                                if(saveStatus){
                                    panel.triggerMethod('alert', {
                                        message: 'Widget saved.',
                                        type: 'success'
                                    });
                                } else {
                                    edit.triggerMethod('form:data:invalid', widget.validationError);
                                    panel.triggerMethod('alert', {
                                        message: 'Widget not saved.',
                                        type: 'danger'
                                    });
                                    
                                }
                            });

                        } else {
                            edit = new View.Missing();
                        }
                        
                        App.mainRegion.show(layout);
                    });
                });
            }
        };
    });
    
    return App.Widgets.Edit.Controller;
});