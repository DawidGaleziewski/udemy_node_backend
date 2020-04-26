const path = require('path');
const express = require('express');
const app = express();

const publicDirectory = path.join(__dirname, '../public');

app.use(express.static(publicDirectory));

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

