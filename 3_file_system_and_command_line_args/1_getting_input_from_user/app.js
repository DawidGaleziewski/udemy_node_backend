const chalk = require('chalk');
const yargs = require('yargs');
const getNotes = require('./notes');

// console.log(getNotes());

// It returns array with 3 items:
// Path to executable for node
// Path to app file
// Input in argument
// console.log(process.argv[2]);

// we store the input in a variable
// const command = process.argv[2];

yargs.version('1.1.0');
// console.log(yargs.argv.title);

// Create add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  // builder handles properties for our commands
  builder: {
    title: {
      describe: 'Note title',
      // If we need this to be passed in order to work
      demandOption: true,
      // If we want type of the properties
      type: 'string'
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  // We pass argv to our function to have access to arguments passed in
  handler: function(argv) {
    console.log('Title:' + argv.title, 'Body:' + argv.body);
  }
});

// Create add command
yargs.command({
  command: 'remove',
  describe: 'remove a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler: function(argv) {
    console.log('Removing the note with title:' + argv.title);
  }
});

// Create list command
yargs.command({
  command: 'list',
  describe: 'list all notes',
  handler: function() {
    console.log('Listing all notes');
  }
});

// Create read command
yargs.command({
  command: 'read',
  describe: 'reading notes',
  // builder handles properties for our commands
  builder: {
    title: {
      describe: 'Note title',
      // If we need this to be passed in order to work
      demandOption: true
    }
  },
  // We pass argv to our function to have access to arguments passed in
  handler: function() {
    console.log('reading all notes');
  }
});

// If we console.log yargs we can use commands like --help in order to see what arguments we can use
// ! this is required for it to work we can also call it by yargs.parse()
// console.log(yargs.argv);
yargs.parse();
