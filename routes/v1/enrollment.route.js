const express = require('express');
const router = express.Router();
const { enrollCourse } = require('../../controllers/v1/enrollment.controller');
const validate = require('../../middlewares/validate');
const verifyToken = require('../../middlewares/verifyToken');
const { enrollCourseSchema } = require('../../validators/enrollment.validator');
// POST -> Enroll in a Course
router.post('/', verifyToken, validate(enrollCourseSchema), enrollCourse);
module.exports = router;
