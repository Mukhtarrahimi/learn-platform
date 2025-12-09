const express = require('express');
const router = express.Router();
// Middlewares
const validate = require('../../middlewares/validate');
const verify = require('../../middlewares/verifyToken');
const checkAdmin = require('../../middlewares/checkAdmin');
// Validators
const { createMenuSchema } = require('../../validators/menu.validator');
// Controllers
const {
  createMenu,
  updateMenu,
} = require('../../controllers/v1/menu.controller');

// Create Menu
router.post('/', verify, checkAdmin, validate(createMenuSchema), createMenu);
// Update Menu
router.put('/:id', verify, checkAdmin, validate(createMenuSchema), updateMenu);

module.exports = router;
