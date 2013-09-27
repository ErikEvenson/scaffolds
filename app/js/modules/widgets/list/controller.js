/*
The Widgets list controller.
*/
'use strict';

/* global define */
/*jshint -W098 */
define([
  'app',
  './view',
  'regions/modalRegion',
  'modules/widgets/new/view',
  'modules/widgets/entities'
], function(App, View, ModalRegion, NewView){
  var module = App.module('Widgets.List', function(List, App, Backbone, Marionette, $, _){
    var getIdFromXhrLocation = function(xhr){
      var id;
      
      if(xhr.status === 201){
        var location = xhr.getResponseHeader('location');
        var fragments = location.split('/');
        id = fragments[fragments.length - 1];
      }
      
      return id;
    };
    
    var newModal = function(panel, widgets){
      var newWidget = App.request('widgets:entity:new');
      
      var newView = new NewView.Widget({
        model: newWidget
      });
      
      newView.on('form:submit', function(data){
        var saveStatus = newWidget.save(
          data,
          {
            error: function(model, xhr, options){
              var id = getIdFromXhrLocation(xhr);
              
              if(id){
                model.set('id', id);
                widgets.add(model);
              }
            }
          }
        );
        
        if(saveStatus){
          panel.triggerMethod('alert', {
            message: 'New widget created.',
            type: 'success'
          });

          App.modalRegion.reset();
        } else {
          newView.triggerMethod('form:data:invalid', newWidget.validationError);
        }
      });
      
      App.modalRegion.show(newView);
    };

    List.Controller = {
      list: function(criterion){
        // Display loading spinner
        var layout = new View.Layout();
        var panel = new View.Panel();
        
        var fetching = App.request('widgets:entities');
      
        $.when(fetching).done(function(widgets){
          var list = new View.Widgets({
            collection: widgets
          });
          
          layout.on('show', function(){
            layout.panelRegion.show(panel);
            layout.contentRegion.show(list);
          });

          list.on('itemview:widgets:delete', function(childView, model){
            model.destroy({
              error: function(){
                panel.triggerMethod('alert', {
                  message: 'Server did not delete widget.',
                  type: 'danger'
                });
              },
              success: function(){
                panel.triggerMethod('alert', {
                  message: 'Widget deleted.',
                  type: 'success'
                });
              }
            });
          });

          list.on('itemview:widgets:edit', function(childView, model){
            App.trigger('widgets:edit', model.get('id'));
          });
          
          list.on('itemview:widgets:show', function(childView, model){
            App.trigger('widgets:show', model.get('id'));
          });
          
          panel.on('widgets:new', function(){
            newModal(panel, widgets);
          });
          
          App.mainRegion.show(layout);
        });
      }
    };
  });
  
  return App.Widgets.List.Controller;
});