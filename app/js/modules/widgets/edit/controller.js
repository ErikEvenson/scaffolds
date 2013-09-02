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
                    
                    var fetching = App.request('widget:entity', id);
                    
                    $.when(fetching).done(function(widget){
                        var view;
                        
                        if(widget !== undefined){
                            view = new View.Edit({
                                model: widget
                            });
                            
                            view.on('form:submit', function(data){
                                var saveStatus = widget.save(data);
                    
                                if(saveStatus){
                                    // Message?
                                    console.log('SAVED');
                                } else {
                                    view.triggerMethod('form:data:invalid', widget.validationError);
                                }
                            });

                        } else {
                            view = new View.Missing();
                        }
                        
                        App.mainRegion.show(view);
                    });
                });
            }
        };
    });
    
    return App.Widgets.Edit.Controller;
});