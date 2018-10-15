const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const engines = require('consolidate');
const port_config = require('./config/config');

//To open HTML Files
app.use('/ExpenseTracker/routes/views', express.static(__dirname + '/views'));

//Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Set Static Folder to access css & js files in html
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: false
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Global Vars
app.use(function (req, res, next) {
    res.locals.user = req.user || null;
    next();
});

//Mongo Connection
var mongoose = require('./config/db');

//Defining routes
app.use('/ExpenseTracker', require('./routes/user_route'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './views/login.html'));
});

let port = process.env.PORT || port_config.app.port;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});