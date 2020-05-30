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

// It is a good idea to break down routes into cateogies, like a resource (users, tasks etc). 
// We want to create what is called ROUTERS
// const router = new express.Router(); //We use methods on router to customize it
// router.get('/test', (req,res)=> {
//     res.send('This is from my outher router');
// })
// app.use(router); // we need to register router

// USERS CRUD

app.listen(port, ()=> {
    console.log('Server is up on port ' + port);
});
