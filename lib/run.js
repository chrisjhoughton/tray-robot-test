/*
* The root file for running the Tray robot.
*/
var _            = require('lodash');
var when         = require('when');
var getInput     = require('./getInput');
var parseInput   = require('./parseInput');
var Model        = require('./model');
var formatOutput = require('./formatOutput');


module.exports = function (fileName) {
  return when.promise(function (resolve, reject) {

    // Get the file data, if exists
    getInput(fileName)

    // Parse the file data into something meaningful
    .then(function (contents) {
      return parseInput(contents);
    })

    // Run the model
    .then(function (parsed) {
      var instance = new Model();

      // Set the grid bounds
      instance.setGridSize(parsed.grid.width, parsed.grid.height);

      // Add the pieces of dirt
      _.each(parsed.dirt, function (piece) {
        instance.addDirtAtPosition(piece.x, piece.y);
      }); 

      // Set the initial position
      instance.setPosition(parsed.start.x, parsed.start.y);

      // Move about
      _.each(parsed.directions, function (direction) {
        instance.move(direction);
      });

      return {
        position: instance.getPosition(),
        cleaned: instance.countCleaned()
      };
    })

    // Format as we want it to be for the console
    .then(function (result) {
      return formatOutput(result);
    })

    .done(resolve, reject);

  });
};