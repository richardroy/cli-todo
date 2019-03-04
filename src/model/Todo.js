const db = require('../model/Database');

// Set some defaults (required if your JSON file is empty)
db.defaults({ todos: []}).write()

function createTodo(todoTitle) {
  db.get('todos')
  .push({
    title: todoTitle,
    complete: false,
    active: false
  })
  .write()
}

function getAllTodos() {
  const todos = db.get('todos').value()
  return todos;
}

function getTodoByIndex(index) {
  const todo = db.get('todos').nth(index).value()
  return todo;
}

function activateTodo(todoIndex) {
  db
    .set(`todos[${todoIndex}].active`, true)
    .write()
}

function deactivateTodo(todoIndex) {
  db
    .set(`todos[${todoIndex}].active`, false)
    .write()
}

function completeTodo(todoIndex) {
  db
    .set(`todos[${todoIndex}].complete`, true)
    .set(`todos[${todoIndex}].active`, false)
    .write()
}

function deleteAllTodos() {
  db.get('todos').remove().write();
}

function deleteAllCompleteTodos() {
  const isCompleteCondition = {complete: true};
  deleteToDoWhere(isCompleteCondition);
}

function deleteTodoByTitle(title) {
  const hasTitleCondition = {title};
  deleteToDoWhere(hasTitleCondition);
}

function deleteToDoWhere(condition) {
  db.get('todos').remove(condition).write();
}

const Todo = {
  createTodo,
  getAllTodos,
  getTodoByIndex,
  activateTodo,
  deactivateTodo,
  completeTodo,
  deleteAllTodos,
  deleteAllCompleteTodos,
  deleteTodoByTitle
}

module.exports = Todo;