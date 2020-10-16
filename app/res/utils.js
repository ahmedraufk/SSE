
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
    return db.query(queries.select_time + locationId + " )")
      .then((result) => {

        // TODO - fix algorithm

        let runningAverage = 0;
        let weight;
        let timestamp;
        if (result.length > 0) {
          runningAverage = result[0].estimated_time;
          timestamp = result[0].timestamp;
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
        return db.query(queries.insert_time, [new Date(), runningAverage, locationId]);
      });
  },
  getTimes: (location) => {
    return db.query(queries.select_lowest_time + location.id)
      .then(lowestTime => {
        location.lowestTime = lowestTime[0]['min(estimated_time)']
        return location
      })
      .then(location => {
        return db.query(queries.select_highest_time + location.id)
          .then(highestTime => {
            location.highestTime = highestTime[0]['max(estimated_time)']
            return location
          })
      })
      .then(location => {
        return db.query(queries.select_time + location.id + ")")
          .then(currentTime => {
            if (currentTime.length > 0) {
              location.currentTime = currentTime[0]['estimated_time']
            } else {
              location.currentTime = null
            }
            return location
          })
      });
  }
}



