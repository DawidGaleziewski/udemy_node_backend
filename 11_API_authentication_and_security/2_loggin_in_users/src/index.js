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

// From now one routes will eaither:
// a) be public accessible.
// b) will sit behind a authentication.

// We want to setup login request to send a authentication token.
// Later requester will be able to use the token to authenticate with other routes
// We will use package called json web token for this (JWT)
