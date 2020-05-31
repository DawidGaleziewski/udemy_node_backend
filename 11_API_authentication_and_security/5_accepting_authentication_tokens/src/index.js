const express = require('express');
require('./db/mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Routers
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

// Best to use middleware in seperate files
// we will import our middleware/auth to the user router

// maintnance code
// app.use((req, res, next) => {
//     //  This will block every route handler and respond with the maintenance msg
//     res.status(503).send('Sorry, website is under maintenance');
// })


// Register
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, ()=> {
    console.log('Server is up on port ' + port);
});
