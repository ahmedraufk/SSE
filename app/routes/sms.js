const db = require('../db');
const express = require('express');
const {map, values} = require('lodash');
const queries = require('../res/queries.json');
const router = express.Router();
const winston = require('../res/winston');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const crypto = require('crypto'),

message = null;

// SMS endpoint
router.post('/sms', function(req, res) {
  const twiml = new MessagingResponse();
  //gets the message from the user
  const input = req.body.Body;
  //gets the number the message was sent to (twilio phone number)
  const toNum = req.body.To;
  //after parsing time, respond with error if appropriate
  const fromNum = req.body.From;  
  const hashNum = crypto.createHmac('sha256', process.env.SECRET)
    .update(fromNum)
    .digest('hex');
  db.query(queries.select_phone_id + `'${hashNum}'`)
    .then(function(result) {
      if (result.length > 0) {
        const phoneId = result[0].id;
        return phoneId;
      } else {
        return db.query(queries.insert_phone, [hashNum])
          .then(function(result) {
            const phoneId = result.insertId;
            return phoneId;
          })
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
      //TODO: import time parser
      if (parseInt(input) !== parseInt(input) || parseInt(input) <= 0) {
        twiml.message("Thank you for sharing, sadly we couldn't understand what you sent. Please send your wait time in following format: \"15 min\"");
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
        const values = [new Date(), input, result.locationId, result.phoneId];
        return db.query(queries.insert_reject, values);
      } else {
        twiml.message("Thank you for sharing. This will help alert your neighbors and others to the wait time at this location. Please visit www.ourwebsite.com for more up to date information about wait times.");
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
        const values = [new Date(), input, parseInt(input), result.locationId, result.phoneId];
        return db.query(queries.insert_accept, values);
      }
    })
    .catch(function(err) {
      res.status(500).json([{"error": err}])
      throw err
    });
  });

module.exports = router
