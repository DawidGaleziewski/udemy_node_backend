const fs = require('fs');
// json works well with objects and arrays
const book = {
  title: 'Ego is the Enemy',
  author: 'Ryan Holiday'
};

// fs knows how to work with strings. We need to stringify
// it will change keys to double quoted and single quotes to double quotes
// ! json is not a object so we cannot do something like bookJSON.title
const bookJSON = JSON.stringify(book);
console.log(bookJSON);

// parse will change the json back to obj
const bookOBJ = JSON.parse(bookJSON);
console.log(bookOBJ);

// Saving json file
fs.writeFileSync('1-json.json', bookJSON);

//! When we read a file we do not get the string but the buffer, a binary representation
const dataBuffer = fs.readFileSync('1-json.json');
console.log(dataBuffer);

//<Buffer 7b 22 74 69 74 6c 65 22 3a 22 45 67 6f 20 69 73 20 74 68 65 20 45 6e 65 6d 79 22 2c 22 61 75 74 68 6f 72 22 3a 22 52 79 61 6e 20 48 6f 6c 69 64 61 79 ... 2 more bytes>

// We need to convert the data to string
const dataString = dataBuffer.toString();
console.log(dataString);

// Lastly we need to parse the string to json.
const dataJSON = JSON.parse(dataString);
console.log(dataJSON.title);
