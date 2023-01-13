const { celebrate, Joi } = require('celebrate');

const validateAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(/\w+@\w+\.\w+/),
    password: Joi.string().required(),
  }),
});

module.exports = validateAuth;
