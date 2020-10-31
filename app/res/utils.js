
const db = require('../db');
const queries = require('../res/queries.json');

module.exports = {
  parseTime: (time) => {
      return new Promise((resolve ,reject) => {
          time = time.toString().toLowerCase().trim();
          let result = null;
          let res1, res2;

          const pure_numerical = /^\d+$/;
          const in_minutes = /^(\d+)\s*((?:m|min|mins|minutes))$/;
          const in_hours = /^(\d+(\.\d+)?)\s*((?:h|hr|hrs|hour|hours))$/;
          const with_colon = /^(1[0-2]|0?[0-9]):([0-5]?[0-9])$/;
          const with_colon_hours = /^(1[0-2]|0?[0-9]):([0-5]?[0-9])\s*((?:h|hr|hrs?|hours?))$/;
          const with_colon_minutes = /^(1[0-2]|0?[0-9]):([0-5]?[0-9])\s*((?:m|min|mins?|minutes?))$/;
          const hh_mm = /^((\d+(\.\d+)?)\s*(h|hr|hrs?|hours?))?(\s*(\d+)\s*(m|min|mins?|minutes?))?$/;
          const hh_mm_and = /^((\d+(\.\d+)?)\s*(h|hr|hrs?|hours?))?(\s*(?:and))\s*(\d+)\s*(m|min|mins?|minutes?)?$/

          try {
              if (pure_numerical.exec(time) !== null) {
                  res1 = pure_numerical.exec(time)[0];
                  result = parseInt(res1);
              } else if (in_minutes.exec(time)!== null) {
                  res1 = in_minutes.exec(time)[1];
                  result = parseInt(res1);
              } else if (in_hours.exec(time) !== null) {
                  res1 = in_hours.exec(time)[1];
                  result = parseInt(parseFloat(res1) * 60);
              } else if (with_colon.exec(time) !== null) {
                  res1 = with_colon.exec(time)[1];
                  res2 = with_colon.exec(time)[2];
                  result = parseInt(res1)*60+parseInt(res2);
              } else if (with_colon_hours.exec(time) !== null) {
                  res1 = with_colon_hours.exec(time)[1];
                  res2 = with_colon_hours.exec(time)[2];
                  result = parseInt(res1)*60+parseInt(res2);
              } else if (with_colon_minutes.exec(time) !== null) {
                  res1 = with_colon_minutes.exec(time)[1];
                  res2 = with_colon_minutes.exec(time)[2];
                  result = parseInt(res1)*60+parseInt(res2);
              } else if (hh_mm.exec(time) !==  null) {
                  res1 = hh_mm.exec(time)[2];
                  res2 = hh_mm.exec(time)[6];
                  result = parseInt(res1)*60+parseInt(res2);
              } else if (hh_mm_and.exec(time) !== null) {
                  res1 = hh_mm_and.exec(time)[2];
                  res2 = hh_mm_and.exec(time)[6];
                  result = parseInt(res1)*60+parseInt(res2);
              } else {
                  reject(null);
              }
          } catch(err) {
              reject(null);
          }
          resolve(result);
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
  },
  getReports: (location) => {
    return db.query(queries.select_reports, location.id)
      .then(reports => ({
        ...location,
        reports
      }))
  },
  createSurveyURL: (location, minutes) => {
    location = location.replace(/ /g, "%20")
    const url = "https://gatech.co1.qualtrics.com/jfe/form/SV_eG8DQvEigMwRihT" + "?location=" + location + "&waitTime=" + String(minutes);
    return url
  }
}



