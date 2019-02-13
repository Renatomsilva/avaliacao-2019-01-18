require('../helpers').validateCustom;

const { routeNewSchema } = require('../schemas');
const { validateRequest } = require('../helpers');
const { validateCheckRequest, validateBodyRequest } = validateRequest;

const _validateBodyRequest = async ( req, res , next ) => {
  try {
    await validateBodyRequest(req.body, 'route', 400, 'Bad req', 'Route object not informed');
    next();
  } catch (error) {
    next(error);
  };
}

const _validateCheckRequest = async ( req, res , next ) => {
  try {
    const { route }  = req.body;
    const result = await validateCheckRequest(next, route, routeNewSchema, 400, 'Bad req', null);
    next();
  } catch (error) {
    next(error);
  };
}

module.exports = {
  _validateCheckRequest,
  _validateBodyRequest
};