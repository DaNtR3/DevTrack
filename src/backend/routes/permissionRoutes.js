const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permissionController');


// Get all roles data
router.get('/get', permissionController.getPermissions);


module.exports = router;