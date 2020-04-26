const path = require('path');
const express = require('express');
const app = express();

const publicDirectory = path.join(__dirname, '../public');

// we use hbs as a template engine.
//After installing the hbs we need to set express to use it
// app.set accepts two params, the name of the value we want to set and its value
// Express will expect the template engine to use directory in ./view
app.set('view engine','hbs');
app.use(express.static(publicDirectory));

// we need to set new route as we moved index.html to view folder which is not our root
app.get('', (req, res) => {
    // for views we use render and not send
    // to pass dynamic values we pass second param that is a object
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

