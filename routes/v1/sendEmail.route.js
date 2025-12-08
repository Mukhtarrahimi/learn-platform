const express = require('express');
const router = express.Router();
const sendMailReply = require('../../controllers/v1/sendEmail.controller');
const validate = require('../../middlewares/validate.middleware');
const sendMailSchema = require('../../validators/replyContact.validator');
const isAdmin = require('../../middlewares/isAdmin.middleware');

// POST /api/v1/send-email/reply
router.post(
  '/reply',
  isAdmin,
  validate(sendMailSchema.createReplySchema),
  sendMailReply
);

module.exports = router;
