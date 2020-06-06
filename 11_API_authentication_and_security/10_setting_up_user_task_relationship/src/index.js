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

// Playground
const Task = require('./models/task');
const User = require('./models/user');

const main = async () => {
    const task = await Task.findById('5edab9fd73ac490194b7dfeb');
    // This line will populate data in task.owner so that it is no longer just the id but the whole data of the profile
    // we need to set ref in model to make use of this
    await task.populate('owner').execPopulate();
    console.log(task.owner);

    // We can go another way and grab all the tasks related to the user:
    const user = await User.findById('5ed80455dca9e7089850d50b');
    //  in order to do this we need to set a VIRTUAL PROPERTY. More on this in the user model
    // we get virtual data now. It contains all tasks created by this user
    await user.populate('tasks').execPopulate();
    console.log(user.tasks);

   
}

main();

