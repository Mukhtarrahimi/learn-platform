const Joi = require('joi');

// Validate enroll course request
const enrollCourseSchema = Joi.object({
  userId: Joi.string()
    .required()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      'string.empty': 'User ID  required',
      'string.pattern.base': 'User ID  invalid',
    }),

  courseId: Joi.string()
    .required()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      'string.empty': 'Course ID  required',
      'string.pattern.base': 'Course ID  invalid',
    }),

  paymentStatus: Joi.string().valid('free', 'paid', 'pending').optional(),

  transactionId: Joi.string().optional().allow(null, ''),
});

const validateEnrollCourse = (data) => {
  return enrollCourseSchema.validate(data, { abortEarly: false });
};

module.exports = {
  validateEnrollCourse,
};
