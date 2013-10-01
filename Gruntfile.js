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
            // '<%= config.dist %>/app/js/*.js',
            // '!<%= config.dist %>/app/js/*.min.js'
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
      css: {
        options: {
          cssIn: 'app/css/main.css',
          out: 'dist/app/css/main.css'
        }
      },
      dist: {
        options: {
          appDir: './app',
          baseUrl: 'js',
          dir: 'dist/app',
          mainConfigFile: 'app/js/main.js',
          modules: [
            {
              name: 'main',
              include: [
                'html5shiv',
                'requirejs',
                'respond'
              ]
            }
          ],
          preserveLicenseComments: false,
          removedCombined: true
        }
      }
    },
      
    shell: {
      common: {
        options: {
          stdout: true,
          stderr: true,
        },
        command: [
          'echo == Copying common code from server to client...',
          'rm -rf "<%= config.app %>/common"',
          'cp -R common "<%= config.app %>/."',
        ].join('&&')
      },
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
          'cp -R ../common ../server ../package.json ../Procfile .'
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

  // Deploy distribution
  grunt.registerTask('deploy', [
    'shell:deploy'  // Deploy
  ]);

  // Set up a distribution.
  grunt.registerTask('dist', [
    'shell:common',   // Make common files available to client app
    'clean:dist',     // Clean out any old distribution
    'shell:dist',     // Create the distribution
    'requirejs:dist', // Optimize client js files
    'requirejs:css'   // Optimize client css files
  ]);
  
  // Run the server.
  grunt.registerTask('server', [
    'jshint',       // Lint
    'serverTest',   // Test
    'shell:common', // Make common files available to client app
    'shell:server'  // Start server
  ]);
};