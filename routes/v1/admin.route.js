const express = require('express');
const router = express.Router();
const verifyToken = require('../../middlewares/verifyToken');
const checkUserStatus = require('../../middlewares/checkUserStatus');
const checkAdmin = require('../../middlewares/checkAdmin');
const {
  getAllUser,
  getUserById,
} = require('../../controllers/v1/admin.controller');

// IS ADMIN ----------------------
router.get('/users', verifyToken, checkAdmin, getAllUser);
router.get('/users/:id', verifyToken, checkAdmin, getUserById);

module.exports = router;
