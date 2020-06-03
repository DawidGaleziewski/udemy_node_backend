const express = require('express');
require('./db/mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Routers
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');


// Register
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, ()=> {
    console.log('Server is up on port ' + port);
});

// how toJSON works?
// When we pass a json to res.send() it will auto stringify the object
//  when we call toJSON it will get called each time object gets stringified

const pet = {
    name: 'Hal'
}

pet.toJSON = function(){
    console.log('STRINGIFY TRIGGER')
    // we need to return the object or it will be undefined.
    // Now we have a method that will trigger on the object each time it gets stringified
    return this
}
console.log(JSON.stringify(pet))
