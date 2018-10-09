const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema for User Collection
var expenseSchema = new Schema({
    budgetId : String
},{
    collection:'expense'
});

//Create Model
var expense = mongoose.model('expense', expenseSchema);
//Export the Model to make it available for other models
module.exports = expense;