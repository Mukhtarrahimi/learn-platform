const Comment = require('../../models/comment.model.js');
const User = require('../../models/user.model.js');
const Course = require('../../models/course.model.js');

// Create a new comment
const createComment = async (req, res) => {
  try {
    const { content, course, rating, status } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const courseExists = await Course.findById(course);
    if (!courseExists) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    const comment = await Comment.create({
      content,
      user: user._id,
      course: courseExists._id,
      rating,
      status,
    });

    res.status(201).json({
      success: true,
      message: 'Comment created successfully',
      comment,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Error in creating comment API',
      error: err.message,
    });
  }
};

module.exports = { createComment };
