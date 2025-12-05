const Enrollment = require('../../models/enrollment.model');
const User = require('../../models/user.model');
const Course = require('../../models/course.model');
const enrollCourse = async (req, res) => {
  try {
    const { courseId, userId } = req.body;

    // Validate input
    if (!courseId || !userId) {
      return res.status(400).json({
        success: false,
        message: 'Course ID and User ID are required',
      });
    }
    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      user: userId,
      course: courseId,
    });
    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'User is already enrolled in this course',
      });
    }
    // Create enrollment
    const enrollment = await Enrollment.create({
      user: userId,
      course: courseId,
      status: 'paid',
      price: course.price,
    });
    res.status(201).json({
      success: true,
      message: 'User enrolled in course successfully',
      enrollment,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Error in enroll course API',
      error: err.message,
    });
  }
};

module.exports = {
  enrollCourse,
};
