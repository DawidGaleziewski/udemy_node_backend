const chalk = require('chalk');
const yargs = require('yargs');
// Import functions as a object
const notes = require('./notes');

// Create add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',

  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler: function(argv) {
    notes.addNote(argv.title, argv.body);
  }
});

// Create remove command
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
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true
    }
  },
  // We pass argv to our function to have access to arguments passed in
  handler: function() {
    console.log('reading all notes');
  }
});

yargs.parse();
console.log(process.argv);
