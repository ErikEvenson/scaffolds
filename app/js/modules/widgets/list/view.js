'use strict';

/* global define */
/*jshint -W098 */
define([
    'app',
    'requirejs-tpl!modules/widgets/list/templates/layout.tpl'
], function(App, layout){
    var module = App.module('Widgets.List.View', function(View, App, Backbone,
         Marionette, $, _){

        View.Layout = Marionette.Layout.extend({
            template: layout,
            
            regions: {
                panelRegion: '#panel-region',
                contentRegion: '#content-region'
            }
        });
        
        View.Panel = Marionette.ItemView.extend({
            
        });
        
        View.Widget = Marionette.ItemView.extend({
            
        });
        
        View.Widgets = Marionette.CompositeView.extend({
            
        });
        
        View.EmptyView = Marionette.ItemView.extend({
            
        });
    });
    
    return App.Widgets.List.View;
});
