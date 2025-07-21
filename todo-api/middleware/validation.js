const Joi = require('joi');

const validateUser = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().trim().min(2).max(100).required().messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name cannot exceed 100 characters'
    }),
    email: Joi.string().email().required().messages({
      'string.empty': 'Email is required',
      'string.email': 'Please enter a valid email address'
    }),
    phone: Joi.string().pattern(/^\+?[\d\s-()]{10,15}$/).required().messages({
      'string.empty': 'Phone number is required',
      'string.pattern.base': 'Please enter a valid phone number'
    }),
    city: Joi.string().trim().min(2).max(50).required().messages({
      'string.empty': 'City is required',
      'string.min': 'City must be at least 2 characters long'
    }),
    country: Joi.string().trim().min(2).max(50).required().messages({
      'string.empty': 'Country is required',
      'string.min': 'Country must be at least 2 characters long'
    })
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => detail.message)
    });
  }

  next();
};

module.exports = { validateUser };  