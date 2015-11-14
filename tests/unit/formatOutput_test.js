var assert       = require('assert');
var formatOutput = require('../../lib/formatOutput');


describe('#formatOutput', function () {

  it('should return two lines for a correctly formatted result', function () {
    var input = {
      position: {
        x: 2,
        y: 4
      },
      cleaned: 4
    };

    assert.strictEqual(formatOutput(input).split('\n')[0], '2 4');
    assert.strictEqual(formatOutput(input).split('\n')[1], '4');

    var input = {
      position: {
        x: 0,
        y: 0
      },
      cleaned: 0
    };

    assert.strictEqual(formatOutput(input).split('\n')[0], '0 0');
    assert.strictEqual(formatOutput(input).split('\n')[1], '0');
  });

  it('should throw an error for an invalid position input', function () {
    var called = false;
    try {
      formatOutput({
        cleaned: 4
      });
    } catch (e) {
      assert.strictEqual(e.toString(), 'Error: Invalid `result.position`');
      called = true;
    }
    assert(called);
  });

  it('should throw an error for an invalid cleaned input', function () {
    var called = false;
    try {
      formatOutput({
        position: {
          x: 4,
          y: 2
        },
        cleaned: '3' // should be number
      });
    } catch (e) {
      assert.strictEqual(e.toString(), 'Error: Invalid `result.cleaned`');
      called = true;
    }
    assert(called);
  });

});