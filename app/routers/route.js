const express = require('express');
const { routesHandler, routesInOutHandler } = require('../handlers');
const router = new express.Router();
const { createRoute, getGroupRouteByType } = routesHandler;
const { checkInOutRoute } = routesInOutHandler;

router
  .route('')
  .put(createRoute);

router
  .route('/checkinout')
  .put(checkInOutRoute);

router
  .route('/group_type')
  .get(getGroupRouteByType);

module.exports = router;
