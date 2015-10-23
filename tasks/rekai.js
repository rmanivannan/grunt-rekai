module.exports = function(grunt) {
  var fs     = require('fs');
  var crypto = require('crypto');
  var fpArr = {};
  var toBase = function (n,b) {
    b = b == 'base64' ? 64 : (b=='hex' ? 16 : b);
    var str =  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+-"; 
    var res = [];
    var v = n;
    while(v){
      var lefto = str[(v%b)];
      res.unshift(lefto);
      v = parseInt((v/b));
    }
    return res.join('') || "0";
  }
  grunt.registerMultiTask('rekai', 'Kairēkai(Tamil) - Fingerprint(English) based on the file modified time', function() {
    var target = this.target;
    var configPrefix = this.name + '.' + target;
    this.requiresConfig(configPrefix + '.' + 'src');
    var done = this.async();
    var newObj = {
                  "updateTs" : function(ts){
                    newObj.ts = ts < newObj.ts ? newObj.ts : ts;
                  },
                  "md5"      : crypto.createHash('md5')
                };

    fpArr[target] = {};
    fpArr[target]['fileInputList'] = [];
    
    grunt.util.async.forEach(this.filesSrc, function(file, next) {
      var file     = grunt.template.process(file);
      newObj.updateTs(new Date(fs.statSync(file).mtime).getTime());
      newObj.md5.update(grunt.file.read(file));
      fpArr[target]['fileInputList'].push(file);
      next();
    }, function() {
      var baseVal = grunt.config.getRaw( configPrefix + '.' + 'baseVal') || 'hex';
      var cryptoVal = newObj.md5.digest(baseVal).replace(/\//g,'-');
      var ts =  toBase(newObj.ts,baseVal);
      var fpResult = grunt.config.getRaw( configPrefix + '.' + 'updateTS') ? ts : cryptoVal;
      save({
        "fingerprint" : fpResult,
        "target"      : target,
        "filename"    : grunt.config.getRaw( configPrefix + '.' + 'filename'),
        "template"    : grunt.config.getRaw( configPrefix + '.' + 'template'),
      }, done);
    });

    creteFingerPrint(grunt.config.getRaw( configPrefix + '.' + 'action'));

  });

  function save(options, done) {
    var context = {
      target      : options.target,
      rekai : options.fingerprint
    };

    var contents = (options.template && grunt.template.process(options.template, {data: context})) || options.rekai;
    var filename = (options.filename && grunt.template.process(options.filename, {data: context})) || options.target;

    fpArr[context.target]['content'] = contents;
    fpArr[context.target]['srcFile'] = filename;
    fpArr[context.target]['fp'] = context.rekai;

    grunt.file.write(filename, contents);

    done();
  }

  function creteFingerPrint (action) {
    //delete templates, and rename files
    var templateOb = {};
    for(var i in fpArr){
      var fp = fpArr[i]["fp"];
      //grunt.file.delete(fpArr[i]["srcFile"]);
      var ipFileList = fpArr[i]['fileInputList'];
      for (var j in ipFileList) {
        var filePath = ipFileList[j];
        var filePathRef = ipFileList[j];
        filePath = filePath.split('.');
        var fileExt = filePath.length > 1 ? ('.' + filePath.pop()) : "";


        var newFilePath =  filePath.join('.') + '-' + fp + fileExt;

        if(action == "renameSrc"){
          grunt.file.write(newFilePath, grunt.file.read(filePathRef))
          grunt.file.delete(filePathRef);
        }else if (action =="createSrcCopy") {
          grunt.file.write(newFilePath, grunt.file.read(filePathRef))
        };

      };


      var tempDestPath = fpArr[i]['srcFile'];
      var tempDestCnt  = fpArr[i]['content'];
      if(!templateOb[tempDestPath]){
        templateOb[tempDestPath] = [tempDestCnt];
      }else{
        templateOb[tempDestPath].push(tempDestCnt);
      }


    }
    
    for(var i in templateOb){
      var tempFilePath = i;
      var tempFileCnt = templateOb[i].join('\n');
      grunt.file.write(tempFilePath, tempFileCnt)
      grunt.log.writeln('File ' + tempFilePath.cyan + ' updated.');
    }
  }
};
