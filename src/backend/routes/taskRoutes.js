const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');


// Get all roles data
router.get('/get', taskController.getTasks);
router.get('/get-info', taskController.getTasksInfo);
router.post('/get-task-filtered', taskController.getTasksFiltered);
router.post('/create', taskController.createTask)
router.post('/modify-task', taskController.modifyTask)
router.post('/delete-task', taskController.deleteTask)

module.exports = router;