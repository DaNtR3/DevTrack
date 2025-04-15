const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');


router.post('/create', goalController.createGoal)
router.get('/get-info', goalController.getGoalsInfo);
router.post('/modify-goal', goalController.modifyGoal)
router.post('/delete-goal', goalController.deleteGoal)

module.exports = router;