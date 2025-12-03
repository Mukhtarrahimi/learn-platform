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
      type: String,
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

// =============== VIRTUAL LESSONS ===============
courseSchema.virtual('lessons', {
  ref: 'Lesson',
  localField: '_id',
  foreignField: 'course',
});

courseSchema.set('toJSON', { virtuals: true });
courseSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Course', courseSchema);
