var http = require('http');
var express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
var app = express();
var mariadb = require('mariadb');
app.use(express.json());
app.use(express.urlencoded());

var con = mariadb.createPool({
      host: "localhost",
      port: 3306,
      user: "adminsse",
      password: "Mccamish@1",
      database: "sse",
      connectionLimit: 5
    });
message = null;
/*
app.post('/', function(req, res) {
    const twiml = new MessagingResponse();
    con.getConnection(function(err) {
        minutes = req.body.Body;
        number = req.body.To;
        if (parseInt(minutes) !== parseInt(minutes) || parseInt(minutes) <= 0) {
            console.log("string")
            twiml.message("Please write the number of minutes with digits rather than letters (for example, type 30 instead of thirty). Thank you for helping out!");
            res.writeHead(200, {'Content-Type': 'text/xml'});
            res.end(twiml.toString());
        }
        else {
            var today = new Date();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            twiml.message("Thank you for your response! surveylink.com");
            var tableQuery = "select * from precinctdata"
            con.query(tableQuery, function (err, result) {
                if (err) throw err;
                i = 0;
                for (precinct in result) {
                    if (number == result[i].number) {
                        id = result[i].precinctdata_id;
                        var generalInsertQuery = "insert into precinct (id, time, idPrecinct, minutes) values ?";
                        var insertQuery = generalInsertQuery.replace("precinct", "precinct" + result[i].precinctdata_id.toString())
                        var values = [[null, time, id, parseInt(minutes)]];
                        con.query(insertQuery, [values], function (err) {
                            if (err) throw err;
                            console.log("1 record inserted");
                        });
                        res.writeHead(200, {'Content-Type': 'text/xml'});
                        res.end(twiml.toString());
                    }
                    i += 1
                }
            });
        }
    });

});
*/

app.get('/',function(req,res) {
  res.send("hello);
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
