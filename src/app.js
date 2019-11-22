const request = require('request');
const path = require('path');
const express = require('express');
const expressHbs = require("express-handlebars");
const hbs = require('hbs');


const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
// const pathViews = path.join(__dirname, '../templates');
const partialsPath = path.join(__dirname, '../views/partials');
const layoutsPath = path.join(__dirname, '../views/layouts');


app.engine('hbs', expressHbs({
    layoutsDir: layoutsPath,
    defaultLayout: 'layouts',
    extname: 'hbs',
}))

hbs.registerHelper('getTime', () => {
    const myDate = new Date();
    const hour = myDate.getHours();
    const min = myDate.getMinutes();
    const sec = myDate.getSeconds();

    if (min < 10) {
        min = `0${min}`;
    }

    if (sec < 10) {
        sec = `0${min}`;
    }

    return `Current time ${hour}:${min}:${sec}`;
});


app.set('view engine', 'hbs')
// app.set('views', pathViews)
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.use('/contacts', (req, resp) => {
    resp.render('contacts', {
        title: "Мои контакты",
        emailsVisible: true,
        emails: ["gavgav@mycorp.com", "mioaw@mycorp.com"],
        phone: "+1234567890"
    })

});

app.get('/sort', (req, resp) => {
    resp.render('sort', {
        result: [ 1, 5, 8],
    })

});



// app.get('', (req, res) => {
//     res.render('index', {
//         title: 'ssdd',
//         name: 'Max',
//     })
// });


app.get('/about', (req, res) => {
    // res.render('about', {
    //     title: 'about',
    //     name: 'TOo',
    // })
    res.render("about.hbs");
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

app.use("/", (request, response) => {
      
    response.render("home.hbs");
});


app.get('*', (req, res) => {
    res.render('404', {
        error: 'error'
    })
})

app.listen(3000, () => {
    console.log('server 3000')
});

