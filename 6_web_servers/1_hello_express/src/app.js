const express = require('express'); //Express is a single function

const app = express();

// we want to setup our routes

// get() method responses to the get mehotd on the server
// get takes two arguments:
// 1. partial route. i.e app.com/help => help
// 2. callback describing what should happen
// callback accepts two params, req that is a object containing data from the request and res that we can use for methods responding to the request
app.get('', (req, res)=> {
    // send is method on response that sends back something to the user
    res.send('hello express!');
});

app.get('/help', (req, res)=> {
    res.send('HELP PAGE');
});

app.get('/about', (req, res) => {
    res.send("ABOUT THIS PAGE");
});

app.get('/weather', (req,res) => {
    res.send("VIEW THE WEATHER");
})

// listen starts the server and tells it on which port the information can be served
// second argument is a callback on what should happen after the server has started
// We can see our website served on: http://127.0.0.1:3000/
app.listen(3000, () => {
    console.log('SERVER IS RUNNING ON PORT 3000')
});


// We can start server by nodemon so that server will refresh after each change