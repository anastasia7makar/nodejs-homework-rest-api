const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "any.required": "missing required name field",
  }),
  email: Joi.string().required().messages({
    "any.required": "missing required email field",
  }),
  phone: Joi.string().min(6).required().messages({
    "any.required": "missing required phone field",
  }),
});

module.exports = { addSchema };
