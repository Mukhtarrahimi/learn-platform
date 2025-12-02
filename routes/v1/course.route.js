const express = require('express');
const router = express.Router();
const verifyToken = require('../../middlewares/verifyToken');
const checkAdmin = require('../../middlewares/checkAdmin');
const checkTeacher = require('../../middlewares/checkAdmin');
const checkAdminOrTeacher = require('../../middlewares/checkAdmin');
const validate = require('../../middlewares/validate');
const { createCourseSchema } = require('../../validators/course.validator');

const { createCourse } = require('../../controllers/v1/course.controller');

router.post(
  '/create',
  verifyToken,
  checkAdminOrTeacher,
  validate(createCourseSchema),
  createCourse
);

module.exports = router;
