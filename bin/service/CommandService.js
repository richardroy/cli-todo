const chalk = require('chalk');
const LoggingService = require('./LoggingService');

const commands = [
  {
    label: 'new', 
    argCount: 0,
    hint: 'used to create a new todo\n\
          press enter to write the title of your todo item',
  },
  {
    label: 'get',
    argCount: 0,
    hint: `used to retrieve your todos\n\
          ${chalk.white('white')}, incomplete\n\
          ${chalk.green('green')}, completed\n\
          ${chalk.yellow('yellow')}, active`
  },
  {
    label: 'complete',
    argCount: 1,
    hint: 'used to mark a todo as complete. Will also deactivate active tasks\n\
          can pass in the todo number, will complete that item'
  },
  {
    label: 'delete',
    argCount: 1,
    hint: 'used to remove a todo\n\
          can pass in the todo number, will delete a single todo item\n\
          can pass in \'completed\', will delete all of the completed todo items\n\
          can pass in \'all\', will delete all todo\'s in the list'
  }, 
  {
    label: 'activate',
    argCount: 1,
    hint: 'used to mark a todo as the active item\n\
          can pass in the todo number, will activate that item'
  },
  {
    label: 'deactivate',
    argCount: 1,
    hint: 'used to mark a todo as an inactive item\n\
          can pass in the todo number, will deactivate that item'
  },  
  {
    label: 'help',
    argCount: 0,
    hint: 'used to print the usage guide'
  },
]

function getAllCommands() {
  return commands;
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

function validateCommandAndArguments(commandInput, argCount) {
  const command = CommandService.getCommandByLabel(commandInput);
  if(command ){
    if(hasCorrectArgCount(command, argCount)) {
      return true;
    } else {
      LoggingService.errorLog('Incorrect number of arguments');
    }
  } else {
    showUsageInstruction();
  }
  return false;
}

function hasCorrectArgCount(command, argCount) {
  // [0]: Default -> interpreter
  // [1]: Defailt -> full file path
  // [2]: users written command
  return command.argCount === (argCount - 3)
}

const CommandService = {
  getAllCommands,
  getCommandByLabel,
  validateCommandAndArguments,
  showUsageInstruction,
}

module.exports = CommandService;