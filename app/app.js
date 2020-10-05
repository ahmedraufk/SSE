const express = require('express');
const path = require('path');
const morgan = require('morgan');
const winston = require('./res/winston');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Routes
const smsRouter = require('./routes/sms');
const apiRouter = require('./routes/api');

const app = express();
app.use(express.static(path.resolve("./") + "/build"));
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan('combined', {stream: winston.stream}));
app.use(smsRouter);
app.use('/api', apiRouter);

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
  app.get('*', (req, res) => {
    res.sendFile('build/index.html', { root: __dirname })
  });
}

module.exports = app;
