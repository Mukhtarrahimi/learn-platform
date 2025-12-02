const Course = require('../../models/course.model');
const User = require('../../models/user.model');

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
      status: 'draft',
    });

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      course,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error in create course API',
      error: err.message,
    });
  }
};

module.exports = { createCourse };
