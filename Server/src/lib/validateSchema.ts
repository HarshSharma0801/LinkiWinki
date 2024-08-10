import Joi from "joi";

export const validateSchema = Joi.object({
  username: Joi.string(),
  original_url: Joi.string(),
});
