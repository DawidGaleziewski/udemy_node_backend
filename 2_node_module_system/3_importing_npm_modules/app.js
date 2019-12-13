const validator = require('validator');
const getNotes = require('./notes');

console.log(getNotes());

console.log(validator.isEmail('dawid.gal@test.com'));
console.log(validator.isURL('http://google.com'));
