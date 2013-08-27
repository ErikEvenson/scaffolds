'use strict';

require.config({
    baseUrl: '/app/js',
    paths: {
        bootstrap: '../../bower_components/bootstrap/dist/js/bootstrap',
        jquery: '../../bower_components/jquery/jquery'
    }
});


require(['jquery'], function($){
    console.log('jQuery version: ', $.fn.jquery);
});