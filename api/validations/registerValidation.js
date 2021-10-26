const Joi = require('joi');

const registerValidation = Joi.object({
name: Joi.string().min(2).max(255).required(),
email: Joi.string().email().min(3).max(255).required(),
password: Joi.string().min(6).max(16).required()
})

module.exports = registerValidation