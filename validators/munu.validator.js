const Joi = require('joi');
const mongoose = require('mongoose');

const menuValidationSchema = Joi.object({
  title: Joi.string().trim().min(1).max(100).required(),

  link: Joi.string().trim().uri({ allowRelative: true }).required(),

  order: Joi.number().integer().min(0).default(0),

  parentId: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    })
    .allow(null)
    .optional(),

  isActive: Joi.boolean().default(true),
});

module.exports = menuValidationSchema;
