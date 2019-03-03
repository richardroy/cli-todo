const LoggingService = require('../../bin/service/LoggingService');
const chalk = require('chalk');
const notifier = require('node-notifier');
const cron = require('cron').CronJob;

jest.mock('chalk');
jest.mock('node-notifier');
jest.mock('cron')

const RAW_LOG = "raw log";
const FORMATTED_LOG = "formatted log";

const DEFAULT_TODO = {
  title: "Title for test ToDo",
  complete: false,
  active: false
}

const OG_CONSOLE_LOG = console.log;

describe('LogginService', () => {

  beforeEach(() => {
    console.log = OG_CONSOLE_LOG;
    jest.clearAllMocks();
  })

  test('errorLog: ', () => {
    console.log = jest.fn();
    chalk.red = jest.fn().mockReturnValue(FORMATTED_LOG);

    LoggingService.errorLog(RAW_LOG);

    expect(chalk.red).toHaveBeenCalledTimes(1);
    expect(chalk.red).toHaveBeenCalledWith(RAW_LOG);

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(FORMATTED_LOG);
  })

  test('defaultLog: ', () => {
    console.log = jest.fn();

    LoggingService.defaultLog(RAW_LOG);

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(RAW_LOG);
  })

  test('activateLoggingCron: ', () => {
    expect.assertions(6);
    LoggingService.activateLoggingCron(DEFAULT_TODO);
    const cronMock = cron.mock.instances[0];
    expect(cron).toHaveBeenCalled();
    expect(cron).toHaveBeenCalledWith('0 */5 * * * *', expect.anything(Function));
    expect(cronMock.start).toHaveBeenCalledTimes(1);
    expect(cronMock.start).toHaveBeenCalledWith();

    const onActivateFunction = cron.mock.calls[0][1]
    onActivateFunction();

    expect(notifier.notify).toHaveBeenCalledTimes(1);
    expect(notifier.notify).toHaveBeenCalledWith({
      title: 'Current todo item:',
      message: DEFAULT_TODO.title,
    });
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
})
