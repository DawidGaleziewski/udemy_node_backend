// We need to load filesystem.
// Require system is core system of loading modules, libraries, our own functions

//It is good to see in docs on what is the convention for calling the variable storing the module:
//https://nodejs.org/dist/latest-v12.x/docs/api/fs.html
const fs = require('fs');

// pirst arg is name of the file, second is the data that will be saved
fs.writeFileSync('notes.txt', 'Howdy...');

// Append existing
fs.appendFileSync('notes.txt', '..there pardner');
