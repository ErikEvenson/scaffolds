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
            dist: {
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
                    'echo == Creating distribution...',
                    'cp -R ../app ../server ../package.json ../Procfile .'
                ].join('&&')
            },
            deploy: {
                options: {
                    stdout: true,
                    stderr: true
                },
                command: [
                    'echo == Deploying updates to heroku...',
                    'cd <%= config.dist %>',
                    'git add --all .',
                    'git commit -m "mod"',
                    'git push origin master'
                ].join('&&')
            }
        }
    });
    
    grunt.registerTask('default', [
        'jshint',
        'serverTest',
        'dist'
    ]);
    
    grunt.registerTask('serverTest', 'mochaTest');

    grunt.registerTask('deploy', [
        'shell:deploy'
    ]);
    
    grunt.registerTask('dist', [
        'shell:dist'
    ]);
};