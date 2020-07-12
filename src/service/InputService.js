const readLine = require('readline');

function prompt(question) {
  const read = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  return new Promise((resolve, error) => {
    read.question(question, answer => {
      read.close()
      resolve(answer)
    });
  })
}

function getCommandLineArgs() {
  return process.argv;
}

const Input = {
  prompt,
  getCommandLineArgs
}

module.exports = Input;