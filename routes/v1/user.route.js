const express = require('express');
const router = express.Router();
const verifyToken = require('../../middlewares/verifyToken');
const validate = require('../../middlewares/validate');
const checkUserStatus = require('../../middlewares/checkUserStatus');
const {
  updateProfileSchema,
  changePasswordSchema,
} = require('../../validators/user.validator');
const {
  getMe,
  updateProfile,
  changePassword,
  getAllUser,
} = require('../../controllers/v1/user.controller');

router.get('/me', checkUserStatus, verifyToken, getMe);
router.put(
  '/me',
  verifyToken,
  checkUserStatus,
  validate(updateProfileSchema),
  updateProfile
);
router.put(
  '/me/password',
  verifyToken,
  checkUserStatus,
  validate(changePasswordSchema),
  changePassword
);

module.exports = router;
