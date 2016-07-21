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
    babel: {
        options: {
            sourceMap: true,
            presets: ['es2015']
        },
        dist: {
            files: [{
              expand:true,
              cwd: 'src/js/',
              src: ['*.js'],
              dest : 'dist/public/js/'
            }]
        },
        dev : {
          files: [{
              expand:true,
              cwd: 'src/js/',
              src: ['*.js'],
              dest : 'test/dev/js/'
            }]
        }
    },
    watch: {
      scripts: {
        files: "src/js/*.js",
        tasks: ["babel"]
      },
      project: {
        files: ['app.js', 'Gruntfile.js', 'src/index.html','assets/**','test/dev/*'],
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

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-targethtml');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('rmdir', ['clean']);
  grunt.registerTask('build-client', ['clean', 'babel', 'targethtml']);
  grunt.registerTask('build', ['clean-dir','build-client', 'connect', 'watch']);

};