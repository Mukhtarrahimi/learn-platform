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
    console.error(err); // For logging in developmend
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
      status = 'draft',
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
      if (course.teacher.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'You can only update your own courses.',
        });
      }
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

    // Check if the teacher exists
    const teacher = await User.findById(finalTeacher);
    if (!teacher || teacher.role !== 'teacher') {
      return res.status(400).json({
        success: false,
        message: 'Invalid teacherId. User must be a teacher.',
      });
    }

    // Update course
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

// DELETE -> Remove Course
const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    if (!courseId) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    if (req.user.role === 'admin') {
      await Course.findByIdAndDelete(courseId);
      return res.status(200).json({
        success: true,
        message: 'Course deleted successfully by admin',
        course: {
          id: course._id,
          title: course.title,
          teacher: course.teacher,
        },
      });
    }

    if (req.user.role === 'teacher') {
      if (course.teacher.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'You can only delete your own courses',
        });
      }

      await Course.findByIdAndDelete(courseId);
      return res.status(200).json({
        success: true,
        message: 'Course deleted successfully by teacher',
        course: {
          id: course._id,
          title: course.title,
          teacher: course.teacher,
        },
      });
    }

    return res.status(403).json({
      success: false,
      message: 'Access denied',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Error in delete course API',
      error: err.message,
    });
  }
};

const getAllCourses = async (req, res) => {
  try {
    let courses;

    if (req.user.role === 'admin') {
      courses = await Course.find();
    } else if (req.user.role === 'teacher') {
      courses = await Course.find({ teacher: req.user.id });

      if (courses.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No courses found for this teacher',
        });
      }
    } else {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to view courses.',
      });
    }

    if (!courses || courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No courses available',
      });
    }

    res.status(200).json({
      success: true,
      courses,
      total: courses.length,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Error in fetching courses',
      error: err.message,
    });
  }
};

// Get Course By Id
const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: 'Course ID is required.',
      });
    }

    let course;
    if (req.user.role === 'admin') {
      course = await Course.findById(courseId);
    } else if (req.user.role === 'teacher') {
      course = await Course.findOne({ _id: courseId, teacher: req.user.id });
    }

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found or you do not have permission to access it.',
      });
    }

    res.status(200).json({
      success: true,
      course,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Error in fetching course',
      error: err.message,
    });
  }
};

// Change status
const changeStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const courseId = req.params.id;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: 'Course ID is required.',
      });
    }

    // Validate the status
    if (!['draft', 'published'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be either "draft" or "published".',
      });
    }

    // Update the course status
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { status },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: 'Course not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Course status updated successfully.',
      course: updatedCourse,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Error in updating course status.',
      error: err.message,
    });
  }
};

module.exports = {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  changeStatus,
};
