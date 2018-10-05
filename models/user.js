const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
var user = mongoose.model('user', userSchema);
//Export the Model to make it available for other models
module.exports = user;