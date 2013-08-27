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
            all: [
                '*.js',
                'app/**/*.js',
                'server/**/*.js',
                'test/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/server/**/*.js']
            }
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
                    'cp app server ../server.js ../package.json ../Procfile .',
                    'git add .',
                    'git commit -m "mod"',
                    'git push origin master'
                ].join('&&')
            }
        }
    });
    
    grunt.registerTask('default', [
        'jshint',
        'serverTest'
    ]);
    
    grunt.registerTask('serverTest', 'mochaTest');
    
    grunt.registerTask('deploy', [
        'shell:deploy'
    ]);
};