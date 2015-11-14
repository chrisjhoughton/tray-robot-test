var run = require('./run');


// Run it and log to console!
run('input.txt').done(function (final) {
  console.log(final);
}, function (err) {
  console.error(err.stack);
});