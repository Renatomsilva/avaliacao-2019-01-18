// npm packages
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Promise = require('bluebird'); // eslint-disable-line

const { errorHandler } = require('./handlers');
const { driverRouter, routeRouter, trucksRouter } = require('./routers');

dotenv.config();

const app = express();
const {
  bodyParserHandler,
  globalErrorHandler,
  fourOhFourHandler,
  fourOhFiveHandler
} = errorHandler;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(express.json({ type: '*/*' }));
app.use(bodyParserHandler);
app.use(cors());


app.use('/drivers', driverRouter);
app.use('/routes', routeRouter);
app.use('/trucks', trucksRouter);

// catch-all for 404 "Not Found" errors
app.get('*', fourOhFourHandler);
// catch-all for 405 "Method Not Allowed" errors
app.all('*', fourOhFiveHandler);

app.use(globalErrorHandler);

module.exports = app;
