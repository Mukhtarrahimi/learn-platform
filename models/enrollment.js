const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    status: {
      type: String,
      enum: ['enrolled', 'completed', 'cancelled'],
      default: 'enrolled',
    },
    paymentStatus: {
      type: String,
      enum: ['free', 'paid', 'pending'],
      default: 'free',
    },
    transactionId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
