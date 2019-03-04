const Todo = require('../../src/model/Todo');
const db = require('../../src/model/Database');

const DEFAULT_TODO = {
  title: "Title for test ToDo",
  complete: false,
  active: false
}

const COMPLETED_TODO = {
  title: "Title for completed test ToDo",
  complete: true,
  active: false
}

const ACTIVE_TODO = {
  title: "Title for active test ToDo",
  complete: false,
  active: true
}

let TODOS = [
  DEFAULT_TODO,
  COMPLETED_TODO,
  ACTIVE_TODO
]

describe('Todo', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    db.setState({});
    const TODOS_CLONE = JSON.parse(JSON.stringify(TODOS))
    db.defaults({ todos: TODOS_CLONE }).write()
  });

  test('createToDo: ', () => {
    const todosOriginal = Todo.getAllTodos();
    expect(todosOriginal.length).toBe(3)
    Todo.createTodo(DEFAULT_TODO.title);
    const todosUpdated = Todo.getAllTodos();
    expect(todosUpdated.length).toBe(4)
    expect(todosUpdated[3]).toEqual(DEFAULT_TODO)
  })

  test('getAllTodos: ', () => {
    const todos = Todo.getAllTodos();
    expect(todos).toEqual(TODOS)
  })

  test('getTodoByIndex: ', () => {
    const index = 0;
    const todo = Todo.getTodoByIndex(index);
    expect(todo).toEqual(TODOS[index])
  })

  test('activateTodo: ', () => {
    const index = 0;
    const todoOriginal = Todo.getTodoByIndex(index);
    expect(todoOriginal.active).toBeFalsy();
    Todo.activateTodo(index);
    const todoUpdated = Todo.getTodoByIndex(index);
    expect(todoUpdated.active).toBeTruthy();
  })

  test('deactivateTodo: ', () => {
    const index = 2;
    const todoOriginal = Todo.getTodoByIndex(index);
    expect(todoOriginal.active).toBeTruthy();
    Todo.deactivateTodo(index);
    const todoUpdated = Todo.getTodoByIndex(index);
    expect(todoUpdated.active).toBeFalsy();
  })

  test('completeTodo: ', () => {
    const index = 2;
    const todoOriginal = Todo.getTodoByIndex(index);
    expect(todoOriginal.active).toBeTruthy();
    expect(todoOriginal.complete).toBeFalsy();
    Todo.completeTodo(index);
    const todoUpdated = Todo.getTodoByIndex(index);
    expect(todoUpdated.active).toBeFalsy();
    expect(todoUpdated.complete).toBeTruthy();
  })

  test('deleteAllTodos: ', () => {
    const todosOriginal = Todo.getAllTodos();
    expect(todosOriginal.length).toBe(3)
    Todo.deleteAllTodos();
    const todosUpdated = Todo.getAllTodos();
    expect(todosUpdated.length).toBe(0)
  })

  test('deleteAllCompleteTodos: ', () => {
    const todosOriginal = Todo.getAllTodos();
    expect(todosOriginal.length).toBe(3);
    Todo.deleteAllCompleteTodos()
    const todosUpdated = Todo.getAllTodos();
    expect(todosUpdated.length).toBe(2);
    for(let i = 0; i< todosUpdated.length; i++) {
      expect(todosUpdated[i].complete).toBeFalsy();
    }
  })

  test('deleteTodoByTitle: ', () => {
    const todosOriginal = Todo.getAllTodos();
    expect(todosOriginal.length).toBe(3);
    Todo.deleteTodoByTitle(DEFAULT_TODO.title)
    const todosUpdated = Todo.getAllTodos();
    expect(todosUpdated.length).toBe(2);
    for(let i = 0; i< todosUpdated.length; i++) {
      expect(todosUpdated[i].title).not.toEqual(DEFAULT_TODO.title);
    }
  })
})