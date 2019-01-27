require('../helpers').validateCustom;
const { APIError } = require('../helpers');
const { validate } = require('jsonschema');


const validateCheckRequest = async(next , object , schema, errorCode , errorTitle , errorMessage = null) => {
  const validation = validate(object, schema);
  if (!validation.valid) {
      throw new APIError(
        errorCode,
        errorTitle,
        errorMessage || validation.errors.map(e => e.stack).join('. ')
      )
  }
}

const validateBodyRequest =  (body , object, errorCode , errorTitle , errorMessage) => {
  if(!body[object] || !Object.keys(body[object]).length){
    throw new APIError(
        errorCode,
        errorTitle,
        errorMessage
      );
  }
}

module.exports = {
  validateCheckRequest,
  validateBodyRequest
};