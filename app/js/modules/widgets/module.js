/*
The Widgets module.
*/

'use strict';
/* global define */
/*jshint -W098 */
define([
    'app',
    'modules/widgets/edit/controller',
    'modules/widgets/list/controller',
    'modules/widgets/show/controller'
], function(App, editController, listController, showController){
    var module = App.module('Widgets', function(Module, App, Backbone,
         Marionette, $, _){
             
        Module.startWithParent = false;
    });
    
    App.module('Routers.Widgets', function(ModuleRouter, App, Backbone,
         Marionette, $, _){
             
        ModuleRouter.Router = Marionette.AppRouter.extend({
            appRoutes: {
                'widgets': 'list',
                'widgets(?filter=:criterion)': 'list',
                'widgets/:id': 'show',
                'widgets/:id/edit': 'edit'
            }
        });
        
        var executeAction = function(action, arg){
            App.startModule('Widgets');
            action(arg);
            App.execute('header:setActive', 'widgets');
        };
        
        var API = {
            edit: function(id){
                executeAction(editController.edit, id);
            },
            
            list: function(criterion){
                executeAction(listController.list, criterion);
            },
            
            show: function(id){
                executeAction(showController.show, id);
            }
        };
        
        App.on('widgets:edit', function(id){
            App.navigate('widgets/' + id + '/edit');
            API.edit(id);
        });
        
        App.on('widgets:list', function(criterion){
            App.navigate('widgets');
            API.list(criterion);
        });

        App.on('widgets:show', function(id){
            App.navigate('widgets/' + id);
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