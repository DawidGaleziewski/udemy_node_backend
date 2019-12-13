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
  fs.writeFileSync('notes.json', dataJsON);
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};
