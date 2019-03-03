const ToDoService = require('../../src/service/ToDoService')
const InputService = require('../../src/service/InputService')
const LoggingService = require('../../src/service/LoggingService')
const ToDo = require('../../src/model/Todo')

jest.mock('../../src/model/Todo')
jest.mock('../../src/service/LoggingService')
jest.mock('../../src/service/InputService')

const TODO = {
  title: "Title for test ToDo",
  complete: false,
  active: false
}

const COMPLETED_TODO = {
  title: "Title for test ToDo",
  complete: true,
  active: false
}

const ACTIVE_TODO = {
  title: "Title for test ToDo",
  complete: false,
  active: true
}

const TODOS = [
  TODO,
  COMPLETED_TODO,
  ACTIVE_TODO
]

beforeEach(() => {
  jest.resetAllMocks();
});

test('createTodo: should create a todo', async () => {
  const NEW_TODO_TITLE = "new todo";
  InputService.prompt = jest.fn().mockReturnValue(NEW_TODO_TITLE);

  await ToDoService.createTodo();
  
  expect(InputService.prompt).toHaveBeenCalledTimes(1);
  expect(InputService.prompt).toHaveBeenCalledWith(ToDoService.CREATE_PROMPT);

  expect(ToDo.createTodo).toHaveBeenCalledTimes(1);
  expect(ToDo.createTodo).toHaveBeenCalledWith(NEW_TODO_TITLE);
})

test('completeToDo: Should call to complete a single today', () => {
  const selectedToDoIndex = 1;

  ToDoService.completeTodo(selectedToDoIndex);

  expect(ToDo.completeTodo).toHaveBeenCalledWith(selectedToDoIndex-1);
  expect(ToDo.completeTodo).toHaveBeenCalledTimes(1);
});

test('getAllToDos: Should call models get all', () => {
  ToDo.getAllTodos = jest.fn().mockReturnValue(TODOS)
  const result = ToDoService.getAllToDos();

  expect(ToDo.getAllTodos).toHaveBeenCalledWith();
  expect(ToDo.getAllTodos).toHaveBeenCalledTimes(1);

  expect(result).toBe(TODOS);
});

test('logOutToDos: Logout all of the ToDos', () => {
  ToDo.getAllTodos = jest.fn().mockReturnValue(TODOS);

  ToDoService.logOutToDos();

  expect(ToDo.getAllTodos).toHaveBeenCalledTimes(1);
  expect(ToDo.getAllTodos).toHaveBeenCalledWith();

  expect(LoggingService.defaultLog).toHaveBeenCalledTimes(1);
  //TODO test the value that is passed to LoggingService.defaultLog
  //just need to get the raw string and assert that, havn't been able to do that
})

test('logOutToDos: Notodos in the list', () => {
  ToDo.getAllTodos = jest.fn().mockReturnValue([]);

  ToDoService.logOutToDos();

  expect(ToDo.getAllTodos).toHaveBeenCalledTimes(1);
  expect(ToDo.getAllTodos).toHaveBeenCalledWith();

  expect(LoggingService.defaultLog).toHaveBeenCalledTimes(1);
  expect(LoggingService.defaultLog).toHaveBeenCalledWith('\nThere are none left to do!\n');
})

test('activateToDo: Should activate a todo and schedule a cron', () => {
  const selectedToDoIndex = 1;

  ToDo.getTodoByIndex = jest.fn().mockReturnValue(TODO);

  ToDoService.activateTodo(selectedToDoIndex);

  expect(ToDo.activateTodo).toHaveBeenCalledWith(selectedToDoIndex-1);
  expect(ToDo.activateTodo).toHaveBeenCalledTimes(1);

  expect(ToDo.getTodoByIndex).toHaveBeenCalledWith(selectedToDoIndex-1)
  expect(ToDo.getTodoByIndex).toHaveBeenCalledTimes(1)

  expect(LoggingService.activateLoggingCron).toHaveBeenCalledWith(TODO);
  expect(LoggingService.activateLoggingCron).toHaveBeenCalledTimes(1);
})

test('deactivateToDo: Should deactivate a todo', () => {
  const selectedToDoIndex = 1;

  ToDo.getTodoByIndex = jest.fn().mockReturnValue(TODO);

  ToDoService.deactivateTodo(selectedToDoIndex);

  expect(ToDo.deactivateTodo).toHaveBeenCalledWith(selectedToDoIndex-1);
  expect(ToDo.deactivateTodo).toHaveBeenCalledTimes(1);
})


test('deleteTodo: Should delete by index', () => {
  const selectedToDoIndex = 1;

  ToDo.getTodoByIndex = jest.fn().mockReturnValue(TODO);

  ToDoService.deleteTodo(selectedToDoIndex);

  expect(ToDo.getTodoByIndex).toHaveBeenCalledWith(selectedToDoIndex-1)
  expect(ToDo.getTodoByIndex).toHaveBeenCalledTimes(1)

  expect(ToDo.deleteTodoByTitle).toHaveBeenCalledWith(TODO.title);
  expect(ToDo.deleteTodoByTitle).toHaveBeenCalledTimes(1);

  expect(ToDo.deleteAllTodos).not.toHaveBeenCalled();
  expect(ToDo.deleteAllCompleteTodos).not.toHaveBeenCalled();
})

test('deleteTodo: Should delete all', () => {
  const deleteType = 'all';

  ToDoService.deleteTodo(deleteType);

  expect(ToDo.deleteAllTodos).toHaveBeenCalledWith()
  expect(ToDo.deleteAllTodos).toHaveBeenCalledTimes(1)

  expect(ToDo.deleteTodoByTitle).not.toBeCalled();
  expect(ToDo.deleteAllCompleteTodos).not.toHaveBeenCalled();
})

test('deleteTodo: Should delete all completed', () => {
  const deleteType = 'completed';

  ToDoService.deleteTodo(deleteType);

  expect(ToDo.deleteAllCompleteTodos).toHaveBeenCalledWith()
  expect(ToDo.deleteAllCompleteTodos).toHaveBeenCalledTimes(1)

  expect(ToDo.deleteTodoByTitle).not.toBeCalled();
  expect(ToDo.deleteAllTodos).not.toHaveBeenCalled();
})

test('deleteTodo: Throw error, invalid command', () => {
  const deleteType = 'invalid';

  ToDoService.deleteTodo(deleteType);

  expect(LoggingService.errorLog).toHaveBeenCalledWith("Incorrect delete command")
  expect(LoggingService.errorLog).toHaveBeenCalledTimes(1)

  expect(ToDo.deleteTodoByTitle).not.toBeCalled();
  expect(ToDo.deleteAllTodos).not.toHaveBeenCalled();
  expect(ToDo.deleteAllCompleteTodos).not.toHaveBeenCalled();
})