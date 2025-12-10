const express = require('express');
const router = express.Router();
const verifyToken = require('../../middlewares/verifyToken');
const checkUserStatus = require('../../middlewares/checkUserStatus');
const checkAdmin = require('../../middlewares/checkAdmin');

// IS ADMIN ----------------------
router.get('/users', verifyToken, checkAdmin, getAllUser);

module.exports = router;
