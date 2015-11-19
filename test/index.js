var fs = require('fs');
var grunt = require('grunt');
var assert = require('assert');

describe('grunt-rekai', function() {
  var filename = 'example/fingerprint.txt';
  it('Should create fingerprint file.', function() {
    assert.ok(fs.existsSync(filename) && fs.statSync(filename).size, 'Fingerprint file created.');
  });
  it('Should contain correct fingerprint value.', function() {
    assert.equal(fs.readFileSync(filename,'utf8'), 'var fp1 = "Ao43b9f1RlduffmZRujo7g=="; \nvar fp2 = "15120688720"; \nvar fp3 = "ce132772dca7b5f76ec00ab4d7959712"; ');
  });
});
