'use strict';
/* global define */

define(['backbone', 'marionette'], function(Backbone, Marionette){
    var App = new Marionette.Application();
    
    App.addRegions({
        mainRegion: '#main-region'
    });
    
    App.navigate = function(route, options){
        if (!options) {
            options = {};
        }

        Backbone.history.navigate(route, options);
    };
    
    App.getCurrentRoute = function(){
        return Backbone.history.fragment;
    };
    
    App.startModule = function(moduleName, args){
        var currentModule = moduleName ? App.module(moduleName) : null;
        
        if (App.currentModule !== currentModule){
            if (App.currentModule){
                App.currentModule.stop();
            }
            
            App.currentModule = currentModule;
            
            if (currentModule){
                currentModule.start(args);
            }
        }
    };
    
    App.on('initialize:after', function(){
        if (Backbone.history) {
            require(['modules/widgets/module'], function(){
                Backbone.history.start();
            });
        }
    });
    
    return App;
});