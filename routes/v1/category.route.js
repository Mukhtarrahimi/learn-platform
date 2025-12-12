const express = require('express');
const router = express.Router();
const checkAdmin = require('../../middlewares/checkAdmin');
const validate = require('../../middlewares/validate');
const verifyToken = require('../../middlewares/verifyToken');

const { createCategory } = require('../../controllers/v1/category.controller');
const { createCategorySchema } = require('../../validators/category.validator');

// POST -> create new category
router.post(
  '/',
  verifyToken,
  checkAdmin,
  validate(createCategorySchema),
  createCategory
);

module.exports = router;
