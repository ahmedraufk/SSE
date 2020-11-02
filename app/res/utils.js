
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
  calcWaitTime: (locationId) => {
    return db.query(queries.select_wait_times, locationId)
      .then(result => {
        let waitTimes = [result[0].parsed_time, result[1].parsed_time, result[2].parsed_time];

        //sort waitTimes from least to greatest
        waitTimes.sort((a, b) => {return a-b});

        //get median
        let median = waitTimes[1];

        //get time that last message was sent
        let newTimeStampValue = result[0].timestamp.getTime();
        let oldTimeStampValue = result[2].timestamp.getTime();

        //get current time
        let currentTimeValue = new Date().getTime();

        //find time that has passed since last message was sent in minutes
        let oldTimePassed = (currentTimeValue - oldTimeStampValue) / 60000;
        let newTimePassed = (currentTimeValue - newTimeStampValue) / 60000;

        //make sure that data is not too old and that there are no outliers
        //otherwise return null
        if (median < 30) {
          if (waitTimes[1] - waitTimes[0] < 15 && waitTimes[2] - waitTimes[1] < 15 && newTimePassed < 30 && oldTimePassed < 45) {
            //returns a number that represents which bin the median falls under
            if (median < 15) {
              return 1
            } else if (median >= 15 && median < 30) {
              return 2
            } else if (median >= 30 && median < 60) {
              return 3
            } else if (median >= 60 && median < 120) {
              return 4
            } else if (median >= 120 && median < 240) {
              return 5
            } else if (median >= 240 && median < 480) {
              return 6
            } else {
              return null
            }
          } else {
            return null
          }
        } else {
          if (waitTimes[1] - waitTimes[0] < 30 && waitTimes[2] - waitTimes[1] < 30 && newTimePassed < 30 && oldTimePassed < 45) {
            //returns a number that represents which bin the median falls under
            if (median <= 15) {
              return 1
            } else if (median > 15 && median <= 30) {
              return 2
            } else if (median > 30 && median <= 60) {
              return 3
            } else if (median > 60 && median <= 120) {
              return 4
            } else if (median > 120 && median <= 240) {
              return 5
            } else if (median > 240 && median <= 480) {
              return 6
            } else {
              return null
            }
          } else {
            return null
          }
        }
      })
      .then(result => {
        if (result != null) {
          return db.query(queries.insert_wait_time, [new Date(), result, locationId]);
        }
      })
      .catch (() => {
        return null
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



