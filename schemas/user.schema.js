import Joi from "joi";

export const Auth_Schema = Joi.object({
  name: Joi.required(),
  email: Joi.required(),
  password: Joi.required(),
  password_confirmation: Joi.required(),
  terms: Joi.boolean(),
});
