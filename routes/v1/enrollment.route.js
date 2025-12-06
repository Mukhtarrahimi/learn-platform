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
} = require('../../controllers/v1/enrollment.controller');
// POST -> Enroll in a Course
router.post('/enroll', verifyToken, validate(enrollCourseSchema), enrollCourse);
// GET -> Get All Enrollments
router.get('/', verifyToken, getAllEnrollCourse);
module.exports = router;
