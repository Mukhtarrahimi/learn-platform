const express = require('express');
const router = express.Router();
const verifyToken = require('../../middlewares/verifyToken');
const checkAdminOrTeacher = require('../../middlewares/checkAdminOrTeacher');
const validate = require('../../middlewares/validate');

const {
  createLessonSchema,
  updateLessonSchema,
} = require('../../validators/lesson.validator');

const {
  createLesson,
  updateLesson,
  deleteLesson,
  getLessonById,
  getLessonsByCourse,
  getAllLessons,
} = require('../../controllers/v1/lesson.controller');

// Create Lesson
router.post(
  '/',
  verifyToken,
  checkAdminOrTeacher,
  validate(createLessonSchema),
  createLesson
);

// Update Lesson
router.put(
  '/:id',
  verifyToken,
  checkAdminOrTeacher,
  validate(updateLessonSchema),
  updateLesson
);

// Delete Lesson
router.delete('/:id', verifyToken, checkAdminOrTeacher, deleteLesson);

// Get all lessons
router.get('/', verifyToken, checkAdminOrTeacher, getAllLessons);

// Get lessons by course
router.get('/course/:courseId', verifyToken, getLessonsByCourse);

// Get lesson by id
router.get('/:id', verifyToken, getLessonById);

module.exports = router;
