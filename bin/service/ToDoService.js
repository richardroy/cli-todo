const InputService = require('./InputService');
const LoggingService = require('./LoggingService');
const Todo = require('../model/Todo');
const chalk = require('chalk')


const CREATE_PROMPT = chalk.blue('Type in your todo\n');

async function createTodo() {
  const todo = await InputService.prompt(CREATE_PROMPT)
  Todo.createTodo(todo);
}

function completeTodo(selectedToDo) {
  let n = Number(selectedToDo)
  Todo.completeTodo(n-1);
}

function getAllToDos() {
  return Todo.getAllTodos();
}

function getTodos() {
  const todos = Todo.getAllTodos();
  let index = 1;
  let todoString = '';
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
    todoString+=`\n${formattedText}`;
  })
  if(todos.length === 0) {
    todoString+='\nThere are none left to do!';
  }
  todoString+='\n';

  LoggingService.defaultLog(todoString);
}

function activateTodo(selectedToDoIndex) {
  let n = Number(selectedToDoIndex)
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
}

function deleteTodo(selectedToDo) {
  let deleteKey = selectedToDo;
  if(isNaN(deleteKey)){
    if(deleteKey === 'all') {
      Todo.deleteAllTodos();
    } else if (deleteKey === 'completed') {
      Todo.deleteAllCompleteTodos();
    } else {
      LoggingService.errorLog('Incorrect delete command');
    }
  } else {
    let n = Number(selectedToDo)
    const todo = Todo.getTodoByIndex(n-1);
    Todo.deleteTodoByIndex(todo.title);
  }
}

ToDoService = {
  createTodo,
  getAllToDos,
  completeTodo,
  getTodos,
  activateTodo,
  deactivateTodo,
  deleteTodo,

  CREATE_PROMPT
}
module.exports = ToDoService