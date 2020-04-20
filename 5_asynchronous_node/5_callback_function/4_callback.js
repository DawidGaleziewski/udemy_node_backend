const chalk = require('chalk');

// Callback pattern used in async function
setTimeout(() => {
  console.log(chalk.bold.green('two seconds are up'));
}, 2000);

// Callback pattern in sync function
const names = ['Andrew', 'Jen', 'Jess'];
const shortNames = names.filter(name => {
  return name.length <= 4;
});
console.log(shortNames);

// Using callback in our own functions
const geocode = (address, callback) => {
  // Hardcoded data just as a example
  setTimeout(() => {
    const data = {
      latitude: 0,
      longitude: 0
    };
    // Set timeout is returning value. The geocode itself however will just run as it has nothing to return
    // return data;

    // We decide what gets passed to callback
    callback(data);
  }, 2000);
};

// Normally we would just return data and then store it in variable
// ! problem is however with async code
//
// const data = geocode('Warsaw');
// console.log(data);

// Callback pattern
geocode('Warsaw', data => {
  console.log(data);
});

//
// Goal: Mess around with the callback pattern
//
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum
// 4. Test your work!

const add = (num1, num2, callback) => {
  setTimeout(() => {
    const resault = num1 + num2;
    callback(resault);
  }, 2000);
};

add(1, 4, sum => {
  console.log(sum); // Should print: 5
});
