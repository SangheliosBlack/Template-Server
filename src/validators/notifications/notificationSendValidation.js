import Joi from 'joi';

const sendParticularNotification = Joi.object({
  title: Joi.string()
    .min(3)
    .required()
    .messages({
      'string.base': 'The titulo must be a text.',
      'string.min': 'The titulo must have at least 3 characters.',
      'any.required': 'The titulo field is required.',
      'string.empty': 'The titulo field cannot be empty.'
    }),
  message: Joi.string()
    .min(5)
    .required()
    .messages({
      'string.base': 'The mensaje must be a text.',
      'string.min': 'The mensaje must have at least 5 characters.',
      'any.required': 'The mensaje field is required.',
      'string.empty': 'The mensaje field cannot be empty.'
    })
});

export default  sendParticularNotification;
