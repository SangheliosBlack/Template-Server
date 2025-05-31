import Joi from 'joi';

const updateNotificationToken = Joi.object({
  fcmToken: Joi.string()
    .trim()
    .min(140)
    .max(255)
    .required()
    .messages({
      'string.base': 'The FCM token must be a string.',
      'string.empty': 'The FCM token cannot be empty.',
      'string.min': 'The FCM token must be at least 140 characters long.',
      'string.max': 'The FCM token must not exceed 255 characters.',
      'any.required': 'The FCM token is required.',
    }),
});

export default updateNotificationToken;
