
const db = require('../db');
const express = require('express');
const queries = require('../res/queries.json');
const router = express.Router();
const winston = require('../res/winston');
const utils = require('../res/utils');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const crypto = require('crypto');

router.post('/sms', function(req, res) {
  const twiml = new MessagingResponse();
  const input = req.body.Body;
  const toNum = req.body.To;
  const fromNum = req.body.From;
  const hashNum = crypto.createHmac('sha256', process.env.SECRET)
    .update(fromNum)
    .digest('hex');

  db.query(queries.select_phone_id + `'${hashNum}'`)
    .then((result) => {
      if (result.length > 0 && result[0].whitelisted === 1) {
        return result[0].id
      } else if (result.length > 0) {
        twiml.message("We've already received your wait time report. Thanks for your participation!");
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
        throw new Error("Message already received from this number.");
      } else {
        return db.query(queries.insert_phone, [hashNum])
          .then((result) => {
            return result.insertId;
          });
      }
    })
    .then(phoneId => {
      return db.query(queries.select_location_id + toNum)
      .then(function(result) {
        const locationId = result[0].id;
        return {"phoneId" : phoneId, "locationId" : locationId}
      });
    })
    .then(result => {
      const minutes = utils.parseTime(input);
      if (!minutes) {
        twiml.message("Thank you for sharing. This will help alert your neighbors and others to the wait time at this location. Please visit www.ourwebsite.com for more up to date information about wait times.");
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
        const values = [new Date(), input, minutes, result.locationId, result.phoneId];
        return db.query(queries.insert_accept, values);
      } else {
        twiml.message("Thank you for sharing. Unfortunately, we couldn't understand what you sent. Please send your wait time in following format: \"15 min\"");
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
        const values = [new Date(), input, result.locationId, result.phoneId];
        return db.query(queries.insert_reject, values);
      }
    })
    .catch(function(err) {
      res.status(500).json([{"error": err}])
      winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      throw err
    });
});

module.exports = router
