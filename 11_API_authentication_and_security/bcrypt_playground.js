// We will hash passwords for security. we will use bcrypt
const bcrypt = require('bcryptjs');

const myFunction = async () => {
    const password = 'Read12345!';
    // bcrypt returns promise so we need to use await
    // first argument is password second is number of rounds of hasing
    // 8 is nice balance between security and speed
    const hashedPassword = await bcrypt.hash(password, 8);
    console.log('password: ' + password, 'hashed password: ' + hashedPassword);

    const isMatch = await bcrypt.compare('Read12345!', hashedPassword);
    console.log('Do passwords match: ' + isMatch)
}

myFunction();

// ! important hashing algo != encryption algo
// - with encryption we can get back the password we hashed
// password -> dafsadf.adf1233 -> password

// - with  hasing we cannot. hasing algorithm is a one way algorithm
//  we have to compare a plain text password user gives us with the password stored in the database