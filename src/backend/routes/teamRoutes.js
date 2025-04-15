const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');


// Get all roles data
router.get('/get', teamController.getTeams);
router.get('/get-info', teamController.getTeamsInfo);
router.post('/create', teamController.createTeam);
router.post('/modify-team', teamController.modifyTeam);
router.post('/delete-team', teamController.deleteTeam);


module.exports = router;