const Lesson = require('../../models/lesson.model');
const Course = require('../../models/course.model');

// CREATE LESSON
const createLesson = async (req, res) => {
  try {
    const { title, videoUrl, description, duration, course } = req.body;

    // 1. Check course exists
    const existCourse = await Course.findById(course);
    if (!existCourse) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    // 2. Teacher can only add lesson to his course
    if (req.user.role === 'teacher') {
      if (existCourse.teacher.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'You can only add lessons to your own course',
        });
      }
    }

    // 3. Check duplicate title
    const existLesson = await Lesson.findOne({ title, course });
    if (existLesson) {
      return res.status(400).json({
        success: false,
        message: 'Lesson already exists in this course',
      });
    }

    // 4. Create lesson
    const lesson = await Lesson.create({
      title,
      videoUrl,
      description,
      duration,
      course,
    });

    res.status(201).json({
      success: true,
      message: 'Lesson created successfully',
      lesson,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Error in create lesson API',
      error: err.message,
    });
  }
};

// UPDATE LESSON
const updateLesson = async (req, res) => {
  try {
    const lessonId = req.params.id;
    const { title, videoUrl, description, duration } = req.body;

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found',
      });
    }

    // Teacher can only update own lessons
    const course = await Course.findById(lesson.course);
    if (req.user.role === 'teacher') {
      if (course.teacher.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'You can only update lessons of your own courses',
        });
      }
    }

    lesson.title = title ?? lesson.title;
    lesson.videoUrl = videoUrl ?? lesson.videoUrl;
    lesson.description = description ?? lesson.description;
    lesson.duration = duration ?? lesson.duration;

    const updatedLesson = await lesson.save();

    res.status(200).json({
      success: true,
      message: 'Lesson updated successfully',
      lesson: updatedLesson,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error updating lesson',
      error: err.message,
    });
  }
};

// DELETE LESSON
const deleteLesson = async (req, res) => {
  try {
    const id = req.params.id;

    const lesson = await Lesson.findById(id);
    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found',
      });
    }

    const course = await Course.findById(lesson.course);

    // Teacher can delete only own lessons
    if (req.user.role === 'teacher') {
      if (course.teacher.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'You can delete only your own lessons',
        });
      }
    }

    await Lesson.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Lesson deleted successfully',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error deleting lesson',
      error: err.message,
    });
  }
};

// GET LESSON BY ID
const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate('course');
    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found',
      });
    }

    res.status(200).json({
      success: true,
      lesson,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching lesson',
      error: err.message,
    });
  }
};

// GET LESSONS BY COURSE
const getLessonsByCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    const lessons = await Lesson.find({ course: courseId });

    res.status(200).json({
      success: true,
      total: lessons.length,
      lessons,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching lessons',
      error: err.message,
    });
  }
};

// GET ALL LESSONS
const getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find();

    res.status(200).json({
      success: true,
      total: lessons.length,
      lessons,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching lessons',
      error: err.message,
    });
  }
};

module.exports = {
  createLesson,
  updateLesson,
  deleteLesson,
  getLessonById,
  getLessonsByCourse,
  getAllLessons,
};
