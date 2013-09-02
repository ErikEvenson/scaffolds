/*
The Widgets show view.
*/
'use strict';

/* global define */
/*jshint -W098 */
define([
    'app',
    'requirejs-tpl!/js/templates/alert.tpl',
    'requirejs-tpl!/js/templates/layout.tpl',
    'requirejs-tpl!./templates/missing.tpl',
    'requirejs-tpl!./templates/panel.tpl',
    'requirejs-tpl!./templates/show.tpl'
], function(App, alertTpl, layout, missing, panel, show){
    var module = App.module('Widgets.Show.View', function(View, App, Backbone, Marionette, $, _){

        View.Layout = Marionette.Layout.extend({
            template: layout,
        
            regions: {
                panelRegion: '#panel-region',
                contentRegion: '#content-region'
            }
        });
    
        View.Missing = Marionette.ItemView.extend({
            template: missing
        });
        
        View.Panel = Marionette.ItemView.extend({
            triggers: {
                'click button.js-edit': 'widgets:edit',
                'click button.js-list': 'widgets:list'
            },
            
            onAlert: function(alert){
                this.$el.find('.alert-area').append(alertTpl(alert));
            },
            
            template: panel
        });
        
        View.Show = Marionette.ItemView.extend({
            template: show
        });
        
    });
    
    return App.Widgets.Show.View;
});
