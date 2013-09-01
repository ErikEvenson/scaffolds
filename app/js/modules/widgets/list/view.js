/*
The Widgets list view.
*/
'use strict';

/* global define */
/*jshint -W098 */
define([
    'app',
    'requirejs-tpl!./templates/layout.tpl',
    'requirejs-tpl!./templates/list.tpl',
    'requirejs-tpl!./templates/listItem.tpl',
    'requirejs-tpl!./templates/empty.tpl',
    'requirejs-tpl!./templates/panel.tpl'
], function(App, layout, list, listItem, empty, panel){
    var module = App.module('Widgets.List.View', function(View, App, Backbone,
         Marionette, $, _){

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
            template: panel,
            
            triggers: {
                'click button.js-new': 'widget:new'
            }
        });
        
        View.Widget = Marionette.ItemView.extend({
            template: listItem,
            tagName: 'tr',
            
            events: {
                'click td button.js-show': 'show'
            },
            
            show: function(e){
                e.preventDefault();
                e.stopPropagation();
                this.trigger('widget:show', this.model);
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
