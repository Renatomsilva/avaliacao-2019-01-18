const express = require('express');
const router = new express.Router();

const { driversHandler, trucksHandler, routesInOutHandler } = require('../handlers');
const { createDriver, updateDriver } = driversHandler;
const { getTruckDriverIsOwn } = trucksHandler;
const { getRoutesByDriverIsLoad } = routesInOutHandler;

router
  .route('')
  .put(createDriver);

router
  .route('/:driver_id')
  .patch(updateDriver);

router
  .route('/routes')
  .get(getRoutesByDriverIsLoad);

router
  .route('/trucks')
  .get(getTruckDriverIsOwn);

module.exports = router;
