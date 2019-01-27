require('../helpers').validateCustom;

const { Trucks, Drivers } = require('../models');
const { APIError, validateRequest } = require('../helpers');
const { truckNewSchema, trucksFilterDateSchema, trucksIsOwnSchema } = require('../schemas')
const { validateCheckRequest, validateBodyRequest } = validateRequest;

const castTrue = val => val == '1' || val == 'true';

const checkExistsDriverById = async (next, driver) => {
  const check_driver = await Drivers.getDriverById({
    driver_id: driver.id
  });
  if (!check_driver.length) {
    throw new APIError(
      400,
      'Bad req',
      'Truck driver not found'
    )
  }
}

const createTruck = async (req, res, next) => {
  try {
    await validateBodyRequest(req.body, 'truck', 400, 'Bad req', 'Truck object not informed');
    await validateBodyRequest(req.body, 'driver', 400, 'Bad req', 'Driver object not informed');

    const { driver } = req.body;
    const { truck } = req.body;

    await validateCheckRequest(next, truck, truckNewSchema, 400, 'Bad req', undefined);
    await checkExistsDriverById(next, driver);

    const newTruck = await Trucks.createTruck(truck, driver);
    return res.status(201).json(newTruck);
  } catch (err) {
    return next(err);
  }
}

const getTruckDriverIsOwn = async (req, res, next) => {
  const is_own = castTrue(req.query.is_own);
  await validateCheckRequest(next, { is_own }, trucksIsOwnSchema, 400, 'Bad req');

  try {
    const resultTrucks = await Trucks.getTruckDriverIsOwn({
      is_own
    });
    return res.json(resultTrucks);
  } catch (err) {
    return next(err);
  }
}

const getTrucksLoadByFilter = async (req, res, next) => {
  try {
    validateBodyRequest(req.query, 'start_day', 400, 'Bad req', 'Day Start object not informed');
    const { start_day, end_day } = req.query;
    await validateCheckRequest({ start_day, end_day }, trucksFilterDateSchema, 400, 'Bad req', undefined);

    const resultTrucks = await Trucks.getTrucksLoadByFilter({
      start_day,
      end_day
    });
    return res.json(resultTrucks);
  } catch (err) {
    return next(err);
  }
}
module.exports = {
  createTruck,
  getTruckDriverIsOwn,
  getTrucksLoadByFilter
};