const express = require('express');
const router = express.Router();
const verifyToken = require('../../middlewares/verifyToken');
const checkAdmin = require('../../middlewares/checkAdmin');
const {
  getAllUser,
  getUserById,
  getUserByQuery,
  deleteUser,
} = require('../../controllers/v1/admin.controller');

// GET all users
router.get('/users', verifyToken, checkAdmin, getAllUser);
// GET user by query (username, email, status)
router.get('/users/search', verifyToken, checkAdmin, getUserByQuery);

// GET user by ID
router.get('/users/:id', verifyToken, checkAdmin, getUserById);

// DELETE user by id or email
router.delete('/users/delete', verifyToken, checkAdmin, deleteUser);

module.exports = router;
