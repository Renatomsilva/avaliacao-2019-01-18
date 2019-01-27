require('../helpers').validateCustom;

const { APIError , validateRequest} = require('../helpers');
const { Routes, RoutesInOut } = require('../models');
const { routeUpdateCheckinCheckout, routeByDriveIsLoadSchema } = require('../schemas')
const { validateCheckRequest, validateBodyRequest } = validateRequest;

const validateCheckInOutRouteById = async (next , checkinout, id_route, coordinates, type) => {
  const { origin, checkin_date, checkout_date } = await Routes.getRouteById(checkinout);
  if ((!id_route && origin !== coordinates) || (type === 'IN' && checkin_date) || (type === 'OUT' && checkout_date)) {
    throw new APIError(
        400,
        'Bad req',
        'There is an available route for checkin'
      )
  }
}
const checkInOutRoute = async (req, res, next) => {
  try {
    await validateBodyRequest(req.body, 'checkinout', 400, 'Bad req', 'Checkinout object not informed');

    const { checkinout } = req.body;
    const { coordinates, id_route, type } = checkinout;
    await validateCheckRequest(next, checkinout, routeUpdateCheckinCheckout, 400, 'Bad req', undefined)
    await validateCheckInOutRouteById(next, checkinout, id_route, coordinates, type)
  
    const newCheckInOut = await RoutesInOut.createCheckInOut(checkinout);
    return res.status(201).json(newCheckInOut);
  } catch (err) {
    return next(err);
  }
}
 
const getRoutesByDriverIsLoad = async (req, res, next) => {
  const castTrue = val => val == '1' || val == 'true';

  const is_load  = castTrue(req.query.is_load);
  await validateCheckRequest({ is_load }, routeByDriveIsLoadSchema, 400, 'Bad req', undefined);

  try {
    const resultDrivers = await RoutesInOut.getRoutesByDriverIsLoad({ is_load });
    return res.json(resultDrivers);
  } catch (err) {
    return next(err);
  }
}
module.exports = {
  checkInOutRoute,
  getRoutesByDriverIsLoad
};
