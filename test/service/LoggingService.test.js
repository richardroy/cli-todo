const LoggingService = require('../../bin/service/LoggingService');
const chalk = require('chalk');
const notifier = require('node-notifier');

jest.mock('chalk');
jest.mock('node-notifier');

const RAW_LOG = "raw log";
const FORMATTED_LOG = "formatted log";

const TODO = {
  title: "Title for test ToDo",
  complete: false,
  active: false
}

test('errorLog: ', async () => {
  console.log = jest.fn();
  chalk.red = jest.fn().mockReturnValue(FORMATTED_LOG);

  LoggingService.errorLog(RAW_LOG);

  expect(chalk.red).toHaveBeenCalledTimes(1);
  expect(chalk.red).toHaveBeenCalledWith(RAW_LOG);

  expect(console.log).toHaveBeenCalledTimes(1);
  expect(console.log).toHaveBeenCalledWith(FORMATTED_LOG);
})

test('defaultLog: ', async () => {
  console.log = jest.fn();

  LoggingService.defaultLog(RAW_LOG);

  expect(console.log).toHaveBeenCalledTimes(1);
  expect(console.log).toHaveBeenCalledWith(RAW_LOG);
})

test('activateLoggingCron: ', () => {
  //TODO learn to test a CronJob
  // better mocking
})

test('notify: ', () => {
  const title = "A test Title";
  const message = "A test Message";
  
  notifier.notify = jest.fn()
  
  LoggingService.notify(title, message);

  expect(notifier.notify).toHaveBeenCalledTimes(1);
  expect(notifier.notify).toHaveBeenCalledWith({
    title,
    message
  });
})