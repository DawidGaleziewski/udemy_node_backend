const validator = require('validator');
const getNotes = require('./notes');
const chalk = require('chalk');

console.log(getNotes());

console.log(validator.isEmail('dawid.gal@test.com'));
console.log(validator.isURL('http://google.com'));

console.log(chalk.bgGreen.black('Honk Honk'));

const Obj = {
  name: 'Dawid',
  surname: 'Boldiwn'
};

console.log(`
    NAME: ${chalk.red.bold(Obj.name)}
    SURNAME: ${chalk.yellow.bold(Obj.surname)}
`);
