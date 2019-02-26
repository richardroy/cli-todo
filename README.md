# Basic Todo for your terminal
A very simple todo that runs within your cli, and will notify you every 5 minutes the task you are currently working on.

It has the following available commands:
  -  <new:>        used to create a new todo
  -  <get:>        used to retrieve your todos
  -  <complete:>   used to mark a todo as complete, will also deactivate it if active
  -  <delete:>     used to remove a todo
  -  <activate:>   used to mark a todo as the active item
  -  <deactivate:> used to mark a todo as the inactive item
  -  <help:>       used to print the usage guide

*complete / delete / activate / deactivate are all used by passing the index shown when calling get*

![Example of complete and delete](./examples/cli-todo.gif)

### Running Locally
Change into project dir then run: `npm install`  
Trigger the todo via: `./bin/todo <commands>`

### Global Installation
run: `npm intall -g ./`  
Then you can access it via: `todo <commands>`

Resources used:  
https://scotch.io/tutorials/building-cli-applications-with-nodejs
