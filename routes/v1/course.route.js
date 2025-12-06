const express = require('express');
const router = express.Router();
const verifyToken = require('../../middlewares/verifyToken');
const checkAdmin = require('../../middlewares/checkAdmin');
const checkTeacher = require('../../middlewares/checkTeacher');
const checkAdminOrTeacher = require('../../middlewares/checkAdminOrTeacher');
const validate = require('../../middlewares/validate');
// upload multer utils
const upload = require('../../utils/multer');
const {
  createCourseSchema,
  updateCourseSchema,
} = require('../../validators/course.validator');

const {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
  getCoursesByCategory,
  getCourseById,
  changeStatus,
} = require('../../controllers/v1/course.controller');

// POST -> Create New Course
router.post(
  '/create',
  verifyToken,
  checkAdminOrTeacher,
  validate(createCourseSchema),
  upload.single('thumbnail'),
  createCourse
);
// PUT -> Update Coruse
router.put(
  '/:id',
  verifyToken,
  checkAdminOrTeacher,
  validate(updateCourseSchema),
  upload.single('thumbnail'),
  updateCourse
);

// DELETE -> Remove course
router.delete('/:id', verifyToken, checkAdminOrTeacher, deleteCourse);

// GET -> Get All Course
router.get('/', verifyToken, checkAdminOrTeacher, getAllCourses);

// GET -> Get Course By Id
router.get('/:id', verifyToken, checkAdminOrTeacher, getCourseById);

// GET -> Get Course By Category
router.get(
  '/category/:categoryId',
  verifyToken,
  checkAdmin,
  getCoursesByCategory
);

// PUT -> Change Course Status
router.put('/status/:id', verifyToken, checkAdmin, changeStatus);

module.exports = router;
