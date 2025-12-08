const Joi = require('joi');

exports.createReplySchema = Joi.object({
  contactId: Joi.string().length(24).hex().required(),

  message: Joi.string().trim().min(1).max(1000).required(),
});
