const express = require('express');
const router = express.Router();
const verifyToken = require('../../middlewares/verifyToken');
const checkAdmin = require('../../middlewares/checkAdmin');
const checkTeacher = require('../../middlewares/checkAdmin');
const checkAdminOrTeacher = require('../../middlewares/checkAdminOrTeacher ');
const validate = require('../../middlewares/validate');
const {
  createCourseSchema,
  updateCourseSchema,
} = require('../../validators/course.validator');

const {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
} = require('../../controllers/v1/course.controller');

// POST -> Create New Course
router.post(
  '/create',
  verifyToken,
  checkAdminOrTeacher,
  validate(createCourseSchema),
  createCourse
);
// PUT -> Update Coruse
router.put(
  '/:id',
  verifyToken,
  checkAdminOrTeacher,
  validate(updateCourseSchema),
  updateCourse
);

// DELETE -> Remove course
router.delete('/:id', verifyToken, checkAdminOrTeacher, deleteCourse);

// GET -> Gell All Course
router.get('/', verifyToken, checkAdminOrTeacher, getAllCourses);
module.exports = router;
