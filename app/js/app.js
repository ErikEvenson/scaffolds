'use strict';
/* global define */

define(['marionette'], function(Marionette){
    var App = new Marionette.Application();
    
    App.on('initialize:after', function(){
        console.log('App has initialized.');
    });
    
    return App;
});