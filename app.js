const express = require('express');
const morgan = require('morgan');
const winston = require('./res/winston');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Routes
const smsRouter = require('./routes/sms');

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan('combined', {stream: winston.stream}));
app.use(smsRouter);

module.exports = app;
