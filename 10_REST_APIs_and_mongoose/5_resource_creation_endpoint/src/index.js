const express = require('express');
// We want to run the whole file in mongoose
require('./db/mongoose');
// We want to load user model
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

//  We can use express build in method to automatically parse incoming json to objects!
app.use(express.json());

// express provides other methods like post works same as get
// it is good convention to use purals like /users /tasks in routes responsible for CRUD
// To test this route in POSTMAN we need to use post method.
// Also to send the json in the body we need to go to the BODY tab -> check "raw" -> check JSON 
app.post('/users', (req, res) => {
    // We pass the object for the model from our request
    const user = new User(req.body);
    // After that we want to try to save user to the database
    user.save().then(() => {
        // if all went fine we want to send back the user object
        res.status(201) //Changing from generic 200 to 201 (created)
        res.send(user)
    }).catch((error) => {
        // If something goes back we want to send back the error
        // We also want to change the status of the error
        // list of statuses: https://httpstatuses.com/
        // 4xx errors are when there is client error - issue due to client
        // 5xx are errors due to server
        // res.status(400);
        res.status(400).send(error); 
    })
});

app.post('/tasks', (req, res) => {
    const task = new Task(req.body);
    task.save().then(() => {
        res.status(201);
        res.send(task);
    }).catch((error)=> {
        res.status(400);
        res.send(error);
    })
})

app.listen(port, ()=> {
    console.log('Server is up on port ' + port);
});