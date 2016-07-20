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
        files: ['app.js', 'Gruntfile.js', 'src/index.html','assets/**','test/dev/*'],
        options: {
          livereload: true
        }
      }
    },
    babel: {
        options: {
            sourceMap: true,
            presets: ['es2015']
        },
        dist: {
            files: {
                'dist/public/js/app.js': 'src/js/app.js',
                'test/dev/js/app.js': 'src/js/app.js'
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

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-targethtml');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('clean-dir', ['clean']);
  grunt.registerTask('build-client', ['clean', 'babel', 'targethtml']);
  grunt.registerTask('build', ['clean-dir','build-client', 'connect', 'watch']);

};