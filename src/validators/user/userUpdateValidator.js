import Joi from 'joi';

const updateUserValidator = Joi.object({
    favorites: Joi.array().items(Joi.string()).optional(),
    privileges: Joi.array().items(Joi.string()).optional(),
    name: Joi.string().optional(),
    password: Joi.string().min(8).optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().optional(),
    last_login_date: Joi.date().optional(),
    position: Joi.string().optional(),
    role: Joi.string().optional(),
    online: Joi.boolean().optional()
}).min(1);

export default updateUserValidator;
