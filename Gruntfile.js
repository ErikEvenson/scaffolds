'use strict';

module.exports = function(grunt){
    require('load-grunt-tasks')(grunt);
    
    var config = {
        app: 'app',
        dist: 'dist',
        herokuAppName: 'scaffolds'
    };
    
    grunt.initConfig({
        config: config,
        
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= config.dist %>'
                    ]
                }]
            },
            forDeploy: {
                files: [{
                    dot: true,
                    src: [
                        '<%= config.dist %>/app/js/*.js',
                        '!<%= config.dist %>/app/js/*.min.js'
                    ]
                }]
            },
            server: '.tmp'
        },
        
        bower: {
            options: {
                baseUrl: 'app/js'
            },
            all: {
                rjsConfig: '<%= config.app %>/js/main.js'
            }
        },
        
        jshint: {
            all: [
                '*.js',
                'app/**/*.js',
                '!app/**/*.min.js',
                '!app/bower_components/**/*.js',
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
        
        preprocess: {
            options: {
                context : {}
            },
            inline: {
                src: ['dist/**/*.jade'],
                options: {
                    inline: true
                }
            }
        },
        
        requirejs: {
            dist: {
                options: {
                    baseUrl: 'app/js',
                    mainConfigFile: 'app/js/main.js',
                    name: 'main',
                    out: 'app/js/main.min.js'
                }
            }
        },
          
        shell: {
            dist: {
                options: {
                    stdout: true,
                    stderr: true
                },
                command: [
                    'mkdir <%= config.dist %>',
                    'cd <%= config.dist %>',
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
            },
            server: {
                options: {
                    stdout: true,
                    stderr: true
                },
                command: [
                    'foreman start'
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
        'requirejs',
        'clean:dist',
        'shell:dist',
        'preprocess',
        'clean:forDeploy'
    ]);
    
    grunt.registerTask('server', [
        'jshint',
        'serverTest',
        'shell:server'
    ]);
};