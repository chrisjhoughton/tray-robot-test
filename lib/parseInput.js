/*
* Given the contents of an `input.txt` file, parse it into
* something meaningful.
*/
var trim = require('mout/string/trim');
var _    = require('lodash');


module.exports = function (contents) {

  // Split out into individual lines, and trim just in case
  var lines = _.filter(_.map(contents.split('\n'), function (line) {
    return trim(line);
  }), function (line) {
    return line ? true : false;
  });

  // Also make sure that the final line is all uppercase
  lines[lines.length-1] = lines[lines.length-1].toUpperCase();

  // Format the lines into something that's actually usable.
  var formatted = {
    grid: {
      width: Number(lines[0].split(' ')[0]),
      height: Number(lines[0].split(' ')[1])
    },
    start: {
      x: Number(lines[1].split(' ')[0]),
      y: Number(lines[1].split(' ')[1])
    },
    dirt: _.map(_.filter(lines, function (line, index) {
      return (index <= 1 || index === lines.length-1) ? false : true;
    }), function (line) {
      return {
        x: Number(line.split(' ')[0]),
        y: Number(line.split(' ')[1])
      };
    }),
    directions: lines[lines.length-1].split('')
  };

  // TODO Couple of final validation checks


  return formatted;

};