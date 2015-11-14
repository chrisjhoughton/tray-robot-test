/*
* The root file for running the Tray robot.
*/
var getInput   = require('./getInput');
var parseInput = require('./parseInput');


// Get the file data, if exists
getInput('input.txt')

// Parse the file data into something meaningful
.then(function (contents) {
  return parseInput(contents);
})

// Run the model
.then(function (parsed) {
  console.log(parsed);
})

// Output to console
.then(function () {

})

//
.done(function () {

});