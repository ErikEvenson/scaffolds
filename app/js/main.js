'use strict';

require.config({
    baseUrl: '/js',
    paths: {
        backbone: '../bower_components/backbone/backbone',
        'backbone.syphon':
         '../bower_components/backbone.syphon/lib/amd/backbone.syphon',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
        jquery: '../bower_components/jquery/jquery',
        json2: '../bower_components/json2/json2',
        marionette: '../bower_components/marionette/lib/backbone.marionette',
        underscore: '../bower_components/underscore/underscore',
        'requirejs-tpl': '../bower_components/requirejs-tpl/tpl',
        requirejs: '../bower_components/requirejs/require',
        respond: '../bower_components/respond/respond.src'
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
        bootstrap: {
            deps: [
                'jquery'
            ]
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

require(['jquery', 'app', 'bootstrap', 'modules/header/module'],
 function($, App){
    App.start();
});