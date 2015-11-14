var assert = require('assert');
var _      = require('lodash');
var Model  = require('../lib/model');


describe('#model', function () {

  var instance;
  beforeEach(function () {
    instance = new Model();
  });

  describe('#setGridSize', function () {

    it('should set the sizes on the internal `_grid` variable', function () {
      instance.setGridSize(4, 2);
      assert.deepEqual(instance._grid, { width: 4, height: 2 });
    });

    it('should throw an error when the width isn\'t declared', function () {
      var caught = false;
      try {
        instance.setGridSize(2);  
      } catch (e) {
        assert.strictEqual(e.toString(), 'Error: Please declare the `width` and `height`');
        caught = true;
      }
      assert(caught);
    });

    it('should throw an error when the height isn\'t declared', function () {
      var caught = false;
      try {
        instance.setGridSize(null, 5);  
      } catch (e) {
        assert.strictEqual(e.toString(), 'Error: Please declare the `width` and `height`');
        caught = true;
      }
      assert(caught);
    });

  });


  describe('#setPosition', function () {

    it('should set the position on the internal `_position` variable', function () {
      instance.setPosition(3, 2);
      assert.deepEqual(instance._position, { x: 3, y: 2 });
    });

    it('should call `clean` AFTER setting the position', function () {
      assert(_.isUndefined(instance._position));

      var called = false;
      var calledAtPosition;
      instance.clean = function () {
        called = true;
        calledAtPosition = _.cloneDeep(instance._position);
      };

      instance.setPosition(2, 5);

      assert(called);
      assert.deepEqual(calledAtPosition, { x: 2, y: 5 });
    });

    it('should throw an error with invalid `x`', function () {
      var called = false;
      try {
        instance.setPosition(null, 3);
      } catch (e) {
        assert.strictEqual(e.toString(), 'Error: Invalid `x` and `y` coordinates');
        called = true;
      }
      assert(called);
    });

    it('should throw an error with invalid `y`', function () {
      var called = false;
      try {
        instance.setPosition(3, '2');
      } catch (e) {
        assert.strictEqual(e.toString(), 'Error: Invalid `x` and `y` coordinates');
        called = true;
      }
      assert(called);
    });

  });


  describe('#addDirtAtPosition', function () {

    it('should add dirt to the array', function () {
      instance.addDirtAtPosition(2, 5);
      assert.deepEqual(instance._dirt, [{ x: 2, y: 5, cleaned: false }]);

      instance.addDirtAtPosition(3, 3);
      assert.deepEqual(instance._dirt, [{ x: 2, y: 5, cleaned: false }, { x: 3, y: 3, cleaned: false }]);
    });

    it('should throw an error with invalid `x`', function () {
      var called = false;
      try {
        instance.addDirtAtPosition('', 5);  
      } catch (e) {
        assert.strictEqual(e.toString(), 'Error: Invalid `x` and `y` coordinates');
        called = true;
      }
      assert(called);
    });

    it('should throw an error with invalid `y`', function () {
      var called = false;
      try {
        instance.addDirtAtPosition(2, null);  
      } catch (e) {
        assert.strictEqual(e.toString(), 'Error: Invalid `x` and `y` coordinates');
        called = true;
      }
      assert(called);
    });

  });

  describe('#clean', function () {

    it('should clean the dirt at the current position, but not at other positions', function () {

      // Add some dirt
      instance.addDirtAtPosition(3, 2);   
      instance.addDirtAtPosition(5, 2);   
      instance.addDirtAtPosition(4, 3);   

      // Set position over one of them 
      instance._position = {
        x: 3, 
        y: 2
      };

      // Trigger it
      instance.clean();

      assert.deepEqual(instance._dirt, [{
        x: 3,
        y: 2,
        cleaned: true
      }, {
        x: 5,
        y: 2,
        cleaned: false
      }, {
        x: 4,
        y: 3,
        cleaned: false
      }]);

    });

    it('should clean multiple pieces of dirt from the current position', function () {

      // Add a big pile of dirt a position
      instance.addDirtAtPosition(3, 2); 
      instance.addDirtAtPosition(3, 2); 
      instance.addDirtAtPosition(3, 2); 

      // Set position over one of them 
      instance._position = {
        x: 3, 
        y: 2
      };

      // Trigger it
      instance.clean();

      assert.deepEqual(instance._dirt, [{
        x: 3,
        y: 2,
        cleaned: true
      }, {
        x: 3,
        y: 2,
        cleaned: true
      }, {
        x: 3,
        y: 2,
        cleaned: true
      }]);

    });

  });


  describe('#move', function () {

    it('should throw an error when called before `setGridSize`', function () {
      var called = false;
      try {
        instance.move('E');
      } catch (e) {
        assert.strictEqual(e.toString(), 'Error: Please call `setGridSize` before calling `move`');
        called = true;
      }
      assert(called);
    });

    it('should move right for E, bounded', function () {
      instance.setGridSize(5, 5);
      instance.setPosition(2, 3);

      instance.move('E');
      assert.strictEqual(instance._position.x, 3);

      instance.move('E');
      assert.strictEqual(instance._position.x, 4);   

      instance.move('E');
      assert.strictEqual(instance._position.x, 5);  

      instance.move('E');
      assert.strictEqual(instance._position.x, 5); // skidding

      instance.move('E');
      assert.strictEqual(instance._position.x, 5); // skidding
    });

    it('should move up for N, bounded', function () {
      instance.setGridSize(5, 6);
      instance.setPosition(2, 3);

      instance.move('N');
      assert.strictEqual(instance._position.y, 4);

      instance.move('N');
      assert.strictEqual(instance._position.y, 5);   

      instance.move('N');
      assert.strictEqual(instance._position.y, 6);  

      instance.move('N');
      assert.strictEqual(instance._position.y, 6); // skidding

      instance.move('N');
      assert.strictEqual(instance._position.y, 6); // skidding
    });

    it('should move down for S, bounded', function () {
      instance.setGridSize(5, 6);
      instance.setPosition(2, 3);

      instance.move('S');
      assert.strictEqual(instance._position.y, 2);

      instance.move('S');
      assert.strictEqual(instance._position.y, 1);   

      instance.move('S');
      assert.strictEqual(instance._position.y, 0);  

      instance.move('S');
      assert.strictEqual(instance._position.y, 0); // skidding

      instance.move('S');
      assert.strictEqual(instance._position.y, 0); // skidding
    });

    it('should move left for W, bounded', function () {
      instance.setGridSize(5, 5);
      instance.setPosition(2, 3);

      instance.move('W');
      assert.strictEqual(instance._position.x, 1);

      instance.move('W');
      assert.strictEqual(instance._position.x, 0);   

      instance.move('W');
      assert.strictEqual(instance._position.x, 0); // skidding

      instance.move('W');
      assert.strictEqual(instance._position.x, 0); // skidding
    });

    it('should clean up a piece of dirt when moving onto it', function () {
      instance.setGridSize(5, 6);
      instance.setPosition(2, 3);

      instance.addDirtAtPosition(3, 3);

      instance.move('E');

      assert.deepEqual(instance._dirt, [{ x: 3, y: 3, cleaned: true }]);
    });


  });


  describe('#countCleaned', function () {

    it('should be 0 with no dirt cleaned', function () {
      assert.strictEqual(instance.countCleaned(), 0);
    });

    it('should be 1 with one piece of cleaned dirt', function () {
      instance._dirt = [{ x: 1, y: 1, cleaned: true }];
      assert.strictEqual(instance.countCleaned(), 1);
    });

    it('should be 2 with two pieces of cleaned dirt', function () {
      instance._dirt = [{ x: 1, y: 1, cleaned: true }, { x: 2, y: 3, cleaned: true }, { x: 4, y: 1, cleaned: false }];
      assert.strictEqual(instance.countCleaned(), 2);
    });

  });



});