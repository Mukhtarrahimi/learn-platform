const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  refreshToken,
} = require('../../controllers/v1/auth.controller');
const validate = require('../../middlewares/validate');
const verifyToken = require('../../middlewares/verifyToken');

const {
  registerSchema,
  loginSchema,
} = require('../../validators/user.validator');

// REGISTER
router.post('/register', validate(registerSchema), register);
// LOGIN
router.post('/login', validate(loginSchema), login);
// LOGOUT
router.post('/logout', verifyToken, logout);
router.post('/refresh-token', verifyToken, refreshToken);

module.exports = router;
