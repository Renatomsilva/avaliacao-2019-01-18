const express = require('express');
const { trucksHandler } = require('../handlers');
const router = new express.Router();
const { getTrucksLoadByFilter, createTruck } = trucksHandler;

router
  .route('')
  .put(createTruck);

router
  .route('/load')
  .get(getTrucksLoadByFilter);

module.exports = router;
