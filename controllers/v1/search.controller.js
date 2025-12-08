const Course = require('../../models/course.model');

// Search courses by title or description
const searchCourses = async (req, res) => {
  try {
    const { query, page = 1, limit = 10 } = req.query;

    if (!query || query.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Search query cannot be empty',
      });
    }

    const skip = (page - 1) * limit;

    const result = await Course.find(
      { $text: { $search: query }, status: 'published' },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      message: 'Courses fetched successfully',
      result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Error in searching courses API',
      error: err.message,
    });
  }
};

module.exports = {
  searchCourses,
};
