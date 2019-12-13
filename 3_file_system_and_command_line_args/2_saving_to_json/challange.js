// 1 Load file system to read/write data
const fs = require('fs');

// 2. load the data buffer
const dataBuffer = fs.readFileSync('1-json.json');

// 3. Convert data binary representation to string, change it to object
const dataString = dataBuffer.toString();

// 4. Convert string to object
const dataOBJ = JSON.parse(dataString);

//! Short version
// const data = JSON.parse(fs.readFileSync('1-json.json').toString());

// 5. Modify data
dataOBJ.name = 'Dawid';
dataOBJ.age = 29;

// Change data back to json string
const dataJSONSecond = JSON.stringify(dataOBJ);

// Save data to file
fs.writeFileSync('modified-json.json', dataJSONSecond);
