var expense = require('../models/expense');

exports.addExpense = function (req, res) {
    var expenseParam = new expense({
        budgetId:req.body.budgetId
    });
    
    expenseParam.save(function(err){
        if(err)
            res.send('Expense Failed '+err);
        else
            res.send('Expense Created successfully');
    });
};