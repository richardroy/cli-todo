const chalk = require('chalk')
const CronJob = require('cron').CronJob;
const notifier = require('node-notifier');

function errorLog(error) {
  // used to log errors to the console in red color
  const eLog = chalk.red(error)
  console.log(eLog)
}

function defaultLog(text) {
  console.log(text)
}

function activateLoggingCron(activeTodo) {
  const job = new CronJob('0 */20 * * * *', function() {
    notify('Current todo item:', activeTodo.title)
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
  defaultLog,
  activateLoggingCron,
  notify
}

module.exports = LoggingService