const express = require('express');
const router = express.Router();
const { searchCourses } = require('../../controllers/v1/search.controller');

// Route to search courses
router.get('/:keyword', searchCourses);
