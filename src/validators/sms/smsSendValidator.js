import Joi from 'joi';

const sendSingleSms = Joi.object({
  msisdn: Joi.string()
    .min(8)
    .max(12)
    .required()
    .messages({
      'string.base': 'The number must be a text.',
      'string.min': 'The number must have at least 8 characters.',
      'string.max': 'The number cannot have more than 12 characters.',
      'any.required': 'The msisdn field is required.',
      'string.empty': 'The msisdn field cannot be empty.'
    }),
  msg: Joi.string()
    .min(10)
    .required()
    .messages({
      'string.base': 'The number must be a text.',
      'string.min': 'The number must have at least 10 characters.',
      'any.required': 'The msg field is required.',
      'string.empty': 'The msg field cannot be empty.'
    }),

});

export default sendSingleSms;