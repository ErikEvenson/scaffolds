'use strict';
/* global define */

/*jshint -W098 */
define(['app'], function(App){
    var module = App.module('Widgets', function(Module, App, Backbone,
         Marionette, $, _){
             
        Module.startWithParent = false;
        
        Module.onStart = function(){
            console.log('Starting Widgets');
        };
        
        Module.onStop = function(){
            console.log('Stopping Widgets');
        };
    });
    
    App.module('Routers.Widgets', function(ModuleRouter, App, Backbone,
         Marionette, $, _){
             
        ModuleRouter.Router = Marionette.AppRouter.extend({
            appRoutes: {
                'widgets': 'list'
            }
        });
        
        var executeAction = function(action, arg){
            App.startModule('Widgets');
            action(arg);
            // App.execute("set:active:header", "widgets");
        };
        
        var API = {
            list: function(){
                console.log('listing widgets....');
            }
        };
    
        App.on('widgets:list', function(){
            App.navigate('widgets');
            API.list();
        });

        /*jshint -W031 */
        App.addInitializer(function(){
            new ModuleRouter.Router({
                controller: API
            });
        });
    });
    
    return App.Widgets;
});