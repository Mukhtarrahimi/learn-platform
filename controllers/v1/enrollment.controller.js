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
      status: 'enrolled',
      paymentStatus: 'paid',
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

// Get All Enrolled Courses
const getAllEnrollCourse = async (req, res) => {
  try {
    const enrollCourses = await Enrollment.find();

    if (!enrollCourses || enrollCourses.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No enrolled courses available',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Enrolled courses fetched successfully',
      enrollCourses,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Error in get enrolled courses API',
      error: err.message,
    });
  }
};

// Get student count for a specific course
const getStudentCountForCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: 'Course ID is required',
      });
    }

    const totalStudents = await Enrollment.countDocuments({
      course: courseId,
    }).populate('user');

    res.status(200).json({
      success: true,
      message: 'Student count fetched successfully',
      courseId,
      totalStudents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching student count',
      error: error.message,
    });
  }
};

module.exports = {
  enrollCourse,
  getAllEnrollCourse,
  getStudentCountForCourse,
};
