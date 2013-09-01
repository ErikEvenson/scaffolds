/*
The Widgets list controller.
*/
'use strict';

/* global define */
/*jshint -W098 */
define([
    'app',
    './view',
    'regions/modalRegion'
], function(App, View, ModalRegion){
    var module = App.module('Widgets.List', function(List, App, Backbone,
         Marionette, $, _){

        List.Controller = {
            list: function(criterion){
                require(['modules/widgets/entity'], function(){
                    // Display loading spinner
                    // var loadingView = new CommonViews.Loading();
                    // ContactManager.mainRegion.show(loadingView);
                    
                    var layout = new View.Layout();
                    var panel = new View.Panel();
                    
                    var fetchingWidgets = App.request('widget:entities');
                
                    $.when(fetchingWidgets).done(function(widgets){
                        var list = new View.Widgets({
                            collection: widgets
                        });
                        
                        layout.on('show', function(){
                            layout.panelRegion.show(panel);
                            layout.contentRegion.show(list);
                        });
                        
                        list.on('itemview:widget:show', function(childView,
                             model){
                            App.trigger('widget:show', model.get('id'));
                        });
                        
                        panel.on('widget:new', function(){
                            require(['modules/widgets/new/view'],
                             function(NewView){
                                var newWidget =
                                 App.request('widget:entity:new');
                                 
                                var newView = new NewView.Widget({
                                    model: newWidget
                                });
                                
                                // App.modalRegion = new ModalRegion(
                                //     {el:'#modal'}
                                // );
                                
                                App.modalRegion.show(newView);
                            });
                        });
                        
                        App.mainRegion.show(layout);
                    });
                });
                
            }
        };
    });
    
    return App.Widgets.List.Controller;
});