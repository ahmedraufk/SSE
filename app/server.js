var http = require('http');
var express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
var app = express();
var mariadb = require('mariadb');
app.use(express.json());
app.use(express.urlencoded());



var db = mariadb.createPool({
      host: "localhost",
      port: 3306,
      user: "adminsse",
      password: "Mccamish@1",
      database: "sse",
      connectionLimit: 5
    });
 message = null;

app.get('/',function(req,res) {
    db.query("SELECT * FROM waitTimes")
        .then(rows => {
            res.json(rows);
        })
        .catch(err =>{

            console.log(err);
            throw err;
        });
});


//  app.post('/', function(req, res) {
//     const twiml = new MessagingResponse();
//     pool.getConnection().then(conn => {
//         console.log("Connected to DB");
//         minutes = req.body.Body;
//         if (parseInt(minutes) !== parseInt(minutes) || parseInt(minutes) <= 0) {
//             console.log("string")
//             twiml.message("Please write the number of minutes with digits rather than letters (for example, type 30 instead of thirty). Thank you for helping out!");
//             res.writeHead(200, {'Content-Type': 'text/xml'});
//             res.end(twiml.toString());
//         }
//         else {
//             console.log("number");
//             id = 1;
//             var today = new Date();
//             var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//             precinct = "Abbotts";
//             twiml.message("Thank you for your response!");
//             conn.query("INSERT INTO waitTimes value (?, ?,?,?)", ["5:00", "2","Abbotts","45"]);
//             res.writeHead(200, {'Content-Type': 'text/xml'});
//             res.end(twiml.toString());
//         }
//     }).catch(err =>{
//         console.log("Couldn't connect to server");
//     });
//
// });

app.listen(5000, () => {
  console.log("listening to port 5000");
});
