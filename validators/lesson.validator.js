const Joi = require('joi');

// CREATE LESSON
const createLessonSchema = Joi.object({
  title: Joi.string().min(3).required().messages({
    'string.base': 'title must be a string',
    'string.min': 'title must be at least 3 characters',
    'any.required': 'title is required',
  }),

  videoUrl: Joi.string().uri().optional().allow('', null).messages({
    'string.uri': 'videoUrl must be a valid URL',
  }),

  duration: Joi.string().required().messages({
    'any.required': 'duration is required',
  }),

  description: Joi.string().optional().allow('', null).messages({
    'string.base': 'description must be a string',
  }),

  course: Joi.string().required().messages({
    'any.required': 'course id is required',
    'string.base': 'course must be a valid id',
  }),
});

// UPDATE LESSON
const updateLessonSchema = Joi.object({
  title: Joi.string().min(3).optional().messages({
    'string.base': 'title must be a string',
    'string.min': 'title must be at least 3 characters',
  }),

  videoUrl: Joi.string().uri().optional().allow('', null).messages({
    'string.uri': 'videoUrl must be a valid URL',
  }),

  duration: Joi.string().optional().messages({
    'string.base': 'duration must be a string',
  }),

  description: Joi.string().optional().allow('', null).messages({
    'string.base': 'description must be a string',
  }),

  course: Joi.string().optional().messages({
    'string.base': 'course must be a valid id',
  }),
})
  .min(1)
  .messages({
    'object.min': 'Please provide at least one field to update',
  });

module.exports = { createLessonSchema, updateLessonSchema };
