const express = require('express');
const router = express.Router();
const { getMe } = require('../../controllers/v1/user.controller');
const verifyToken = require('../../middlewares/verifyToken');

// GETME
router.get('/me', verifyToken, getMe);

module.exports = router;
