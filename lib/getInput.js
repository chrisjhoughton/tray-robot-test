/*
* Gets the input from the input.txt. Does a check for existence first.
*/ 
var fs   = require('fs');
var when = require('when');


module.exports = function (fileName) {
  return when.promise(function (resolve, reject) {

    fs.readFile(__dirname+'/../'+fileName, function (err, result) {

      // Recognised error
      if (err && err.toString().indexOf('no such file or directory')) {
        reject(new Error('input with `fileName` does not exist'));
      }

      // Unrecognised error
      else if (err) {
        reject(err);
      }

      // All good! Resolve as a string
      else {
        resolve(result.toString());
      }

    });

  });
};