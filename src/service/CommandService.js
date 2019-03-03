const chalk = require('chalk');
const LoggingService = require('./LoggingService');
const ToDoService = require('./ToDoService');

const COMMANDS = [
  {
    label: 'new', 
    argCount: 0,
    args: [],
    hint: 'used to create a new todo\n\
          press enter to write the title of your todo item',
  },
  {
    label: 'get',
    argCount: 0,
    args: [],
    hint: `used to retrieve your todos\n\
          ${chalk.white('white')}, incomplete\n\
          ${chalk.green('green')}, completed\n\
          ${chalk.yellow('yellow')}, active`
  },
  {
    label: 'complete',
    argCount: 1,
    args: [
      {
        validTypes: ['NUMBER']
      }
    ],
    hint: 'used to mark a todo as complete. Will also deactivate active tasks\n\
          can pass in the todo number, will complete that item'
  },
  {
    label: 'delete',
    argCount: 1,
    args: [
      {
        validTypes: ['NUMBER', 'STRING']
      }
    ],
    hint: 'used to remove a todo\n\
          can pass in the todo number, will delete a single todo item\n\
          can pass in \'completed\', will delete all of the completed todo items\n\
          can pass in \'all\', will delete all todo\'s in the list'
  }, 
  {
    label: 'activate',
    argCount: 1,
    args: [
      {
        validTypes: ['NUMBER']
      }
    ],
    hint: 'used to mark a todo as the active item\n\
          can pass in the todo number, will activate that item'
  },
  {
    label: 'deactivate',
    argCount: 1,
    args: [
      {
        validTypes: ['NUMBER']
      }
    ],
    hint: 'used to mark a todo as an inactive item\n\
          can pass in the todo number, will deactivate that item'
  },  
  {
    label: 'help',
    argCount: 0,
    args: [],
    hint: 'used to print the usage guide'
  },
]

function getAllCommands() {
  return COMMANDS;
}

function showUsageInstruction() {
  const usageTextSummary = `
  todo helps you manage your tasks.

  usage:
    todo <command>

    commands can be:\n`
  const commandHints = getCommandHints();

  console.log(usageTextSummary + commandHints);
}

function getCommandHints() {
  let commandHints = ''
  const commands = CommandService.getAllCommands();
  let longestLabelLength = 0;
  for(let i=0; i < commands.length; i++) {
    let command = commands[i];
    let labelLength = command.label.length
    if(labelLength > longestLabelLength){
      longestLabelLength = labelLength;
    }
  }

  for(let i=0; i < commands.length; i++) {
    let command = commands[i];
    let spaceString = getSpaceString(longestLabelLength - command.label.length);
    commandHints += `    ${chalk.keyword('orange')(command.label)}:${spaceString} ${command.hint}\n`;
  }
  return commandHints;
}

function getSpaceString(spacesRequired) {
  let spaceString = ''; 
  for(let i = 0; i < spacesRequired; i++) {
    spaceString += ' ';
  }
  return spaceString;
}

function getCommandByLabel(label) {
  const commands = CommandService.getAllCommands();
  for(let i=0; i < commands.length; i++) {
    let command = commands[i];
    if(command.label === label)
      return command;
  }
  return null;
}

function hasValidArguments(command, inputArgs) {
  const commandArgs = command.args;
  if(commandArgs.length === 0)
    return true;

  let validArgCount = 0;
  //for every agument that the command allows
  for(let i = 0; i < commandArgs.length; i++) {
    const validTypes = commandArgs[i].validTypes;
    let hasMatchingArg = false;
    //look at each available type and ensure there is atleast one match
    for(let j = 0; j < validTypes.length; j ++) {
      const validType = validTypes[j];
      switch(validType) {
        case 'NUMBER':
          if (validNumber(inputArgs[i+1]) && withinRange(inputArgs[i+1]))
            hasMatchingArg = true;
          break;
        case 'STRING':
          if(validString(inputArgs[i+1]))
            hasMatchingArg = true;
          break;
      }
    }
    if(hasMatchingArg)
      validArgCount++;
  }
  // validate that each input matches the argument type
  return (validArgCount === inputArgs.length-1)
}

function validNumber(input) {
  return !isNaN(input);
}

function withinRange(indexSelected) {
  const todos = ToDoService.getAllToDos();
  return indexSelected > 0 && indexSelected <= todos.length;
}

function validString(input) {
  return (typeof input === 'string' || input instanceof String)
}

function validateCommandAndArguments(args) {
  const inputArgs = getInputArgs(args);
  const commandInput = inputArgs[0];
  const command = CommandService.getCommandByLabel(commandInput);
  if(command){
    if(hasCorrectArgCount(command, inputArgs.length)) {
      if(hasValidArguments(command, inputArgs)) {
        return true
      } else {
        LoggingService.errorLog('Argument is invalid');
      }
    } else {
      LoggingService.errorLog('Incorrect number of arguments');
    }
  } else {
    LoggingService.errorLog('Invalid command, try again');
    showUsageInstruction();
  }

  return false;
}

function getInputArgs(args) {
  // creates new array using arg values, removes the two default values
  const inputArgs = args.slice();
  inputArgs.shift();
  inputArgs.shift();
  return inputArgs;
}

function hasCorrectArgCount(command, argCount) {
  // [0]: users written command
  return command.argCount === (argCount - 1)
}

const CommandService = {
  getAllCommands,
  getCommandByLabel,
  validateCommandAndArguments,
  showUsageInstruction,

  COMMANDS,
}

module.exports = CommandService;