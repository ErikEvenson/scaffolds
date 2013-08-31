'use strict';

/* global define */
/*jshint -W098 */
define(['app', './view'], function(App, View){
    var module = App.module('Widgets.List', function(List, App, Backbone,
         Marionette, $, _){

        List.Controller = {
            list: function(criterion){
                require(['modules/widgets/entity'], function(){
                    // var loadingView = new CommonViews.Loading();
                    // ContactManager.mainRegion.show(loadingView);

                    var fetchingWidgets = App.request('widget:entities');
                
                    $.when(fetchingWidgets).done(function(widgets){
                        console.log(widgets);
                    });
                });
                
            }
        };
    });
    
    return App.Widgets.List.Controller;
});