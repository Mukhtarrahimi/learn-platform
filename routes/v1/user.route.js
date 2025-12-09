const express = require('express');
const router = express.Router();
const verifyToken = require('../../middlewares/verifyToken');
const validate = require('../../middlewares/validate');
const {
  updateProfileSchema,
  changePasswordSchema,
} = require('../../validators/user.validator');
const {
  getMe,
  updateProfile,
  changePassword,
} = require('../../controllers/user.controller');

router.get('/me', verifyToken, getMe);
router.put(
  '/profile',
  verifyToken,
  validate(updateProfileSchema),
  updateProfile
);
router.put(
  '/change-password',
  verifyToken,
  validate(changePasswordSchema),
  changePassword
);

module.exports = router;
