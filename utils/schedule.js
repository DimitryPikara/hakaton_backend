const schedule = require('node-schedule');
const { updateGroups } = require('./updateGroups');
const { updateLectures } = require('./updateLectures');

module.exports = {
  scheduleJobs() {
    schedule.scheduleJob('0 * 1 08 *', updateGroups);
    schedule.scheduleJob('1 * * * *', updateLectures);
  },
};