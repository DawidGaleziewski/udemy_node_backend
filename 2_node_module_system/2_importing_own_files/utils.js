console.log('./utils.js');

// const myName = 'Dawid';

const add = function(a, b) {
  return a + b;
};

// WIthout this the variable will not get exported
// module.exports = myName;
module.exports = add;
