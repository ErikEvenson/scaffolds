/*
The App.
*/
'use strict';
/* global define */

define([
  'backbone',
  'marionette',
  'regions/modalRegion',
  'eeelib',
], function(Backbone, Marionette, ModalRegion, EEELib){
  var App = new Marionette.Application();

  App.Router = Marionette.AppRouter.extend({
    appRoutes: {
      '': 'home'
    }
  });
    
  App.addRegions({
    modalRegion: new ModalRegion({el: '#modal'}),
    headerRegion: '#header-region',
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
      App.Header.start();
      Backbone.history.start();
      
      // If no route is provided, show a list of widgets
      if (App.getCurrentRoute() === ''){
        App.trigger('widgets:list', null);
      }
    }
    
    EEELib.burp();
  });
  
  var API = {
    home: function(criterion){
      App.trigger('widgets:list', criterion);
    }
  };
  
  /*jshint -W031 */
  App.addInitializer(function(){
    new App.Router({
      controller: API
    });
  });
  
  return App;
});