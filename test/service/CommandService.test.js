const CommandService = require('../../src/service/CommandService');
const LoggingService = require('../../src/service/LoggingService');

jest.mock('../../src/service/LoggingService');

describe('CommandService: ', () => {

  beforeEach(() => {
    jest.resetAllMocks();
  })

  test('getAllCommands: ', () => {
    const commands = CommandService.getAllCommands();
    expect(commands).toEqual(CommandService.COMMANDS);
  })

  test('getCommandByLabel: valid Command', () => {
    const command = CommandService.getCommandByLabel(CommandService.COMMANDS[1].label);
    expect(command).toEqual(CommandService.COMMANDS[1])
  })

  test('getCommandByLabel: invalid Command', () => {
    const command = CommandService.getCommandByLabel('');
    expect(command).toEqual(null)
  })

  test('validateCommandsAndArguments: not a valid command', () => {
    const ARGS = [
      'interpreter',
      'path',
      'invalidCommand'
    ]
    const result = CommandService.validateCommandAndArguments(ARGS);
    
    expect(result).toBeFalsy();

    expect(LoggingService.errorLog).toHaveBeenCalledTimes(1);
    expect(LoggingService.errorLog).toHaveBeenCalledWith('Invalid command, try again');
  })

  test('validateCommandsAndArguments: valid arg count: 0', () => {
    const ARGS = [
      'interpreter',
      'path',
      'new'
    ]
    const result = CommandService.validateCommandAndArguments(ARGS);
    expect(result).toBeTruthy();
    expect(LoggingService.errorLog).not.toHaveBeenCalled();
  })

  test('validateCommandsAndArguments: invalid arg count: 0', () => {
    const ARGS = [
      'interpreter',
      'path',
      'new',
      '1'
    ]
    const result = CommandService.validateCommandAndArguments(ARGS);
    
    expect(result).toBeFalsy();

    expect(LoggingService.errorLog).toHaveBeenCalledTimes(1);
    expect(LoggingService.errorLog).toHaveBeenCalledWith('Incorrect number of arguments');
  })

  test('validateCommandsAndArguments: valid arg count: 1, valid type 1', () => {
    const ARGS = [
      'interpreter',
      'path',
      'delete',
      1
    ]
    const result = CommandService.validateCommandAndArguments(ARGS);
    expect(result).toBeTruthy();
    expect(LoggingService.errorLog).not.toHaveBeenCalled();
  })

  test('validateCommandsAndArguments: valid arg count: 1, valid type 2', () => {
    const ARGS = [
      'interpreter',
      'path',
      'delete',
      'all'
    ]
    const result = CommandService.validateCommandAndArguments(ARGS);
    expect(result).toBeTruthy();
    expect(LoggingService.errorLog).not.toHaveBeenCalled();
  })

  test('validateCommandsAndArguments: valid arg count: 1, invalid type', () => {
    const ARGS = [
      'interpreter',
      'path',
      'complete',
      'invalidType'
    ]
    const result = CommandService.validateCommandAndArguments(ARGS);
    expect(result).toBeFalsy();
    expect(LoggingService.errorLog).toHaveBeenCalledTimes(1);
    expect(LoggingService.errorLog).toHaveBeenCalledWith('Argument is invalid');
  })

  test('validateCommandsAndArguments: valid arg count: 1, valid type, invalid range, < 0', () => {
    const ARGS = [
      'interpreter',
      'path',
      'complete',
      '-1'
    ]
    const result = CommandService.validateCommandAndArguments(ARGS);
    expect(result).toBeFalsy();
    expect(LoggingService.errorLog).toHaveBeenCalledTimes(1);
    expect(LoggingService.errorLog).toHaveBeenCalledWith('Argument is invalid');
  })

  test('validateCommandsAndArguments: valid arg count: 1, valid type, invalid range, > length', () => {
    const ARGS = [
      'interpreter',
      'path',
      'complete',
      '4'
    ]
    const result = CommandService.validateCommandAndArguments(ARGS);
    expect(result).toBeFalsy();
    expect(LoggingService.errorLog).toHaveBeenCalledTimes(1);
    expect(LoggingService.errorLog).toHaveBeenCalledWith('Argument is invalid');
  })
})