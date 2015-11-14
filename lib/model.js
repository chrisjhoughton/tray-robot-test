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
    _dirt: []

    /*
    * Set the size of the grid
    */
    setGridSize: function (width, height) {
      grid = {
        width: width,
        height: height
      };
    },

    /*
    * Set the initial start position of the hoover
    */
    setPosition: function (newPosition) {
      if (!_.isObject(newPosition) || newPosition.x || newPosition.y) {
        throw new Error('Invalid `newPosition`');
      }

      position = newPosition;

      // Clean up dirt at the current position
      this.clean();
    },

    /*
    * Add a piece of dirt to the grid, with `cleaned: false`.
    */ 
    addDirtAtPosition: function (x, y) {
      this._dirt.push({
        x: x,
        y: y,
        cleaned: false
      });
    },

    /*
    * Clean up a piece of dirt at the current position (if one's there). Mark 
    * the cleaned dirt with `cleaned: true`.
    */
    clean: function () {
      
    },

    /*
    * Move a particular direction, if made possible by the grid bounds.
    */ 
    move: function (direction) {
      var allowedDirections = ['N', 'E', 'S', 'W'];

      if (allowedDirections.indexOf(direction) === -1) {
        throw new Error('Invalid direction "'+direction+'". Allowed values are: '+allowedDirections.join(','));
      }

      // Work out the new position (ensuring we stick to the bounds)


    },

    /*
    * Count the total number of pieces cleaned
    */
    countTotalCleaned: function () {
      return _.filter(this._dirt, function (piece) {
        return piece.cleaned;
      }).length;
    }

  };


  // 
  instance.run(_options);

  return instance;

};