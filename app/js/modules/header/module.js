/*
The Header module.
*/

'use strict';
/* global define */
/*jshint -W098 */
define(['app'], function(App){
    var module = App.module('Header', function(Module, App, Backbone,
         Marionette, $, _){
             
        Module.startWithParent = true;
    });
    
    App.module('Routers.Header', function(ModuleRouter, App, Backbone,
         Marionette, $, _){
             
        ModuleRouter.Router = Marionette.AppRouter.extend({
            appRoutes: {
            }
        });
        
        var executeAction = function(action, arg){
            action(arg);
        };
        
        var API = {
            list: function(){
                require(['modules/header/list/controller'],
                 function(controller){
                    executeAction(controller.list);
                });
            }
        };
    
        App.Header.on('start', function(){
            API.list();
        });

        /*jshint -W031 */
        App.addInitializer(function(){
            new ModuleRouter.Router({
                controller: API
            });
        });
    });

    return App.Header;
});