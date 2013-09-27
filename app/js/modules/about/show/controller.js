/*
The About show controller.
*/
'use strict';

/* global define */
/*jshint -W098 */
define(['app', './view'], function(App, View){
  var module = App.module('About.Show', function(Show, App, Backbone,
     Marionette, $, _){

    Show.Controller = {
      show: function(){
        var view = new View.Message();
        App.mainRegion.show(view);
      }
    };
  });
  
  return App.About.Show.Controller;
});