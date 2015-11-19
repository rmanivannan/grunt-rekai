module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    rekai: {
      asset1: {
        src: [
          'example/assets/textfile-one*.js'
        ],
        baseVal: "base64",
        action:"renameSrc",
        filename: 'example/fingerprint.txt',
        template: "var fp1 = \"<%= rekai %>\"; "
      },
      asset2: {
        src: [
          'example/assets/textfile-two.js'
        ],
        algorithm: "timeStamp",
        action:"createSrcCopy",
        filename: 'example/fingerprint.txt',
        template: "var fp2 = \"<%= rekai %>\"; "
      },
      asset3: {
        src: [
          'example/assets/textfile-three.js'
        ],
        filename: 'example/fingerprint.txt',
        template: "var fp3 = \"<%= rekai %>\"; "
      }
    },
    mochacli: {
      test: {
        src: ['test/*.js']
      }
    }
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-mocha-cli');

  grunt.registerTask('build', ['rekai']);
  grunt.registerTask('test', ['mochacli']);
  grunt.registerTask('default', ['rekai', 'mochacli']);
};
