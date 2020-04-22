// we need difrent modules for http and https
//  http requests modules can be used both to create a server and make a request to a server

const url = 'https://jsonplaceholder.typicode.com/todos/1';
const https = require('https');

const request = https.request(url, (response) => {
    // we want to store incoming data somewhere
    let data = '';
    // in raw node, we have to handle the fact that we wont get the whole body, we will get chunks of data.
    // on() is a function and allows us to reqister a handler on a event
    // in a callback we have access to the chunk data as soon as event data happens
    response.on('data', (chunk)=> {
        // on callback will run multiple times for each chunk
        console.log('got a chunk!')
        data = data + chunk.toString();
    });

    response.on('end', ()=> {
        const body = JSON.parse(data)
        console.log(body)
    });
});

// Handling errors
request.on('error', (error)=> {
    console.log('an error' + error)
})

request.end(); // Without end it will just chang. end will cause the request to send
