module.exports = function (grunt) {

  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 9000,
          base: {
            path: '.',
            options: {
              index: 'test/dev/index.html',
              maxAge: 300000
            }
          }
        }
      }
    },
    watch: {
      project: {
        files: ['app.js', 'Gruntfile.js', 'src/index.html','assets/**'],
        options: {
          livereload: true
        }
      }
    },
    // Before generating any new files, remove any previously-created files.
    clean: {
      test: ['dist/public/*','test/dev/*']
    },
    targethtml: {
      dist: {
        files: {
          'dist/public/index.html': 'src/index.html'
        }
      },
      dev: {
        files: {
          'test/dev/index.html': 'src/index.html'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-targethtml');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('test', ['clean','targethtml']);
  grunt.registerTask('default', ['connect', 'watch']);

};