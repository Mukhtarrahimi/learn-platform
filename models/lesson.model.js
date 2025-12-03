const mongoose = require('mongoose');
const lessonSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
    },
    duration: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lesson', lessonSchema);
