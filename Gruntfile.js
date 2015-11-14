
module.exports = function (grunt) {

  grunt.initConfig({

    jshint: {
      all: ['Gruntfile.js', 'lib/*.js', 'test/*.js']
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'mocha-unfunk-reporter'
        },
        src: ['tests/*_test.js']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');


  grunt.registerTask('default', ['jshint', 'mochaTest']);

};
