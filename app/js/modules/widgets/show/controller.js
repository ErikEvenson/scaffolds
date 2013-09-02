/*
The Widgets show controller.
*/
'use strict';

/* global define */
/*jshint -W098 */
define([
    'app',
    './view'
], function(App, View){
    var module = App.module('Widgets.Show', function(Show, App, Backbone,
         Marionette, $, _){

        Show.Controller = {
            show: function(id){
                require(['modules/widgets/entities'], function(){
                    // TODO loading spinner
                    
                    var fetching = App.request('widgets:entity', id);
                    
                    $.when(fetching).done(function(widget){
                        var view;
                        
                        if(widget !== undefined){
                            view = new View.Show({
                                model: widget
                            });
                            
                            view.on('widgets:edit', function(widget){
                                App.trigger('widgets:edit', widget.get('id'));
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
    
    return App.Widgets.Show.Controller;
});