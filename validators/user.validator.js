const Joi = require('joi');

// REGISTER
const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must be at least 3 characters',
    'string.max': 'Name must be at most 50 characters',
    'any.required': 'Name is required',
  }),

  username: Joi.string().alphanum().min(3).max(30).required().messages({
    'string.base': 'Username must be a string',
    'string.alphanum': 'Username must be alphanumeric',
    'string.min': 'Username must be at least 3 characters',
    'string.max': 'Username must be at most 30 characters',
    'any.required': 'Username is required',
  }),

  email: Joi.string().email().lowercase().required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Please provide a valid email',
    'any.required': 'Email is required',
  }),

  phone: Joi.string()
    .pattern(/^[0-9]{7,15}$/)
    .required()
    .messages({
      'string.base': 'Phone must be a string',
      'string.pattern.base': 'Phone must be between 7-15 digits',
      'any.required': 'Phone is required',
    }),

  password: Joi.string().min(7).required().messages({
    'string.base': 'Password must be a string',
    'string.min': 'Password must be at least 7 characters',
    'any.required': 'Password is required',
  }),

  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords must match',
    'any.required': 'Confirm password is required',
  }),

  role: Joi.string().valid('student', 'teacher').optional().messages({
    'string.base': 'Role must be a string',
    'any.only': 'Role must be either "student" or "teacher"',
  }),
});

// LOGIN
const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Please provide a valid email',
    'any.required': 'Email is required',
  }),
  password: Joi.string().required().messages({
    'string.base': 'Password must be a string',
    'any.required': 'Password is required',
  }),
});

// UPDATE PROFILE
const updateProfileSchema = Joi.object({
  name: Joi.string().min(3).max(50).messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must be at least 3 characters',
    'string.max': 'Name must be at most 50 characters',
  }),

  phone: Joi.string()
    .pattern(/^[0-9]{7,15}$/)
    .messages({
      'string.base': 'Phone must be a string',
      'string.pattern.base': 'Phone must be between 7-15 digits',
    }),
})
  .min(1)
  .messages({
    'object.min': 'At least one field (name or phone) is required',
  });

// CHANGE PASSWORD
const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required().messages({
    'string.base': 'Old password must be a string',
    'any.required': 'Old password is required',
  }),

  newPassword: Joi.string().min(7).required().messages({
    'string.base': 'New password must be a string',
    'string.min': 'New password must be at least 7 characters',
    'any.required': 'New password is required',
  }),

  confirmPassword: Joi.string()
    .valid(Joi.ref('newPassword'))
    .required()
    .messages({
      'any.only': 'Passwords do not match',
      'any.required': 'Confirm password is required',
    }),
});

module.exports = {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  changePasswordSchema,
};
