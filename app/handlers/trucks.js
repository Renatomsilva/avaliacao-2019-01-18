require('../helpers').validateCustom;
const { validate } = require('jsonschema');

const { Trucks, Drivers, TruckType } = require('../models');
const { APIError } = require('../helpers');
const { truckNewSchema, trucksFilterDateSchema, trucksIsOwnSchema } = require('../schemas')

const createTruck = async (req, res, next) => {
  const { driver } = req.body;
  const { truck }  = req.body;
  const { id } = driver;

  const validation = validate(truck, truckNewSchema);
  if (!validation.valid) {
    return next(
      new APIError(
        400,
        'Bad req',
        validation.errors.map(e => e.stack).join('. ')
      )
    );
  }

  const check_driver = await Drivers.getDriverById(id);
  if(!check_driver.length){
    return next(
      new APIError(
        400,
        'Bad req',
        'Caminhoneiro não encontrado'
      )
    );
  }

  const check_truckType = await TruckType.getTruckTypeByCode(truck)
  if(!check_truckType.length){
    return next(
      new APIError(
        400,
        'Bad req',
        'Tipo de Caminhão não encontrado'
      )
    );
  }

  try {
    const newTruck = await Trucks.createTruck(truck, driver);
    return res.status(201).json(newTruck);
  } catch (err) {
    return next(err);
  }
}

const getTruckDriverIsOwn = async (req, res, next) => {
  const castTrue = val => val == '1' || val == 'true';

  const is_own  = castTrue(req.query.is_own);
  
  const validation = validate({ is_own }, trucksIsOwnSchema);
  if (!validation.valid) {
    return next(
      new APIError(
        400,
        'Bad req',
        validation.errors.map(e => e.stack).join('. ')
      )
    );
  }

  try {
    const resultTrucks = await Trucks.getTruckDriverIsOwn(is_own);
    return res.json(resultTrucks);
  } catch (err) {
    return next(err);
  }
}

const getTrucksLoadByFilter = async (req, res, next) => {
  const { day_start , day_end } = req.query;

  const validation = validate({ day_start , day_end }, trucksFilterDateSchema);
  if (!validation.valid) {
    return next(
      new APIError(
        400,
        'Bad req',
        validation.errors.map(e => e.stack).join('. ')
      )
    );
  }

  try {
    const resultTrucks = await Trucks.getTrucksLoadByFilter(day_start , day_end);
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
