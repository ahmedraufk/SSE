
const {PythonShell} = require('python-shell');

module.exports = {
  parseTime: (input) => {
    let options = { args: [input] }
    PythonShell.run('./res/timeParser.py', options, function (err, results) {
      if (results[0] === "None") {
        return null;
      } else {
        return parseInt(results[0]);
      }
    });
  },
  calcWaitTime: (input) => {

  }
}



