const express = require('express');
const { routesHandler, routesInOutHandler } = require('../handlers');
const router = new express.Router();
const { createRoute, getGroupRouteByType } = routesHandler;
const { checkInOutRoute } = routesInOutHandler;
const { validatiosRoute } = require("../vallidations");
const { _validateBodyRequest, _validateCheckRequest }  = validatiosRoute;

router
  .route('')
  .put(_validateBodyRequest, _validateCheckRequest, createRoute);

router
  .route('/checkinout')
  .put(checkInOutRoute);

router
  .route('/group_type')
  .get(getGroupRouteByType);

module.exports = router;
