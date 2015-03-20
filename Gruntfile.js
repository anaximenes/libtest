var rewriteRulesSnippet = require('grunt-connect-rewrite/lib/utils').rewriteRequest;
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    revision: {
      options: {
        property: 'meta.revision',
        ref: 'HEAD',
        short: true
      }
    },
    copy: {
      main: {
        files: [
          // includes files within path and its sub-directories
           {expand: true, cwd: 'js/modules/nls/', src: ['**'], dest: 'build/nls'}
        ],
      },
    },
    targethtml: {
      prod: {
        options: {
          curlyTags: {
            buildDate:    '<%= grunt.template.today("yyyy-mm-dd") %>',
            buildCommit:  '<%= meta.revision %>'
          }
        },
        files: {
          'index.prod.html': 'index.html'
        }
      }
    },


    requirejs: {
      main: {
        options: {
          baseUrl: './js',
          mainConfigFile: "js/config.build.js",
          name: "main",
          out: "./build/optimized.js"
        }
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'js/**/*.js'],
      options: {
        asi: true,
        browser: true,
        globals: {
          jQuery: true
        },
      },
    },
    connect: {
      options: {
        port: 8000
      },
      rules: [
        // Internal rewrite
        { from: '^/vendor/(.*)$', to: '/vendor/$1' },
        { from: '^/reader/(.*)$', to: '/reader/$1' },
        { from: '^/img/(.*)$', to: '/img/$1' },
        { from: '^/css/(.*)$', to: '/css/$1' },
        { from: '^/js/(.*)$', to: '/js/$1' },
        { from: '^/templates/(.*)$', to: '/templates/$1' },
        { from: '^/build/(.*)$', to: '/build/$1' },
        { from: '^/(.*)', to: '/index.prod.html' },
        // Internal rewrite
      ],
      development: {
        options: {
          middleware: function (connect, options) {
            var middlewares = [];

            // RewriteRules support
            middlewares.push(rewriteRulesSnippet);

            if (!Array.isArray(options.base)) {
              options.base = [options.base];
            }

            var directory = options.directory || options.base[options.base.length - 1];
            options.base.forEach(function (base) {
              // Serve static files.
              middlewares.push(connect.static(base));
            });

            return middlewares;
          }
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-targethtml');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-connect-rewrite');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-git-revision');

  // Default task(s).
  grunt.registerTask('server', ['configureRewriteRules', 'connect:development::keepalive']);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('prod', ['revision', 'targethtml:prod', 'requirejs', 'copy']);

};
