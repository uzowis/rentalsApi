const express = require('express');
const app = express();

// listen to server
app.listen(3000);
console.log("Listening to port 3000");

app.get('/', (req, res) => {
    res.sendFile('./views/index.html', { root: __dirname});
});
app.get('/about', (req, res) => {
    res.sendFile('./views/about.html', { root: __dirname});
});
app.get('/about-us', (req, res) => {
   // res.sendFile('./views/about.html', { root: __dirname});
    res.redirect('/about');
});
app.use((req, res) => {
    res.sendFile('./views/404.html', { root: __dirname});
});