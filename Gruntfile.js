'use strict';

module.exports = function(grunt){
    require('load-grunt-tasks')(grunt);
    
    var config = {
        dist: 'dist',
        herokuAppName: 'scaffolds'
    };
    
    grunt.initConfig({
        config: config,
        
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                '{,*/}*.js',
            ]
        },
        
        pkg: grunt.file.readJSON('package.json'),
        
        shell: {
            deploy: {
                options: {
                    stdout: true,
                    stderr: true
                },
                command: [
                    'echo == Removing old dist directory...',
                    'rm -rf <%= config.dist %>',
                    'echo == Creating new dist directory...',
                    'mkdir <%= config.dist %>',
                    'cd <%= config.dist %>',
                    'echo == Cloning heroku repo...',
                    'git clone git@heroku.com:scaffolds.git .',
                    'rm -rf *',
                    'echo == Deploying updates to heroku...',
                    'cp ../server.js ../package.json ../Procfile .',
                    'git add .',
                    'git commit -m "mod"',
                    'git push origin master'
                ].join('&&')
            }
        }
    });
    
    grunt.registerTask('default', function(){
        console.log('Grunt default task enabled.');
    });
    
    grunt.registerTask('deploy', [
        'shell:deploy'
    ]);
};