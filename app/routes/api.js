const db = require('../db');
const express = require('express');
const queries = require('../res/queries.json');
const {map} = require('lodash');
const router = express.Router();
const winston = require('../res/winston');

// All locations
router.get('/locations', (req, res) => {
  db.query(queries.select_locations)
    .then(rows => {
      return Promise.all(map(rows, (location) => {
        return db.query(queries.select_lowest_time + location.id)
          .then(lowestTime => {
            location.lowestTime = lowestTime[0]['min(estimated_time)']
            return location
          })
          .then(location => {
            return db.query(queries.select_highest_time + location.id)
              .then(highestTime => {
                location.highestTime = highestTime[0]['max(estimated_time)']
                return location
              })
          })
          .then(location => {
            return db.query(queries.select_time + location.id + ")")
              .then(currentTime => {
                if (currentTime.length > 0) {
                  location.currentTime = currentTime[0]['estimated_time']
                } else {
                  location.currentTime = null
                }
                return location
              })
          })
      }))
    })
    .then(locations => {
      res.status(200).json(locations);
    })
    .catch(err => {
      winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(500).json([{"error": err}]);
      throw err;
    });
});

// Single location
router.get('/locations/:id', (req, res) => {
  db.query(queries.select_location + req.params.id)
    .then(rows => res.status(200).json(rows))
    .catch(err => {
      winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(500).json([{"error": err}]);
      throw err;
    });
});

module.exports = router;