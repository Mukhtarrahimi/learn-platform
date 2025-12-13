const express = require('express');
const router = express.Router();

// Middleware
const validate = require('../../middlewares/validate');
const verifyToken = require('../../middlewares/verifyToken');
// Validator
const { enrollCourseSchema } = require('../../validators/enrollment.validator');
// Controller
const {
  enrollCourse,
  getAllEnrollCourse,
  getStudentCountForCourse,
} = require('../../controllers/v1/enrollment.controller');
// POST -> Enroll in a Course
router.post('/enroll', verifyToken, validate(enrollCourseSchema), enrollCourse);
// GET -> Get All Enrollments
router.get('/', verifyToken, getAllEnrollCourse);
// GET -> Get Student Count for a Specific Course
router.get(
  '/course/:courseId/student-count',
  verifyToken,
  getStudentCountForCourse
);
module.exports = router;
