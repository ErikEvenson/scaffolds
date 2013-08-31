/*
The About module.
*/

'use strict';
/* global define */
/*jshint -W098 */
define(['app'], function(App){
    var module = App.module('About', function(Module, App, Backbone,
         Marionette, $, _){
             
        Module.startWithParent = false;
    });
    
    App.module('Routers.About', function(ModuleRouter, App, Backbone,
         Marionette, $, _){
             
        ModuleRouter.Router = Marionette.AppRouter.extend({
            appRoutes: {
                'about': 'show'
            }
        });
        
        var executeAction = function(action, arg){
            App.startModule('About');
            action(arg);
        };
        
        var API = {
            show: function(criterion){
                require(['modules/about/show/controller'],
                 function(controller){
                    executeAction(controller.show);
                });
            }
        };
    
        App.on('about:show', function(criterion){
            App.navigate('about');
            API.showAbout();
        });

        /*jshint -W031 */
        App.addInitializer(function(){
            new ModuleRouter.Router({
                controller: API
            });
        });
    });
    
    return App.About;
});
