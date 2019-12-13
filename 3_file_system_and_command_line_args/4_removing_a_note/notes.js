const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
  return 'Your notes...';
};

const addNote = function(title, body) {
  const notes = loadNotes();

  const duplicateNotes = notes.filter(function(note) {
    return note.title === title;
  });

  if (duplicateNotes.length === 0) {
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

const removeNote = title => {
  const data = loadNotes();
  const dataToKeep = data.filter(note => {
    return note.title !== title;
  });

  if (data.length !== dataToKeep.length) {
    const dataJSON = JSON.stringify(dataToKeep);
    fs.writeFileSync('notes.json', dataJSON);
    console.log(chalk.green.bold('Removed title ' + title));
  } else {
    console.log(chalk.red.bold('Note ' + title + ' was not found'));
  }
};

// Utility functions
const loadNotes = function() {
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
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote
};
