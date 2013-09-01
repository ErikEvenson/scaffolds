/*
The Widgets module.
*/

'use strict';
/* global define */
/*jshint -W098 */
define(['app'], function(App){
    var module = App.module('Widgets', function(Module, App, Backbone,
         Marionette, $, _){
             
        Module.startWithParent = false;
    });
    
    App.module('Routers.Widgets', function(ModuleRouter, App, Backbone,
         Marionette, $, _){
             
        ModuleRouter.Router = Marionette.AppRouter.extend({
            appRoutes: {
                'widgets': 'list',
                'widgets/:id': 'show'
            }
        });
        
        var executeAction = function(action, arg){
            App.startModule('Widgets');
            action(arg);
            // App.execute("set:active:header", "widgets");
        };
        
        var API = {
            list: function(criterion){
                require(['modules/widgets/list/controller'],
                 function(controller){
                    executeAction(controller.list, criterion);
                });
            },
            
            show: function(id){
                require(['modules/widgets/show/controller'],
                 function(controller){
                    executeAction(controller.show, id);
                });
            }
        };
    
        App.on('widgets:list', function(criterion){
            App.navigate('widgets');
            API.list(criterion);
        });

        App.on('widget:show', function(id){
            App.navigate('widgets' + id);
            API.show(id);
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