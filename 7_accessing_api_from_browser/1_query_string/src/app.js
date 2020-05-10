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

// we will need to use query strings to comunicate with this api i.e /products?key=value, /products?search=games
// chaining query strings /products?name=games&rating=5
app.get('/products', (req, res)=> {
    // we can find the query string information on request object
    // query strings are beeing parsed into object by express
    console.log(req.query);

    if(!req.query.search){
        // we use return so that we wont send another response bellow
        return res.send({
            error: 'You must provide a search term'
        })
    } 
// we should not have two send methods. API should fallow one request one response schema. Otherwise we will get a error
    res.send({
        products: []
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({error: 'You need to provide a ddress'})
    }
    res.send({
        longitude: 32,
        latitude: 40,
        address: req.query.address,
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

