const Category = require('../../models/category.model');

// Create a new category
const createCategory = async (req, res) => {
  try {
    const { title, description, slug, status } = req.body;
    const category = await Category.create({
      title,
      description,
      slug,
      status,
    });
    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'category creation failed',
      });
    }
    res.status(201).json({
      success: true,
      message: 'category created successfully',
      category,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'error in creating category api',
      error: err.message,
    });
  }
};

// Update an existing category
const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'category id is required',
      });
    }
    const { title, description, slug, status } = req.body;
    const category = await Category.findByIdAndUpdate(
      id,
      { title, description, slug, status },
      { new: true }
    );
    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'category update failed',
      });
    }
    res.status(200).json({
      success: true,
      message: 'category updated successfully',
      category,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'error in update category api',
      error: err.message,
    });
  }
};

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res.status(404).json({
        sucess: false,
        message: 'no categories found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'categories fetched successfully',
      total: categories.length,
      categories,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'error in get all categories api',
      error: err.message,
    });
  }
};

// Get category by ID
const getCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'category id is required',
      });
    }
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'category not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'category fetched successfully',
      category,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'error in get category by id api',
      error: err.message,
    });
  }
};

module.exports = {
  createCategory,
  updateCategory,
  getAllCategories,
};
