const Joi = require('joi');

const createReplySchema = Joi.object({
  contactId: Joi.string().length(24).hex().required(),

  message: Joi.string().trim().min(1).max(1000).required(),
});

module.exports = {
  createReplySchema,
};
