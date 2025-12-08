const mongoose = require('mongoose');

const favoriteCourseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
  },
  { timestamps: true }
);
favoriteCourseSchema.index({ userId: 1, courseId: 1 }, { unique: true });
module.exports = mongoose.model('FavoriteCourse', favoriteCourseSchema);
