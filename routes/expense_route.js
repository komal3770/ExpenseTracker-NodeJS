const express = require('express');
const router = express.Router();
const expense_controller = require('../controllers/expense_controller');

router.post('/addExpense', expense_controller.addExpense);

module.exports = router;