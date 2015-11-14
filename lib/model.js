/*
* The key model, handling all business logic of how the hoover moves
* around the grid and hoovers up bits of dirt.
*
* Returns an instance, to allow it to be run from scratch multiple times.
*/
var _ = require('lodash');


module.exports = function () {


  /*
  * Instance to be returned
  */

  var instance = {


    /*
    * Internal variables. Added here rather than as local variables within
    * the function because it makes unit testing simpler.
    */

    // Current position of the hoover
    _position: undefined,

    // Dimensions of the grid
    _grid: undefined,

    // All the pieces of dirt on the grid
    _dirt: [],

    /*
    * Set the size of the grid
    */
    setGridSize: function (width, height) {
      if (!_.isNumber(width) || !_.isNumber(height)) {
        throw new Error('Please declare the `width` and `height`');
      }

      this._grid = {
        width: width,
        height: height
      };
    },

    /*
    * Set the initial start position of the hoover
    */
    setPosition: function (x, y) {
      if (!_.isNumber(x) || !_.isNumber(y)) {
        throw new Error('Invalid `x` and `y` coordinates');
      }

      // Save the position to state
      this._position = {
        x: x,
        y: y
      };

      // Clean up dirt at the current position
      this.clean();
    },

    /*
    * Get the position of the hoover
    */
    getPosition: function () {
      return this._position;
    },

    /*
    * Add a piece of dirt to the grid, with `cleaned: false`.
    */ 
    addDirtAtPosition: function (x, y) {
      if (!_.isNumber(x) || !_.isNumber(y)) {
        throw new Error('Invalid `x` and `y` coordinates');
      }

      this._dirt.push({
        x: x,
        y: y,
        cleaned: false
      });
    },

    /*
    * Clean up a piece of dirt at the current position (if one's there). Mark 
    * the cleaned dirt with `cleaned: true`.
    *
    * Note: don't assume that only one piece of dirt is at the current position. A big
    * pile of dirt could have been added in one place.
    */
    clean: function () {
      this._dirt = _.map(this._dirt, function (piece) {
        if (piece.x === this._position.x && piece.y === this._position.y && piece.cleaned === false) {
          piece.cleaned = true;
        }
        return piece;
      }.bind(this));
    },

    /*
    * Move a particular direction, if made possible by the grid bounds.
    */ 
    move: function (direction) {
      if (!_.isObject(this._grid)) {
        throw new Error('Please call `setGridSize` before calling `move`');
      }
      if (!_.isObject(this._position)) {
        throw new Error('Please call `setPosition` before calling `move`');
      }

      var allowedDirections = ['N', 'E', 'S', 'W'];

      if (allowedDirections.indexOf(direction) === -1) {
        throw new Error('Invalid direction "'+direction+'". Allowed values are: '+allowedDirections.join(','));
      }

      if (!this._position) {
        throw new Error('Call `setPosition` to set the initial position before');
      }

      // Work out the new position (ensuring we stick to the bounds)
      if (direction === 'E' && this._position.x < (this._grid.width-1)) {
        this.setPosition(this._position.x + 1, this._position.y);
      }

      else if (direction === 'N' && this._position.y < (this._grid.height)-1) {
        this.setPosition(this._position.x, this._position.y + 1); 
      }

      else if (direction === 'W' && this._position.x > 0) {
        this.setPosition(this._position.x - 1, this._position.y); 
      }

      else if (direction === 'S' && this._position.y > 0) {
        this.setPosition(this._position.x, this._position.y - 1);
      }

    },

    /*
    * Count the total number of pieces cleaned
    */
    countCleaned: function () {
      return _.filter(this._dirt, function (piece) {
        return piece.cleaned;
      }).length;
    }

  };


  return instance;

};