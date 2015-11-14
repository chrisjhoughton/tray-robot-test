var assert   = require('assert');
var _        = require('lodash');
var getInput = require('../../lib/getInput');


describe('#getInput', function () {

  it('should get the input as a string for a valid file name', function (done) {
    getInput('input.txt').done(function (result) {

      var lines = result.split("\n");

      assert.strictEqual(lines[0], '5 5');
      assert.strictEqual(lines[1], '1 2');
      assert.strictEqual(lines[5], 'NNESEESWNWW');
      assert.strictEqual(lines.length, 6);

      done();
    });
  });

  it('should return an error for invalid filename', function (done) {
    getInput('input2.txt').done(function () { }, function (err) {
      assert(_.isError(err));

      assert.strictEqual(err.toString(), 'Error: input with `fileName` "input2.txt" does not exist');

      done();
    });
  });

});