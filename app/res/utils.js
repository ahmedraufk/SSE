
const db = require('../db');
const {PythonShell} = require('python-shell');
const queries = require('../res/queries.json');

module.exports = {
  parseTime: (input) => {
    return new Promise((success, error) => {
        let options = { args: [input] }
        PythonShell.run('./res/timeParser.py', options, function (err, results) {
          if (results[0] === "None") {
            return success(null);
          } else {
            return success(parseInt(results[0]));
          }
        });
    });
  },
  calcWaitTime: (minutes, locationId) => {
    return db.query(queries.select_calculated_time + locationId + " )")
      .then((result) => {
        let runningAverage = 0;
        let weight;
        if (result.length > 0) {
          runningAverage = result[0].estimated_time
        }

        if (minutes < 5.0) {
          weight = 1.0;
        } else if (minutes < 10.0) {
          weight = 0.75;
        } else if (minutes < 20.0) {
          weight = 0.5;
        } else if (minutes < 30.0) {
          weight = 0.3;
        } else if (minutes < 40.0) {
          weight = 0.2;
        } else if (minutes < 50.0) {
          weight = 0.1;
        } else {
          weight = 0.05;
        }

        runningAverage = (1 - weight) * runningAverage + weight * minutes;
        return db.query(queries.insert_calculated_time, [new Date(), runningAverage, locationId]);
      });
  }
}



