const user = require('../models/user');
const bcrypt = require('bcryptjs');
const SALT_KEY = 10;
var query = require('url');

//Register New User
exports.saveUser = function (req, res) {
    var userData = new user({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });
    //Encrypt password
    bcrypt.hash(userData.password, SALT_KEY, function(err,hash){
        if(err)
            res.send("Failed to save user");
        else{
            userData.password = hash;
            userData.save(function(err){
                if(err)
                    res.send('User Failed '+err);
                else
                    res.send('User Created successfully');
            });
        }
        
    });
};

exports.getAll = function (req, res) {
    user.find(function (err, userData) {
        if (err) return next(err);
        res.send(userData);
    });
};

exports.getUserByEmail = function (req, res) {
    console.log("Url "+req.url);
    console.log("Email "+query.parse(req.url,true).query.email);
    user.find({
        email : query.parse(req.url,true).query.email
    },
    function (err, data) {
        if (err){
            res.send("Failed");
        }
        else
            res.send(data);
    });
};