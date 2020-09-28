var http = require('http');
var express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
var app = express();
var mysql = require("mysql");
app.use(express.json());
app.use(express.urlencoded());

var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "twilioschema"
    });

message = null;

app.post('/', function(req, res) {
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

http.createServer(app).listen(5000, function () {
  console.log("listening to port 5000");
});
