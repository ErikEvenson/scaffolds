/*
The Header list controller.
*/
'use strict';

/* global define */
/*jshint -W098 */
define(['app', './view'], function(App, View){
    var module = App.module('Header.List', function(List, App, Backbone,
         Marionette, $, _){

        List.Controller = {
            list: function(){
                require(['modules/header/entity'], function(){
                    // Display loading spinner
                    // var loadingView = new CommonViews.Loading();
                    // ContactManager.mainRegion.show(loadingView);
                    
                    var headers = App.request('header:entities');
                    
                    var header = new View.Headers({
                        collection: headers
                    });

                    App.headerRegion.show(header);
                });
            }
        };
    });

    return App.Header.List.Controller;
});