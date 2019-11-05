const express = require('express');
console.log(__dirname);
console.log(__filename);

const app = express();

app.get('', (req, res) => {
    res.send('<h1> Weather </h1>')
});

app.get('/help', (req, res) => {
    res.send({
        name: 'ss',
        a: 156,
    });
});

app.listen(3000, () => {
    console.log('server 3000')
});