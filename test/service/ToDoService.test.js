const ToDoService = require('../../bin/service/ToDoService')
const ToDo = require('../../bin/model/Todo')

jest.mock('../../bin/model/Todo')

const TODO = {
  title: "Title for test ToDo",
  complete: false,
  active: false
}

test('completeToDo: ', () => {
  const selectedToDoIndex = 1;
  ToDo.getAllTodos = jest.fn().mockReturnValue([TODO]);
  ToDoService.completeTodo(selectedToDoIndex);

  expect(ToDo.completeTodo).toHaveBeenCalledWith(selectedToDoIndex-1);
  expect(ToDo.completeTodo).toHaveBeenCalledTimes(1);
});