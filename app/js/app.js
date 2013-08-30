'use strict';
/* global define */

define(['backbone', 'marionette'], function(Backbone, Marionette){
    var App = new Marionette.Application();
    
    App.addRegions({
        mainRegion: '#main-region'
    });
    
    App.on('initialize:after', function(){
        if (Backbone.history) {
            require(['apps/widgets/widgets'], function(){
                Backbone.history.start();
            });
        }
    });
    
    return App;
});