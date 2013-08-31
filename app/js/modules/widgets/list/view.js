'use strict';

/* global define */
/*jshint -W098 */
define(['app'], function(App){
    var module = App.module('Widgets.List.View', function(View, App, Backbone,
         Marionette, $, _){

        View.Layout = Marionette.Layout.extend({
            // template: layout.tpl,
            
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
