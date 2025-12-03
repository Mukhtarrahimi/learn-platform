const Joi = require('joi');

const createCourseSchema = Joi.object({
  title: Joi.string().min(3).required().messages({
    'string.base': 'Title must be a string',
    'string.min': 'Title must be at least 3 characters',
    'any.required': 'Title is required',
  }),
  description: Joi.string().min(10).required().messages({
    'string.base': 'Description must be a string',
    'string.min': 'Description must be at least 10 characters',
    'any.required': 'Description is required',
  }),
  price: Joi.number().min(0).required().messages({
    'number.base': 'Price must be a number',
    'number.min': 'Price must be greater than or equal to 0',
    'any.required': 'Price is required',
  }),
  thumbnail: Joi.string().optional().messages({
    'string.base': 'Thumbnail must be a string',
  }),
  category: Joi.string().required().messages({
    'string.base': 'Category must be a string',
    'any.required': 'Category is required',
  }),
  level: Joi.string()
    .valid('beginner', 'intermediate', 'advanced')
    .default('beginner')
    .messages({
      'string.base': 'Level must be a string',
      'any.only': 'Level must be one of [beginner, intermediate, advanced]',
    }),
  language: Joi.string().default('english').messages({
    'string.base': 'Language must be a string',
  }),
  tags: Joi.array().items(Joi.string()).optional().messages({
    'array.base': 'Tags must be an array of strings',
  }),
  teacherId: Joi.string().optional().messages({
    'string.base': 'Teacher ID must be a string',
  }),
  status: Joi.string().valid('draft', 'published').optional(),
});

const updateCourseSchema = Joi.object({
  title: Joi.string().min(3).optional().messages({
    'string.base': 'Title must be a string',
    'string.min': 'Title must be at least 3 characters',
  }),
  description: Joi.string().min(10).optional().messages({
    'string.base': 'Description must be a string',
    'string.min': 'Description must be at least 10 characters',
  }),
  price: Joi.number().min(0).optional().messages({
    'number.base': 'Price must be a number',
    'number.min': 'Price must be greater than or equal to 0',
  }),
  thumbnail: Joi.string().optional().messages({
    'string.base': 'Thumbnail must be a string',
  }),
  category: Joi.string().optional().messages({
    'string.base': 'Category must be a string',
  }),
  level: Joi.string()
    .valid('beginner', 'intermediate', 'advanced')
    .optional()
    .messages({
      'string.base': 'Level must be a string',
      'any.only': 'Level must be one of [beginner, intermediate, advanced]',
    }),
  language: Joi.string().optional().messages({
    'string.base': 'Language must be a string',
  }),
  tags: Joi.array().items(Joi.string()).optional().messages({
    'array.base': 'Tags must be an array of strings',
  }),
  teacherId: Joi.string().optional().messages({
    'string.base': 'Teacher ID must be a string',
  }),
  status: Joi.string().valid('draft', 'published').optional(),
});

module.exports = { createCourseSchema, updateCourseSchema };
