const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user_controller');
//Apis
router.post('/saveUser', user_controller.saveUser);
router.get('/getAll', user_controller.getAll);
router.get('/getUserByEmail', user_controller.getUserByEmail);

module.exports = router;