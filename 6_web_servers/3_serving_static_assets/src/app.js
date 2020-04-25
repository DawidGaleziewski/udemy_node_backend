// it is good practice to load in core module before npm modules
const path = require('path');
const express = require('express');
const app = express();
// we could manipulate returned string but we can use a method called path


// to server a html file we CANT use relative path. It has to be absolute path from our machine
// we will need two variables provided by node for this

console.log(__dirname); //shows parent folder path of the script
console.log(__filename); //shows the parent fodler path and the file
console.log(path.join(__dirname, '../public')) // first arg is the path and second is how we want to manipulate it for example go up dir by ../
const publicDirectory = path.join(__dirname, '../public');

// app.use is a method that helps us customize our server
app.use(express.static(publicDirectory));

// due to fact that we named our html index.html and for webserver this will automatically load on root (app.com/ === app.com/index.html) we can remove the code below
// app.get('', (req, res)=> {
//     res.send('<h1>HELLO</h1>');
// });

app.get('/help', (req, res)=> {
    res.send({
        name: 'Dave',
        age: 30
    });
});

app.get('/about', (req, res) => {
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

