require('../helpers').validateCustom;

const { Routes } = require('../models');
const { APIError } = require('../helpers');

const checkExistsRoute = async (next, route) => {
  const checkExistsRoute = await Routes.getRouteByDriverTruck(route);
  if(checkExistsRoute){
    throw new APIError(
        400,
        'Bad req',
        'An active route already exists'
      )
  }
}

const createRoute = async (req, res, next) => {
  try {
    const { route }  = req.body;
    await checkExistsRoute(next , route);
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
