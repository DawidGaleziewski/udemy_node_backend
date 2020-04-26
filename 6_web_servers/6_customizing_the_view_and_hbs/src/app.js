const path = require('path');
const express = require('express');
const app = express();

// Define paths for express config
const publicDirectory = path.join(__dirname, '../public');
// new view path
const viewsPath = path.join(__dirname, '../templates');

app.set('view engine','hbs');
// normally express will expect views to live in ./views dir. We can change this by app set
app.set('views', viewsPath);

// Setup static directory to server
app.use(express.static(publicDirectory));

// Routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Test title from node.js',
        name: 'Dave'
    });
})

app.get("/about", (req,res)=> {
    res.render('about', {
        title: 'About title rendered from node.js'
    })
})

app.get('/help', (req, res) => {
    res.render("help", {msg: 'hello there from help node.js'})
})

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

