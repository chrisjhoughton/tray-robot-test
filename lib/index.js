/*
* The root file for running the Tray robot.
*/
var _          = require('lodash');
var getInput   = require('./getInput');
var parseInput = require('./parseInput');
var Model      = require('./model');


// Get the file data, if exists
getInput('input.txt')

// Parse the file data into something meaningful
.then(function (contents) {
  return parseInput(contents);
})

// Run the model
.then(function (parsed) {
  console.log(parsed);

  var instance = new Model();

  // Set the grid bounds
  instance.setGridSize(parsed.grid.width, parsed.grid.height);

  // Add the pieces of dirt
  _.each(parsed.dirt, function (piece) {
    instance.addDirtAtPosition(piece.x, piece.y);
  }); 

  // Set the initial position
  instance.setPosition(parsed.start.x, parsed.start.y);

  

})

// Output to console
.then(function () {

})

//
.done(function () {

});