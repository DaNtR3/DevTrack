const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Create a new user
router.post('/create', userController.createUser);
router.post('/reset-password', userController.resetUserPassword);


module.exports = router;