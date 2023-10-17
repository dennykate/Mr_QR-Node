import Joi from "joi";

export const Auth_Schema = Joi.object({
  name: Joi.required(),
  email: Joi.required(),
  password: Joi.required(),
  password_confirmation: Joi.required(),
  terms: Joi.boolean(),
});

export const Google_Auth_Schema = Joi.object({
  access_token: Joi.string().required(),
});

export const Send_Code_Schema = Joi.object({
  email: Joi.string().required(),
});
