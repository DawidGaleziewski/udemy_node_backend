/**
 * We should add relative path with ./ from file we
 * are importing the data to.
 * This is for files we create
 * This will run the utils.js file
 */

// ! when we move a variable to this module it will fail when executing
// This is due to fact that app.js and utils.js have their own scopes.

require('./utils.js');

// ! each file has its own scopes. We can work with this by explicitly exporting values in a module by:
// module.exports = myName;
// const myName = require('./utils');

// console.log(myName);

// We can also use functions
const add = require('./utils');
const sum = add(4, 6);
console.log(sum);
