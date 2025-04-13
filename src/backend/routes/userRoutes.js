const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user
router.post('/create', userController.createUser);
router.post('/reset-password', userController.resetUserPassword);
router.get('/get', userController.getUsers);
router.post('/create-with-role', userController.createUserWithRole);
router.post('/modify-user', userController.modifyUser);
router.post('/delete-user', userController.deleteUser);

module.exports = router;