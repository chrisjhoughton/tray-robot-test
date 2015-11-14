var _ = require('lodash');
module.exports = function (result) {

  if (!_.isObject(result.position) || !_.isNumber(result.position.x) || !_.isNumber(result.position.y)) {
    throw new Error('Invalid `result.position`');
  }

  if (!_.isNumber(result.cleaned)) {
    throw new Error('Invalid `result.cleaned`');
  }

  return result.position.x + ' ' + result.position.y + "\n" + result.cleaned;
};