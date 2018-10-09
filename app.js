const express = require('express');
const bodyParser = require('body-parser');
//const user = require('./routes/user_route'); // Imports routes for the products
const app = express();
const port_config = require('./config/config');

app.use('/ExpenseTracker/views', express.static(__dirname + '/views'));//To open HTML Files

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Mongo Connection
var mongoose = require('./config/db');

app.use('/ExpenseTracker', require('./routes/user_route'));
app.use('/ExpenseTracker/expense', require('./routes/expense_route'));

let port = port_config.app.port;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});