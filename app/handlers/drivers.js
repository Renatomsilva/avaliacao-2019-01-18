const { Drivers } = require('../models');
const { APIError, validateRequest} = require('../helpers');
const { driverNewSchema, driverUpdateSchema } = require('../schemas')
const { validateCheckRequest, validateBodyRequest } = validateRequest;

const verifyDriverById = async ( next , driver_id ) => {
  const driversVerify = await Drivers.getDriverById({driver_id})
  if (!driversVerify.length || !driver_id) {
    throw new APIError(
        400,
        'Bad req',
        'Truck driver not found'
      )
  }
}

const createDriver = async (req, res, next) => {
  try {
    await validateBodyRequest(req.body, 'driver', 400, 'Bad req', 'Driver object not informed');
    const { driver } = req.body;
    await validateCheckRequest(next, driver, driverNewSchema, 400, 'Bad req', undefined);
  
    const newDriver = await Drivers.createDriver(driver);
    return res.status(201).json(newDriver);
  } catch (err) {
    return next(err);
  }
}

const updateDriver = async (req, res, next) => {
  try {
    await validateBodyRequest(req.body, 'driver', 400, 'Bad req', 'Driver object not informed');
    
    const { driver } = req.body;
    const { driver_id } = req.params;
    await validateCheckRequest(next, driver, driverUpdateSchema, 400, 'Bad req', undefined);
    await verifyDriverById(next, driver_id);

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
