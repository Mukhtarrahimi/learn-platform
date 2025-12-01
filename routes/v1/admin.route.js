const express = require('express');
const router = express.Router();
const verifyToken = require('../../middlewares/verifyToken');
const checkAdmin = require('../../middlewares/checkAdmin');
const {
  getAllUser,
  getUserById,
  getUserByQuery,
  deleteUser,
  changeUserStatus,
  createUserByAdmin,
} = require('../../controllers/v1/admin.controller');

// POST create new user
router.post('/users/register', verifyToken, checkAdmin, createUserByAdmin);
// GET all users
router.get('/users', verifyToken, checkAdmin, getAllUser);
// GET user by query (username, email, status)
router.get('/users/search', verifyToken, checkAdmin, getUserByQuery);

// GET user by ID
router.get('/users/:id', verifyToken, checkAdmin, getUserById);

// DELETE user by id or email
router.delete('/users/delete', verifyToken, checkAdmin, deleteUser);

// Change User Status
router.put('/users/:id/status', verifyToken, checkAdmin, changeUserStatus);

module.exports = router;
