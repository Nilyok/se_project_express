import { celebrate, Joi, Segments } from "celebrate";
import validator from "validator";

const validateUrl = (value, helpers) => {
  if (!validator.isURL(value)) {
    return helpers.message("Invalid URL");
  }

  return value;
};

const idPattern = /^[0-9a-fA-F]{24}$/;

export const validateSignup = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().required().custom(validateUrl),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
});

export const validateSignin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export const validateUpdateUser = celebrate({
  [Segments.BODY]: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(validateUrl),
    })
    .min(1),
});

export const validateCreateItem = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    weather: Joi.string().valid("hot", "warm", "cold").required(),
    imageUrl: Joi.string().required().custom(validateUrl),
  }),
});

export const validateUserId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string()
      .pattern(/^(null|[0-9a-fA-F]{24})$/)
      .required(),
  }),
});

export const validateItemId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().pattern(idPattern).required(),
  }),
});
