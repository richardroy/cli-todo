const Input = require('./InputService');
const LoggingService = require('./LoggingService');
const Todo = require('../model/Todo');
const chalk = require('chalk')

function createTodo() {
  const q = chalk.blue('Type in your todo\n')
  Input.prompt(q).then(todo => {
    Todo.createTodo(todo);
    getTodos();
  })
}

function completeTodo(selectedToDo) {
  let n = Number(selectedToDo)
  Todo.completeTodo(n-1);
  getTodos();
}

function getAllToDos() {
  return Todo.getAllTodos();
}

function getTodos() {
  const todos = Todo.getAllTodos();
  let index = 1;
  console.log('')
  todos.forEach(todo => {
    let todoText = `${index++}. ${todo.title}`
    if(todo.complete) {
      todoText += ' ✔ ️' // add a check mark
      formattedText = chalk.green(todoText);
    } else if(todo.active){ 
      formattedText = chalk.yellow(todoText);
    } else {
      formattedText = chalk.white(todoText);
    }
    console.log(formattedText);
  })
  if(todos.length === 0) {
    console.log('There are none left to do!');
  }
  console.log('');
}

function activateTodo(selectedToDo) {
  let n = Number(selectedToDo)
  // update the todo item marked as complete
  Todo.activateTodo(n-1);
  const activeTodo = Todo.getTodoByIndex(n-1);
  console.log(`Working on the following: ${chalk.yellow(activeTodo.title)}`)
  LoggingService.activateLoggingCron(activeTodo);
}

function deactivateTodo(selectedToDo) {
  let n = Number(selectedToDo)
  // update the todo item marked as complete
  Todo.deactivateTodo(n-1);
  getTodos();
}

function deleteTodo(selectedToDo) {
  let deleteKey = selectedToDo;
  if(isNaN(deleteKey)){
    if(deleteKey === 'all') {
      Todo.deleteAllTodos();
    } else if (deleteKey === 'completed') {
      Todo.deleteAllCompleteTodos();
    } else {
      errorLog('Incorrect delete command');
      return;
    }
  } else {
    let n = Number(selectedToDo)
    const todo = Todo.getTodoByIndex(n-1);
    Todo.deleteTodoByIndex(todo.title);
  }

  getTodos();
}

ToDoService = {
  createTodo,
  getAllToDos,
  completeTodo,
  getTodos,
  activateTodo,
  deactivateTodo,
  deleteTodo,
}
module.exports = ToDoService