# Rēkai(Tamil) - Fingerprint(English) 
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
      
      filename: 'fingerprint.txt',
      //file where to save fingerprint template output
      
      algorithm: "timeStamp",
      //"timeStamp"-fingerprint based on the time modified,"md5"-node crypto md5 algorithm based output. default to "md5".
      
      baseVal: "base64", 
      //crypto out-put value in "hex"(base16), "base64". default value - "hex".
      
      action: "createSrcCopy", 
      //"renameSrc","createSrcCopy","none". default - false - just extract fingetprint & it doesnt rename or copy the file. 
      
      template: "String fpOldieCommon = \"<%= rekai %>\"; "
      //mandatory <%= rekai %> will be replaced with fingerprint value
    }
  }
});
grunt.loadNpmTasks('grunt-rekai');

```

## Options

 - algorithm(optional): Datatype string which decides algorithm to generate fingerprint value, "timeStamp" - fingerprint based on time modified,"md5" - node crypto md5 algorithm based output. default to "md5".

 - baseVal(optional): Datatype string which decides base value for out put fingerprinting value in "hex" or "base16", "base64". default value "hex" or "base16"

 - action(optional): Datatype string which decides whether to rename or create copy file along fingerprint value. 

 - template(mandatory): Datatype string, template to create fingerprinting value. 

 - filename(mandatory): Datatype string, file path to save the fingerprint output value.

###Note:
As part of base value conversion,character "/" is replaced by "-" to avoid file directory structure confusion. 
