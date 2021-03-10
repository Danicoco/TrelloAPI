const express = require('express');
const axios = require('axios');
const app = express();

//using ejs as frontend template --
app.set('view engine', 'ejs');

//Allow parsing of form data
app.use(express.urlencoded({ extended: false }))

//Use static files
app.use('/static', express.static('public'));

//This route contains a form which you can use to upload any type of files to Trello
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/accept', (req, res) => {
    res.send("File uploaded to Trello successfully.")
})

app.listen(5000, (req, res) => console.log(`Server has started on 5000`));