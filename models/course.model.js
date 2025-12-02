const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },

    description: {
      type: String,
      trim: true,
      minlength: 10,
    },

    price: {
      type: Number,
      default: 0,
    },

    thumbnail: {
      type: String, // مسیر عکس کاور
      default: null,
    },

    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },

    language: {
      type: String,
      default: 'english',
    },

    lessons: [
      {
        title: String,
        videoUrl: String,
        duration: Number, // دقیقه
      },
    ],

    studentsCount: {
      type: Number,
      default: 0,
    },

    rating: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },

    tags: [String],

    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);
