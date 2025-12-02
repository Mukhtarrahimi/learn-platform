const Joi = require('joi');

const createCourseSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(10).required(),
  price: Joi.number().min(0).required(),
  thumbnail: Joi.string().optional(), // اختیاری، هیچ شرطی ندارد
  category: Joi.string().required(),
  level: Joi.string()
    .valid('beginner', 'intermediate', 'advanced')
    .default('beginner'),
  language: Joi.string().default('english'),
  tags: Joi.array().items(Joi.string()).optional(),
  teacherId: Joi.string().optional(),
});

module.exports = { createCourseSchema };
