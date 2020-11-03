const crypto = require('crypto');
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


router.post('/reports', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let hashPassword = crypto.createHmac('sha256', process.env.SECRET).update("+18067869369").digest('hex');
  if (username != null && password != null) {
    db.query(queries.select_user, username)
      .then(rows => {
        if (rows.length > 0) {
          if (rows[0].password === hashPassword) {
            return db.query(queries.select_locations)
              .then(rows => Promise.all(map(rows, (location) => utils.getReports(location))))
              .then(data => res.status(200).json(data))
              .catch(err => {
                winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                res.status(500).json([{"error": err}]);
                throw err;
              });
          } else {
            res.status(200).json({"status": "error", "message": "incorrect password"})
          }
        } else {
          res.status(200).json({"status": "error", "message": "no matching username exists"})
        }
      });
  } else {
    res.status(400).json({"status": "error", "message": "missing username and/or password."})
  }
});



module.exports = router;