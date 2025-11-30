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
} = require('../../controllers/v1/user.controller');

router.get('/me', verifyToken, getMe);
router.put('/me', verifyToken, validate(updateProfileSchema), updateProfile);
router.put(
  '/me/password',
  verifyToken,
  validate(changePasswordSchema),
  changePassword
);

module.exports = router;
