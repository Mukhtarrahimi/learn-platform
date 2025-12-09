const Course = require('../../models/course.model');

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

const searchCourses = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Search query cannot be empty',
      });
    }

    const escapedQuery = escapeRegex(query);

    const result = await Course.find({
      status: 'published',
      $or: [
        { title: { $regex: '.*' + escapedQuery + '.*', $options: 'i' } },
        { description: { $regex: '.*' + escapedQuery + '.*', $options: 'i' } },
      ],
    });

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
