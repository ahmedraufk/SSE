const db = require('../db');
const express = require('express');
const queries = require('../res/queries.json');
const router = express.Router();
const winston = require('../res/winston');

// All locations
router.get('/locations', (req, res) => {
  db.query(queries.select_locations)
    .then(rows => res.status(200).json(rows))
    .catch(err => {
      winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(500).json([{"error": err}]);
      throw err;
    });
});

// Single location
router.get('/locations/:id', (req, res) => {
  db.query(queries.select_location + req.params.id)
    .then(rows => {
      //get waittime
    })
    .then(rows => res.status(200).json(rows))
    .catch(err => {
      winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(500).json([{"error": err}]);
      throw err;
    });
});

module.exports = router;