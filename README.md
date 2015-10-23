# Kairēkai(Tamil) - Fingerprint(English) 
Grunt task for Fingerprinting based on the file modified time / Nodejs Crypto md5 algorithm.
This Grunt task can be used for assets versioning  

## Setup

Install `grunt-rekai`:

```
npm install grunt-rekai --save-dev
```

## Example

``` javascript

grunt.initConfig({
  rekai: {
    assetsOne: {
      src: [
        'resources/js/assetsName.js'
      ],
      filename: 'views/fingerprint-fpOldieCommon.jsp',
      updateTS: true,    // by default false, true - fingerprint based on the time modified, false - node crypto md5 algorithm based output.
      baseVal: "base64", // by default hex, hex, base64
      action:false, // renameSrc, createSrcCopy, default / false - just extract fingetprint  
      template: "String fpOldieCommon = \"<%= rekai %>\"; " //mandatory <%= rekai %> will be replaced with fingerprint value
    }
  }
});
grunt.loadNpmTasks('grunt-rekai');

```
