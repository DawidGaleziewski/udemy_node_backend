const fs = require('fs');

const getNotes = () => {
  return 'Your notes...';
};

const addNote = function(title, body) {
  const notes = loadNotes();

  // Check if title exist
  const duplicateNotes = notes.filter(function(note) {
    return note.title === title;
  });

  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body
    });

    saveNotes(notes);
    console.log('New note added');
  } else {
    console.log('Note title taken');
  }
};

// We need to load notes for above functions, so we can use a seperate function for this
const loadNotes = function() {
  // to avoid situations like crash when file does not exist we can use try/catch

  try {
    // try to save the data from the file
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    // return the empty array if the file does not exist
    return [];
  }
};

// Function for saving notes
const saveNotes = function(notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

// When we want to export more then one functions we can create a object storing those functions
module.exports = {
  getNotes: getNotes,
  addNote: addNote
};
