const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');


// Get all projects data
router.get('/get', projectController.getProjects);
router.post('/create', projectController.createProject);
router.post('/modify-project', projectController.modifyProject);
router.post('/delete-project', projectController.deleteProject);


module.exports = router;