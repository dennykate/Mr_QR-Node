import Joi from "joi";

export const CREATE_QR_SCHEMA = Joi.object({
  svg: Joi.string().required(),
  value: Joi.string().required(),
  name: Joi.string().required(),
  key: Joi.allow(),
});
