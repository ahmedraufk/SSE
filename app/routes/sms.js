// const db = require('../db');
const express = require('express');
const {map} = require('lodash');
const queries = require('../res/queries.json');
const router = express.Router();
const winston = require('../res/winston');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

message = null;

// SMS endpoint
router.post('/sms', function(req, res) {
  const twiml = new MessagingResponse();
  con.connect(function(err) {
    minutes = req.body.Body;
    if (parseInt(minutes) !== parseInt(minutes) || parseInt(minutes) <= 0) {
      console.log("string")
      twiml.message("Please write the number of minutes with digits rather than letters (for example, type 30 instead of thirty). Thank you for helping out!");
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
    }
    else {
      console.log("number");
      id = 1;
      var today = new Date();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      precinct = "Abbotts";
      twiml.message("Thank you for your response!");
      var insertQuery = "insert into waitTimes (time, idPrecinct, precinct, minutes) values ?";
      var values = [[time, id, precinct, parseInt(minutes)]];
      con.query(insertQuery, [values], function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
    }
  });

});

module.exports = router
