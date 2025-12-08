const express = require('express');
const router = express.Router();
const {
  addFavoriteCourse,
} = require('../../controllers/v1/favoriteCourse.controller');
const verifyToken = require('../../middlewares/verifyToken');

// Add a course to favorites
router.post('/', verifyToken, addFavoriteCourse);
module.exports = router;
