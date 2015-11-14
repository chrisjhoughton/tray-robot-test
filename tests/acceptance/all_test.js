/*
* Acceptance tests are basically just a bunch of real examples that 
* I did on paper and wanted to run through the code.
*/ 
var fs     = require('fs');
var assert = require('assert');
var when   = require('when');
var run    = require('../../lib/run');


describe('Acceptance', function () {


  var writeToTestInput = function (lines) {
    return when.promise(function (resolve, reject) {

      fs.writeFile(__dirname+'/../../input.test.txt', lines.join('\n'), function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });

    });
  };  

  describe('example 1', function () {

    before(function (done) {
      var lines = [
        '5 5',
        '1 2',
        '1 0',
        '2 2',
        '2 3',
        'NNESEESWNWW'
      ];

      writeToTestInput(lines).done(done);
    });

    it('should be correct', function (done) {
      run('input.test.txt').done(function (output) {
        var arr = output.split('\n');
        assert.strictEqual(arr[0], '1 3');
        assert.strictEqual(arr[1], '1');

        done();
      });
    });

  });

  describe('example 2', function () {

    before(function (done) {
      var lines = [
        '3 5',
        '1 0',
        '2 1',
        '1 2',
        '1 4',
        'ENEEWNWW'
      ];

      writeToTestInput(lines).done(done);
    });

    it('should be correct', function (done) {
      run('input.test.txt').done(function (output) {
        var arr = output.split('\n');
        assert.strictEqual(arr[0], '0 2');
        assert.strictEqual(arr[1], '2');

        done();
      });
    });

  });

  describe('example 3', function () {

    before(function (done) {
      var lines = [
        '3 5',
        '1 0',
        '2 1',
        '1 2',
        '1 4',
        'NNNNNN'
      ];

      writeToTestInput(lines).done(done);
    });

    it('should be correct', function (done) {
      run('input.test.txt').done(function (output) {
        var arr = output.split('\n');
        assert.strictEqual(arr[0], '1 4');
        assert.strictEqual(arr[1], '2');

        done();
      });
    });

  });


  describe('example 4', function () {

    before(function (done) {
      var lines = [
        '5 1',
        '0 0',
        '3 0',
        'NNNNNNEE'
      ];

      writeToTestInput(lines).done(done);
    });

    it('should be correct', function (done) {
      run('input.test.txt').done(function (output) {
        var arr = output.split('\n');
        assert.strictEqual(arr[0], '2 0');
        assert.strictEqual(arr[1], '0');

        done();
      });
    });

  });


  describe('example 4', function () {

    before(function (done) {
      var lines = [
        '5 1',
        '0 0',
        '3 0',
        'NNNNNNEEE'
      ];

      writeToTestInput(lines).done(done);
    });

    it('should be correct', function (done) {
      run('input.test.txt').done(function (output) {
        var arr = output.split('\n');
        assert.strictEqual(arr[0], '3 0');
        assert.strictEqual(arr[1], '1');

        done();
      });
    });

  });


  describe('example 5', function () {

    before(function (done) {
      var lines = [
        '5 1',
        '0 0',
        '3 0',
        'NNNNNNEEEE'
      ];

      writeToTestInput(lines).done(done);
    });

    it('should be correct', function (done) {
      run('input.test.txt').done(function (output) {
        var arr = output.split('\n');
        assert.strictEqual(arr[0], '4 0');
        assert.strictEqual(arr[1], '1');

        done();
      });
    });

  });

  describe('example 6 (big piles of dirt)', function () {

    before(function (done) {
      var lines = [
        '3 4',
        '1 1',

        // pile 1
        '0 1',
        '0 1',

        // pile 2
        '0 2',
        '0 2',
        '0 2',

        // another ad hoc
        '2 3',

        'NNEESSSWWNN'
      ];

      writeToTestInput(lines).done(done);
    });

    it('should be correct', function (done) {
      run('input.test.txt').done(function (output) {
        var arr = output.split('\n');
        assert.strictEqual(arr[0], '0 2');
        assert.strictEqual(arr[1], '6');

        done();
      });
    });

  });


  describe('example 7 (hoover up on first placement)', function () {

    before(function (done) {
      var lines = [
        '3 4',
        '1 1',

        // dirt
        '1 1',

        'N'
      ];

      writeToTestInput(lines).done(done);
    });

    it('should be correct', function (done) {
      run('input.test.txt').done(function (output) {
        var arr = output.split('\n');
        assert.strictEqual(arr[0], '1 2');
        assert.strictEqual(arr[1], '1');

        done();
      });
    });

  });


  // Remove the test file after finish
  after(function (done) {
    fs.unlink(__dirname+'/../../input.test.txt', done);
  });


});