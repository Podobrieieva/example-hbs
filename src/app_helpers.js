const express = require('express');
const hbs = require('hbs');


const app = express();

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

hbs.registerHelper("createStringList", (array) => {
     
    let result="";
    for(let i=0; i<array.length; i++){
        result +="<li>" + array[i] + "</li>";
    }
    return new hbs.SafeString("<ul>" + result + "</ul>");
});
 


app.set('view engine', 'hbs');

app.get("/", (request, response) => {
    response.render("home1.hbs", {
        fruit: ["apple", "lemon", "banana", "grape"],
    });
});


app.listen(3000, () => {
    console.log('server 3000')
});