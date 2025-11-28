const express = require('express');
const router = express.Router();
const { register } = require('../../controllers/v1/auth.controller');
const validate = require('../../middlewares/validate');
const { registerSchema } = require('../../validators/user.validator');

// REGISTER
router.post('/register', validate(registerSchema), register);

module.exports = router;
