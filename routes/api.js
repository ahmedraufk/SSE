const db = require('../db');
const express = require('express');
const queries = require('../res/queries.json');
const {map} = require('lodash');
const router = express.Router();
const utils = require('../res/utils');
const winston = require('../res/winston');

// All locations
router.get('/locations', (req, res) => {
  db.query(queries.select_locations)
    .then(rows => Promise.all(map(rows, (location) => utils.getTimes(location))))
    .then(locations => res.status(200).json(locations))
    .catch(err => {
      winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(500).json([{"error": err}]);
      throw err;
    });
});

// Single location
router.get('/locations/:id', (req, res) => {
  db.query(queries.select_location + req.params.id)
    .then(rows => utils.getTimes(rows[0]))
    .then(location => res.status(200).json(location))
    .catch(err => {
      winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(500).json([{"error": err}]);
      throw err;
    });
});

module.exports = router;