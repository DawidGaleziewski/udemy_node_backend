const express = require('express');
require('./db/mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Routers
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

// What happens without middleware: new request -> route handler runs
// With middleware: new request -> do something i.e authentication token check -> route handler runs

// we can eaither run middleware for all routes or selected ones
// Middleware is registered using app.use()
// Until this point we only registered express origin functions. Now we will add our custome ones
// this middleware will run after request is delivered and before route handler runs, and it has access to same info
// req and res is same as in any other route handler. next is specific to middleware
// app.use((req, res, next) => {
//     console.log(`Method used: ${req.method}, path used: ${req.path}`);
//     // This function will run as long as we long we dont call next(),i.e it will hang the postman
//     if(req.method = "GET"){
//         res.send('GET requests are disabled');
//     }
//     else {
//         next()
//     }
// })

// maintnance code
app.use((req, res, next) => {
    //  This will block every route handler and respond with the maintenance msg
    res.status(503).send('Sorry, website is under maintenance');
})

// Register
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, ()=> {
    console.log('Server is up on port ' + port);
});
