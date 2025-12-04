const express = require('express');
const router = express.Router();
const checkAdmin = require('../../middlewares/checkAdmin');
const validate = require('../../middlewares/validate');
const verifyToken = require('../../middlewares/verifyToken');

const {
  createCategory,
  updateCategory,
  getAllCategories,
} = require('../../controllers/v1/category.controller');
const {
  createCategorySchema,
  updateCategorySchema,
} = require('../../validators/category.validator');

// POST -> create new category
router.post(
  '/',
  verifyToken,
  checkAdmin,
  validate(createCategorySchema),
  createCategory
);
// PUT -> update existing category
router.put(
  '/:id',
  verifyToken,
  checkAdmin,
  validate(updateCategorySchema),
  updateCategory
);
// GET -> get all categories
router.get('/', verifyToken, checkAdmin, getAllCategories);

module.exports = router;
