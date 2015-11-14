var assert     = require('assert');
var _          = require('lodash');
var parseInput = require('../lib/parseInput');


describe('#parseInput', function () {

  var sampleArr;
  beforeEach(function () {
    sampleArr = [
      "5 5\n",
      "1 2\n",
      "1 0\n",
      "2 2\n",
      "2 3\n",
      "NNESEESWNWW\n"
    ];
  });

  it('should the the grid size correctly', function () {
    assert.deepEqual(parseInput(sampleArr.join('')).grid, { width: 5, height: 5 });

    sampleArr[0] = '3 2\n';
    assert.deepEqual(parseInput(sampleArr.join('')).grid, { width: 3, height: 2 });
  });

  it('should get the initial position', function () {
    assert.deepEqual(parseInput(sampleArr.join('')).start, { x: 1, y: 2 });

    sampleArr[1] = '4 3\n';
    assert.deepEqual(parseInput(sampleArr.join('')).start, { x: 4, y: 3 });    
  });

  it('should be ok with or without the line break on the final line', function () {
    assert.deepEqual(parseInput(sampleArr.join('')).dirt[2], { x: 2, y: 3 });

    sampleArr[sampleArr.length-1] = 'NNESEESWNWW';
    assert.deepEqual(parseInput(sampleArr.join('')).dirt[2], { x: 2, y: 3 });
  });

  it('should get the pieces of dirt', function () {
    assert.deepEqual(
      parseInput(sampleArr.join('')).dirt, 
      [{ x: 1, y: 0 }, { x: 2, y: 2 }, { x: 2, y: 3 }]
    );

    sampleArr = [
      "5 5\n",
      "1 2\n",
      "5 3\n",
      "NNESEESWNWW\n"
    ];
    assert.deepEqual(
      parseInput(sampleArr.join('')).dirt, 
      [{ x: 5, y: 3 }]
    );
  }); 

  it('should get the directions', function () {
    assert.deepEqual(
      parseInput(sampleArr.join('')).directions, 
      ['N', 'N', 'E', 'S', 'E', 'E', 'S', 'W', 'N', 'W', 'W']
    );
  });

  it('should get the directions, even if they\'re inputted in lowercase', function () {
    sampleArr[sampleArr.length-1] = 'nneseeswnww';
    assert.deepEqual(
      parseInput(sampleArr.join('')).directions, 
      ['N', 'N', 'E', 'S', 'E', 'E', 'S', 'W', 'N', 'W', 'W']
    );
  });

});