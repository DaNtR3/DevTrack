const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');


router.post('/create', commentController.createComment)
router.post('/get-comment-filtered', commentController.getCommentFiltered)

module.exports = router;