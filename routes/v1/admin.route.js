const express = require('express');
const router = express.Router();
const verifyToken = require('../../middlewares/verifyToken');
const checkAdmin = require('../../middlewares/checkAdmin');
const {
  getAllUser,
  getUserById,
  getUserByQuery,
} = require('../../controllers/v1/admin.controller');

// Admin routes
router.get('/users', verifyToken, checkAdmin, getUserByQuery); // query param
router.get('/users/all', verifyToken, checkAdmin, getAllUser);
router.get('/users/:id', verifyToken, checkAdmin, getUserById);

module.exports = router;
