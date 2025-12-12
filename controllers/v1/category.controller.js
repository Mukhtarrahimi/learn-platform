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
      message: 'error in creating category api',
      error: err.message,
    });
  }
};

module.exports = {
  createCategory,
  updateCategory,
};
