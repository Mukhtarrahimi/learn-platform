const FavoriteCourse = require('../../models/favoriteCourse.model');
const Course = require('../../models/course.model');
const mongoose = require('mongoose');

const addFavoriteCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    const courseId = req.body.courseId;

    // validate courseId
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid course id',
      });
    }

    // check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    // check deuplicate favorite
    const existFavorite = await FavoriteCourse.findOne({ userId, courseId });
    if (existFavorite) {
      return res.status(400).json({
        success: false,
        message: 'Course already in favorites',
      });
    }

    // create favorite
    const favoriteCourse = await FavoriteCourse.create({
      userId,
      courseId,
    });
    // respond success
    res.status(201).json({
      success: true,
      message: 'Course added to favorites',
      favoriteCourse,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Error adding favorite course',
    });
  }
};

// delete course from favorites
const deleteFavoriteCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    const courseId = req.boyd.courseId;

    // validate courseId
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid course id',
      });
    }
    // delete favorite
    const deletedFavorite = await FavoriteCourse.findOneAndDelete({
      userId,
      courseId,
    });
    if (!deletedFavorite) {
      return res.status(404).json({
        success: false,
        message: 'Favorite course not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Course removed from favorites',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Error deleting favorite course',
      error: err.message,
    });
  }
};

module.exports = {
  addFavoriteCourse,
  deleteFavoriteCourse,
};
