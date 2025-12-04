const Joi = require('joi');
const createCategorySchema = Joi.object({
  title: Joi.string().min(3).max(50).required(),
  description: Joi.string().max(500).allow('', null),
  slug: Joi.string().alphanum().min(3).max(30).required(),
  status: Joi.string().valid('active', 'inactive').default('active'),
});

const updateCategorySchema = Joi.object({
  title: Joi.string().min(3).max(50),
  description: Joi.string().max(500).allow('', null),
  slug: Joi.string().alphanum().min(3).max(30),
  status: Joi.string().valid('active', 'inactive'),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
};
