require('../helpers').validateCustom;
const { validate } = require('jsonschema');

const { APIError } = require('../helpers');
const { Routes, RoutesInOut } = require('../models');
const { routeUpdateCheckinCheckout, routeByDriveIsLoadSchema } = require('../schemas')

const checkInOutRoute = async (req, res, next) => {
  const { checkinout } = req.body;
  const { coordinates, id_route, type } = checkinout;

  const validation = validate(checkinout, routeUpdateCheckinCheckout);
  if (!validation.valid) {
    return next(
      new APIError(
        400,
        'Bad req',
        validation.errors.map(e => e.stack).join('. ')
      )
    );
  }

  const { origin, checkin_date, checkout_date } = await Routes.getRouteById(checkinout);
  if ((!id_route && origin !== coordinates) || (type === 'IN' && checkin_date) || (type === 'OUT' && checkout_date)) {
    return next(
      new APIError(
        400,
        'Bad req',
        'Não existe uma rota disponivél para checkin'
      )
    );
  }
  
  try {
    const newCheckInOut = await RoutesInOut.createCheckInOut(checkinout);
    return res.status(201).json(newCheckInOut);
  } catch (err) {
    return next(err);
  }
}
 
const getRoutesByDriverIsLoad = async (req, res, next) => {
  const castTrue = val => val == '1' || val == 'true';

  const is_load  = castTrue(req.query.is_load);

  const validation = validate( { is_load }, routeByDriveIsLoadSchema);
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
    const resultDrivers = await RoutesInOut.getRoutesByDriverIsLoad(is_load || true);
    return res.json(resultDrivers);
  } catch (err) {
    return next(err);
  }
}
module.exports = {
  checkInOutRoute,
  getRoutesByDriverIsLoad
};
