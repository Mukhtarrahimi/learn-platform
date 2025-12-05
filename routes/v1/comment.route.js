const express = require('express');
const router = express.Router();

const { createCommentSchema } = require('../../validators/comment.validator');
const validate = require('../../middlewares/validate');
const verifyToken = require('../../middlewares/verifyToken');
const { createComment } = require('../../controllers/v1/comment.controller');

// POST -> Create New Comment
router.post('/', verifyToken, validate(createCommentSchema), createComment);
module.exports = router;
