
module.exports = function (grunt) {

  grunt.initConfig({

    jshint: {
      all: ['Gruntfile.js', 'lib/*.js', 'test/*.js']
    },

    mochaTest: {
      unit: {
        options: {
          reporter: 'mocha-unfunk-reporter'
        },
        src: ['tests/unit/*_test.js']
      },
      acceptance: {
        options: {
          reporter: 'mocha-unfunk-reporter'
        },
        src: ['tests/acceptance/*_test.js']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');


  grunt.registerTask('default', ['jshint', 'mochaTest']);

};
