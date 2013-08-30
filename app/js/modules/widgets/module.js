'use strict';
/* global define */

/*jshint -W098 */
define(['app'], function(App){
    App.module('Widgets', function(Widgets, App, Backbone, Marionette, $, _){
        Widgets.startWithParent = false;
        
        Widgets.onStart = function(){
            console.log('Starting Widgets');
        };
        
        Widgets.onStop = function(){
            console.log('Stopping Widgets');
        };
    });
    
    return App.Widgets;
});