const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

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

function getByTodoByIndex(index) {
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

function deleteAllToDos() {
  db.get('todos').remove().write();
}

function deleteAllCompleteTodos() {
  const isCompleteCondition = {complete: true};
  deleteToDoWhere(isCompleteCondition);
}

function deleteTodoByIndex(title) {
  const hasTitleCondition = {title};
  deleteToDoWhere(hasTitleCondition);
}

function deleteToDoWhere(condition) {
  db.get('todos').remove(condition).write();
}

const Todo = {
  createTodo,
  getAllTodos,
  getByTodoByIndex,
  activateTodo,
  deactivateTodo,
  completeTodo,
  deleteAllToDos,
  deleteAllCompleteTodos,
  deleteTodoByIndex
}

module.exports = Todo;