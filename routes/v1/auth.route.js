const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getMe,
} = require('../../controllers/v1/auth.controller');
const verifyToken = require('../../middlewares/verifyToken');
const validate = require('../../middlewares/validate');
const {
  registerSchema,
  loginSchema,
} = require('../../validators/user.validator');

// REGISTER
router.post('/register', validate(registerSchema), register);
// LOGIN
router.post('/login', validate(loginSchema), login);
// GETME
router.get('/me', verifyToken, getMe);

module.exports = router;
