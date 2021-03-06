
const crypto = require('crypto');
const db = require('../db');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const queries = require('../res/queries.json');
const router = express.Router();
const utils = require('../res/utils');
const winston = require('../res/winston');

router.post('/sms', function(req, res, err) {
  const twiml = new MessagingResponse();
  const input = req.body.Body;
  const toNum = req.body.To;
  const fromNum = req.body.From;
  const hashNum = crypto.createHmac('sha256', process.env.SECRET)
    .update(fromNum)
    .digest('hex');

  utils.parseTime(input)
    .then(minutes => {
      return {"success": true, "minutes": minutes}
    })
    .catch(() => {
      return {"success": false}
    })
    .then(result => {
      return db.query(queries.select_phone_id + `'${hashNum}'`)
        .then(phoneResult => {
          if (phoneResult.length > 0 && phoneResult[0].whitelisted === 1) {
            result.phoneId = phoneResult[0].id;
            result.observer = 1;
            return result
          } else if (phoneResult.length > 0) {
            result.phoneId = -1;
            result.observer = 0;
            return result
          } else if (result.success) {
            return db.query(queries.insert_phone, [hashNum])
              .then(newPhoneResult => {
                result.phoneId = newPhoneResult.insertId;
                result.observer = 0;
                return result
              });
          } else {
            return result;
          }
        });
    })
    .then(result => {
      return db.query(queries.select_location_info + toNum)
        .then(locationResult => {
          result.locationId = locationResult[0].id;
          result.locationName = locationResult[0].name;
          return result
        });
    })
    .then(result => {
      if (!result.success) {
        twiml.message("Sorry, we couldn\'t understand what you sent. Please send your wait time in the following format: \"15 min\"");
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
        const values = [new Date(), input, result.observer, result.locationId];
        return db.query(queries.insert_reject, values);
      } else if (result.phoneId === -1) {
        twiml.message("We've already received your wait time report. Thank you for participating!");
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
      } else {
        const values = [new Date(), input, result.minutes, result.observer, result.locationId];
        db.query(queries.insert_accept, values)
          .then(() => {
            utils.calcWaitTime(result.locationId)
              .then(() => {
                const survey = utils.createSurveyURL(result.locationName, result.minutes);
                twiml.message("Thank you for sharing! Your message will help inform others about this " +
                  "location's wait time. We'd greatly appreciate it if you could take this survey: " + survey);
                res.writeHead(200, {'Content-Type': 'text/xml'});
                res.end(twiml.toString());
              })
          });
      }
    })
    .catch(function (err) {
      winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      throw err
    });
});

module.exports = router;
