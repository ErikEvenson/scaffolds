'use strict';

require.config({
    baseUrl: '/js',
    paths: {
        backbone: '../bower_components/backbone/backbone',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
        jquery: '../bower_components/jquery/jquery',
        json2: '../bower_components/json2/json2',
        marionette: '../bower_components/marionette/lib/backbone.marionette',
        underscore: '../bower_components/underscore/underscore'
    },
    shim: {
        backbone: {
            deps: [
                'underscore',
                'jquery',
                'json2'
            ],
            exports: 'Backbone'
        },
        marionette: {
            deps: [
                'backbone'
            ],
            exports: 'Marionette'
        },
        underscore: {
            deps: [
                'jquery'
            ],
            exports: '_'
        }
    }
});

require(['jquery', 'app'], function($, App){
    console.log('Starting App');
    App.start();
});