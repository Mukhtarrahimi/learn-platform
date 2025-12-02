const Course = require('../../models/course.model');

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
    } = req.body;

    // مدرس از توکن استخراج می‌شود
    const teacherId = req.user.id;

    const course = await Course.create({
      title,
      description,
      price,
      thumbnail,
      category,
      level,
      language,
      tags,
      teacher: teacherId,
      status: 'draft', // پیش‌فرض: دوره باید ابتدا پیش‌نویس باشد
    });

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      course,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Error in create course API',
      error: err.message,
    });
  }
};

module.exports = { createCourse };
