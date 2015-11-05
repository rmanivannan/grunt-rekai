module.exports = function (grunt) {
  var config = {
    pkg: grunt.file.readJSON('package.json'),
    rekai: {
      asset1: {
        src: [
          'assets/textfile-one*.js'
        ],
        baseVal: "base64",
        action:"renameSrc",
        filename: 'fingerprint.txt',
        template: "var fp1 = \"<%= rekai %>\"; "
      },
      asset2: {
        src: [
          'assets/textfile-two.js'
        ],
        algorithm: "timeStamp",
        action:"createSrcCopy",
        filename: 'fingerprint.txt',
        template: "var fp2 = \"<%= rekai %>\"; "
      },
      asset3: {
        src: [
          'assets/textfile-three.js'
        ],
        filename: 'fingerprint.txt',
        template: "var fp2 = \"<%= rekai %>\"; "
      }
    },
  }
  grunt.initConfig(config);
  grunt.loadNpmTasks("grunt-rekai");
  grunt.registerTask('default', ['rekai']);
}
