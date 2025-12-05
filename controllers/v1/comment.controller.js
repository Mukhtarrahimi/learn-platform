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

// get all comments for a course
const getCommentsByCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    // Validate courseId
    if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or missing course ID',
      });
    }

    // Check if course exists
    const courseExists = await Course.findById(courseId);
    if (!courseExists) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    // Find comments for this course  status: 'approved'
    const comments = await Comment.find({
      course: courseId,
      status: 'approved',
      parentComment: null,
    })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    if (!comments || comments.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No approved comments found for this course',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Approved comments fetched successfully',
      total: comments.length,
      comments,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Error fetching comments for course',
      error: err.message,
    });
  }
};

module.exports = { createComment, getCommentsByCourse };
