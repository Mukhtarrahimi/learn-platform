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

module.exports = {
  createCategory,
};
