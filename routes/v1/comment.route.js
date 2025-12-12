const express = require('express');
const router = express.Router();

const { createCommentSchema } = require('../../validators/comment.validator');
const validate = require('../../middlewares/validate');
const verifyToken = require('../../middlewares/verifyToken');
const checkAdmin = require('../../middlewares/checkAdmin');
const {
  createComment,
  getCommentsByCourse,
  changeCommentStatus,
} = require('../../controllers/v1/comment.controller');

// POST -> Create New Comment
router.post('/', verifyToken, validate(createCommentSchema), createComment);
// GET -> Get Comments By Course ID
router.get('/course/:courseId', verifyToken, getCommentsByCourse);
// PUT -> Change Comment Status
router.put(
  '/course/:commentId/status',
  verifyToken,
  checkAdmin,
  changeCommentStatus
);
module.exports = router;
