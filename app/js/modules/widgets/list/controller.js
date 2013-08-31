'use strict';

/* global define */
/*jshint -W098 */
define(['app', './view'], function(App, View){
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
                        var listView = new View.Widgets({
                            collection: widgets
                        });
                        
                        layout.on('show', function(){
                            layout.panelRegion.show(panel);
                            layout.contentRegion.show(listView);
                        });
                        
                        listView.on('itemview:widget:show', function(childView,
                             model){
                            App.trigger('widget:show', model.get('id'));
                        });
                        
                        App.mainRegion.show(layout);
                    });
                });
                
            }
        };
    });
    
    return App.Widgets.List.Controller;
});