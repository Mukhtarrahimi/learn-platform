const express = require('express');
const router = express.Router();
const { createMenu } = require('../../controllers/v1/menu.controller');
const validate = require('../../middlewares/validate');
const { createMenuSchema } = require('../../validators/menu.validator');
const verify = require('../../middlewares/verifyToken');
const checkAdmin = require('../../middlewares/checkAdmin');

// Create Menu
router.post('/', verify, checkAdmin, validate(createMenuSchema), createMenu);

module.exports = router;
