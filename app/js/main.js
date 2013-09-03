'use strict';

require.config({
    baseUrl: '/js',
    paths: {
        backbone: '../bower_components/backbone/backbone',
        'backbone.picky': '../bower_components/backbone.picky/lib/backbone.picky',
        'backbone.syphon': '../bower_components/backbone.syphon/lib/amd/backbone.syphon',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
        html5shiv: '../bower_components/html5shiv/dist/html5shiv',
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
        'backbone.picky': {
            deps: [
                'backbone'
            ]
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

require([
    'jquery',
    'app',
    'bootstrap',
    'modules/widgets/module',
    'modules/about/module',
    'modules/header/module'
],
 function($, App){
    App.start();
});