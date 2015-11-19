var fs = require('fs');
var assert = require('assert');

describe('grunt-rekai', function() {
  var filename = 'example/fingerprint.txt';
  it('Should create fingerprint file.', function() {
    assert.ok(fs.existsSync(filename) && fs.statSync(filename).size, 'Fingerprint file created.');
  });
  it('Should contain correct fingerprint value.', function() {
    var fileCnt = fs.readFileSync(filename,'utf8');
    console.log(fileCnt);
    assert.ok(fileCnt.indexOf('Ao43b9f1RlduffmZRujo7g==') >= 0);
    //assert.ok(fileCnt.indexOf('15120688720') >= 0); // this can not be tested as time modified of the file can not be constant always 
    assert.ok(fileCnt.indexOf('ce132772dca7b5f76ec00ab4d7959712') >= 0);
  });
});
