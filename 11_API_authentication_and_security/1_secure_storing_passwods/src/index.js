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


//  we will use bcrypt in user model src/models/user
// We want to hash password in two places:
// a) creation of a user
// b) update of a user

// We will use mongoose midleware for this
// Middleware is called pre and post user hooks used with events
// In this example we want to run some code just before user is saved:
// https://mongoosejs.com/docs/api/model.html#model_Model-save