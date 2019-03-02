const chalk = require('chalk')
const CronJob = require('cron').CronJob;
const notifier = require('node-notifier');

function errorLog(error) {
  // used to log errors to the console in red color
  const eLog = chalk.red(error)
  console.log(eLog)
}

function activateLoggingCron(activeTodo) {
  const job = new CronJob('0 */5 * * * *', function() {
    notify("Current todo item:", activeTodo.title)
  });
  job.start();
}

function notify(title, message) {
  notifier.notify({
    title,
    message
  });
}

const LoggingService = {
  errorLog,
  activateLoggingCron
}

module.exports = LoggingService