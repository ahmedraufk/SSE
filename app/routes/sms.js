const db = require('../db');
const express = require('express');
const {map, values} = require('lodash');
const queries = require('../res/queries.json');
const router = express.Router();
const winston = require('../res/winston');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

message = null;

// SMS endpoint
router.post('/sms', function(req, res) {
  const twiml = new MessagingResponse();
    minutes = req.body.Body;
    number = req.body.To;
    if (parseInt(minutes) !== parseInt(minutes) || parseInt(minutes) <= 0) {
      console.log("string")
      twiml.message("Thank you for sharing, sadly we couldn't understand what you sent. Please send your wait time in following format: \"15 min\"");
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
    }
    else {
      var timeStamp = new Date();
      twiml.message("Thank you for sharing. This will help alert your neighbors and others to the wait time at this location. Please visit www.ourwebsite.com for more up to date information about wait times.");
      i=0;
      db.query(queries.polling_places + number)
          .then(function(result) {
              id = result[0].id;
              var values = [timeStamp, parseInt(minutes), minutes, id, id];
              db.query(queries.insert_query, values);
              res.writeHead(200, {'Content-Type': 'text/xml'});
              res.end(twiml.toString());
          })
          .catch(function(err) {
            res.status(500).json([{"error": err}])
            throw err
          });
    }
  });

module.exports = router
