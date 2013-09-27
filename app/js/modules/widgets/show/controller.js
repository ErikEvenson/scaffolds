/*
The Widgets show controller.
*/
'use strict';

/* global define */
/*jshint -W098 */
define([
  'app',
  './view',
  'modules/widgets/entities'
], function(App, View){
  var module = App.module('Widgets.Show', function(Show, App, Backbone,
     Marionette, $, _){

    Show.Controller = {
      show: function(id){
        // TODO loading spinner
        var fetching = App.request('widgets:entity', id);
        var layout = new View.Layout();
        var panel = new View.Panel();
        var show;
        
        panel.on('widgets:list', function(){
          App.trigger('widgets:list');
        });
        
        $.when(fetching).done(function(widget){
          if(widget !== undefined){
            show = new View.Show({
              model: widget
            });
            
            panel.on('widgets:edit', function(){
              App.trigger('widgets:edit', widget.get('id'));
            });
          } else {
            show = new View.Missing();
          }
          
          layout.on('show', function(){
            layout.panelRegion.show(panel);
            layout.contentRegion.show(show);
          });

          App.mainRegion.show(layout);
        });
      }
    };
  });
  
  return App.Widgets.Show.Controller;
});