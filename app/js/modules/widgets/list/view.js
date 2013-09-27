/*
The Widgets list view.
*/
'use strict';

/* global define */
/*jshint -W098 */
define([
  'app',
  'requirejs-tpl!../../../templates/alert.tpl',
  'requirejs-tpl!../../../templates/layout.tpl',
  'requirejs-tpl!./templates/list.tpl',
  'requirejs-tpl!./templates/listItem.tpl',
  'requirejs-tpl!./templates/empty.tpl',
  'requirejs-tpl!./templates/panel.tpl'
], function(App, alertTpl, layout, list, listItem, empty, panel){
  var module = App.module('Widgets.List.View', function(View, App, Backbone, Marionette, $, _){

    View.EmptyView = Marionette.ItemView.extend({
      template: empty
    });

    View.Layout = Marionette.Layout.extend({
      template: layout,
      
      regions: {
        panelRegion: '#panel-region',
        contentRegion: '#content-region'
      }
    });
    
    View.Panel = Marionette.ItemView.extend({
      onAlert: function(alert){
        this.$el.find('.alert-area').append(alertTpl(alert));
      },

      template: panel,
      
      triggers: {
        'click button.js-new': 'widgets:new'
      }
    });
    
    View.Widget = Marionette.ItemView.extend({
      template: listItem,
      tagName: 'tr',
      
      events: {
        'click td button.js-edit': 'edit',
        'click td button.js-delete': 'delete',
        'click td button.js-show': 'show'
      },
      
      delete: function(e){
        e.preventDefault();
        e.stopPropagation();
        this.trigger('widgets:delete', this.model);
      },

      edit: function(e){
        e.preventDefault();
        e.stopPropagation();
        this.trigger('widgets:edit', this.model);
      },
      
      show: function(e){
        e.preventDefault();
        e.stopPropagation();
        this.trigger('widgets:show', this.model);
      }
    });
    
    View.Widgets = Marionette.CompositeView.extend({
      tagName: 'table',
      className: 'table table-hover',
      template: list,
      emptyView: View.EmptyView,
      itemView: View.Widget,
      itemViewContainer: 'tbody',
      
      initialize: function(){
        this.listenTo(this.collection, 'reset', function(){
          this.appendHtml = function(collectionView, itemView, index){
            collectionView.$el.append(itemView.el);
          };
        });
      },
      
      onCompositeCollectionRendered: function(){
        this.appendHtml = function(collectionView, itemView, index){
          collectionView.$el.prepend(itemView.el);
        };
      }
    });
  });
  
  return App.Widgets.List.View;
});
