const Joi = require('joi');

//  REGISTER
const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),

  password: Joi.string().min(7).required(),

  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'passwords do not match',
  }),

  role: Joi.string().valid('student', 'teacher').optional(),
});
//  LOGIN
const loginSchema = Joi.object({
  email: Joi.string().email().required(),

  password: Joi.string().required(),
});

// UPDATE PROFILE
const updateProfileSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  phone: Joi.string().min(7).max(15),
}).min(1);

//  CHANGE PASSWOD
const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().min(7).required(),
  confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  changePasswordSchema,
};
