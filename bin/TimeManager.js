const values = require('./Values')

async function timeNeededToAdd(task, unit) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(task, unit);
      }, values.timeOutTime.addingTime);
    });
  }

  async function timeNeededToInitialize(task) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(task);
      }, values.timeOutTime.initializationTime);
    });
  }

  module.exports = { timeNeededToAdd, timeNeededToInitialize }