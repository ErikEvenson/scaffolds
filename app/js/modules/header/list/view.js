/*
The Header list view.
*/
'use strict';

/* global define */
/*jshint -W098 */
define([
    'app',
    'requirejs-tpl!./templates/list.tpl',
    'requirejs-tpl!./templates/listItem.tpl'
], function(App, list, listItem){
    var module = App.module('Header.List.View', function(View, App, Backbone,
         Marionette, $, _){

        View.Header = Marionette.ItemView.extend({
            template: listItem,
            tagName: 'li'
        });
        
        View.Headers = Marionette.CompositeView.extend({
            template: list,
            itemView: View.Header,
            itemViewContainer: 'ul',
        });
    });
    
    return App.Header.List.View;
});
