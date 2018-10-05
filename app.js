const express = require('express');
const bodyParser = require('body-parser');
const user = require('./routes/user_route'); // Imports routes for the products
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Mongo Connection
var mongoose = require('./config/db');

app.use('/ExpenseTracker', user);

let port = 8080;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});