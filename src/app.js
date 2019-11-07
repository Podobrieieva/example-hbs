const request = require('request');
const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const pathViews = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs')
app.set('views', pathViews)
hbs.registerPartials(partialsPath);


app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'ssdd',
        name: 'Max',
    })
});


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about',
        name: 'TOo',
    })
});

app.get('/products', (req, res) => {
    if (req.query.search === undefined) {
        return res.send({
            error: 'Search is required',
        })
    }
    
    const url = 'https://api.darksky.net/forecast/02b00eb67db4a149a927536413d734a8/37.8267,-122.423?units=si'
    
    request({ url, json: true }, (err, resp) => {
        res.send({
            products: resp.body.currently.temperature,
        })
    })
});

app.get('/help', (req, res) => {
    res.send({
        name: 'ss',
        a: 156,
    });
});

app.get('/about/*', (req, res) => {
    res.send('about not found')
})


app.get('*', (req, res) => {
    res.render('404', {
        error: 'error'
    })
})

app.listen(3000, () => {
    console.log('server 3000')
});