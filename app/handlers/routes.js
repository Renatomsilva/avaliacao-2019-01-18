require('../helpers').validateCustom;
const { validate } = require('jsonschema');

const { Routes } = require('../models');
const { APIError } = require('../helpers');
const { routeNewSchema } = require('../schemas')


const createRoute = async (req, res, next) => {
  const { route }  = req.body;
  const validation = validate(route, routeNewSchema);
  if (!validation.valid) {
    return next(
      new APIError(
        400,
        'Bad req',
        validation.errors.map(e => e.stack).join('. ')
      )
    );
  }

  const checkExistsRoute = await Routes.getRouteByDriverTruck(route);
  if(checkExistsRoute){
    return next(
      new APIError(
        400,
        'Bad req',
        'Já existe uma rota ativa'
      )
    );
  }

  try {
    const newRoute = await Routes.createRoute(route);
    return res.status(201).json(newRoute);
  } catch (err) {
    return next(err);
  }
}

const getGroupRouteByType = async (req, res, next) => {
  try {
    const resultTrucks = await Routes.getGroupRouteByType();
    return res.json(resultTrucks);
  } catch (err) {
    return next(err);
  } 
}

module.exports = {
  createRoute,
  getGroupRouteByType
};
