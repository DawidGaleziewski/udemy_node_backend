const express = require('express');

const app = express();

app.get('', (req, res)=> {
    // sending html
    res.send('<h1>HELLO</h1>');
});

app.get('/help', (req, res)=> {
    // sending json
    // express will automatically detect we are using json and stringify it correctly without our help!
    res.send({
        name: 'Dave',
        age: 30
    });
});

app.get('/about', (req, res) => {
    // same as object array is stringify
    // res.send([1,2,3,4,5, {
    //     test: 'test'
    // }]);
    res.send('<h1>about this page</h1>')
});

app.get('/weather', (req,res) => {
    res.send({
        longitude: 32,
        latitude: 40,
        location: 'Warsaw',
        temp: 34
    });
})

app.listen(3000, () => {
    console.log('SERVER IS RUNNING ON PORT 3000')
});

