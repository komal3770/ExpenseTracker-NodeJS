const mongoose = require('mongoose');
const config = require('./config');
const config_db = config.db;//To access db variable in config.js

const dev_db_url = `mongodb://${config_db.host}:${config_db.port}/${config_db.name}`;//mongodb://localhost:27017/user-registration

const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
