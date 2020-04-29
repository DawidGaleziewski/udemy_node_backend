const path = require('path');
const express = require('express');
const app = express();

const hbs = require('hbs');

const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
console.log(hbs.partials)

app.set('view engine','hbs');
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);

// Setup static directory to server
app.use(express.static(publicDirectory));


// Routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Test title from node.js',
        name: 'Dave',
        headerTitle: 'root dir'
    });
})

app.get("/about", (req,res)=> {
    res.render('about', {
        title: 'About title rendered from node.js',
        headerTitle: 'Nobody ever fucking reads about'
    })
})

app.get('/help', (req, res) => {
    res.render("help", {msg: 'hello there from help node.js', headerTitle: 'help is for dimwits'})
})

app.get('/weather', (req,res) => {
    res.send({
        longitude: 32,
        latitude: 40,
        location: 'Warsaw',
        temp: 34
    });
})

app.get('/help/*', (req,res)=> {
    res.render('404', {
        pageName: 'help',
        errorMsg: 'page in help section not found'
    })
})

app.get('*', (req, res)=> {
    res.render('404', {
        pageName: 'Unknown page',
        errorMsg: 'Unknown page'
    })
})

app.listen(3000, () => {
    console.log('SERVER IS RUNNING ON PORT 3000')
});

