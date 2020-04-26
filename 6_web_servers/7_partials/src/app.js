const path = require('path');
const express = require('express');
const app = express();
// in order to configure hbs we need to first load it
const hbs = require('hbs');

const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
console.log(hbs.partials)

app.set('view engine','hbs');
app.set('views', viewsPath);

// we need to point hbs where partials will be stored
hbs.registerPartials(partialsPath);

// Setup static directory to server
app.use(express.static(publicDirectory));



// To load a partial in html document {{>header}} #see help
// we also need to change the way we load nodemon to watch over hbs files:
// nodemoon filepath -e js, hbs

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

