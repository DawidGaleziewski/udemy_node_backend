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

// We can use wildcard for a url that starts with help to have better error control
app.get('/help/*', (req,res)=> {
    res.render('404', {
        pageName: 'help',
        errorMsg: 'page in help section not found'
    })
})

// this will have to be always last. We use wildcard and this will simply match anything that was not matched before.
// It needs to be at the end as it will go thru all paths and finally stop at this one if nothing else was matched
app.get('*', (req, res)=> {
    res.render('404', {
        pageName: 'Unknown page',
        errorMsg: 'Unknown page'
    })
})

app.listen(3000, () => {
    console.log('SERVER IS RUNNING ON PORT 3000')
});

