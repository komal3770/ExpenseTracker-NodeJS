const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const SALT_KEY = 10;
//Create Schema for User Collection
var userSchema = new Schema({
    name:String,
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password:{
        type:String,
        required:true
    },
    mobile:String,
    createdDate:{ 
        type : Date, 
        default: Date.now 
    }
},{
    collection:'user'
});

//Create Model
var User = mongoose.model('user', userSchema);
//Export the Model to make it available for other models
module.exports = User;

module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(SALT_KEY, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);//callback is called asynchronously at the end of given task i.e. saveUser
	    });
	});
}

module.exports.findByEmail = function(email,callback){
    var query = {email: email};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}