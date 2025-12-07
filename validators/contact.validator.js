const Joi = require('joi');

const createContactSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().trim().lowercase().required(),
  phone: Joi.string().trim().required(),
  message: Joi.string().trim().required().min(10).max(255),
});
module.exports = {
  createContactSchema,
};
