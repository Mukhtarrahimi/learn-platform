const Course = require('../../models/course.model');
const User = require('../../models/user.model');

// CREATE NEW COURSE
const createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      thumbnail,
      category,
      level,
      language,
      tags,
      teacherId,
    } = req.body;

    let finalTeacher;
    if (req.user.role === 'teacher') {
      finalTeacher = req.user.id;
    } else if (req.user.role === 'admin') {
      if (!teacherId) {
        return res.status(400).json({
          success: false,
          message: 'Admin must provide teacherId',
        });
      }
      finalTeacher = teacherId;
    }

    const teacher = await User.findById(finalTeacher);

    if (!teacher || teacher.role !== 'teacher') {
      return res.status(400).json({
        success: false,
        message: 'Invalid teacherId. User must be a teacher.',
      });
    }

    const course = await Course.create({
      title,
      description,
      price,
      thumbnail,
      category,
      level,
      language,
      tags,
      teacher: finalTeacher,
      status: 'draft', // Default status if not provided
    });

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      course,
    });
  } catch (err) {
    console.error(err); // For logging in development
    return res.status(500).json({
      success: false,
      message: 'Error in create course API',
      error: err.message,
    });
  }
};

// UPDATE COURSE
const updateCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      thumbnail,
      category,
      level,
      language,
      tags,
      status = 'draft', // Default to 'draft' if status not provided
      teacherId,
    } = req.body;

    const courseId = req.params.id;
    if (!courseId) {
      return res.status(404).json({
        success: false,
        message: 'Course ID is required.',
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

    let finalTeacher;
    if (req.user.role === 'teacher') {
      finalTeacher = req.user.id;
    } else if (req.user.role === 'admin') {
      if (!teacherId) {
        return res.status(400).json({
          success: false,
          message: 'Admin must provide teacherId',
        });
      }
      finalTeacher = teacherId;
    }

    const teacher = await User.findById(finalTeacher);

    if (!teacher || teacher.role !== 'teacher') {
      return res.status(400).json({
        success: false,
        message: 'Invalid teacherId. User must be a teacher.',
      });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        title,
        description,
        price,
        thumbnail,
        category,
        level,
        language,
        tags,
        teacher: finalTeacher,
        status,
      },
      { new: true } // Return the updated course
    );

    res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      course: updatedCourse,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Error in update course API',
      error: err.message,
    });
  }
};

module.exports = { createCourse, updateCourse };
