const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');


// Get all roles data
router.get('/get', roleController.getRoles);
router.get('/get-info', roleController.getRolesInfo);
router.post('/create', roleController.createRole);
router.post('/modify-role', roleController.modifyRole);
router.post('/delete-role', roleController.deleteRole);


module.exports = router;