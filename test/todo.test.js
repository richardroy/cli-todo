const todo = require('../src/todo');
const CommandService = require('../src/service/CommandService')
const ToDoService = require('../src/service/ToDoService')
const LoggingService = require('../src/service/LoggingService')
const InputService = require('../src/service/InputService')

jest.mock('../src/service/CommandService')
jest.mock('../src/service/ToDoService')
jest.mock('../src/service/LoggingService')
jest.mock('../src/service/InputService')

describe('todo', () => {
  test('h', () => {
    InputService.getCommandLineArgs = jest.fn().mockReturnValue(['','','h'])
    CommandService.validateCommandAndArguments = jest.fn().mockReturnValue(true);

    todo.processInput()

    expect(InputService.getCommandLineArgs).toHaveBeenCalled();
    expect(CommandService.showUsageInstruction).toHaveBeenCalled();
  })

  test('help', () => {
    InputService.getCommandLineArgs = jest.fn().mockReturnValue(['','','help'])
    CommandService.validateCommandAndArguments = jest.fn().mockReturnValue(true);

    todo.processInput()

    expect(InputService.getCommandLineArgs).toHaveBeenCalled();
    expect(CommandService.showUsageInstruction).toHaveBeenCalled();
  })

  test('n', () => {
    InputService.getCommandLineArgs = jest.fn().mockReturnValue(['','','n'])
    CommandService.validateCommandAndArguments = jest.fn().mockReturnValue(true);

    todo.processInput()

    expect(InputService.getCommandLineArgs).toHaveBeenCalled();
    expect(ToDoService.createTodo).toHaveBeenCalled();
    expect(ToDoService.logOutToDos).toHaveBeenCalled();
  })

  test('new', () => {
    InputService.getCommandLineArgs = jest.fn().mockReturnValue(['','','new'])
    CommandService.validateCommandAndArguments = jest.fn().mockReturnValue(true);

    todo.processInput()

    expect(InputService.getCommandLineArgs).toHaveBeenCalled();
    expect(ToDoService.createTodo).toHaveBeenCalled();
    expect(ToDoService.logOutToDos).toHaveBeenCalled();
  })

  test('g', () => {
    InputService.getCommandLineArgs = jest.fn().mockReturnValue(['','','g'])
    CommandService.validateCommandAndArguments = jest.fn().mockReturnValue(true);

    todo.processInput()

    expect(InputService.getCommandLineArgs).toHaveBeenCalled();
    expect(ToDoService.logOutToDos).toHaveBeenCalled();
  })

  test('get', () => {
    InputService.getCommandLineArgs = jest.fn().mockReturnValue(['','','get'])
    CommandService.validateCommandAndArguments = jest.fn().mockReturnValue(true);

    todo.processInput()

    expect(InputService.getCommandLineArgs).toHaveBeenCalled();
    expect(ToDoService.logOutToDos).toHaveBeenCalled();
  })

  test('complete', () => {
    InputService.getCommandLineArgs = jest.fn().mockReturnValue(['','','complete', '1'])
    CommandService.validateCommandAndArguments = jest.fn().mockReturnValue(true);

    todo.processInput()

    expect(InputService.getCommandLineArgs).toHaveBeenCalled();
    expect(ToDoService.completeTodo).toHaveBeenCalled();
    expect(ToDoService.completeTodo).toHaveBeenCalledWith('1');
    expect(ToDoService.logOutToDos).toHaveBeenCalled();
  })

  test('delete', () => {
    InputService.getCommandLineArgs = jest.fn().mockReturnValue(['','','delete', '1'])
    CommandService.validateCommandAndArguments = jest.fn().mockReturnValue(true);

    todo.processInput()

    expect(InputService.getCommandLineArgs).toHaveBeenCalled();
    expect(ToDoService.deleteTodo).toHaveBeenCalled();
    expect(ToDoService.deleteTodo).toHaveBeenCalledWith('1');
    expect(ToDoService.logOutToDos).toHaveBeenCalled();
  })

  test('activate', () => {
    InputService.getCommandLineArgs = jest.fn().mockReturnValue(['','','activate', '1'])
    CommandService.validateCommandAndArguments = jest.fn().mockReturnValue(true);

    todo.processInput()

    expect(InputService.getCommandLineArgs).toHaveBeenCalled();
    expect(ToDoService.activateTodo).toHaveBeenCalled();
    expect(ToDoService.activateTodo).toHaveBeenCalledWith('1');
    expect(ToDoService.logOutToDos).toHaveBeenCalled();
  })

  test('deactivate', () => {
    InputService.getCommandLineArgs = jest.fn().mockReturnValue(['','','deactivate', '1'])
    CommandService.validateCommandAndArguments = jest.fn().mockReturnValue(true);

    todo.processInput()

    expect(InputService.getCommandLineArgs).toHaveBeenCalled();
    expect(ToDoService.deactivateTodo).toHaveBeenCalled();
    expect(ToDoService.deactivateTodo).toHaveBeenCalledWith('1');
    expect(ToDoService.logOutToDos).toHaveBeenCalled();
  })

  test('invalid', () => {
    InputService.getCommandLineArgs = jest.fn().mockReturnValue(['','','invalid', '1'])
    CommandService.validateCommandAndArguments = jest.fn().mockReturnValue(true);

    todo.processInput()

    expect(InputService.getCommandLineArgs).toHaveBeenCalled();
    expect(LoggingService.errorLog).toHaveBeenCalled();
    expect(LoggingService.errorLog).toHaveBeenCalledWith('invalid command passed');
    expect(CommandService.showUsageInstruction).toHaveBeenCalled();
  })
})