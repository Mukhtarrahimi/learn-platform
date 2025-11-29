const express = require('express');
const router = express.Router();
const { register, login } = require('../../controllers/v1/auth.controller');
const validate = require('../../middlewares/validate');
const {
  registerSchema,
  loginSchema,
} = require('../../validators/user.validator');

// REGISTER
router.post('/register', validate(registerSchema), register);
// LOGIN
router.post('/login', validate(loginSchema), login);

module.exports = router;
