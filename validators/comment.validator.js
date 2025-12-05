const Joi = require('joi');

// Schema for creating a new comment
const createCommentSchema = Joi.object({
  content: Joi.string().min(5).max(500).required(),
  course: Joi.string().hex().length(24).required(),
  course: Joi.string().hex().length(24).required(),
  rating: Joi.number().min(1).max(5).optional(),
  status: Joi.string().valid('pending', 'approved', 'rejected').optional(),
});

module.exports = {
  createCommentSchema,
};
