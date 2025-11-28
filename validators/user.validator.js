const Joi = require('joi');

// REGISTER
const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),

  username: Joi.string().alphanum().min(3).max(30).required(),

  email: Joi.string().email().lowercase().required(),

  phone: Joi.string()
    .pattern(/^[0-9]{7,15}$/)
    .required(),

  password: Joi.string().min(7).required(),

  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({ 'any.only': 'passwords do not match' }),

  role: Joi.string().valid('student', 'teacher').optional(),
});

// LOGIN
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// UPDATE PROFILE
const updateProfileSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  phone: Joi.string().pattern(/^[0-9]{7,15}$/),
}).min(1);

// CHANGE PASSWORD
const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().min(7).required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref('newPassword'))
    .required()
    .messages({ 'any.only': 'passwords do not match' }),
});

// EXPORT
module.exports = {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  changePasswordSchema,
};
