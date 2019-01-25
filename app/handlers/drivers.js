const { validate } = require('jsonschema');

const { Drivers } = require('../models');
const { APIError } = require('../helpers');
const { driverNewSchema, driverUpdateSchema } = require('../schemas')

const createDriver = async (req, res, next) => {
  const { driver } = req.body;

  const validation = validate(driver, driverNewSchema);
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
    const newDriver = await Drivers.createDriver(driver);
    return res.status(201).json(newDriver);
  } catch (err) {
    return next(err);
  }
}

const updateDriver = async (req, res, next) => {
  const { driver } = req.body;
  const { driver_id } = req.params;

  const validation = validate(driver, driverUpdateSchema);
  if (!validation.valid) {
    return next(
      new APIError(
        400,
        'Bad req',
        validation.errors.map(e => e.stack).join('. ')
      )
    );
  }

  const driversVerify = await Drivers.getDriverById(driver_id)
  if (!driversVerify.length || !driver_id) {
    return next(
      new APIError(
        400,
        'Bad req',
        'Caminhoneiro não encontrado'
      )
    );
  }

  try {
    const newDriver = await Drivers.updateDriver(driver, driver_id);
    return res.status(201).json(newDriver);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  createDriver,
  updateDriver
};
