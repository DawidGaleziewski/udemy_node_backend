const fs = require('fs');
const chalk = require('chalk');

const readNote = title => {
  const notes = loadNotes();
  const noteToRead = notes.find(note => note.title === title);
  if (noteToRead) {
    console.log(
      `
        ${chalk.yellow.bold('Title:')} ${chalk.green.bold(noteToRead.title)}
        ${chalk.yellow.bold('Body:')}  ${chalk.green(noteToRead.body)}
      `
    );
  } else {
    console.log(`${chalk.red.bold('Title not found:')} ${chalk.red(title)}`);
  }
};

const addNote = (title, body) => {
  //! debugger will stop the application. We can use devtools after that.
  // by its own debugger wont change how the app runs. We need to run it with inspect command: node inspect app.js add --title="test" --body="test"
  // After we run node in inspect node we can check what is going on in chrome browse by going to chrome://inspect - you will need chrome for this
  // We can go to inspect in the target list
  //! 'add folder to workspaces' and add whole project
  // Press esc to open console on same window
  // When we click arrow to start the app it will stop on debugger statment

  // On the right we can see information like: what function we are in or  local variables

  // We can simply run restart after we exit debugger to run it again
  debugger;

  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });

    saveNotes(notes);
    console.log(chalk.green.bold('New note added'));
  } else {
    console.log(chalk.red.bold('Rejected: note title already in used'));
  }
};

const listNotes = () => {
  const data = loadNotes();
  data.forEach(note => {
    console.log(
      `
        ${chalk.yellow.bold('Title:')} ${chalk.green.bold(note.title)}
        ${chalk.yellow.bold('Body:')}  ${chalk.green(note.body)}
      `
    );
  });
};

const removeNote = title => {
  const data = loadNotes();
  const dataToKeep = data.filter(note => note.title !== title);

  if (data.length !== dataToKeep.length) {
    const dataJSON = JSON.stringify(dataToKeep);
    fs.writeFileSync('notes.json', dataJSON);
    console.log(chalk.green.bold('Removed title ' + title));
  } else {
    console.log(chalk.red.bold('Note ' + title + ' was not found'));
  }
};

// Utility functions
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveNotes = function(notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};
