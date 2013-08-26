'use strict';

module.exports = function(grunt){
    require('load-grunt-tasks')(grunt);
    
    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                '{,*/}*.js',
            ]
        },
        pkg: grunt.file.readJSON('package.json')
    });
    
    grunt.registerTask('default', function(){
        console.log('Grunt default task enabled.');
    });
};