'use strict';

require.config({
    baseUrl: '/js',
    paths: {
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
        jquery: '../bower_components/jquery/jquery'
    }
});

require(['app'], function(app){
    console.log(app);
});
