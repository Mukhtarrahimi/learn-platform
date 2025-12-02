const Joi = require('joi');
const objectId = /^[0-9a-fA-F]{24}$/;

exports.createCourseSchema = Joi.object({
  title: Joi.string().min(3).max(200).required().messages({
    'string.base': 'Title must be a string',
    'string.empty': 'Title is required',
    'string.min': 'Title must be at least 3 characters',
    'any.required': 'Title is required',
  }),

  description: Joi.string().min(10).max(2000).required().messages({
    'string.min': 'Description must be at least 10 characters',
  }),

  price: Joi.number().min(0).default(0).messages({
    'number.base': 'Price must be a number',
    'number.min': 'Price cannot be negative',
  }),

  thumbnail: Joi.string().uri().allow(null, '').messages({
    'string.uri': 'Thumbnail must be a valid URL',
  }),

  teacher: Joi.string().pattern(objectId).required().messages({
    'string.pattern.base': 'Teacher ID must be a valid MongoDB ObjectId',
    'any.required': 'Teacher ID is required',
  }),

  category: Joi.string().min(2).max(50).required().messages({
    'string.min': 'Category must be at least 2 characters',
    'any.required': 'Category is required',
  }),

  level: Joi.string()
    .valid('beginner', 'intermediate', 'advanced')
    .default('beginner')
    .messages({
      'any.only': 'Level must be beginner, intermediate, or advanced',
    }),

  language: Joi.string().min(2).max(30).default('english'),

  tags: Joi.array().items(Joi.string().min(2)).default([]),

  status: Joi.string().valid('draft', 'published').default('draft'),

  lessons: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().min(3).required(),
        videoUrl: Joi.string().uri().required(),
        duration: Joi.number().min(1).required(),
      })
    )
    .default([]),
});
