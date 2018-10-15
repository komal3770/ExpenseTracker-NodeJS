const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../models/user');

// Register User
router.post('/register', function (req, res) {
	var name = req.body.name;
	var email = req.body.email;
	var mobile = req.body.mobile;
	var password = req.body.password;
	var password2 = req.body.password2;

		userModel.findOne({email:email},function(err, user){
			if(user){
				var resp = {
					"status":0,
					"message":"Email already exist.Please try with new email or login."
				}
				res.send(resp);
			}
			else{
				var newUser = new userModel({
					name: name,
					email: email,
					mobile: mobile,
					password: password
				});
				userModel.createUser(newUser, function (err, user) {
					if (err){
						var resp = {
							"status":0,
							"message":err
						}
						res.send(resp);
					}
					else{
						var resp = {
							"status":1,
							"message":"User Registered"
						}
						res.send(resp);
					}
				});
			}
		});
});

passport.use(new LocalStrategy({
		usernameField: 'email',    // define the parameter in req.body that passport can use as username and password
    	passwordField: 'password'
	},
	function (username, password, done) {
		userModel.findByEmail(username, function (err, user) {
			if (err) throw err;
			if (!user) {
				return done(null, false, { message: 'Unknown User' });
			}

			userModel.comparePassword(password, user.password, function (err, isMatch) {
				if (err) throw err;
				if (isMatch) {
					return done(null, user);
				} else {
					return done(null, false, { message: 'Invalid password' });
				}
			});
		});
	})
);

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	userModel.getUserById(id, function (err, user) {
		done(err, user);
	});
});

router.post('/login',function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) { return next(err) }
		if (!user) {
			console.log(user);
		  	return res.send("Failed to login");
		}
		req.logIn(user, function(err) {
		  if (err) { return next(err); }
		  return res.send("Success");
		});
	  })(req, res, next);	
})

router.get('/logout', function (req, res) {
	req.logout();
	res.send('Logged out');
});

router.get('/getCurrentLoggedInUser', function (req, res) {
	res.json(req.user);
});

module.exports = router;