const express = require('express');
const router = express.Router();
const {
  addFavoriteCourse,
  deleteFavoriteCourse,
  getFavoriteCourses,
} = require('../../controllers/v1/favoriteCourse.controller');
const verifyToken = require('../../middlewares/verifyToken');

// Add a course to favorites
router.post('/', verifyToken, addFavoriteCourse);
module.exports = router;
// Get all favorite courses
router.get('/', verifyToken, getFavoriteCourses);
// Delete a course from favorites
router.delete('/:courseId', verifyToken, deleteFavoriteCourse);
module.exports = router;
