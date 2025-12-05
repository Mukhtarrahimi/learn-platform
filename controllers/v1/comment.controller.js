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
    if (!courseId) {
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

// Change comment status (admin only)
const changeCommentStatus = async (req, res) => {
  try {
    const { commentId, status } = req.body;

    //  Validation
    if (!commentId || !status) {
      return res.status(400).json({
        success: false,
        message: 'commentId and status are required',
      });
    }

    //  Only admin can change status
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admin can change comment status',
      });
    }

    // 3. Status validation
    const validStatuses = ['pending', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${validStatuses.join(', ')}`,
      });
    }

    //  Find comment
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found',
      });
    }

    // Update status
    comment.status = status;
    await comment.save();

    res.status(200).json({
      success: true,
      message: 'Comment status updated successfully',
      comment,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Error in change comment status API',
      error: err.message,
    });
  }
};

module.exports = { createComment, getCommentsByCourse, changeCommentStatus };
