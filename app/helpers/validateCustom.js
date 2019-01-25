const Validator = require('jsonschema').Validator;
Validator.prototype.customFormats.coordinates = function(input) {
  const rg = /^([-+]?)([\d]{1,2})(((\.)(\d+)(,)))(\s*)(([-+]?)([\d]{1,3})((\.)(\d+))?)$/g;
  const result = input.match(rg);
  return result && result.length;
};

Validator.prototype.customFormats.dateFormat = function(input) {
  const rg = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/g;
  const result = input.match(rg);
  return result && result.length;
};
